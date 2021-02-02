package com.incomm.cca.service.scheduledtask;

import com.incomm.cca.model.constant.SessionStatus;
import com.incomm.cca.model.domain.session.SessionStatusHistory;
import com.incomm.cca.model.domain.session.SessionWithHistory;
import com.incomm.cca.repository.session.SessionWithHistoryRepository;
import com.incomm.cca.service.session.SessionStatusHistoryService;
import com.incomm.cscore.logging.CsCoreLogger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collectors;

@Service
public class StaleSessionService {

    @Autowired
    private SessionWithHistoryRepository repository;
    @Autowired
    private SessionStatusHistoryService historyService;

    /**
     * Closes all sessions that have gone stale since the given date
     *
     * @param getPage a function to get a page of sessions
     * @param since   sessions are stale if their status has not changed since this date
     */
    public void closeAllStaleSessions(Function<Pageable, Page<SessionWithHistory>> getPage, Date since) {
        CsCoreLogger.info("Begin Stale Session Cleanup")
                    .build();

        Pageable pageable = PageRequest.of(0, 100);
        Page<SessionWithHistory> page = getPage.apply(pageable);

        CsCoreLogger.info(String.format("Found %s Candidate Sessions for Cleanup", page.getTotalElements()))
                    .build();

        if (page.getTotalElements() > 0) {
            this.closeStaleSessions(page, since);

            while (page.hasNext()) {
                page = getPage.apply(page.nextPageable());
                this.closeStaleSessions(page, since);
            }
        }

        CsCoreLogger.info("End Stale Session Cleanup")
                    .build();
    }

    private void closeStaleSessions(Page<SessionWithHistory> page, Date since) {
        CsCoreLogger.info("Begin processing batch of candidate stale sessions")
                    .keyValue("batchCount", page.getContent()
                                                .size())
                    .keyValue("totalCount", page.getTotalElements())
                    .build();

        List<SessionWithHistory> sessionsToClose = page.getContent()
                                                       .stream()
                                                       .filter(isStalePredicate(since))
                                                       .collect(Collectors.toList());
        sessionsToClose.forEach(this::forceCloseSession);
        int closeCount = sessionsToClose.size();

        CsCoreLogger.info("End processing batch of candidate stale sessions")
                    .keyValue("closedCount", closeCount)
                    .build();
    }

    private void forceCloseSession(SessionWithHistory candidateSession) {
        // First, close the session
        String fromStatus = candidateSession.getStatus();
        candidateSession.setClosedDate(new Date());
        candidateSession.setStatus(SessionStatus.FORCED_CLOSED);
        this.repository.saveAndFlush(candidateSession);

        // Then, insert a status history record
        this.historyService.addOneBySystemUser(candidateSession.getId(), fromStatus, SessionStatus.FORCED_CLOSED);
    }

    private static Date getLastStatusChangeDate(SessionWithHistory candidateSession) {
        // Get the date of the latest status change history record,
        // as long as it changed the session to its current status
        Optional<Date> statusChangeDate = candidateSession.getStatusHistories()
                                                          .stream()
                                                          .max(Comparator.comparing(SessionStatusHistory::getCreatedDate))
                                                          .filter(history -> history.getToStatus()
                                                                                    .equals(candidateSession.getStatus()))
                                                          .map(SessionStatusHistory::getCreatedDate);
        if (statusChangeDate.isPresent()) {
            return statusChangeDate.get();
        } else {
            // Fall back to modified date
            CsCoreLogger.warn("Last status history record for this session did not change it to its current status!")
                        .keyValue("sessionId", candidateSession.getId())
                        .build();
            return candidateSession.getModifiedDate();
        }
    }

    private static Predicate<SessionWithHistory> isStalePredicate(Date maxDate) {
        return (SessionWithHistory session) -> getLastStatusChangeDate(session).before(maxDate);
    }
}
