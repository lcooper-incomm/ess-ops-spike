package com.incomm.cca.service.scheduledtask;

import com.incomm.cca.data.DateBuilder;
import com.incomm.cca.model.constant.SessionStatus;
import com.incomm.cca.model.domain.session.SessionStatusHistory;
import com.incomm.cca.model.domain.session.SessionWithHistory;
import com.incomm.cca.repository.session.SessionWithHistoryRepository;
import com.incomm.cca.service.session.SessionStatusHistoryService;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.function.Function;

@RunWith(MockitoJUnitRunner.class)
public class StaleSessionServiceTest {

    @InjectMocks
    private StaleSessionService staleSessionService;

    @Mock
    private SessionStatusHistoryService historyService;
    @Mock
    private SessionWithHistoryRepository repository;

    private SessionWithHistory freshSession;
    private SessionWithHistory staleSession;
    private SessionWithHistory freshSessionWithHistories;
    private SessionWithHistory staleSessionWithHistories;

    Date since;

    @Before
    public void setup() {
        Date before = getOffsetDate(-18);
        since = getOffsetDate(-17);
        Date after = getOffsetDate(-16);

        staleSession = mockSession(before);
        freshSession = mockSession(after);

        staleSessionWithHistories = mockSession(after);
        addStatusHistory(staleSessionWithHistories, "Status 1", before);

        freshSessionWithHistories = mockSession(before);
        addStatusHistory(freshSessionWithHistories, "Status 1", before);
        addStatusHistory(freshSessionWithHistories, "Status 2", after);
    }

    @Test
    public void closeAllStaleSessionsEmptyPage() {
        Function<Pageable, Page<SessionWithHistory>> getPage = Mockito.mock(Function.class);
        Mockito.when(getPage.apply(Mockito.any()))
               .thenReturn(Page.empty());

        staleSessionService.closeAllStaleSessions(getPage, since);

        Mockito.verify(getPage, Mockito.times(1))
               .apply(Mockito.any(Pageable.class));
        Mockito.verify(getPage, Mockito.times(1))
               .apply(Mockito.eq(PageRequest.of(0, 100)));
    }

    @Test
    public void closeAllStaleSessionsNonEmptyPage() {
        Function<Pageable, Page<SessionWithHistory>> getPage = Mockito.mock(Function.class);
        Mockito.when(getPage.apply(Mockito.any()))
               .thenReturn(StaleSessionServiceTest.getNonEmptyPage());

        staleSessionService.closeAllStaleSessions(getPage, since);

        Mockito.verify(getPage, Mockito.times(1))
               .apply(Mockito.any(Pageable.class));
        Mockito.verify(getPage, Mockito.times(1))
               .apply(Mockito.eq(PageRequest.of(0, 100)));
    }

    @Test
    public void closeAllStaleSessionsMultiplePages() {
        Function<Pageable, Page<SessionWithHistory>> getPage = Mockito.mock(Function.class);
        Mockito.when(getPage.apply(Mockito.any()))
               .thenReturn(StaleSessionServiceTest.getMultiplePage(PageRequest.of(0, 100)));

        staleSessionService.closeAllStaleSessions(getPage, since);

        Mockito.verify(getPage, Mockito.times(2))
               .apply(Mockito.any(Pageable.class));
        Mockito.verify(getPage, Mockito.times(1))
               .apply(Mockito.eq(PageRequest.of(0, 100)));
        Mockito.verify(getPage, Mockito.times(1))
               .apply(Mockito.eq(PageRequest.of(1, 100)));
    }

    @Test
    public void closeAllStaleSessionsAllFresh() {
        Function<Pageable, Page<SessionWithHistory>> getPage = Mockito.mock(Function.class);
        Mockito.when(getPage.apply(Mockito.any()))
               .thenReturn(new PageImpl<>(Arrays.asList(freshSession, freshSessionWithHistories)));

        staleSessionService.closeAllStaleSessions(getPage, since);

        Mockito.verify(getPage, Mockito.times(1))
               .apply(Mockito.any(Pageable.class));
        Mockito.verify(getPage, Mockito.times(1))
               .apply(Mockito.eq(PageRequest.of(0, 100)));
        Mockito.verify(repository, Mockito.never())
               .saveAndFlush(Mockito.any());
        Mockito.verify(historyService, Mockito.never())
               .addOneBySystemUser(Mockito.any(), Mockito.any(), Mockito.any());
    }

