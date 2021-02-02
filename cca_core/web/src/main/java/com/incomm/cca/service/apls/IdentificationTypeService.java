package com.incomm.cca.service.apls;

import com.incomm.apls.model.response.ProductIdentificationType;
import com.incomm.apls.model.response.ProductIdentificationTypes;
import com.incomm.cscore.client.apls.CsCoreAplsCustomerClient;
import com.incomm.cscore.client.rest.response.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IdentificationTypeService {

    @Autowired
    private CsCoreAplsCustomerClient customerClient;
    @Autowired
    private AplsRequestSupportService supportService;

    public List<ProductIdentificationType> findAll() {
        Response<ProductIdentificationTypes> response = customerClient.findIdentificationTypes(supportService.defaultSupport());
        return response.getBody()
                       .getIdentifications();
    }
}
