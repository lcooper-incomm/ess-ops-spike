package com.incomm.cca.repository;

import com.incomm.cca.model.domain.session.dispute.DisputedTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DisputedTransactionRepository extends JpaRepository<DisputedTransaction, Long> {

    List<DisputedTransaction> findByTransactionIdIn(List<String> transactionIds);
}
