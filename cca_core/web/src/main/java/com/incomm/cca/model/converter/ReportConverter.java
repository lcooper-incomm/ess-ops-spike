package com.incomm.cca.model.converter;

import com.incomm.cca.model.domain.Report;
import com.incomm.cca.model.view.report.ReportView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class ReportConverter {

    @Autowired
    private PermissionConverter permissionConverter;

    public List<ReportView> convert(Collection<Report> request) {
        List<ReportView> views = new ArrayList<>();

        if (request != null) {
            request.forEach(report -> views.add(this.convert(report)));
        }

        return views;
    }

    public ReportView convert(Report request) {
        ReportView view = null;

        if (request != null) {
            view = new ReportView();
            view.setId(request.getId());
            view.setLink(request.getLink());
            view.setIsActive(request.getStatus());
            view.setName(request.getName());
            view.setPermission(permissionConverter.convertSimple(request.getPermission()));
            view.setSnippet(request.getSnippet());
        }

        return view;
    }
}
