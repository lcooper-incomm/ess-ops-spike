package com.incomm.cca.repository.session;

import com.incomm.cca.model.domain.session.SessionType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SessionTypeRepository extends JpaRepository<SessionType, Long> {

    SessionType findOneByNameIgnoreCase(String name);

    List<SessionType> findAllBySessionClassName(String name);
}
