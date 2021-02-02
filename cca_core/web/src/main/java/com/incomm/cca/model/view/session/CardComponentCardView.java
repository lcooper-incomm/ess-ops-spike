package com.incomm.cca.model.view.session;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cscore.gringotts.model.CsCoreCurrency;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class CardComponentCardView implements Serializable {

    private Long id;
    private Integer cardSet;
    private String cardType;
    private CsCoreCurrency incommLoadAmount;
    private Boolean isActivated = false;
    private Boolean isApproved = false;
    private Boolean isAwaitingItActivation = false;
    private Boolean isCheckIssued = false;
    private Boolean isDeactivated = false;
    private Boolean isDenied = false;
    private Boolean isFundsRemoved = false;
    private Boolean isItActivated = false;
    private Boolean isLoaded = false;
    private Boolean isNeedingCheckIssued = false;
    private Boolean isNeedingReplacement = false;
    private Boolean isReplaced = false;
    private Boolean isSeekingApproval = false;
    private Boolean isShipped = false;
    private String lastFour;
    private CsCoreCurrency merchantLoadAmount;
    private String note;
    private CsCoreCurrency recoveredAmount;
    private Long selectionId;

    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public Integer getCardSet() {
        return cardSet;
    }

    public void setCardSet(final Integer cardSet) {
        this.cardSet = cardSet;
    }

    public String getCardType() {
        return cardType;
    }

    public void setCardType(final String cardType) {
        this.cardType = cardType;
    }

    public CsCoreCurrency getIncommLoadAmount() {
        return incommLoadAmount;
    }

    public void setIncommLoadAmount(final CsCoreCurrency incommLoadAmount) {
        this.incommLoadAmount = incommLoadAmount;
    }

    public String getLastFour() {
        return lastFour;
    }

    public void setLastFour(final String lastFour) {
        this.lastFour = lastFour;
    }

    public CsCoreCurrency getMerchantLoadAmount() {
        return merchantLoadAmount;
    }

    public void setMerchantLoadAmount(final CsCoreCurrency merchantLoadAmount) {
        this.merchantLoadAmount = merchantLoadAmount;
    }

    public String getNote() {
        return note;
    }

    public void setNote(final String note) {
        this.note = note;
    }

    public CsCoreCurrency getRecoveredAmount() {
        return recoveredAmount;
    }

    public void setRecoveredAmount(final CsCoreCurrency recoveredAmount) {
        this.recoveredAmount = recoveredAmount;
    }

    public Long getSelectionId() {
        return selectionId;
    }

    public void setSelectionId(final Long selectionId) {
        this.selectionId = selectionId;
    }

    public Boolean getIsActivated() {
        return isActivated;
    }

    public void setIsActivated(final Boolean activated) {
        isActivated = activated;
    }

    public Boolean getIsApproved() {
        return isApproved;
    }

    public void setIsApproved(final Boolean approved) {
        isApproved = approved;
    }

    public Boolean getIsAwaitingItActivation() {
        return isAwaitingItActivation;
    }

    public void setIsAwaitingItActivation(final Boolean awaitingItActivation) {
        isAwaitingItActivation = awaitingItActivation;
    }

    public Boolean getIsCheckIssued() {
        return isCheckIssued;
    }

    public void setIsCheckIssued(final Boolean checkIssued) {
        isCheckIssued = checkIssued;
    }

    public Boolean getIsDeactivated() {
        return isDeactivated;
    }

    public void setIsDeactivated(final Boolean deactivated) {
        isDeactivated = deactivated;
    }

    public Boolean getIsDenied() {
        return isDenied;
    }

    public void setIsDenied(final Boolean denied) {
        isDenied = denied;
    }

    public Boolean getIsFundsRemoved() {
        return isFundsRemoved;
    }

    public void setIsFundsRemoved(final Boolean fundsRemoved) {
        isFundsRemoved = fundsRemoved;
    }

    public Boolean getIsItActivated() {
        return isItActivated;
    }

    public void setIsItActivated(final Boolean itActivated) {
        isItActivated = itActivated;
    }

    public Boolean getIsLoaded() {
        return isLoaded;
    }

    public void setIsLoaded(final Boolean loaded) {
        isLoaded = loaded;
    }

    public Boolean getIsNeedingCheckIssued() {
        return isNeedingCheckIssued;
    }

    public void setIsNeedingCheckIssued(final Boolean needingCheckIssued) {
        isNeedingCheckIssued = needingCheckIssued;
    }

    public Boolean getIsNeedingReplacement() {
        return isNeedingReplacement;
    }

    public void setIsNeedingReplacement(final Boolean needingReplacement) {
        isNeedingReplacement = needingReplacement;
    }

    public Boolean getIsReplaced() {
        return isReplaced;
    }

    public void setIsReplaced(final Boolean replaced) {
        isReplaced = replaced;
    }

    public Boolean getIsSeekingApproval() {
        return isSeekingApproval;
    }

    public void setIsSeekingApproval(final Boolean seekingApproval) {
        isSeekingApproval = seekingApproval;
    }

    public Boolean getIsShipped() {
        return isShipped;
    }

    public void setIsShipped(final Boolean shipped) {
        isShipped = shipped;
    }
}
