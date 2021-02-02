package com.incomm.cca.service;

import com.incomm.apls.model.requests.AplsRequestLocation;
import com.incomm.cca.exception.SecurityViolationException;
import com.incomm.cca.model.constant.IdentifierType;
import com.incomm.cca.model.constant.SelectionType;
import com.incomm.cca.model.converter.CcaCardConverter;
import com.incomm.cca.model.converter.SelectionConverter;
import com.incomm.cca.model.converter.SessionConverter;
import com.incomm.cca.model.domain.Identifier;
import com.incomm.cca.model.domain.session.Selection;
import com.incomm.cca.model.domain.session.Session;
import com.incomm.cca.model.enums.ManagedPermission;
import com.incomm.cca.model.enums.apls.AplsIdentifier;
import com.incomm.cca.model.view.session.SessionView;
import com.incomm.cca.model.view.session.selection.SelectionView;
import com.incomm.cca.service.apls.AplsCardService;
import com.incomm.cca.service.apls.AplsCustomerService;
import com.incomm.cca.service.apls.AplsNodeService;
import com.incomm.cscore.client.apls.constant.AplsPlatform;
import com.incomm.cscore.client.apls.model.card.EnhancedCard;
import com.incomm.cscore.client.apls.model.card.EnhancedCards;
import com.incomm.cscore.client.apls.model.customer.EnhancedCustomer;
import com.incomm.cscore.client.apls.model.node.EnhancedLocation;
import com.incomm.cscore.client.apls.model.node.EnhancedLocations;
import com.incomm.cscore.logging.CsCoreLogger;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class SessionSummaryService {

    @Autowired
    private CcaCardConverter cardConverter;
    @Autowired
    private SelectionConverter selectionConverter;
    @Autowired
    private SessionConverter sessionConverter;
    @Autowired
    private SessionService sessionService;
    @Autowired
    private AplsCardService cardService;
    @Autowired
    private AplsNodeService nodeService;
    @Autowired
    private AplsCustomerService customerService;
    @Autowired
    private SecurityService securityService;

    public SessionView getSessionSummary(Long id) {
        try {
            if (!securityService.hasPermission(ManagedPermission.API_SESSION_SUMMARY)) {
                throw new SecurityViolationException();
            }

            Session session = sessionService.findOne(id);

            //Build basic summary
            SessionView viewModel = sessionConverter.convertSummary(session);

            //Get selection details
            for (Selection selection : session.getSelections()) {
                SelectionView selectionView = selectionConverter.convert(selection);

                switch (selection.getType()) {
                    case SelectionType.CARD:
                        selectionView.setData(getProductDetails(selection));
                        break;
                    case SelectionType.LOCATION:
                        selectionView.setData(getLocationDetails(selection));
                        break;
                    case SelectionType.CUSTOMER:
                        selectionView.setData(getCustomerDetails(selection));
                        break;
                }

                viewModel.getSelections()
                         .add(selectionView);
            }

            return viewModel;
        } catch (SecurityViolationException e) {
            CsCoreLogger.warn("Unauthorized attmept to retrieve session summary")
                        .keyValue("sessionId", id)
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to retrieve session summary")
                        .keyValue("sessionId", id)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    //TODO This very likely can be moved into another service and reused, even by the front-end

    /**
     * Given a list of identifiers (presumably from a Selection),
     */
    private EnhancedCard getProductDetails(Selection selection) {
        List<Identifier> identifiers = new ArrayList<>();
        identifiers.addAll(selection.getIdentifiers());

        //The primaryIdentifier simply means the FIRST one we need to search on
        Identifier primaryIdentifier = getPrimaryIdentifier(identifiers);
        Identifier secondaryIdentifier = null;

        //If we didn't nail down a primaryIdentifier, we can't search
        if (primaryIdentifier == null) {
            return null;
        }

        //If we have more than one identifier, and successfully found our primary, continue and select our secondary
        if (identifiers.size() == 2) {
            for (Identifier identifier : identifiers) {
                if (!Objects.equals(identifier.getIdentifierType(), primaryIdentifier.getIdentifierType())) {
                    secondaryIdentifier = identifier;
                }
            }
        }

        AplsIdentifier primaryAplsIdentifier = identifierTypeToAplsIdentifier(primaryIdentifier.getIdentifierType());
        if (primaryAplsIdentifier == null) {
            return null;
        }

        AplsIdentifier secondaryAplsIdentifier = null;
        if (secondaryIdentifier != null) {
            secondaryAplsIdentifier = identifierTypeToAplsIdentifier(secondaryIdentifier.getIdentifierType());
            if (secondaryAplsIdentifier == null) {
                return null;
            }
        }

        //Do our primary search
        EnhancedCards primaryResponse = null;
        try {
            primaryResponse = cardService.search(primaryAplsIdentifier, primaryIdentifier.getValue(), AplsPlatform.convert(selection.getPlatform()), false);
        } catch (Exception e) {
            CsCoreLogger.error("Failed to retrieve primary product for session summary")
                        .keyValue("sessionId", selection.getSession()
                                                        .getId())
                        .exception(e)
                        .build();
        }

        //If we found no results, unless it's a VAN, something's wrong
        if (primaryResponse == null || primaryResponse.getCards() == null || primaryResponse.getCards()
                                                                                            .isEmpty()) {
            CsCoreLogger.error("No results returned for session summary product search")
                        .keyValue("sessionId", selection.getSession()
                                                        .getId())
                        .keyValue("identifierType", primaryIdentifier.getIdentifierType())
                        .keyValue("identifier", primaryIdentifier.getValue())
                        .keyValue("platform", primaryIdentifier.getPlatform())
                        .build();
            return null;
        }

        //If we found one result and there's no secondaryIdentifier, return the one result
        if (primaryResponse.getCards()
                           .size() == 1 && secondaryIdentifier == null) {
            return primaryResponse.getCards()
                                  .get(0);
        }

        //If we found multiple results and there's no secondaryIdentifier, something's wrong
        if (primaryResponse.getCards()
                           .size() > 1 && secondaryIdentifier == null) {
            CsCoreLogger.error("Multiple results found when expected single result for session summary product search")
                        .keyValue("sessionId", selection.getSession()
                                                        .getId())
                        .keyValue("identifierType", primaryIdentifier.getIdentifierType())
                        .keyValue("identifier", primaryIdentifier.getValue())
                        .keyValue("platform", primaryIdentifier.getPlatform())
                        .build();
            return null;
        }

        //If we found multiple results and we have a secondaryIdentifier, do secondary search
        if (secondaryIdentifier != null) {
            //At this moment, it'd better be a SERIALNUMBER
            if (Objects.equals(secondaryIdentifier.getIdentifierType(), IdentifierType.SERIALNUMBER)) {
                //First, find the result from primarySearch that matches our secondaryIdentifier (secondaryIdentifier
                EnhancedCard primaryProduct = null;
                for (EnhancedCard productDto : primaryResponse.getCards()) {
                    if (productDto.getIdentifiers()
                                  .getSerialNumber()
                                  .equals(secondaryIdentifier.getValue())) {
                        primaryProduct = productDto;
                        break;
                    }
                }

                //If we don't find a match from the primary search, something's wrong
                if (primaryProduct == null) {
                    CsCoreLogger.error("No result matching secondaryIdentifier found for session summary product search!")
                                .keyValue("sessionId", selection.getSession()
                                                                .getId())
                                .keyValue("identifierType", primaryIdentifier.getIdentifierType())
                                .keyValue("identifier", primaryIdentifier.getValue())
                                .keyValue("platform", primaryIdentifier.getPlatform())
                                .keyValue("secondaryIdentifierType", secondaryIdentifier.getIdentifierType())
                                .keyValue("secondaryIdentifier", secondaryIdentifier.getValue())
                                .keyValue("secondaryPlatform", secondaryIdentifier.getPlatform())
                                .build();
                    return null;
                }

                //Perform secondary search
                EnhancedCards secondaryResponse = null;
                try {
                    secondaryResponse = cardService.search(secondaryAplsIdentifier, secondaryIdentifier.getValue(), AplsPlatform.convert(secondaryIdentifier.getPlatform()), false);
                } catch (Exception e) {
                    CsCoreLogger.error("Failed to retrieve secondary product for session summary")
                                .keyValue("sessionId", selection.getSession()
                                                                .getId())
                                .keyValue("identifierType", primaryIdentifier.getIdentifierType())
                                .keyValue("identifier", primaryIdentifier.getValue())
                                .keyValue("platform", primaryIdentifier.getPlatform())
                                .keyValue("secondaryIdentifierType", secondaryIdentifier.getIdentifierType())
                                .keyValue("secondaryIdentifier", secondaryIdentifier.getValue())
                                .keyValue("secondaryPlatform", secondaryIdentifier.getPlatform())
                                .exception(e)
                                .build();
                }

                //If we didn't get exactly one result, something's wrong
                if (secondaryResponse == null || secondaryResponse.getCards() == null || secondaryResponse.getCards()
                                                                                                          .size() != 1) {
                    CsCoreLogger.error("Multiple results found when expected single result for session summary product search")
                                .keyValue("sessionId", selection.getSession()
                                                                .getId())
                                .keyValue("identifierType", primaryIdentifier.getIdentifierType())
                                .keyValue("identifier", primaryIdentifier.getValue())
                                .keyValue("platform", primaryIdentifier.getPlatform())
                                .keyValue("secondaryIdentifierType", secondaryIdentifier.getIdentifierType())
                                .keyValue("secondaryIdentifier", secondaryIdentifier.getValue())
                                .keyValue("secondaryPlatform", secondaryIdentifier.getPlatform())
                                .build();
                    return null;
                }

                EnhancedCard secondaryProduct = secondaryResponse.getCards()
                                                                 .get(0);

                return cardConverter.convertSrl(secondaryProduct, primaryProduct);
            } else {
                CsCoreLogger.error("Unexpected secondaryIdentifier")
                            .keyValue("sessionId", selection.getSession()
                                                            .getId())
                            .keyValue("identifierType", primaryIdentifier.getIdentifierType())
                            .keyValue("identifier", primaryIdentifier.getValue())
                            .keyValue("platform", primaryIdentifier.getPlatform())
                            .keyValue("secondaryIdentifierType", secondaryIdentifier.getIdentifierType())
                            .keyValue("secondaryIdentifier", secondaryIdentifier.getValue())
                            .keyValue("secondaryPlatform", secondaryIdentifier.getPlatform())
                            .build();
                return null;
            }
        }

        CsCoreLogger.error("Failed to properly handle identifiers for session summary product search")
                    .build();

        return null;
    }

    /**
     * Given a single identifier, returns the single. Given multiple, returns one of:
     * REVERSEVRN,
     * CONTROLNUMBER,
     * REVERSEVRNBYCONTROLNUMBER
     * <p>
     * Which identifier is the FIRST identifier that needs to be searched.
     */
    private Identifier getPrimaryIdentifier(List<Identifier> identifiers) {
        if (identifiers == null || identifiers.isEmpty()) {
            CsCoreLogger.error("Failed to find primary identifier for session summary product search: No identifiers provided")
                        .build();

            return null;
        } else if (identifiers.size() == 1) {
            return identifiers.get(0);
        } else {
            //Keep track of identifierTypes in case we fail here
            List<String> identifierTypes = new ArrayList<>();

            for (Identifier identifier : identifiers) {
                switch (identifier.getIdentifierType()) {
                    case IdentifierType.CONTROLNUMBER:
                    case IdentifierType.REVERSEVRNBYCONTROLNUMBER:
                    case IdentifierType.REVERSEVRN:
                        return identifier;
                    default:
                        identifierTypes.add(identifier.getIdentifierType());
                        break;
                }
            }

            //Yup, we failed
            CsCoreLogger.error("Failed to find primary identifier for session summary product search: Did not find expected primary identifier in list")
                        .keyValue("identifierTypes", StringUtils.join(identifierTypes, ","))
                        .build();

            return null;
        }
    }

    public EnhancedLocation getLocationDetails(Selection selection) {
        List<Identifier> identifiers = new ArrayList<>(selection.getIdentifiers());
        Identifier locationIdentifier = identifiers.get(0);

        EnhancedLocations response = null;
        try {
            AplsRequestLocation aplsRequestLocation = new AplsRequestLocation();
            aplsRequestLocation.setLocationId(locationIdentifier.getValue());
            response = nodeService.getLocations(aplsRequestLocation);
        } catch (Exception e) {
            CsCoreLogger.error("Failed to retrieve location for session summary")
                        .exception(e)
                        .build();
        }
        return response != null ? response.getFirst() : null;
    }

    public EnhancedCustomer getCustomerDetails(Selection selection) {
        List<Identifier> identifiers = new ArrayList<>();
        identifiers.addAll(selection.getIdentifiers());
        Identifier identifier = identifiers.get(0);

        //If we don't have an identifier, or that identifier is NOT a CUSTOMERID, we can't do a search
        if (identifier == null || !Objects.equals(identifier.getIdentifierType(), IdentifierType.CUSTOMERID)) {
            CsCoreLogger.warn("Cannot perform a customer search for session summary without a CUSTOMERID")
                        .build();

            return null;
        }

        //If we don't have a partner, we can't do a search
        if (selection.getPartner() == null || StringUtils.isBlank(selection.getPartner()
                                                                           .getType())) {
            CsCoreLogger.warn("Cannot perform a customer search for session summary without an api key")
                        .build();

            return null;
        }

        //If we don't have a VMS Session ID (unlikely, but technically possible)
        if (StringUtils.isBlank(selection.getExternalSessionId())) {
            CsCoreLogger.warn("Cannot perform a customer search for session summary without a VMS Session")
                        .build();

            return null;
        }

        String aplsPartner = selection.getPartner()
                                      .getType();
        String vmsSessionId = selection.getExternalSessionId();

        EnhancedCustomer customer = null;
        try {
            customer = customerService.findOneWithApiKeyAndVMSSessionId(identifier.getValue(), aplsPartner, vmsSessionId);
        } catch (Exception e) {
            CsCoreLogger.error("Failed to retrieve customer for session summary")
                        .exception(e)
                        .build();
        }

        return customer;
    }

    private AplsIdentifier identifierTypeToAplsIdentifier(String identifierType) {
        try {
            if (identifierType != null) {
                return AplsIdentifier.valueOf(identifierType);
            }
            return null;
        } catch (IllegalArgumentException e) {
            CsCoreLogger.error("Failed to convert IdentifierType to AplsIdentifier")
                        .keyValue("identifierType", identifierType)
                        .build();

            return null;
        }
    }

}
