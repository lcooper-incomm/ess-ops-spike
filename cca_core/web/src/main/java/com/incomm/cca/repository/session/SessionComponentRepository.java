package com.incomm.cca.repository.session;

import com.incomm.cca.model.domain.session.SessionComponent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SessionComponentRepository extends JpaRepository<SessionComponent, Long> {

    List<SessionComponent> findAllBySessionTypesName(String name);
}
