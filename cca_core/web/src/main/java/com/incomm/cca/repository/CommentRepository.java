package com.incomm.cca.repository;

import com.incomm.cca.model.domain.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query("select distinct c from Comment c join fetch c.identifiers i join fetch c.createdBy cb join fetch c.modifiedBy mb where i.identifierType = :identifierType and i.value = :identifier and c.isPrivate = false order by c.createdDate desc")
    List<Comment> findByIdentifierTypeAndIdentifier(@Param("identifierType") String identifierType, @Param("identifier") String identifier);

    @EntityGraph(attributePaths = {"createdBy", "modifiedBy"})
    @Query("select distinct c from Comment c join c.identifiers i join i.selections s where s.id = :selectionId and i.identifierType not in :excludedTypes and c.isPrivate = false order by c.createdDate desc")
    Page<Comment> findAllBySelectionId(@Param("selectionId") Long selectionId, @Param("excludedTypes") List<String> excludedTypes, Pageable pageable);
}
