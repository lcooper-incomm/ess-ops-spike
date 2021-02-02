package com.incomm.cca.model.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cca.model.domain.auth.Group;
import com.incomm.cca.model.domain.auth.Role;
import com.incomm.cca.security.LDAPUserDetails;
import com.incomm.minion.model.scheduler.Owner;
import org.apache.commons.lang3.StringUtils;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;
import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "cca_user")
@JsonIgnoreProperties(ignoreUnknown = true)
public class User extends AuditableEntity implements Serializable {

    private Long id;
    private Boolean active;
    private String company;
    private String department;
    private String displayName;
    private String email;
    private String employeeId;
    private String firstName;
    private Boolean isMigrated = false;
    private Boolean isSystemAdministrator;
    private Date lastLoginDate;
    private String lastName;
    private String mobile;
    private String phone;
    private String prefDefaultBolPartner;
    private String prefDefaultDataSource;
    private String prefDefaultLandingPage;
    private Partner prefDefaultPartner;
    private Partner prefDefaultCclPartner;
    private Long prefDefaultSearchTypeId;
    private String prefDefaultSessionType;
    private String prefDockMode;
    private Boolean prefDontShowWhatsNew = false;
    private Boolean prefShowBillableOnly;
    private String prefSummaryMode;
    private String title;
    private String username;
    private Set<Group> groups = new HashSet<>();
    private Set<Role> adminOfRoles = new HashSet<>();
    private Set<Role> memberOfRoles = new HashSet<>();
    private Set<Team> teams = new HashSet<>();

    public User() {
    }

    public User(LDAPUserDetails userDetails) {
        this.username = userDetails.getUsername()
                                   .toLowerCase();
        this.firstName = userDetails.getFirstName();
        this.lastName = userDetails.getLastName();
        this.email = userDetails.getEmail();
        this.active = false;
        this.company = userDetails.getCompany();
        this.department = userDetails.getDepartment();
        this.employeeId = userDetails.getEmployeeId();
        this.title = userDetails.getTitle();
        this.displayName = userDetails.getDisplayName();
        this.mobile = userDetails.getMobile();
        this.phone = userDetails.getPhone();
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    @Temporal(TemporalType.TIMESTAMP)
    public Date getLastLoginDate() {
        return lastLoginDate;
    }

    public void setLastLoginDate(final Date lastLoginDate) {
        this.lastLoginDate = lastLoginDate;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Boolean getPrefShowBillableOnly() {
        return prefShowBillableOnly;
    }

    public void setPrefShowBillableOnly(Boolean prefShowBillableOnly) {
        this.prefShowBillableOnly = prefShowBillableOnly;
    }

    public String getPrefDefaultDataSource() {
        return prefDefaultDataSource;
    }

    public void setPrefDefaultDataSource(String prefDefaultDataSource) {
        this.prefDefaultDataSource = prefDefaultDataSource;
    }

    public Long getPrefDefaultSearchTypeId() {
        return prefDefaultSearchTypeId;
    }

    public void setPrefDefaultSearchTypeId(final Long prefDefaultSearchTypeId) {
        this.prefDefaultSearchTypeId = prefDefaultSearchTypeId;
    }

    public String getPrefDockMode() {
        return prefDockMode;
    }

    public void setPrefDockMode(String prefDockMode) {
        this.prefDockMode = prefDockMode;
    }

    public String getPrefSummaryMode() {
        return prefSummaryMode;
    }

    public void setPrefSummaryMode(String prefSummaryMode) {
        this.prefSummaryMode = prefSummaryMode;
    }

    @ManyToMany(mappedBy = "owners")
    public Set<Group> getGroups() {
        return groups;
    }

    public void setGroups(Set<Group> groups) {
        this.groups = groups;
    }

    @ManyToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST}, mappedBy = "admins")
    public Set<Role> getAdminOfRoles() {
        return adminOfRoles;
    }

    public void setAdminOfRoles(Set<Role> adminOfRoles) {
        this.adminOfRoles = adminOfRoles;
    }

