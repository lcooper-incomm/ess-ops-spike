package com.incomm.cca.data;

import com.incomm.cca.model.domain.WrapUpCode;

/**
 * Created by Allen on 12/21/2016.
 */
public class WrapUpCodeBuilder {
	
	public static WrapUpCode ofSpecificName( String name ) {
		WrapUpCode wrapUpCode = new WrapUpCode();
		wrapUpCode.setI3Name( name );
		return wrapUpCode;
	}
}
