package com.incomm.cca.util.export.builders.pdf;

import com.incomm.cscore.client.apls.model.node.EnhancedTerminal;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

import java.util.List;

public class TerminalsElementBuilder extends GenericComponentElementBuilder {

    private List<EnhancedTerminal> terminals;

    public TerminalsElementBuilder(List<EnhancedTerminal> terminals) {
        this.terminals = terminals;
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
        Element terminalsElement = document.createElement("div");
        terminalsElement.setAttribute("class", "component-wrapper");

        terminalsElement.appendChild(buildComponentHeader(document, "Terminals", null));

        Element contentElement = document.createElement("div");
        contentElement.setAttribute("class", "component-content-wrapper");

        if (terminals != null) {
            for (EnhancedTerminal terminal : terminals) {
                Element terminalElement = document.createElement("div");
                terminalElement.setAttribute("class", "one-of-five inline");
                terminalElement.setTextContent(clean(terminal.getTerminalNumber()));
                contentElement.appendChild(terminalElement);
            }
        } else {
            Element noneFoundElement = document.createElement("div");
            noneFoundElement.setTextContent("No Terminals Found");
            contentElement.appendChild(noneFoundElement);
        }

        terminalsElement.appendChild(contentElement);

        return terminalsElement;
    }
}
