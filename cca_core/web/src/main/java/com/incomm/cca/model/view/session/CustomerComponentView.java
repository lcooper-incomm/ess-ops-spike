package com.incomm.cca.model.view.session;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cscore.client.model.CsCoreAddress;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class CustomerComponentView implements Serializable {

    private Long id;
    private CsCoreAddress address = new CsCoreAddress();
    private String ani;
    private String callbackTime;
    private String contactMethod;
    private String dateOfBirth;
    private String emailAddress;
    private String firstName;
    private String language;
    private String lastName;
    private String phoneNumber;

    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public CsCoreAddress getAddress() {
        return address;
    }

    public void setAddress(final CsCoreAddress address) {
        this.address = address;
    }

    public String getAni() {
        return ani;
    }

    public void setAni(final String ani) {
        this.ani = ani;
    }

    public String getCallbackTime() {
        return callbackTime;
    }

    public void setCallbackTime(final String callbackTime) {
        this.callbackTime = callbackTime;
    }

    public String getContactMethod() {
        return contactMethod;
    }

    public void setContactMethod(final String contactMethod) {
        this.contactMethod = contactMethod;
    }

    public String getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(final String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(final String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(final String firstName) {
        this.firstName = firstName;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(final String language) {
        this.language = language;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(final String lastName) {
        this.lastName = lastName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(final String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}
