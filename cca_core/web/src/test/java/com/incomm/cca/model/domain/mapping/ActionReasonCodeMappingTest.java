package com.incomm.cca.model.domain.mapping;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.runners.MockitoJUnitRunner;

@RunWith( MockitoJUnitRunner.class )
public class ActionReasonCodeMappingTest {
	
	private ActionReasonCodeMapping mapping;
	
	@Before
	public void init() {
		mapping = new ActionReasonCodeMapping();
		mapping.setCode( "MY_CODE" );
		mapping.setDisplayValue( "My Code" );
		mapping.setIsActive( true );
		mapping.setPlatform( "VMS" );
		mapping.setPlatformCode( "123" );
		mapping.setType( "RAISE_DISPUTE" );
	}
	
	@Test
	public void itShouldValidateSuccessfully() {
		mapping.validate();
	}
	
	@Test( expected = IllegalArgumentException.class )
	public void itShouldRequireCode() {
		this.mapping.setCode( null );
		this.mapping.validate();
	}
	
	@Test( expected = IllegalArgumentException.class )
	public void itShouldRequireDisplayValue() {
		this.mapping.setDisplayValue( null );
		this.mapping.validate();
	}
	
	@Test( expected = IllegalArgumentException.class )
	public void itShouldRequireIsActive() {
		this.mapping.setIsActive( null );
		this.mapping.validate();
	}
	
	@Test( expected = IllegalArgumentException.class )
	public void itShouldRequirePlatform() {
		this.mapping.setPlatform( null );
		this.mapping.validate();
	}
	
	@Test( expected = IllegalArgumentException.class )
	public void itShouldRequirePlatformCode() {
		this.mapping.setPlatformCode( null );
		this.mapping.validate();
	}
	
	@Test( expected = IllegalArgumentException.class )
	public void itShouldRequireType() {
		this.mapping.setType( null );
		this.mapping.validate();
	}
	
}
