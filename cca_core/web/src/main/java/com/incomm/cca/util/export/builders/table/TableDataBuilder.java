package com.incomm.cca.util.export.builders.table;

import com.incomm.cscore.client.model.CsCoreTimestamp;
import com.incomm.cscore.gringotts.model.CsCoreCurrency;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Workbook;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.List;

/**
 * Provides methods to iterate over data fields provided by a subclass.  Each item of the list represents a column
 * to be exported in a csv/xls file.  The first element in the array is the column header and the second element is
 * the field.
 * The field might be something like "amounts.requestedAmount.displayValue".  This class uses reflection to call the
 * getters and while there is not null data, eventually return the final value.  Or if any null is encountered, returns
 * an empty string.
 */
public class TableDataBuilder {

    List<String[]> fields;

    public TableDataBuilder(List<String[]> fields) {
        this.fields = fields;
    }

    public List<String[]> getFields() {
        return fields;
    }

    public int size() {
        return getFields().size();
    }

    public String getHeader(int column) {
        return getFields().get(column)[0];
    }

    /**
     * Get the data for the specified column number where the object is represents the row of data.
     *
     * @param column
     * @param o
     * @return
     * @throws IllegalAccessException
     * @throws InvocationTargetException
     * @throws NoSuchMethodException
     */
    public String getString(int column, Object o) throws IllegalAccessException, InvocationTargetException, NoSuchMethodException {
        Object data = getData(getFields().get(column)[1], o);

        if (data == null) {
            return "";
        } else if (data.getClass()
                       .getSimpleName()
                       .equals("CsCoreTimestamp")) {
            return ((CsCoreTimestamp) data).getDisplayValue();
        } else if (data.getClass()
                       .getSimpleName()
                       .equals("CsCoreCurrency")) {
            return ((CsCoreCurrency) data).getDisplayValue();
        } else {
            return data.toString();
        }
    }

    /**
     * Gets the data for the column and row but wraps it in an Excel Cell.  For particular classes, set the cell type
     * otherwise just set as a string.
     *
     * @param workbook
     * @param row
     * @param column
     * @param o
     * @return
     * @throws IllegalAccessException
     * @throws NoSuchMethodException
     * @throws InvocationTargetException
     */
    public Cell getCell(Workbook workbook, Row row, int column, Object o) throws IllegalAccessException, NoSuchMethodException, InvocationTargetException {
        Cell cell = row.createCell(column);
        Object data = getData(getFields().get(column)[1], o);
        if (data == null) {
            return cell;
        }

        if (data.getClass()
                .getSimpleName()
                .equals("CsCoreTimestamp")) {
            cell.setCellValue(((CsCoreTimestamp) data).getDisplayValue());
            CellStyle cellStyle = workbook.createCellStyle();
            cellStyle.setDataFormat(workbook.getCreationHelper()
                                            .createDataFormat()
                                            .getFormat(com.incomm.cca.util.DateUtil.getDateTimeFormat()));
            cell.setCellStyle(cellStyle);
        } else if (data.getClass()
                       .getSimpleName()
                       .equals("CsCoreCurrency")) {
            cell.setCellValue(((CsCoreCurrency) data).getDisplayValue());
        } else {
            cell.setCellValue(data.toString());
        }

        return cell;
    }

    /**
     * The recursive method which iterates over the field(s) calling the getter for each field until coming to the end
     * of the chain.  For a transaction, a field might look like "amounts.requestedAmount.displayValue".  If any invoked
     * getter returns null, then return an empty string.
     *
     * @param field
     * @param o
     * @return
     * @throws InvocationTargetException
     * @throws IllegalAccessException
     * @throws NoSuchMethodException
     */
    private Object getData(String field, Object o) throws InvocationTargetException, IllegalAccessException, NoSuchMethodException {
        if (o == null) {
            return o;
        }

        String[] fields = field.split("[.]");

        if (fields.length == 1) {
            return getReadMethod(fields[0], o).invoke(o);
        } else {
            return getData(String.join(".", Arrays.copyOfRange(fields, 1, fields.length)),
                    getReadMethod(fields[0], o).invoke(o));
        }
    }

    private Method getReadMethod(String field, Object o) throws NoSuchMethodException {
        return o.getClass()
                .getMethod("get" + field.substring(0, 1)
                                        .toUpperCase() + field.substring(1));
    }
}
