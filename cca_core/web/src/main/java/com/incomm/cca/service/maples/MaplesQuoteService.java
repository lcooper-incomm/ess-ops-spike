package com.incomm.cca.service.maples;

import com.incomm.cscore.client.maples.CsCoreMaplesQuoteClient;
import com.incomm.cscore.client.maples.model.request.MaplesRequestSupport;
import com.incomm.cscore.client.maples.model.response.quote.Quote;
import com.incomm.cscore.client.rest.response.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MaplesQuoteService {

    @Autowired
    private CsCoreMaplesQuoteClient quoteClient;
    @Autowired
    private MaplesRequestSupportService supportService;

    public Quote findByQuoteId(Integer id) {
        MaplesRequestSupport support = this.supportService.defaultSupport();

        Response<Quote> response = quoteClient.findOneByQuoteId(id, support);
        return response.getBody();
    }
}

