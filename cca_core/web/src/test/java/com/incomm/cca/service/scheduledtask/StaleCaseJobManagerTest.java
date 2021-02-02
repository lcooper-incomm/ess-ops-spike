package com.incomm.cca.service.scheduledtask;

import com.incomm.cca.hazelcast.JobLockManager;
import com.incomm.cca.model.constant.JobType;
import com.incomm.cca.repository.session.SessionWithHistoryRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentMatcher;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;

import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.function.Function;

@RunWith(MockitoJUnitRunner.class)
public class StaleCaseJobManagerTest {

    @InjectMocks
    private StaleCaseJobManager staleCaseJobManager;

    @Mock
    private StaleSessionService staleSessionService;
    @Mock
    private JobLockManager jobLockManager;
    @Mock
    private SessionWithHistoryRepository repository;

    @Test
    public void checkJobLockStatus() {
        staleCaseJobManager.checkJobLockStatus();
        Mockito.verify(this.jobLockManager, Mockito.atLeastOnce())
               .isJobLockedByHost(JobType.STALE_CASE_JOB);
    }

    @Test
    public void checkJobLockStatusShouldCallStaleSessionService() {
        Mockito.when(jobLockManager.isJobLockedByHost(Mockito.any()))
               .thenReturn(true);

        staleCaseJobManager.checkJobLockStatus();

        Calendar calendar = new GregorianCalendar();
        calendar.add(Calendar.DAY_OF_MONTH, -30);
        Mockito.verify(staleSessionService, Mockito.times(1))
               .closeAllStaleSessions(Mockito.any(Function.class), Mockito.argThat(new ArgumentMatcher<Date>() {
                   @Override
                   public boolean matches(Object o) {
                       return o.toString()
                               .equals(calendar.getTime()
                                               .toString());
                   }
               }));
    }
}
