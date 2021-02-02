package com.incomm.cca.repository.session;

import com.incomm.cca.model.domain.session.AuditCardWorkflowActivity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AuditCardWorkflowActivityRepository extends JpaRepository<AuditCardWorkflowActivity, Long> {

    List<AuditCardWorkflowActivity> findAllByCardId(Long id);
}
