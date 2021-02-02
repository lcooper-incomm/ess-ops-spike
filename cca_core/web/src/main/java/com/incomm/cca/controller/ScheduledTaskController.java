package com.incomm.cca.controller;

import com.incomm.cca.model.enums.ManagedPermission;
import com.incomm.cca.service.SecurityService;
import com.incomm.cca.service.scheduledtask.AbandonedCallJobManager;
import com.incomm.cca.service.scheduledtask.AriiaMigrationJobManager;
import com.incomm.cca.service.scheduledtask.ClusterAwareJobManager;
import com.incomm.cca.service.scheduledtask.DeactivateIdleUsersJobManager;
import com.incomm.cca.service.scheduledtask.StaleCaseJobManager;
import com.incomm.cca.service.scheduledtask.StaleGiftCardDisputeJobManager;
import com.incomm.cca.service.scheduledtask.StaleSessionJobManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("/rest/task")
public class ScheduledTaskController extends RestResponseHandler {

    @Autowired
    private AbandonedCallJobManager abandonedCallJobManager;
    @Autowired
    private AriiaMigrationJobManager ariiaMigrationJobManager;
    @Autowired
    private DeactivateIdleUsersJobManager deactivateIdleUsersJobManager;
    @Autowired
    private StaleCaseJobManager staleCaseJobManager;
    @Autowired
    private StaleGiftCardDisputeJobManager staleGiftCardDisputeJobManager;
    @Autowired
    private StaleSessionJobManager staleSessionJobManager;
    @Autowired
    private SecurityService securityService;

    @PostMapping("rest/task/abandoned-call")
    public ResponseEntity abandonedCall() {
        return run(abandonedCallJobManager);
    }

    @PostMapping("rest/task/ariia-migration")
    public ResponseEntity ariiaMigration() {
        return run(ariiaMigrationJobManager);
    }

    @PostMapping("rest/task/deactivate-idle-users")
    public ResponseEntity deactivateIdleUsers() {
        return run(deactivateIdleUsersJobManager);
    }

    @PostMapping("rest/task/stale-case")
    public ResponseEntity staleCase() {
        return run(staleCaseJobManager);
    }

    @PostMapping("rest/task/stale-gift-card-dispute")
    public ResponseEntity staleGiftCardDispute() {
        return run(staleGiftCardDisputeJobManager);
    }

    @PostMapping("rest/task/stale-session")
    public ResponseEntity staleSession() {
        return run(staleSessionJobManager);
    }

    private ResponseEntity run(ClusterAwareJobManager jobManager) {
        if (!securityService.hasPermission(ManagedPermission.ADMIN_SCHEDULED_TASKS)) {
            return forbidden();
        } else {
            jobManager.checkJobLockStatus();
            return ok();
        }
    }
}
