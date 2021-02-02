package com.incomm.cca.repository;

import com.incomm.cca.model.domain.SessionQueue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SessionQueueRepository extends JpaRepository<SessionQueue, Long> {

    SessionQueue findOneBySystemName(String name);

    @Query("from SessionQueue q left join fetch q.wrapUpCodeCategories c where q.id = :id")
    SessionQueue findOneWithFetch(@Param("id") Long id);

    @Query("from SessionQueue q where q.active = 1 and q.i3Name = :i3Name")
    SessionQueue findActiveByI3Name(@Param("i3Name") String i3Name);

    @Query("select distinct q from SessionQueue q join fetch q.permission p join q.sessionTypes st where st.sessionType = :sessionType and q.active = true")
    List<SessionQueue> findAllBySessionTypeAndActiveTrue(@Param("sessionType") String sessionType);

    @Query("select distinct q from SessionQueue q left join q.sessionTypes st where st.sessionType in :types")
    List<SessionQueue> findAllCaseQueues(@Param("types") List<String> sessionTypes);
}