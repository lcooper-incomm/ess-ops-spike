package com.incomm.cca.service.apls;

import com.incomm.cca.exception.SecurityViolationException;
import com.incomm.cca.model.enums.ManagedPermission;
import com.incomm.cca.service.SecurityService;
import com.incomm.cscore.client.apls.CsCoreAplsAccountClient;
import com.incomm.cscore.client.apls.model.account.EnhancedAccounts;
import com.incomm.cscore.client.rest.CsCoreResponseException;
import com.incomm.cscore.client.rest.response.Response;
import com.incomm.cscore.logging.CsCoreLogger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AplsAccountService {

    @Autowired
    private CsCoreAplsAccountClient accountClient;
    @Autowired
    private SecurityService securityService;

    public EnhancedAccounts search(String accountNumber) {
        try {
            securityService.validateHasPermission(ManagedPermission.SEARCH_BY_VANILLA_DIRECT);

            try {
                Response<EnhancedAccounts> response = accountClient.findAllByAccountNumber(accountNumber);
                return response.getBody();
            } catch (CsCoreResponseException e) {
                if (e.getResponse()
                     .getStatus() == 404) {
                    return new EnhancedAccounts();
                } else {
                    throw e;
                }
            }
        } catch (SecurityViolationException e) {
            CsCoreLogger.warn("Unauthorized attempt to perform account search")
                        .keyValue("accountNumber", accountNumber)
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to perform account search")
                        .keyValue("accountNumber", accountNumber)
                        .exception(e)
                        .build();
            throw e;
        }
    }
}
