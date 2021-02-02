package com.incomm.cca.service;

import com.incomm.cca.exception.SecurityViolationException;
import com.incomm.cca.model.constant.IdentifierType;
import com.incomm.cca.model.constant.SelectionType;
import com.incomm.cca.model.domain.Comment;
import com.incomm.cca.model.domain.Identifier;
import com.incomm.cca.model.domain.Partner;
import com.incomm.cca.model.domain.session.Selection;
import com.incomm.cca.model.domain.session.Session;
import com.incomm.cca.model.enums.ManagedPermission;
import com.incomm.cca.repository.IdentifierRepository;
import com.incomm.cca.repository.SelectionRepository;
import com.incomm.cscore.client.apls.constant.AplsPlatform;
import com.incomm.cscore.logging.CsCoreLogger;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SelectionService {

    public static final String QUERY_REMOVE_IDENTIFIER_COMMENTS = "" +
            "DELETE FROM identifier_comment " +
            "WHERE " +
            "   identifier_id = :identifierId " +
            "   AND comment_id IN (SELECT comment_id FROM session_comment WHERE session_id = :sessionId)";
    @Autowired
    private SelectionRepository selectionRepository;
    @Autowired
    private IdentifierRepository identifierRepository;
    @Autowired
    private PartnerService partnerService;
    @Autowired
    private UserService userService;
    @Autowired
    private SecurityService securityService;
    @Autowired
    private NamedParameterJdbcTemplate jdbcTemplate;

    public Selection findOne(Long selectionId) {
        try {
            return selectionRepository.findById(selectionId)
                                      .orElse(null);
        } catch (Exception e) {
            CsCoreLogger.error("Failed to retrieve selection")
                        .keyValue("id", selectionId)
                        .build();
            throw e;
        }
    }

    @Transactional
    public Selection createIVRSelection(Session session, String selectionType, String identifierType, String identifierValue, String platformName) {
        Selection selection = new Selection();
        selection.setType(selectionType);
        selection.setPlatform(StringUtils.isNotBlank(platformName) ? platformName.toUpperCase() : null);
        selection.setSession(session);

        String aplsPlatform = getDefaultPlatformType(identifierType, platformName);
        Identifier identifier = identifierRepository.findOneByIdentifierTypeAndValueAndPlatformAndPartner(identifierType, identifierValue, aplsPlatform, null);
        if (identifier == null) {
            identifier = new Identifier();
            identifier.setIdentifierType(identifierType);
            identifier.setValue(identifierValue);
            identifier.setPlatform(aplsPlatform);

            identifierRepository.saveAndFlush(identifier);
        }
        selection.getIdentifiers()
                 .add(identifier);

        return selectionRepository.saveAndFlush(selection);
    }

    @Transactional
    public Selection createSelection(Session session, Selection request) {
        Selection selection = populateSelectionFromRequest(request);
        selection.setSession(session);
        associateAllCommentsToSelectionIdentifiers(selection);
        return selectionRepository.saveAndFlush(selection);
    }

    /*
    CCA-5050 Due to CCA Legacy incorrecting associating the INCOMM platform to Order Identifier records,
    we temporarily need Core to find and associate those same erroneous Identifier records so that its paginated
    query for comments can take those into account.
     */
    @Transactional
    public void handleAssociatingLegacyIdentifiersToOrderSelectionsIfNecessary(Long selectionId) {
        Selection selection = this.findOne(selectionId);
        if (selection.getType()
                     .equalsIgnoreCase(SelectionType.ORDER)) {
            boolean hasLegacyIdentifiers = selection.getIdentifiers()
                                                    .stream()
                                                    .anyMatch(identifier -> (identifier.getIdentifierType()
                                                                                       .equals(IdentifierType.ORDER_NUMBER) || identifier.getIdentifierType()
                                                                                                                                         .equals(IdentifierType.ORDER_ID))
                                                            && identifier.getPlatform()
                                                                         .equals(AplsPlatform.INCOMM.toString()));

            if (!hasLegacyIdentifiers) {
                List<Identifier> legacyIdentifiers = new ArrayList<>();
                selection.getIdentifiers()
                         .forEach(identifier -> {
                             Identifier legacyIdentifier = null;
                             if (StringUtils.isNotBlank(identifier.getPartner())) {
                                 legacyIdentifier = this.identifierRepository.findOneByIdentifierTypeAndValueAndPlatformAndPartner(identifier.getIdentifierType(), identifier.getValue(), AplsPlatform.INCOMM.toString(), identifier.getPartner());
                             } else {
                                 legacyIdentifier = this.identifierRepository.findOneByIdentifierTypeAndValueAndPlatform(identifier.getIdentifierType(), identifier.getValue(), AplsPlatform.INCOMM.toString());
                             }
                             if (legacyIdentifier != null) {
                                 legacyIdentifier.getSelections()
                                                 .add(selection);
                                 legacyIdentifiers.add(legacyIdentifier);
                             }
                         });
                if (!legacyIdentifiers.isEmpty()) {
                    selection.getIdentifiers()
                             .addAll(legacyIdentifiers);
                    this.selectionRepository.saveAndFlush(selection);
                }
            }
        }
    }

    private void associateAllCommentsToSelectionIdentifiers(Selection selection) {
        for (Identifier identifier : selection.getIdentifiers()) {
            for (Comment comment : selection.getSession()
                                            .getComments()) {
                identifier.getComments()
                          .add(comment);
                comment.getIdentifiers()
                       .add(identifier);
            }
        }
    }

    @Transactional
    public Selection updateOne(Selection request) {
        Selection existing = this.findOne(request.getId());
        if (existing == null) {
            throw new IllegalArgumentException("No Selection found with this ID");
        }

        existing.setDescription(request.getDescription());
        return existing;
    }

    private Selection populateSelectionFromRequest(Selection request) {
        Selection selection = new Selection();
        selection.setId(request.getId());
        selection.setDescription(request.getDescription());
        selection.setType(request.getType());
        selection.setPlatform(request.getPlatform());
        selection.setSimplePartner(request.getSimplePartner());

        //Process the partner if needed
        if (request.getPartner() != null && StringUtils.isNotBlank(request.getPartner()
                                                                          .getName())) {
            Partner partner = partnerService.findOneByNameAndPlatform(request.getPartner()
                                                                             .getName(), request.getPlatform());

            if (partner != null && StringUtils.isNotBlank(partner.getType())) {
                selection.setPartner(partner);
            }
        }

        //Process the identifiers
        for (Identifier identifier : request.getIdentifiers()) {
            String aplsPlatform = getDefaultPlatformType(identifier.getIdentifierType(), request.getPlatform());

            Identifier existingIdentifier = null;
            switch (request.getPlatform()) {
                case "BOL":
                case "ECOMM":
                    existingIdentifier = identifierRepository.findOneByIdentifierTypeAndValueAndPlatformAndPartner(identifier.getIdentifierType(), identifier.getValue(), aplsPlatform, selection.getSimplePartner());
                    break;
                default:
                    existingIdentifier = identifierRepository.findOneByIdentifierTypeAndValueAndPlatform(identifier.getIdentifierType(), identifier.getValue(), aplsPlatform);
                    break;
            }

            if (existingIdentifier != null) {
                selection.getIdentifiers()
                         .add(existingIdentifier);
            } else {
                identifier.setPlatform(aplsPlatform);
                identifier.setPartner(selection.getSimplePartner());
                selection.getIdentifiers()
                         .add(identifier);
            }
        }

        return selection;
    }

    public String getDefaultPlatformType(String identifierType, String selectionPlatform) {
	    /*
	        The platform we store on the identifier must be the PARENT platform,
            so that regardless of you having pulled up a SN 12345 as GREENCARD or
            INCOMM, you see the same notes together, because SN 12345 is actually
            an INCOMM SN, even though it's used in the GC child platform.
             */
        switch (identifierType) {
            case IdentifierType.ACCOUNT_ID:
            case IdentifierType.ACCOUNT_NUMBER:
            case IdentifierType.CUSTOMERID:
            case IdentifierType.ORDER_ID:
            case IdentifierType.ORDER_NUMBER:
                return selectionPlatform.toUpperCase();
            case IdentifierType.REVERSEVRNBYCONTROLNUMBER:
                return AplsPlatform.SRL.toString();
            case IdentifierType.LOCATIONID:
            case IdentifierType.ANI:
                return AplsPlatform.MDM.toString();
            default:
                AplsPlatform userDefaultPlatform = userService.getDefaultPlatform();
                return userDefaultPlatform != null ? userDefaultPlatform.toString() : null;
        }
    }

    /**
     * Doesn't actually delete the selection. It just marks it as deleted so it no longer appears in the UI, and breaks
     * associations to existing comments in the selection's session.
     */
    @Transactional
    public void removeOne(Long id) {
        try {
            if (!securityService.hasPermission(ManagedPermission.REMOVE_SELECTION)) {
                throw new SecurityViolationException();
            }

            Selection selection = selectionRepository.findById(id)
                                                     .orElse(null);
            if (selection == null) {
                throw new IllegalArgumentException("Selection Not Found");
            }

            selection.setDeletedDate(new Date());

            Long sessionId = selection.getSession()
                                      .getId();

            //Break comment associations
            for (Identifier identifier : selection.getIdentifiers()) {
                Map<String, Object> params = new HashMap<>();
                params.put("identifierId", identifier.getId());
                params.put("sessionId", sessionId);

                this.jdbcTemplate.update(QUERY_REMOVE_IDENTIFIER_COMMENTS, params);
            }
        } catch (SecurityViolationException e) {
            CsCoreLogger.warn("Unauthorized attempt to remove selection from session")
                        .keyValue("selectionId", id)
                        .build();
            throw e;
        } catch (IllegalArgumentException e) {
            CsCoreLogger.warn("Bad attempt to remove selection from session")
                        .keyValue("selectionId", id)
                        .keyValue("cause", e.getMessage())
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.warn("Failed to remove selection from session")
                        .keyValue("selectionId", id)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public void validateSelection(Selection request) {
        if (request == null) {
            throw new IllegalArgumentException("Selection data must be provided");
        } else if (request.getIdentifiers()
                          .isEmpty()) {
            throw new IllegalArgumentException("Selection must contain at least one identifier");
        } else if (request.getPlatform() == null) {
            throw new IllegalArgumentException("Selection must have a platform");
        } else if (request.getType() == null) {
            throw new IllegalArgumentException("Selection must have a type");
        }
    }

    public void validateIdentifier(Identifier identifier) {
        if (identifier == null) {
            throw new IllegalArgumentException("Identifier data must be provided");
        } else if (identifier.getIdentifierType() == null) {
            throw new IllegalArgumentException("Identifier must have a type");
        } else if (StringUtils.isBlank(identifier.getValue())) {
            throw new IllegalArgumentException("Identifier must have an identifier value");
        }
        String aplsPlatform = getDefaultPlatformType(identifier.getIdentifierType(), identifier.getPlatform());
        identifier.setPlatform(aplsPlatform);
    }

}
