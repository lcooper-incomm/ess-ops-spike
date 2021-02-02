package com.incomm.cca.util.export.builders.table;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class TransactionHistoryTableData {

    public final static List<String[]> transactionHistoryData = new ArrayList<>(
            Arrays.asList(
                    new String[]{"Transaction ID", "id"},
                    new String[]{"Platform", "platform"},
                    new String[]{"Card Number", "identifiers.cardNumber"},
                    new String[]{"Date", "createDate"},
                    new String[]{"Requested Amount", "amounts.requestedAmount"},
                    new String[]{"Authorized Amount", "amounts.authorizedAmount"},
                    new String[]{"Pending Amount", "amounts.pendingAmount"},
                    new String[]{"Surcharge Amount", "amounts.fxSurchargeAmount"},
                    new String[]{"Balance", "amounts.balance"},
                    new String[]{"Available Balance", "amounts.availableBalance"},
                    new String[]{"description", "description"},
                    new String[]{"comment", "comment"},
                    new String[]{"opCode", "opCode"},
                    new String[]{"opCodeText", "opCodeText"},
                    new String[]{"opCodeFlag", "opCodeFlag"},
                    new String[]{"requestCode", "request.code"},
                    new String[]{"requestDescription", "request.description"},
                    new String[]{"responseCode", "response.code"},
                    new String[]{"responseDescription", "response.description"},
                    new String[]{"x95Code", "settlement.x95Code"},
                    new String[]{"x95Description", "settlement.x95CodeDescription"},
                    new String[]{"sicCode", "settlement.sicCode"},
                    new String[]{"sicDescription", "settlement.sicCodeDescription"},
                    new String[]{"expirationDate", "settlement.expirationDate"},
                    new String[]{"settlementDate", "settlement.settlementDate"},
                    new String[]{"isBillable", "alerts.isBillable"},
                    new String[]{"isPartial", "alerts.isPartial"},
                    new String[]{"isPending", "alerts.isPending"}
            )
    );
}
