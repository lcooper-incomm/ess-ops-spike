package com.incomm.cca.model.converter;

import com.incomm.cca.model.domain.order.OrderRelatedJob;
import com.incomm.cca.model.view.order.OrderRelatedJobView;
import com.incomm.cscore.client.rest.converter.TimestampConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class OrderRelatedJobConverter {

    @Autowired
    private TimestampConverter timestampConverter;
    @Autowired
    private UserConverter userConverter;

    public List<OrderRelatedJobView> convert(Collection<OrderRelatedJob> request) {
        List<OrderRelatedJobView> views = new ArrayList<>();

        if (request != null) {
            request.forEach(task -> views.add(this.convert(task)));
        }

        return views;
    }

    public OrderRelatedJobView convert(OrderRelatedJob request) {
        OrderRelatedJobView view = null;

        if (request != null) {
            view = new OrderRelatedJobView();
            view.setId(request.getId());
            view.setOrderId(request.getOrderId());
            view.setJobId(request.getJobId());
            view.setTargetStatus(request.getTargetStatus());
            view.setCreatedDate(timestampConverter.convert(request.getCreatedDate()));
            view.setCreatedBy(userConverter.convertSimple(request.getCreatedBy()));
            view.setIsJobComplete(request.getIsJobComplete());
            view.setCurrentJobStatus(request.getCurrentJobStatus());
        }

        return view;
    }
}
