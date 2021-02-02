package com.incomm.cca.controller;

import com.incomm.cca.model.converter.ActivatingMerchantConverter;
import com.incomm.cca.model.domain.ActivatingMerchant;
import com.incomm.cca.model.view.ActivatingMerchantView;
import com.incomm.cca.service.ActivatingMerchantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/rest/activating-merchant")
public class ActivatingMerchantController extends RestResponseHandler {

    @Autowired
    private ActivatingMerchantConverter merchantConverter;
    @Autowired
    private ActivatingMerchantService activatingMerchantService;

    @GetMapping
    public ResponseEntity findAll() {
        List<ActivatingMerchant> merchants = activatingMerchantService.findAll();
        return ok(merchantConverter.convert(merchants));
    }

    @GetMapping("/{id}")
    public ResponseEntity findOne(@PathVariable("id") Long id) {
        ActivatingMerchant merchant = activatingMerchantService.findOne(id);
        if (merchant != null) {
            return ok(merchantConverter.convert(merchant));
        } else {
            return noContent();
        }
    }

    @PostMapping
    public ResponseEntity create(@RequestBody ActivatingMerchantView request) {
        ActivatingMerchant merchant = activatingMerchantService.create(this.merchantConverter.convert(request));
        return ok(merchantConverter.convert(merchant));
    }

    @PutMapping
    public ResponseEntity update(@RequestBody ActivatingMerchantView request) {
        ActivatingMerchant merchant = activatingMerchantService.update(this.merchantConverter.convert(request));
        return ok(merchantConverter.convert(merchant));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable("id") Long id) {
        activatingMerchantService.delete(id);
        return noContent();
    }
}
