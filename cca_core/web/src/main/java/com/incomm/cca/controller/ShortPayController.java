package com.incomm.cca.controller;

import com.incomm.cca.model.domain.ShortPay;
import com.incomm.cca.model.view.SimpleShortPayView;
import com.incomm.cca.service.ShortPayService;
import org.hibernate.TransactionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.orm.jpa.JpaSystemException;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/rest/shortPay")
public class ShortPayController extends RestResponseHandler {

    @Autowired
    private ShortPayService shortPayService;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity getAll() {
        List<ShortPay> shortPays = shortPayService.findAll();
        return ok(shortPays.stream()
                           .map(SimpleShortPayView::new)
                           .collect(Collectors.toList()));
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity addOne(
            @RequestParam(value = "override", defaultValue = "false") Boolean override,
            @RequestBody ShortPay shortPayRequest
    ) {
        try {
            ShortPay shortPay = shortPayService.addOne(shortPayRequest, override);
            return ok(new SimpleShortPayView(shortPay));
        } catch (Exception e) {
            return badRequest(e.getMessage(),
                    Arrays.asList(e.getMessage()));
        }
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
    public ResponseEntity deleteOne(@PathVariable("id") Long id) {
        shortPayService.deleteOne(id);
        return noContent();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public ResponseEntity updateOne(@PathVariable("id") Long id, @RequestBody ShortPay request) {
        ShortPay updated = shortPayService.updateOne(id, request);
        return ok(new SimpleShortPayView(updated));
    }

}
