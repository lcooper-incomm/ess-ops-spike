package com.incomm.cca.service;

import com.google.common.hash.Hashing;
import com.incomm.apls.model.requests.SubmitDocumentRequest;
import com.incomm.cca.model.domain.VmsFileUpload;
import com.incomm.cca.repository.VmsFileUploadRepository;
import com.incomm.cca.service.apls.AplsCustomerService;
import com.incomm.cscore.logging.CsCoreLogger;
import org.apache.commons.codec.binary.Base64InputStream;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.BufferedInputStream;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Service
public class VmsFileUploadService {

    @Autowired
    private VmsFileUploadRepository fileUploadRepository;
    @Autowired
    private AplsCustomerService customerService;

    @Transactional
    public void sendFileToVms(String customerId, String fileType, String requestCode, InputStream inputStream, String filename, String contentType) throws Exception {
        try {
            SubmitDocumentRequest request = new SubmitDocumentRequest();

            String encodedBase64 = null;

            byte[] bytes = IOUtils.toByteArray(new BufferedInputStream(new Base64InputStream(inputStream, true)));
            encodedBase64 = new String(bytes, StandardCharsets.UTF_8);

            String hashCode = calculateHashCode(encodedBase64 + ", " + customerId);

            List<VmsFileUpload> list = fileUploadRepository.findByHashCode(Long.parseLong(customerId), hashCode);

            if (list.isEmpty()) {
                request.setFile(encodedBase64);

                String fileName = cleanFilename(filename);
                request.setFileName(fileName);

                request.setRequestCode(requestCode);
                request.setFileMimeType(contentType);
                request.setFileType(fileType);

                customerService.submitDocument(customerId, request);

                VmsFileUpload record = new VmsFileUpload();
                record.setCustomerId(Long.parseLong(customerId));
                record.setHashCode(hashCode);
                fileUploadRepository.save(record);
            } else {
                CsCoreLogger.info("File already recently uploaded, ignoring")
                            .keyValue("filename", filename)
                            .build();
            }
        } catch (Exception e) {
            CsCoreLogger.error("Failed to upload file")
                        .keyValue("filename", filename)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    private String cleanFilename(String filename) {
        String name = filename.substring(0, filename.lastIndexOf('.'));
        String extension = filename.substring(filename.lastIndexOf('.'));

        if (name.length() > 25) {
            name = name.substring(0, 25);
        }

        name = name.replaceAll("[^a-zA-Z0-9]", "_");
        return name + extension;
    }

    private String calculateHashCode(String encodedBase64) {
        return Hashing.md5()
                      .hashString(encodedBase64, StandardCharsets.UTF_8)
                      .toString();
    }
}
