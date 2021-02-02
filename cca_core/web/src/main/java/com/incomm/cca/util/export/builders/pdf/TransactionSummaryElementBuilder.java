package com.incomm.cca.util.export.builders.pdf;

import com.incomm.cscore.client.apls.constant.AplsPlatform;
import com.incomm.cscore.client.apls.model.transaction.EnhancedTransaction;
import com.incomm.cscore.gringotts.GringottsExchange;
import org.apache.commons.lang3.StringUtils;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

public class TransactionSummaryElementBuilder extends GenericComponentElementBuilder {

    private List<EnhancedTransaction> transactions;

    public TransactionSummaryElementBuilder(List<EnhancedTransaction> transactions) {
        this.transactions = transactions;
    }

    /**
     * This should only be called by the HTMLDocumentBuilder, as it is the class that manages
     * the Document this Element will belong to. This method, once overridden, should simply
     * construct the Element, and should not attempt to append the Element to the Document.
     *
     * @param document to be used to create the Element from
     * @return The completed Element object, ready to be appended to the document later.
     * @throws Exception
     */
    @Override
    public Element build(Document document) throws Exception {
        Element summaryElement = document.createElement("div");
        summaryElement.setAttribute("class", "component-wrapper");

        summaryElement.appendChild(buildComponentHeader(document, "Transaction Summary", null));

        Element summaryTable = document.createElement("table");
        summaryTable.setAttribute("class", "standard-table");
        summaryTable.appendChild(buildTableHeader(document));
        summaryTable.appendChild(buildTableBody(document));

        summaryElement.appendChild(summaryTable);

        return summaryElement;
    }

    private Element buildTableHeader(Document document) throws Exception {
        Element header = document.createElement("thead");

        Element headerRow = document.createElement("tr");
        headerRow.appendChild(buildTableTh(document, "Transaction Request Type", false));
        headerRow.appendChild(buildTableTh(document, "Quantity", false));
        headerRow.appendChild(buildTableTh(document, "Amount", true));

        header.appendChild(headerRow);

        return header;
    }

    private Element buildTableBody(Document document) throws Exception {
        Element body = document.createElement("tbody");

        //Sort Transactions
        Map<String, List<EnhancedTransaction>> sortingMap = new TreeMap<>();
        for (EnhancedTransaction transaction : transactions) {
            String requestValue = null;

            //Based on platform and Togglz settings, figure out how we're categorizing the transactions
            if (transaction.getPlatform() == AplsPlatform.GREENCARD) {
                if (transaction.getRequest() != null && transaction.getRequest()
                                                                   .getDescriptor() != null && StringUtils.isNotBlank(transaction.getRequest()
                                                                                                                                 .getDescriptor()
                                                                                                                                 .getRequestValue())) {
                    requestValue = transaction.getRequest()
                                              .getDescriptor()
                                              .getRequestValue();
                } else if (transaction.getRequest() != null && StringUtils.isNotBlank(transaction.getRequest()
                                                                                                 .getDescription())) {
                    requestValue = transaction.getRequest()
                                              .getDescription();
                } else {
                    requestValue = transaction.getRequest()
                                              .getCode();
                }
            } else {
                if (transaction.getOpCode() != null && transaction.getOpCode()
                                                                  .getDescriptor() != null && StringUtils.isNotBlank(transaction.getOpCode()
                                                                                                                                .getDescriptor()
                                                                                                                                .getRequestValue())) {
                    requestValue = transaction.getOpCode()
                                              .getDescriptor()
                                              .getRequestValue();
                } else if (StringUtils.isNotBlank(transaction.getOpCode()
                                                             .getCode())) {
                    requestValue = transaction.getOpCode()
                                              .getCode();
                } else {
                    throw new Exception(String.format("Unable to categorize transaction for Transaction Summary element! %s", transaction));
                }
            }

            //Based on the requestValue, get or create the category list and add the transaction to it
            sortingMap.putIfAbsent(requestValue, new ArrayList<>());
            sortingMap.get(requestValue)
                      .add(transaction);
        }

        //For each category, total the transaction amounts and create a line item for the category
        BigDecimal grandTotal = BigDecimal.ZERO;
        for (Map.Entry<String, List<EnhancedTransaction>> entry : sortingMap.entrySet()) {
            List<EnhancedTransaction> categoryHistories = sortingMap.get(entry.getKey());

            BigDecimal total = BigDecimal.ZERO;
            for (EnhancedTransaction history : categoryHistories) {
                total = total.add(history.getAmounts()
                                         .getAuthorizedAmount()
                                         .getValue());
            }

            String formattedTotal = GringottsExchange.quickExchange(total)
                                                     .getDisplayValue();
            grandTotal = grandTotal.add(total);

            Element tableRow = document.createElement("tr");
            tableRow.appendChild(buildTableTd(document, entry.getKey(), false));
            tableRow.appendChild(buildTableTd(document, Integer.toString(categoryHistories.size()), false));
            tableRow.appendChild(buildTableTd(document, formattedTotal, true));
            body.appendChild(tableRow);
        }

        //Create line item for grand total
        Element grandTotalRow = document.createElement("tr");
        grandTotalRow.setAttribute("class", "bold grand-total");
        grandTotalRow.appendChild(buildTableTd(document, "Grand Total", false));
        grandTotalRow.appendChild(buildTableTd(document, Integer.toString(transactions.size()), false));
        grandTotalRow.appendChild(buildTableTd(document, GringottsExchange.quickExchange(grandTotal)
                                                                          .getDisplayValue(), true));
        body.appendChild(grandTotalRow);

        return body;
    }

    private Element buildTableTd(Document document, String value, boolean rightAligned) throws Exception {
        Element td = document.createElement("td");
        if (rightAligned) {
            td.setAttribute("class", "text-right");
        }
        td.setTextContent(clean(value));
        return td;
    }

    private Element buildTableTh(Document document, String value, boolean rightAligned) throws Exception {
        Element th = document.createElement("th");
        if (rightAligned) {
            th.setAttribute("class", "text-right");
        }
        th.setTextContent(value); //don't clean this, because WE are setting this value, so we'd better already have it clean!
        return th;
    }
}
