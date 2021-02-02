package com.incomm.cca.qa.module;

import com.incomm.cca.qa.configuration.Constants;
import com.incomm.cca.qa.util.RestTemplateUtil;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import javax.inject.Inject;

/**
 * Module containing operations to perform restful web service calls regarding the IVR Integration with CCA
 * User: mgalloway
 * Date: 10/15/13
 * Time: 12:45 PM
 */
@Component
public class IvrModule {

    @Inject
    RestTemplateUtil rt;
    @Inject
    Constants constants;

    public ResponseEntity<String> postCallDetail(String callDetail) {

        String url = constants.ivrCallDetail;
        //        System.out.print("PARAMETERS: ");
        System.out.print("API_URL: " + url + " ...");
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");
        ResponseEntity<String> response = rt.getRt(null, null)
                                            .exchange(url, HttpMethod.POST, new HttpEntity<>(callDetail, headers), String.class);
        return response;

    }

}
