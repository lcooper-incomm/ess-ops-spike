package com.incomm.cca.repository.audit;

import com.incomm.cca.model.domain.audit.AuditBalanceAdjustmentActivity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface AuditBalanceAdjustmentActivityRepository extends JpaRepository<AuditBalanceAdjustmentActivity, Long> {

    @Query("from AuditBalanceAdjustmentActivity abaa where abaa.adjustedBy = :username and abaa.adjustedDate >= :midnight")
    List<AuditBalanceAdjustmentActivity> findAllTodayForUser(@Param("username") String username, @Param("midnight") Date midnight);
}
