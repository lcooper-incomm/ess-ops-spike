package com.incomm.cca.controller.search;

import com.incomm.cca.controller.RestResponseHandler;
import com.incomm.cca.model.converter.SearchTypeConverter;
import com.incomm.cca.model.domain.search.SearchType;
import com.incomm.cca.service.search.SearchTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/rest/search-type")
public class SearchTypeController extends RestResponseHandler {

    @Autowired
    private SearchTypeConverter searchTypeConverter;
    @Autowired
    private SearchTypeService searchTypeService;

    @GetMapping
    public ResponseEntity findAll() {
        List<SearchType> searchTypes = this.searchTypeService.findAll();
        return ok(searchTypeConverter.convert(searchTypes));
    }
}
