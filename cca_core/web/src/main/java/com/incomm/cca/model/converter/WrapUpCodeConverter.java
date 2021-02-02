package com.incomm.cca.model.converter;

import com.incomm.cca.model.domain.WrapUpCode;
import com.incomm.cca.model.view.session.queue.WrapUpCodeView;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class WrapUpCodeConverter {

    public List<WrapUpCodeView> convert(Collection<WrapUpCode> request) {
        List<WrapUpCodeView> views = new ArrayList<>();

        if (request != null) {
            request.forEach(code -> views.add(this.convert(code)));
        }

        return views;
    }

    public WrapUpCodeView convert(WrapUpCode request) {
        WrapUpCodeView view = null;

        if (request != null) {
            view = new WrapUpCodeView();
            view.setId(request.getId());
            view.setDisplayName(request.getDisplayName());
            view.setI3Name(request.getI3Name());
            view.setIsActive(request.getActive());
            view.setIsLocked(request.getLocked());
        }

        return view;
    }

    public List<WrapUpCode> convertToDomain(Collection<WrapUpCodeView> request) {
        List<WrapUpCode> views = new ArrayList<>();

        if (request != null) {
            request.forEach(code -> views.add(this.convert(code)));
        }

        return views;
    }

    public WrapUpCode convert(WrapUpCodeView request) {
        WrapUpCode view = null;

        if (request != null) {
            view = new WrapUpCode();
            view.setId(request.getId());
            view.setDisplayName(request.getDisplayName());
            view.setI3Name(request.getI3Name());
            view.setActive(request.getIsActive());
            view.setLocked(request.getIsLocked());
        }

        return view;
    }
}
