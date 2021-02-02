package com.incomm.cca.util.rest;

import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;

public class RestUtil {

    public static String cleanRelativeUrl(String relativeUrl) {
        if (StringUtils.isNotBlank(relativeUrl) && !relativeUrl.startsWith("/")) {
            relativeUrl = String.format("/%s", relativeUrl);
        }
        return relativeUrl;
    }

    public static String buildFullUrl(String host, String relativeUrl) {
        return String.format("%s%s", host, relativeUrl);
    }

    public static String buildFullUrl(String host, String relativeUrl, Map<String, Object> queryParams) {
        String cleanRelativeUrl = cleanRelativeUrl(relativeUrl);
        String fullUrl = buildFullUrl(host, cleanRelativeUrl);

        if (queryParams == null) {
            queryParams = new HashMap<>();
        }

        MultiValueMap<String, String> convertedParams = new LinkedMultiValueMap<>();
        for (Map.Entry<String, Object> param : queryParams.entrySet()) {
            if (param.getValue() != null) {
                convertedParams.set(param.getKey(), param.getValue()
                                                         .toString());
            }
        }

        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(fullUrl)
                                                           .queryParams(convertedParams);
        return builder.build()
                      .toUriString();
    }

    public static URI buildFullUri(String host, String relativeUrl, Map<String, Object> queryParams) {
        String cleanRelativeUrl = cleanRelativeUrl(relativeUrl);
        String fullUrl = buildFullUrl(host, cleanRelativeUrl);

        if (queryParams == null) {
            queryParams = new HashMap<>();
        }

        MultiValueMap<String, String> convertedParams = new LinkedMultiValueMap<>();
        for (Map.Entry<String, Object> param : queryParams.entrySet()) {
            if (param.getValue() != null) {
                convertedParams.set(param.getKey(), param.getValue()
                                                         .toString());
            }
        }

        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(fullUrl)
                                                           .queryParams(convertedParams);

        return builder.build(true)
                      .toUri();
    }

    public static HttpEntity buildEntity(Object entity, HttpHeaders httpHeaders) {
        return entity != null ? new HttpEntity<>(entity, httpHeaders) : new HttpEntity<>(httpHeaders);
    }
}
