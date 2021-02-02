package com.incomm.cca.model.converter;

import com.incomm.cca.model.domain.session.MerchantComponent;
import com.incomm.cca.model.view.session.MerchantComponentView;
import com.incomm.cscore.client.model.CsCoreAddress;
import com.incomm.cscore.client.model.constant.CsCoreAddressType;
import com.incomm.cscore.client.rest.converter.TimestampConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MerchantComponentConverter {

    @Autowired
    private TimestampConverter timestampConverter;

    public MerchantComponentView convert(MerchantComponent request) {
        MerchantComponentView view = null;

        if (request != null) {
            view = new MerchantComponentView();
            view.setId(request.getId());
            view.setAddress(this.convertAddress(request));
            view.setContactName(request.getContactName());
            view.setContactPhone(request.getContactPhone());
            view.setContactTitle(request.getContactTitle());
            view.setDeactivatedDate(timestampConverter.convert(request.getDeactivatedDate()));
            view.setFirstRedemptionAttemptedDate(timestampConverter.convert(request.getFirstRedemptionAttemptedDate()));
            view.setLastReloadedDate(timestampConverter.convert(request.getLastReloadedDate()));
            view.setLocationName(request.getLocationName());
            view.setMerchantLegacyId(request.getMerchantLegacyId());
            view.setMerchantName(request.getMerchantName());
            view.setPurchasedDate(timestampConverter.convert(request.getPurchasedDate()));
        }

        return view;
    }

    private CsCoreAddress convertAddress(MerchantComponent request) {
        CsCoreAddress view = new CsCoreAddress();
        view.setLine1(request.getLine1());
        view.setLine2(request.getLine2());
        view.setCity(request.getCity());
        view.setState(request.getState());
        view.setPostalCode(request.getPostalCode());
        view.setType(CsCoreAddressType.MAILING);

        return view;
    }
}
