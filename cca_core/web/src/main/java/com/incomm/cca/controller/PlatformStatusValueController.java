package com.incomm.cca.controller;

import com.incomm.cca.service.PlatformStatusValueService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest/platform-status")
public class PlatformStatusValueController extends RestResponseHandler {

    @Autowired
    private PlatformStatusValueService platformStatusValueService;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity findAll(@RequestParam(value = "platform", required = false) String platform) {
        if (StringUtils.isBlank(platform)) {
            return ok(platformStatusValueService.findAll());
        } else {
            return ok(platformStatusValueService.findAllByPlatform(platform));
        }
    }
}
