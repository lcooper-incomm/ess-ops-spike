package com.incomm.cca.model.view.session.queue;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cca.model.view.auth.PermissionView;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class SessionQueueView implements Serializable {

    private Long id;
    private Boolean isActive = false;
    private Boolean isAutoCloseEnabled = false;
    private Long autoWrapTime;
    private String displayName;
    private String systemName;
    private String i3Name;
    private Boolean isLocked = false;
    private Long roboHelpId;
    private String defaultNote;
    private String type;
    private String locale;
    private PermissionView permission;

    private List<WrapUpCodeCategoryView> categories = new ArrayList<>();
    private List<String> sessionTypes = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(final Boolean active) {
        isActive = active;
    }

    public Boolean getIsAutoCloseEnabled() {
        return isAutoCloseEnabled;
    }

    public void setIsAutoCloseEnabled(final Boolean autoclosing) {
        isAutoCloseEnabled = autoclosing;
    }

    public Long getAutoWrapTime() {
        return autoWrapTime;
    }

    public void setAutoWrapTime(final Long autoWrapTime) {
        this.autoWrapTime = autoWrapTime;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(final String displayName) {
        this.displayName = displayName;
    }

    public String getSystemName() {
        return systemName;
    }

    public void setSystemName(final String systemName) {
        this.systemName = systemName;
    }

    public String getI3Name() {
        return i3Name;
    }

    public void setI3Name(final String i3Name) {
        this.i3Name = i3Name;
    }

    public Boolean getIsLocked() {
        return isLocked;
    }

    public void setIsLocked(final Boolean locked) {
        isLocked = locked;
    }

    public Long getRoboHelpId() {
        return roboHelpId;
    }

    public void setRoboHelpId(final Long roboHelpId) {
        this.roboHelpId = roboHelpId;
    }

    public String getDefaultNote() {
        return defaultNote;
    }

    public void setDefaultNote(final String defaultNote) {
        this.defaultNote = defaultNote;
    }

    public String getType() {
        return type;
    }

    public void setType(final String type) {
        this.type = type;
    }

    public String getLocale() {
        return locale;
    }

    public void setLocale(final String locale) {
        this.locale = locale;
    }

    public PermissionView getPermission() {
        return permission;
    }

    public void setPermission(final PermissionView permission) {
        this.permission = permission;
    }

    public List<WrapUpCodeCategoryView> getCategories() {
        return categories;
    }

    public void setCategories(final List<WrapUpCodeCategoryView> categories) {
        this.categories = categories;
    }

    public List<String> getSessionTypes() {
        return sessionTypes;
    }

    public void setSessionTypes(List<String> sessionTypes) {
        this.sessionTypes = sessionTypes;
    }
}
