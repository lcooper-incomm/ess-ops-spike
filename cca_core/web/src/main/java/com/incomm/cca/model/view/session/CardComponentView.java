package com.incomm.cca.model.view.session;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class CardComponentView implements Serializable {

    private Long id;
    private List<CardSetView> cardSets = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public List<CardSetView> getCardSets() {
        return cardSets;
    }

    public void setCardSets(final List<CardSetView> cardSets) {
        this.cardSets = cardSets;
    }

}
