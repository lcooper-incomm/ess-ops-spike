package com.incomm.cca.service;

import com.incomm.cca.data.SessionRequestBuilder;
import com.incomm.cca.exception.UnsupportedI3ConnectionException;
import com.incomm.cca.model.domain.session.Session;
import com.incomm.cca.model.enums.I3ConnectType;
import com.incomm.cca.model.view.i3.I3CallRequestView;
import com.incomm.cca.model.view.i3.IVRCallDetailView;
import com.incomm.cca.service.encryption.EncryptionService;
import com.incomm.cca.service.session.I3SessionService;
import com.incomm.cscore.client.apls.constant.AplsPlatform;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

/**
 * Created by Allen on 1/19/2017.
 */
@RunWith( MockitoJUnitRunner.class )
public class I3SessionServiceTest {
	
	@Mock
	private SessionFactory sessionFactory;
	
	@InjectMocks
	private I3SessionService i3SessionService;

	@Mock
	private EncryptionService encryptionService;

	@Test
	public void newIVRSessionDelegatesToSessionFactory() {
		IVRCallDetailView request = SessionRequestBuilder.typicalIvrWithSerialNumber( AplsPlatform.INCOMM.toString() );
		when( sessionFactory.newIVRSession( request, "any-string" ) ).thenReturn( new Session() );
		i3SessionService.processIVRCallDetail( request, "any-string" );
		verify( sessionFactory, times( 1 ) ).newIVRSession( request, "any-string" );
	}
	
	@Test( expected = IllegalArgumentException.class )
	public void newIVRSessionWithNullRequestFailsValidation() {
		i3SessionService.processIVRCallDetail( null, "any-string" );
	}
	
	@Test( expected = IllegalArgumentException.class )
	public void newIVRSessionWithNoUidFailsValidation() {
		IVRCallDetailView requestWithoutUid = SessionRequestBuilder.ivrWithSerialNumber( AplsPlatform.INCOMM.toString() );
		i3SessionService.processIVRCallDetail( requestWithoutUid, "any-string" );
	}
	
	@Test
	public void newIVRSessionReturnsCompleteRequest() {
		IVRCallDetailView request = SessionRequestBuilder.typicalIvrWithSerialNumber( AplsPlatform.INCOMM.toString() );
		when( sessionFactory.newIVRSession( request, "any-string" ) ).thenReturn( new Session() );
		IVRCallDetailView response = i3SessionService.processIVRCallDetail( request, "any-string" );
		
		assertEquals( request.getPlatform(), response.getPlatform() );
		assertEquals( request.getAni(), response.getAni() );
		assertEquals( request.getUid(), response.getUid() );
		assertEquals( request.getDnis(), response.getDnis() );
	}
	
	@Test
	public void newIVRSessionReturnsSessionId() {
		Session session = new Session();
		session.setId( 1L );
		
		IVRCallDetailView request = SessionRequestBuilder.typicalIvrWithSerialNumber( AplsPlatform.INCOMM.toString() );
		when( sessionFactory.newIVRSession( request, "any-string" ) ).thenReturn( session );
		IVRCallDetailView response = i3SessionService.processIVRCallDetail( request, "any-string" );
		
		assertEquals( session.getId(), response.getSessionId() );
	}
	
	@Test( expected = IllegalArgumentException.class )
	public void connectI3CallWithNullRequestThrowsException() {
		i3SessionService.connectI3Call( null );
	}
	
	@Test( expected = IllegalArgumentException.class )
	public void connectI3CallWithNullAgentUserIdThrowsException() {
		I3CallRequestView request = SessionRequestBuilder.typicalI3( null );
		i3SessionService.connectI3Call( request );
	}
	
	@Test( expected = IllegalArgumentException.class )
	public void connectI3CallWithNullConnectTypeThrowsException() {
		I3CallRequestView request = SessionRequestBuilder.typicalI3( "username" );
		request.setConnectType( null );
		i3SessionService.connectI3Call( request );
	}
	
	@Test( expected = UnsupportedI3ConnectionException.class )
	public void connectI3CallWithConsultRequestConnectTypeThrowsException() {
		I3CallRequestView request = SessionRequestBuilder.typicalI3( "username" );
		request.setConnectType( I3ConnectType.CONSULT_REQUEST.toString() );
		i3SessionService.connectI3Call( request );
	}
}
