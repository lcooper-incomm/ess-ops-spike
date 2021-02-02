package com.incomm.cca.repository.action;

import com.incomm.cca.model.domain.C2CRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface C2CRequestRepository extends JpaRepository<C2CRequest, Long> {

    @Query("from C2CRequest r where r.status = 'PENDING' order by r.createdDate desc")
    List<C2CRequest> findAllPending();

    @Query("from C2CRequest r where r.status = 'PENDING' and r.sessionId = :sessionId")
    List<C2CRequest> findAllPendingForSessionId(@Param("sessionId") Long sessionId);
}
