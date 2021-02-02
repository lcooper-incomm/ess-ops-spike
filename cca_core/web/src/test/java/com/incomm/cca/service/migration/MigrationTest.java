package com.incomm.cca.service.migration;

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.runners.MockitoJUnitRunner;

@RunWith(MockitoJUnitRunner.class)
public class MigrationTest {

    @Test
    public void hashLengthIsWhatWeExpect() {
        String shortString = RandomStringUtils.random(5);
        String longString = RandomStringUtils.randomAlphanumeric(500);

        String shortHash = DigestUtils.sha256Hex(shortString);
        String longHash = DigestUtils.sha256Hex(longString);

        Assert.assertEquals(64, shortHash.length());
        Assert.assertEquals(64, longHash.length());
    }

}
