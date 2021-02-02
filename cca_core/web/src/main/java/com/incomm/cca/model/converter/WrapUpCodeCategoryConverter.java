package com.incomm.cca.model.converter;

import com.incomm.cca.model.domain.WrapUpCodeCategory;
import com.incomm.cca.model.view.session.queue.WrapUpCodeCategoryView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class WrapUpCodeCategoryConverter {

    @Autowired
    private WrapUpCodeConverter codeConverter;

    public List<WrapUpCodeCategoryView> convert(List<WrapUpCodeCategory> request) {
        List<WrapUpCodeCategoryView> views = new ArrayList<>();

        if (request != null) {
            request.forEach(category -> views.add(this.convertSimple(category)));
        }

        return views;
    }

    public WrapUpCodeCategoryView convert(WrapUpCodeCategory request) {
        WrapUpCodeCategoryView view = null;

        if (request != null) {
            view = this.convertSimple(request);
            view.setWrapUpCodes(codeConverter.convert(request.getWrapUpCodes()));
        }

        return view;
    }

    public WrapUpCodeCategoryView convertSimple(WrapUpCodeCategory request) {
        WrapUpCodeCategoryView view = null;

        if (request != null) {
            view = new WrapUpCodeCategoryView();
            view.setId(request.getId());
            view.setDisplayName(request.getDisplayName());
            view.setI3Name(request.getI3Name());
            view.setIsActive(request.getActive());
        }

        return view;
    }

    public List<WrapUpCodeCategory> convertToDomain(List<WrapUpCodeCategoryView> request) {
        List<WrapUpCodeCategory> views = new ArrayList<>();

        if (request != null) {
            request.forEach(category -> views.add(this.convertSimple(category)));
        }

        return views;
    }

    public WrapUpCodeCategory convert(WrapUpCodeCategoryView request) {
        WrapUpCodeCategory view = null;

        if (request != null) {
            view = this.convertSimple(request);
            view.setWrapUpCodes(codeConverter.convertToDomain(request.getWrapUpCodes()));
        }

        return view;
    }

    public WrapUpCodeCategory convertSimple(WrapUpCodeCategoryView request) {
        WrapUpCodeCategory view = null;

        if (request != null) {
            view = new WrapUpCodeCategory();
            view.setId(request.getId());
            view.setDisplayName(request.getDisplayName());
            view.setI3Name(request.getI3Name());
            view.setActive(request.getIsActive());
        }

        return view;
    }
}
