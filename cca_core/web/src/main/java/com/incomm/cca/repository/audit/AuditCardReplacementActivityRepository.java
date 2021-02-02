package com.incomm.cca.repository.audit;

import com.incomm.cca.model.domain.audit.AuditCardReplacementActivity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AuditCardReplacementActivityRepository extends JpaRepository<AuditCardReplacementActivity, Long> {

    @Query("from AuditCardReplacementActivity acra where acra.identifierType = :identifierType and acra.identifier = :identifier and acra.platform = :platform order by acra.lastReplacedDate desc")
    List<AuditCardReplacementActivity> findAllForIdentifierTypeIdentifierAndPlatform(@Param("identifierType") String identifierType, @Param("identifier") String identifier, @Param("platform") String platform);
}
