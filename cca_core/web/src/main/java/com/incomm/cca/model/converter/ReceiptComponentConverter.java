package com.incomm.cca.model.converter;

import com.incomm.cca.model.domain.session.ReceiptCard;
import com.incomm.cca.model.domain.session.ReceiptComponent;
import com.incomm.cca.model.view.session.ReceiptComponentCardView;
import com.incomm.cca.model.view.session.ReceiptComponentView;
import com.incomm.cscore.client.rest.converter.TimestampConverter;
import com.incomm.cscore.gringotts.GringottsExchange;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ReceiptComponentConverter {

    @Autowired
    private TimestampConverter timestampConverter;

    public ReceiptComponentView convert(ReceiptComponent request) {
        ReceiptComponentView view = null;

        if (request != null) {
            view = new ReceiptComponentView();
            view.setId(request.getId());
            view.setPaymentMethod(request.getPaymentMethod());
            view.setReceiptId(request.getReceiptId());
            view.setTotalAmount(GringottsExchange.quickExchange(request.getTotalAmount()));
            view.setTransactionAmount(GringottsExchange.quickExchange(request.getTransactionAmount()));
            view.setTransactionDate(timestampConverter.convert(request.getTransactionDate()));
            view.setTransactionTime(request.getTransactionTime());
            view.getCards()
                .addAll(this.convert(request.getCards()));
        }

        return view;
    }

    public List<ReceiptComponentCardView> convert(List<ReceiptCard> request) {
        List<ReceiptComponentCardView> views = new ArrayList<>();

        if (request != null) {
            request.forEach(card -> views.add(this.convert(card)));
        }

        return views;
    }

    public ReceiptComponentCardView convert(ReceiptCard request) {
        ReceiptComponentCardView view = null;

        if (request != null) {
            view = new ReceiptComponentCardView();
            view.setId(request.getId());
            view.setInitialLoadAmount(GringottsExchange.quickExchange(request.getInitialLoadAmount()));
            view.setPackageVan(request.getPackageVan());
            view.setProductType(request.getProductType());
            view.setSerialNumber(request.getSerialNumber());
            view.setVan(request.getVan());
        }

        return view;
    }
}
