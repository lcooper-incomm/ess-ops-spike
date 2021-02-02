package com.incomm.cca.model.converter;

import com.incomm.cca.model.domain.search.SearchParameter;
import com.incomm.cca.model.view.search.SearchParameterView;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class SearchParameterConverter {

    public List<SearchParameterView> convert(Collection<SearchParameter> request) {
        List<SearchParameterView> views = new ArrayList<>();

        if (request != null) {
            request.forEach(searchParameter -> views.add(this.convert(searchParameter)));
        }

        return views;
    }

    public SearchParameterView convert(SearchParameter request) {
        SearchParameterView view = null;

        if (request != null) {
            view = new SearchParameterView();
            view.setId(request.getId());
            view.setName(request.getName());
            view.setType(request.getType());
            view.setValue(request.getValue());
        }

        return view;
    }
}
