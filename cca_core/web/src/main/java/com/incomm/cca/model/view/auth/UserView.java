package com.incomm.cca.model.view.auth;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cca.model.view.TeamView;
import com.incomm.cca.model.view.session.selection.PartnerView;
import com.incomm.cscore.client.model.CsCorePhoneNumber;
import com.incomm.cscore.client.model.CsCoreTimestamp;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class UserView implements Serializable {

    private Long id;
    private Boolean isActive = false;
    private String company;
    private String department;
    private String displayName;
    private String email;
    private String employeeId;
    private Boolean isSystemAdministrator = false;
    private CsCoreTimestamp lastLoginDate;
    private String firstName;
    private String lastName;
    private CsCorePhoneNumber mobile;
    private CsCorePhoneNumber phone;
    private String title;
    private String username;
    private String prefDefaultBolPartner;
    private String prefDefaultDataSource;
    private PartnerView prefDefaultPartner;
    private PartnerView prefDefaultCclPartner;
    private String prefDefaultLandingPage;
    private Long prefDefaultSearchTypeId;
    private String prefDefaultSessionType;
    private String prefDockMode;
    private Boolean prefDontShowWhatsNew = false;
    private Boolean prefShowBillableOnly = false;
    private String prefSummaryMode;
    private List<GroupView> groups = new ArrayList<>();
    private List<PermissionView> permissions = new ArrayList<>();
    private List<RoleView> roles = new ArrayList<>();
    private List<TeamView> teams = new ArrayList<>();

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

    public String getCompany() {
        return company;
    }

    public void setCompany(final String company) {
        this.company = company;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(final String department) {
        this.department = department;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(final String displayName) {
        this.displayName = displayName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(final String email) {
        this.email = email;
    }

    public String getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(final String employeeId) {
        this.employeeId = employeeId;
    }

    public Boolean getIsSystemAdministrator() {
        return isSystemAdministrator;
    }

    public void setIsSystemAdministrator(final Boolean systemAdministrator) {
        isSystemAdministrator = systemAdministrator;
    }

    public CsCoreTimestamp getLastLoginDate() {
        return lastLoginDate;
    }

    public void setLastLoginDate(final CsCoreTimestamp lastLoginDate) {
        this.lastLoginDate = lastLoginDate;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(final String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(final String lastName) {
        this.lastName = lastName;
    }

    public CsCorePhoneNumber getMobile() {
        return mobile;
    }

    public void setMobile(final CsCorePhoneNumber mobile) {
        this.mobile = mobile;
    }

    public CsCorePhoneNumber getPhone() {
        return phone;
    }

    public void setPhone(final CsCorePhoneNumber phone) {
        this.phone = phone;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(final String title) {
        this.title = title;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(final String username) {
        this.username = username;
    }

    public String getPrefDefaultDataSource() {
        return prefDefaultDataSource;
    }

    public void setPrefDefaultDataSource(final String prefDefaultDataSource) {
        this.prefDefaultDataSource = prefDefaultDataSource;
    }

    public PartnerView getPrefDefaultPartner() {
        return prefDefaultPartner;
    }

    public void setPrefDefaultPartner(final PartnerView prefDefaultPartner) {
        this.prefDefaultPartner = prefDefaultPartner;
    }

    public PartnerView getPrefDefaultCclPartner() {
        return prefDefaultCclPartner;
    }

    public void setPrefDefaultCclPartner(final PartnerView prefDefaultCclPartner) {
        this.prefDefaultCclPartner = prefDefaultCclPartner;
    }

    public Long getPrefDefaultSearchTypeId() {
        return prefDefaultSearchTypeId;
    }

    public void setPrefDefaultSearchTypeId(final Long prefDefaultSearchTypeId) {
        this.prefDefaultSearchTypeId = prefDefaultSearchTypeId;
    }

    public String getPrefDefaultSessionType() {
        return prefDefaultSessionType;
    }

    public void setPrefDefaultSessionType(final String prefDefaultSessionType) {
        this.prefDefaultSessionType = prefDefaultSessionType;
    }

    public String getPrefDockMode() {
        return prefDockMode;
    }

    public void setPrefDockMode(final String prefDockMode) {
        this.prefDockMode = prefDockMode;
    }

    public Boolean getPrefDontShowWhatsNew() {
        return prefDontShowWhatsNew;
    }

    public void setPrefDontShowWhatsNew(final Boolean prefDontShowWhatsNew) {
        this.prefDontShowWhatsNew = prefDontShowWhatsNew;
    }

    public Boolean getPrefShowBillableOnly() {
        return prefShowBillableOnly;
    }

    public void setPrefShowBillableOnly(final Boolean prefShowBillableOnly) {
        this.prefShowBillableOnly = prefShowBillableOnly;
    }

    public String getPrefSummaryMode() {
        return prefSummaryMode;
    }

    public void setPrefSummaryMode(final String prefSummaryMode) {
        this.prefSummaryMode = prefSummaryMode;
    }

    public Boolean getActive() {
        return isActive;
    }

    public void setActive(final Boolean active) {
        isActive = active;
    }

    public Boolean getSystemAdministrator() {
        return isSystemAdministrator;
    }

    public void setSystemAdministrator(final Boolean systemAdministrator) {
        isSystemAdministrator = systemAdministrator;
    }

    public List<GroupView> getGroups() {
        return groups;
    }

    public void setGroups(final List<GroupView> groups) {
        this.groups = groups;
    }

    public List<PermissionView> getPermissions() {
        return permissions;
    }

    public void setPermissions(final List<PermissionView> permissions) {
        this.permissions = permissions;
    }

    public List<RoleView> getRoles() {
        return roles;
    }

    public void setRoles(final List<RoleView> roles) {
        this.roles = roles;
    }

    public List<TeamView> getTeams() {
        return teams;
    }

    public void setTeams(final List<TeamView> teams) {
        this.teams = teams;
    }

    public String getPrefDefaultBolPartner() {
        return prefDefaultBolPartner;
    }

    public void setPrefDefaultBolPartner(final String prefDefaultBolPartner) {
        this.prefDefaultBolPartner = prefDefaultBolPartner;
    }

    public String getPrefDefaultLandingPage() {
        return prefDefaultLandingPage;
    }

    public void setPrefDefaultLandingPage(final String prefDefaultLandingPage) {
        this.prefDefaultLandingPage = prefDefaultLandingPage;
    }
}