    @Test
    public void closeAllStaleSessionsAllStale() {
        int fudgeFactor = 1; // milli-second
        Function<Pageable, Page<SessionWithHistory>> getPage = Mockito.mock(Function.class);
        Mockito.when(getPage.apply(Mockito.any()))
               .thenReturn(new PageImpl<>(Arrays.asList(staleSession, staleSessionWithHistories)));
        String oldStatus = staleSessionWithHistories.getStatus();

        // If it takes too long to test, an extra milli-second is added to make sure it passes
        Date currentDate = new Date(System.currentTimeMillis() - fudgeFactor);
        staleSessionService.closeAllStaleSessions(getPage, since);

        Mockito.verify(getPage, Mockito.times(1))
               .apply(Mockito.any(Pageable.class));
        Mockito.verify(getPage, Mockito.times(1))
               .apply(Mockito.eq(PageRequest.of(0, 100)));

        Mockito.verify(repository, Mockito.times(2))
               .saveAndFlush(Mockito.any());
        Mockito.verify(repository, Mockito.times(1))
               .saveAndFlush(staleSession);
        Mockito.verify(repository, Mockito.times(1))
               .saveAndFlush(staleSessionWithHistories);

        Mockito.verify(historyService, Mockito.times(2))
               .addOneBySystemUser(Mockito.any(), Mockito.any(), Mockito.any());
        Mockito.verify(historyService, Mockito.times(1))
               .addOneBySystemUser(staleSession.getId(), null, SessionStatus.FORCED_CLOSED);
        Mockito.verify(historyService, Mockito.times(1))
               .addOneBySystemUser(staleSessionWithHistories.getId(), oldStatus, SessionStatus.FORCED_CLOSED);

        Assert.assertEquals(SessionStatus.FORCED_CLOSED, staleSession.getStatus());
        Assert.assertTrue(currentDate.before(staleSession.getClosedDate()));
        Assert.assertEquals(SessionStatus.FORCED_CLOSED, staleSessionWithHistories.getStatus());
        Assert.assertTrue(currentDate.before(staleSessionWithHistories.getClosedDate()));

    }

    private static SessionWithHistory getSessionHistory() {
        SessionWithHistory sessionWithHistory = new SessionWithHistory();
        sessionWithHistory.setCreatedDate(DateBuilder.getTodaysDatePlusDays(-1));
        sessionWithHistory.setModifiedDate(new Date());
        return sessionWithHistory;
    }

    private static List<SessionWithHistory> getSessionWithHistoryList() {
        List<SessionWithHistory> list = new ArrayList<>();
        list.add(new SessionWithHistory());
        list.get(0)
            .setModifiedDate(new Date());
        list.add(getSessionHistory());
        return list;
    }

    private static Page<SessionWithHistory> getNonEmptyPage() {
        return new PageImpl<>(getSessionWithHistoryList());
    }

    private static Page<SessionWithHistory> getMultiplePage(Pageable pageable) {
        return new PageImpl<SessionWithHistory>(getSessionWithHistoryList(), pageable, 1) {
            private int currentPage = 0;

            @Override
            public boolean hasNext() {
                return currentPage == 0;
            }

            @Override
            public Pageable nextPageable() {
                currentPage++;
                return pageable.next();
            }
        };
    }

    private Date getOffsetDate(int numDays) {
        Calendar calendar = new GregorianCalendar();
        calendar.add(Calendar.DAY_OF_MONTH, numDays);
        return calendar.getTime();
    }

    private SessionWithHistory mockSession(Date modifiedDate) {
        SessionWithHistory session = new SessionWithHistory();
        session.setModifiedDate(modifiedDate);
        return session;
    }

    private void addStatusHistory(SessionWithHistory session, String status, Date date) {
        SessionStatusHistory history = new SessionStatusHistory();
        history.setFromStatus(session.getStatus());
        history.setToStatus(status);
        history.setCreatedDate(date);
        session.getStatusHistories()
               .add(history);
        session.setStatus(status);
    }
}
