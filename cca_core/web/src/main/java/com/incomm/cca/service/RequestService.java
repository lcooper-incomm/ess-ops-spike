package com.incomm.cca.service;

import com.incomm.cca.model.constant.CcaHeader;
import com.incomm.cca.model.constant.CcaQueryParam;
import com.incomm.cscore.client.apls.constant.AplsPlatform;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

@Service
public class RequestService {

    @Autowired
    private HttpServletRequest httpServletRequest;

    public String getIpAddress() {
        try {
            String ipAddress = httpServletRequest.getHeader(CcaHeader.X_FORWARDED_FOR);
            if (StringUtils.isBlank(ipAddress)) {
                ipAddress = httpServletRequest.getRemoteAddr();
            }
            if (StringUtils.isNotBlank(ipAddress) && ipAddress.equals("0:0:0:0:0:0:0:1")) {
                ipAddress = "56.4.3.1";
            }
            return ipAddress;
        } catch (Exception e) {
            return null;
        }
    }

    public Long getSessionId() {
        String sessionId = null;
        if (httpServletRequest != null) {
            try {
                sessionId = httpServletRequest.getParameter(CcaQueryParam.SESSION_ID);
            } catch (Exception e) {
                return null;
            }
        }

        if (StringUtils.isNotBlank(sessionId)) {
            return Long.parseLong(sessionId);
        }
        return null;
    }

    public Long getSelectionId() {
        String selectionId = null;
        if (httpServletRequest != null) {
            try {
                selectionId = httpServletRequest.getParameter(CcaQueryParam.SELECTION_ID);
            } catch (Exception e) {
                return null;
            }
        }

        if (StringUtils.isNotBlank(selectionId)) {
            return Long.parseLong(selectionId);
        }
        return null;
    }

    public String getPartner() {
        String partner = null;
        if (httpServletRequest != null) {
            try {
                partner = httpServletRequest.getParameter(CcaQueryParam.PARTNER);
            } catch (Exception e) {
                return null;
            }
        }
        return partner;
    }

    public AplsPlatform getPlatform() {
        String platformString = null;
        if (httpServletRequest != null) {
            try {
                platformString = httpServletRequest.getParameter(CcaQueryParam.PLATFORM);
            } catch (Exception e) {
                return null;
            }
        }

        AplsPlatform aplsPlatform = null;
        //We try first to pull platform from request...
        if (StringUtils.isNotBlank(platformString)) {
            aplsPlatform = AplsPlatform.convert(platformString);
        }

        return aplsPlatform;
    }
}
