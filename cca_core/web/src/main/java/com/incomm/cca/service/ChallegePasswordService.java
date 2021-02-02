package com.incomm.cca.service;

import com.incomm.cca.exception.SecurityViolationException;
import com.incomm.cca.model.enums.ManagedPermission;
import com.incomm.cscore.logging.CsCoreLogger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChallegePasswordService {

    @Autowired
    private SecurityService securityService;
    @Autowired
    private TerminalChallengePassword terminalChallengePassword;

    public String getChallengePassword(Long challenge) throws SecurityViolationException {
        try {
            if (!securityService.hasPermission(ManagedPermission.CHALLENGE_PASSWORD)) {
                throw new SecurityViolationException();
            }

            return terminalChallengePassword.getPassword(challenge);
        } catch (SecurityViolationException e) {
            CsCoreLogger.warn("Unauthorized attempt to challenge password")
                        .keyValue("challenge", challenge)
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to retrieve challenge password")
                        .keyValue("challenge", challenge)
                        .exception(e)
                        .build();
            throw e;
        }
    }
}
