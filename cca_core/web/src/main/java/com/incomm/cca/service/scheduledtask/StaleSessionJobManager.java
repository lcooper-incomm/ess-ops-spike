package com.incomm.cca.service.scheduledtask;

import com.incomm.cca.model.constant.JobType;
import com.incomm.cca.model.constant.SessionClassType;
import com.incomm.cca.model.constant.SessionStatus;
import com.incomm.cca.model.domain.session.SessionWithHistory;
import com.incomm.cca.repository.session.SessionWithHistoryRepository;
import com.incomm.cca.togglz.TogglzFeature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.List;

@Service
public class StaleSessionJobManager extends ClusterAwareJobManager {

    @Autowired
    private StaleSessionService staleSessionService;
    @Autowired
    private SessionWithHistoryRepository repository;

    private static final String IGNORE_SESSION_CLASS = SessionClassType.CASE;
    private static final String[] STALE_SESSION_STATUS = {SessionStatus.ACTIVE, SessionStatus.WRAPPEDUP, SessionStatus.DISCONNECTED};

    @Override
    @Scheduled(cron = "0 0 2 * * ?") //Every day at 2am
    public void checkJobLockStatus() {
        waitExtraTimeIfNecessary();
        if (TogglzFeature.STALE_SESSION_JOB.isActive() && jobLockManager.isJobLockedByHost(JobType.STALE_SESSION_JOB)) {
            Calendar calendar = new GregorianCalendar();
            calendar.add(Calendar.DAY_OF_MONTH, -1);
            staleSessionService.closeAllStaleSessions(this::getPage, calendar.getTime());
        }
    }

    private Page<SessionWithHistory> getPage(Pageable pageable) {
        List<String> statuses = Arrays.asList(STALE_SESSION_STATUS);
        return this.repository.findAllBySessionClassNotAndStatusIn(IGNORE_SESSION_CLASS, statuses, pageable);
    }
}
