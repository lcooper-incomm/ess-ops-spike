package com.incomm.cca.repository.troubleshooting;

import com.incomm.cca.model.domain.troubleshooting.TroubleshootingSession;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TroubleshootingSessionRepository extends JpaRepository<TroubleshootingSession, Long> {

    List<TroubleshootingSession> findAllByConnectee(String connectee);

    List<TroubleshootingSession> findAllByConnector(String connector);

    TroubleshootingSession findOneByConnectorAndConnectee(String connector, String connectee);
}
