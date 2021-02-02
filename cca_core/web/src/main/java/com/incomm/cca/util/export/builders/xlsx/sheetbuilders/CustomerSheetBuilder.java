package com.incomm.cca.util.export.builders.xlsx.sheetbuilders;

import com.incomm.cca.exception.ExportException;
import com.incomm.cca.util.export.builders.xlsx.cellbuilders.CellBuilderUtil;
import com.incomm.cca.util.export.builders.xlsx.rowbuilders.RowBuilder;
import com.incomm.cscore.client.apls.constant.AplsPlatform;
import com.incomm.cscore.client.apls.model.card.EnhancedCard;
import com.incomm.cscore.client.apls.model.customer.EnhancedAccountBalanceDetail;
import com.incomm.cscore.client.apls.model.customer.EnhancedCustomer;
import com.incomm.cscore.client.apls.model.shared.EnhancedStatus;
import com.incomm.cscore.client.apls.model.shared.constant.StatusType;
import com.incomm.cscore.gringotts.GringottsExchange;
import org.apache.commons.lang3.StringUtils;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.http.HttpStatus;

import java.math.BigDecimal;

public class CustomerSheetBuilder extends SheetBuilder {

    private EnhancedCustomer customer;
    private EnhancedCard selectedCard;

    public CustomerSheetBuilder(EnhancedCustomer customer, String selectedCardLastFour) {
        super(SHEET_PRODUCT);
        this.customer = customer;

        for (EnhancedCard card : customer.getCards()) {
            if (StringUtils.isNotBlank(card.getIdentifiers()
                                           .getPan()) && card.getIdentifiers()
                                                             .getPan()
                                                             .endsWith(selectedCardLastFour)) {
                this.selectedCard = card;
            }
        }

        if (this.selectedCard == null) {
            throw new ExportException("No card found matching provided lastFour", HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public void build(Workbook workbook) {
        new RowBuilder(sheetName, CellBuilderUtil.getSimpleRowCellBuilders("Card Number", selectedCard.getIdentifiers()
                                                                                                      .getPan()), 0).build(workbook);
        new RowBuilder(sheetName, CellBuilderUtil.getSimpleRowCellBuilders("Customer Name", String.format("%s %s", customer.getFirstName(), customer.getLastName())), 1).build(workbook);
        new RowBuilder(sheetName, CellBuilderUtil.getSimpleRowCellBuilders("Expiration Date", selectedCard.getExpirationDate() != null ? selectedCard.getExpirationDate()
                                                                                                                                                     .getDisplayValue() : null), 2).build(workbook);
        if (selectedCard.getActivation() != null) {
            new RowBuilder(sheetName, CellBuilderUtil.getSimpleRowCellBuilders("Activation Date", selectedCard.getActivation()
                                                                                                              .getActivationDate() != null ? selectedCard.getActivation()
                                                                                                                                                         .getActivationDate()
                                                                                                                                                         .getDisplayValue() : null), 3).build(workbook);
        } else {
            new RowBuilder(sheetName, CellBuilderUtil.getSimpleRowCellBuilders("Activation Date", ""), 3).build(workbook);
        }

        BigDecimal onHoldAmount = BigDecimal.ZERO;
        BigDecimal accountBalance = BigDecimal.ZERO;
        BigDecimal availableBalance = BigDecimal.ZERO;
        String accountNumber = "";
        String routingNumber = "";

        if (customer.getAccounts() != null && customer.getAccounts()
                                                      .getSpending() != null) {
            EnhancedAccountBalanceDetail spendingAmounts = customer.getAccounts()
                                                                   .getSpending();
            if (spendingAmounts.getAvailableBalance() != null) {
                availableBalance = spendingAmounts.getAvailableBalance()
                                                  .getValue();
            }
            if (spendingAmounts.getLedgerBalance() != null) {
                accountBalance = spendingAmounts.getLedgerBalance()
                                                .getValue();
            }
            onHoldAmount = accountBalance.subtract(availableBalance);
            accountNumber = customer.getAccounts()
                                    .getSpending()
                                    .getAccountNumber();
            routingNumber = customer.getAccounts()
                                    .getSpending()
                                    .getRoutingNumber();
        }

        EnhancedStatus vmsShippingStatus = selectedCard.findStatusByPlatformAndType(AplsPlatform.VMS, StatusType.SHIPPING);
        String fulfilmentStatus = vmsShippingStatus != null ? vmsShippingStatus.getName() : null;

        new RowBuilder(sheetName, CellBuilderUtil.getSimpleRowCellBuilders("Account Balance", GringottsExchange.quickExchange(accountBalance)
                                                                                                               .getDisplayValue()), 4).build(workbook);
        new RowBuilder(sheetName, CellBuilderUtil.getSimpleRowCellBuilders("On Hold", GringottsExchange.quickExchange(onHoldAmount)
                                                                                                       .getDisplayValue()), 5).build(workbook);
        new RowBuilder(sheetName, CellBuilderUtil.getSimpleRowCellBuilders("Available Balance", GringottsExchange.quickExchange(availableBalance)
                                                                                                                 .getDisplayValue()), 6).build(workbook);
        new RowBuilder(sheetName, CellBuilderUtil.getSimpleRowCellBuilders("Product", customer.getProductName()), 7).build(workbook);
        new RowBuilder(sheetName, CellBuilderUtil.getSimpleRowCellBuilders("Product Type", customer.getProductType()), 8).build(workbook);
        new RowBuilder(sheetName, CellBuilderUtil.getSimpleRowCellBuilders("Product Category", selectedCard.getProductCategory()), 9).build(workbook);
        new RowBuilder(sheetName, CellBuilderUtil.getSimpleRowCellBuilders("VAN", selectedCard.getIdentifiers()
                                                                                              .getVan()), 10).build(workbook);
        new RowBuilder(sheetName, CellBuilderUtil.getSimpleRowCellBuilders("Serial Number", selectedCard.getIdentifiers()
                                                                                                        .getSerialNumber()), 11).build(workbook);
        new RowBuilder(sheetName, CellBuilderUtil.getSimpleRowCellBuilders("Account Number", accountNumber), 12).build(workbook);
        new RowBuilder(sheetName, CellBuilderUtil.getSimpleRowCellBuilders("Routing Number", routingNumber), 13).build(workbook);
        new RowBuilder(sheetName, CellBuilderUtil.getSimpleRowCellBuilders("Fulfilment Status", fulfilmentStatus), 14).build(workbook);
    }
}
