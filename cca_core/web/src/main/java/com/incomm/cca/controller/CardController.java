package com.incomm.cca.controller;

import com.incomm.apls.model.requests.ProductRegistrationRequest;
import com.incomm.apls.model.response.ProductRegistrationResponse;
import com.incomm.cca.model.constant.AuditActivityType;
import com.incomm.cca.model.domain.audit.AuditActivity;
import com.incomm.cca.model.enums.ManagedPermission;
import com.incomm.cca.model.enums.apls.AplsIdentifier;
import com.incomm.cca.model.view.action.DecryptPanRequestView;
import com.incomm.cca.model.view.action.ProductSearchRequestView;
import com.incomm.cca.model.view.response.GenericMessageView;
import com.incomm.cca.service.AuditService;
import com.incomm.cca.service.SecurityService;
import com.incomm.cca.service.apls.AplsCardService;
import com.incomm.cca.service.maples.MaplesAccountService;
import com.incomm.cca.service.maples.MaplesCardService;
import com.incomm.cca.util.GreencardPanEncryptionUtil;
import com.incomm.cscore.client.apls.constant.AplsPlatform;
import com.incomm.cscore.client.apls.model.card.EnhancedCard;
import com.incomm.cscore.client.apls.model.card.EnhancedCards;
import com.incomm.cscore.client.apls.model.card.EnhancedStatusResponseValue;
import com.incomm.cscore.client.maples.model.request.card.CardChangeStatusRequest;
import com.incomm.cscore.client.maples.model.request.card.CardCodesQuery;
import com.incomm.cscore.client.maples.model.request.card.CardReplacementRequest;
import com.incomm.cscore.client.maples.model.response.account.Account;
import com.incomm.cscore.client.maples.model.response.card.Card;
import com.incomm.cscore.client.maples.model.shared.CsCoreStatus;
import com.incomm.cscore.client.rest.CsCoreResponseException;
import com.incomm.cscore.logging.CsCoreLogger;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest/card")
public class CardController extends RestResponseHandler {

    @Autowired
    private AplsCardService cardService;
    @Autowired
    private AuditService auditService;
    @Autowired
    private SecurityService securityService;
    @Autowired
    private MaplesAccountService maplesAccountService;
    @Autowired
    private MaplesCardService maplesCardService;

    private static final String IDENTIFIER_ILLEGAL_ARGUMENT = "'identifier' must be provided";

    @PostMapping(value = "/search")
    public ResponseEntity search(@RequestBody ProductSearchRequestView requestDto, @RequestParam(value = "recentActivity", defaultValue = "false") Boolean recentActivity) {
        //Check identifier
        if (StringUtils.isBlank(requestDto.getIdentifier())) {
            return badRequest(IDENTIFIER_ILLEGAL_ARGUMENT);
        }

        EnhancedCards dto = cardService.search(requestDto.getAplsIdentifier(), requestDto.getIdentifier(), requestDto.getPlatform(), true, recentActivity);
        return ok(dto.getCards());
    }

    @PostMapping(value = "/pan/unmask")
    public ResponseEntity unmaskPan(@RequestBody DecryptPanRequestView requestDto) {
        AuditActivity auditActivity = auditService.createActivity(AuditActivityType.UNMASK_PAN);

        if (!securityService.hasPermission(ManagedPermission.UNMASK_PAN)) {
			auditService.saveRecordAsFailure(auditActivity);
            return forbidden();
        }

        try {
            String unmaskedPan = GreencardPanEncryptionUtil.decrypt(requestDto.getIdentifier());
            auditService.saveRecordAsSuccess(auditActivity);
            return ok(new GenericMessageView(unmaskedPan));
        } catch (Exception e) {
            CsCoreLogger.error("Error unmasking PAN")
                        .keyValue("identifier", requestDto.getIdentifier())
                        .exception(e)
                        .build();
            auditService.saveRecordAsFailure(auditActivity);
            return internalServerError();
        }
    }

    @GetMapping(value = "/pan/unmask/{serialNumber}")
    public ResponseEntity unmaskPan(
            @PathVariable("serialNumber") String serialNumber,
            @RequestParam(value = "platform", defaultValue = "GREENCARD") String platform,
            @RequestParam(value = "controlNumber", required = false) String controlNumber) {
        AuditActivity auditActivity = auditService.createActivity(AuditActivityType.UNMASK_PAN);

        if (!securityService.hasPermission(ManagedPermission.UNMASK_PAN)) {
			auditService.saveRecordAsFailure(auditActivity);
            return forbidden();
        }

        try {
            EnhancedCards cards = cardService.search(AplsIdentifier.SERIALNUMBER, serialNumber, AplsPlatform.convert(platform), false);
            EnhancedCard card = null;

            //Find the product
            if (cards != null) {
                if (cards.getCards()
                         .size() == 1) {
                    card = cards.getCards()
                                .get(0);
                } else if (StringUtils.isNotBlank(controlNumber)) {
                    for (EnhancedCard result : cards.getCards()) {
                        if (result.getIdentifiers()
                                  .getControlNumber()
                                  .equals(controlNumber)) {
                            card = result;
                            break;
                        }
                    }
                }
            }

            if (card == null) {
                CsCoreLogger.error("Error unmasking PAN, product not found")
                            .keyValue("serialNumber", serialNumber)
                            .keyValue("controlNumber", controlNumber)
                            .build();
				auditService.saveRecordAsFailure(auditActivity);
                return internalServerError();
            }

            String pan = GreencardPanEncryptionUtil.decrypt(card.getIdentifiers()
                                                                .getPan());
			auditService.saveRecordAsSuccess(auditActivity);
            return ok(new GenericMessageView(pan));
        } catch (CsCoreResponseException e) {
            CsCoreLogger.error("Bad attempt to unmask PAN")
                        .keyValue("serialNumber", serialNumber)
                        .keyValue("controlNumber", controlNumber)
                        .keyValue("cause", e.getMessage())
                        .build();
			auditService.saveRecordAsFailure(auditActivity);
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Error unmasking PAN")
                        .keyValue("serialNumber", serialNumber)
                        .keyValue("controlNumber", controlNumber)
                        .exception(e)
                        .build();
			auditService.saveRecordAsFailure(auditActivity);
            throw e;
        }
    }

