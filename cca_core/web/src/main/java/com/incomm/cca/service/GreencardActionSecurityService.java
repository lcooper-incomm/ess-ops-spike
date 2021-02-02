package com.incomm.cca.service;

import com.incomm.apls.model.requests.ActivateB2bCardRequest;
import com.incomm.apls.model.requests.ActivateGiftCardReplacementRequest;
import com.incomm.apls.model.requests.BalanceAdjustmentRequest;
import com.incomm.apls.model.requests.StatusChangeRequest;
import com.incomm.cca.exception.NotFoundException;
import com.incomm.cca.exception.SecurityViolationException;
import com.incomm.cca.model.domain.PlatformStatusValue;
import com.incomm.cca.model.enums.ManagedPermission;
import com.incomm.cca.model.enums.apls.AplsIdentifier;
import com.incomm.cca.model.view.codex.CcaCardSeed;
import com.incomm.cca.service.apls.AplsCardService;
import com.incomm.cca.service.codex.CodexSeedService;
import com.incomm.cca.service.codex.CodexService;
import com.incomm.cscore.client.apls.constant.AplsPlatform;
import com.incomm.cscore.client.apls.model.card.EnhancedCard;
import com.incomm.cscore.client.apls.model.card.EnhancedCards;
import com.incomm.cscore.client.apls.model.card.GiftCardReplacementRequest;
import com.incomm.cscore.client.apls.model.shared.EnhancedStatus;
import com.incomm.cscore.logging.CsCoreLogger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * This service determines whether the User is allowed to perform the given action in the given circumstances. Takes a different approach to authorization than the front-end greencardActionSecurityService,
 * because this is designed to throw SecurityViolationExceptions when the user CANNOT perform the action, and to do nothing else if the user CAN.
 */
@Service
public class GreencardActionSecurityService {

    @Autowired
    private AplsCardService aplsCardService;
    @Autowired
    private CodexService codexService;
    @Autowired
    private BalanceAdjustmentLimitService balanceAdjustmentLimitService;
    @Autowired
    private PlatformStatusValueService platformStatusValueService;
    @Autowired
    private SecurityService securityService;
    @Autowired
    private CodexSeedService seedService;
    @Autowired
    private UserService userService;

    public void authorizeReplaceCard(GiftCardReplacementRequest requestDto) {
        String identifier = requestDto != null ? requestDto.getSerialNumber() : null;

        if (!securityService.hasPermission(ManagedPermission.GC_REPLACE_CARD)) {
            throw new SecurityViolationException();
        }

        if (requestDto.getReplacePan() && !securityService.hasPermission(ManagedPermission.GC_REPLACE_CARD_USE_NEW_CARD_NUMBER)) {
            throw new SecurityViolationException();
        }

        //3. Look up the card
        EnhancedCard card = lookupCard(identifier);
        if (card == null || card.getAmounts() == null || card.getAmounts()
                                                             .getAvailableBalance() == null) {
            throw new SecurityViolationException();
        }
        //4. Make sure the status is valid
        EnhancedStatus greencardStatus = card.findStatusByPlatform(AplsPlatform.GREENCARD);
        String status = greencardStatus != null ? greencardStatus.getName() : null;
        if (status == null || (!status.equals("1" /*Initial*/) && !status.equals("8" /*Active*/) && !status.equals("08" /*Active*/) && !status.equals("15" /*Expired*/) && !status.equals("20" /*Stolen*/) && !status.equals("21" /*Lost*/) && !status.equals("12" /*LostStolen*/) && !status.equals("13" /*ReplacementRequested*/))) {
            throw new SecurityViolationException();
        }
    }

