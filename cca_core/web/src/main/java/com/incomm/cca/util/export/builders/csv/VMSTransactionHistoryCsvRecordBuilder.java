package com.incomm.cca.util.export.builders.csv;

import com.incomm.cscore.client.apls.model.customer.EnhancedCustomer;
import com.incomm.cscore.client.apls.model.node.EnhancedNode;
import com.incomm.cscore.client.apls.model.shared.EnhancedCode;
import com.incomm.cscore.client.apls.model.shared.constant.CodeType;
import com.incomm.cscore.client.apls.model.transaction.EnhancedAddressVerification;
import com.incomm.cscore.client.apls.model.transaction.EnhancedSettlement;
import com.incomm.cscore.client.apls.model.transaction.EnhancedTransaction;
import com.incomm.cscore.client.model.CsCoreAddress;
import org.apache.commons.lang3.StringUtils;

import java.util.ArrayList;
import java.util.List;

public class VMSTransactionHistoryCsvRecordBuilder extends CsvRecordBuilder {

    private String transactionId;
    private String date;
    private String authorizedAmount;
    private String balance;
    private String availableBalance;
    private String cardNumber;
    private String sourceDescription;
    private EnhancedCustomer customer;
    private String node;
    private String requestValue;
    private String responseValue;
    private String fee;
    private String pendingAmount;
    private String location;
    private String addressLine1;
    private String addressLine2;
    private String city;
    private String postalCode;
    private String currencyCode;
    private String isInternational;
    private String creditDebit;
    private String originalTransactionDate;
    private String originalTransactionId;
    private String originalTerminalId;
    private String requestCode;
    private String responseCode;
    private String mccCode;
    private String settlementDate;
    private String authenticationType;
    private String description;
    private String opCode;
    private String request;
    private String response;
    private String chargeBackRightsIndicator;
    private String comment;
    private String institution;
    private String manualNotes;
    private String manualReason;
    private String opCodeFlag;
    private String opCodeText;
    private String source;
    private String transactionDate;
    private String isBillable;
    private String isDigitalProduct;
    private String isDisputable;
    private String inDispute;
    private String isPartial;
    private String isPending;
    private String isReversalTransaction;
    private String serialNumber;
    private String accountNumber;
    private String can;
    private String pin;
    private String van;
    private String requestedAmount;
    private String fxSurchargeAmount;
    private String reversalAmount;
    private String cashBackAmount;
    private String interchangeFee;
    private String merchantFloorLimit;
    private String preauthBalance;
    private String device;
    private String feePlanId;
    private String feeId;
    private String feeDescription;
    private String entryMode;
    private String userCode;
    private String posEntryMode;
    private String reason;
    private String submissionIndicator;
    private String requestType;
    private String username;
    private String pinTransaction;
    private String duration;
    private String settlementPreAuthKey;
    private String settlementx95Code;
    private String settlementx95Description;
    private String settlementx95Type;
    private String settlementExpirationDate;
    private String settlementSicCode;
    private String settlementSicCodeDescription;
    private String settlementX95OriginalType;
    private String settlmentIncrementalIndicator;
    private String settlmenetCompletionCount;
    private String settlementLastCompletionCount;
    private String settlementNetworkDescription;
    private String settlementAuthenticationType;
    private String settlementPreAuthReleaseDate;
    private String settlementNetworkSettlementDate;
    private String settlementAddressVerificationPostalcode;
    private String settlementAddressVerificationSuccess;
    private String settlementAddressVerificationResponse;

