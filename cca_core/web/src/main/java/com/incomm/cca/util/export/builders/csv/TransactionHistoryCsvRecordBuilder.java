package com.incomm.cca.util.export.builders.csv;

import com.incomm.cscore.client.apls.model.shared.EnhancedCode;
import com.incomm.cscore.client.apls.model.shared.constant.CodeType;
import com.incomm.cscore.client.apls.model.transaction.EnhancedTransaction;

import java.util.ArrayList;
import java.util.List;

public class TransactionHistoryCsvRecordBuilder extends CsvRecordBuilder {

    private String transactionId;
    private String platform;
    private String serialNumber;
    private String van;
    private String date;
    private String requestedAmount;
    private String authorizedAmount;
    private String pendingAmount;
    private String fxSurchargeAmount;
    private String balance;
    private String availableBalance;
    private String description;
    private String comment;
    private String nodeId;
    private String nodeName;
    private String nodeType;
    private String opCode;
    private String opCodeText;
    private String opCodeFlag;
    private String requestCode;
    private String requestDescription;
    private String ccaRequestDescription;
    private String responseCode;
    private String responseDescription;
    private String ccaResponseDescription;
    private String x95Code;
    private String x95Description;
    private String sicCode;
    private String sicDescription;
    private String expirationDate;
    private String settlementDate;
    private String currencyCode;
    private String currencyCodeDescription;
    private String isPin;
    private String isInternational;
    private String isBillable;
    private String isPartial;
    private String isPending;

    public TransactionHistoryCsvRecordBuilder(EnhancedTransaction transaction) {
        transactionId = transaction.getId();
        if (transaction.getPlatform() != null) {
            platform = transaction.getPlatform()
                                  .toString();
        }
        if (transaction.getIdentifiers() != null) {
            serialNumber = transaction.getIdentifiers()
                                      .getSerialNumber();
            van = transaction.getIdentifiers()
                             .getVan();
        }
        if (transaction.getCreateDate() != null) {
            date = transaction.getCreateDate()
                              .getDisplayValue();
        }
        if (transaction.getAmounts() != null) {
            requestedAmount = this.getDisplayValue(transaction.getAmounts()
                                                              .getRequestedAmount());
            authorizedAmount = this.getDisplayValue(transaction.getAmounts()
                                                               .getAuthorizedAmount());
            pendingAmount = this.getDisplayValue(transaction.getAmounts()
                                                            .getPendingAmount());
            fxSurchargeAmount = this.getDisplayValue(transaction.getAmounts()
                                                                .getFxSurchargeAmount());
            balance = this.getDisplayValue(transaction.getAmounts()
                                                      .getBalance());
            availableBalance = this.getDisplayValue(transaction.getAmounts()
                                                               .getAvailableBalance());
        }
        description = transaction.getDescription();
        comment = transaction.getComment();
        if (transaction.getNodes()
                       .getMostDescriptiveNode() != null) {
            nodeId = transaction.getNodes()
                                .getMostDescriptiveNode()
                                .getId();
            nodeName = transaction.getNodes()
                                  .getMostDescriptiveNode()
                                  .getName();
            nodeType = transaction.getNodes()
                                  .getMostDescriptiveNode()
                                  .getType();
        }

        if (transaction.getPlatform() != null) {
            //Set either op code fields or request/response fields based on platform, but set ccaRequest/Response fields for both
            switch (transaction.getPlatform()) {
                case GREENCARD:
                    if (transaction.getRequest() != null) {
                        requestCode = transaction.getRequest()
                                                 .getCode();
                        requestDescription = transaction.getRequest()
                                                        .getDescription();
                    }
                    if (transaction.getRequest() != null && transaction.getRequest()
                                                                       .getDescriptor() != null) {
                        ccaRequestDescription = transaction.getRequest()
                                                           .getDescriptor()
                                                           .getRequestValue();
                    }
                    if (transaction.getResponse() != null) {
                        responseCode = transaction.getResponse()
                                                  .getCode();
                        responseDescription = transaction.getResponse()
                                                         .getDescription();
                        isInternational = transaction.getResponse()
                                                     .getIsInternational()
                                                     .toString();
                        isPin = transaction.getResponse()
                                           .getIsPin()
                                           .toString();
                    }
                    if (transaction.getResponse() != null && transaction.getResponse()
                                                                        .getDescriptor() != null) {
                        ccaResponseDescription = transaction.getResponse()
                                                            .getDescriptor()
                                                            .getResponseValue();
                    }
                    break;
                default:
                    if (transaction.getOpCode() != null) {
                        opCode = transaction.getOpCode()
                                            .getCode();
                        opCodeText = transaction.getOpCode()
                                                .getDescription();
                        opCodeFlag = transaction.getOpCode()
                                                .getFlag();
                        if (transaction.getOpCode()
                                       .getDescriptor() != null) {
                            ccaRequestDescription = transaction.getOpCode()
                                                               .getDescriptor()
                                                               .getRequestValue();
                            ccaResponseDescription = transaction.getOpCode()
                                                                .getDescriptor()
                                                                .getResponseValue();
                        }
                    }
                    break;
            }
        }

        if (transaction.getSettlement() != null) {
            if (transaction.getSettlement()
                           .getX95() != null) {
                x95Code = transaction.getSettlement()
                                     .getX95()
                                     .getCode();
                x95Description = transaction.getSettlement()
                                            .getX95()
                                            .getDescription();
            }
            if (transaction.getSettlement()
                           .getSic() != null) {
                sicCode = transaction.getSettlement()
                                     .getSic()
                                     .getCode();
                sicDescription = transaction.getSettlement()
                                            .getSic()
                                            .getDescription();
            }
            expirationDate = transaction.getSettlement()
                                        .getExpirationDate(); //Not sure why, but this really is a String...
            if (transaction.getSettlement()
                           .getSettlementDate() != null) {
                settlementDate = transaction.getSettlement()
                                            .getSettlementDate()
                                            .getDisplayValue();
            }
        }

        EnhancedCode code = transaction.findCodeByType(CodeType.CURRENCY);
        if (code != null) {
            currencyCode = code.getCode();
            currencyCodeDescription = code.getDescription();
        }

        if (transaction.getFlags()
                       .getIsBillable() != null) {
            isBillable = transaction.getFlags()
                                    .getIsBillable()
                                    .toString();
        }
        if (transaction.getFlags()
                       .getIsPartial() != null) {
            isPartial = transaction.getFlags()
                                   .getIsPartial()
                                   .toString();
        }
        if (transaction.getFlags()
                       .getIsPending() != null) {
            isPending = transaction.getFlags()
                                   .getIsPending()
                                   .toString();
        }
    }

