package com.incomm.cca.security;

import com.incomm.cscore.auth.search.AuthProfile;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;

public class LDAPUserDetails implements UserDetails {

    private String username;
    private String company;
    private String department;
    private String employeeId;
    private String title;
    private String displayName;
    private String firstName;
    private String lastName;
    private String mobile;
    private String phone;
    private String email;
    private Boolean isActive = false;
    private Boolean isSystemAdministrator = false;
    private Collection<SimpleGrantedAuthority> simpleAuthorities = new ArrayList<>();

    public LDAPUserDetails() {
    }

    public LDAPUserDetails(AuthProfile profile) {
        this.username = profile.getUsername();
        this.company = profile.getCompany();
        this.department = profile.getDepartment();
        this.employeeId = profile.getEmployeeId();
        this.title = profile.getTitle();
        this.displayName = profile.getDisplayName();
        this.firstName = profile.getFirstName();
        this.lastName = profile.getLastName();
        this.mobile = profile.getMobile();
        this.phone = profile.getPhone();
        this.email = profile.getEmail();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return simpleAuthorities;
    }

    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return isActive;
    }

    public void setUsername(final String username) {
        this.username = username;
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

    public String getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(final String employeeId) {
        this.employeeId = employeeId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(final String title) {
        this.title = title;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(final String displayName) {
        this.displayName = displayName;
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

    public String getMobile() {
        return mobile;
    }

    public void setMobile(final String mobile) {
        this.mobile = mobile;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(final String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(final String email) {
        this.email = email;
    }

    public Boolean getActive() {
        return isActive;
    }

    public void setActive(final Boolean active) {
        isActive = active;
    }

    public Collection<SimpleGrantedAuthority> getSimpleAuthorities() {
        return simpleAuthorities;
    }

    public void setSimpleAuthorities(final Collection<SimpleGrantedAuthority> simpleAuthorities) {
        this.simpleAuthorities = simpleAuthorities;
    }

    public Boolean getIsSystemAdministrator() {
        return isSystemAdministrator;
    }

    public void setIsSystemAdministrator(final Boolean systemAdministrator) {
        isSystemAdministrator = systemAdministrator;
    }

    @Override
    public String toString() {
        return "LDAPUserDetails{" +
                "username='" + username + '\'' +
                ", company='" + company + '\'' +
                ", department='" + department + '\'' +
                ", employeeId='" + employeeId + '\'' +
                ", title='" + title + '\'' +
                ", displayName='" + displayName + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", mobile='" + mobile + '\'' +
                ", phone='" + phone + '\'' +
                ", email='" + email + '\'' +
                ", isActive=" + isActive +
                ", isSystemAdministrator=" + isSystemAdministrator +
                '}';
    }
}
