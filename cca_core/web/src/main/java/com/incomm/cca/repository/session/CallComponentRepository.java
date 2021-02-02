package com.incomm.cca.repository.session;

import com.incomm.cca.model.domain.session.CallComponent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CallComponentRepository extends JpaRepository<CallComponent, Long> {

    @Query("from CallComponent d where d.callId = :callId and d.session.user.username = :username order by d.connectedDate desc")
    List<CallComponent> findByCallIdAndUsername(@Param("callId") String callId, @Param("username") String username);
}
