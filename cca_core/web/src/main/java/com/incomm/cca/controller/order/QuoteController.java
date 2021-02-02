package com.incomm.cca.controller.order;

import com.incomm.cca.controller.RestResponseHandler;
import com.incomm.cca.service.maples.MaplesOrderService;
import com.incomm.cca.service.maples.MaplesQuoteService;
import com.incomm.cscore.client.maples.model.request.order.OrderQuery;
import com.incomm.cscore.client.maples.model.response.order.Order;
import com.incomm.cscore.client.maples.model.response.quote.Quote;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/rest/quote")
public class QuoteController extends RestResponseHandler {

    @Autowired
    private MaplesOrderService orderService;
    @Autowired
    private MaplesQuoteService quoteService;

    @GetMapping("/{id}")
    public ResponseEntity findAllQuotesById(@PathVariable("id") Integer id, @RequestParam("platform") String platform) {
        if (platform.equalsIgnoreCase("ECOMM")) {
            Quote quote = quoteService.findByQuoteId(id);
            return ok(quote);
        } else if (platform.equalsIgnoreCase("BOL")) {
            OrderQuery query = new OrderQuery();
            query.setQuoteId(id.toString());

            List<Order> results = orderService.search(query);
            if (!results.isEmpty()) {
                return ok(results.get(0));
            } else {
                return noContent();
            }
        } else {
            throw new UnsupportedOperationException("Unsupported platform");
        }
    }
}