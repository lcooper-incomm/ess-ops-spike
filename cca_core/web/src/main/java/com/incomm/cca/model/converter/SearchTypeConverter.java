package com.incomm.cca.model.converter;

import com.incomm.cca.model.domain.search.SearchType;
import com.incomm.cca.model.view.search.SearchTypeView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class SearchTypeConverter {

    @Autowired
    private SearchTypeCategoryConverter categoryConverter;
    @Autowired
    private SearchParameterConverter parameterConverter;
    @Autowired
    private SearchTypeParameterGroupConverter parameterGroupConverter;
    @Autowired
    private PartnerConverter partnerConverter;
    @Autowired
    private PermissionConverter permissionConverter;

    public List<SearchTypeView> convert(Collection<SearchType> request) {
        List<SearchTypeView> views = new ArrayList<>();

        if (request != null) {
            request.forEach(searchType -> views.add(this.convert(searchType)));
        }

        return views;
    }

    public SearchTypeView convert(SearchType request) {
        SearchTypeView view = null;

        if (request != null) {
            view = new SearchTypeView();
            view.setId(request.getId());
            view.setCategory(categoryConverter.convertSimple(request.getCategory()));
            view.setName(request.getName());
            view.setPlatform(request.getPlatform());
            view.setSelectionType(request.getSelectionType());
            view.setType(request.getType());
            view.setDefaultQuickSearchParameterId(request.getDefaultQuickSearchParameterId());

            view.setQuickSearchParameters(parameterConverter.convert(request.getQuickSearchParameters()));
            view.setParameterGroups(parameterGroupConverter.convert(request.getParameterGroups()));
            view.setPartners(partnerConverter.convert(request.getPartners()));
            view.setPermissions(permissionConverter.convertSimple(request.getPermissions()));
        }

        return view;
    }
}
