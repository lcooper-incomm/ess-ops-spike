package com.incomm.cca.util.export.builders.pdf;

import org.apache.commons.lang3.StringEscapeUtils;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

import java.text.SimpleDateFormat;

public abstract class GenericElementBuilder {

    protected final SimpleDateFormat dateFormat = new SimpleDateFormat("MMMM dd, yyyy");
    protected final SimpleDateFormat dateTimeFormat = new SimpleDateFormat("M/dd/yyyy h:mm a");
    protected final SimpleDateFormat timeZoneFormat = new SimpleDateFormat("zzz");

    /**
     * This should only be called by the HTMLDocumentBuilder, as it is the class that manages
     * the Document this Element will belong to. This method, once overridden, should simply
     * construct the Element, and should not attempt to append the Element to the Document.
     *
     * @param document to be used to create the Element from
     * @return The completed Element object, ready to be appended to the document later.
     * @throws Exception
     */
    public abstract Element build(Document document) throws Exception;

    /**
     * HTML escape all input data, which we will later unescape after the conversion to XHTML so
     * that it's rendered properly in the document.
     *
     * @param value
     * @return
     */
    protected String clean(String value) {
        return StringEscapeUtils.escapeHtml4(value);
    }
}
