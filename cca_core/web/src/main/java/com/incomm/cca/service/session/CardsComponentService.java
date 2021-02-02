package com.incomm.cca.service.session;

import com.incomm.cca.exception.SecurityViolationException;
import com.incomm.cca.model.domain.session.Card;
import com.incomm.cca.model.domain.session.CardsComponent;
import com.incomm.cca.service.CcaAbstractCrudService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CardsComponentService extends CcaAbstractCrudService<CardsComponent, Long> {

    @Autowired
    private CardService cardService;

    public Card addOneCard(Long id, Card request) {
        CardsComponent cardsComponent = findOne(id);
        if (cardsComponent == null) {
            throw new IllegalArgumentException("No Card Component found with this ID");
        }

        request.setCardsComponent(cardsComponent);
        return cardService.addOne(request);
    }

    @Override
    protected String getModelName() {
        return CardsComponent.class.getSimpleName();
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
    protected void controlledUpdateOne(final CardsComponent source, final CardsComponent target) {

    }

    @Override
    protected void validateUnique(final CardsComponent cardsComponent) throws IllegalArgumentException {

    }
}
