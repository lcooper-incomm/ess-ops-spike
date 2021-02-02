package com.incomm.cca.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.incomm.cca.model.converter.QueueConverter;
import com.incomm.cca.model.converter.SessionConverter;
import com.incomm.cca.model.domain.SessionQueue;
import com.incomm.cca.model.domain.session.Session;
import com.incomm.cca.model.view.CaseRequest;
import com.incomm.cca.model.view.session.CaseSearchRequest;
import com.incomm.cca.service.CaseService;
import com.incomm.cca.service.QueueService;
import com.incomm.cca.service.session.CaseSearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/rest/case")
public class CaseController extends RestResponseHandler {

    private static final ObjectMapper objectMapper = new ObjectMapper();
    @Autowired
    private CaseService caseService;
    @Autowired
    private CaseSearchService caseSearchService;
    @Autowired
    private QueueConverter queueConverter;
    @Autowired
    private QueueService queueService;
    @Autowired
    private SessionConverter sessionConverter;

    @PostMapping
    public ResponseEntity addOne(@RequestBody CaseRequest caseRequest) {
        Session domainModel = caseService.addOne(caseRequest);
        return ok(sessionConverter.convert(domainModel));
    }

    @GetMapping
    public ResponseEntity findAllOpenByIdentifierId(@RequestParam("identifierId") Long identifierId) {
        List<Session> domainModels = caseService.findAllOpenByIdentifierId(identifierId);
        return ok(domainModels.stream()
                              .map(sessionConverter::convertSimple)
                              .collect(Collectors.toList()));
    }

    @GetMapping("/queue")
    public ResponseEntity findAllCaseQueues() {
        List<SessionQueue> domainModels = this.queueService.findAllCaseQueues();
        return ok(domainModels.stream()
                              .map(queueConverter::convertSimple)
                              .collect(Collectors.toList()));
    }

    @GetMapping("/search")
    public ResponseEntity search(@RequestHeader("query") String queryString,
                                 @RequestParam(value = "page", defaultValue = "0") Integer page,
                                 @RequestParam(value = "limit", defaultValue = "50") Integer limit,
                                 @RequestParam(value = "sortDirection", defaultValue = "DESC") Sort.Direction direction,
                                 @RequestParam(value = "sortValue", defaultValue = "createdDate") String sortValue) {
        CaseSearchRequest request = buildQueryObject(queryString);
        Sort sort = new Sort(direction, sortValue);
        Pageable pageable = PageRequest.of(page, limit, sort);

        Page<Session> domainModels = this.caseSearchService.search(request, pageable);
        return ok(domainModels.map(sessionConverter::convertSimple));
    }

    private CaseSearchRequest buildQueryObject(String queryString) {
        try {
            return objectMapper.readValue(queryString, CaseSearchRequest.class);
        } catch (Exception e) {
            throw new IllegalArgumentException("Illegal format of query header");
        }
    }
}