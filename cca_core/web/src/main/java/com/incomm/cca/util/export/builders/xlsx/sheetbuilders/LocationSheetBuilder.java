package com.incomm.cca.util.export.builders.xlsx.sheetbuilders;

import com.incomm.cca.util.export.builders.xlsx.cellbuilders.CellBuilderUtil;
import com.incomm.cca.util.export.builders.xlsx.rowbuilders.RowBuilder;
import com.incomm.cscore.client.apls.model.node.EnhancedLocation;
import com.incomm.cscore.client.apls.model.node.EnhancedMerchant;
import com.incomm.cscore.client.model.constant.CsCorePhoneNumberType;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.poi.ss.usermodel.Workbook;

import java.util.ArrayList;
import java.util.List;

public class LocationSheetBuilder extends SheetBuilder {

    private EnhancedLocation location;
    private List<String> merchants;

    public LocationSheetBuilder(EnhancedLocation location) {
        super(SHEET_LOCATION);
        this.location = location;
        this.merchants = new ArrayList<>();
        //Build list of merchants, which comes from APLS with the first entry being the direct parent merchant, and the last being the top level merchant
        for (EnhancedMerchant merchant : location.getHierarchy()
                                                 .getMerchants()) {
            merchants.add(merchant.getName());
        }
    }

    @Override
    public void build(Workbook workbook) {
        int rowIndex = 0;
        int merchantIndex = merchants.size();
        new RowBuilder(sheetName, CellBuilderUtil.getSimpleRowCellBuilders("Business", location.getHierarchy() != null ? location.getHierarchy()
                                                                                                                                 .getBusinessUnit()
                                                                                                                                 .getName() : null), rowIndex++).build(workbook);
        for (String merchant : merchants) {
            new RowBuilder(sheetName, CellBuilderUtil.getSimpleRowCellBuilders(String.format("Merchant %s", merchantIndex++), merchant), rowIndex++).build(workbook);
        }
        new RowBuilder(sheetName, CellBuilderUtil.getSimpleRowCellBuilders("Location", location.getName()), rowIndex++).build(workbook);
        new RowBuilder(sheetName, CellBuilderUtil.getSimpleRowCellBuilders("Contact", extractContactName(location)), rowIndex++).build(workbook);
        new RowBuilder(sheetName, CellBuilderUtil.getSimpleRowCellBuilders("Phone", location.findPreferredPhone() != null ? location.findPreferredPhone()
                                                                                                                                    .getNumber() : null), rowIndex++).build(workbook);
        new RowBuilder(sheetName, CellBuilderUtil.getSimpleRowCellBuilders("Fax", location.findPhoneNumberOfType(CsCorePhoneNumberType.FAX) != null ? location.findPhoneNumberOfType(CsCorePhoneNumberType.FAX)
                                                                                                                                                              .getNumber() : null), rowIndex++).build(workbook);
        new RowBuilder(sheetName, CellBuilderUtil.getSimpleRowCellBuilders("Email", location.getEmailAddress()), rowIndex).build(workbook);
    }

    private String extractContactName(EnhancedLocation location) {
        String contactName = StringUtils.EMPTY;
        if (CollectionUtils.isNotEmpty(location.getContacts())) {
            contactName = location.getContacts()
                                  .get(0)
                                  .getName();
        }
        return contactName;
    }
}
