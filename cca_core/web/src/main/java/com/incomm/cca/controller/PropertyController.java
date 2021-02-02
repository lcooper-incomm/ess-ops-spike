package com.incomm.cca.controller;

import com.incomm.cca.model.domain.Property;
import com.incomm.cca.model.view.SimplePropertyView;
import com.incomm.cca.model.view.response.GenericMessageView;
import com.incomm.cca.service.PropertyService;
import com.incomm.cscore.logging.CsCoreInformationLevel;
import com.incomm.cscore.logging.CsCoreLoggingLevel;
import com.incomm.cscore.logging.CsCoreMaskingLevel;
import com.incomm.cscore.logging.LoggingConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/rest/property")
public class PropertyController extends RestResponseHandler {

    @Autowired
    private PropertyService propertyService;

    @GetMapping
    public ResponseEntity getAll() {
        List<Property> properties = propertyService.findAll();
        return ok(properties.stream()
                            .map(SimplePropertyView::new)
                            .collect(Collectors.toList()));
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity update(
            @PathVariable("id") Long id,
            @RequestBody SimplePropertyView simplePropertyView) {
        Property property = propertyService.update(id, simplePropertyView);
        return ok(new SimplePropertyView(property));
    }

    @GetMapping(value = "/logging-level")
    public ResponseEntity getLoggingLevel() {
        return ok(new GenericMessageView(LoggingConfig.loggingLevel.toString()));
    }

    @PutMapping(value = "/logging-level/{level}")
    public ResponseEntity updateLoggingLevel(@PathVariable("level") CsCoreLoggingLevel level) {
        propertyService.updateLoggingLevel(level);
        return ok(new GenericMessageView(LoggingConfig.loggingLevel.toString()));
    }

    @GetMapping(value = "/logging-information-level")
    public ResponseEntity getLoggingInformationLevel() {
        return ok(new GenericMessageView(LoggingConfig.informationLevel.toString()));
    }

    @PutMapping(value = "/logging-information-level/{level}")
    public ResponseEntity updateLoggingLevel(@PathVariable("level") CsCoreInformationLevel level) {
        propertyService.updateLoggingInformationLevel(level);
        return ok(new GenericMessageView(LoggingConfig.informationLevel.toString()));
    }

    @GetMapping(value = "/logging-masking-level")
    public ResponseEntity getLoggingMaskingLevel() {
        return ok(new GenericMessageView(LoggingConfig.maskingLevel.toString()));
    }

    @PutMapping(value = "/logging-masking-level/{level}")
    public ResponseEntity updateLoggingMaskingLevel(@PathVariable("level") CsCoreMaskingLevel level) {
        propertyService.updateLoggingMaskingLevel(level);
        return ok(new GenericMessageView(LoggingConfig.maskingLevel.toString()));
    }
}
