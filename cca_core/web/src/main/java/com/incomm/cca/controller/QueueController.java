package com.incomm.cca.controller;

import com.incomm.cca.model.constant.SessionClassType;
import com.incomm.cca.model.converter.QueueConverter;
import com.incomm.cca.model.converter.WrapUpCodeCategoryConverter;
import com.incomm.cca.model.domain.SessionQueue;
import com.incomm.cca.model.domain.WrapUpCodeCategory;
import com.incomm.cca.model.view.session.queue.SessionQueueView;
import com.incomm.cca.service.QueueService;
import com.incomm.cca.service.SecurityService;
import com.incomm.cca.service.WrapUpCodeCategoryService;
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
import java.util.stream.Collectors;

@RestController
@RequestMapping("/rest/queue")
public class QueueController extends RestResponseHandler {

    @Autowired
    private WrapUpCodeCategoryConverter categoryConverter;
    @Autowired
    private WrapUpCodeCategoryService categoryService;
    @Autowired
    private QueueConverter queueConverter;
    @Autowired
    private QueueService queueService;
    @Autowired
    private SecurityService securityService;

    @GetMapping("/refresh")
    public ResponseEntity refresh() {
        queueService.updateCache(true);
        return noContent();
    }

    @GetMapping("/type")
    public ResponseEntity findAllTypeOptions() {
        return ok(this.queueService.findAllTypeOptions());
    }

    @GetMapping
    public ResponseEntity getAllQueues(@RequestParam(value = "sessionType", required = false) String sessionType) {
        if (sessionType != null) {
            List<SessionQueueView> queues = queueService.findAllForSessionType(sessionType);
            List<String> caseTypes = SessionClassType.getSessionTypesForClass(SessionClassType.CASE);
            return ok(queues.stream()
                            .filter(queue -> caseTypes.contains(sessionType) || securityService.hasPermission(queue.getPermission()
                                                                                                                   .getSystemName()))
                            .collect(Collectors.toList()));
        } else {
            List<SessionQueue> queues = queueService.getAllQueues();
            return ok(queueConverter.convert(queues));
        }
    }

    @GetMapping("/{id}/category")
    public ResponseEntity findAll(@PathVariable("id") Long queueId) {
        List<WrapUpCodeCategory> domainModels = categoryService.findAllByQueueId(queueId);
        return ok(categoryConverter.convert(domainModels));
    }

    @GetMapping("/{id}")
    public ResponseEntity findOne(@PathVariable("id") Long id) {
        SessionQueue queue = queueService.findOneWithFetch(id);
        return ok(queueConverter.convert(queue));
    }

    @PostMapping
    public ResponseEntity newQueue(@RequestBody SessionQueueView queue) {
        SessionQueue updated = queueService.createQueue(queue);
        return ok(queueConverter.convert(updated));
    }

    @PutMapping("/{id}")
    public ResponseEntity updateQueue(@PathVariable("id") Long queueId, @RequestBody SessionQueueView queue) {
        SessionQueue updated = queueService.update(queue);
        return ok(queueConverter.convert(updated));
    }

    @PostMapping("/{id}/session-type/{sessionType}")
    public ResponseEntity addSessionType(@PathVariable("id") Long queueId, @PathVariable("sessionType") String sessionType) {
        this.queueService.addSessionType(queueId, sessionType);
        return this.findOne(queueId);
    }

    @DeleteMapping("/{id}/session-type/{sessionType}")
    public ResponseEntity removeSessionType(@PathVariable("id") Long queueId, @PathVariable("sessionType") String sessionType) {
        this.queueService.removeSessionType(queueId, sessionType);
        return this.findOne(queueId);
    }

    @PostMapping("/{queueId}/category/{categoryId}")
    public ResponseEntity addCategory(@PathVariable("queueId") Long queueId, @PathVariable("categoryId") Long categoryId) {
        this.queueService.addCategory(queueId, categoryId);
        return this.findOne(queueId);
    }

    @DeleteMapping("/{queueId}/category/{categoryId}")
    public ResponseEntity removeCategory(@PathVariable("queueId") Long queueId, @PathVariable("categoryId") Long categoryId) {
        this.queueService.removeCategory(queueId, categoryId);
        return this.findOne(queueId);
    }
}
