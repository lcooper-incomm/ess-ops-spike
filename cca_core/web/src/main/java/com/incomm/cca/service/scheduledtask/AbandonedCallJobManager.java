package com.incomm.cca.service.scheduledtask;

import com.incomm.cca.model.constant.JobType;
import com.incomm.cca.togglz.TogglzFeature;
import com.incomm.cscore.logging.CsCoreLogger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
public class AbandonedCallJobManager extends ClusterAwareJobManager {

    @Autowired
    private NamedParameterJdbcTemplate jdbcTemplate;
    private static final String UPDATE_ABANDONED_SESSIONS = "" +
            "UPDATE cca_session " +
            "SET status = 'ABANDONED' " +
            "WHERE user_id IS NULL " +
            "AND status = 'QUEUED' " +
            "AND created_date < DATEADD(DAY, -1, GETDATE())";

    @Override
    @Scheduled(cron = "0 0 * * * ?") //Every hour on the hour
    public void checkJobLockStatus() {
        waitExtraTimeIfNecessary();
        if (TogglzFeature.ABANDONEDCALLJOB.isActive() && jobLockManager.isJobLockedByHost(JobType.ABANDONED_CALL)) {
            try {
                int rowsAffected = jdbcTemplate.update(UPDATE_ABANDONED_SESSIONS, new HashMap<>());
                CsCoreLogger.info("Successfully cleaned up abandoned IVR sessions")
                            .keyValue("count", rowsAffected)
                            .build();
            } catch (Exception e) {
                CsCoreLogger.error("Failed to clean up abandoned IVR sessions")
                            .exception(e)
                            .build();
            }
        }
    }
}
