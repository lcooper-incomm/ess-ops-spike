package com.incomm.cca.model.domain.session;

import com.incomm.cscore.mvcutils.model.CrudEntity;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "encor_component")
public class EncorComponent implements CrudEntity<Long> {

    private Long id;
    private Session session;
    private String priority;
    private String customerId;
    private String orderId;
    private Long issueType;
    private Long complaintType;

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

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public Long getIssueType() {
        return issueType;
    }

    public void setIssueType(Long issueType) {
        this.issueType = issueType;
    }

    public Long getComplaintType() {
        return complaintType;
    }

    public void setComplaintType(Long complaintType) {
        this.complaintType = complaintType;
    }

    @Override
    public void validate() throws IllegalArgumentException {
        if (session == null) {
            throw new IllegalArgumentException("EncorComponent must be associated to a Session");
        }
    }
}
