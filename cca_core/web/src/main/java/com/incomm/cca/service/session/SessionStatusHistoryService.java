package com.incomm.cca.service.session;

import com.incomm.cca.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class SessionStatusHistoryService {

    private static final String INSERT_QUERY = "INSERT INTO session_status_history " +
            "(session_id, user_id, from_status, to_status, created_date) VALUES " +
            "(:sessionId, :userId, :fromStatus, :toStatus, :createdDate)";
    @Autowired
    private NamedParameterJdbcTemplate jdbcTemplate;
    @Autowired
    private UserService userService;

    @Transactional
    public void addOneByCurrentUser(Long sessionId, String fromStatus, String toStatus) {
        this.addOne(sessionId, fromStatus, toStatus, userService.currentPersistentUser()
                                                                .getId());
    }

    @Transactional
    public void addOneBySystemUser(Long sessionId, String fromStatus, String toStatus) {
        this.addOne(sessionId, fromStatus, toStatus, userService.findCCAAdmin()
                                                                .getId());
    }

    private void addOne(Long sessionId, String fromStatus, String toStatus, Long userId) {
        Map<String, Object> params = new HashMap<>();
        params.put("sessionId", sessionId);
        params.put("userId", userId);
        params.put("fromStatus", fromStatus);
        params.put("toStatus", toStatus);
        params.put("createdDate", new Date());

        this.jdbcTemplate.update(INSERT_QUERY, params);
    }
}
