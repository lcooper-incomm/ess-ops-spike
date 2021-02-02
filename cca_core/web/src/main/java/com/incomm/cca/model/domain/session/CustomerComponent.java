package com.incomm.cca.model.domain.session;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.ColumnTransformer;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table
@JsonIgnoreProperties(ignoreUnknown = true)
public class CustomerComponent implements Serializable {

    private Long id;
    private Session session;
    private String firstName;
    private String lastName;
    private String dateOfBirth;
    private String line1;
    private String line2;
    private String city;
    private String state;
    private String postalCode;
    private String phoneNumber;
    private String ani;
    private String callbackTime;
    private String language;
    private String contactMethod;
    private String emailAddress;
    private Date createdDate;
    private Date modifiedDate;

    @PrePersist
    private void prePersist() {
        this.createdDate = new Date();
        this.modifiedDate = new Date();
    }

    @PreUpdate
    private void preUpdate() {
        this.modifiedDate = new Date();
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @JsonIgnore
    @OneToOne(cascade = {CascadeType.MERGE})
    @JoinColumn(name = "session_id")
    public Session getSession() {
        return session;
    }

    public void setSession(Session session) {
        this.session = session;
    }

    @ColumnTransformer(
            read = "CONVERT(VARCHAR(512), DECRYPTBYKEY([first_name]))",
            write = "ENCRYPTBYKEY(KEY_GUID('CCAEncryptionSymmetricKey'),?)"
    )
    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    @ColumnTransformer(
            read = "CONVERT(VARCHAR(512), DECRYPTBYKEY([last_name]))",
            write = "ENCRYPTBYKEY(KEY_GUID('CCAEncryptionSymmetricKey'),?)"
    )
    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    @ColumnTransformer(
            read = "CONVERT(VARCHAR(512), DECRYPTBYKEY([date_of_birth]))",
            write = "ENCRYPTBYKEY(KEY_GUID('CCAEncryptionSymmetricKey'),?)"
    )
    public String getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    @Column(name = "line_1")
    public String getLine1() {
        return line1;
    }

    public void setLine1(String line1) {
        this.line1 = line1;
    }

    @Column(name = "line_2")
    public String getLine2() {
        return line2;
    }

    public void setLine2(String line2) {
        this.line2 = line2;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    @ColumnTransformer(
            read = "CONVERT(VARCHAR(512), DECRYPTBYKEY([phone_number]))",
            write = "ENCRYPTBYKEY(KEY_GUID('CCAEncryptionSymmetricKey'),?)"
    )
    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    @ColumnTransformer(
            read = "CONVERT(VARCHAR(512), DECRYPTBYKEY([ani]))",
            write = "ENCRYPTBYKEY(KEY_GUID('CCAEncryptionSymmetricKey'),?)"
    )
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

    public String getLanguage() {
        return language;
    }

    public void setLanguage(final String language) {
        this.language = language;
    }

    public String getContactMethod() {
        return contactMethod;
    }

    public void setContactMethod(final String contactMethod) {
        this.contactMethod = contactMethod;
    }

    @ColumnTransformer(
            read = "CONVERT(VARCHAR(512), DECRYPTBYKEY([email_address]))",
            write = "ENCRYPTBYKEY(KEY_GUID('CCAEncryptionSymmetricKey'),?)"
    )
    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(final String emailAddress) {
        this.emailAddress = emailAddress;
    }

    @Temporal(TemporalType.TIMESTAMP)
    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(final Date createdDate) {
        this.createdDate = createdDate;
    }

    @Temporal(TemporalType.TIMESTAMP)
    public Date getModifiedDate() {
        return modifiedDate;
    }

    public void setModifiedDate(final Date modifiedDate) {
        this.modifiedDate = modifiedDate;
    }

}
