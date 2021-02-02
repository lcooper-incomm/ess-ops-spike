package com.incomm.cca.controller.mapping;

import com.incomm.cca.controller.RestResponseHandler;
import com.incomm.cca.model.converter.MappingConverter;
import com.incomm.cca.model.domain.mapping.ActionReasonCodeMapping;
import com.incomm.cca.service.mapping.ActionReasonCodeMappingService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/rest/mapping")
public class MappingController extends RestResponseHandler {

    @Autowired
    private ActionReasonCodeMappingService actionReasonCodeMappingService;
    @Autowired
    private MappingConverter mappingConverter;

    @PostMapping("/action-reason-code")
    public ResponseEntity addOne(@RequestBody ActionReasonCodeMapping request) {
        ActionReasonCodeMapping updated = this.actionReasonCodeMappingService.addOne(request);
        return ok(this.mappingConverter.convertActionReasonCodeMapping(updated));
    }

    @DeleteMapping("/action-reason-code/{id}")
    public ResponseEntity deleteOne(@PathVariable("id") Long id) {
        this.actionReasonCodeMappingService.deleteOne(id);
        return noContent();
    }

    @GetMapping("/action-reason-code")
    public ResponseEntity findAll(@RequestParam("type") String type, @RequestParam("platform") String platform) {
        if ((StringUtils.isNotBlank(type) && StringUtils.isBlank(platform))
                || (StringUtils.isNotBlank(platform) && StringUtils.isBlank(type))) {
            throw new IllegalArgumentException("Both type and platform parameters must be provided if either are provided");
        }

        List<ActionReasonCodeMapping> mappings = null;
        if (StringUtils.isNotBlank(type)) {
            mappings = this.actionReasonCodeMappingService.findAllByTypeAndPlatform(type, platform);
        } else {
            mappings = this.actionReasonCodeMappingService.findAll();
        }

        return ok(this.mappingConverter.convertActionReasonCodeMappings(mappings));
    }

    @GetMapping("/action-reason-code/{id}")
    public ResponseEntity findOne(@PathVariable("id") Long id) {
        ActionReasonCodeMapping mapping = this.actionReasonCodeMappingService.findOne(id);
        if (mapping != null) {
            return ok(this.mappingConverter.convertActionReasonCodeMapping(mapping));
        } else {
            return noContent();
        }
    }

    @PutMapping("/action-reason-code/{id}")
    public ResponseEntity updateOne(@PathVariable("id") Long id, @RequestBody ActionReasonCodeMapping request) {
        ActionReasonCodeMapping updated = this.actionReasonCodeMappingService.updateOne(request);
        return ok(this.mappingConverter.convertActionReasonCodeMapping(updated));
    }
}
