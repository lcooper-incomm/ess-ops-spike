package com.incomm.cca.util.export.builders.csv;

import com.incomm.cscore.client.apls.model.node.EnhancedLocation;
import com.incomm.cscore.client.apls.model.node.EnhancedMerchant;
import com.incomm.cscore.client.apls.model.transaction.EnhancedTransaction;

import java.util.ArrayList;
import java.util.List;

public class LocationHistoryCsvRecordBuilder extends CsvRecordBuilder {

    private String locationId;
    private String locationName;
    private String merchantId;
    private String merchantName;
    private TransactionHistoryCsvRecordBuilder transactionHistoryCsvRecordBuilder;

    public LocationHistoryCsvRecordBuilder(EnhancedLocation location, EnhancedTransaction transaction) {
        locationId = location.getId();
        locationName = location.getName();
        if (location.getHierarchy() != null) {
            EnhancedMerchant topLevelMerchant = location.getHierarchy()
                                                        .getHighestLevelMerchant();
            merchantId = topLevelMerchant.getId();
            merchantName = topLevelMerchant.getName();
        }
        transactionHistoryCsvRecordBuilder = new TransactionHistoryCsvRecordBuilder(transaction);
    }

    @Override
    public List<String> buildHeader() {
        List<String> fields = new ArrayList<>();
        fields.add("locationId");
        fields.add("locationName");
        fields.add("merchantId");
        fields.add("merchantName");
        fields.addAll(transactionHistoryCsvRecordBuilder.buildHeader());

        return fields;
    }

    @Override
    public List<String> buildRecord() {
        List<String> fields = new ArrayList<>();
        fields.add(locationId);
        fields.add(locationName);
        fields.add(merchantId);
        fields.add(merchantName);
        fields.addAll(transactionHistoryCsvRecordBuilder.buildRecord());

        return fields;
    }
}
