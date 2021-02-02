package com.incomm.cca.controller;

import com.incomm.cca.model.converter.TeamConverter;
import com.incomm.cca.model.domain.Team;
import com.incomm.cca.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/rest/team")
public class TeamController extends RestResponseHandler {

    @Autowired
    private TeamConverter teamConverter;
    @Autowired
    private TeamService teamService;

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity addOne(@RequestBody Team request) {
        Team domainModel = teamService.addOne(request);
        return ok(teamConverter.convert(domainModel));
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity deleteOne(@PathVariable("id") Long id) {
        teamService.deleteOne(id);
        return noContent();
    }

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity findAll(@RequestParam("fetchMembers") Boolean fetchMembers) {
        List<Team> domainModels = teamService.findAll();
        return ok(teamConverter.convert(domainModels, fetchMembers));
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity findOne(@PathVariable("id") Long id) {
        Team domainModel = teamService.findOne(id);
        if (domainModel != null) {
            return ok(teamConverter.convert(domainModel));
        } else {
            return noContent();
        }
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public ResponseEntity updateOne(@PathVariable("id") Long id, @RequestBody Team request) {
        Team domainModel = teamService.updateOne(request);
        return ok(teamConverter.convert(domainModel));
    }
}
