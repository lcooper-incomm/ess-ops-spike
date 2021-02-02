package com.incomm.cca.util.export.builders.xlsx.sheetbuilders;

import com.incomm.cca.util.export.builders.xlsx.cellbuilders.CellBuilderUtil;
import com.incomm.cca.util.export.builders.xlsx.rowbuilders.RowBuilder;
import com.incomm.cscore.client.apls.model.customer.EnhancedCustomer;
import com.incomm.cscore.client.model.CsCoreAddress;
import com.incomm.cscore.client.model.CsCorePhoneNumber;
import com.incomm.cscore.client.model.constant.CsCoreAddressType;
import com.incomm.cscore.client.model.constant.CsCorePhoneNumberType;
import org.apache.poi.ss.usermodel.Workbook;

public class AccountHolderSheetBuilder extends SheetBuilder {

    private EnhancedCustomer customer;

    public AccountHolderSheetBuilder(EnhancedCustomer customer) {
        super(SHEET_ACCOUNT_HOLDER);
        this.customer = customer;
    }

    @Override
    public void build(Workbook workbook) {
        new RowBuilder(sheetName, CellBuilderUtil.getSimpleRowCellBuilders("Customer ID", customer.getId()), 0).build(workbook);
        new RowBuilder(sheetName, CellBuilderUtil.getSimpleRowCellBuilders("First Name", customer.getFirstName()), 1).build(workbook);
        new RowBuilder(sheetName, CellBuilderUtil.getSimpleRowCellBuilders("Last Name", customer.getLastName()), 2).build(workbook);
        new RowBuilder(sheetName, CellBuilderUtil.getSimpleRowCellBuilders("Date of Birth", customer.getDateOfBirth()), 3).build(workbook);
        new RowBuilder(sheetName, CellBuilderUtil.getSimpleRowCellBuilders("Identification Type", customer.getIdentification() != null ? customer.getIdentification()
                                                                                                                                                 .getType() : null), 4).build(workbook);
        new RowBuilder(sheetName, CellBuilderUtil.getSimpleRowCellBuilders("Identification Number", customer.getIdentification() != null ? customer.getIdentification()
                                                                                                                                                   .getNumber() : null), 5).build(workbook);
        new RowBuilder(sheetName, CellBuilderUtil.getSimpleRowCellBuilders("Identification Expiration Date", customer.getIdentification() != null && customer.getIdentification()
                                                                                                                                                             .getExpirationDate() != null ? customer.getIdentification()
                                                                                                                                                                                                    .getExpirationDate()
                                                                                                                                                                                                    .getDisplayValue() : null), 6).build(workbook);
        new RowBuilder(sheetName, CellBuilderUtil.getSimpleRowCellBuilders("Identification Issuance Date", customer.getIdentification() != null && customer.getIdentification()
                                                                                                                                                           .getIssuanceDate() != null ? customer.getIdentification()
                                                                                                                                                                                                .getIssuanceDate()
                                                                                                                                                                                                .getDisplayValue() : null), 7).build(workbook);
        new RowBuilder(sheetName, CellBuilderUtil.getSimpleRowCellBuilders("Identification Issued By", customer.getIdentification() != null ? customer.getIdentification()
                                                                                                                                                      .getIssuedBy() : null), 8).build(workbook);
        new RowBuilder(sheetName, CellBuilderUtil.getSimpleRowCellBuilders("Online Username", customer.getIdentifiers()
                                                                                                      .getOnlineUserId()), 9).build(workbook);
        new RowBuilder(sheetName, CellBuilderUtil.getSimpleRowCellBuilders("Mother's Maiden Name", customer.getMothersMaidenName()), 10).build(workbook);
        this.buildPhoneNumberValues(workbook);
        new RowBuilder(sheetName, CellBuilderUtil.getSimpleRowCellBuilders("Email", customer.getEmailAddress()), 13).build(workbook);

        this.buildAddressValues(workbook);
        new RowBuilder(sheetName, CellBuilderUtil.getSimpleRowCellBuilders("Registration Date", customer.getRegistrationDate() != null ? customer.getRegistrationDate()
                                                                                                                                                 .getDisplayValue() : null), 24).build(workbook);
    }

    private void buildAddressValues(Workbook workbook) {
        CsCorePhoneNumber homePhone = customer.findHomePhone();
        CsCorePhoneNumber cellPhone = customer.findPhoneNumberOfType(CsCorePhoneNumberType.MOBILE);

        new RowBuilder(sheetName, CellBuilderUtil.getSimpleRowCellBuilders("Home Phone", homePhone != null ? homePhone.getNumber() : null), 11).build(workbook);
        new RowBuilder(sheetName, CellBuilderUtil.getSimpleRowCellBuilders("Cell Phone", cellPhone != null ? cellPhone.getNumber() : null), 12).build(workbook);
    }

    private void buildPhoneNumberValues(Workbook workbook) {
        CsCoreAddress physicalAddress = customer.findAddressOfType(CsCoreAddressType.PHYSICAL);
        CsCoreAddress mailingAddress = customer.findMailingAddress();

        new RowBuilder(sheetName, CellBuilderUtil.getSimpleRowCellBuilders("Physical Address Line 1", physicalAddress != null ? physicalAddress.getLine1() : null), 14).build(workbook);
        new RowBuilder(sheetName, CellBuilderUtil.getSimpleRowCellBuilders("Physical Address Line 2", physicalAddress != null ? physicalAddress.getLine2() : null), 15).build(workbook);
        new RowBuilder(sheetName, CellBuilderUtil.getSimpleRowCellBuilders("Physical Address City", physicalAddress != null ? physicalAddress.getCity() : null), 16).build(workbook);
        new RowBuilder(sheetName, CellBuilderUtil.getSimpleRowCellBuilders("Physical Address State", physicalAddress != null ? physicalAddress.getState() : null), 17).build(workbook);
        new RowBuilder(sheetName, CellBuilderUtil.getSimpleRowCellBuilders("Physical Address Postal Code", physicalAddress != null ? physicalAddress.getPostalCode() : null), 18).build(workbook);
        new RowBuilder(sheetName, CellBuilderUtil.getSimpleRowCellBuilders("Mailing Address Line 1", mailingAddress != null ? mailingAddress.getLine1() : null), 19).build(workbook);
        new RowBuilder(sheetName, CellBuilderUtil.getSimpleRowCellBuilders("Mailing Address Line 2", mailingAddress != null ? mailingAddress.getLine2() : null), 20).build(workbook);
        new RowBuilder(sheetName, CellBuilderUtil.getSimpleRowCellBuilders("Mailing Address City", mailingAddress != null ? mailingAddress.getCity() : null), 21).build(workbook);
        new RowBuilder(sheetName, CellBuilderUtil.getSimpleRowCellBuilders("Mailing Address State", mailingAddress != null ? mailingAddress.getState() : null), 22).build(workbook);
        new RowBuilder(sheetName, CellBuilderUtil.getSimpleRowCellBuilders("Mailing Address Postal Code", mailingAddress != null ? mailingAddress.getPostalCode() : null), 23).build(workbook);
    }
}
