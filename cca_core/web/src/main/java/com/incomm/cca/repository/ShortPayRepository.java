package com.incomm.cca.repository;

import com.incomm.cca.model.domain.ShortPay;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShortPayRepository extends JpaRepository<ShortPay, Long> {

    ShortPay findOneByMerchantId(String merchantId);
}