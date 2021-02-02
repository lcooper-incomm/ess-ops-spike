package com.incomm.cca.model.domain.session;

import com.incomm.cca.model.domain.AuditableEntity;
import com.incomm.cca.model.domain.Identifier;
import com.incomm.cca.model.domain.complaint.Bank;
import com.incomm.cca.model.domain.complaint.ComplaintCategory;
import com.incomm.cca.model.domain.complaint.ComplaintCause;
import com.incomm.cca.model.domain.complaint.ComplaintDepartment;
import com.incomm.cca.model.domain.complaint.ComplaintDiscriminationType;
import com.incomm.cca.model.domain.complaint.ComplaintSource;
import com.incomm.cca.model.domain.complaint.ComplaintType;
import com.incomm.cscore.mvcutils.model.CrudEntity;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;

@Entity
@Table
public class ComplaintComponent extends AuditableEntity implements CrudEntity<Long> {

    private Long id;
    private Session session;
    private Bank bank;
    private ComplaintCategory category;
    private ComplaintCause cause;
    private String compensation;
    private String complaint;
    private ComplaintDepartment department;
    private ComplaintDiscriminationType discriminationType;
    private String enhancementsNeeded;
    private String firstName;
    private Identifier identifier;
    private Boolean isRegulatory = false;
    private Boolean isVerbal = false;
    private Boolean isWritten = false;
    private String lastName;
    private String postalCode;
    private Integer priority;
    private String resolution;
    private ComplaintSource source;
    private String summary;
    private ComplaintType type;
    private String accountNumber;
    private String productName;
    private Date resolutionDate;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Override
    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    @OneToOne(cascade = {CascadeType.MERGE, CascadeType.REFRESH})
    @JoinColumn(name = "session_id")
    public Session getSession() {
        return session;
    }

    public void setSession(final Session session) {
        this.session = session;
    }

    @OneToOne(cascade = {CascadeType.MERGE})
    @JoinColumn(name = "bank_id")
    public Bank getBank() {
        return bank;
    }

    public void setBank(final Bank bank) {
        this.bank = bank;
    }

    @OneToOne(cascade = {CascadeType.MERGE})
    @JoinColumn(name = "category_id")
    public ComplaintCategory getCategory() {
        return category;
    }

    public void setCategory(final ComplaintCategory category) {
        this.category = category;
    }

    @OneToOne(cascade = {CascadeType.MERGE})
    @JoinColumn(name = "cause_id")
    public ComplaintCause getCause() {
        return cause;
    }

    public void setCause(final ComplaintCause cause) {
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

    @OneToOne(cascade = {CascadeType.MERGE})
    @JoinColumn(name = "department_id")
    public ComplaintDepartment getDepartment() {
        return department;
    }

    public void setDepartment(final ComplaintDepartment department) {
        this.department = department;
    }

    @OneToOne(cascade = {CascadeType.MERGE})
    @JoinColumn(name = "discrimination_type_id")
    public ComplaintDiscriminationType getDiscriminationType() {
        return discriminationType;
    }

    public void setDiscriminationType(final ComplaintDiscriminationType discriminationType) {
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

    @OneToOne(cascade = {CascadeType.MERGE})
    @JoinColumn(name = "identifier_id")
    public Identifier getIdentifier() {
        return identifier;
    }

    public void setIdentifier(final Identifier identifier) {
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

    @OneToOne(cascade = {CascadeType.MERGE})
    @JoinColumn(name = "source_id")
    public ComplaintSource getSource() {
        return source;
    }

    public void setSource(final ComplaintSource source) {
        this.source = source;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summaryComplaint) {
        this.summary = summaryComplaint;
    }

    @OneToOne(cascade = {CascadeType.MERGE})
    @JoinColumn(name = "type_id")
    public ComplaintType getType() {
        return type;
    }

    public void setType(final ComplaintType type) {
        this.type = type;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(final String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    @Temporal(TemporalType.TIMESTAMP)
    public Date getResolutionDate() {
        return resolutionDate;
    }

    public void setResolutionDate(Date resolutionDate) {
        this.resolutionDate = resolutionDate;
    }

    @Override
    public void validate() throws IllegalArgumentException {
        if (session == null) {
            throw new IllegalArgumentException("ComplaintComponent must be associated to a Session");
        }
    }
}
