package com.incomm.cca.test.util;

import com.incomm.cca.util.UUIDUtil;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.runners.MockitoJUnitRunner;

/**
 * Created by Allen on 10/10/2016.
 */
@RunWith( MockitoJUnitRunner.class )
public class UUIDUtilTest {
	
	@Test
	public void properLengthReturnedWhenLessThan32() {
		int expectedLength = 20;
		String result = UUIDUtil.getGuidFromUUID( expectedLength );
		Assert.assertEquals( expectedLength, result.length() );
	}
	
	@Test
	public void properLengthReturnedWhenEqualTo32() {
		int expectedLength = 32;
		String result = UUIDUtil.getGuidFromUUID( expectedLength );
		Assert.assertEquals( expectedLength, result.length() );
	}
	
	@Test
	public void properLengthReturnedWhenMoreThan32() {
		int expectedLength = 32;
		String result = UUIDUtil.getGuidFromUUID( 40 );
		Assert.assertEquals( expectedLength, result.length() );
	}
	
	@Test
	public void consecutiveUUIDsNotEqual() {
		String result1 = UUIDUtil.getGuidFromUUID( 20 );
		String result2 = UUIDUtil.getGuidFromUUID( 20 );
		Assert.assertNotEquals( result1, result2 );
	}

}
