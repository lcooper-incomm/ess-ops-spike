package com.incomm.cca.util.export.builders.xlsx.sheetbuilders;

import com.incomm.cca.util.export.builders.xlsx.cellbuilders.CellBuilderUtil;
import com.incomm.cca.util.export.builders.xlsx.rowbuilders.RowBuilder;
import com.incomm.cscore.client.apls.model.node.EnhancedTerminal;
import org.apache.poi.ss.usermodel.Workbook;

import java.util.List;

public class TerminalsSheetBuilder extends SheetBuilder {

    private List<EnhancedTerminal> terminals;

    public TerminalsSheetBuilder(List<EnhancedTerminal> terminals) {
        super(SHEET_TERMINALS);
        this.terminals = terminals;
    }

    @Override
    public void build(Workbook workbook) {
        new RowBuilder(sheetName, CellBuilderUtil.getTerminalsHeaderCellBuilders(), 0).build(workbook);
        if (terminals != null) {
            for (EnhancedTerminal terminal : terminals) {
                new RowBuilder(sheetName, CellBuilderUtil.getTerminalsRowCellBuilders(terminal), terminals.indexOf(terminal) + 1).build(workbook);
            }
        }
    }
}
