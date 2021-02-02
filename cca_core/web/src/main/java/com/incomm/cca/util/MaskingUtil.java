package com.incomm.cca.util;

import org.apache.commons.lang3.StringUtils;

public class MaskingUtil {

    public enum IdentifierType {
        pin,
        serialNumber,
        accountNumber,
        transactionId,
        pan,
        can,
        location
    }

    public static String decryptAndMaskPAN(String pan) {
        String maskedPan = pan;
        if (StringUtils.isNotBlank(pan) && pan.length() > 12) {
            pan = GreencardPanEncryptionUtil.decrypt(pan);
            maskedPan = pan.substring(0, 6);
            maskedPan += "******";
            maskedPan += pan.substring(12);
        }
        return maskedPan;
    }

    public static String mask(String identifier) {
        if (StringUtils.isNotBlank(identifier)) {
            int unmaskedLength = 4;
            int maskLength = identifier.length() - unmaskedLength;
            return StringUtils.repeat("*", maskLength) + StringUtils.right(identifier, unmaskedLength);
        }
        return identifier;
    }
}
