package com.incomm.cca.controller;

import com.incomm.cca.model.converter.VmsProductCodeConverter;
import com.incomm.cca.model.converter.VmsProductTypeConverter;
import com.incomm.cca.model.domain.VmsProductCode;
import com.incomm.cca.model.domain.VmsProductType;
import com.incomm.cca.model.view.external.vms.VmsProductCodesSyncResults;
import com.incomm.cca.model.view.external.vms.VmsProductTypeSummaryView;
import com.incomm.cca.service.VmsProductCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/rest/vms-product-code")
public class VmsProductCodeController extends RestResponseHandler {

    @Autowired
    private VmsProductCodeConverter productCodeConverter;
    @Autowired
    private VmsProductTypeConverter productTypeConverter;
    @Autowired
    private VmsProductCodeService vmsProductCodeService;

    @RequestMapping(value = "/active", method = RequestMethod.GET)
    public ResponseEntity getActiveProductCodes(@RequestParam(value = "partner", required = true) String partner) {
        List<VmsProductCode> productCodes = vmsProductCodeService.getActiveProductCodes(partner);
        return ok(productCodeConverter.convert(productCodes));
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity syncProductCodes(@RequestParam(value = "partner", required = true) String partner) {
        VmsProductCodesSyncResults results = vmsProductCodeService.syncProductCodes(partner);
        return ok(results);
    }

    @RequestMapping(value = "/vms-product-type", method = RequestMethod.GET)
    public ResponseEntity getProductTypes(@RequestParam(value = "partner", required = true) String partner) {
        List<VmsProductCode> productCodes = vmsProductCodeService.getProductCodes(partner);
        List<VmsProductTypeSummaryView> summaries = new ArrayList<>();

        for (VmsProductCode productCode : productCodes) {
            for (VmsProductType productType : productCode.getTypes()) {
                VmsProductTypeSummaryView summary = new VmsProductTypeSummaryView();
                summary.setProductCode(productCode.getCode());
                summary.setProductCodeName(productCode.getName());
                summary.setId(productType.getId());
                summary.setProductTypeId(productType.getVmsId());
                summary.setProductTypeName(productType.getName());
                summary.setEnabled(productType.getEnabled());

                summaries.add(summary);
            }
        }

        return ok(summaries);
    }

    @RequestMapping(value = "/vms-product-type/{id}", method = RequestMethod.PUT)
    public ResponseEntity updateProductType(@PathVariable("id") Long productTypeId, @RequestParam("enabled") Boolean enabled) {
        VmsProductType productType = vmsProductCodeService.updateProductType(productTypeId, enabled);
        return ok(productTypeConverter.convert(productType));
    }
}
