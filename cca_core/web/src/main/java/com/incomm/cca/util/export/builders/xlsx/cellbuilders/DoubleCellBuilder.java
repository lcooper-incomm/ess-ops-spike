package com.incomm.cca.util.export.builders.xlsx.cellbuilders;

public class DoubleCellBuilder extends CellBuilder<Double> {

    public DoubleCellBuilder(Double value) {
        super(value, Type.NUMERIC);
    }

    public Double getValue() {
        return super.getValue();
    }
}
