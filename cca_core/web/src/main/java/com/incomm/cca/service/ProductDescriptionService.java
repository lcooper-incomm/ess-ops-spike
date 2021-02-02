package com.incomm.cca.service;

import com.incomm.apls.model.response.ProductDescriptions;
import com.incomm.apls.model.support.ProductDescription;
import com.incomm.cca.service.apls.AplsRequestSupportService;
import com.incomm.cscore.client.apls.CsCoreAplsCustomerClient;
import com.incomm.cscore.client.rest.response.Response;
import com.incomm.cscore.logging.CsCoreLogger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductDescriptionService {

    @Autowired
    private CsCoreAplsCustomerClient customerClient;
    @Autowired
    private AplsRequestSupportService supportService;

    public List<ProductDescription> findAll() {
        try {
            Response<ProductDescriptions> response = customerClient.findProductDescriptions(supportService.defaultSupport());
            return response.getBody()
                           .getProductDescriptions();
        } catch (Exception e) {
            CsCoreLogger.error("Failed to retrieve product codes")
                        .exception(e)
                        .build();
            throw e;
        }
    }
}
