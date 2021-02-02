package com.incomm.cca.controller.session;

import com.incomm.cca.controller.RestResponseHandler;
import com.incomm.cca.model.converter.CardComponentConverter;
import com.incomm.cca.model.domain.session.Card;
import com.incomm.cca.model.domain.session.CardsComponent;
import com.incomm.cca.service.session.CardService;
import com.incomm.cca.service.session.CardsComponentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest/card-component")
public class CardsComponentController extends RestResponseHandler {

    @Autowired
    private CardService cardService;
    @Autowired
    private CardComponentConverter cardComponentConverter;
    @Autowired
    private CardsComponentService cardsComponentService;

    @RequestMapping(value = "/{id}/card", method = RequestMethod.POST)
    public ResponseEntity addOneCard(@PathVariable("id") Long id, @RequestBody Card request) {
        Card domainModel = cardsComponentService.addOneCard(id, request);
        return ok(cardComponentConverter.convert(domainModel));
    }

    @RequestMapping(value = "/card/{cardId}", method = RequestMethod.DELETE)
    public ResponseEntity deleteOneCard(@PathVariable("cardId") Long cardId) {
        cardService.deleteOne(cardId);
        return noContent();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public ResponseEntity updateOne(@PathVariable("id") Long id, @RequestBody CardsComponent request) {
        CardsComponent domainModel = cardsComponentService.updateOne(request);
        return ok(cardComponentConverter.convert(domainModel));
    }

    @RequestMapping(value = "/card/{id}", method = RequestMethod.PUT)
    public ResponseEntity updateOneCard(@PathVariable("id") Long id, @RequestBody Card request) {
        Card domainModel = cardService.updateOne(request);
        return ok(cardComponentConverter.convert(domainModel));
    }
}
