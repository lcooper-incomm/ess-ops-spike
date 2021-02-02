package com.incomm.cca.controller;

import com.incomm.cca.service.VmsFileUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

@RestController
@RequestMapping("/rest/vms-file-upload")
public class VmsFileUploadController extends RestResponseHandler {

    @Autowired
    private VmsFileUploadService fileUploadService;

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity uploadFile(MultipartHttpServletRequest servletRequest, @RequestParam("customerId") String customerId, @RequestParam("fileType") String fileType, @RequestParam("requestCode") String requestCode) throws Exception {
        MultipartFile multipartFile = servletRequest.getMultiFileMap()
                                                    .getFirst("file");
        if (multipartFile == null) {
            throw new IllegalArgumentException("No file attachment found");
        }

        fileUploadService.sendFileToVms(customerId, fileType, requestCode, multipartFile.getInputStream(), multipartFile.getOriginalFilename(), multipartFile.getContentType());
        return noContent();
    }
}