    public VMSTransactionHistoryCsvRecordBuilder(EnhancedCustomer customer, EnhancedTransaction transaction) {
        this.customer = customer;

        transactionId = transaction.getId();

        if (transaction.getBusinessDate() != null) {
            date = transaction.getBusinessDate()
                              .getDisplayValue();
        }

        if (transaction.getAmounts() != null) {
            authorizedAmount = this.getDisplayValue(transaction.getAmounts()
                                                               .getAuthorizedAmount());
            balance = this.getDisplayValue(transaction.getAmounts()
                                                      .getBalance());
            availableBalance = this.getDisplayValue(transaction.getAmounts()
                                                               .getAvailableBalance());
            pendingAmount = this.getDisplayValue(transaction.getAmounts()
                                                            .getPendingAmount());
            creditDebit = transaction.getAmounts()
                                     .getCrdrFlag() != null ? transaction.getAmounts()
                                                                         .getCrdrFlag()
                                                                         .toString() : null;
            requestedAmount = this.getDisplayValue(transaction.getAmounts()
                                                              .getRequestedAmount());
            fxSurchargeAmount = this.getDisplayValue(transaction.getAmounts()
                                                                .getFxSurchargeAmount());
            reversalAmount = this.getDisplayValue(transaction.getAmounts()
                                                             .getReversalAmount());
            cashBackAmount = this.getDisplayValue(transaction.getAmounts()
                                                             .getCashbackAmount());
            interchangeFee = this.getDisplayValue(transaction.getAmounts()
                                                             .getInterchangeFee());
            merchantFloorLimit = transaction.getAmounts()
                                            .getMerchantFloorLimitIndicator()
                                            .toString();
            preauthBalance = this.getDisplayValue(transaction.getAmounts()
                                                             .getPreAuthBalance());
        }

        if (transaction.getIdentifiers() != null) {
            cardNumber = transaction.getIdentifiers()
                                    .getPan();
            serialNumber = transaction.getIdentifiers()
                                      .getSerialNumber();
            accountNumber = transaction.getIdentifiers()
                                       .getAccountNumber();
            can = transaction.getIdentifiers()
                             .getCan();
            pin = transaction.getIdentifiers()
                             .getPin();
            van = transaction.getIdentifiers()
                             .getVan();
        }

        if (transaction.getCodes() != null) {
            EnhancedCode source = transaction.findCodeByType(CodeType.DELIVERY_CHANNEL);
            if (source != null) {
                sourceDescription = source.getDescription();
            }

            EnhancedCode currencyHistoryCode = transaction.findCodeByType(CodeType.CURRENCY);

            if (currencyHistoryCode != null) {
                currencyCode = currencyHistoryCode.getCode();
            }

            EnhancedCode mccHistoryCode = transaction.findCodeByType(CodeType.MCC);
            mccCode = mccHistoryCode != null ? mccHistoryCode.getCode() : "";
            String mccDescription = mccHistoryCode != null ? mccHistoryCode.getDescription() : "";

            mccCode = mccDescription + " " + mccCode;

            String responseDescription = "";

            if (transaction.getResponse() != null) {
                responseDescription = transaction.getResponse()
                                                 .getDescription();

                if (responseDescription == null) {
                    responseDescription = "";
                } else {
                    responseDescription = responseDescription + " ";
                }
            }

            responseCode = responseDescription + responseCode;

        }

        if (transaction.getNodes() != null) {
            if (transaction.getNodes()
                           .getTerminal() != null) {
                node = transaction.getNodes()
                                  .getTerminal()
                                  .getName();
            } else if (transaction.getNodes()
                                  .getLocation() != null) {
                node = transaction.getNodes()
                                  .getLocation()
                                  .getName();
            } else if (transaction.getNodes()
                                  .getMerchant() != null) {
                EnhancedNode historyNode = transaction.getNodes()
                                                      .getMerchant();
                node = historyNode.getName();
                location = node;

                CsCoreAddress address = historyNode.findPreferredAddress();
                if (address != null) {
                    addressLine1 = address.getLine1();
                    addressLine2 = address.getLine2();
                    city = address.getCity();
                    postalCode = address.getPostalCode();
                }
            }
        }

        if (transaction.getRequest() != null && transaction.getRequest()
                                                           .getDescriptor() != null) {
            requestValue = transaction.getRequest()
                                      .getDescriptor()
                                      .getRequestValue();
        }

        if (transaction.getResponse() != null && transaction.getResponse()
                                                            .getDescriptor() != null) {
            responseValue = transaction.getResponse()
                                       .getDescriptor()
                                       .getResponseValue();
        }

        if (transaction.getRequest() != null) {
            if (requestValue == null) {
                requestValue = transaction.getRequest()
                                          .getDescription() + " (" + transaction.getRequest()
                                                                                .getCode() + ")";
            }

            String requestDescription = transaction.getRequest()
                                                   .getDescription();

            if (requestDescription == null) {
                requestDescription = "";
            } else {
                requestDescription = requestDescription + " ";
            }

            requestCode = requestDescription + transaction.getRequest()
                                                          .getCode();
            request = transaction.getRequest()
                                 .getDescription();
            entryMode = transaction.getRequest()
                                   .getEntryMode();
            userCode = transaction.getRequest()
                                  .getUserCode();
            posEntryMode = transaction.getRequest()
                                      .getPosEntryMode();
            reason = transaction.getRequest()
                                .getReason();
            submissionIndicator = transaction.getRequest()
                                             .getSubmissionIndicator();
            requestType = transaction.getRequest()
                                     .getType();
            username = transaction.getRequest()
                                  .getUserName();
        }

        if (transaction.getResponse() != null) {
            if (responseValue == null) {
                responseValue = transaction.getResponse()
                                           .getDescription() + " (" + transaction.getResponse()
                                                                                 .getCode() + ")";
            }

            if (transaction.getResponse()
                           .getIsInternational() == null) {
                isInternational = "FALSE";
            } else {
                isInternational = transaction.getResponse()
                                             .getIsInternational() ? "TRUE" : "FALSE";
            }

            responseCode = transaction.getResponse()
                                      .getCode();

            String responseDescription = transaction.getResponse()
                                                    .getDescription();

            if (responseDescription == null) {
                responseDescription = "";
            } else {
                responseDescription = responseDescription + " ";
            }

            responseCode = responseDescription + responseCode;

            response = transaction.getResponse()
                                  .getDescription();

            pinTransaction = convertBooleanToString(transaction.getResponse()
                                                               .getIsPin());

            duration = transaction.getResponse()
                                  .getDuration();
        }

        if (transaction.getFee() != null) {
            fee = this.getDisplayValue(transaction.getFee()
                                                  .getAmount());
            feePlanId = transaction.getFee()
                                   .getFeePlanId();
            feeId = transaction.getFee()
                               .getId();
            feeDescription = transaction.getFee()
                                        .getDescription();
        }

        if (transaction.getTransactionDate() != null) {
            originalTransactionDate = transaction.getTransactionDate()
                                                 .getDisplayValue();
            originalTransactionId = transaction.getId();

            if (transaction.getNodes() != null && transaction.getNodes()
                                                             .getTerminal() != null) {
                originalTerminalId = transaction.getNodes()
                                                .getTerminal()
                                                .getId();
            }
        }

        if (transaction.getSettlement() != null) {
            EnhancedSettlement settlement = transaction.getSettlement();

            if (settlement.getSettlementDate() != null) {
                settlementDate = settlement.getSettlementDate()
                                           .getDisplayValue();
            }
            authenticationType = settlement.getAuthenticationType();
            settlementPreAuthKey = settlement.getPreAuthKey();

            if (settlement.getX95() != null) {
                settlementx95Code = settlement.getX95()
                                              .getCode();
                settlementx95Description = settlement.getX95()
                                                     .getDescription();
                settlementx95Type = settlement.getX95()
                                              .getType();
                settlementX95OriginalType = settlement.getX95()
                                                      .getOriginalType();
            }

            if (StringUtils.isNotBlank(settlement.getExpirationDate())) {
                settlementExpirationDate = settlement.getExpirationDate();
            }

            if (settlement.getSic() != null) {
                settlementSicCode = settlement.getSic()
                                              .getCode();
                settlementSicCodeDescription = settlement.getSic()
                                                         .getDescription();
            }

            settlmentIncrementalIndicator = settlement.getIncrementalIndicator()
                                                      .toString();
            settlmenetCompletionCount = settlement.getCompletionCount();
            settlementLastCompletionCount = settlement.getLastCompletionIndicator()
                                                      .toString();
            settlementNetworkDescription = settlement.getNetworkDescription();
            settlementAuthenticationType = settlement.getAuthenticationType();

            if (settlement.getPreAuthReleaseDate() != null) {
                settlementPreAuthReleaseDate = settlement.getPreAuthReleaseDate()
                                                         .getDisplayValue();
            }

            if (settlement.getNetworkSettlementDate() != null) {
                settlementNetworkSettlementDate = settlement.getPreAuthReleaseDate()
                                                            .getDisplayValue();
            }

            if (settlement.getAddressVerification() != null) {
                EnhancedAddressVerification verification = settlement.getAddressVerification();
                settlementAddressVerificationSuccess = convertBooleanToString(verification.getAvsIndicator());
                settlementAddressVerificationResponse = verification.getResponseDescription() + " (" + verification.getResponseCode() + ")";
                settlementAddressVerificationPostalcode = verification.getPostalCode();
            }
        }

        description = transaction.getDescription();

        if (transaction.getOpCode() != null) {
            opCode = String.format("%s - (%s) - (%s)", transaction.getOpCode()
                                                                  .getCode(), transaction.getOpCode()
                                                                                         .getDescription(), transaction.getOpCode()
                                                                                                                       .getFlag());
            opCodeFlag = transaction.getOpCode()
                                    .getFlag();
            opCodeText = transaction.getOpCode()
                                    .getDescription();

        }

        chargeBackRightsIndicator = transaction.getChargeBackRightsIndicator()
                                               .toString();
        comment = transaction.getComment();
        institution = transaction.getInstitution();
        manualNotes = transaction.getManualNotes();
        manualReason = transaction.getManualReason();
        source = transaction.getSource();

        if (transaction.getTransactionDate() != null) {
            transactionDate = transaction.getTransactionDate()
                                         .getDisplayValue();
        }

        isBillable = convertBooleanToString(transaction.getFlags()
                                                       .getIsBillable());
        isDigitalProduct = convertBooleanToString(transaction.getFlags()
                                                             .getIsDigitalProduct());
        isDisputable = convertBooleanToString(transaction.getFlags()
                                                         .getIsDigitalProduct());
        inDispute = convertBooleanToString(transaction.getFlags()
                                                      .getIsInDispute());
        isPartial = convertBooleanToString(transaction.getFlags()
                                                      .getIsPartial());
        isPending = convertBooleanToString(transaction.getFlags()
                                                      .getIsPending());
        isReversalTransaction = convertBooleanToString(transaction.getFlags()
                                                                  .getIsReversalTransaction());

        if (transaction.getDevice() != null) {
            device = transaction.getDevice()
                                .getDescription();
        }
    }

