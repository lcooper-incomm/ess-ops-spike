package com.incomm.cca.service;

import com.incomm.cca.exception.SecurityViolationException;
import com.incomm.cca.model.domain.User;
import com.incomm.cca.model.domain.audit.AuditActivity;
import com.incomm.cca.model.domain.audit.AuditBalanceAdjustmentActivity;
import com.incomm.cca.model.domain.audit.AuditCardReplacementActivity;
import com.incomm.cca.repository.audit.AuditActivityRepository;
import com.incomm.cca.repository.audit.AuditBalanceAdjustmentActivityRepository;
import com.incomm.cca.repository.audit.AuditCardReplacementActivityRepository;
import com.incomm.cca.util.DateUtil;
import com.incomm.cscore.logging.CsCoreLogger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AuditService {

    @Autowired
    private UserService userService;
    @Autowired
    private AuditActivityRepository auditActivityRepository;
    @Autowired
    private AuditCardReplacementActivityRepository auditCardReplacementActivityRepository;
    @Autowired
    private AuditBalanceAdjustmentActivityRepository auditBalanceAdjustmentActivityRepository;
    @Autowired
    private NamedParameterJdbcTemplate jdbcTemplate;
    @Autowired
    private HttpServletRequest servletRequest;
    @Autowired
    private RequestService requestService;
    @Autowired
    private SecurityService securityService;
    private static final String INSERT_ACTIVITY_RECORD = "" +
            "INSERT INTO audit_activity (type, user_id, session_id, selection_id, activity_date, response_success_date, response_failure_date, client_ip_address) VALUES " +
            "(:type, :userId, :sessionId, :selectionId, :activityDate, :responseSuccessDate, :responseFailureDate, :clientIpAddress)";

    public AuditActivity findOne(Long id) {
        try {
            if (!securityService.isSystemAdministrator()) {
                throw new SecurityViolationException();
            }

            return auditActivityRepository.findById(id)
                                          .orElse(null);
        } catch (SecurityViolationException e) {
            CsCoreLogger.warn("Unauthorized attempt to retrieve audit activity record")
                        .keyValue("id", id)
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to retrieve audit activity record")
                        .keyValue("id", id)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    /**
     * Creates an audit record, but does not save it. To be used when we need to record the start and end times of an activity.
     */
    public AuditActivity createActivity(String auditActivityType) {
        Long sessionId = null;
        Long selectionId = null;

        try {
            sessionId = Long.parseLong(servletRequest.getParameter("sessionId"));
        } catch (Exception e) {
            //Fail silently, sessionId not provided
        }

        try {
            selectionId = Long.parseLong(servletRequest.getParameter("selectionId"));
        } catch (Exception e) {
            //Fail silently, selectionId not provided
        }

        return createActivity(auditActivityType, sessionId, selectionId);
    }

    /**
     * Creates an audit record, but does not save it. To be used when we need to record the start and end times of an activity.
     */
    public AuditActivity createActivity(String auditActivityType, Long sessionId, Long selectionId) {
        User user = null;
        try {
            user = userService.currentPersistentUser();
        } catch (IllegalStateException e) {
            //If the user was null, but we have a session, we can get the user from the session
            if (sessionId == null) {
                throw e;
            }
        }

        AuditActivity auditActivity = new AuditActivity();
        auditActivity.setType(auditActivityType);
        auditActivity.setActivityDate(new Date());
        auditActivity.setUser(user);
        auditActivity.setSessionId(sessionId);
        auditActivity.setSelectionId(selectionId);
        recordIp(auditActivity);

        return auditActivity;
    }

    private void recordIp(AuditActivity auditActivity) {
        try {
            String forwardedFor = servletRequest.getHeader("X-FORWARDED-FOR");
            auditActivity.setClientIpAddress("request-ip = " + servletRequest.getRemoteHost() + ";x-forwarded-for = " + forwardedFor);
        } catch (Exception e) {
            //Fail silently, ip address not available because it's a server request, not a client request
        }
    }

    /**
     * This intended to be a very simple, very fast insert of the given data, with no need to return objects or use JPA entities.
     */
	public void record(String auditActivityType, Date activityDate, Date responseSuccessDate, Date responseFailureDate) {
        User user = userService.currentPersistentUser();

        Map<String, Object> params = new HashMap<>();
        params.put("type", auditActivityType);
        params.put("activityDate", activityDate != null ? activityDate : new Date());
        params.put("userId", user.getId());
        params.put("sessionId", requestService.getSessionId());
        params.put("selectionId", requestService.getSelectionId());
        params.put("responseSuccessDate", responseSuccessDate);
        params.put("responseFailureDate", responseFailureDate);
        params.put("isEncrypted", 1);

        String forwardedFor = servletRequest.getHeader("X-FORWARDED-FOR");

        params.put("clientIpAddress", "request-ip = " + servletRequest.getRemoteHost() + ";x-forwarded-for = " + forwardedFor);

        jdbcTemplate.update(INSERT_ACTIVITY_RECORD, params);
    }

    /**
     * Saves the given audit record after updating its response success date.
     */
    @Transactional
    public AuditActivity saveRecordAsSuccess(AuditActivity auditActivity) {
        auditActivity.setResponseSuccessDate(new Date());
        return auditActivityRepository.saveAndFlush(auditActivity);
    }

    /**
     * Saves the given audit record after updating its response failure date.
     */
    @Transactional
    public AuditActivity saveRecordAsFailure(AuditActivity auditActivity) {
        auditActivity.setResponseFailureDate(new Date());
        return auditActivityRepository.saveAndFlush(auditActivity);
    }

    public AuditCardReplacementActivity findLastCardReplacementActivity(String identifierType, String identifier, String platform) {
        try {
            List<AuditCardReplacementActivity> activities = auditCardReplacementActivityRepository.findAllForIdentifierTypeIdentifierAndPlatform(identifierType, identifier, platform);
            if (!activities.isEmpty()) {
                return activities.get(0);
            }
            return null;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to retrieve last card replacement activity")
                        .keyValue("identifierType", identifierType)
                        .keyValue("identifier", identifier)
                        .keyValue("platform", platform)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public AuditCardReplacementActivity createCardReplacementActivity(String identifierType, String identifier, String platform) {
        try {
            AuditCardReplacementActivity activity = new AuditCardReplacementActivity();
            activity.setIdentifierType(identifierType);
            activity.setIdentifier(identifier);
            activity.setPlatform(platform);
            activity.setLastReplacedDate(new Date());

            return auditCardReplacementActivityRepository.saveAndFlush(activity);
        } catch (Exception e) {
            CsCoreLogger.error("Failed to create card replacement activity")
                        .keyValue("identifierType", identifierType)
                        .keyValue("identifier", identifier)
                        .keyValue("platform", platform)
                        .exception(e)
                        .build();
            return null;
        }
    }

    public List<AuditBalanceAdjustmentActivity> findTodaysBalanceAdjustmentActivityForUser(String username) {
        try {
            return auditBalanceAdjustmentActivityRepository.findAllTodayForUser(username, DateUtil.getMidnight());
        } catch (Exception e) {
            CsCoreLogger.error("Failed to retrieve today\'s balance adjustment activity")
                        .keyValue("username", username)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public AuditBalanceAdjustmentActivity createBalanceAdjustmentActivity(String identifierType, String identifier, String platform, Double amount, String transactionType, String productDescription) {
        try {
            AuditBalanceAdjustmentActivity activity = new AuditBalanceAdjustmentActivity();
            activity.setIdentifierType(identifierType);
            activity.setIdentifier(identifier);
            activity.setPlatform(platform);
            activity.setAmount(amount);
            activity.setTransactionType(transactionType);
            activity.setAdjustedDate(new Date());
            activity.setAdjustedBy(userService.currentUser()
                                              .getUsername());
            activity.setProductDescription(productDescription);

            return auditBalanceAdjustmentActivityRepository.saveAndFlush(activity);
        } catch (Exception e) {
            CsCoreLogger.error("Failed to create balance adjustment activity")
                        .keyValue("identifierType", identifierType)
                        .keyValue("identifier", identifier)
                        .keyValue("platform", platform)
                        .keyValue("amount", amount)
                        .keyValue("transactionType", transactionType)
                        .exception(e)
                        .build();
            return null;
        }
    }
}
