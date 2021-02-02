package com.incomm.cca.qa.util;

import com.incomm.cca.qa.configuration.Constants;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

/**
 * User: mgalloway
 * Date: 10/15/13
 * Time: 12:17 PM
 */
@Component
public class RestTemplateUtil {

    @Autowired
    Constants constants;

    public RestTemplate getRt(String username, String password) {

        // Build a client with a credentials provider
        CredentialsProvider credsProvider = new BasicCredentialsProvider();
        credsProvider.setCredentials(
                new AuthScope(constants.APP_HOST, Integer.parseInt(constants.APP_HOST_PORT)),
                new UsernamePasswordCredentials(username, password)
        );

        HttpClientBuilder clientBuilder = HttpClientBuilder.create();
        CloseableHttpClient httpClient = clientBuilder.setDefaultCredentialsProvider(credsProvider)
                                                      .build();

        // Create request factory
        HttpComponentsClientHttpRequestFactory requestFactory = new HttpComponentsClientHttpRequestFactory(httpClient);
        requestFactory.setHttpClient(httpClient);

        // Put the factory in the template
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.setRequestFactory(requestFactory);
        return restTemplate;

    }

}
