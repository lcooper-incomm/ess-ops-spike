package com.incomm.cca.util.export.builders.xlsx.sheetbuilders;

import com.incomm.cca.util.export.builders.xlsx.cellbuilders.CellBuilderUtil;
import com.incomm.cca.util.export.builders.xlsx.rowbuilders.RowBuilder;
import com.incomm.cscore.client.apls.model.transaction.EnhancedTransaction;
import org.apache.poi.ss.usermodel.Workbook;

import java.util.List;

public class TransactionHistorySheetBuilder extends SheetBuilder {

    private List<EnhancedTransaction> transactions;

    public TransactionHistorySheetBuilder(List<EnhancedTransaction> transactions) {
        super(SHEET_TRANSACTION_HISTORY);
        this.transactions = transactions;
    }

    @Override
    public void build(Workbook workbook) {
        new RowBuilder(sheetName, CellBuilderUtil.getHistoryHeaderCellBuilders(), 0).build(workbook);
        for (EnhancedTransaction transaction : transactions) {
            new RowBuilder(sheetName, CellBuilderUtil.getHistoryRowCellBuilders(transaction), transactions.indexOf(transaction) + 1).build(workbook);
        }
    }
}
