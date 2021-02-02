package com.incomm.cca.util.export.builders.xlsx.rowbuilders;

import com.incomm.cca.util.export.builders.xlsx.ExcelBuilder;
import com.incomm.cca.util.export.builders.xlsx.cellbuilders.BooleanCellBuilder;
import com.incomm.cca.util.export.builders.xlsx.cellbuilders.CellBuilder;
import com.incomm.cca.util.export.builders.xlsx.cellbuilders.DateCellBuilder;
import com.incomm.cca.util.export.builders.xlsx.cellbuilders.DoubleCellBuilder;
import com.incomm.cca.util.export.builders.xlsx.cellbuilders.StringCellBuilder;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;

import java.util.List;

public class RowBuilder extends ExcelBuilder {

    protected List<CellBuilder> cellBuilders;
    protected String sheetName;
    protected int index;

    public RowBuilder(String sheetName, List<CellBuilder> cellBuilders, int index) {
        this.sheetName = sheetName;
        this.cellBuilders = cellBuilders;
        this.index = index;
    }

    @Override
    public void build(Workbook workbook) {
        Sheet sheet = workbook.getSheet(sheetName);
        if (sheet == null) {
            sheet = workbook.createSheet(sheetName);
        }
        Row row = sheet.createRow(index);

        for (CellBuilder cellBuilder : cellBuilders) {
            Cell cell = row.createCell(cellBuilders.indexOf(cellBuilder));
            switch (cellBuilder.getType()) {
                case STRING:
                    cell.setCellValue(((StringCellBuilder) cellBuilder).getValue());
                    cell.setCellType(cellBuilder.getCellType());
                    break;
                case DATE:
                    if (cellBuilder.getValue() != null) {
                        cell.setCellValue(((DateCellBuilder) cellBuilder).getValue());
                        CellStyle cellStyle = workbook.createCellStyle();
                        cellStyle.setDataFormat(workbook.getCreationHelper()
                                                        .createDataFormat()
                                                        .getFormat(com.incomm.cca.util.DateUtil.getDateTimeFormat()));
                        cell.setCellStyle(cellStyle);
                    } else {
                        cell.setCellType(Cell.CELL_TYPE_BLANK);
                    }
                    break;
                case NUMERIC:
                    cell.setCellValue(((DoubleCellBuilder) cellBuilder).getValue());
                    cell.setCellType(cellBuilder.getCellType());
                    break;
                case BOOLEAN:
                    if (cellBuilder.getValue() != null) {
                        cell.setCellValue(((BooleanCellBuilder) cellBuilder).getValue());
                        cell.setCellType(cellBuilder.getCellType());
                    } else {
                        cell.setCellType(Cell.CELL_TYPE_BLANK);
                    }
                    break;
            }
        }
    }
}
