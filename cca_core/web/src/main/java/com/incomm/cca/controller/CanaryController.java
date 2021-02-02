package com.incomm.cca.controller;

import com.incomm.cca.model.view.canary.VersionAndEnvironmentView;
import com.incomm.cscore.canary.endpoint.simple.BuildEndpoint;
import com.incomm.cscore.canary.model.BuildHealth;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.actuate.health.Health;
import org.springframework.core.env.Environment;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/rest/canary")
public class CanaryController {

    @Autowired
    private BuildEndpoint buildEndpoint;
    @Autowired
    private Environment environment;
    private static final List<String> profilesWeCareAbout = Arrays.asList("local", "dev", "qa", "uat", "stg", "green", "blue");

    @GetMapping("/env-version")
    public ResponseEntity findVersion() {
        VersionAndEnvironmentView view = new VersionAndEnvironmentView();
        view.setEnvironment(this.getEnvironment());
        view.setVersion(this.getVersion());

        if (StringUtils.isNotBlank(view.getEnvironment())) {
            view.setEnvironment(view.getEnvironment()
                                    .toUpperCase());
        }

        return ResponseEntity.ok(view);
    }

    private String getEnvironment() {
        List<String> activeProfiles = Arrays.asList(this.environment.getActiveProfiles());
        return activeProfiles.stream()
                             .filter(profilesWeCareAbout::contains)
                             .findFirst()
                             .orElse(null);
    }

    private String getVersion() {
        Health health = this.buildEndpoint.buildHealth();
        BuildHealth buildDetails = (BuildHealth) health.getDetails()
                                                       .get("build");
        return buildDetails.getVersion();
    }
}
