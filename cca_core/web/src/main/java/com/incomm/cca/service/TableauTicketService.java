package com.incomm.cca.service;

import com.incomm.cscore.client.rest.service.CsCoreRestTemplateFactory;
import com.incomm.cscore.logging.CsCoreLogger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.net.ssl.SSLContext;
import javax.net.ssl.X509TrustManager;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.util.HashMap;
import java.util.Map;

@Service
public class TableauTicketService {

    @Autowired
    private CsCoreRestTemplateFactory restTemplateFactory;
    @Autowired
    private UserService userService;

    public String getTicketNumber(String host) {
        try {
            // Create the ssl context for the https call
            SSLContext ctx = SSLContext.getInstance("TLS");
            SecureRestClientTrustManager secureRestClientTrustManager = new SecureRestClientTrustManager();
            ctx.init(null, new javax.net.ssl.TrustManager[]{secureRestClientTrustManager}, null);

            // Even though this is a POST call, Tableau requires the username param on the url
            String url = String.format("%s/trusted?username=%s", host, userService.currentUser()
                                                                                  .getUsername());
            // Empty params
            Map<String, Object> params = new HashMap<>();

            Map<String, String> headers = new HashMap<>();
            headers.put("Accept", "text/plain");

            HttpEntity requestEntity = new HttpEntity<>(headers);

            ResponseEntity<String> responseEntity = restTemplateFactory.build(ctx)
                                                                       .exchange(url, HttpMethod.POST, requestEntity, String.class, params);
            return responseEntity.getBody();
        } catch (Exception e) {
            CsCoreLogger.error("Failed to retrieve Tableau Ticket")
                        .keyValue("host", host)
                        .exception(e)
                        .build();
            throw new RuntimeException(e);
        }
    }

    public static class SecureRestClientTrustManager
            implements X509TrustManager {

        @Override
        public void checkClientTrusted(X509Certificate[] arg0, String arg1)
                throws CertificateException {
        }

        @Override
        public void checkServerTrusted(X509Certificate[] arg0, String arg1)
                throws CertificateException {
        }

        @Override
        public X509Certificate[] getAcceptedIssuers() {
            return new X509Certificate[0];
        }

        public boolean isClientTrusted(X509Certificate[] arg0) {
            return true;
        }

        public boolean isServerTrusted(X509Certificate[] arg0) {
            return true;
        }
    }
}
