package com.incomm.cca.service;

import com.incomm.cca.data.QueueBuilder;
import com.incomm.cca.data.SessionBuilder;
import com.incomm.cca.data.SessionRequestBuilder;
import com.incomm.cca.data.UserBuilder;
import com.incomm.cca.model.constant.SelectionType;
import com.incomm.cca.model.constant.SessionClassType;
import com.incomm.cca.model.constant.SessionStatus;
import com.incomm.cca.model.constant.SessionTypeType;
import com.incomm.cca.model.domain.SessionQueue;
import com.incomm.cca.model.domain.User;
import com.incomm.cca.model.domain.session.Selection;
import com.incomm.cca.model.domain.session.Session;
import com.incomm.cca.model.domain.session.SessionComponent;
import com.incomm.cca.model.view.i3.I3CallRequestView;
import com.incomm.cca.model.view.i3.IVRCallDetailView;
import com.incomm.cca.model.view.session.NewSessionRequestView;
import com.incomm.cca.repository.SessionRepository;
import com.incomm.cca.service.session.CallComponentService;
import com.incomm.cca.service.session.SessionTypeService;
import com.incomm.cscore.client.apls.constant.AplsPlatform;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Matchers;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

@RunWith( MockitoJUnitRunner.class )
public class SessionFactoryTest {
	
	@Mock
	private SessionRepository sessionRepository;
	@Mock
	private QueueService queueService;
	@Mock
	private UserService userService;
	@Mock
	private SelectionService selectionService;
	@Mock
	private CallComponentService callComponentService;
	@Mock
	private PartnerService partnerService;
	@Mock
	private SessionTypeService sessionTypeService;
	
	@InjectMocks
	private SessionFactory sessionFactory;
	
	@Before
	public void init() {
		SessionComponent component = new SessionComponent();
		component.setName( "GENERAL_COMPONENT" );
		
		com.incomm.cca.model.domain.session.SessionType sessionType = new com.incomm.cca.model.domain.session.SessionType();
		sessionType.setName( "GENERAL" );
		sessionType.getComponents()
		           .add( component );
		
		when( sessionTypeService.findOneByName( Matchers.anyString() ) ).thenReturn( sessionType );
	}
	
	@Test( expected = IllegalArgumentException.class )
	public void nullRequestThrowsIllegalArgumentException() {
		sessionFactory.newSession( null );
	}
	
	@Test
	public void nullStatusDefaultsToActive() {
		NewSessionRequestView request = SessionRequestBuilder.ofSpecificStatus( null );
		Session session = sessionFactory.newSession( request );
		assertTrue( session.getStatus() == SessionStatus.ACTIVE );
	}
	
	@Test( expected = IllegalArgumentException.class )
	public void nullClassThrowsIllegalArgumentException() {
		NewSessionRequestView request = SessionRequestBuilder.ofSpecificClass( null );
		sessionFactory.newSession( request );
	}
	
	@Test( expected = IllegalArgumentException.class )
	public void nullTypeThrowsIllegalArgumentException() {
		NewSessionRequestView request = SessionRequestBuilder.ofSpecificType( null );
		sessionFactory.newSession( request );
	}
	
	@Test
	public void sessionCreatedWithRequestedStatus() {
		NewSessionRequestView activeRequest = SessionRequestBuilder.ofSpecificStatus( SessionStatus.ACTIVE );
		Session activeSession = sessionFactory.newSession( activeRequest );
		
		assertTrue( activeSession.getStatus() == activeRequest.getStatus() );
		
		NewSessionRequestView closedRequest = SessionRequestBuilder.ofSpecificStatus( SessionStatus.CLOSED );
		Session closedSession = sessionFactory.newSession( closedRequest );
		
		assertTrue( closedSession.getStatus() == closedRequest.getStatus() );
	}
	
	@Test
	public void sessionCreatedWithRequestedClass() {
		NewSessionRequestView generalRequest = SessionRequestBuilder.ofSpecificClass( SessionClassType.GENERAL );
		Session generalSession = sessionFactory.newSession( generalRequest );
		
		assertTrue( generalSession.getStatus() == generalRequest.getStatus() );
		
		NewSessionRequestView callCenterRequest = SessionRequestBuilder.ofSpecificClass( SessionClassType.CALL_CENTER );
		Session callCenterSession = sessionFactory.newSession( callCenterRequest );
		
		assertTrue( callCenterSession.getStatus() == callCenterRequest.getStatus() );
	}
	
