package com.incomm.cca.service.encryption;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class EncryptionService {

    private static final String OPEN_SYMMETRIC_KEY_QUERY = "OPEN SYMMETRIC KEY CCAEncryptionSymmetricKey DECRYPTION BY CERTIFICATE CcaEncryptionCertificate";

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void openSymmetricKey() {
        this.jdbcTemplate.update(OPEN_SYMMETRIC_KEY_QUERY);
    }

}
