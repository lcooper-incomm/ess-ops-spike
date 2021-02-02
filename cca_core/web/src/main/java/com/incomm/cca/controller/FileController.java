package com.incomm.cca.controller;

import com.incomm.cca.model.constant.AuditActivityType;
import com.incomm.cca.model.domain.audit.AuditActivity;
import com.incomm.cca.model.enums.ManagedPermission;
import com.incomm.cca.model.view.response.GenericMessageView;
import com.incomm.cca.service.AuditService;
import com.incomm.cca.service.FileService;
import com.incomm.cca.service.SecurityService;
import com.incomm.cscore.logging.CsCoreLogger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/rest/file")
public class FileController extends RestResponseHandler {

    @Autowired
    private FileService fileService;
    @Autowired
    private AuditService auditService;
    @Autowired
    private SecurityService securityService;

    @PostMapping(value = "/cardNumberCsv", consumes = "multipart/form-data")
    public ResponseEntity parseCardNumbersFromCsv(@RequestParam("file") MultipartFile multipartFile) throws Exception {
        String cardNumbers = fileService.parseCardNumbersFromCsv(multipartFile.getInputStream());
        return ok(new GenericMessageView(cardNumbers));
    }

    @GetMapping(value = "/minion/{uuid}", produces = "application/octet-stream")
    public ResponseEntity downloadMinionFile(@PathVariable("uuid") String uuid, @RequestParam(value = "filename", required = true) String filename) {
        byte[] bytes = fileService.downloadMinionFile(uuid);
        String disposition = fileService.getContentDisposition(filename);
        return exportOk(bytes, disposition);
    }

    @GetMapping(value = "/minion/{uuid}/password", produces = "application/json")
    public ResponseEntity getloadMinionFilePassword(@PathVariable("uuid") String uuid) {

        AuditActivity auditActivity = auditService.createActivity(AuditActivityType.SHOW_FILE_PASSWORD);
        if (!securityService.hasPermission(ManagedPermission.SHOW_FILE_PASSWORD)) {
            CsCoreLogger.warn("Unauthorized attempt to reveal file's password.")
                        .keyValue("uuid", uuid)
                        .build();

            auditService.saveRecordAsFailure(auditActivity);

            return forbidden();
        }

        auditService.saveRecordAsSuccess(auditActivity);

        return ok(fileService.getMinionFilePassword(uuid));
    }
}
