package com.incomm.cca.service;

import org.springframework.stereotype.Service;

import java.text.DecimalFormat;

@Service
public class TerminalChallengePassword {

    private static final long MASK_32BITS = 0xffffffffL;
    private static final int DEFAULT_POLYNOMIAL = 0x015A4E35;
    private static final int DEFAULT_INCREMENT = 1;
    private static final int DEFAULT_ITERATIONS = 2;
    private static final ThreadLocal<DecimalFormat> THREE_DIGIT = new ThreadLocal<DecimalFormat>() {
        @Override
        protected DecimalFormat initialValue() {
            return new DecimalFormat("#000");
        }
    };
    private final int polynomial;
    private final int increment;
    private final int iterations;

    public TerminalChallengePassword() {
        this(DEFAULT_POLYNOMIAL, DEFAULT_INCREMENT, DEFAULT_ITERATIONS);
    }

    public TerminalChallengePassword(int polynomial, int increment, int iterations) {
        this.polynomial = polynomial;
        this.increment = increment;
        this.iterations = iterations;
    }

    public String getPassword(long seed) {

        long challenge = randomize(seed);

        long value1 = extractBits(challenge, 0) ^ extractBits(challenge, 3);
        long value2 = extractBits(challenge, 2) ^ extractBits(challenge, 1);

        String password = format(value1) + format(value2);

        return password;
    }

    /**
     * @param initial
     * @return
     */
    private long randomize(long initial) {
        long result = initial;
        for (int i = 0; i < iterations; i++) {
            result = ((result * polynomial) + increment) & MASK_32BITS;
        }
        return initial ^ (result >>> 3);
    }

    /**
     * @param value
     * @param bitSet indicates which set of 8 bits to extract from the given value, numbered from right to left, starting from zero.
     * @return
     */
    private long extractBits(long value, int bitSet) {
        int positionOf8Bits = 8 * bitSet;
        return ((value & (0xff << positionOf8Bits)) >>> positionOf8Bits) & MASK_32BITS;
    }

    private static String format(long value) {
        return THREE_DIGIT.get()
                          .format(value);
    }

}