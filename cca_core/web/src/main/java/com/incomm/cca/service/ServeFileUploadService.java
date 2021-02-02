package com.incomm.cca.service;

import com.google.common.hash.Hashing;
import com.incomm.apls.model.requests.SubmitDocumentRequest;
import com.incomm.cca.model.domain.ServeFileUpload;
import com.incomm.cca.repository.ServeFileUploadRepository;
import com.incomm.cca.service.maples.MaplesAccountService;
import com.incomm.cscore.logging.CsCoreLogger;
import com.incomm.cscore.client.maples.model.request.account.AccountDocumentUploadRequest;
import org.apache.commons.codec.binary.Base64InputStream;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.BufferedInputStream;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Service
public class ServeFileUploadService {

    @Autowired
    private ServeFileUploadRepository fileUploadRepository;

    @Autowired
    private MaplesAccountService accountService;

    @Transactional
    public void sendFileToServe(String accountId, String fileType, String requestCode, String description, InputStream inputStream, String filename, String contentType) throws Exception {
        try {
            AccountDocumentUploadRequest request = new AccountDocumentUploadRequest();

            String encodedBase64 = null;

            byte[] bytes = IOUtils.toByteArray(new BufferedInputStream(new Base64InputStream(inputStream, true)));
            encodedBase64 = new String(bytes, StandardCharsets.UTF_8);
            encodedBase64 = StringUtils.deleteWhitespace(encodedBase64);

            String hashCode = calculateHashCode(encodedBase64 + ", " + accountId);

            List<ServeFileUpload> list = fileUploadRepository.findByHashCode(Long.parseLong(accountId), hashCode);

            if (list.isEmpty()) {
                request.setDocument(encodedBase64);

                String fileName = cleanFilename(filename);
                request.setName(fileName);

                request.setCategory(description);
                request.setMimeType(contentType);
                request.setDescription(description);

                accountService.submitDocument(accountId, request);

                ServeFileUpload record = new ServeFileUpload();
                record.setAccountId(Long.parseLong(accountId));
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