    @Override
    public List<String> buildHeader() {
        List<String> fields = new ArrayList<>();
        fields.add("transactionId");
        fields.add("platform");
        fields.add("serialNumber");
        fields.add("van");
        fields.add("date");
        fields.add("requestedAmount");
        fields.add("authorizedAmount");
        fields.add("pendingAmount");
        fields.add("fxSurchargeAmount");
        fields.add("balance");
        fields.add("availableBalance");
        fields.add("description");
        fields.add("comment");
        fields.add("nodeId");
        fields.add("nodeName");
        fields.add("nodeType");
        fields.add("opCode");
        fields.add("opCodeText");
        fields.add("opCodeFlag");
        fields.add("requestCode");
        fields.add("requestDescription");
        fields.add("ccaRequestDescription");
        fields.add("responseCode");
        fields.add("responseDescription");
        fields.add("ccaResponseDescription");
        fields.add("x95Code");
        fields.add("x95Description");
        fields.add("sicCode");
        fields.add("sicDescription");
        fields.add("expirationDate");
        fields.add("settlementDate");
        fields.add("currencyCode");
        fields.add("currencyCodeDescription");
        fields.add("isBillable");
        fields.add("isInternational");
        fields.add("isPartial");
        fields.add("isPending");
        fields.add("isPin");

        return fields;
    }

    @Override
    public List<String> buildRecord() {
        List<String> fields = new ArrayList<>();
        fields.add(transactionId);
        fields.add(platform);
        fields.add(serialNumber);
        fields.add(van);
        fields.add(date);
        fields.add(requestedAmount);
        fields.add(authorizedAmount);
        fields.add(pendingAmount);
        fields.add(fxSurchargeAmount);
        fields.add(balance);
        fields.add(availableBalance);
        fields.add(description);
        fields.add(comment);
        fields.add(nodeId);
        fields.add(nodeName);
        fields.add(nodeType);
        fields.add(opCode);
        fields.add(opCodeText);
        fields.add(opCodeFlag);
        fields.add(requestCode);
        fields.add(requestDescription);
        fields.add(ccaRequestDescription);
        fields.add(responseCode);
        fields.add(responseDescription);
        fields.add(ccaResponseDescription);
        fields.add(x95Code);
        fields.add(x95Description);
        fields.add(sicCode);
        fields.add(sicDescription);
        fields.add(expirationDate);
        fields.add(settlementDate);
        fields.add(currencyCode);
        fields.add(currencyCodeDescription);
        fields.add(isBillable);
        fields.add(isInternational);
        fields.add(isPartial);
        fields.add(isPending);
        fields.add(isPin);

        return fields;
    }
}
