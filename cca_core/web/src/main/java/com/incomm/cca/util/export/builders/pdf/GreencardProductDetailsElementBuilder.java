package com.incomm.cca.util.export.builders.pdf;

import com.incomm.cscore.client.apls.model.card.EnhancedCard;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

public class GreencardProductDetailsElementBuilder extends GenericComponentElementBuilder {

    private EnhancedCard card;

    public GreencardProductDetailsElementBuilder(EnhancedCard card) {
        this.card = card;
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
        Element detailsElement = document.createElement("div");
        detailsElement.setAttribute("class", "component-wrapper");

        detailsElement.appendChild(buildComponentHeader(document, "Product Details", null));

        Element contentElement = document.createElement("div");
        contentElement.setAttribute("class", "component-content-wrapper");

        Element columnOne = document.createElement("div");
        columnOne.setAttribute("class", "one-of-three content-column");

        Element columnOneTable = document.createElement("table");
        columnOneTable.setAttribute("class", "field-table");
        columnOneTable.appendChild(buildTableRow(document, "Acct # (PAN)", card.getIdentifiers()
                                                                               .getPan()));
        columnOneTable.appendChild(buildTableRow(document, "Serial #", card.getIdentifiers()
                                                                           .getSerialNumber()));
        columnOneTable.appendChild(buildTableRow(document, "VAN", card.getIdentifiers()
                                                                      .getVan()));
        columnOneTable.appendChild(buildTableRow(document, "PIN", card.getIdentifiers()
                                                                      .getPin()));
        columnOne.appendChild(columnOneTable);
        contentElement.appendChild(columnOne);

        Element columnTwo = document.createElement("div");
        columnTwo.setAttribute("class", "two-of-three content-column");

        Element columnTwoTable = document.createElement("table");
        columnTwoTable.setAttribute("class", "field-table");
        columnTwoTable.appendChild(buildTableRow(document, "Initial Value", card.getAmounts()
                                                                                .getInitialLoadAmount() != null ? card.getAmounts()
                                                                                                                      .getInitialLoadAmount()
                                                                                                                      .getDisplayValue() : null));

        String locationName = null;
        String merchantName = null;
        String pseudoHierarchy = "Not Available";
        if (card.getPurchaseLocation() != null) {
            locationName = card.getPurchaseLocation()
                               .getName();
            if (card.getPurchaseLocation()
                    .getHierarchy() != null && card.getPurchaseLocation()
                                                   .getHierarchy()
                                                   .getFirstMerchant() != null) {
                merchantName = card.getPurchaseLocation()
                                   .getHierarchy()
                                   .getFirstMerchant()
                                   .getName();
            }
            pseudoHierarchy = String.format("%s | %s", locationName, merchantName);
        }
        columnTwoTable.appendChild(buildTableRow(document, "Purchase Location", pseudoHierarchy));
        columnTwoTable.appendChild(buildTableRow(document, "DCMS ID", card.getIdentifiers()
                                                                          .getDcmsId()));
        columnTwoTable.appendChild(buildTableRow(document, "Product Type", card.getProductGroup()));
        columnTwo.appendChild(columnTwoTable);
        contentElement.appendChild(columnTwo);

        detailsElement.appendChild(contentElement);

        return detailsElement;
    }

    private Element buildTableRow(Document document, String header, String value) {
        Element row = document.createElement("tr");

        Element head = document.createElement("th");
        head.setAttribute("class", "text-muted");
        head.setTextContent(clean(header));

        Element cell = document.createElement("td");
        cell.setTextContent(clean(value));

        row.appendChild(head);
        row.appendChild(cell);

        return row;
    }
}
