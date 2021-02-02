package com.incomm.cca.service.maples;

import com.incomm.cca.model.enums.ManagedPermission;
import com.incomm.cca.service.SecurityService;
import com.incomm.cscore.client.maples.CsCoreMaplesCardClient;
import com.incomm.cscore.client.maples.constant.MaplesPlatform;
import com.incomm.cscore.client.maples.model.request.MaplesRequestSupport;
import com.incomm.cscore.client.maples.model.request.card.CardChangeStatusRequest;
import com.incomm.cscore.client.maples.model.request.card.CardCodesQuery;
import com.incomm.cscore.client.maples.model.request.card.CardReplacementRequest;
import com.incomm.cscore.client.maples.model.response.card.CardHistory;
import com.incomm.cscore.client.maples.model.shared.ResultMessageResponse;
import com.incomm.cscore.client.maples.model.response.card.CardCode;
import com.incomm.cscore.client.maples.model.response.card.CardCodesResponse;
import com.incomm.cscore.client.maples.model.response.card.CardReplacementResponse;
import com.incomm.cscore.client.maples.model.shared.ResultMessageResponse;
import com.incomm.cscore.client.rest.response.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service
public class MaplesCardService {

    @Autowired
    CsCoreMaplesCardClient cardClient;
    @Autowired
    MaplesRequestSupportService supportService;
    @Autowired
    SecurityService securityService;

    public CardReplacementResponse replace(String cardId, CardReplacementRequest request) {
        securityService.validateHasPermission(ManagedPermission.SERVE_REPLACE_CARD);

        return this.cardClient.replaceCard(cardId, request, supportService.defaultSupport())
                              .getBody();
    }

    public List<CardCode> searchCodes(CardCodesQuery request) {
        MaplesRequestSupport support = this.supportService.defaultSupport();

        Response<CardCodesResponse> response = null;

        try {
            response = cardClient.searchCodes(request, support);
        } catch (Exception e) {
            // Valid reason until implementation can be decided.
            if (request.getType().equals("CARD_STATUS_REASONS")) {
                CardCode code = new CardCode();
                code.setCode("Test Account");
                code.setDescription("Test Account");
                return Arrays.asList(code);
            } else {
                throw e;
            }
        }

        if (response.getBody() != null) {
            return response.getBody()
                           .getCodes();
        } else {
            return Collections.emptyList();
        }
    }

    public ResultMessageResponse changeCardStatus(String cardId, CardChangeStatusRequest request) {
        MaplesRequestSupport support = this.supportService.defaultSupport();

        securityService.validateHasPermission(ManagedPermission.CHANGE_CARD_STATUS);

        if (support.getPlatform().equals(MaplesPlatform.SERVE) && request.getCardStatus().equals("LOCKED")) {
            securityService.validateHasPermission(ManagedPermission.SERVE_LOCK_CARD);
        }
        if (support.getPlatform().equals(MaplesPlatform.SERVE) && request.getCardStatus().equals("Activate")) {
            securityService.validateHasPermission(ManagedPermission.SERVE_ACTIVATE_CARD);
        }

        return this.cardClient.changeCardStatus(cardId, request, supportService.defaultSupport()).getBody();
    }

    public List<CardHistory> getCardHistory(String accountId) {
        MaplesRequestSupport support = this.supportService.defaultSupport();

        return cardClient.getCardHistory(accountId, support).getBody();
    }
}
