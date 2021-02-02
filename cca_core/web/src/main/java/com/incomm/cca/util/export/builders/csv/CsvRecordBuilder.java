package com.incomm.cca.util.export.builders.csv;

import com.incomm.cscore.gringotts.model.CsCoreCurrency;

import java.util.List;

public abstract class CsvRecordBuilder {

    public abstract List<String> buildHeader();

    public abstract List<String> buildRecord();

    public String getDisplayValue(CsCoreCurrency currencyField) {
        return currencyField != null ? currencyField.getDisplayValue() : "";
    }
}
