package com.incomm.cca.model.domain.session;

import com.incomm.cca.model.constant.CardType;
import com.incomm.cscore.mvcutils.model.CrudEntity;
import org.apache.commons.lang3.StringUtils;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table
public class Card implements Serializable, CrudEntity<Long> {

    private Long id;
    private CardsComponent cardsComponent;
    private Integer cardSet;
    private String cardType;
    private Double incommLoadAmount;
    private String lastFour;
    private Double merchantLoadAmount;
    private String note;
    private Double recoveredAmount;
    private Long selectionId;
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
    private List<AuditCardWorkflowActivity> histories = new ArrayList<>();

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    @ManyToOne(cascade = {CascadeType.MERGE})
    @JoinColumn(name = "card_component_id")
    public CardsComponent getCardsComponent() {
        return cardsComponent;
    }

    public void setCardsComponent(final CardsComponent cardsComponent) {
        this.cardsComponent = cardsComponent;
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

    public Double getIncommLoadAmount() {
        return incommLoadAmount;
    }

    public void setIncommLoadAmount(final Double incommLoadAmount) {
        this.incommLoadAmount = incommLoadAmount;
    }

    public String getLastFour() {
        return lastFour;
    }

    public void setLastFour(final String lastFour) {
        this.lastFour = lastFour;
    }

    public Double getMerchantLoadAmount() {
        return merchantLoadAmount;
    }

    public void setMerchantLoadAmount(final Double merchantLoadAmount) {
        this.merchantLoadAmount = merchantLoadAmount;
    }

    public String getNote() {
        return note;
    }

    public void setNote(final String note) {
        this.note = note;
    }

    public Double getRecoveredAmount() {
        return recoveredAmount;
    }

    public void setRecoveredAmount(final Double recoveredAmount) {
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

    @OneToMany(mappedBy = "card", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE}, orphanRemoval = true)
    public List<AuditCardWorkflowActivity> getHistories() {
        return histories;
    }

    public void setHistories(final List<AuditCardWorkflowActivity> histories) {
        this.histories = histories;
    }

    @Override
    public void validate() throws IllegalArgumentException {
        if (this.cardsComponent == null) {
            throw new IllegalArgumentException("Card must be associated to a Card Component");
        } else if (this.cardSet == null || this.cardSet <= 0) {
            throw new IllegalArgumentException("Card set must be greater than 0");
        } else if (StringUtils.isBlank(CardType.valueOf(this.cardType))) {
            throw new IllegalArgumentException(String.format("Card type must be one of: %s", StringUtils.join(CardType.values(), ", ")));
        } else if (StringUtils.isNotBlank(this.lastFour) && this.lastFour.length() != 4) {
            throw new IllegalArgumentException("Last four must be four digits");
        }
    }
}
