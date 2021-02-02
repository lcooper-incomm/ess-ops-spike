package com.incomm.cca.util.export.builders.xlsx;

import org.apache.poi.ss.usermodel.Workbook;

public abstract class ExcelBuilder {

    protected static final String SHEET_TRANSACTION_HISTORY = "Transaction History";
    protected static final String SHEET_PRODUCT = "Product";
    protected static final String SHEET_LOCATION = "Location";
    protected static final String SHEET_TERMINALS = "Terminals";
    protected static final String SHEET_ACCOUNT_HISTORY = "Account History";
    protected static final String SHEET_ACCOUNT_HOLDER = "Account Holder";

    public abstract void build(Workbook workbook);
}
