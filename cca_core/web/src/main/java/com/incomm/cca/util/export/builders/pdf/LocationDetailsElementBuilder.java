package com.incomm.cca.util.export.builders.pdf;

import com.incomm.cscore.client.apls.model.node.EnhancedLocation;
import com.incomm.cscore.client.apls.model.node.EnhancedMerchant;
import com.incomm.cscore.client.model.constant.CsCorePhoneNumberType;
import org.apache.commons.lang3.StringUtils;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

import java.util.ArrayList;
import java.util.List;

public class LocationDetailsElementBuilder extends GenericComponentElementBuilder {

    private EnhancedLocation location;
    private List<String> merchants;

    public LocationDetailsElementBuilder(EnhancedLocation location) {
        this.location = location;

        this.merchants = new ArrayList<>();
        //Build list of merchants, which comes from APLS with the first entry being the direct parent merchant, and the last being the top level merchant
        for (EnhancedMerchant merchant : location.getHierarchy()
                                                 .getMerchants()) {
            merchants.add(merchant.getName());
        }
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
        Element detailsElement = document.createElement("div");
        detailsElement.setAttribute("class", "component-wrapper");

        detailsElement.appendChild(buildComponentHeader(document, "Location Details", null));

        Element contentElement = document.createElement("div");
        contentElement.setAttribute("class", "component-content-wrapper");

        Element columnOne = document.createElement("div");
        columnOne.setAttribute("class", "one-of-two content-column");

        Element columnOneTable = document.createElement("table");
        columnOneTable.setAttribute("class", "field-table");

        //Only show Merchant Group if there's more than one merchant
        if (merchants.size() > 1) {
            columnOneTable.appendChild(buildTableRow(document, "Merchant Group", merchants.get(merchants.size() - 1)));

        }
        columnOneTable.appendChild(buildTableRow(document, "Merchant", merchants.get(0)));

        //Location name needs to be bolded, so we need to build this row special
        Element locationRow = document.createElement("tr");

        Element locationHead = document.createElement("th");
        locationHead.setAttribute("class", "text-muted");
        locationHead.setTextContent(clean("Location"));

        Element locationCell = document.createElement("td");
        locationCell.setAttribute("class", "bold");
        locationCell.setTextContent(clean(location.getName()));

        locationRow.appendChild(locationHead);
        locationRow.appendChild(locationCell);
        columnOneTable.appendChild(locationRow);
        //End location row creation

        columnOne.appendChild(columnOneTable);
        contentElement.appendChild(columnOne);

        Element columnTwo = document.createElement("div");
        columnTwo.setAttribute("class", "one-of-two content-column");

        Element columnTwoTable = document.createElement("table");
        columnTwoTable.setAttribute("class", "field-table");
        columnTwoTable.appendChild(buildTableRow(document, "Contact", extractContactName(location)));
        columnTwoTable.appendChild(buildTableRow(document, "Phone", location.findPreferredPhone() != null ? location.findPreferredPhone()
                                                                                                                    .getNumber() : null));
        columnTwoTable.appendChild(buildTableRow(document, "Fax", location.findPhoneNumberOfType(CsCorePhoneNumberType.FAX) != null ? location.findPhoneNumberOfType(CsCorePhoneNumberType.FAX)
                                                                                                                                              .getNumber() : null));
        columnTwoTable.appendChild(buildTableRow(document, "Email", location.getEmailAddress()));
        columnTwo.appendChild(columnTwoTable);
        contentElement.appendChild(columnTwo);

        Element hierarchy = document.createElement("div");
        hierarchy.setAttribute("class", "hierarchy");
        Element hierarchyTable = document.createElement("table");
        String delimiter = " | ";
        String hierarchyString = String.format("%s%s%s", location.getName(), delimiter, StringUtils.join(merchants, delimiter));
        hierarchyTable.appendChild(buildTableRow(document, "Hierarchy", hierarchyString));
        hierarchy.appendChild(hierarchyTable);
        contentElement.appendChild(hierarchy);

        detailsElement.appendChild(contentElement);

        return detailsElement;
    }

    private String extractContactName(EnhancedLocation location) {
        String contactName = StringUtils.EMPTY;
        if (!location.getContacts()
                     .isEmpty()) {
            contactName = location.getContacts()
                                  .get(0)
                                  .getName();
        }
        return contactName;
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
