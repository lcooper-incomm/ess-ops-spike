package com.incomm.cca.util.export.builders.csv;

import com.incomm.cscore.client.apls.model.card.EnhancedCard;
import com.incomm.cscore.client.apls.model.shared.EnhancedCode;
import com.incomm.cscore.client.apls.model.shared.constant.CodeType;
import com.incomm.cscore.client.apls.model.transaction.EnhancedTransaction;

import java.util.ArrayList;
import java.util.List;

public class ProductHistoryCsvRecordBuilder extends CsvRecordBuilder {

    private String productDescription;
    private String productOwner;
    private String pan;
    private TransactionHistoryCsvRecordBuilder transactionHistoryCsvRecordBuilder;

    public ProductHistoryCsvRecordBuilder(EnhancedCard card, EnhancedTransaction transaction) {
        this.preProcess(card, transaction);
    }

    @Override
    public List<String> buildHeader() {
        List<String> fields = new ArrayList<>();
        fields.add("productDescription");
        fields.add("productOwner");
        fields.add("pan");
        fields.addAll(this.transactionHistoryCsvRecordBuilder.buildHeader());

        return fields;
    }

    @Override
    public List<String> buildRecord() {
        List<String> fields = new ArrayList<>();
        fields.add(productDescription);
        fields.add(productOwner);
        fields.add(pan);
        fields.addAll(this.transactionHistoryCsvRecordBuilder.buildRecord());

        return fields;
    }

    private void preProcess(EnhancedCard card, EnhancedTransaction transaction) {
        productDescription = card.getProductDescription();
        productOwner = card.getProductOwner();
        if (card.getIdentifiers() != null) {
            pan = card.getIdentifiers()
                      .getPan();
        }
        //Pass currency code on if the history record doesn't have it already
        if (transaction != null && card.getAmounts() != null) {
            EnhancedCode currencyCode = null;
            if (transaction.getCodes() != null) {
                currencyCode = transaction.findCodeByType(CodeType.CURRENCY);
            }
            if (currencyCode == null) {
                currencyCode = new EnhancedCode();
                currencyCode.setType(CodeType.CURRENCY);
                currencyCode.setCode(card.getAmounts()
                                         .getCurrencyCode() != null ? card.getAmounts()
                                                                          .getCurrencyCode()
                                                                          .getCode() : null);
                currencyCode.setDescription(card.getAmounts()
                                                .getCurrencyCode() != null ? card.getAmounts()
                                                                                 .getCurrencyCode()
                                                                                 .getDescription() : null);
                transaction.getCodes()
                           .add(currencyCode);
            }

        }
        this.transactionHistoryCsvRecordBuilder = new TransactionHistoryCsvRecordBuilder(transaction);
    }
}
