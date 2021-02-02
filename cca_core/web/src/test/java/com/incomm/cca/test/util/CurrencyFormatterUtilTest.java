package com.incomm.cca.test.util;

import com.incomm.cca.util.CurrencyFormatterUtil;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.runners.MockitoJUnitRunner;

/**
 * Created by Allen on 12/6/2016.
 */
@RunWith( MockitoJUnitRunner.class )
public class CurrencyFormatterUtilTest {
	
	@Test
	public void noExceptionThrown() {
		String[] values = new String[]{ null, "", " ", "!$%^#", "1.00", "1,000.00", "abc123" };
		for( String value : values ) {
			CurrencyFormatterUtil.format( value );
			CurrencyFormatterUtil.formatAsDouble( value );
		}
	}
	
	@Test
	public void nonNumericValueResultsInNullString() {
		String value = "abc123";
		String expected = null;
		String actual = CurrencyFormatterUtil.format( value );
		Assert.assertEquals( expected, actual );
	}
	
	@Test
	public void nonNumericValueResultsInZeroDouble() {
		String value = "abc123";
		Double expected = 0.0D;
		Double actual = CurrencyFormatterUtil.formatAsDouble( value );
		Assert.assertEquals( expected, actual );
	}
	
	@Test
	public void nonFloatNumericValueFormattedProperly() {
		String value = "00001000";
		String expected = "$10.00";
		String actual = CurrencyFormatterUtil.format( value );
		Assert.assertEquals( expected, actual );
	}
	
	@Test
	public void nonFloatNumericValueFormattedToDoubleProperly() {
		String value = "00001000";
		Double expected = 10.0D;
		Double actual = CurrencyFormatterUtil.formatAsDouble( value );
		Assert.assertEquals( expected, actual );
	}
	
	@Test
	public void floatNumericValueFormattedProperly() {
		String value = "234.56";
		String expected = "$234.56";
		String actual = CurrencyFormatterUtil.format( value );
		Assert.assertEquals( expected, actual );
	}
	
	@Test
	public void thousandsFormattedWithComma() {
		String value = "1234.56";
		String expected = "$1,234.56";
		String actual = CurrencyFormatterUtil.format( value );
		Assert.assertEquals( expected, actual );
	}
	
	@Test
	public void floatNumericValueFormattedToDoubleProperly() {
		String value = "1,234.56";
		Double expected = 1234.56D;
		Double actual = CurrencyFormatterUtil.formatAsDouble( value );
		Assert.assertEquals( expected, actual );
	}
}
