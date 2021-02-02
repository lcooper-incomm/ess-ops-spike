package com.incomm.cca.crypt;

import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Map;

public class CCABouncyCastleEncryptor {

    private static final String INPUT = "input";
    private static final String PASSWORD = "password";
    private static final String DEFAULT_ALGORITHM = "PBEWithSHA256AND256BITAES-CBC-BC";
    private static final Logger logger = LoggerFactory.getLogger(CCABouncyCastleEncryptor.class.getSimpleName());

    public static void main(String... args) {
        try {
            Map<String, String> arguments = processArgs(args);

            //Log arguments
            logger.info("Using arguments:");
            for (Map.Entry<String, String> entry : arguments.entrySet()) {
                logger.info(String.format("%s: %s", entry.getKey(), entry.getValue()));
            }

            StandardPBEStringEncryptor encryptor = new StandardPBEStringEncryptor();
            encryptor.setProvider(new BouncyCastleProvider());

            String algorithm = arguments.get("algorithm");
            if (algorithm == null || algorithm.isEmpty()) {
                algorithm = DEFAULT_ALGORITHM;
                logger.info(String.format("No algorithm specified, using default: %s", algorithm));
            }

            encryptor.setAlgorithm(algorithm);
            encryptor.setPassword(arguments.get(PASSWORD));

            String encryptedText = encryptor.encrypt(arguments.get(INPUT));

            logger.info("Ouput:");
            logger.info(encryptedText);
        } catch (Exception e) {
            logger.error(String.format("An error occurred: %s", e.getMessage()));
        }
    }

    public static Map<String, String> processArgs(String... args) {

        if (args != null && args.length > 0) {
            Map<String, String> map = new HashMap<>();

            for (String arg : args) {
                String[] parts = arg.split("=");

                if (parts.length != 2) {
                    throw new IllegalArgumentException(String.format("Argument '%s' is not properly formatted", arg));
                }

                map.put(parts[0].toLowerCase(), parts[1]);
            }

            if (map.get(INPUT) == null || map.get(INPUT)
                                             .isEmpty()) {
                throw new IllegalArgumentException("'input' argument must be provided");
            } else if (map.get(PASSWORD) == null || map.get(PASSWORD)
                                                       .isEmpty()) {
                throw new IllegalArgumentException("'password' argument must be provided");
            }

            return map;

        } else {
            throw new IllegalArgumentException("'input' and 'password' arguments must be provided");
        }
    }
}
