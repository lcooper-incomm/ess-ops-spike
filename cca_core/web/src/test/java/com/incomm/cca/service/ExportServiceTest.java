package com.incomm.cca.service;

import com.incomm.cca.model.enums.ExportFormat;
import com.incomm.cca.util.export.enums.HTMLDocumentOption;
import com.incomm.cscore.client.maples.model.response.transaction.Transaction;
import com.incomm.cscore.client.maples.model.response.transaction.TransactionAmounts;
import com.incomm.cscore.gringotts.model.CsCoreCurrency;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.runners.MockitoJUnitRunner;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RunWith(MockitoJUnitRunner.class)
public class ExportServiceTest {

    @InjectMocks
    private ExportService exportService;

    private List<Transaction> createTransactions() {
        List<Transaction> transactions = new ArrayList<>();
        Transaction transaction = new Transaction();
        transaction.setId("1234");
        transaction.setAmounts(new TransactionAmounts());
        transaction.getAmounts()
                   .setAvailableBalance(new CsCoreCurrency());
        transaction.getAmounts()
                   .getAvailableBalance()
                   .setDisplayValue("12.34");
        transactions.add(transaction);
        return transactions;
    }

    @Test
    public void exportTransactionHistoryCsv() {
        Set<HTMLDocumentOption> options = new HashSet<>();
        options.add(HTMLDocumentOption.FORMAT_CSV);
        byte[] bytes = exportService.exportMaplesTransactions(createTransactions(), options, ExportFormat.CSV);

        Assert.assertNotNull(bytes);
    }

    @Test
    public void exportTransactionHistoryXls() {
        Set<HTMLDocumentOption> options = new HashSet<>();
        options.add(HTMLDocumentOption.FORMAT_XLSX);
        byte[] bytes = exportService.exportMaplesTransactions(createTransactions(), options, ExportFormat.XLSX);

        Assert.assertNotNull(bytes);
    }
}
