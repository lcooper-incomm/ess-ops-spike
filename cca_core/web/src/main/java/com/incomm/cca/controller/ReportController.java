package com.incomm.cca.controller;

import com.incomm.cca.model.converter.ReportConverter;
import com.incomm.cca.model.domain.Report;
import com.incomm.cca.model.view.report.TableauTicketRequestView;
import com.incomm.cca.model.view.report.TableauTicketResponseView;
import com.incomm.cca.service.ReportService;
import com.incomm.cca.service.TableauTicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/rest/report")
public class ReportController extends RestResponseHandler {

    @Autowired
    private ReportConverter reportConverter;
    @Autowired
    private ReportService reportService;
    @Autowired
    private TableauTicketService tableauTicketService;

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity addOne(@RequestBody Report request) {
        Report report = reportService.addOne(request);
        return ok(reportConverter.convert(report));
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
    public ResponseEntity deleteOne(@PathVariable("id") Long id) {
        reportService.deleteOne(id);
        return noContent();
    }

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity findAll() {
        List<Report> reports = reportService.findAll();
        return ok(reportConverter.convert(reports));
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity findOne(@PathVariable("id") Long id) {
        Report report = reportService.findOne(id);
        if (report != null) {
            return ok(reportConverter.convert(report));
        } else {
            return noContent();
        }
    }

    @RequestMapping(value = "/ticket", method = RequestMethod.POST)
    public ResponseEntity findOneTicket(@RequestBody TableauTicketRequestView requestDto) {
        String ticketNumber = tableauTicketService.getTicketNumber(requestDto.getUrl());

        TableauTicketResponseView responseDto = new TableauTicketResponseView();
        responseDto.setTicketNumber(ticketNumber);
        return ok(responseDto);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/{id}")
    public ResponseEntity updateOne(@PathVariable("id") Long id, @RequestBody Report request) {
        Report report = reportService.updateOne(request);
        return ok(reportConverter.convert(report));
    }
}
