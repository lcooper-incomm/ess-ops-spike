package com.incomm.cca.repository.audit;

import com.incomm.cca.model.domain.audit.AuditActivity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuditActivityRepository extends JpaRepository<AuditActivity, Long> {

}
