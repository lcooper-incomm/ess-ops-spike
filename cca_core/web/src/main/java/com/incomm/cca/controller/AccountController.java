package com.incomm.cca.controller;

import com.incomm.cca.service.apls.AplsAccountService;
import com.incomm.cca.service.maples.MaplesAccountService;
import com.incomm.cscore.client.apls.model.account.EnhancedAccounts;
import com.incomm.cscore.client.maples.model.request.account.AccountChangeStatusRequest;
import com.incomm.cscore.client.maples.model.request.account.AccountCloseRequest;
import com.incomm.cscore.client.maples.model.request.account.AccountCodesQuery;
import com.incomm.cscore.client.maples.model.request.account.AccountAdjustBalanceRequest;
import com.incomm.cscore.client.maples.model.request.account.EnhancedAccountAdjustBalanceRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest/account")
public class AccountController extends RestResponseHandler {

    @Autowired
    private AplsAccountService aplsAccountService;

    @GetMapping("/{accountNumber}")
    public ResponseEntity search(@PathVariable("accountNumber") String accountNumber) {
        EnhancedAccounts results = aplsAccountService.search(accountNumber);
        return ok(results.getAccounts());
    }
}