	@Test
	public void sessionCreatedWithRequestedType() {
		NewSessionRequestView generalRequest = SessionRequestBuilder.ofSpecificType( SessionTypeType.GENERAL );
		Session generalSession = sessionFactory.newSession( generalRequest );
		
		assertTrue( generalSession.getStatus() == generalRequest.getStatus() );
		
		NewSessionRequestView callRequest = SessionRequestBuilder.ofSpecificType( SessionTypeType.CALL );
		Session callSession = sessionFactory.newSession( callRequest );
		
		assertTrue( callSession.getStatus() == callRequest.getStatus() );
	}
	
	@Test
	public void sessionCreatedWithCurrentUser() {
		NewSessionRequestView request = SessionRequestBuilder.defaultGeneral();
		
		User user = UserBuilder.ofUsername( "tester" );
		when( userService.currentPersistentUser() ).thenReturn( user );
		
		Session session = sessionFactory.newSession( request );
		
		assertNotNull( session.getUser() );
		assertTrue( session.getUser()
		                   .getUsername()
		                   .equals( user.getUsername() ) );
	}
	
	@Test
	public void generalSessionCreatedWithGeneralQueue() {
		NewSessionRequestView request = SessionRequestBuilder.defaultGeneral();
		
		SessionQueue queue = QueueBuilder.ofSystemNameSimple( "GENERAL" );
		when( queueService.findOneBySystemName( Matchers.anyString() ) ).thenReturn( queue );
		
		Session session = sessionFactory.newSession( request );
		
		assertNotNull( session.getQueue() );
		assertTrue( session.getQueue()
		                   .getSystemName()
		                   .equals( "GENERAL" ) );
	}
	
	@Test
	public void otherSessionCreatedWithNoQueue() {
		NewSessionRequestView request = SessionRequestBuilder.ofSpecificType( SessionTypeType.CALL );
		Session session = sessionFactory.newSession( request );
		
		assertTrue( session.getQueue() == null );
	}
	
	@Test
	public void sessionCreatedWithSimpleCategoryQueueAutoSelectsCategory() {
		NewSessionRequestView request = SessionRequestBuilder.defaultGeneral();
		SessionQueue simpleQueue = QueueBuilder.ofSystemNameSimple( "GENERAL" );
		when( queueService.findOneBySystemName( Matchers.anyString() ) ).thenReturn( simpleQueue );
		
		Session session = sessionFactory.newSession( request );
		
		assertNotNull( session.getWrapUpCodeCategory() );
	}
	
	@Test
	public void sessionCreatedWithComplexQueueNotAutoSelectsCategory() {
		NewSessionRequestView request = SessionRequestBuilder.defaultGeneral();
		SessionQueue complexQueue = QueueBuilder.ofSystemNameComplex( "GENERAL" );
		when( queueService.findOneBySystemName( Matchers.anyString() ) ).thenReturn( complexQueue );
		
		Session session = sessionFactory.newSession( request );
		
		assertTrue( session.getWrapUpCodeCategory() == null );
	}
	
	@Test
	public void sessionCreatedWithSimpleCategoryAutoSelectsCode() {
		NewSessionRequestView request = SessionRequestBuilder.defaultGeneral();
		SessionQueue simpleQueue = QueueBuilder.ofSystemNameSimple( "GENERAL" );
		when( queueService.findOneBySystemName( Matchers.anyString() ) ).thenReturn( simpleQueue );
		
		Session session = sessionFactory.newSession( request );
		
		assertNotNull( session.getWrapUpCode() );
	}
	
	@Test
	public void sessionCreatedWithComplexCategoryNotAutoSelectsCode() {
		NewSessionRequestView request = SessionRequestBuilder.defaultGeneral();
		SessionQueue complexQueue = QueueBuilder.ofSystemNameSimpleWithComplexCategory( "GENERAL" );
		when( queueService.findOneBySystemName( Matchers.anyString() ) ).thenReturn( complexQueue );
		
		Session session = sessionFactory.newSession( request );
		
		assertTrue( session.getWrapUpCode() == null );
	}
	
	@Test
	public void generalSessionCreatedWithNoCallDetail() {
		NewSessionRequestView request = SessionRequestBuilder.defaultGeneral();
		Session session = sessionFactory.newSession( request );

        assertTrue(session.getCallComponent() == null);
	}
	
	@Test
	public void callSessionCreatedWithCallDetail() {
		SessionComponent generalComponent = new SessionComponent();
		generalComponent.setName( "GENERAL_COMPONENT" );
		SessionComponent callComponent = new SessionComponent();
		callComponent.setName( "CALL_COMPONENT" );
		
		com.incomm.cca.model.domain.session.SessionType sessionType = new com.incomm.cca.model.domain.session.SessionType();
		sessionType.setName( "CALL" );
		sessionType.getComponents()
		           .add( generalComponent );
		sessionType.getComponents()
		           .add( callComponent );
		
		when( sessionTypeService.findOneByName( Matchers.anyString() ) ).thenReturn( sessionType );
		
		NewSessionRequestView request = SessionRequestBuilder.ofSpecificType( SessionTypeType.CALL );
		Session session = sessionFactory.newSession( request );

        assertNotNull(session.getCallComponent());
	}
	
