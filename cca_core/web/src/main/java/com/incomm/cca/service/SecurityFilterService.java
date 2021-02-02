package com.incomm.cca.service;

import com.incomm.cca.model.enums.ManagedPermission;
import com.incomm.cca.model.enums.apls.AplsIdentifier;
import com.incomm.cscore.client.apls.model.transaction.EnhancedTransaction;
import com.incomm.cscore.client.apls.model.transaction.EnhancedTransactions;
import com.incomm.cscore.logging.CsCoreLogger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SecurityFilterService {

    @Autowired
    private SecurityService securityService;
    private static final String MASK = "********";

    public void filterTransactionHistory(AplsIdentifier identifierType, EnhancedTransactions transactions) {
        switch (identifierType) {
            case VENDOR:
            case TERMINAL:
            case LOCATION:
            case LOCATIONID:
            case MERCHANT:
            case DISTRIBUTOR:
            case GLOBAL:
                filterLocationTransactionHistory(transactions);
                break;
            default:
                break;
        }
    }

    private void filterLocationTransactionHistory(EnhancedTransactions transactions) {
        Boolean canViewUnmaskedLocHistory = securityService.hasPermission(ManagedPermission.VIEW_UNMASKED_LOCATION_HISTORY);

        //If not on white list, we have some data masking to do
        if (!canViewUnmaskedLocHistory) {
            CsCoreLogger.info("User not white-listed, applying location transaction history data masks")
                        .build();
            //Mask all transaction IDs, identifiers, and serialNumbers
            for (EnhancedTransaction transaction : transactions.getTransactions()) {
                transaction.setId(MASK);
                transaction.getIdentifiers()
                           .setVan(MASK);
                transaction.getIdentifiers()
                           .setSerialNumber(MASK);
            }
        }
    }
}
