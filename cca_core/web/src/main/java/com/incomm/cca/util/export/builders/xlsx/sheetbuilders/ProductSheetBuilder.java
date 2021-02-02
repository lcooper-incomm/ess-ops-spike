package com.incomm.cca.util.export.builders.xlsx.sheetbuilders;

import com.incomm.cca.util.export.builders.xlsx.cellbuilders.CellBuilderUtil;
import com.incomm.cca.util.export.builders.xlsx.rowbuilders.RowBuilder;
import com.incomm.cscore.client.apls.constant.AplsPlatform;
import com.incomm.cscore.client.apls.model.card.EnhancedCard;
import org.apache.poi.ss.usermodel.Workbook;

public class ProductSheetBuilder extends SheetBuilder {

    private EnhancedCard card;

    public ProductSheetBuilder(EnhancedCard card) {
        super(SHEET_PRODUCT);
        this.card = card;
    }

    @Override
    public void build(Workbook workbook) {
        new RowBuilder(sheetName, CellBuilderUtil.getSimpleRowCellBuilders("Serial Number", card.getIdentifiers()
                                                                                                .getSerialNumber()), 0).build(workbook);
        new RowBuilder(sheetName, CellBuilderUtil.getSimpleRowCellBuilders("VAN", card.getIdentifiers()
                                                                                      .getVan()), 1).build(workbook);
        new RowBuilder(sheetName, CellBuilderUtil.getSimpleRowCellBuilders("PIN", card.getIdentifiers()
                                                                                      .getPin()), 2).build(workbook);
        new RowBuilder(sheetName, CellBuilderUtil.getSimpleRowCellBuilders("FastPIN", card.getIdentifiers()
                                                                                          .getVendorPin()), 3).build(workbook);
        new RowBuilder(sheetName, CellBuilderUtil.getSimpleRowCellBuilders("PAN", card.getIdentifiers()
                                                                                      .getPan()), 4).build(workbook);

        String initialValue = null;
        if (card.getPlatform() == AplsPlatform.GREENCARD) {
            initialValue = card.getAmounts()
                               .getInitialLoadAmount() != null ? card.getAmounts()
                                                                     .getInitialLoadAmount()
                                                                     .getDisplayValue() : null;
        } else {
            initialValue = card.getAmounts()
                               .getDenomination() != null ? card.getAmounts()
                                                                .getDenomination()
                                                                .getDisplayValue() : null;
        }
        new RowBuilder(sheetName, CellBuilderUtil.getSimpleRowCellBuilders("Initial Value", initialValue), 5).build(workbook);
        new RowBuilder(sheetName, CellBuilderUtil.getSimpleRowCellBuilders("Product Owner", card.getProductOwner()), 6).build(workbook);
        new RowBuilder(sheetName, CellBuilderUtil.getSimpleRowCellBuilders("DCSM ID", card.getIdentifiers()
                                                                                          .getDcmsId()), 7).build(workbook);
        new RowBuilder(sheetName, CellBuilderUtil.getSimpleRowCellBuilders("Product Type", card.getProductType()), 8).build(workbook);
    }
}
