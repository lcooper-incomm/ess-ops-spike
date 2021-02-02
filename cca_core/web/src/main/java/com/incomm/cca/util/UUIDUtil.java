package com.incomm.cca.util;

public class UUIDUtil {

    public static String getGuidFromUUID(int nLength) {

        String uuid = java.util.UUID.randomUUID()
                                    .toString()
                                    .replaceAll("-", "");
        if (nLength >= 32) {
            return uuid;
        }

        //Extract last 20 characters from UUID
        uuid = uuid.substring(uuid.length() - nLength);

        return uuid;
    }
}
