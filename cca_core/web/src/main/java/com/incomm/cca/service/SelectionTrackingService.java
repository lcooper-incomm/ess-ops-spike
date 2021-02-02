package com.incomm.cca.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;

@Component("SelectionTrackingService")
@Scope("request")
public class SelectionTrackingService {

    @Autowired
    private HttpServletRequest httpServletRequest;
    private String defaultSelectionId;

    public String getSelectionId() {
        return httpServletRequest.getParameter("selectionId") != null ? httpServletRequest.getParameter("selectionId") : defaultSelectionId;
    }

    public void setDefaultSelectionId(String selectionId) {
        this.defaultSelectionId = selectionId;
    }
}
