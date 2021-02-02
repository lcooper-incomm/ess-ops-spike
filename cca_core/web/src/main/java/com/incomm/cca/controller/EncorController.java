package com.incomm.cca.controller;

import com.incomm.cca.model.domain.encor.EncorSymphonyRequest;
import com.incomm.cca.model.domain.encor.EncorSymphonyResponse;
import com.incomm.cca.model.enums.ManagedPermission;
import com.incomm.cca.service.SecurityService;
import com.incomm.cscore.logging.CsCoreLogger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.ResponseErrorHandler;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.Collections;

@RestController
@RequestMapping("/rest/encor")
public class EncorController extends RestResponseHandler {

    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${encor.symphony-link}")
    private String symphonyUrl;
    @Value("${encor.symphony-api-key}")
    private String symphonyApiKey;

    @Autowired
    private SecurityService securityService;

    @PostMapping("symphony-link")
    public ResponseEntity<EncorSymphonyResponse> getSymphonyLink(@RequestBody EncorSymphonyRequest body) {
        securityService.validateHasPermission(ManagedPermission.ENCOR_IMPERSONATE_USER);

        CsCoreLogger.info("Calling external symphony link")
                    .keyValue("url", symphonyUrl)
                    .build();

        // CCA-5893 To help Encor always pass email addresses in lower case.
        body.setEmsUserEmailAddress(body.getEmsUserEmailAddress().toLowerCase());

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        headers.set("x-api-key", symphonyApiKey);
        HttpEntity request = new HttpEntity(body, headers);
        restTemplate.setErrorHandler(new NoErrorHandler());
        EncorSymphonyResponse response = restTemplate.exchange(symphonyUrl,
                HttpMethod.POST,
                request,
                EncorSymphonyResponse.class)
            .getBody();
        return ok(response);
    }

    class NoErrorHandler implements ResponseErrorHandler {
        @Override
        public void handleError(ClientHttpResponse response) throws IOException {}

        @Override
        public boolean hasError(ClientHttpResponse response) throws IOException {
            if (response.getRawStatusCode() == 200 || response.getRawStatusCode() == 400 || response.getRawStatusCode() == 403) {
                return false;
            } else {
                return true;
            }
        }
    }
}
