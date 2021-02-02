package com.incomm.cca.service.apls;

import com.incomm.cca.model.domain.Partner;
import com.incomm.cca.model.domain.session.Selection;
import com.incomm.cca.service.RequestAwareService;
import com.incomm.cscore.client.apls.model.customer.FsapiRequestSupport;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

@Service
public class AplsRequestSupportService extends RequestAwareService {

    /**
     * Build a support object with your provided values, unless one or both is null, in which case it'll try to pull the
     * default values from the current request context.
     */
    public FsapiRequestSupport buildSupport(String partner, String vmsSessionId) {
        FsapiRequestSupport support = new FsapiRequestSupport();
        support.setPartner(StringUtils.isNotBlank(partner) ? partner : this.getFsapiPartnerFromCurrentSelection());
        support.setPlatform(this.getCurrentPlatformFromQueryParameters());
        support.setSessionId(StringUtils.isNotBlank(vmsSessionId) ? vmsSessionId : this.getVmsSessionIdFromCurrentSelection());
        return support;
    }

    /**
     * Build a support object using default values from the current request context.
     */
    public FsapiRequestSupport defaultSupport() {
        return this.buildSupport(this.getFsapiPartnerFromCurrentSelection(), this.getVmsSessionIdFromCurrentSelection());
    }

    private String getVmsSessionIdFromCurrentSelection() {
        String vmsSessionId = null;

        Selection selection = this.getCurrentSelectionFromQueryParameters();
        if (selection != null) {
            vmsSessionId = selection.getExternalSessionId();
        }

        return vmsSessionId;
    }

    private String getFsapiPartnerFromCurrentSelection() {
        String fsapiPartner = null;

        Partner partner = this.getCurrentPartnerFromQueryParameters();
        if (partner != null) {
            fsapiPartner = partner.getType();
        }

        if (StringUtils.isBlank(fsapiPartner)) {
            Selection selection = this.getCurrentSelectionFromQueryParameters();
            if (selection != null && selection.getPartner() != null) {
                fsapiPartner = selection.getPartner()
                                        .getType();
            }
        }

        return fsapiPartner;
    }
}
