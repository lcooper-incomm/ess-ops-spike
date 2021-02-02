package com.incomm.cca.model.converter;

import com.incomm.cca.model.domain.search.SearchTypeParameterGroupParameter;
import com.incomm.cca.model.view.search.SearchTypeParameterGroupParameterView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class SearchTypeParameterGroupParameterConverter {

    @Autowired
    private SearchParameterConverter parameterConverter;

    public List<SearchTypeParameterGroupParameterView> convert(Collection<SearchTypeParameterGroupParameter> request) {
        List<SearchTypeParameterGroupParameterView> views = new ArrayList<>();

        if (request != null) {
            request.forEach(searchTypeParameterGroupParameter -> views.add(this.convert(searchTypeParameterGroupParameter)));
        }

        return views;
    }

    public SearchTypeParameterGroupParameterView convert(SearchTypeParameterGroupParameter request) {
        SearchTypeParameterGroupParameterView view = null;

        if (request != null) {
            view = new SearchTypeParameterGroupParameterView();
            view.setId(request.getId());
            view.setParameter(parameterConverter.convert(request.getParameter()));
            view.setPriority(request.getPriority());
            view.setIsAdvanced(request.getIsAdvanced());
        }

        return view;
    }
}
