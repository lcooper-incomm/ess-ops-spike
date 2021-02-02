package com.incomm.cca.service.troubleshooting;

import com.incomm.cca.hazelcast.HazelcastManager;
import com.incomm.cca.hazelcast.event.ConnectTroubleshootingUserEvent;
import com.incomm.cca.hazelcast.event.DisconnectTroubleshootingUserEvent;
import com.incomm.cca.hazelcast.event.TroubleshootingEntriesEvent;
import com.incomm.cca.model.constant.PropertySystemName;
import com.incomm.cca.model.domain.troubleshooting.TroubleshootingEntry;
import com.incomm.cca.model.domain.troubleshooting.TroubleshootingSession;
import com.incomm.cca.repository.troubleshooting.TroubleshootingSessionRepository;
import com.incomm.cca.service.PropertyService;
import com.incomm.cca.service.UserService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
public class TroubleshootingService {

    @Autowired
    private TroubleshootingSessionRepository troubleshootingSessionRepository;
    @Autowired
    private PropertyService propertyService;
    @Autowired
    private UserService userService;
    @Autowired
    private HazelcastManager hazelcastManager;
    @Autowired
    private NamedParameterJdbcTemplate jdbcTemplate;
    private static final String DELETE_EXPIRED_SESSIONS = "" +
            "DELETE FROM troubleshooting_session " +
            "WHERE expiration_date <= GETDATE()";

    @Transactional
    public void connectToUser(String username) {
        String currentUser = userService.currentUser()
                                        .getUsername();
        TroubleshootingSession session = new TroubleshootingSession(currentUser, username, getSessionDuration());
        troubleshootingSessionRepository.saveAndFlush(session);
        hazelcastManager.broadcast(new ConnectTroubleshootingUserEvent(currentUser));
    }

    @Transactional
    public void disconnectFromUser(String username) {
        String currentUser = userService.currentUser()
                                        .getUsername();
        TroubleshootingSession session = troubleshootingSessionRepository.findOneByConnectorAndConnectee(currentUser.toLowerCase(), username.toLowerCase());
        if (session != null) {
            troubleshootingSessionRepository.delete(session);
        }
        hazelcastManager.broadcast(new DisconnectTroubleshootingUserEvent(currentUser));
    }

    public List<String> getConnectedUsers() {
        String username = userService.currentUser()
                                     .getUsername();
        List<TroubleshootingSession> sessions = troubleshootingSessionRepository.findAllByConnectee(username.toLowerCase());

        List<String> connectedUsers = new ArrayList<>();
        for (TroubleshootingSession session : sessions) {
            connectedUsers.add(session.getConnector());
        }

        return connectedUsers;
    }

    @Transactional
    public void closeAllSessionsForConnector(String connector) {
        List<TroubleshootingSession> sessions = troubleshootingSessionRepository.findAllByConnector(connector.toLowerCase());
        for (TroubleshootingSession session : sessions) {
            troubleshootingSessionRepository.delete(session);
            hazelcastManager.broadcast(new DisconnectTroubleshootingUserEvent(connector));
        }

    }

    @Transactional
    public void publishEntries(List<TroubleshootingEntry> entries) {
        jdbcTemplate.update(DELETE_EXPIRED_SESSIONS, new HashMap<>());
        if (entries.size() > 0) {
            //Use first entry to find connected sessions to broadcast to
            TroubleshootingEntry entry = entries.get(0);
            List<TroubleshootingSession> sessions = troubleshootingSessionRepository.findAllByConnectee(entry.getUsername());

            //Broadcast to all connected users
            for (TroubleshootingSession session : sessions) {
                hazelcastManager.broadcast(new TroubleshootingEntriesEvent(session.getConnector(), entries));
            }
        }
    }

    private Long getSessionDuration() {
        long durationInMinutes = 15;

        String configuredValue = propertyService.findOneBySystemName(PropertySystemName.TROUBLESHOOTING_SESSION_DURATION)
                                                .getValue();
        if (StringUtils.isNotBlank(configuredValue) && StringUtils.isNumeric(configuredValue)) {
            durationInMinutes = Long.parseLong(configuredValue);
        }

        return durationInMinutes;
    }

}
