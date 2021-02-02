package com.incomm.cca.model.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cca.model.domain.auth.Permission;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "session_queue")
@JsonIgnoreProperties(ignoreUnknown = true)
public class SessionQueue implements Serializable {

    private Long id;
    private Boolean active;
    private Boolean autoclose;
    private Long autoWrapTime;
    private String defaultNote;
    private String displayName;
    private String i3Name;
    private Boolean isLocked = false;
    private String locale;
    private Long robohelpId;
    private String systemName;
    private String type;
    private Permission permission;
    private List<SessionQueueSessionType> sessionTypes = new ArrayList<>();
    private List<WrapUpCodeCategory> wrapUpCodeCategories = new ArrayList<>();

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Column(name = "i3_name")
    public String getI3Name() {
        return i3Name;
    }

    public void setI3Name(String i3Name) {
        this.i3Name = i3Name;
    }

    public String getSystemName() {
        return systemName;
    }

    public void setSystemName(String systemName) {
        this.systemName = systemName;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Boolean getAutoclose() {
        return autoclose;
    }

    public void setAutoclose(Boolean autoclose) {
        this.autoclose = autoclose;
    }

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "queue_wrap_up_code_category",
            joinColumns = @JoinColumn(name = "queue_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "wrap_up_code_category_id", referencedColumnName = "id")
    )
    public List<WrapUpCodeCategory> getWrapUpCodeCategories() {
        return wrapUpCodeCategories;
    }

    public void setWrapUpCodeCategories(List<WrapUpCodeCategory> wrapUpCodeCategories) {
        this.wrapUpCodeCategories = wrapUpCodeCategories;
    }

    public Long getRobohelpId() {
        return robohelpId;
    }

    public void setRobohelpId(Long robohelpId) {
        this.robohelpId = robohelpId;
    }

    @Column(name = "autowrap_time")
    public Long getAutoWrapTime() {
        return autoWrapTime;
    }

    public void setAutoWrapTime(Long autoWrapTime) {
        this.autoWrapTime = autoWrapTime;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getDefaultNote() {
        return defaultNote;
    }

    public void setDefaultNote(String defaultNote) {
        this.defaultNote = defaultNote;
    }

    public String getType() {
        return type;
    }

    public void setType(String selectionType) {
        this.type = selectionType;
    }

    public String getLocale() {
        return locale;
    }

    public void setLocale(String locale) {
        this.locale = locale;
    }

    public Boolean getIsLocked() {
        return isLocked;
    }

    public void setIsLocked(final Boolean locked) {
        isLocked = locked;
    }

    @ManyToOne
    @JoinColumn(name = "permission_id")
    public Permission getPermission() {
        return permission;
    }

    public void setPermission(Permission permission) {
        this.permission = permission;
    }

    @OneToMany(mappedBy = "sessionQueue", cascade = {CascadeType.ALL}, orphanRemoval = true)
    public List<SessionQueueSessionType> getSessionTypes() {
        return sessionTypes;
    }

    public void setSessionTypes(final List<SessionQueueSessionType> sessionTypes) {
        this.sessionTypes = sessionTypes;
    }

    @Override
    public String toString() {
        return "Queue{" +
                "permission=" + permission +
                ", locale=" + locale +
                ", type=" + type +
                ", defaultNote='" + defaultNote + '\'' +
                ", robohelpId=" + robohelpId +
                ", i3Name='" + i3Name + '\'' +
                ", systemName='" + systemName + '\'' +
                ", displayName='" + displayName + '\'' +
                ", autoWrapTime=" + autoWrapTime +
                ", autoclose=" + autoclose +
                ", active=" + active +
                ", id=" + id +
                '}';
    }

}
