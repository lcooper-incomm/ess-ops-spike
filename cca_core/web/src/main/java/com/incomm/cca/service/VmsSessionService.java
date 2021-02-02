package com.incomm.cca.service;

import com.incomm.apls.model.requests.SessionEndRequestData;
import com.incomm.apls.model.requests.SessionStartRequestData;
import com.incomm.apls.model.response.SessionStartResponse;
import com.incomm.cca.exception.VmsSessionException;
import com.incomm.cca.model.constant.IdentifierType;
import com.incomm.cca.model.domain.Comment;
import com.incomm.cca.model.domain.Identifier;
import com.incomm.cca.model.domain.session.Selection;
import com.incomm.cca.model.domain.session.Session;
import com.incomm.cca.repository.SelectionRepository;
import com.incomm.cca.service.apls.AplsRequestSupportService;
import com.incomm.cscore.client.apls.CsCoreAplsCustomerClient;
import com.incomm.cscore.client.apls.model.customer.FsapiRequestSupport;
import com.incomm.cscore.client.rest.response.Response;
import com.incomm.cscore.logging.CsCoreLogger;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;

@Service
public class VmsSessionService {

    @Autowired
    private CsCoreAplsCustomerClient customerClient;
    @Autowired
    private SelectionRepository selectionRepository;
    @Autowired
    private AplsRequestSupportService supportService;

    @Transactional
    public void createSessionForSelection(Long selectionId) {
        Selection selection = selectionRepository.findById(selectionId)
                                                 .orElse(null);
        createSessionForSelection(selection);
    }

    @Transactional
    public void createSessionForSelection(Selection selection) throws VmsSessionException {
        if (StringUtils.isBlank(selection.getExternalSessionId())) {
            try {
                //Find the CUSTOMERID identifier
                Identifier identifier = selection.getIdentifiers()
                                                 .stream()
                                                 .filter(selectionIdentifier ->
                                                         selectionIdentifier.getIdentifierType()
                                                                            .equals(IdentifierType.CUSTOMERID)
                                                 )
                                                 .findAny()
                                                 .orElse(null);

                if (identifier == null) {
                    throw new IllegalArgumentException("No CustomerId identifier record found!");
                }

                String sessionRefNum = selection.getSession()
                                                .getId()
                                                .toString();
                String customerId = identifier.getValue();

                String vmsSessionId = createSessionForCustomer(sessionRefNum, customerId, selection.getPartner()
                                                                                                   .getType());
                selection.setExternalSessionId(vmsSessionId);
                selectionRepository.save(selection);
            } catch (VmsSessionException e) {
                throw e;
            } catch (Exception e) {
                CsCoreLogger.error("Failed to create VMS session")
                            .keyValue("selectionId", selection.getId())
                            .exception(e)
                            .build();
                throw new VmsSessionException();
            }
        }
    }

    public String createSessionForCustomer(String sessionRefNum, String customerId) throws VmsSessionException {
        return this.createSessionForCustomer(sessionRefNum, customerId, this.supportService.defaultSupport());
    }

    public String createSessionForCustomer(String sessionRefNum, String customerId, FsapiRequestSupport support) throws VmsSessionException {
        try {
            //Create the VMS session
            if (StringUtils.isNotBlank(customerId)) {
                SessionStartRequestData data = new SessionStartRequestData();
                data.setSessionRefNum(sessionRefNum);

                Response<SessionStartResponse> response = customerClient.createSession(customerId, data, support);
                if (response.getBody() == null) {
                    throw new RuntimeException("Failed to create VMS Session");
                }
                return response.getBody()
                               .getSessionStartResponseData()
                               .getSessionId();
            } else {
                throw new IllegalStateException("'customerId' must be provided");
            }
        } catch (Exception e) {
            CsCoreLogger.error("Failed to create VMS Session")
                        .keyValue("sessionRefNum", sessionRefNum)
                        .keyValue("customerId", customerId)
                        .exception(e)
                        .build();
            throw new VmsSessionException();
        }
    }

    private String createSessionForCustomer(String sessionRefNum, String customerId, String partner) throws VmsSessionException {
        try {
            //Create the VMS session
            if (StringUtils.isNotBlank(customerId)) {
                SessionStartRequestData data = new SessionStartRequestData();
                data.setSessionRefNum(sessionRefNum);

                FsapiRequestSupport support = supportService.defaultSupport();
                support.setPartner(partner);

                Response<SessionStartResponse> response = customerClient.createSession(customerId, data, support);
                if (response.getBody() == null) {
                    throw new RuntimeException("Failed to create VMS Session");
                }
                return response.getBody()
                               .getSessionStartResponseData()
                               .getSessionId();
            } else {
                throw new IllegalStateException("'customerId' must be provided");
            }
        } catch (Exception e) {
            CsCoreLogger.error("Failed to create VMS Session")
                        .keyValue("sessionRefNum", sessionRefNum)
                        .keyValue("customerId", customerId)
                        .exception(e)
                        .build();
            throw new VmsSessionException();
        }
    }

    @Transactional
    public void closeSessionForSelection(Session session, Selection selection) {
        try {
            //Find the CUSTOMERID identifier
            Identifier identifier = null;
            for (Identifier selectionIdentifier : selection.getIdentifiers()) {
                if (Objects.equals(selectionIdentifier.getIdentifierType(), IdentifierType.CUSTOMERID)) {
                    identifier = selectionIdentifier;
                    break;
                }
            }

            if (identifier != null) {
                SessionEndRequestData request = new SessionEndRequestData();

                Comment lastComment = session.getComments()
                                             .get(session.getComments()
                                                         .size() - 1);
				request.setComment(lastComment.getContent());

                customerClient.closeSession(identifier.getValue(), request, supportService.buildSupport(selection.getPartner()
                                                                                                                 .getType(), selection.getExternalSessionId()));
                selection.setExternalSessionId(null);
            } else {
                throw new IllegalStateException("Customer selection must have a CUSTOMERID at this point");
            }
        } catch (Exception e) {
            CsCoreLogger.error("Failed to close VMS Session")
                        .keyValue("sessionId", session.getId())
                        .keyValue("selectionId", selection.getId())
                        .exception(e)
                        .build();
        }
    }
}
