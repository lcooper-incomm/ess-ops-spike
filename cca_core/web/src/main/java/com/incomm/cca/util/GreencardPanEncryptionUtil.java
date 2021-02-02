package com.incomm.cca.util;

import com.incomm.cca.exception.EncryptionException;
import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.Key;

/**
 * Handles the encryption/decryption of GreenCard's PAN.
 */
public final class GreencardPanEncryptionUtil {

    private static final String PRIVATE_KEY = "30f5f9a32e5c2ca5";
    private static final String ALGORITHM = "AES";

    private GreencardPanEncryptionUtil() {
    }

    public static String decrypt(String encryptedData) {
        try {
            Key key = generateKey();
            Cipher cipher = Cipher.getInstance(ALGORITHM);
            cipher.init(Cipher.DECRYPT_MODE, key);
            byte[] decodedValue = new BASE64Decoder().decodeBuffer(encryptedData);
            decodedValue = cipher.doFinal(decodedValue);
            return new String(decodedValue, StandardCharsets.UTF_8);
        } catch (Exception e) {
            throw new EncryptionException();
        }
    }

    public static String encrypt(String data) {
        try {
            Key key = generateKey();
            Cipher cipher = Cipher.getInstance(ALGORITHM);
            cipher.init(Cipher.ENCRYPT_MODE, key);
            byte[] encodedValue = cipher.doFinal(data.getBytes(StandardCharsets.UTF_8));
            return new BASE64Encoder().encode(encodedValue);
        } catch (Exception e) {
            throw new EncryptionException();
        }
    }

    private static Key generateKey() {
        byte[] keyBytes = PRIVATE_KEY.getBytes(StandardCharsets.UTF_8);
        return new SecretKeySpec(keyBytes, ALGORITHM);
    }
}
