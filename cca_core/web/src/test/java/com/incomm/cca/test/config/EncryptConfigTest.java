package com.incomm.cca.test.config;

import com.incomm.cca.CCATest;
import org.jasypt.hibernate4.encryptor.HibernatePBEStringEncryptor;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Created by Allen on 9/20/2016.
 */
//@RunWith( SpringRunner.class )
//@TestPropertySource( locations = { "classpath:application.properties", "classpath:application-local.properties" } )
public class EncryptConfigTest extends CCATest {
	
	@Autowired
	private HibernatePBEStringEncryptor hibernateStringEncryptor;
	
	//TODO These tests commented out pending Togglz 2.6.1, which should fix this error:
	//java.lang.IncompatibleClassChangeError: Found interface org.springframework.test.context.TestContext, but class was expected
	
	//	@Test
	//	public void encrypt() {
	//		String value = "test";
	//		String encryptedValue = hibernateStringEncryptor.encrypt( value );
	//		Assert.assertNotEquals( encryptedValue, value );
	//	}
	//
	//	@Test
	//	public void decrypt() {
	//		String value = "pxh1jrkUFqU3JOqxM+aqZbLD0zkskoCjh+9O/HQhdxA=";
	//		String expectedDecryptValue = "test";
	//		String decryptedValue = hibernateStringEncryptor.decrypt( value );
	//		Assert.assertEquals( expectedDecryptValue, decryptedValue );
	//	}
	//
	//	@Test
	//	public void encryptDecrypt() {
	//		String value = "test";
	//		String encryptedValue = hibernateStringEncryptor.encrypt( value );
	//		Assert.assertNotEquals( encryptedValue, value );
	//		String decryptedValue = hibernateStringEncryptor.decrypt( encryptedValue );
	//		Assert.assertEquals( decryptedValue, value );
	//	}
}
