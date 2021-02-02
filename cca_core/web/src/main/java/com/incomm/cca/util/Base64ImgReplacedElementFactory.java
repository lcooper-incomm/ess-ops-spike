package com.incomm.cca.util;

import com.lowagie.text.BadElementException;
import com.lowagie.text.Image;
import org.w3c.dom.Element;
import org.xhtmlrenderer.extend.FSImage;
import org.xhtmlrenderer.extend.ReplacedElement;
import org.xhtmlrenderer.extend.ReplacedElementFactory;
import org.xhtmlrenderer.extend.UserAgentCallback;
import org.xhtmlrenderer.layout.LayoutContext;
import org.xhtmlrenderer.pdf.ITextFSImage;
import org.xhtmlrenderer.pdf.ITextImageElement;
import org.xhtmlrenderer.render.BlockBox;
import org.xhtmlrenderer.simple.extend.FormSubmissionListener;
import sun.misc.BASE64Decoder;

import java.io.IOException;

/**
 * Plugin class in order to properly render a Base64 encoded representation of
 * an image found in an img tag's src attribute. During rendering, replaces the
 * given img tag with its properly rendered image.
 * <p>
 * Used in PDF export.
 *
 * @author asudweeks
 */
public class Base64ImgReplacedElementFactory implements ReplacedElementFactory {

    @Override
    public ReplacedElement createReplacedElement(LayoutContext layoutContext, BlockBox blockBox, UserAgentCallback uac, int cssWidth, int cssHeight) {
        Element element = blockBox.getElement();
        if (element == null) {
            return null;
        }
        String nodeName = element.getNodeName();
        if (nodeName.equals("img")) {
            String attribute = element.getAttribute("src");
            FSImage fsImage = null;
            try {
                fsImage = buildImage(attribute, uac);
            } catch (BadElementException | IOException e) {
                //Fail silently
            }
            if (fsImage != null) {
                if (cssWidth > 0 && cssHeight > 0) {
                    fsImage.scale(cssWidth, cssHeight);
                }
                return new ITextImageElement(fsImage);
            }
        }
        return null;
    }

    protected FSImage buildImage(String srcAttribute, UserAgentCallback uac) throws IOException, BadElementException {
        FSImage fsImage = null;
        if (srcAttribute.startsWith("data:image/")) {
            String base64 = srcAttribute.substring(srcAttribute.indexOf("base64,") + "base64,".length());
            byte[] decodedBytes = new BASE64Decoder().decodeBuffer(base64);
            fsImage = new ITextFSImage(Image.getInstance(decodedBytes));
        } else {
            fsImage = uac.getImageResource(srcAttribute)
                         .getImage();
        }
        return fsImage;
    }

    @Override
    public void reset() {
    }

    @Override
    public void remove(Element element) {
    }

    @Override
    public void setFormSubmissionListener(FormSubmissionListener fsl) {
    }

}
