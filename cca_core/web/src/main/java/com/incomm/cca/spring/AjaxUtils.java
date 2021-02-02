package com.incomm.cca.spring;

import org.apache.commons.lang3.StringUtils;

import javax.servlet.http.HttpServletRequest;

/**
 * @author: derickson
 */
public class AjaxUtils {

    public static boolean isAjaxRequest(HttpServletRequest request) {
        String requestedWith = request.getHeader("X-Requested-With");
        String acceptJson = request.getHeader("Accept");

        return (StringUtils.isNotBlank(requestedWith) && requestedWith.equals("XMLHttpRequest"))
                || (StringUtils.isNotBlank(acceptJson) && acceptJson.toLowerCase()
                                                                    .contains("json"));
    }
}