	@Test( expected = IllegalArgumentException.class )
	public void nullIVRRequestThrowsIllegalArgumentException() {
		sessionFactory.newIVRSession( null, null );
	}
	
	@Test
	public void ivrSessionCreatedWithQueuedStatus() {
		IVRCallDetailView request = SessionRequestBuilder.ivrWithSerialNumber( AplsPlatform.INCOMM.toString() );
		Session session = sessionFactory.newIVRSession( request, null );
		
		assertTrue( session.getStatus() == SessionStatus.QUEUED );
	}
	
	@Test
	public void ivrSessionCreatedWithCallCenterClass() {
		IVRCallDetailView request = SessionRequestBuilder.ivrWithSerialNumber( AplsPlatform.INCOMM.toString() );
		Session session = sessionFactory.newIVRSession( request, null );
		
		assertTrue( session.getSessionClass() == SessionClassType.CALL_CENTER );
	}
	
	@Test
	public void ivrSessionCreatedWithCallType() {
		IVRCallDetailView request = SessionRequestBuilder.ivrWithSerialNumber( AplsPlatform.INCOMM.toString() );
		Session session = sessionFactory.newIVRSession( request, null );
		
		assertTrue( session.getSessionType() == SessionTypeType.CALL );
	}
	
	@Test
	public void ivrSessionCreatedWithIVRQueue() {
		IVRCallDetailView request = SessionRequestBuilder.ivrWithSerialNumber( AplsPlatform.INCOMM.toString() );
		SessionQueue queue = QueueBuilder.ofSystemNameSimple( "IVR" );
		when( queueService.findOneBySystemName( "IVR" ) ).thenReturn( queue );
		
		Session session = sessionFactory.newIVRSession( request, null );
		
		assertNotNull( session.getQueue() );
		assertTrue( session.getQueue()
		                   .getSystemName()
		                   .equals( "IVR" ) );
	}
	
	@Test
	public void ivrSessionCreatedWithCallDetail() {
		IVRCallDetailView request = SessionRequestBuilder.typicalIvrWithSerialNumber( AplsPlatform.INCOMM.toString() );
		sessionFactory.newIVRSession( request, null );
		verify( callComponentService, times( 1 ) ).newCallDetail( Matchers.any( Session.class ), Matchers.any( IVRCallDetailView.class ), Matchers.anyString() );
	}
	
	@Test
	public void i3TransferSessionCreatedWithSelectionsFromOriginatingSession() {
		Session originalSession = SessionBuilder.simpleIVRWithTypicalSelections();
		I3CallRequestView request = SessionRequestBuilder.typicalI3( "cca_admin" );
		Session transferSession = sessionFactory.newI3SessionFromTransfer( originalSession, request, null );
		
		assertEquals( originalSession.getSelections()
		                             .size(), transferSession.getSelections()
		                                                     .size() );
		
		int matchCount = 0;
		for( Selection originalSelection : originalSession.getSelections() ) {
			for( Selection transferSelection : transferSession.getSelections() ) {
				if( transferSelection.getType() == originalSelection.getType()
					&& transferSelection.getPlatform() == originalSelection.getPlatform()
					&& transferSelection.getIdentifiers()
					                    .containsAll( originalSelection.getIdentifiers() ) ) {
					matchCount++;
				}
			}
		}
		
		assertEquals( originalSession.getSelections()
		                             .size(), matchCount );
	}
	
	@Test
	public void i3TransferSessionCreatedWithCallDetail() {
		Session originalSession = SessionBuilder.simpleIVRWithTypicalSelections();
		I3CallRequestView request = SessionRequestBuilder.typicalI3( "cca_admin" );
		sessionFactory.newI3SessionFromTransfer( originalSession, request, null );
		verify( callComponentService, times( 1 ) ).newCallDetail( Matchers.any( Session.class ), Matchers.any( IVRCallDetailView.class ), Matchers.anyString() );
	}
	
	@Test( expected = IllegalArgumentException.class )
	public void connectingNullSessionThrowsIllegalArgumentException() {
		I3CallRequestView request = SessionRequestBuilder.typicalI3( "cca_admin" );
		sessionFactory.newI3SessionFromTransfer( null, request, null );
	}
	
