package com.incomm.cca.test.model;

import com.incomm.cca.model.enums.apls.AplsIdentifier;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.runners.MockitoJUnitRunner;

/**
 * Created by Allen on 10/27/2016.
 */
@RunWith( MockitoJUnitRunner.class )
public class AplsIdentifierTest {
	
	/**
	 * This test is in place because too many times now this issue has come
	 * up in production. No matter what, the identifier portion of the APLS
	 * product search URL **MUST** be URL encoded! Encrypted PAN (Greencard)
	 * values sent in the URL CAN contain '/' characters, which MUST be properly
	 * encoded.
	 * <p>
	 * Do NOT remove this test unless you are absolutely certain that whatever
	 * new solution you have is properly enocding this value!
	 */
	@Test
	public void encryptedPanIsURLEncoded() {
		String encryptedPan = "w/PFmCIR8fAn8tof9imxNgPCvreLoD1635GC12fdzRM=";
		String encodedEncryptedPan = "w%2FPFmCIR8fAn8tof9imxNgPCvreLoD1635GC12fdzRM%3D";
		String result = AplsIdentifier.PAN.formatPath( encryptedPan );
		Assert.assertTrue( result.contains( encodedEncryptedPan ) );
	}
}
