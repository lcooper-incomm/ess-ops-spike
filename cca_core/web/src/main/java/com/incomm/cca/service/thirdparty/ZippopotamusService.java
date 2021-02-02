package com.incomm.cca.service.thirdparty;

import com.incomm.cca.model.view.external.zippopotamus.ZippopotamusResponseView;
import com.incomm.cscore.client.rest.service.CsCoreRestTemplateFactory;
import com.incomm.cscore.logging.CsCoreLogger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

@Service
public class ZippopotamusService {

    @Autowired
    private CsCoreRestTemplateFactory restTemplateFactory;
    @Value("${zippopotamus.host}")
    private String zippopotamusHost;

    /**
     * By default, trim the city names to strip off anything in parentheses.
     *
     * @param country
     * @param postalCode
     * @return
     */
    public ZippopotamusResponseView lookup(String country, String postalCode) {
        return this.lookup(country, postalCode, true);
    }

    public ZippopotamusResponseView lookup(String country, String postalCode, Boolean trimCity) {
        ZippopotamusResponseView dto = null;
        try {
            String url = String.format("%s/%s/%s", zippopotamusHost, country, postalCode);
            try {
                dto = restTemplateFactory.build()
                                         .getForObject(url, ZippopotamusResponseView.class);
                if (trimCity) {
                    dto.trimCity();
                }
            } catch (HttpClientErrorException e) {
                //Treat a 404 as simply no results
                if (e.getRawStatusCode() != 404) {
                    throw e;
                }
            }
        } catch (Exception e) {
            CsCoreLogger.warn("Error looking up postal code")
                        .keyValue("country", country)
                        .keyValue("postalCode", postalCode)
                        .exception(e)
                        .build();
        }

        return dto;
    }
}
