package com.incomm.cca.util.export.builders.xlsx.cellbuilders;

import java.util.Date;

public class DateCellBuilder extends CellBuilder<Date> {

    public DateCellBuilder(Date value) {
        super(value, Type.DATE);
    }

    public Date getValue() {
        return super.getValue();
    }
}
