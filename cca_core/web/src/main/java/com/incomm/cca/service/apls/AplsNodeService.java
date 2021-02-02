package com.incomm.cca.service.apls;

import com.incomm.apls.model.requests.AplsRequestLocation;
import com.incomm.cscore.client.apls.CsCoreAplsNodeClient;
import com.incomm.cscore.client.apls.model.node.EnhancedHierarchies;
import com.incomm.cscore.client.apls.model.node.EnhancedLocations;
import com.incomm.cscore.client.apls.model.node.EnhancedTerminals;
import com.incomm.cscore.client.rest.CsCoreResponseException;
import com.incomm.cscore.client.rest.response.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AplsNodeService {

    @Autowired
    private CsCoreAplsNodeClient nodeClient;

    public EnhancedTerminals getTerminals(AplsRequestLocation request) {
        try {
            Response<EnhancedTerminals> response = nodeClient.findTerminals(request);
            return response.getBody();
        } catch (CsCoreResponseException e) {
            if (e.getResponse()
                 .getStatus() == 404) {
                return new EnhancedTerminals();
            } else {
                throw e;
            }
        }
    }

    public EnhancedHierarchies getHierarchies(AplsRequestLocation request) {
        Response<EnhancedHierarchies> response = nodeClient.findHierarchies(request);
        return response.getBody();
    }

    public EnhancedLocations getLocations(AplsRequestLocation request) {
        try {
            Response<EnhancedLocations> response = nodeClient.findLocations(request);
            return response.getBody();
        } catch (CsCoreResponseException e) {
            if (e.getResponse()
                 .getStatus() == 404) {
                return new EnhancedLocations();
            } else {
                throw e;
            }
        }
    }
}