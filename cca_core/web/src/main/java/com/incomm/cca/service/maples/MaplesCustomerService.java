package com.incomm.cca.service.maples;

import com.incomm.cca.service.SecurityService;
import com.incomm.cscore.client.maples.CsCoreMaplesCustomerClient;
import com.incomm.cscore.client.maples.model.request.customer.CustomerQuery;
import com.incomm.cscore.client.maples.model.response.customer.Customer;
import com.incomm.cscore.client.rest.converter.TimestampConverter;
import com.incomm.cscore.client.rest.response.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MaplesCustomerService {

    @Autowired
    Environment environment;
    @Autowired
    CsCoreMaplesCustomerClient customerClient;
    @Autowired
    MaplesRequestSupportService supportService;
    @Autowired
    TimestampConverter timestampConverter;
    @Autowired
    SecurityService securityService;

    public Customer findOne(String customerId) {
        Response<Customer> response;
        response = customerClient.findOneById(customerId, supportService.defaultSupport());
        return response.getBody();
    }

    public List<Customer> search(CustomerQuery query) {
        if (query.getEncorProgram() != null) {
            String program = environment.getProperty("encor.program." + query.getEncorProgram());
            if (program != null) {
                query.setEncorProgram(program);
            } else {
                throw new IllegalArgumentException("Encor program could not be mapped.");
            }
        }
        Response<List<Customer>> response = customerClient.search(query, supportService.defaultSupport());
        return response.getBody();
    }
}
