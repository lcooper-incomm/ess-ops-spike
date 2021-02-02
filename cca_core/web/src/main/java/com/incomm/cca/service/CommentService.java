package com.incomm.cca.service;

import com.incomm.cca.exception.NotFoundException;
import com.incomm.cca.exception.SecurityViolationException;
import com.incomm.cca.model.constant.IdentifierType;
import com.incomm.cca.model.converter.CcaCommentConverter;
import com.incomm.cca.model.domain.Comment;
import com.incomm.cca.model.domain.Identifier;
import com.incomm.cca.model.domain.User;
import com.incomm.cca.model.domain.session.Selection;
import com.incomm.cca.model.domain.session.Session;
import com.incomm.cca.model.view.session.comment.CommentDetailView;
import com.incomm.cca.model.view.session.comment.ExternalCommentRequestView;
import com.incomm.cca.repository.CommentRepository;
import com.incomm.cca.service.encryption.EncryptionService;
import com.incomm.cscore.client.apls.constant.AplsPlatform;
import com.incomm.cscore.logging.CsCoreLogger;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class CommentService {

    @Autowired
    private CcaCommentConverter commentConverter;
    @Autowired
    private IdentifierService identifierService;
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private NamedParameterJdbcTemplate jdbcTemplate;
    @Autowired
    private SelectionService selectionService;
    @Autowired
    private SessionService sessionService;
    @Autowired
    private EncryptionService encryptionService;

    private static final String INSERT_IDENTIFIER_COMMENT = "" +
            "INSERT INTO identifier_comment (identifier_id, comment_id) " +
            "VALUES (:identifierId, :commentId)";
    private static final String UPDATE_COMMENT = "" +
            "UPDATE comment " +
            "SET content = ENCRYPTBYKEY(KEY_GUID('CCAEncryptionSymmetricKey'),:content) " +
            "WHERE id = :id";

    @Transactional
    public Comment addOneComment(Long sessionId, Comment request) {
        encryptionService.openSymmetricKey();
        Session session = sessionService.findSessionForEditing(sessionId);

        preprocessComment(session, request);

        commentRepository.saveAndFlush(request);

        postprocessComment(session, request);

        return request;
    }

    @Transactional
    public Comment addOne(Identifier identifier, Comment comment) {
        encryptionService.openSymmetricKey();
        identifier.getComments()
                  .add(comment);
        comment.getIdentifiers()
               .add(identifier);

        comment.setCreatedBy(this.userService.currentPersistentUser());
        comment.setModifiedBy(this.userService.currentPersistentUser());

        return this.commentRepository.saveAndFlush(comment);
    }

    @Transactional
    protected void preprocessComment(Session session, Comment request) {
        //Populate user
        User currentUser = userService.currentPersistentUser();
        request.setCreatedBy(currentUser);
        request.setModifiedBy(currentUser);

        //Populate session
        request.getSourceSessions()
               .add(session);

        session.getComments()
               .add(request);
    }

    /**
     * Associate the given comment to all Identifiers for all valid Selections in the given Session. Selections are
     * valid if:
     * * They actually returned valid search results and were selected by the user; and
     * * They have not been marked as deleted
     */
    @Transactional
    protected void postprocessComment(Session session, Comment request) {
        List<Selection> filteredSelections = session.getSelections()
                                                    .stream()
                                                    .filter(selection -> selection.getDeletedDate() == null)
                                                    .collect(Collectors.toList());

        for (Selection selection : filteredSelections) {
            for (Identifier identifier : selection.getIdentifiers()) {
                insertIdentifierCommentRecord(identifier, request);
                request.getIdentifiers()
                       .add(identifier);
            }
        }
    }

    @Transactional
    public Comment newComment(ExternalCommentRequestView requestDto) {
        encryptionService.openSymmetricKey();
        try {
            if (requestDto == null) {
                throw new IllegalArgumentException("No request found");
            } else if (requestDto.getIdentifierType() == null
                    || (!Objects.equals(requestDto.getIdentifierType(), IdentifierType.SERIALNUMBER)
                    && !Objects.equals(requestDto.getIdentifierType(), IdentifierType.VAN))) {
                throw new IllegalArgumentException("'identifierType' must be one of SERIALNUMBER, VAN");
            } else if (StringUtils.isBlank(requestDto.getIdentifier())) {
                throw new IllegalArgumentException("'identifier' not found");
            } else if (StringUtils.isBlank(requestDto.getNote())) {
                throw new IllegalArgumentException("'comment' not found");
            } else if (StringUtils.isBlank(requestDto.getUsername())) {
                throw new IllegalArgumentException("'username' not found");
            }

            User user = userService.findOneByUsername(requestDto.getUsername());
            if (user == null) {
                throw new IllegalArgumentException("No user found for username");
            }

            Identifier identifier = identifierService.findOrCreateByIdentifierTypeIdentifierAndPlatform(requestDto.getIdentifierType(), requestDto.getIdentifier(), AplsPlatform.INCOMM.toString());

            Comment comment = new Comment();
            comment.setCreatedBy(user);
            comment.setModifiedBy(user);
			comment.setContent(requestDto.getNote());
            comment.getIdentifiers()
                   .add(identifier);
            commentRepository.save(comment);

            insertIdentifierCommentRecord(identifier, comment);

            return comment;
        } catch (IllegalArgumentException e) {
            CsCoreLogger.warn("Bad request to create comment from external source")
                        .json("request", requestDto)
                        .keyValue("cause", e.getMessage())
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to create comment from external source")
                        .json("request", requestDto)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public Comment getNote(long id) {
        return commentRepository.findById(id)
                                .orElse(null);
    }

    @Transactional
    public void update(Comment comment) throws SecurityViolationException, NotFoundException {
        try {
            encryptionService.openSymmetricKey();
            Map<String, Object> params = new HashMap<>();
            params.put("id", comment.getId());
            params.put("content", comment.getContent());

            jdbcTemplate.update(UPDATE_COMMENT, params);
        } catch (Exception e) {
            CsCoreLogger.error("Failed to update comment")
                        .keyValue("id", comment.getId())
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public Page<Comment> getCommentsForSelection(Long selectionId, Pageable pageable) {
        try {
            encryptionService.openSymmetricKey();
			/*
			CCA-5050 Due to CCA Legacy incorrecting associating the INCOMM platform to Order Identifier records,
			we temporarily need Core to find and associate those same erroneous Identifier records so that its paginated
			query for comments can take those into account.
			 */
            this.selectionService.handleAssociatingLegacyIdentifiersToOrderSelectionsIfNecessary(selectionId);

            List<String> excludedTypes = new ArrayList<>();
            excludedTypes.add(IdentifierType.CONTROLNUMBER);
            excludedTypes.add(IdentifierType.REVERSEVRNBYCONTROLNUMBER);

            return this.commentRepository.findAllBySelectionId(selectionId, excludedTypes, pageable);
        } catch (Exception e) {
            CsCoreLogger.error("Failed to retrieve selection comments")
                        .keyValue("selectionId", selectionId)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public List<Comment> findByIdentifierTypeAndIdentifier(String identifierType, String identifier) {
        try {
            encryptionService.openSymmetricKey();
            return commentRepository.findByIdentifierTypeAndIdentifier(identifierType, identifier);
        } catch (Exception e) {
            CsCoreLogger.error("Failed to retrieve comments")
                        .keyValue("identifierType", identifierType)
                        .keyValue("identifier", identifier)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    private void insertIdentifierCommentRecord(Identifier identifier, Comment comment) {
        try {
            Map<String, Object> params = new HashMap<>();
            params.put("identifierId", identifier.getId());
            params.put("commentId", comment.getId());

            jdbcTemplate.update(INSERT_IDENTIFIER_COMMENT, params);
        } catch (DataIntegrityViolationException e) {
            CsCoreLogger.warn("Attempted to insert duplicate identifier_comment record")
                        .keyValue("identifierId", identifier.getId())
                        .keyValue("identifierType", identifier.getIdentifierType())
                        .keyValue("identifier", identifier.getValue())
                        .keyValue("platform", identifier.getPlatform())
                        .keyValue("commentId", comment.getId())
                        .build();
        }
    }

    public CommentDetailView getCommentDetailsByCommentId(Long id) {
        try {
            encryptionService.openSymmetricKey();
            Session session = sessionService.findOneByCommentId(id);
            if (session != null) {
                return commentConverter.convert(id, session);
            }

            return null;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to retrieve comment details")
                        .keyValue("id", id)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public List<Comment> search(Identifier request) {
        encryptionService.openSymmetricKey();
        Identifier existingIdentifier = null;
        if (StringUtils.isNotBlank(request.getPartner())) {
            existingIdentifier = this.identifierService.findOneByIdentifierTypeAndValueAndPlatformAndPartner(request.getIdentifierType(), request.getValue(), request.getPlatform(), request.getPartner());
        } else {
            existingIdentifier = this.identifierService.findOneByIdentifierTypeAndValueAndPlatform(request.getIdentifierType(), request.getValue(), request.getPlatform());
        }

        if (existingIdentifier != null) {
            return existingIdentifier.getComments();
        } else {
            return new ArrayList<>();
        }
    }

    @Transactional
    public Comment updateOneComment(Long id, Comment request) {
        encryptionService.openSymmetricKey();
        Comment existing = commentRepository.findById(id)
                                            .orElse(null);
        if (existing == null) {
            throw new IllegalArgumentException("Comment not found");
        }

        existing.setModifiedBy(userService.currentPersistentUser());
        existing.setIsPrivate(request.getIsPrivate());

        return existing;
    }
}
