package com.incomm.cca.controller;

import com.incomm.cca.model.converter.WrapUpCodeConverter;
import com.incomm.cca.model.domain.WrapUpCode;
import com.incomm.cca.model.view.session.queue.WrapUpCodeView;
import com.incomm.cca.service.WrapUpCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/rest/wrap-up-code")
public class WrapUpCodeController extends RestResponseHandler {

    @Autowired
    private WrapUpCodeConverter codeConverter;
    @Autowired
    private WrapUpCodeService codeService;

    @GetMapping
    public ResponseEntity getAllCodes() {
        List<WrapUpCode> codes = codeService.getAllCodes();
        return ok(codeConverter.convert(codes));
    }

    @GetMapping("/{id}")
    public ResponseEntity findOne(@PathVariable("id") Long id) {
        WrapUpCode code = this.codeService.findOne(id);
        return ok(this.codeConverter.convert(code));
    }

    @PostMapping
    public ResponseEntity newCode(@RequestBody WrapUpCodeView request) {
        WrapUpCode code = codeService.newCode(request);
        return ok(codeConverter.convert(code));
    }

    @PutMapping("/{id}")
    public ResponseEntity updateCode(
            @PathVariable("id") Long id,
            @RequestBody WrapUpCodeView request) {
        WrapUpCode code = codeService.updateCode(request);
        return ok(codeConverter.convert(code));
    }
}
