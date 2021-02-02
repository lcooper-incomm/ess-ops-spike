package com.incomm.cca.model.converter;

import com.incomm.cca.model.domain.search.SearchTypeCategory;
import com.incomm.cca.model.view.search.SearchTypeCategoryView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class SearchTypeCategoryConverter {

    @Autowired
    private SearchTypeConverter searchTypeConverter;

    public List<SearchTypeCategoryView> convert(Collection<SearchTypeCategory> request) {
        List<SearchTypeCategoryView> views = new ArrayList<>();

        if (request != null) {
            request.forEach(searchTypeCategory -> views.add(this.convert(searchTypeCategory)));
        }

        return views;
    }

    public SearchTypeCategoryView convert(SearchTypeCategory request) {
        SearchTypeCategoryView view = null;

        if (request != null) {
            view = this.convertSimple(request);
            view.setSearchTypes(searchTypeConverter.convert(request.getSearchTypes()));
        }

        return view;
    }

    public SearchTypeCategoryView convertSimple(SearchTypeCategory request) {
        SearchTypeCategoryView view = null;

        if (request != null) {
            view = new SearchTypeCategoryView();
            view.setId(request.getId());
            view.setName(request.getName());
        }

        return view;
    }
}