    public void authorizeChangeStatus(StatusChangeRequest requestDto) {
        String identifier = requestDto != null ? requestDto.getSerialNumber() : null;

        //3. Look up the card
        EnhancedCard card = lookupCard(identifier);
        if (card == null || card.getAmounts() == null || card.getAmounts()
                                                             .getAvailableBalance() == null) {
            throw new SecurityViolationException();
        }

        EnhancedStatus greencardStatus = card.findStatusByPlatform(AplsPlatform.GREENCARD);
        String status = greencardStatus != null ? greencardStatus.getName() : null;

        //We get the code (i.e. '1') from the product, but we need the "name" for most interactions in CCA
        PlatformStatusValue currentStatusValue = platformStatusValueService.findOneByValueAndPlatform(status, AplsPlatform.GREENCARD.toString());
        if (currentStatusValue == null) {
            throw new IllegalArgumentException(String.format("Unsupported status '%s' for Greencard", status));
        }

        PlatformStatusValue targetStatusValue = platformStatusValueService.findOneByValueAndPlatform(requestDto.getCardStatusCode(), AplsPlatform.GREENCARD.toString());
        if (targetStatusValue == null) {
            throw new IllegalArgumentException(String.format("Unsupported target status '%s' for Greencard", status));
        }

        CcaCardSeed seed = seedService.createChangeStatusSeed(AplsPlatform.GREENCARD, currentStatusValue);
        CcaCardSeed codexResponse = codexService.runGreencardChangeStatusCodex(seed);

        if (!codexResponse.getAllowedStatuses()
                          .contains(targetStatusValue.getName())) {
            throw new SecurityViolationException();
        }
    }

    public void authorizeActivateGiftCardReplacement(ActivateGiftCardReplacementRequest requestDto) {
        String identifier = requestDto != null ? requestDto.getSerialNumber() : null;

        //1. Check security groups and roles
        if (!securityService.hasPermission(ManagedPermission.GC_ACTIVATE_GIFT_CARD_REPLACEMENT)) {
            throw new SecurityViolationException();
        }

        //3. Look up the card
        EnhancedCard card = lookupCard(identifier);
        if (card == null || card.getAmounts() == null || card.getAmounts()
                                                             .getAvailableBalance() == null) {
            throw new SecurityViolationException();
        }
        //4. Make sure the status is valid
        EnhancedStatus greencardStatus = card.findStatusByPlatform(AplsPlatform.GREENCARD);
        String status = greencardStatus != null ? greencardStatus.getName() : null;
        if (status == null || !status.equals("13" /*ReplacementRequested*/)) {
            throw new SecurityViolationException();
        }
    }

    public void authorizeActivateB2BCard(ActivateB2bCardRequest requestDto) {
        String identifier = requestDto != null ? requestDto.getSerialNumber() : null;

        //1. Check security groups and roles
        if (!securityService.hasPermission(ManagedPermission.GC_ACTIVATE_B2B_CARD)) {
            throw new SecurityViolationException();
        }

        //3. Look up the card
        EnhancedCard card = lookupCard(identifier);
        if (card == null) {
            throw new SecurityViolationException();
        }
        //4. Make sure the status is valid
        EnhancedStatus greencardStatus = card.findStatusByPlatform(AplsPlatform.GREENCARD);
        String status = greencardStatus != null ? greencardStatus.getName() : null;
        if (status == null || (!status.equals("1" /*Initial*/) && !status.equals("01"))) {
            throw new SecurityViolationException();
        }
    }

    public void authorizeBalanceAdjustment(BalanceAdjustmentRequest requestDto) {
        //2. Look up the card
        EnhancedCard product = lookupCard(requestDto.getSerialNumber());
        if (product == null) {
            throw new SecurityViolationException();
        }

        //3. Validate status, permissions, and adjustment limits
        balanceAdjustmentLimitService.authorizeBalanceAdjustmentAgainstLimits(requestDto, product);
    }

    private EnhancedCard lookupCard(String serialNumber) {
        EnhancedCards cards = null;
        try {
            cards = aplsCardService.search(AplsIdentifier.SERIALNUMBER, serialNumber, AplsPlatform.GREENCARD, false);
        } catch (Exception e) {
            CsCoreLogger.error("Failed to look up product")
                        .keyValue("serialNumber", serialNumber)
                        .exception(e)
                        .build();
        }
        if (cards != null && cards.getCards()
                                  .size() == 1) {
            return cards.getCards()
                        .get(0);
        } else {
            int count = cards != null ? cards.getCards()
                                             .size() : 0;
            throw new NotFoundException(String.format("Found %s products when expected 1", count));
        }
    }
}
