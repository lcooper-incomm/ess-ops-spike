package com.incomm.cca.util.export.builders.pdf;

import com.incomm.cscore.client.apls.model.node.EnhancedLocation;
import com.incomm.cscore.client.model.CsCoreAddress;
import com.incomm.cscore.client.model.constant.CsCoreAddressType;
import org.apache.commons.lang3.StringUtils;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

import java.util.ArrayList;
import java.util.List;

public class LocationHeaderElementBuilder extends GenericHeaderElementBuilder {

    private EnhancedLocation location;
    private String addressString;

    public LocationHeaderElementBuilder(EnhancedLocation location) {
        this.location = location;

        CsCoreAddress address = location.findAddressOfType(CsCoreAddressType.PHYSICAL);

        //Build address String
        List<String> addressParts = new ArrayList<>();

        if (address != null) {

            if (StringUtils.isNotBlank(address.getLine1())) {
                addressParts.add(address.getLine1());
            }
            if (StringUtils.isNotBlank(address.getLine2())) {
                addressParts.add(address.getLine2());
            }
            if (StringUtils.isNotBlank(address.getCity())) {
                addressParts.add(address.getCity());
            }
            if (StringUtils.isNotBlank(address.getState())) {
                //Add state and zip together as one part so they're not separated by a comma
                if (StringUtils.isNotBlank(address.getPostalCode())) {
                    addressParts.add(String.format("%s %s", address.getState(), address.getPostalCode()));
                } else {
                    addressParts.add(address.getPostalCode());
                }
            } else if (StringUtils.isNotBlank(address.getPostalCode())) {
                addressParts.add(address.getPostalCode());
            }
        }

        if (addressParts.isEmpty()) {
            addressString = "Not Available";
        } else {
            addressString = StringUtils.join(addressParts, ", ");
        }
    }

    /**
     * This should only be called by the HTMLDocumentBuilder, as it is the class that manages
     * the Document this Element will belong to. This method, once overridden, should simply
     * construct the Element, and should not attempt to append the Element to the Document.
     *
     * @param document to be used to create the Element from
     * @return The completed Element object, ready to be appended to the document later.
     */
    @Override
    public Element build(Document document) {
        Element header = document.createElement("div");
        header.setAttribute("class", "header");
        header.appendChild(buildLogoElement(document));
        header.appendChild(buildHeaderContentElement(document, "CCA Location Report", String.format("%s | %s", location.getName(), location.getHierarchy()
                                                                                                                                           .getFirstMerchant()
                                                                                                                                           .getName()), addressString));

        return header;
    }
}
