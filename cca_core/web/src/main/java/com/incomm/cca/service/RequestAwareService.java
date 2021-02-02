package com.incomm.cca.service;

import com.incomm.cca.exception.NotFoundException;
import com.incomm.cca.model.constant.CcaQueryParam;
import com.incomm.cca.model.domain.Partner;
import com.incomm.cca.model.domain.session.Selection;
import com.incomm.cca.repository.SelectionRepository;
import com.incomm.cscore.client.apls.constant.AplsPlatform;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.http.HttpServletRequest;

public abstract class RequestAwareService {

    @Autowired
    protected HttpServletRequest httpServletRequest;
    @Autowired
    private PartnerService partnerService;
    @Autowired
    private SelectionRepository selectionRepository;
    @Autowired
    private RequestService requestService;

    protected Selection getCurrentSelectionFromQueryParameters() {
        String selectionId = httpServletRequest.getParameter(CcaQueryParam.SELECTION_ID);
        if (StringUtils.isNotBlank(selectionId) && StringUtils.isNumeric(selectionId)) {
            Selection selection = selectionRepository.findById(Long.valueOf(selectionId))
                                                     .orElse(null);
            if (selection == null) {
                throw new NotFoundException("No selection found for selectionId");
            }
            return selection;
        }
        return null;
    }

    protected Partner getCurrentPartnerFromQueryParameters() {
        Partner partner = null;

        String partnerName = httpServletRequest.getParameter(CcaQueryParam.PARTNER);
        if (StringUtils.isNotBlank(partnerName)) {
            AplsPlatform platform = this.getCurrentPlatformFromQueryParameters();
            if (platform == null) {
                platform = AplsPlatform.VMS;
            }

            partner = partnerService.findOneByTypeAndPlatform(partnerName, platform.toString());
            if (partner == null) {
                throw new NotFoundException("No partner found with this name and platform");
            }
        }

        return partner;
    }

    protected AplsPlatform getCurrentPlatformFromQueryParameters() {
        return this.requestService.getPlatform();
    }
}
