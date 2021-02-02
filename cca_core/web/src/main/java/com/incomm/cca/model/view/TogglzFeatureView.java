package com.incomm.cca.model.view;

import com.incomm.cca.togglz.TogglzFeature;
import org.togglz.core.annotation.Label;

import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

/**
 * Return the name, status and group list to the UI.  The TogglzFeature enum define groups based
 * upon annotations.  So to build a group list, we scrape annotations looking for the @FeatureGroup
 * then using that annotation's @Label.
 */
public class TogglzFeatureView {

    private String name;
    private Boolean isActive;
    private List<String> groups = new ArrayList<>();

    public TogglzFeatureView() {}

    public TogglzFeatureView(String name, Boolean isActive) throws NoSuchFieldException {
        this.name = name;
        this.isActive = isActive;

        // Find if the feature is a part of a feature group
        Field field = TogglzFeature.class.getField(name);
        for (Annotation annotation : field.getAnnotations()) {
            Annotation[] featureGroups = annotation.annotationType().getAnnotationsByType(org.togglz.core.annotation.FeatureGroup.class);

            // If there is a feature group, find a label annotation and add its value to the group list.
            if (featureGroups.length > 0) {
                Annotation[] labels = annotation.annotationType().getAnnotationsByType(org.togglz.core.annotation.Label.class);
                if (labels.length == 1) {
                    groups.add(((Label) labels[0]).value());
                }
            }
        }
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public List<String> getGroups() {
        return groups;
    }

    public void setGroups(List<String> groups) {
        this.groups = groups;
    }
}
