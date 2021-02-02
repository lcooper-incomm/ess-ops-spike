package com.incomm.cca.service.apls;

import com.incomm.apls.model.response.ProductOccupation;
import com.incomm.apls.model.response.ProductOccupations;
import com.incomm.cscore.client.apls.CsCoreAplsCustomerClient;
import com.incomm.cscore.client.rest.response.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OccupationService {

    @Autowired
    private CsCoreAplsCustomerClient customerClient;
    @Autowired
    private AplsRequestSupportService supportService;

    public List<ProductOccupation> findAll() {
        Response<ProductOccupations> response = customerClient.findOccupations(supportService.defaultSupport());
        return response.getBody()
                       .getOccupations();
    }
}
