package com.incomm.cca.data;

import com.incomm.cca.model.domain.SessionQueue;

/**
 * Created by Allen on 12/21/2016.
 */
public class QueueBuilder {
	
	public static SessionQueue ofSpecificType( String type ) {
		SessionQueue queue = QueueBuilder.ofSystemNameSimple( "GENERAL" );
		queue.setType( type );
		return queue;
	}
	
	/**
	 * Returns a queue with a single simple category
	 */
	public static SessionQueue ofSystemNameSimple( String name ) {
		SessionQueue queue = new SessionQueue();
		queue.setSystemName( name );
		queue.getWrapUpCodeCategories()
		     .add( WrapUpCodeCategoryBuilder.ofI3NameSimple( name ) );
		return queue;
	}
	
	/**
	 * Returns a queue with a single simple category and a default note
	 */
	public static SessionQueue ofSystemNameSimpleWithNote( String name, String note ) {
		SessionQueue queue = QueueBuilder.ofSystemNameSimple( name );
		queue.setDefaultNote( note );
		return queue;
	}
	
	/**
	 * Returns a queue with multiple simple categories
	 */
	public static SessionQueue ofSystemNameComplex( String name ) {
		SessionQueue queue = new SessionQueue();
		queue.setSystemName( name );
		queue.getWrapUpCodeCategories()
		     .add( WrapUpCodeCategoryBuilder.ofI3NameSimple( name + " 1" ) );
		queue.getWrapUpCodeCategories()
		     .add( WrapUpCodeCategoryBuilder.ofI3NameSimple( name + " 2" ) );
		return queue;
	}
	
	/**
	 * Returns a queue with a single complex category
	 */
	public static SessionQueue ofSystemNameSimpleWithComplexCategory( String name ) {
		SessionQueue queue = new SessionQueue();
		queue.setSystemName( name );
		queue.getWrapUpCodeCategories()
		     .add( WrapUpCodeCategoryBuilder.ofI3NameComplex( name ) );
		return queue;
	}
	
	/**
	 * Returns a queue with multiple complex categories
	 */
	public static SessionQueue ofSystemNameComplexWithComplexCategories( String name ) {
		SessionQueue queue = new SessionQueue();
		queue.setSystemName( name );
		queue.getWrapUpCodeCategories()
		     .add( WrapUpCodeCategoryBuilder.ofI3NameComplex( name + " 1" ) );
		queue.getWrapUpCodeCategories()
		     .add( WrapUpCodeCategoryBuilder.ofI3NameComplex( name + " 2" ) );
		return queue;
	}

}
