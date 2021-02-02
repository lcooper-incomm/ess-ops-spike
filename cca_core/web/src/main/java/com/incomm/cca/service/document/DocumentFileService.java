package com.incomm.cca.service.document;

import com.documents4j.api.DocumentType;
import com.documents4j.api.IConverter;
import com.documents4j.job.LocalConverter;
import org.apache.commons.codec.binary.Base64;
import org.springframework.stereotype.Service;

import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;

@Service
public class DocumentFileService {

    /**
     * This expects the input to be a .docx or .dot in the form of base64 encoding.  The input is decoded, converted
     * in to a byte array input stream and passed through a Word to Pdf converter from documents4j.  The resulting
     * byte array output stream is then encoded in to a base64 string and returned.
     *
     * @param base64 The original file as Base64.
     * @return The PDF version as Base64.
     */
    public String convertBase64DocxToPdf(String base64) throws Exception {
        String base64Out = null;

        ByteArrayOutputStream bo = new ByteArrayOutputStream();
        InputStream in = new BufferedInputStream(new ByteArrayInputStream(Base64.decodeBase64(base64.getBytes())));
        IConverter converter = LocalConverter.builder()
                                             .workerPool(20, 25, 2, TimeUnit.SECONDS)
                                             .processTimeout(5, TimeUnit.SECONDS)
                                             .build();

        Future<Boolean> conversion = converter
                .convert(in)
                .as(DocumentType.MS_WORD)
                .to(bo)
                .as(DocumentType.PDF)
                .prioritizeWith(1000)
                .schedule();
        conversion.get();
        converter.shutDown();

        base64Out = new String(Base64.encodeBase64(bo.toByteArray()));

        in.close();
        bo.close();

        return base64Out;
    }

}
