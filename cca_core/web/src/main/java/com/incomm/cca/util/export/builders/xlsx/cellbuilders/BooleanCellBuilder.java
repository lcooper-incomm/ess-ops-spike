package com.incomm.cca.util.export.builders.xlsx.cellbuilders;

public class BooleanCellBuilder extends CellBuilder<Boolean> {

    public BooleanCellBuilder(Boolean value) {
        super(value, Type.BOOLEAN);
    }

    public Boolean getValue() {
        return super.getValue();
    }
}
