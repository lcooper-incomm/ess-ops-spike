package com.incomm.cca.repository.session;

import com.incomm.cca.model.domain.session.RefundRequestComponent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RefundRequestDetailRepository extends JpaRepository<RefundRequestComponent, Long> {

}
