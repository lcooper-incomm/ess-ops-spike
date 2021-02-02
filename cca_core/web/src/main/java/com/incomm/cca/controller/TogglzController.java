package com.incomm.cca.controller;

import com.incomm.cca.model.view.TogglzFeatureView;
import com.incomm.cca.service.TogglzService;
import com.incomm.cscore.logging.CsCoreLogger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/rest/togglz")
public class TogglzController extends RestResponseHandler {

    @Autowired
    private TogglzService togglzService;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity get() {
        Map<String, TogglzFeatureView> response = new HashMap<>();
        try {
            for (TogglzFeatureView feature : togglzService.getTogglzFeatures()) {
                response.put(feature.getName(), feature);
            }
        } catch (NoSuchFieldException e) {
            CsCoreLogger.error("Could not build togglz feature list")
                        .exception(e)
                        .build();
            return internalServerError();
        }
        return ok(response);
    }

    @PutMapping("/{feature}/{status}")
    public ResponseEntity put(@PathVariable("feature") String feature, @PathVariable("status") Boolean status) {
        togglzService.updateToggle(feature, status);
        return ok();
    }
}
