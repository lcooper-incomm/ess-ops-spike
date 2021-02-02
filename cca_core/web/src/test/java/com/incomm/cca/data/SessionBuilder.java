package com.incomm.cca.data;

import com.incomm.cca.model.constant.IdentifierType;
import com.incomm.cca.model.constant.SelectionType;
import com.incomm.cca.model.domain.session.CallComponent;
import com.incomm.cca.model.domain.session.Session;
import com.incomm.cscore.client.apls.constant.AplsPlatform;

public class SessionBuilder {
	
	public static Session simpleIVRWithTypicalSelections() {
		Session session = new Session();
        session.setCallComponent(new CallComponent());
		session.getSelections()
		       .add( SelectionBuilder.simple( SelectionType.LOCATION, IdentifierType.ANI, "8005551234", AplsPlatform.INCOMM.toString() ) );
		session.getSelections()
			   .add(SelectionBuilder.simple(SelectionType.CARD, IdentifierType.SERIALNUMBER, "123456789", AplsPlatform.INCOMM.toString()));
		return session;
	}
}
