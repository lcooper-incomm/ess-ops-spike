package com.incomm.cca.service.session;

import com.incomm.cca.model.constant.SessionStatus;
import com.incomm.cca.model.domain.User;
import com.incomm.cca.model.domain.session.WorkspaceSession;
import com.incomm.cca.repository.session.WorkspaceSessionRepository;
import com.incomm.cca.service.UserService;
import com.incomm.cca.service.encryption.EncryptionService;
import com.incomm.cscore.logging.CsCoreLogger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class WorkspaceSessionService {

    @Autowired
    private WorkspaceSessionRepository repository;
    @Autowired
    private UserService userService;
    @Autowired
    private EncryptionService encryptionService;

    public Page<WorkspaceSession> findAllActiveForCurrentUser(Pageable pageable) {
        User user = userService.currentPersistentUser();
        return findAllActiveForUser(user.getId(), pageable);
    }

    @Transactional
    public Page<WorkspaceSession> findAllActiveForUser(Long userId, Pageable pageable) {
        try {
            encryptionService.openSymmetricKey();
            Page<WorkspaceSession> results = repository.findTop50ByUserIdAndStatusNotInOrderByIdDesc(userId, getClosedStatuses(), pageable);
            return results;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to retrieve all active sessions")
                        .exception(e)
                        .build();
            throw e;
        }
    }

    private List<String> getClosedStatuses() {
        List<String> statuses = new ArrayList<>();
        statuses.add(SessionStatus.ABANDONED);
        statuses.add(SessionStatus.CLOSED);
        statuses.add(SessionStatus.CANCELLED);
        statuses.add(SessionStatus.FORCED_CLOSED);
        statuses.add(SessionStatus.VMS_SESSION_FAILED);

        return statuses;
    }
}
