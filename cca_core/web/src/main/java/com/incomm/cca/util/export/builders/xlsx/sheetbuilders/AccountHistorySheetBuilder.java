package com.incomm.cca.util.export.builders.xlsx.sheetbuilders;

import com.incomm.cca.util.export.builders.xlsx.cellbuilders.CellBuilderUtil;
import com.incomm.cca.util.export.builders.xlsx.rowbuilders.RowBuilder;
import com.incomm.cscore.client.apls.model.card.EnhancedCardAccountHistory;
import org.apache.poi.ss.usermodel.Workbook;

import java.util.List;

public class AccountHistorySheetBuilder extends SheetBuilder {

    private List<EnhancedCardAccountHistory> transactions;

    public AccountHistorySheetBuilder(List<EnhancedCardAccountHistory> transactions) {
        super(SHEET_ACCOUNT_HISTORY);
        this.transactions = transactions;
    }

    @Override
    public void build(Workbook workbook) {
        new RowBuilder(sheetName, CellBuilderUtil.getGreenCardAccountHistoryHeaderCellBuilders(), 0).build(workbook);
        if (transactions != null) {
            for (EnhancedCardAccountHistory transaction : transactions) {
                new RowBuilder(sheetName, CellBuilderUtil.getGreenCardAccountHistoryRowCellBuilders(transaction), transactions.indexOf(transaction) + 1).build(workbook);
            }
        }
    }
}
