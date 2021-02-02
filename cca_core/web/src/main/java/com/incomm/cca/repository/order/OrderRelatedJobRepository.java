package com.incomm.cca.repository.order;

import com.incomm.cca.model.domain.order.OrderRelatedJob;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRelatedJobRepository extends JpaRepository<OrderRelatedJob, Long> {

    List<OrderRelatedJob> findAllByOrderIdAndPartnerAndPlatform(Long orderId, String partner, String platform);
}
