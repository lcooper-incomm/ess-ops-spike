package com.incomm.cca.service.maples;

import com.incomm.cca.model.constant.CcaQueryParam;
import com.incomm.cca.service.RequestAwareService;
import com.incomm.cscore.client.maples.constant.MaplesPartner;
import com.incomm.cscore.client.maples.constant.MaplesPlatform;
import com.incomm.cscore.client.maples.model.request.MaplesRequestSupport;
import org.springframework.stereotype.Service;

@Service
public class MaplesRequestSupportService extends RequestAwareService {

    public MaplesRequestSupport buildSupport(MaplesPlatform platform, MaplesPartner partner) {
        MaplesRequestSupport support = new MaplesRequestSupport();
        support.setPlatform(platform);
        support.setPartner(partner);
        return support;
    }

    public MaplesRequestSupport defaultSupport() {
        return this.buildSupport(this.getPlatformFromRequest(), this.getPartnerFromRequest());
    }

    private MaplesPartner getPartnerFromRequest() {
        String partnerString = this.httpServletRequest.getParameter(CcaQueryParam.PARTNER);
        try {
            return MaplesPartner.convert(partnerString);
        } catch (IllegalArgumentException e) {
            return null;
        }
    }

    private MaplesPlatform getPlatformFromRequest() {
        String platformString = this.httpServletRequest.getParameter(CcaQueryParam.PLATFORM);
        return MaplesPlatform.convert(platformString);
    }

}