    @ManyToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST}, mappedBy = "members")
    public Set<Role> getMemberOfRoles() {
        return memberOfRoles;
    }

    public void setMemberOfRoles(Set<Role> memberOfRoles) {
        this.memberOfRoles = memberOfRoles;
    }

    @OneToOne
    @JoinColumn(name = "default_partner_id")
    public Partner getPrefDefaultPartner() {
        return prefDefaultPartner;
    }

    public void setPrefDefaultPartner(Partner prefDefaultPartner) {
        this.prefDefaultPartner = prefDefaultPartner;
    }

    @OneToOne
    @JoinColumn(name = "pref_default_ccl_partner_id")
    public Partner getPrefDefaultCclPartner() {
        return prefDefaultCclPartner;
    }

    public void setPrefDefaultCclPartner(final Partner prefDefaultCclPartner) {
        this.prefDefaultCclPartner = prefDefaultCclPartner;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPrefDefaultLandingPage() {
        return prefDefaultLandingPage;
    }

    public void setPrefDefaultLandingPage(final String prefDefaultLandingPage) {
        this.prefDefaultLandingPage = prefDefaultLandingPage;
    }

    public String getPrefDefaultSessionType() {
        return prefDefaultSessionType;
    }

    public void setPrefDefaultSessionType(final String prefDefaultSessionType) {
        this.prefDefaultSessionType = prefDefaultSessionType;
    }

    public Boolean getPrefDontShowWhatsNew() {
        return prefDontShowWhatsNew;
    }

    public void setPrefDontShowWhatsNew(final Boolean prefDontShowWhatsNew) {
        this.prefDontShowWhatsNew = prefDontShowWhatsNew;
    }

    @ManyToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST}, mappedBy = "members")
    public Set<Team> getTeams() {
        return teams;
    }

    public void setTeams(final Set<Team> teams) {
        this.teams = teams;
    }

    public String getPrefDefaultBolPartner() {
        return prefDefaultBolPartner;
    }

    public void setPrefDefaultBolPartner(final String prefDefaultBolPartner) {
        this.prefDefaultBolPartner = prefDefaultBolPartner;
    }

    @Transient
    public Boolean getSystemAdministrator() {
        return isSystemAdministrator;
    }

    public void setSystemAdministrator(Boolean systemAdministrator) {
        isSystemAdministrator = systemAdministrator;
    }

    public Boolean getIsMigrated() {
        return isMigrated;
    }

    public void setIsMigrated(final Boolean migrated) {
        isMigrated = migrated;
    }

    public Owner toMinionOwner() {
        Owner owner = new Owner();
        owner.setUsername(this.username);
        owner.setName(this.displayName);
        owner.setEmailAddress(this.email);
        return owner;
    }

    public boolean needsUpdating(LDAPUserDetails userDetails) {
        return fieldNeedsUpdating(this.firstName, userDetails.getFirstName())
                || fieldNeedsUpdating(this.lastName, userDetails.getLastName())
                || fieldNeedsUpdating(this.email, userDetails.getEmail())
                || fieldNeedsUpdating(this.company, userDetails.getCompany())
                || fieldNeedsUpdating(this.department, userDetails.getDepartment())
                || fieldNeedsUpdating(this.employeeId, userDetails.getEmployeeId())
                || fieldNeedsUpdating(this.title, userDetails.getTitle())
                || fieldNeedsUpdating(this.displayName, userDetails.getDisplayName())
                || fieldNeedsUpdating(this.mobile, userDetails.getMobile())
                || fieldNeedsUpdating(this.phone, userDetails.getPhone());
    }

    private boolean fieldNeedsUpdating(String myField, String theirField) {
        return (StringUtils.isBlank(myField) && StringUtils.isNotBlank(theirField))
                || (StringUtils.isNotBlank(myField) && StringUtils.isBlank(theirField))
                || (myField != null && !myField.equals(theirField));
    }

}
