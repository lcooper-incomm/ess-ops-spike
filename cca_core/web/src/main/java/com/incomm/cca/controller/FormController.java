package com.incomm.cca.controller;

import com.incomm.cca.service.minion.MinionTaskService;
import com.incomm.cscore.client.job.model.response.task.TaskResponse;
import com.incomm.cscore.client.rest.response.Response;
import com.incomm.minion.model.scheduler.tasks.TaskSendableForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest/form")
public class FormController extends RestResponseHandler {

    @Autowired
    private MinionTaskService minionTaskService;

    @PostMapping
    public ResponseEntity sendForm(@RequestBody TaskSendableForm request) {
        Response<TaskResponse> response = minionTaskService.sendForm(request);
        return ok(response);
    }

}
