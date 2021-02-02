package com.incomm.cca.service.session;

import com.incomm.cca.model.domain.session.SessionStatus;
import com.incomm.cca.repository.session.SessionStatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SessionStatusService {

    @Autowired
    private SessionStatusRepository sessionStatusRepository;

    public List<SessionStatus> findAll() {
        return this.sessionStatusRepository.findAll();
    }
}
