package com.incomm.cca.data;

import com.incomm.cca.model.domain.Identifier;
import com.incomm.cca.model.domain.session.Selection;

/**
 * Created by Allen on 12/22/2016.
 */
public class SelectionBuilder {
	
	public static Selection simple( String selectionType, String identifierType, String identifier, String platform ) {
		Selection selection = new Selection();
		selection.setType( selectionType );
		selection.setPlatform( platform );
		
		Identifier identifier1 = new Identifier();
		identifier1.setIdentifierType( identifierType );
		identifier1.setValue( identifier );
		
		selection.getIdentifiers()
		         .add( identifier1 );
		
		return selection;
	}
}
