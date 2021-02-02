package com.incomm.cca.model.converter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.incomm.cca.model.view.external.apls.product.EnhancedSrlCard;
import com.incomm.cscore.client.apls.model.card.EnhancedCard;
import com.incomm.cscore.logging.CsCoreLogger;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class CcaCardConverter {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    public EnhancedSrlCard convertSrl(EnhancedCard card, EnhancedCard srl) {
        EnhancedSrlCard view = null;

        try {
            String json = objectMapper.writeValueAsString(card);
            view = objectMapper.readValue(json, EnhancedSrlCard.class);
            view.setSrlData(srl);
        } catch (IOException e) {
            CsCoreLogger.error("Failed to convert SRL card model")
                        .exception(e)
                        .build();
        }

        return view;
    }
}
