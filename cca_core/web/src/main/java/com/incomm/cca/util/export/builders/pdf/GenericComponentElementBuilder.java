package com.incomm.cca.util.export.builders.pdf;

import org.apache.commons.lang3.StringUtils;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

public abstract class GenericComponentElementBuilder extends GenericElementBuilder {

    protected Element buildComponentHeader(Document document, String title, String subTitle) {
        Element headerElement = document.createElement("div");
        headerElement.setAttribute("class", "component-header-wrapper");

        Element hrElement = document.createElement("hr");
        headerElement.appendChild(hrElement);

        Element titleElement = document.createElement("h2");
        titleElement.setAttribute("class", "text-red");
        titleElement.setTextContent(clean(title));
        headerElement.appendChild(titleElement);

        if (StringUtils.isNotBlank(subTitle)) {
            Element subTitleElement = document.createElement("h5");
            subTitleElement.setTextContent(clean(subTitle));
            headerElement.appendChild(subTitleElement);
        }

        return headerElement;
    }
}
