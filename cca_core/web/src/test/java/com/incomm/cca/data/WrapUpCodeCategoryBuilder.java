package com.incomm.cca.data;

import com.incomm.cca.model.domain.WrapUpCodeCategory;

/**
 * Created by Allen on 12/21/2016.
 */
public class WrapUpCodeCategoryBuilder {
	
	/**
	 * Returns a category with a single wrap-up code
	 */
	public static WrapUpCodeCategory ofI3NameSimple( String name ) {
		WrapUpCodeCategory category = new WrapUpCodeCategory();
		category.setI3Name( name );
		category.getWrapUpCodes()
		        .add( WrapUpCodeBuilder.ofSpecificName( name ) );
		return category;
	}
	
	/**
	 * Returns a category with multiple wrap-up codes
	 */
	public static WrapUpCodeCategory ofI3NameComplex( String name ) {
		WrapUpCodeCategory category = new WrapUpCodeCategory();
		category.setI3Name( name );
		category.getWrapUpCodes()
		        .add( WrapUpCodeBuilder.ofSpecificName( name + " 1" ) );
		category.getWrapUpCodes()
		        .add( WrapUpCodeBuilder.ofSpecificName( name + " 2" ) );
		return category;
	}
}
