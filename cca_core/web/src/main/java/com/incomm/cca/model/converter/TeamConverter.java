package com.incomm.cca.model.converter;

import com.incomm.cca.model.domain.Team;
import com.incomm.cca.model.view.TeamView;
import com.incomm.cscore.client.rest.converter.TimestampConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class TeamConverter {

    @Autowired
    private PermissionConverter permissionConverter;
    @Autowired
    private TimestampConverter timestampConverter;
    @Autowired
    private UserConverter userConverter;

    public List<TeamView> convert(Collection<Team> request) {
        return convert(request, false);
    }

    public List<TeamView> convert(Collection<Team> request, Boolean fetchMembers) {
        List<TeamView> views = new ArrayList<>();

        if (request != null) {
            if (fetchMembers != null && fetchMembers) {
                request.forEach(team -> views.add(this.convert(team)));
            } else {
                request.forEach(team -> views.add(this.convertSimple(team)));
            }
        }

        return views;
    }

    public TeamView convert(Team request) {
        TeamView view = null;

        if (request != null) {
            view = this.convertSimple(request);
            view.getMembers()
                .addAll(userConverter.convert(request.getMembers()));
        }

        return view;
    }

    public TeamView convertSimple(Team request) {
        TeamView view = null;

        if (request != null) {
            view = new TeamView();
            view.setId(request.getId());
            view.setCreatedBy(userConverter.convertSimple(request.getCreatedBy()));
            view.setCreatedDate(timestampConverter.convert(request.getCreatedDate()));
            view.setDescription(request.getDescription());
            view.setDisplayName(request.getDisplayName());
            view.setModifiedBy(userConverter.convertSimple(request.getModifiedBy()));
            view.setModifiedDate(timestampConverter.convert(request.getCreatedDate()));
            view.setCasePermission(permissionConverter.convertSimple(request.getCasePermission()));
            view.setSystemName(request.getSystemName());
        }

        return view;
    }
}
