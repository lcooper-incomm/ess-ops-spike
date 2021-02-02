package com.incomm.cca.model.view.session;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class CardSetView implements Serializable {

    private Integer id;
    private CardComponentCardView activeCard;
    private CardComponentCardView inactiveCard;
    private CardComponentCardView replacementCard;

    public Integer getId() {
        return id;
    }

    public void setId(final Integer id) {
        this.id = id;
    }

    public CardComponentCardView getActiveCard() {
        return activeCard;
    }

    public void setActiveCard(final CardComponentCardView activeCard) {
        this.activeCard = activeCard;
    }

    public CardComponentCardView getInactiveCard() {
        return inactiveCard;
    }

    public void setInactiveCard(final CardComponentCardView inactiveCard) {
        this.inactiveCard = inactiveCard;
    }

    public CardComponentCardView getReplacementCard() {
        return replacementCard;
    }

    public void setReplacementCard(final CardComponentCardView replacementCard) {
        this.replacementCard = replacementCard;
    }
}
