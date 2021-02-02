package com.incomm.cca.model.converter;

import com.incomm.cca.model.domain.ActivatingMerchant;
import com.incomm.cca.model.view.ActivatingMerchantView;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class ActivatingMerchantConverter {

    public List<ActivatingMerchantView> convert(Collection<ActivatingMerchant> request) {
        List<ActivatingMerchantView> views = new ArrayList<>();

        if (request != null) {
            request.forEach(merchant -> views.add(this.convert(merchant)));
        }

        return views;
    }

    public ActivatingMerchantView convert(ActivatingMerchant request) {
        ActivatingMerchantView view = null;

        if (request != null) {
            view = new ActivatingMerchantView();
            view.setId(request.getId());
            view.setMerchantId(request.getMerchantId());
            view.setMerchantName(request.getMerchantName());
            view.setPlatform(request.getAplsPlatform());
        }

        return view;
    }

    public ActivatingMerchant convert(ActivatingMerchantView request) {
        ActivatingMerchant view = null;

        if (request != null) {
            view = new ActivatingMerchant();
            view.setId(request.getId());
            view.setMerchantId(request.getMerchantId());
            view.setMerchantName(request.getMerchantName());
            view.setPlatform(request.getPlatform() != null ? request.getPlatform()
                                                                    .toString() : null);
        }

        return view;
    }
}
