package com.incomm.cca.model.converter;

import com.incomm.cca.model.domain.mapping.ActionReasonCodeMapping;
import com.incomm.cca.model.view.mapping.ActionReasonCodeMappingView;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.runners.MockitoJUnitRunner;

import java.util.ArrayList;
import java.util.List;

@RunWith( MockitoJUnitRunner.class )
public class MappingConverterTest {
	
	@InjectMocks
	private MappingConverter converter;
	
	private ActionReasonCodeMapping mapping;
	
	@Before
	public void init() {
		this.mapping = new ActionReasonCodeMapping();
		this.mapping.setId( 1L );
		this.mapping.setCode( "MY_CODE" );
		this.mapping.setDisplayValue( "My Code" );
		this.mapping.setIsActive( true );
		this.mapping.setPlatform( "VMS" );
		this.mapping.setPlatformCode( "123" );
		this.mapping.setType( "RAISE_DISPUTE" );
	}
	
	@Test
	public void itShouldConvertSuccessfully() {
		List< ActionReasonCodeMapping > mappings = new ArrayList<>();
		mappings.add( this.mapping );
		
		List< ActionReasonCodeMappingView > views = this.converter.convertActionReasonCodeMappings( mappings );
		Assert.assertNotNull( views );
		Assert.assertEquals( 1, views.size() );
		
		ActionReasonCodeMappingView view = views.get( 0 );
		Assert.assertNotNull( view );
		Assert.assertEquals( this.mapping.getId(), view.getId() );
		Assert.assertEquals( this.mapping.getCode(), view.getCode() );
		Assert.assertEquals( this.mapping.getDisplayValue(), view.getDisplayValue() );
		Assert.assertEquals( this.mapping.getIsActive(), view.getIsActive() );
		Assert.assertEquals( this.mapping.getPlatform(), view.getPlatform() );
		Assert.assertEquals( this.mapping.getPlatformCode(), view.getPlatformCode() );
		Assert.assertEquals( this.mapping.getType(), view.getType() );
	}
}
