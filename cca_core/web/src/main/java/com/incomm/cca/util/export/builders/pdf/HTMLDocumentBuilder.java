package com.incomm.cca.util.export.builders.pdf;

import com.incomm.cca.exception.ExportException;
import com.incomm.cca.util.export.enums.HTMLDocumentOption;
import com.incomm.cscore.logging.CsCoreLogger;
import org.apache.commons.text.StringEscapeUtils;
import org.springframework.http.HttpStatus;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.tidy.Tidy;

import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import java.io.IOException;
import java.io.Reader;
import java.io.StringReader;
import java.io.StringWriter;
import java.io.Writer;
import java.util.Set;

public class HTMLDocumentBuilder {

    private Set<HTMLDocumentOption> documentOptions;
    private Document document;
    private Element head;
    private Element body;

    public HTMLDocumentBuilder(Set<HTMLDocumentOption> documentOptions) {
        try {
            this.documentOptions = documentOptions;

            this.document = DocumentBuilderFactory.newInstance()
                                                  .newDocumentBuilder()
                                                  .newDocument();
            this.head = buildHeadElement();
            this.body = buildBodyElement();
        } catch (Exception e) {
            CsCoreLogger.error("Error building HTML element")
                        .exception(e)
                        .build();
            throw new ExportException(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    public HTMLDocumentBuilder appendElement(GenericElementBuilder elementBuilder) throws Exception {
        body.appendChild(elementBuilder.build(document));
        return this;
    }

    public HTMLDocumentBuilder build() {
        Element html = document.createElement("html");
        html.appendChild(head);
        html.appendChild(body);
        document.appendChild(html);
        return this;
    }

    private Element buildHeadElement() {
        Element element = document.createElement("head");

        Element style = document.createElement("style");
        style.setAttribute("type", "text/css");
        style.setAttribute("media", "print");
        style.setTextContent("" +
                "body {font-size:12px; color:#414042;} " +
                ".bold {font-weight:bold;} " +
                ".component-content-wrapper {padding-top:5px;} " +
                ".component-header-wrapper {position:relative; page-break-after:avoid;} " +
                ".component-wrapper {margin-top:5px; page-break-before:auto;} " +
                ".content-column {display:inline-block; vertical-align:top;} " +
                ".field-table td {padding-left:10px;} " +
                "#footer {position:running(footer); text-align:right;} " +
                ".grand-total td, .grand-total th {border-top:1px solid black;} " +
                "h1 {font-size:32px; font-weight:bold; margin:0 0 5px 0;} " +
                "h2 {position:relative; display:inline; background-color:white; font-size:26px; font-weight:bold; margin:0; padding-right:5px; z-index:2;} " +
                "h3 {font-size:14px; font-weight:bold; margin:0 0 2px 0; color:#414042;} " +
                "h4 {font-size:14px; font-weight:normal; margin:0;} " +
                "h5 {position:relative; font-style:italic; display:inline; background-color:white; font-size:14px; z-index:2; padding-right:5px; margin-left:-3px; padding-left:3px;} " +
                ".header {position:relative; width:100%;} " +
                ".header-content {display:inline-block; position:absolute; right:0; color:#c41230; padding-left:10px; text-align:right; width:74%;} " +
                ".hierarchy {margin-top:10px;} " +
                ".hierarchy td {padding-left:10px;} " +
                "hr {position:relative; top:23px; color:#c41230; z-index:1; border-top:1px solid #c41230;} " +
                "img {width:165px; height:76px;} " +
                ".inline {display:inline-block;} " +
                ".logo-wrapper {display:inline-block; margin-right:10px;} " +
                ".no-wrap {overflow:hidden; text-overflow:ellipsis; white-space:nowrap;} " +
                ".one-of-two {width:49%;} " +
                ".one-of-three {width:33%;} " +
                ".two-of-three {width:66%;} " +
                ".one-of-four {width:24%;} " +
                ".one-of-five {width:19%;} " +
                "#pagecount:before {content:counter(pages);} " +
                "#pagenumber:before {content:counter(page);} " +
                ".standard-table {width:100%; border-spacing:0; border-collapse:collapse; margin-top:2px; font-size:10px;} " +
                ".standard-table thead th {font-weight:bold; background-color:#D8D8D8;} " +
                ".standard-table tr:nth-child(even) {background-color:#E8E8E8;} " +
                ".standard-table td, .standard-table th {padding:2px 3px;} " +
                ".text-green {color:#3c763d;} " +
                ".text-muted {color:#aaa;} " +
                ".text-red {color:#c41230;} " +
                ".text-right {text-align:right;} " +
                "td, th {vertical-align:top;} " +
                ".timestamp {position:absolute; right:50px; bottom:0; font-size:8px;} " +
                "");
        element.appendChild(style);

        Element orientationStyle = document.createElement("style");
        orientationStyle.setAttribute("type", "text/css");
        String orientation = "portrait";
        if (documentOptions.contains(HTMLDocumentOption.LAYOUT_LANDSCAPE)) {
            orientation = "landscape";
        }
        orientationStyle.setTextContent("" +
                "@page {size:" + orientation + "; margin:0.5in; @bottom-right {content: element(footer);}} " +
                "");
        element.appendChild(orientationStyle);

        return element;
    }

    private Element buildBodyElement() {
        return document.createElement("body");
    }

    public String toHTMLString() throws IOException, TransformerException {
        //Transform Document to String
        Transformer transformer = TransformerFactory.newInstance()
                                                    .newTransformer();
        transformer.setOutputProperty(OutputKeys.ENCODING, "UTF-8");
        transformer.setOutputProperty(OutputKeys.INDENT, "yes");
        Writer out = new StringWriter();
        transformer.transform(new DOMSource(document), new StreamResult(out));
        String value = out.toString();

        //Now, clean up that String and turn the HTML into XHTML
        Tidy tidy = new Tidy();
        tidy.setXHTML(true);
        tidy.setMakeClean(true);
        tidy.setOutputEncoding("UTF-8");
        tidy.setQuiet(true);
        tidy.setTidyMark(false);
        tidy.setDropEmptyParas(false);
        tidy.setQuoteNbsp(false);

        Reader reader = new StringReader(value);
        Writer writer = new StringWriter();

        tidy.parse(reader, writer);

        reader.close();
        writer.close();

        //And, finally, write out our now clean XHTML and unescape the HTML characters again
        value = writer.toString();
        value = StringEscapeUtils.unescapeHtml4(value);

        return value;
    }

}
