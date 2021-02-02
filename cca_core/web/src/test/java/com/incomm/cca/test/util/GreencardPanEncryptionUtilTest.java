package com.incomm.cca.test.util;

import com.incomm.cca.exception.EncryptionException;
import com.incomm.cca.util.GreencardPanEncryptionUtil;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.runners.MockitoJUnitRunner;

/**
 * Created by Allen on 12/6/2016.
 */
@RunWith( MockitoJUnitRunner.class )
public class GreencardPanEncryptionUtilTest {
	
	private String encryptedValue = "/GlNkIxBUrLyBB4VOuHApQPCvreLoD1635GC12fdzRM=";
	private String decryptedValue = "4847350317599312";
	
	@Test
	public void encrypt() {
		String actual = GreencardPanEncryptionUtil.encrypt( "4847350317599312" );
		Assert.assertEquals( encryptedValue, actual );
	}
	
	@Test
	public void decrypt() {
		String actual = GreencardPanEncryptionUtil.decrypt( encryptedValue );
		Assert.assertEquals( decryptedValue, actual );
	}
	
	@Test( expected = EncryptionException.class )
	public void invalidValueThrowsEncryptionExceptionOnDecrypt() {
		GreencardPanEncryptionUtil.decrypt( decryptedValue );
	}
	
	@Test( expected = EncryptionException.class )
	public void encryptNullThrowsEncryptionException() {
		GreencardPanEncryptionUtil.encrypt( null );
	}
	
	@Test( expected = EncryptionException.class )
	public void decryptNullThrowsEncryptionException() {
		GreencardPanEncryptionUtil.decrypt( null );
	}
}
