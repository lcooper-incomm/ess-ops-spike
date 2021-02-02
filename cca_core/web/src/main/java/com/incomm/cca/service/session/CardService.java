package com.incomm.cca.service.session;

import com.incomm.cca.exception.SecurityViolationException;
import com.incomm.cca.model.constant.CardField;
import com.incomm.cca.model.domain.session.AuditCardWorkflowActivity;
import com.incomm.cca.model.domain.session.Card;
import com.incomm.cca.repository.session.CardRepository;
import com.incomm.cca.service.CcaAbstractCrudService;
import com.incomm.cca.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Service
public class CardService extends CcaAbstractCrudService<Card, Long> {

    @Autowired
    private CardRepository cardRepository;
    @Autowired
    private AuditCardWorkflowActivityService workflowActivityService;
    @Autowired
    private UserService userService;

    @Override
    protected String getModelName() {
        return Card.class.getSimpleName();
    }

    @Override
    protected void validateAddPermission() throws SecurityViolationException {

    }

    @Override
    protected void validateDeletePermission() throws SecurityViolationException {

    }

    @Override
    protected void validateFindPermission() throws SecurityViolationException {

    }

    @Override
    protected void validateUpdatePermission() throws SecurityViolationException {

    }

    @Override
    protected void controlledUpdateOne(final Card source, final Card target) {
        target.setIncommLoadAmount(source.getIncommLoadAmount());
        target.setMerchantLoadAmount(source.getMerchantLoadAmount());
        target.setRecoveredAmount(source.getRecoveredAmount());
        target.setNote(source.getNote());
        target.setCardType(source.getCardType());

        Date requestDate = new Date();

        //Workflow updates require adding a history record
        if (!target.getIsActivated()
                   .equals(source.getIsActivated())) {
            addOneCardWorkflowHistory(CardField.IS_ACTIVATED, target.getIsActivated(), source.getIsActivated(), target, requestDate);
            target.setIsActivated(source.getIsActivated());
        }
        if (!target.getIsApproved()
                   .equals(source.getIsApproved())) {
            addOneCardWorkflowHistory(CardField.IS_APPROVED, target.getIsApproved(), source.getIsApproved(), target, requestDate);
            target.setIsApproved(source.getIsApproved());
        }
        if (!target.getIsAwaitingItActivation()
                   .equals(source.getIsAwaitingItActivation())) {
            addOneCardWorkflowHistory(CardField.IS_AWAITING_IT_ACTIVATION, target.getIsAwaitingItActivation(), source.getIsAwaitingItActivation(), target, requestDate);
            target.setIsAwaitingItActivation(source.getIsAwaitingItActivation());
        }
        if (!target.getIsCheckIssued()
                   .equals(source.getIsCheckIssued())) {
            addOneCardWorkflowHistory(CardField.IS_CHECK_ISSUED, target.getIsCheckIssued(), source.getIsCheckIssued(), target, requestDate);
            target.setIsCheckIssued(source.getIsCheckIssued());
        }
        if (!target.getIsDeactivated()
                   .equals(source.getIsDeactivated())) {
            addOneCardWorkflowHistory(CardField.IS_DEACTIVATED, target.getIsDeactivated(), source.getIsDeactivated(), target, requestDate);
            target.setIsDeactivated(source.getIsDeactivated());
        }
        if (!target.getIsDenied()
                   .equals(source.getIsDenied())) {
            addOneCardWorkflowHistory(CardField.IS_DENIED, target.getIsDenied(), source.getIsDenied(), target, requestDate);
            target.setIsDenied(source.getIsDenied());
        }
        if (!target.getIsFundsRemoved()
                   .equals(source.getIsFundsRemoved())) {
            addOneCardWorkflowHistory(CardField.IS_FUNDS_REMOVED, target.getIsFundsRemoved(), source.getIsFundsRemoved(), target, requestDate);
            target.setIsFundsRemoved(source.getIsFundsRemoved());
        }
        if (!target.getIsItActivated()
                   .equals(source.getIsItActivated())) {
            addOneCardWorkflowHistory(CardField.IS_IT_ACTIVATED, target.getIsItActivated(), source.getIsItActivated(), target, requestDate);
            target.setIsItActivated(source.getIsItActivated());
        }
        if (!target.getIsLoaded()
                   .equals(source.getIsLoaded())) {
            addOneCardWorkflowHistory(CardField.IS_LOADED, target.getIsLoaded(), source.getIsLoaded(), target, requestDate);
            target.setIsLoaded(source.getIsLoaded());
        }
        if (!target.getIsNeedingCheckIssued()
                   .equals(source.getIsNeedingCheckIssued())) {
            addOneCardWorkflowHistory(CardField.IS_NEEDING_CHECK_ISSUED, target.getIsNeedingCheckIssued(), source.getIsNeedingCheckIssued(), target, requestDate);
            target.setIsNeedingCheckIssued(source.getIsNeedingCheckIssued());
        }
        if (!target.getIsNeedingReplacement()
                   .equals(source.getIsNeedingReplacement())) {
            addOneCardWorkflowHistory(CardField.IS_NEEDING_REPLACEMENT, target.getIsNeedingReplacement(), source.getIsNeedingReplacement(), target, requestDate);
            target.setIsNeedingReplacement(source.getIsNeedingReplacement());
        }
        if (!target.getIsReplaced()
                   .equals(source.getIsReplaced())) {
            addOneCardWorkflowHistory(CardField.IS_REPLACED, target.getIsReplaced(), source.getIsReplaced(), target, requestDate);
            target.setIsReplaced(source.getIsReplaced());
        }
        if (!target.getIsSeekingApproval()
                   .equals(source.getIsSeekingApproval())) {
            addOneCardWorkflowHistory(CardField.IS_SEEKING_APPROVAL, target.getIsSeekingApproval(), source.getIsSeekingApproval(), target, requestDate);
            target.setIsSeekingApproval(source.getIsSeekingApproval());
        }
        if (!target.getIsShipped()
                   .equals(source.getIsShipped())) {
            addOneCardWorkflowHistory(CardField.IS_SHIPPED, target.getIsShipped(), source.getIsShipped(), target, requestDate);
            target.setIsShipped(source.getIsShipped());
        }
    }

    @Transactional
    protected void addOneCardWorkflowHistory(String field, Boolean fromValue, Boolean toValue, Card card, Date requestDate) {
        AuditCardWorkflowActivity history = new AuditCardWorkflowActivity();
        history.setCard(card);
        history.setFieldName(field);
        history.setFromValue(fromValue);
        history.setToValue(toValue);
        history.setCreatedDate(requestDate);
        history.setUser(userService.currentPersistentUser());

        card.getHistories()
            .add(history);

        workflowActivityService.addOne(history);
    }

    @Override
    protected void validateUnique(final Card card) throws IllegalArgumentException {

    }
}