	@Test( expected = IllegalArgumentException.class )
	public void connectingNullI3RequestThrowsIllegalArgumentException() {
		Session originalSession = SessionBuilder.simpleIVRWithTypicalSelections();
		sessionFactory.newI3SessionFromTransfer( originalSession, null, null );
	}
	
	@Test
	public void connectingI3SessionPopulatesSessionWithProvidedQueue() {
		SessionQueue queue = QueueBuilder.ofSystemNameSimple( "GENERAL" );
		Session session = SessionBuilder.simpleIVRWithTypicalSelections();
		I3CallRequestView request = SessionRequestBuilder.typicalI3( "cca_admin" );
		
		sessionFactory.completeI3Connection( session, queue, request );
		
		assertNotNull( session.getQueue() );
		assertEquals( queue.getSystemName(), session.getQueue()
		                                            .getSystemName() );
	}
	
	@Test
	public void connectingI3SessionWithSimpleQueueAutoSelectsCategory() {
		SessionQueue queue = QueueBuilder.ofSystemNameSimple( "GENERAL" );
		Session session = SessionBuilder.simpleIVRWithTypicalSelections();
		I3CallRequestView request = SessionRequestBuilder.typicalI3( "cca_admin" );
		
		sessionFactory.completeI3Connection( session, queue, request );
		
		assertNotNull( session.getWrapUpCodeCategory() );
	}
	
	@Test
	public void connectingI3SessionWithComplexQueueDoesNotAutoSelectCategory() {
		SessionQueue queue = QueueBuilder.ofSystemNameComplex( "GENERAL" );
		Session session = SessionBuilder.simpleIVRWithTypicalSelections();
		I3CallRequestView request = SessionRequestBuilder.typicalI3( "cca_admin" );
		
		sessionFactory.completeI3Connection( session, queue, request );
		
		assertNull( session.getWrapUpCodeCategory() );
	}
	
	@Test
	public void connectingI3SessionWithSimpleQueueAndSimpleCategoryAutoSelectsCode() {
		SessionQueue queue = QueueBuilder.ofSystemNameSimple( "GENERAL" );
		Session session = SessionBuilder.simpleIVRWithTypicalSelections();
		I3CallRequestView request = SessionRequestBuilder.typicalI3( "cca_admin" );
		
		sessionFactory.completeI3Connection( session, queue, request );
		
		assertNotNull( session.getWrapUpCode() );
	}
	
	@Test
	public void connectingI3SessionWithSimpleQueueAndComplexCategoryDoesNotAutoSelectCode() {
		SessionQueue queue = QueueBuilder.ofSystemNameSimpleWithComplexCategory( "GENERAL" );
		Session session = SessionBuilder.simpleIVRWithTypicalSelections();
		I3CallRequestView request = SessionRequestBuilder.typicalI3( "cca_admin" );
		
		sessionFactory.completeI3Connection( session, queue, request );
		
		assertNull( session.getWrapUpCode() );
	}
	
	@Test
	public void connectingI3SessionPopulatesCallDetailWithCallIdCallIdKey() {
		Session session = SessionBuilder.simpleIVRWithTypicalSelections();
		SessionQueue queue = QueueBuilder.ofSpecificType( SelectionType.CUSTOMER );
		I3CallRequestView request = SessionRequestBuilder.typicalI3( "cca_admin" );
		
		sessionFactory.completeI3Connection( session, queue, request );

        assertEquals(request.getCallId(), session.getCallComponent()
                                                 .getCallId() );
        assertEquals(request.getCallIdKey(), session.getCallComponent()
                                                    .getCallIdKey() );
	}
	
	@Test
	public void connectingI3SessionSetsConnectedDate() {
		Session session = SessionBuilder.simpleIVRWithTypicalSelections();
		SessionQueue queue = QueueBuilder.ofSpecificType( SelectionType.CUSTOMER );
		I3CallRequestView request = SessionRequestBuilder.typicalI3( "cca_admin" );
		
		sessionFactory.completeI3Connection( session, queue, request );

        assertNotNull(session.getCallComponent()
                             .getConnectedDate() );
	}
	
	@Test
	public void connectingI3SessionDoesNotSetOtherCriticalDates() {
		Session session = SessionBuilder.simpleIVRWithTypicalSelections();
		SessionQueue queue = QueueBuilder.ofSpecificType( SelectionType.CUSTOMER );
		I3CallRequestView request = SessionRequestBuilder.typicalI3( "cca_admin" );
		
		sessionFactory.completeI3Connection( session, queue, request );
		
		assertNull( session.getClosedDate() );
        assertNull(session.getCallComponent()
                          .getDisconnectedDate() );
	}
}
