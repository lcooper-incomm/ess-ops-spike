package com.incomm.cca.repository;

import com.incomm.cca.model.domain.session.dispute.DisputeComponent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface DisputeComponentRepository extends JpaRepository<DisputeComponent, Long> {

    @Query("SELECT dd FROM DisputeComponent dd JOIN dd.transactions ddt WHERE ddt.transactionId = :transactionId AND ddt.deliveryChannelCode = :deliveryChannelCode AND ddt.requestCode = :requestCode AND ddt.responseCode = :responseCode AND ddt.businessDate = :businessDate")
    List<DisputeComponent> findByTransactionData(@Param("transactionId") String transactionId, @Param("deliveryChannelCode") String deliveryChannelCode, @Param("requestCode") String requestCode, @Param("responseCode") String responseCode, @Param("businessDate") Date businessDate);
}
