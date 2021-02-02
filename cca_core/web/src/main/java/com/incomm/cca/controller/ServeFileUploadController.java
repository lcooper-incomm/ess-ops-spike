package com.incomm.cca.controller;

import com.incomm.cca.service.ServeFileUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

@RestController
@RequestMapping("/rest/serve-file-upload")
public class ServeFileUploadController extends RestResponseHandler {

    @Autowired
    private ServeFileUploadService fileUploadService;

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity uploadFile(MultipartHttpServletRequest servletRequest, @RequestParam("accountId") String accountId, @RequestParam("fileType") String fileType, @RequestParam("requestCode") String requestCode, @RequestParam("description") String description) throws Exception {
        MultipartFile multipartFile = servletRequest.getMultiFileMap()
                                                    .getFirst("file");
        if (multipartFile == null) {
            throw new IllegalArgumentException("No file attachment found");
        }

        fileUploadService.sendFileToServe(accountId, fileType, requestCode, description, multipartFile.getInputStream(), multipartFile.getOriginalFilename(), multipartFile.getContentType());
        return noContent();
    }
}
