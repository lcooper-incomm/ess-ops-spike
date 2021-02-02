package com.incomm.cca.repository.session;

import com.incomm.cca.model.domain.session.SessionStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SessionStatusRepository extends JpaRepository<SessionStatus, Long> {

}
