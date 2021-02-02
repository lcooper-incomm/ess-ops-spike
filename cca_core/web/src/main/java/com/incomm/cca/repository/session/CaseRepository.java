package com.incomm.cca.repository.session;

import com.incomm.cca.model.domain.session.Session;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface CaseRepository extends JpaRepository<Session, Long>, JpaSpecificationExecutor<Session> {

    @Override
    @EntityGraph(attributePaths = {"queue", "team", "user", "createdBy"})
    Page<Session> findAll(Specification<Session> specification, Pageable pageable);
}
