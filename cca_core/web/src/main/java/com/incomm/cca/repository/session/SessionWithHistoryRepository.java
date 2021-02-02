package com.incomm.cca.repository.session;

import com.incomm.cca.model.domain.session.SessionWithHistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SessionWithHistoryRepository extends JpaRepository<SessionWithHistory, Long> {

    Page<SessionWithHistory> findAllBySessionClassAndStatusInAndSessionQueueIsNotNull(String sessionClass, List<String> statuses, Pageable pageable);

    Page<SessionWithHistory> findAllBySessionClassNotAndStatusIn(String sessionClass, List<String> statuses, Pageable pageable);

    @Query("select distinct s " +
            "from SessionWithHistory s " +
            "left join s.sessionQueue sq " +
            "where s.sessionType = :sessionType " +
            "and s.status in :statuses " +
            "and sq.systemName in :queues")
    Page<SessionWithHistory> findAllBySessionTypeAndStatusAndQueue(
            @Param("sessionType") String sessionType,
            @Param("statuses") List<String> statuses,
            @Param("queues") List<String> queues,
            Pageable pageable
    );
}