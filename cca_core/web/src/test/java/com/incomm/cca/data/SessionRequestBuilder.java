package com.incomm.cca.data;

import com.incomm.cca.model.constant.SessionClassType;
import com.incomm.cca.model.constant.SessionStatus;
import com.incomm.cca.model.constant.SessionTypeType;
import com.incomm.cca.model.view.i3.I3CallRequestView;
import com.incomm.cca.model.view.i3.IVRCallDetailView;
import com.incomm.cca.model.view.session.NewSessionRequestView;
import com.incomm.cscore.client.apls.constant.AplsPlatform;

/**
 * Created by Allen on 12/15/2016.
 */
public class SessionRequestBuilder {
	
	public static NewSessionRequestView ofSpecificStatus( String status ) {
		NewSessionRequestView request = new NewSessionRequestView();
		request.setStatus( status );
		request.setSessionClass( SessionClassType.GENERAL );
		request.setSessionType( SessionTypeType.GENERAL );
		return request;
	}
	
	public static NewSessionRequestView ofSpecificClass( String sessionClass ) {
		NewSessionRequestView request = new NewSessionRequestView();
		request.setStatus( SessionStatus.ACTIVE );
		request.setSessionClass( sessionClass );
		request.setSessionType( SessionTypeType.GENERAL );
		return request;
	}
	
	public static NewSessionRequestView ofSpecificType( String sessionType ) {
		NewSessionRequestView request = new NewSessionRequestView();
		request.setStatus( SessionStatus.ACTIVE );
		request.setSessionClass( SessionClassType.GENERAL );
		request.setSessionType( sessionType );
		return request;
	}
	
	public static NewSessionRequestView defaultGeneral() {
		NewSessionRequestView request = new NewSessionRequestView();
		request.setStatus( SessionStatus.ACTIVE );
		request.setSessionClass( SessionClassType.GENERAL );
		request.setSessionType( SessionTypeType.GENERAL );
		return request;
	}
	
	public static IVRCallDetailView ivrWithSerialNumber( String platform ) {
		IVRCallDetailView request = new IVRCallDetailView();
		request.setPlatform( platform );
		request.setSerialNumber( "123456789" );
		return request;
	}
	
	public static IVRCallDetailView ivrWithVan( String platform ) {
		IVRCallDetailView request = new IVRCallDetailView();
		request.setPlatform( platform );
		request.setVan16( "1234567890123456" );
		return request;
	}
	
	public static IVRCallDetailView ivrWithProxyNumber( String platform ) {
		IVRCallDetailView request = new IVRCallDetailView();
		request.setPlatform( platform );
		request.setProxyNumber( "123456789" );
		return request;
	}
	
	public static IVRCallDetailView ivrWithPin( String platform ) {
		IVRCallDetailView request = new IVRCallDetailView();
		request.setPlatform( platform );
		request.setPin( "123456789" );
		return request;
	}
	
	public static IVRCallDetailView ivrWithAni() {
		IVRCallDetailView request = new IVRCallDetailView();
		request.setPlatform( AplsPlatform.INCOMM.toString() );
		request.setAni( "8005551234" );
		return request;
	}
	
	public static IVRCallDetailView typicalIvrWithSerialNumber( String platform ) {
		IVRCallDetailView request = new IVRCallDetailView();
		request.setPlatform( platform );
		request.setAni( "8005551234" );
		request.setSerialNumber( "123456789" );
		request.setUid( "test-uid" );
		request.setDnis( "8001112222" );
		return request;
	}
	
	public static I3CallRequestView typicalI3( String username ) {
		I3CallRequestView request = new I3CallRequestView();
		request.setUid( "test-uid" );
		request.setDnis( "8001112222" );
		request.setAgentUserId( username );
		request.setCallId( "test-call-id" );
		request.setCallIdKey( "test-call-id-key" );
		request.setQueue( "CCA Queue" );
		request.setConnectType( "NORMAL" );
		return request;
	}
}
