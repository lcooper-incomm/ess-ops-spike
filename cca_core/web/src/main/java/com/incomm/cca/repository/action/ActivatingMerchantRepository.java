package com.incomm.cca.repository.action;

import com.incomm.cca.model.domain.ActivatingMerchant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActivatingMerchantRepository extends JpaRepository<ActivatingMerchant, Long> {

    ActivatingMerchant findOneByMerchantId(String merchantId);
}
