package com.incomm.cca.service;

import com.incomm.cca.model.constant.SessionStatus;
import com.incomm.cca.model.domain.User;
import com.incomm.cca.model.domain.session.UpdateSession;
import com.incomm.cca.repository.session.UpdateSessionRepository;
import com.incomm.cca.service.session.SessionStatusHistoryService;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Matchers;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;

import java.util.Date;
import java.util.Optional;

import static org.mockito.Mockito.when;

@RunWith( MockitoJUnitRunner.class )
public class SessionServiceTest {
	
	@Mock
	private UpdateSessionRepository updateSessionRepository;
	@Mock
	private UserService userService;
	@Mock
	private SessionStatusHistoryService sessionStatusHistoryService;
	
	@InjectMocks
	private SessionService sessionService;
	
	@Test
	public void updateOneShouldClearClosedDateIfStatusIsNotClosed() {
		UpdateSession existing = new UpdateSession();
		existing.setClosedDate( new Date() );
		
		UpdateSession request = new UpdateSession();
		request.setStatus( SessionStatus.ACTIVE );
		
		User user = new User();
		
		when( updateSessionRepository.findById( Matchers.anyLong() ) ).thenReturn( Optional.of( existing ) );
		when( userService.currentPersistentUser() ).thenReturn( user );
		
		UpdateSession updated = sessionService.updateOne( request );
		Mockito.verify( this.sessionStatusHistoryService, Mockito.times( 1 ) ).addOneByCurrentUser( Matchers.anyLong(), Matchers.anyString(), Matchers.anyString() );
		
		Assert.assertEquals( request.getStatus(), updated.getStatus() );
		Assert.assertNull( updated.getClosedDate() );
	}
}
