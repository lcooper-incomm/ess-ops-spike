package com.incomm.cca.util.export.builders.pdf;

import com.incomm.cscore.client.apls.model.transaction.EnhancedTransaction;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

import java.util.Date;
import java.util.List;

public class ProductHistoryDetailsElementBuilder extends GenericComponentElementBuilder {

    private List<EnhancedTransaction> transactions;
    private Date startDate;
    private Date endDate;

    public ProductHistoryDetailsElementBuilder(List<EnhancedTransaction> transactions, Date startDate, Date endDate) {
        this.transactions = transactions;
        this.startDate = startDate;
        this.endDate = endDate;
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
    public Element build(Document document) {
        Element historyElement = document.createElement("div");
        historyElement.setAttribute("class", "component-wrapper");

        String dateRange = String.format("(Select transactions from %s to %s)", dateFormat.format(startDate), dateFormat.format(endDate));
        historyElement.appendChild(buildComponentHeader(document, "Transaction Details", dateRange));

        Element historyTable = document.createElement("table");
        historyTable.setAttribute("class", "standard-table");
        historyTable.appendChild(buildTableHeader(document));
        historyTable.appendChild(buildTableBody(document));

        historyElement.appendChild(historyTable);

        return historyElement;
    }

    private Element buildTableHeader(Document document) {
        Element header = document.createElement("thead");

        Element headerRow = document.createElement("tr");
        headerRow.appendChild(buildTableTh(document, String.format("Date&nbsp;(%s)", timeZoneFormat.format(new Date())), false));
        headerRow.appendChild(buildTableTh(document, "Txn #", false));
        headerRow.appendChild(buildTableTh(document, "Entity", false));
        headerRow.appendChild(buildTableTh(document, "Amount", true));

        header.appendChild(headerRow);

        return header;
    }

    private Element buildTableBody(Document document) {
        Element body = document.createElement("tbody");

        for (EnhancedTransaction transaction : transactions) {
            Element tableRow = document.createElement("tr");
            tableRow.appendChild(buildTableTd(document, transaction.getCreateDate() != null ? transaction.getCreateDate()
                                                                                                         .getDisplayValue() : null, false));
            tableRow.appendChild(buildTableTd(document, transaction.getId(), false));
            tableRow.appendChild(buildTableTd(document, transaction.getNodes()
                                                                   .getMostDescriptiveNode() != null ? transaction.getNodes()
                                                                                                                  .getMostDescriptiveNode()
                                                                                                                  .getName() : null, false));
            tableRow.appendChild(buildTableTd(document, transaction.getAmounts()
                                                                   .getAuthorizedAmount() != null ? transaction.getAmounts()
                                                                                                               .getAuthorizedAmount()
                                                                                                               .getDisplayValue() : null, true));
            body.appendChild(tableRow);
        }

        return body;
    }

    private Element buildTableTd(Document document, String value, boolean rightAligned) {
        Element td = document.createElement("td");
        if (rightAligned) {
            td.setAttribute("class", "text-right");
        }
        td.setTextContent(clean(value));
        return td;
    }

    private Element buildTableTh(Document document, String value, boolean rightAligned) {
        Element th = document.createElement("th");
        if (rightAligned) {
            th.setAttribute("class", "text-right");
        }
        th.setTextContent(value); //don't clean this, because WE are setting this value, so we'd better already have it clean!
        return th;
    }
}
