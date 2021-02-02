package com.incomm.cca.util.export.builders.pdf;

import org.w3c.dom.Document;
import org.w3c.dom.Element;

import java.util.Date;

public class FooterElementBuilder extends GenericElementBuilder {

    private String username;

    public FooterElementBuilder(String username) {
        this.username = username;
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
        Element timestamp = document.createElement("div");
        timestamp.setAttribute("id", "footer");
        timestamp.setAttribute("class", "timestamp");

        Element timestampSpan = document.createElement("span");
        timestampSpan.setTextContent(clean(String.format("Exported by %s from Customer Care Application on %s  -  ", username, dateTimeFormat.format(new Date()))));
        timestamp.appendChild(timestampSpan);

        Element pageSpan = document.createElement("span");
        Element pageTextSpan = document.createElement("span");
        pageTextSpan.setTextContent("Page ");
        pageSpan.appendChild(pageTextSpan);
        Element pagenumberSpan = document.createElement("span");
        pagenumberSpan.setAttribute("id", "pagenumber");
        pageSpan.appendChild(pagenumberSpan);
        Element ofTextSpan = document.createElement("span");
        ofTextSpan.setTextContent(" of ");
        pageSpan.appendChild(ofTextSpan);
        Element pagecountSpan = document.createElement("span");
        pagecountSpan.setAttribute("id", "pagecount");
        pageSpan.appendChild(pagecountSpan);

        timestamp.appendChild(pageSpan);

        return timestamp;
    }
}
