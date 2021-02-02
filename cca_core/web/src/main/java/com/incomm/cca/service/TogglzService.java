package com.incomm.cca.service;

import com.incomm.cca.exception.SecurityViolationException;
import com.incomm.cca.model.view.TogglzFeatureView;
import com.incomm.cca.togglz.TogglzFeature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.togglz.core.context.FeatureContext;
import org.togglz.core.repository.FeatureState;

import java.util.ArrayList;
import java.util.List;

@Service
public class TogglzService {

    @Autowired
    private SecurityService securityService;

    public List<TogglzFeatureView> getTogglzFeatures() throws NoSuchFieldException {
        List<TogglzFeatureView> togglz = new ArrayList<>();

        for (TogglzFeature feature : TogglzFeature.values()) {
            togglz.add(new TogglzFeatureView(feature.name(), feature.isActive()));
        }

        return togglz;
    }

    /**
     * If system admin, get the feature by name and set to its new status.
     *
     * @param feature
     * @param active
     */
    public void updateToggle(String feature, Boolean active) {
        if (!securityService.isSystemAdministrator()) {
            throw new SecurityViolationException();
        }

        FeatureState state = FeatureContext.getFeatureManager()
                                           .getFeatureState(TogglzFeature.valueOf(feature));
        if (active) {
            state.enable();
        } else {
            state.disable();
        }

        FeatureContext.getFeatureManager()
                      .setFeatureState(state);
    }
}
