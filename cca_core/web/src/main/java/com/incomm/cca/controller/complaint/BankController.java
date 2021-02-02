package com.incomm.cca.controller.complaint;

import com.incomm.cca.controller.RestResponseHandler;
import com.incomm.cca.model.converter.complaint.BankConverter;
import com.incomm.cca.model.domain.complaint.Bank;
import com.incomm.cca.model.view.complaint.BankView;
import com.incomm.cca.service.complaint.BankCache;
import com.incomm.cca.service.complaint.BankService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/rest/bank")
public class BankController extends RestResponseHandler {

    @Autowired
    private BankCache bankCache;
    @Autowired
    private BankConverter bankConverter;
    @Autowired
    private BankService bankService;

    @GetMapping
    public ResponseEntity findAll() {
        List<BankView> views = this.bankCache.getAll();
        if (views.isEmpty()) {
            List<Bank> banks = this.bankService.findAll();
            views = this.bankConverter.convertBanks(banks);
            views.forEach(view -> this.bankCache.put(view.getId(), view));
        }
        return ok(views);
    }
}
