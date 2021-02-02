package com.incomm.cca.service.scheduledtask;

import com.incomm.cca.model.constant.JobType;
import com.incomm.cca.model.constant.SessionStatus;
import com.incomm.cca.model.constant.SessionTypeType;
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
public class StaleGiftCardDisputeJobManager extends ClusterAwareJobManager {

    @Autowired
    private StaleSessionService staleSessionService;
    @Autowired
    private SessionWithHistoryRepository repository;

    private static final String[] STALE_QUEUE_SYS_NAME = {"QUEUE_FRD_GIFTCARD_DISPUTE"};
    private static final String STALE_SESSION_TYPE = SessionTypeType.DISPUTE;
    private static final String[] STALE_SESSION_STATUS = {SessionStatus.ACTIVE, SessionStatus.AWAITING_DOCS};

    @Override
    @Scheduled(cron = "0 0 0 * * ?") //Every day at midnight
    public void checkJobLockStatus() {
        waitExtraTimeIfNecessary();
        if (TogglzFeature.STALE_GIFT_CARD_DISPUTE.isActive() && jobLockManager.isJobLockedByHost(JobType.STALE_GIFT_CARD_DISPUTE)) {
            Calendar calendar = new GregorianCalendar();
            calendar.add(Calendar.DAY_OF_MONTH, -30);
            staleSessionService.closeAllStaleSessions(this::getPage, calendar.getTime());
        }
    }

    private Page<SessionWithHistory> getPage(Pageable pageable) {
        List<String> statuses = Arrays.asList(STALE_SESSION_STATUS);
        List<String> queues = Arrays.asList(STALE_QUEUE_SYS_NAME);
        return this.repository.findAllBySessionTypeAndStatusAndQueue(STALE_SESSION_TYPE, statuses, queues, pageable);
    }
}
