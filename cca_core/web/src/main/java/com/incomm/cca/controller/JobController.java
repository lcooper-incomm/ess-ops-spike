package com.incomm.cca.controller;

import com.incomm.cca.service.BulkChangeStatusService;
import com.incomm.cca.service.MinionService;
import com.incomm.cscore.client.job.model.request.JobSearchRequest;
import com.incomm.cscore.client.job.model.response.PageResponse;
import com.incomm.cscore.client.job.model.response.job.Job;
import com.incomm.cscore.client.job.model.response.job.JobResponse;
import com.incomm.minion.model.scheduler.tasks.TaskDetailsEmail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest/job")
public class JobController extends RestResponseHandler {

    @Autowired
    private MinionService minionService;
    @Autowired
    private BulkChangeStatusService bulkChangeStatusService;

    @GetMapping()
    public ResponseEntity findAll(
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "pageSize", defaultValue = "50") Integer pageSize,
            @RequestParam(value = "username", required = false) String username
    ) {
        JobSearchRequest request = new JobSearchRequest();
        request.setUsername(username);

        PageResponse<Job> jobs = minionService.findAllJobs(request, page, pageSize);
        return ok(jobs);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity findOne(@PathVariable("id") Long id) {
        Job job = minionService.findOneJob(id);
        return ok(job);
    }

    @GetMapping(value = "/{id}/export", produces = "application/octet-stream")
    public ResponseEntity export(@PathVariable("id") Long id) {
        byte[] bytes = minionService.export(id);
        String disposition = minionService.getExportDisposition(id);
        return exportOk(bytes, disposition);
    }

    @PostMapping(value = "/change-status")
    public ResponseEntity bulkChangeStatus(
            @RequestParam("orderId") Long orderId,
            @RequestBody com.incomm.minion.model.scheduler.Job request
    ) {
        JobResponse response = this.bulkChangeStatusService.scheduleOne(request, orderId);
        return ok(response);
    }

    @PostMapping(value = "/email")
    public ResponseEntity email(@RequestBody TaskDetailsEmail request) {
        minionService.sendEmail(request);
        return ok();
    }
}
