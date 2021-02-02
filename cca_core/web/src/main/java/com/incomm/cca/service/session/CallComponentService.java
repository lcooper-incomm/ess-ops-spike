package com.incomm.cca.service.session;

import com.incomm.cca.model.domain.session.CallComponent;
import com.incomm.cca.model.domain.session.Session;
import com.incomm.cca.model.view.i3.IVRCallDetailView;
import com.incomm.cca.model.view.session.CallComponentView;
import com.incomm.cca.repository.session.CallComponentRepository;
import com.incomm.cca.service.encryption.EncryptionService;
import com.incomm.cscore.logging.CsCoreLogger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CallComponentService {

    @Autowired
    private CallComponentRepository callComponentRepository;
    @Autowired
    private NamedParameterJdbcTemplate jdbcTemplate;
    @Autowired
    private EncryptionService encryptionService;

    private static final String UPDATE_CLEAR_QUEUE_CATEGORY_AND_CODE = "" +
            "UPDATE cca_session " +
            "SET session_queue_id = NULL, " +
            "wrap_up_code_category_id = NULL, " +
            "wrap_up_code_id = NULL " +
            "WHERE id = :sessionId";
    private static final String UPDATE_CALL_DETAILS = "" +
            "UPDATE call_component " +
            "SET encrypted_caller_name = ENCRYPTBYKEY(KEY_GUID('CCAEncryptionSymmetricKey'),:encryptedCallerName), " +
            "encrypted_callback_number = ENCRYPTBYKEY(KEY_GUID('CCAEncryptionSymmetricKey'),:encryptedCallbackNumber), " +
            "ani = ENCRYPTBYKEY(KEY_GUID('CCAEncryptionSymmetricKey'),:ani), " +
            "dnis = :dnis " +
            "WHERE id = :id";

    public CallComponent findOne(Long id) {
        return callComponentRepository.findById(id)
                                   .orElse(null);
    }

    public CallComponent newCallDetail(Session session) {
        try {
            encryptionService.openSymmetricKey();
            CallComponent callComponent = new CallComponent(session);
            callComponentRepository.saveAndFlush(callComponent);

            clearSessionQueueCategoryAndCode(session.getId());

            return callComponent;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to create new call detail")
                        .keyValue("sessionId", session.getId())
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public CallComponent newCallDetail(Session session, IVRCallDetailView ivrCallDetailView, String ivrRemoteAddress) {
        encryptionService.openSymmetricKey();
        CallComponent callComponent = new CallComponent(session, ivrCallDetailView, ivrRemoteAddress);
        return callComponentRepository.saveAndFlush(callComponent);
    }

    public void updateOne(CallComponentView request) {
        try {
            if (request == null || request.getId() == null) {
                throw new IllegalArgumentException("Call detail not found");
            }

            encryptionService.openSymmetricKey();
            Map<String, Object> params = new HashMap<>();
            params.put("id", request.getId());
            params.put("encryptedCallerName", request.getCallerName());
            params.put("encryptedCallbackNumber", request.getCallbackNumber());
            params.put("ani", request.getAni());
            params.put("dnis", request.getDnis());

            jdbcTemplate.update(UPDATE_CALL_DETAILS, params);
        } catch (IllegalArgumentException e) {
            CsCoreLogger.warn("Bad attempt to update call detail")
                        .keyValue("cause", e.getMessage())
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to update call detail")
                        .keyValue("id", request.getId())
                        .exception(e)
                        .build();
            throw e;
        }
    }

    private void clearSessionQueueCategoryAndCode(Long sessionId) {
        try {
            Map<String, Object> params = new HashMap<>();
            params.put("sessionId", sessionId);

            jdbcTemplate.update(UPDATE_CLEAR_QUEUE_CATEGORY_AND_CODE, params);
        } catch (Exception e) {
            CsCoreLogger.error("Failed to clear session queue, category, and code")
                        .keyValue("id", sessionId)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    /**
     * The callId by itself is not enough to uniquely identify a call info record.
     * I3 sends us both the callId and the callIdKey for CONNECT, but not for DISCONNECT.
     * TODO When we're able to get work done on the I3 client again, we need the callIdKey for disconnects!
     * <p>
     * As a stop-gap, it is a fairly safe assumption that the newest call info record
     * is the one we're expecting to disconnect.
     */
    public CallComponent findNewestByCallIdAndUsername(String callId, String username) {
        try {
            encryptionService.openSymmetricKey();
            List<CallComponent> callComponents = callComponentRepository.findByCallIdAndUsername(callId, username);
            //If we got results, return the newest one
            if (callComponents != null && callComponents.size() > 0) {
                return callComponents.get(0);
            }
            return null;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to find newest CallDetail")
                        .keyValue("callId", callId)
                        .keyValue("username", username)
                        .exception(e)
                        .build();
            throw e;
        }
    }
}
