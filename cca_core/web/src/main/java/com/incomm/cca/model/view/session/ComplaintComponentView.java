package com.incomm.cca.model.view.session;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cca.model.view.auth.UserView;
import com.incomm.cca.model.view.complaint.BankView;
import com.incomm.cca.model.view.complaint.ComplaintOptionView;
import com.incomm.cca.model.view.session.selection.IdentifierView;
import com.incomm.cscore.client.model.CsCoreTimestamp;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ComplaintComponentView implements Serializable {

    private Long id;
    private BankView bank;
    private ComplaintOptionView category;
    private ComplaintOptionView cause;
    private String compensation;
    private String complaint;
    private UserView createdBy;
    private CsCoreTimestamp createdDate;
    private ComplaintOptionView department;
    private ComplaintOptionView discriminationType;
    private String enhancementsNeeded;
    private String firstName;
    private IdentifierView identifier;
    private Boolean isRegulatory = false;
    private Boolean isVerbal = false;
    private Boolean isWritten = false;
    private String lastName;
    private UserView modifiedBy;
    private CsCoreTimestamp modifiedDate;
    private String postalCode;
    private Integer priority;
    private String resolution;
    private ComplaintOptionView source;
    private String summary;
    private ComplaintOptionView type;
    private String accountNumber;
    private CsCoreTimestamp resolutionDate;

    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public BankView getBank() {
        return bank;
    }

    public void setBank(final BankView bank) {
        this.bank = bank;
    }

    public ComplaintOptionView getCategory() {
        return category;
    }

    public void setCategory(final ComplaintOptionView category) {
        this.category = category;
    }

    public ComplaintOptionView getCause() {
        return cause;
    }

    public void setCause(final ComplaintOptionView cause) {
        this.cause = cause;
    }

    public String getCompensation() {
        return compensation;
    }

    public void setCompensation(final String compensation) {
        this.compensation = compensation;
    }

    public String getComplaint() {
        return complaint;
    }

    public void setComplaint(final String complaint) {
        this.complaint = complaint;
    }

    public UserView getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(final UserView createdBy) {
        this.createdBy = createdBy;
    }

    public CsCoreTimestamp getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(final CsCoreTimestamp createdDate) {
        this.createdDate = createdDate;
    }

    public ComplaintOptionView getDepartment() {
        return department;
    }

    public void setDepartment(final ComplaintOptionView department) {
        this.department = department;
    }

    public ComplaintOptionView getDiscriminationType() {
        return discriminationType;
    }

    public void setDiscriminationType(final ComplaintOptionView discriminationType) {
        this.discriminationType = discriminationType;
    }

    public String getEnhancementsNeeded() {
        return enhancementsNeeded;
    }

    public void setEnhancementsNeeded(final String enhancementsNeeded) {
        this.enhancementsNeeded = enhancementsNeeded;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(final String firstName) {
        this.firstName = firstName;
    }

    public IdentifierView getIdentifier() {
        return identifier;
    }

    public void setIdentifier(final IdentifierView identifier) {
        this.identifier = identifier;
    }

    public Boolean getIsRegulatory() {
        return isRegulatory;
    }

    public void setIsRegulatory(final Boolean regulatory) {
        isRegulatory = regulatory;
    }

    public Boolean getIsVerbal() {
        return isVerbal;
    }

    public void setIsVerbal(final Boolean verbal) {
        isVerbal = verbal;
    }

    public Boolean getIsWritten() {
        return isWritten;
    }

    public void setIsWritten(final Boolean written) {
        isWritten = written;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(final String lastName) {
        this.lastName = lastName;
    }

    public UserView getModifiedBy() {
        return modifiedBy;
    }

    public void setModifiedBy(final UserView modifiedBy) {
        this.modifiedBy = modifiedBy;
    }

    public CsCoreTimestamp getModifiedDate() {
        return modifiedDate;
    }

    public void setModifiedDate(final CsCoreTimestamp modifiedDate) {
        this.modifiedDate = modifiedDate;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(final String postalCode) {
        this.postalCode = postalCode;
    }

    public Integer getPriority() {
        return priority;
    }

    public void setPriority(Integer priority) {
        this.priority = priority;
    }

    public String getResolution() {
        return resolution;
    }

    public void setResolution(final String resolution) {
        this.resolution = resolution;
    }

    public ComplaintOptionView getSource() {
        return source;
    }

    public void setSource(final ComplaintOptionView source) {
        this.source = source;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public ComplaintOptionView getType() {
        return type;
    }

    public void setType(final ComplaintOptionView type) {
        this.type = type;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public CsCoreTimestamp getResolutionDate() {
        return resolutionDate;
    }

    public void setResolutionDate(CsCoreTimestamp resolutionDate) {
        this.resolutionDate = resolutionDate;
    }
}
