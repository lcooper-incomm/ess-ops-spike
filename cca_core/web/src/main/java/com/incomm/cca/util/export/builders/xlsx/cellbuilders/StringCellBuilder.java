package com.incomm.cca.util.export.builders.xlsx.cellbuilders;

public class StringCellBuilder extends CellBuilder<String> {

    public StringCellBuilder(String value) {
        super(value, Type.STRING);
    }

    public String getValue() {
        return super.getValue();
    }
}
