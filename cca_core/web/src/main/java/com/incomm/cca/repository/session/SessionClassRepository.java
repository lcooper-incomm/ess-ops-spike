package com.incomm.cca.repository.session;

import com.incomm.cca.model.domain.session.SessionClass;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SessionClassRepository extends JpaRepository<SessionClass, Long> {

    SessionClass findOneBySessionTypesName(String sessionType);
}
