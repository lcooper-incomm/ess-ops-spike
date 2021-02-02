package com.incomm.cca.util.export.builders.xlsx.sheetbuilders;

import com.incomm.cca.util.export.builders.xlsx.ExcelBuilder;

public abstract class SheetBuilder extends ExcelBuilder {

    protected String sheetName;

    public SheetBuilder(String sheetName) {
        this.sheetName = sheetName;
    }
}
