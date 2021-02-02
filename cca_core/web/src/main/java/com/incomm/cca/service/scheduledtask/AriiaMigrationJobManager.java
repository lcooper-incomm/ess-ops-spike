package com.incomm.cca.service.scheduledtask;

import com.incomm.cca.model.constant.JobType;
import com.incomm.cca.model.domain.User;
import com.incomm.cca.repository.UserRepository;
import com.incomm.cca.service.AriiaCoreUserService;
import com.incomm.cca.togglz.TogglzFeature;
import com.incomm.cscore.logging.CsCoreLogger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AriiaMigrationJobManager extends ClusterAwareJobManager {

    @Autowired
    private AriiaCoreUserService ariiaCoreUserService;
    @Autowired
    private UserRepository userRepository;

    @Override
    @Scheduled(cron = "0 0 * * * ?")
    //Every hour on the hour
    public void checkJobLockStatus() {
        waitExtraTimeIfNecessary();
        if (TogglzFeature.ARIIA_MIGRATION_JOB.isActive() && jobLockManager.isJobLockedByHost(JobType.ARIIA_MIGRATION)) {
            this.doMigration();
        }
    }

    private void doMigration() {
        List<User> users = userRepository.findAllByIsMigratedFalseOrderByIdDesc();
        int migrationCount = 0;

        for (User user : users) {
            if (migrate(user)) {
                migrationCount++;
            }
        }

        CsCoreLogger.info("Ariia Migration Complete")
                    .keyValue("total", users.size())
                    .keyValue("migrated", migrationCount)
                    .keyValue("failed", users.size() - migrationCount)
                    .build();
    }

    @Transactional
    protected boolean migrate(User user) {
        boolean result = ariiaCoreUserService.addOrUpdateOne(user) != null;
        if (result) {
            user.setIsMigrated(true);
            userRepository.saveAndFlush(user);
        }
        return result;
    }
}
