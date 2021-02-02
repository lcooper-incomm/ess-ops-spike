package com.incomm.cca.model.converter;

import com.incomm.cca.model.domain.search.SearchTypeParameterGroup;
import com.incomm.cca.model.view.search.SearchTypeParameterGroupView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class SearchTypeParameterGroupConverter {

    @Autowired
    private SearchTypeParameterGroupParameterConverter parameterConverter;

    public List<SearchTypeParameterGroupView> convert(Collection<SearchTypeParameterGroup> request) {
        List<SearchTypeParameterGroupView> views = new ArrayList<>();

        if (request != null) {
            request.forEach(searchTypeParameterGroup -> views.add(this.convert(searchTypeParameterGroup)));
        }

        return views;
    }

    public SearchTypeParameterGroupView convert(SearchTypeParameterGroup request) {
        SearchTypeParameterGroupView view = null;

        if (request != null) {
            view = new SearchTypeParameterGroupView();
            view.setId(request.getId());
            view.setName(request.getName());
            view.setPriority(request.getPriority());
            view.setParameters(parameterConverter.convert(request.getParameters()));
        }

        return view;
    }
}
