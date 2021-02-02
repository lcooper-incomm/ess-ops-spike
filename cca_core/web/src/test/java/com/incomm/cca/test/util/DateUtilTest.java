package com.incomm.cca.test.util;

import com.incomm.cca.util.DateUtil;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.runners.MockitoJUnitRunner;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

/**
 * Created by Allen on 10/5/2016.
 */
@RunWith( MockitoJUnitRunner.class )
public class DateUtilTest {
	
	@Test
	public void formatNullDateAsTimestampReturnsEmptyString() {
		Date date = null;
		String result = DateUtil.formatTimestamp( date );
		Assert.assertEquals( result, "" );
	}
	
	@Test
	public void formatNullLocalDateTimeAsTimestampReturnsEmptyString() {
		LocalDateTime localDateTime = null;
		String result = DateUtil.formatTimestamp( localDateTime );
		Assert.assertEquals( result, "" );
	}
	
	@Test
	public void formatNullLongAsTimestampReturnsEmptyString() {
		Long value = null;
		String result = DateUtil.formatTimestamp( value );
		Assert.assertEquals( result, "" );
	}
	
	@Test
	public void formatNullDateAsDateReturnsEmptyString() {
		Date date = null;
		String result = DateUtil.formatDate( date );
		Assert.assertEquals( result, "" );
	}
	
	@Test
	public void formatNullLocalDateAsDateReturnsEmptyString() {
		LocalDate localDate = null;
		String result = DateUtil.formatDate( localDate );
		Assert.assertEquals( result, "" );
	}
	
	@Test
	public void formatNullLongAsDateReturnsEmptyString() {
		Long value = null;
		String result = DateUtil.formatDate( value );
		Assert.assertEquals( result, "" );
	}
	
	@Test
	public void dateFormatConformsToStandard() {
		String result = DateUtil.formatDate( LocalDate.now() );
		Assert.assertTrue( result.matches( "[0-9]{2}/[0-9]{2}/[0-9]{4}" ) );
	}
	
	@Test
	public void timestampFormatConformsToStandard() {
		String result = DateUtil.formatTimestamp( LocalDateTime.now() );
		Assert.assertTrue( result.matches( "[0-9]{2}/[0-9]{2}/[0-9]{4} [0-9]{2}:[0-9]{2} [A-Z]{3}" ) );
	}
	
	@Test
	public void sameOutputAchievedRegardlessOfInputType() {
		Long longValue = 1488258000000L;
		Date date = new Date( longValue );
		LocalDateTime localDateTime = LocalDateTime.ofInstant( Instant.ofEpochMilli( longValue ), ZoneId.systemDefault() );
		
		String valueResult = DateUtil.formatTimestamp( longValue );
		String dateResult = DateUtil.formatTimestamp( date );
		String localDateTimeResult = DateUtil.formatTimestamp( localDateTime );
		
		Assert.assertEquals( valueResult, dateResult );
		Assert.assertEquals( valueResult, localDateTimeResult );
	}
}
