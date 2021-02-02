package com.incomm.cca.repository.session;

import com.incomm.cca.model.domain.session.SessionStatusHistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SessionStatusHistoryRepository extends JpaRepository<SessionStatusHistory, Long> {

    Page<SessionStatusHistory> findBySessionId(Long sessionId, Pageable pageable);
}
