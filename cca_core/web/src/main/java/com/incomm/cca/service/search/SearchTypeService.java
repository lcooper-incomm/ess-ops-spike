package com.incomm.cca.service.search;

import com.incomm.cca.exception.SecurityViolationException;
import com.incomm.cca.model.domain.search.SearchType;
import com.incomm.cca.repository.search.SearchTypeRepository;
import com.incomm.cca.service.CcaAbstractCrudService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SearchTypeService extends CcaAbstractCrudService<SearchType, Long> {

    @Autowired
    private SearchTypeRepository searchTypeRepository;

    @Override
    public List<SearchType> findAll() {
        this.validateFindPermission();
        return searchTypeRepository.findAllByOrderByNameAsc();
    }

    @Override
    protected void validateAddPermission() throws SecurityViolationException {
        this.securityService.validateIsSystemAdministrator();
    }

    @Override
    protected void validateDeletePermission() throws SecurityViolationException {
        this.securityService.validateIsSystemAdministrator();
    }

    @Override
    protected void validateFindPermission() throws SecurityViolationException {

    }

    @Override
    protected void validateUpdatePermission() throws SecurityViolationException {
        this.securityService.validateIsSystemAdministrator();
    }

    @Override
    protected void controlledUpdateOne(final SearchType searchType, final SearchType t1) {
        throw new UnsupportedOperationException();
    }

    @Override
    protected void validateUnique(final SearchType searchType) throws IllegalArgumentException {

    }

    @Override
    protected String getModelName() {
        return SearchType.class.getSimpleName();
    }
}