    private String convertBooleanToString(Boolean b) {
        if (b != null) {
            return b ? "TRUE" : "FALSE";
        } else {
            return "FALSE";
        }
    }

    @Override
    public List<String> buildHeader() {
        List<String> fields = new ArrayList<>();

        fields.add("customerId");
        fields.add("firstName");
        fields.add("lastName");
        fields.add("transactionId");
        fields.add("platform");
        fields.add("cardNumber");
        fields.add("date");
        fields.add("sourceDescription");
        fields.add("entity");
        fields.add("mappedRequest");
        fields.add("mappedResponse");
        fields.add("amount");
        fields.add("fee");
        fields.add("holds");
        fields.add("balance");
        fields.add("availableBalance");
        fields.add("location");
        fields.add("addressLine1");
        fields.add("addressLine2");
        fields.add("city");
        fields.add("postalCode");
        fields.add("currencyCode");
        fields.add("isInternational");
        fields.add("creditDebit");
        fields.add("originalTransactionDate");
        fields.add("originalTransactionId");
        fields.add("originalTerminalId");
        fields.add("requestCode");
        fields.add("responseCode");
        fields.add("mccCode");
        fields.add("settlementDate");
        fields.add("authenticationType");
        fields.add("description");
        fields.add("opCode");
        fields.add("request");
        fields.add("response");
        fields.add("chargeBackRightsIndicator");
        fields.add("comment");
        fields.add("institution");
        fields.add("manualNotes");
        fields.add("manualReason");
        fields.add("opCodeFlag");
        fields.add("opCodeText");
        fields.add("source");
        fields.add("transactionDate");
        fields.add("isBillable");
        fields.add("isDigitalProduct");
        fields.add("isDisputable");
        fields.add("inDispute");
        fields.add("isPartial");
        fields.add("isPending");
        fields.add("isReversalTransaction");
        fields.add("serialNumber");
        fields.add("accountNumber");
        fields.add("can");
        fields.add("pin");
        fields.add("van");
        fields.add("requestedAmount");
        fields.add("fxSurchargeAmount");
        fields.add("reversalAmount");
        fields.add("cashBackAmount");
        fields.add("interchangeFee");
        fields.add("merchantFloorLimit");
        fields.add("preauthBalance");
        fields.add("device");
        fields.add("feePlanId");
        fields.add("feeId");
        fields.add("feeDescription");
        fields.add("entryMode");
        fields.add("userCode");
        fields.add("posEntryMode");
        fields.add("requestReason");
        fields.add("submissionIndicator");
        fields.add("requestType");
        fields.add("requestUsername");
        fields.add("pinTransaction");
        fields.add("duration");
        fields.add("settlementPreAuthKey");
        fields.add("settlementx95Code");
        fields.add("settlementx95Description");
        fields.add("settlementx95Type");
        fields.add("settlementExpirationDate");
        fields.add("settlementSicCode");
        fields.add("settlementSicCodeDescription");
        fields.add("settlementX95OriginalType");
        fields.add("settlementIncrementalIndicator");
        fields.add("settlementCompletionCount");
        fields.add("settlementLastCompletionCount");
        fields.add("settlementNetworkDescription");
        fields.add("settlementAuthenticationType");
        fields.add("settlementPreAuthReleaseDate");
        fields.add("settlementNetworkSettlementDate");
        fields.add("settlementAddressVerificationPostalcode");
        fields.add("settlementAddressVerificationSuccess");
        fields.add("settlementAddressVerificationResponse");

        return fields;
    }

