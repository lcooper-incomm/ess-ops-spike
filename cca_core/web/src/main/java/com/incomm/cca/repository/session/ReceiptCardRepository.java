package com.incomm.cca.repository.session;

import com.incomm.cca.model.domain.session.ReceiptCard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReceiptCardRepository extends JpaRepository<ReceiptCard, Long> {

    Long deleteByReceiptComponentId(Long id);
}
