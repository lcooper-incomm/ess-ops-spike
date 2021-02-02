package com.incomm.cca.util.export.builders.pdf;

import com.incomm.cscore.client.apls.model.card.EnhancedCard;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

public class GreencardProductHeaderElementBuilder extends GenericHeaderElementBuilder {

    private EnhancedCard card;

    public GreencardProductHeaderElementBuilder(EnhancedCard card) {
        this.card = card;
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
        header.appendChild(buildHeaderContentElement(document, "CCA Product Report", String.format("Acct #: %s", card.getIdentifiers()
                                                                                                                     .getPan()), card.getProductGroup()));

        return header;
    }
}
