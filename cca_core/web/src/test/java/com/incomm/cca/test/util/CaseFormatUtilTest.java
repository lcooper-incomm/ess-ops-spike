package com.incomm.cca.test.util;

import com.incomm.cca.util.CaseFormatUtil;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.runners.MockitoJUnitRunner;

/**
 * Created by Allen on 12/6/2016.
 */
@RunWith( MockitoJUnitRunner.class )
public class CaseFormatUtilTest {
	
	@Test
	public void noExceptionThrown() {
		String[] values = new String[]{ null, "", " ", "12_ab $%_" };
		for( String value : values ) {
			CaseFormatUtil.upperUnderscore( value );
		}
	}
	
	@Test
	public void formatsToUppercase() {
		String value = "test";
		String expected = "TEST";
		String actual = CaseFormatUtil.upperUnderscore( value );
		Assert.assertEquals( expected, actual );
	}
	
	@Test
	public void spacesProperlyConverted() {
		String value = "test test";
		String expected = "TEST_TEST";
		String actual = CaseFormatUtil.upperUnderscore( value );
		Assert.assertEquals( expected, actual );
	}
	
	@Test
	public void specialCharactersProperlyConverted() {
		String value = "test_a&a-a a";
		String expected = "TEST_A_A_A_A";
		String actual = CaseFormatUtil.upperUnderscore( value );
		Assert.assertEquals( expected, actual );
	}
	
	@Test
	public void multipleSpecialCharactersCollapsedToSingleUnderscore() {
		String value = "test   a___a%$^a---a";
		String expected = "TEST_A_A_A_A";
		String actual = CaseFormatUtil.upperUnderscore( value );
		Assert.assertEquals( expected, actual );
	}
}
