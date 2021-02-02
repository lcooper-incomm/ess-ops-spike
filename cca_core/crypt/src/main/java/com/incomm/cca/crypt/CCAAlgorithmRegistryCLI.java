package com.incomm.cca.crypt;

import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.jasypt.intf.cli.AlgorithmRegistryCLI;

import java.security.Security;

/**
 * Force the AlgorithmRegistryCLI to show the Bouncy Castle algorithms
 *
 * @author: derickson
 */
public class CCAAlgorithmRegistryCLI {

    public static void main(String... args) {
        Security.addProvider(new BouncyCastleProvider());
        AlgorithmRegistryCLI.main(args);
    }
}