    @GetMapping(value = "/payPal/pin/unmask/{serialNumber}")
    public ResponseEntity unmaskPin(
            @PathVariable("serialNumber") String serialNumber,
            @RequestParam(value = "platform", defaultValue = "INCOMM") String platform) {
        AuditActivity auditActivity = auditService.createActivity(AuditActivityType.UNMASK_PIN);

        if (!securityService.hasPermission(ManagedPermission.UNMASK_PIN)) {
            CsCoreLogger.warn("Unauthorized attempt to unmask payPal PIN")
                        .keyValue("serialNumber", serialNumber)
                        .build();
			auditService.saveRecordAsFailure(auditActivity);
            return forbidden();
        }

        try {
            EnhancedCards cards = cardService.search(AplsIdentifier.SERIALNUMBER, serialNumber, AplsPlatform.convert(platform), false);
            //Expect a single product
            if (cards != null && !cards.getCards()
                                       .isEmpty()) {
                EnhancedCard card = cards.getCards()
                                         .get(0);
                String pin = card.getIdentifiers()
                                 .getPin();
                CsCoreLogger.info("Unmasked payPal PIN")
                            .keyValue("serialNumber", serialNumber)
                            .build();
				auditService.saveRecordAsSuccess(auditActivity);
                return ok(pin);
            } else {
                CsCoreLogger.error("Error unmasking payPal PIN, expected single product")
                            .keyValue("serialNumber", serialNumber)
                            .build();
				auditService.saveRecordAsFailure(auditActivity);
                return internalServerError();
            }
        } catch (CsCoreResponseException e) {
            CsCoreLogger.error("Bad attempt to unmask payPal PIN")
                        .keyValue("serialNumber", serialNumber)
                        .keyValue("cause", e.getMessage())
                        .build();
			auditService.saveRecordAsFailure(auditActivity);
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Error unmasking payPal PIN")
                        .keyValue("serialNumber", serialNumber)
                        .exception(e)
                        .build();
			auditService.saveRecordAsFailure(auditActivity);
            return internalServerError();
        }
    }

    @PostMapping(value = "/orderNewCard")
    public ResponseEntity orderNewCard(@RequestBody ProductRegistrationRequest request) {
        ProductRegistrationResponse response = cardService.orderNewCard(request);
        return ok(response);
    }

    @GetMapping(value = "/status/serialNumber/{serialNumber}")
    public ResponseEntity findCardStatusBySerialNumber(@PathVariable("serialNumber") String serialNumber, @RequestParam("partner") String partner) {
        EnhancedStatusResponseValue status = cardService.findCardStatusBySerialNumber(serialNumber, partner);
        return ok(status);
    }

    @RequestMapping(value = "/cardId/{accountId}", method = RequestMethod.GET)
    public ResponseEntity getCardId(@PathVariable("accountId") String accountId) {
        Account account = this.maplesAccountService.findOne(accountId);
        Card activeCard = new Card();
        try {
            for (Card card : account.getCards()) {
                for (CsCoreStatus status : card.getStatuses()) {
                    if (status.getName() != null && status.getName().toLowerCase().equals("active")) {
                        activeCard.setId(card.getId());
                        break;
                    }
                }
                if (activeCard.getId() != null) {
                    break;
                }
            }
        } catch (Exception e) {
            badRequest("Could not find the card id.");
        }

        return ok(activeCard);
    }

    @RequestMapping(value = "/codes", method = RequestMethod.POST)
    public ResponseEntity searchCodes(@RequestBody CardCodesQuery request) {
        return ok(maplesCardService.searchCodes(request));
    }

    @RequestMapping(value = "/{cardId}/status", method = RequestMethod.POST)
    public ResponseEntity changeCardStatus(@PathVariable("cardId") String cardId, @RequestBody CardChangeStatusRequest request) {
        return ok(maplesCardService.changeCardStatus(cardId, request));
    }

    @PostMapping(value = "/{cardId}/replace")
    public ResponseEntity replace(@PathVariable("cardId") String cardId, @RequestBody CardReplacementRequest request) {
        return ok(maplesCardService.replace(cardId, request));
    }

    @GetMapping(value = "/history/{accountId}")
    public ResponseEntity getCardHistory(@PathVariable("accountId") String accountId) {
        return ok(maplesCardService.getCardHistory(accountId));
    }
}
