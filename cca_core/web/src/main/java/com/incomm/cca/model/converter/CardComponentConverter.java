package com.incomm.cca.model.converter;

import com.incomm.cca.model.constant.CardType;
import com.incomm.cca.model.domain.session.Card;
import com.incomm.cca.model.domain.session.CardsComponent;
import com.incomm.cca.model.view.session.CardComponentCardView;
import com.incomm.cca.model.view.session.CardComponentView;
import com.incomm.cca.model.view.session.CardSetView;
import com.incomm.cscore.gringotts.GringottsExchange;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

@Service
public class CardComponentConverter {

    public CardComponentView convert(CardsComponent request) {
        CardComponentView view = null;

        if (request != null) {
            view = new CardComponentView();
            view.setId(request.getId());

            view.getCardSets()
                .addAll(this.sortCardsIntoSets(request.getCards()));
        }

        return view;
    }

    public CardComponentCardView convert(Card request) {
        CardComponentCardView view = null;

        if (request != null) {
            view = new CardComponentCardView();
            view.setId(request.getId());
            view.setCardSet(request.getCardSet());
            view.setCardType(request.getCardType());
            view.setIncommLoadAmount(GringottsExchange.quickExchange(request.getIncommLoadAmount()));
            view.setIsActivated(request.getIsActivated());
            view.setIsApproved(request.getIsApproved());
            view.setIsAwaitingItActivation(request.getIsAwaitingItActivation());
            view.setIsCheckIssued(request.getIsCheckIssued());
            view.setIsDeactivated(request.getIsDeactivated());
            view.setIsDenied(request.getIsDenied());
            view.setIsFundsRemoved(request.getIsFundsRemoved());
            view.setIsItActivated(request.getIsItActivated());
            view.setIsLoaded(request.getIsLoaded());
            view.setIsNeedingCheckIssued(request.getIsNeedingCheckIssued());
            view.setIsNeedingReplacement(request.getIsNeedingReplacement());
            view.setIsReplaced(request.getIsReplaced());
            view.setIsSeekingApproval(request.getIsSeekingApproval());
            view.setIsShipped(request.getIsShipped());
            view.setLastFour(request.getLastFour());
            view.setMerchantLoadAmount(GringottsExchange.quickExchange(request.getMerchantLoadAmount()));
            view.setNote(request.getNote());
            view.setRecoveredAmount(GringottsExchange.quickExchange(request.getRecoveredAmount()));
            view.setSelectionId(request.getSelectionId());
        }

        return view;
    }

    private List<CardSetView> sortCardsIntoSets(List<Card> cards) {
        List<CardSetView> views = new ArrayList<>();

        if (cards != null) {
            Map<Integer, CardSetView> setMap = new TreeMap<>();

            cards.forEach(card -> {
                CardSetView set = setMap.get(card.getCardSet());
                if (set == null) {
                    set = new CardSetView();
                    set.setId(card.getCardSet());
                    setMap.put(card.getCardSet(), set);
                }

                CardComponentCardView cardView = this.convert(card);
                switch (card.getCardType()) {
                    case CardType.ACTIVE:
                        set.setActiveCard(cardView);
                        break;
                    case CardType.INACTIVE:
                        set.setInactiveCard(cardView);
                        break;
                    case CardType.REPLACEMENT:
                        set.setReplacementCard(cardView);
                        break;
                }
            });

            views.addAll(setMap.values());
        }

        return views;
    }
}
