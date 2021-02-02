package com.incomm.cca.qa.module;

import com.incomm.cca.qa.configuration.Constants;
import com.incomm.cca.qa.util.RestTemplateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

/**
 * Module containing operations to perform restful web service calls regarding the I3 Integration with CCA
 * User: mgalloway
 * Date: 10/15/13
 * Time: 12:45 PM
 */
@Component
public class I3Module {

    @Autowired
    RestTemplateUtil rt;
    @Autowired
    Constants constants;

    public ResponseEntity<String> receiveCardDetails(String cardDetails) {

        String url = constants.ivrCallDetail;
        System.out.println("CALL COMING IN:");
        System.out.println(url);
        System.out.println(cardDetails);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");
        ResponseEntity<String> response = rt.getRt("required", null)
                                            .exchange(url, HttpMethod.POST, new HttpEntity<>(cardDetails, headers), String.class);
        return response;

    }

    public ResponseEntity<String> receiveCall(String call) {

        String url = constants.i3ReceivedCall;
        System.out.println("CONNECT CALL:");
        System.out.println(url);
        System.out.println(call);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");
        ResponseEntity<String> response = rt.getRt("required", null)
                                            .exchange(url, HttpMethod.POST, new HttpEntity<>(call, headers), String.class);
        System.out.println("RESPONSE:");
        System.out.println(response);
        return response;

    }

    public ResponseEntity<String> callDisconected(String callId, String disconnectType, String user) {

        String url = constants.i3CallDisconnected;
        url += "?disconnectType=" + disconnectType + "&user=" + user;
        System.out.println("DISCONNECT CALL:");
        System.out.println(url);
        ResponseEntity<String> disconnect = rt.getRt(user, null)
                                              .exchange(url, HttpMethod.DELETE, null, String.class, callId);
        System.out.println("RESPONSE:");
        System.out.println(disconnect);
        return disconnect;

    }

}