    @Override
    public List<String> buildRecord() {
        List<String> fields = new ArrayList<>();

        fields.add(customer.getId());
        fields.add(customer.getFirstName());
        fields.add(customer.getLastName());
        fields.add(transactionId);
        fields.add("VMS");
        fields.add(cardNumber);
        fields.add(date);
        fields.add(sourceDescription);
        fields.add(node);
        fields.add(requestValue);
        fields.add(responseValue);
        fields.add(authorizedAmount);
        fields.add(fee);
        fields.add(pendingAmount);
        fields.add(balance);
        fields.add(availableBalance);
        fields.add(location);
        fields.add(addressLine1);
        fields.add(addressLine2);
        fields.add(city);
        fields.add(postalCode);
        fields.add(currencyCode);
        fields.add(isInternational);
        fields.add(creditDebit);
        fields.add(originalTransactionDate);
        fields.add(originalTransactionId);
        fields.add(originalTerminalId);
        fields.add(requestCode);
        fields.add(responseCode);
        fields.add(mccCode);
        fields.add(settlementDate);
        fields.add(authenticationType);
        fields.add(description);
        fields.add(opCode);
        fields.add(request);
        fields.add(response);
        fields.add(chargeBackRightsIndicator);
        fields.add(comment);
        fields.add(institution);
        fields.add(manualNotes);
        fields.add(manualReason);
        fields.add(opCodeFlag);
        fields.add(opCodeText);
        fields.add(source);
        fields.add(transactionDate);
        fields.add(isBillable);
        fields.add(isDigitalProduct);
        fields.add(isDisputable);
        fields.add(inDispute);
        fields.add(isPartial);
        fields.add(isPending);
        fields.add(isReversalTransaction);
        fields.add(serialNumber);
        fields.add(accountNumber);
        fields.add(can);
        fields.add(pin);
        fields.add(van);
        fields.add(requestedAmount);
        fields.add(fxSurchargeAmount);
        fields.add(reversalAmount);
        fields.add(cashBackAmount);
        fields.add(interchangeFee);
        fields.add(merchantFloorLimit);
        fields.add(preauthBalance);
        fields.add(device);
        fields.add(feePlanId);
        fields.add(feeId);
        fields.add(feeDescription);
        fields.add(entryMode);
        fields.add(userCode);
        fields.add(posEntryMode);
        fields.add(reason);
        fields.add(submissionIndicator);
        fields.add(requestType);
        fields.add(username);
        fields.add(pinTransaction);
        fields.add(duration);
        fields.add(settlementPreAuthKey);
        fields.add(settlementx95Code);
        fields.add(settlementx95Description);
        fields.add(settlementx95Type);
        fields.add(settlementExpirationDate);
        fields.add(settlementSicCode);
        fields.add(settlementSicCodeDescription);
        fields.add(settlementX95OriginalType);
        fields.add(settlmentIncrementalIndicator);
        fields.add(settlmenetCompletionCount);
        fields.add(settlementLastCompletionCount);
        fields.add(settlementNetworkDescription);
        fields.add(settlementAuthenticationType);
        fields.add(settlementPreAuthReleaseDate);
        fields.add(settlementNetworkSettlementDate);
        fields.add(settlementAddressVerificationPostalcode);
        fields.add(settlementAddressVerificationSuccess);
        fields.add(settlementAddressVerificationResponse);

        return fields;
    }
}
