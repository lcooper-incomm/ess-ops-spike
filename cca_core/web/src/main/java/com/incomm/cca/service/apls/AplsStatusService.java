package com.incomm.cca.service.apls;

import com.incomm.cca.model.constant.AuditActivityType;
import com.incomm.cca.model.domain.audit.AuditActivity;
import com.incomm.cca.service.AuditService;
import com.incomm.cscore.client.apls.CsCoreAplsCardClient;
import com.incomm.cscore.client.apls.constant.AplsPlatform;
import com.incomm.cscore.client.apls.model.shared.EnhancedStatus;
import com.incomm.cscore.client.apls.model.shared.EnhancedStatuses;
import com.incomm.cscore.client.rest.response.Response;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AplsStatusService {

    @Autowired
    private CsCoreAplsCardClient cardClient;
    @Autowired
    private AuditService auditService;

    public List<EnhancedStatus> search(String systemType, String identifierType, String identifier) {
        AuditActivity auditActivity = auditService.createActivity(AuditActivityType.QUICK_LOOKUP);

        try {
            if (StringUtils.isBlank(systemType)) {
                throw new IllegalArgumentException("systemType must be provided");
            }

            identifierType = identifierType.toLowerCase();

            if (identifierType.equalsIgnoreCase("van")) {
                identifierType = "van16";
            }

            Response<EnhancedStatuses> response = cardClient.findStatus(systemType, identifierType, identifier, AplsPlatform.INCOMM);
            EnhancedStatuses statuses = response.getBody();
            auditService.saveRecordAsSuccess(auditActivity);
            return statuses.getStatuses();
        } catch (Exception e) {
            auditService.saveRecordAsFailure(auditActivity);
            throw e;
        }
    }
}
