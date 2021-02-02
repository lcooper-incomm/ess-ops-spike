package com.incomm.cca.util.export.builders.xlsx.cellbuilders;

import com.incomm.cscore.client.apls.model.card.EnhancedCardAccountHistory;
import com.incomm.cscore.client.apls.model.node.EnhancedTerminal;
import com.incomm.cscore.client.apls.model.shared.EnhancedCode;
import com.incomm.cscore.client.apls.model.shared.constant.CodeType;
import com.incomm.cscore.client.apls.model.transaction.EnhancedTransaction;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class CellBuilderUtil {

    public static List<CellBuilder> getHistoryHeaderCellBuilders() {
        List<CellBuilder> builders = new ArrayList<>();
        builders.add(new StringCellBuilder("Transaction ID"));
        builders.add(new StringCellBuilder("Card Number"));
        builders.add(new StringCellBuilder("Platform"));
        builders.add(new StringCellBuilder("Serial Number"));
        builders.add(new StringCellBuilder("VAN"));
        builders.add(new StringCellBuilder("Date"));
        builders.add(new StringCellBuilder("Requested Amount"));
        builders.add(new StringCellBuilder("Authorized Amount"));
        builders.add(new StringCellBuilder("Fee Amount"));
        builders.add(new StringCellBuilder("Pending Amount"));
        builders.add(new StringCellBuilder("FX Surcharge Amount"));
        builders.add(new StringCellBuilder("Balance"));
        builders.add(new StringCellBuilder("Available Balance"));
        builders.add(new StringCellBuilder("Description"));
        builders.add(new StringCellBuilder("Comment"));
        builders.add(new StringCellBuilder("Node ID"));
        builders.add(new StringCellBuilder("Node Name"));
        builders.add(new StringCellBuilder("Node Type"));
        builders.add(new StringCellBuilder("Op Code"));
        builders.add(new StringCellBuilder("Op Code Text"));
        builders.add(new StringCellBuilder("Op Code Flag"));
        builders.add(new StringCellBuilder("Request Code"));
        builders.add(new StringCellBuilder("Request Description"));
        builders.add(new StringCellBuilder("CCA Request Description"));
        builders.add(new StringCellBuilder("Response Code"));
        builders.add(new StringCellBuilder("Response Description"));
        builders.add(new StringCellBuilder("CCA ResponseEntity Description"));
        builders.add(new StringCellBuilder("X95 Code"));
        builders.add(new StringCellBuilder("X95 Description"));
        builders.add(new StringCellBuilder("SIC Code"));
        builders.add(new StringCellBuilder("SIC Description"));
        builders.add(new StringCellBuilder("Expiration Date"));
        builders.add(new StringCellBuilder("Settlement Date"));
        builders.add(new StringCellBuilder("Currency Code"));
        builders.add(new StringCellBuilder("Currency Code Description"));
        builders.add(new StringCellBuilder("Delivery Channel Code"));
        builders.add(new StringCellBuilder("Delivery Channel Description"));
        builders.add(new StringCellBuilder("isBillable"));
        builders.add(new StringCellBuilder("isInternational"));
        builders.add(new StringCellBuilder("isPartial"));
        builders.add(new StringCellBuilder("isPending"));
        builders.add(new StringCellBuilder("isPIN"));
        builders.add(new StringCellBuilder("inDispute"));
        builders.add(new StringCellBuilder("isDigitalProduct"));
        builders.add(new StringCellBuilder("isDisputable"));
        builders.add(new StringCellBuilder("isReversalTransaction"));
        builders.add(new StringCellBuilder("isSwipeReload"));

        return builders;
    }

    public static List<CellBuilder> getHistoryRowCellBuilders(EnhancedTransaction transaction) {
        List<CellBuilder> builders = new ArrayList<>();
        builders.add(new StringCellBuilder(transaction.getId()));
        builders.add(new StringCellBuilder(transaction.getIdentifiers()
                                                      .getPan()));
        builders.add(new StringCellBuilder(transaction.getPlatform()
                                                      .toString()));
        builders.add(new StringCellBuilder(transaction.getIdentifiers()
                                                      .getSerialNumber()));
        builders.add(new StringCellBuilder(transaction.getIdentifiers()
                                                      .getVan()));
        builders.add(new StringCellBuilder(transaction.getCreateDate() != null ? transaction.getCreateDate()
                                                                                            .getDisplayValue() : null));
        builders.add(new StringCellBuilder(transaction.getAmounts()
                                                      .getRequestedAmount() != null ? transaction.getAmounts()
                                                                                                 .getRequestedAmount()
                                                                                                 .getDisplayValue() : null));
        builders.add(new StringCellBuilder(transaction.getAmounts()
                                                      .getAuthorizedAmount() != null ? transaction.getAmounts()
                                                                                                  .getAuthorizedAmount()
                                                                                                  .getDisplayValue() : null));
        builders.add(new StringCellBuilder(transaction.getFee() != null && transaction.getFee()
                                                                                      .getAmount() != null ? transaction.getFee()
                                                                                                                        .getAmount()
                                                                                                                        .getDisplayValue() : null));
        builders.add(new StringCellBuilder(transaction.getAmounts()
                                                      .getPendingAmount() != null ? transaction.getAmounts()
                                                                                               .getPendingAmount()
                                                                                               .getDisplayValue() : null));
        builders.add(new StringCellBuilder(transaction.getAmounts()
                                                      .getFxSurchargeAmount() != null ? transaction.getAmounts()
                                                                                                   .getFxSurchargeAmount()
                                                                                                   .getDisplayValue() : null));
        builders.add(new StringCellBuilder(transaction.getAmounts()
                                                      .getBalance() != null ? transaction.getAmounts()
                                                                                         .getBalance()
                                                                                         .getDisplayValue() : null));
        builders.add(new StringCellBuilder(transaction.getAmounts()
                                                      .getAvailableBalance() != null ? transaction.getAmounts()
                                                                                                  .getAvailableBalance()
                                                                                                  .getDisplayValue() : null));
        builders.add(new StringCellBuilder(transaction.getDescription()));
        builders.add(new StringCellBuilder(transaction.getComment()));
        builders.add(new StringCellBuilder(transaction.getNodes()
                                                      .getMostDescriptiveNode() != null ? transaction.getNodes()
                                                                                                     .getMostDescriptiveNode()
                                                                                                     .getId() : null));
        builders.add(new StringCellBuilder(transaction.getNodes()
                                                      .getMostDescriptiveNode() != null ? transaction.getNodes()
                                                                                                     .getMostDescriptiveNode()
                                                                                                     .getName() : null));
        builders.add(new StringCellBuilder((transaction.getNodes()
                                                       .getMostDescriptiveNode() != null) ? transaction.getNodes()
                                                                                                       .getMostDescriptiveNode()
                                                                                                       .getType() : null));
        builders.add(new StringCellBuilder(transaction.getOpCode() != null ? transaction.getOpCode()
                                                                                        .getCode() : null));
        builders.add(new StringCellBuilder(transaction.getOpCode() != null ? transaction.getOpCode()
                                                                                        .getDescription() : null));
        builders.add(new StringCellBuilder(transaction.getOpCode() != null ? transaction.getOpCode()
                                                                                        .getFlag() : null));
        builders.add(new StringCellBuilder(transaction.getRequest() != null ? transaction.getRequest()
                                                                                         .getCode() : null));
        builders.add(new StringCellBuilder(transaction.getRequest() != null ? transaction.getRequest()
                                                                                         .getDescription() : null));
        //CCA Mapped request value location depends on platform
        switch (transaction.getPlatform()) {
            case GREENCARD:
                builders.add(new StringCellBuilder(transaction.getRequest() != null && transaction.getRequest()
                                                                                                  .getDescriptor() != null ? transaction.getRequest()
                                                                                                                                        .getDescriptor()
                                                                                                                                        .getRequestValue() : null));
                break;
            default:
                builders.add(new StringCellBuilder(transaction.getOpCode() != null && transaction.getOpCode()
                                                                                                 .getDescriptor() != null ? transaction.getOpCode()
                                                                                                                                       .getDescriptor()
                                                                                                                                       .getRequestValue() : null));
                break;
        }
        builders.add(new StringCellBuilder(transaction.getResponse() != null ? transaction.getResponse()
                                                                                          .getCode() : null));
        builders.add(new StringCellBuilder(transaction.getResponse() != null ? transaction.getResponse()
                                                                                          .getDescription() : null));
        //CCA Mapped response value location depends on platform
        switch (transaction.getPlatform()) {
            case GREENCARD:
                builders.add(new StringCellBuilder(transaction.getResponse() != null && transaction.getResponse()
                                                                                                   .getDescriptor() != null ? transaction.getResponse()
                                                                                                                                         .getDescriptor()
                                                                                                                                         .getResponseValue() : null));
                break;
            default:
                builders.add(new StringCellBuilder(transaction.getOpCode() != null && transaction.getOpCode()
                                                                                                 .getDescriptor() != null ? transaction.getOpCode()
                                                                                                                                       .getDescriptor()
                                                                                                                                       .getResponseValue() : null));
                break;
        }
        builders.add(new StringCellBuilder(transaction.getSettlement() != null && transaction.getSettlement()
                                                                                             .getX95() != null ? transaction.getSettlement()
                                                                                                                            .getX95()
                                                                                                                            .getCode() : null));
        builders.add(new StringCellBuilder(transaction.getSettlement() != null && transaction.getSettlement()
                                                                                             .getX95() != null ? transaction.getSettlement()
                                                                                                                            .getX95()
                                                                                                                            .getDescription() : null));
        builders.add(new StringCellBuilder(transaction.getSettlement() != null && transaction.getSettlement()
                                                                                             .getSic() != null ? transaction.getSettlement()
                                                                                                                            .getSic()
                                                                                                                            .getCode() : null));
        builders.add(new StringCellBuilder(transaction.getSettlement() != null && transaction.getSettlement()
                                                                                             .getSic() != null ? transaction.getSettlement()
                                                                                                                            .getSic()
                                                                                                                            .getDescription() : null));
        builders.add(new StringCellBuilder(transaction.getSettlement() != null ? transaction.getSettlement()
                                                                                            .getExpirationDate() : null));
        builders.add(new StringCellBuilder(transaction.getSettlement() != null && transaction.getSettlement()
                                                                                             .getSettlementDate() != null ? transaction.getSettlement()
                                                                                                                                       .getSettlementDate()
                                                                                                                                       .getDisplayValue() : null));

        EnhancedCode currencyCode = transaction.findCodeByType(CodeType.CURRENCY);
        builders.add(new StringCellBuilder(currencyCode != null ? currencyCode.getCode() : null));
        builders.add(new StringCellBuilder(currencyCode != null ? currencyCode.getDescription() : null));

        EnhancedCode deliveryChannelCode = transaction.findCodeByType(CodeType.DELIVERY_CHANNEL);
        builders.add(new StringCellBuilder(deliveryChannelCode != null ? deliveryChannelCode.getCode() : null));
        builders.add(new StringCellBuilder(deliveryChannelCode != null ? deliveryChannelCode.getDescription() : null));

        builders.add(new BooleanCellBuilder(transaction.getFlags()
                                                       .getIsBillable()));
        builders.add(new BooleanCellBuilder(transaction.getResponse() != null ? transaction.getResponse()
                                                                                           .getIsInternational() : null));
        builders.add(new BooleanCellBuilder(transaction.getFlags()
                                                       .getIsPartial()));
        builders.add(new BooleanCellBuilder(transaction.getFlags()
                                                       .getIsPending()));
        builders.add(new BooleanCellBuilder(transaction.getResponse() != null ? transaction.getResponse()
                                                                                           .getIsPin() : null));
        builders.add(new BooleanCellBuilder(transaction.getFlags()
                                                       .getIsInDispute()));
        builders.add(new BooleanCellBuilder(transaction.getFlags()
                                                       .getIsDigitalProduct()));
        builders.add(new BooleanCellBuilder(transaction.getFlags()
                                                       .getIsDisputable()));
        builders.add(new BooleanCellBuilder(transaction.getFlags()
                                                       .getIsReversalTransaction()));
        builders.add(new BooleanCellBuilder(transaction.getFlags()
                                                       .getIsFraudulent()));

        return builders;
    }

    public static List<CellBuilder> getSimpleRowCellBuilders(String key, String value) {
        List<CellBuilder> builders = new ArrayList<>();
        builders.add(new StringCellBuilder(key));
        builders.add(new StringCellBuilder(value));
        return builders;
    }

    public static List<CellBuilder> getSimpleRowCellBuilders(String key, Date value) {
        List<CellBuilder> builders = new ArrayList<>();
        builders.add(new StringCellBuilder(key));
        builders.add(new DateCellBuilder(value));
        return builders;
    }

    public static List<CellBuilder> getSimpleRowCellBuilders(String key, Double value) {
        List<CellBuilder> builders = new ArrayList<>();
        builders.add(new StringCellBuilder(key));
        builders.add(new DoubleCellBuilder(value));
        return builders;
    }

    public static List<CellBuilder> getSimpleRowCellBuilders(String key, Boolean value) {
        List<CellBuilder> builders = new ArrayList<>();
        builders.add(new StringCellBuilder(key));
        builders.add(new BooleanCellBuilder(value));
        return builders;
    }

    public static List<CellBuilder> getTerminalsHeaderCellBuilders() {
        List<CellBuilder> builders = new ArrayList<>();
        builders.add(new StringCellBuilder("Terminal Number"));
        return builders;
    }

    public static List<CellBuilder> getTerminalsRowCellBuilders(EnhancedTerminal terminal) {
        List<CellBuilder> builders = new ArrayList<>();
        builders.add(new StringCellBuilder(terminal.getTerminalNumber()));
        return builders;
    }

    public static List<CellBuilder> getGreenCardAccountHistoryHeaderCellBuilders() {
        List<CellBuilder> builders = new ArrayList<>();
        builders.add(new StringCellBuilder("Date"));
        builders.add(new StringCellBuilder("Transaction #"));
        builders.add(new StringCellBuilder("Username"));
        builders.add(new StringCellBuilder("Update Type"));
        builders.add(new StringCellBuilder("Description"));
        builders.add(new StringCellBuilder("Note"));
        return builders;
    }

    public static List<CellBuilder> getGreenCardAccountHistoryRowCellBuilders(EnhancedCardAccountHistory transaction) {
        List<CellBuilder> builders = new ArrayList<>();
        builders.add(new StringCellBuilder(transaction.getDate() != null ? transaction.getDate()
                                                                                      .getDisplayValue() : ""));
        builders.add(new StringCellBuilder(transaction.getId()));
        builders.add(new StringCellBuilder(transaction.getUsername()));
        builders.add(new StringCellBuilder(transaction.getUpdateType()));
        builders.add(new StringCellBuilder(transaction.getDescription()));
        builders.add(new StringCellBuilder(transaction.getNote()));
        return builders;
    }
}
