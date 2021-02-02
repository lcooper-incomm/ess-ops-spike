package com.incomm.cca.util.export.builders.xlsx.cellbuilders;

import org.apache.poi.ss.usermodel.Cell;

public abstract class CellBuilder<T> {

    private T value;
    private Type type;
    private int cellType;

    public enum Type {
        STRING,
        DATE,
        NUMERIC,
        BOOLEAN
    }

    public CellBuilder(T value, Type type) {
        this.value = value;
        this.type = type;
        switch (type) {
            case STRING:
                this.cellType = Cell.CELL_TYPE_STRING;
                break;
            case NUMERIC:
                this.cellType = Cell.CELL_TYPE_NUMERIC;
                break;
            case BOOLEAN:
                this.cellType = Cell.CELL_TYPE_BOOLEAN;
                break;
        }
    }

    public T getValue() {
        return value;
    }

    public Type getType() {
        return type;
    }

    public int getCellType() {
        return cellType;
    }

    @Override
    public String toString() {
        return "CellBuilder{" +
                ", value=" + value +
                ", type=" + type +
                ", cellType=" + cellType +
                '}';
    }
}
