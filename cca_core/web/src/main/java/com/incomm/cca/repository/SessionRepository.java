package com.incomm.cca.repository;

import com.incomm.cca.model.domain.session.Session;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SessionRepository extends JpaRepository<Session, Long> {

	@Query(value = "select distinct s from Session s where s.callComponent.uid = :uid order by s.createdDate desc")
    List<Session> findClaimedIvrSessionsByUid(@Param("uid") String uid);

	@Query(value = "select distinct s from Session s where s.callComponent.uid = :uid and s.user is null")
    Session findUnclaimedIvrSessionByUid(@Param("uid") String uid);

    @Query(value = "select distinct s from Session s where s.callComponent.uid = :uid and s.user.username = :username")
    Session findIvrSessionByUidAndUsername(@Param("uid") String uid, @Param("username") String username);

    Session findOneByCommentsId(Long noteId);

    @Query("select s from Session s left join fetch s.callComponent cd left join fetch s.cardsComponent cc left join fetch s.complaintComponent comp left join fetch s.customerComponent cud left join fetch s.disputeComponent dis left join fetch s.documentsComponent dc left join fetch s.merchantComponent md left join fetch s.receiptComponent rd left join fetch s.refundRequestComponent rrd left join fetch s.lawEnforcementComponent led left join fetch s.queue q left join fetch q.permission qperm left join fetch s.wrapUpCodeCategory wucc left join s.wrapUpCode wuc left join fetch s.user u left join fetch s.selections sel left join fetch sel.identifiers i where s.id = :id")
    Session findOneWithFetch(@Param("id") Long id);

    @Query("select s from Session s left join s.selections sel left join sel.identifiers i " +
            "where i.value = :identifier and i.identifierType = :identifierType " +
            "and s.sessionType in :sessionTypes " +
            "order by s.id desc")
    Page<Session> findAllByIdentifier(@Param("identifier") String identifier, @Param("identifierType") String identifierType, @Param("sessionTypes") List<String> sessionTypes, Pageable pageable);

    List<Session> findAllBySessionClassAndClosedDateIsNullOrderByIdAsc(String sessionClass);

    @Query("select s from Session s join s.selections sel join sel.identifiers i where i.id = :identifierId and s.sessionClass = 'CASE' and s.status not in ('CLOSED', 'CANCELLED', 'FORCED_CLOSED')")
    List<Session> findAllOpenCasesByIdentifierId(@Param("identifierId") Long identifierId);

    @Query("select s from Session s join s.selections sel join sel.identifiers i where i.id = :identifierId and s.sessionClass = 'CASE' and sel.deletedDate is null")
    List<Session> findAllRelatedCasesByIdentifierId(@Param("identifierId") Long identifierId);

    List<Session> findAllByCommentsId(Long id);
}
