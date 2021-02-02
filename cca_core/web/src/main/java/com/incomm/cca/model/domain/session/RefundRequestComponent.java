package com.incomm.cca.model.domain.session;

import org.hibernate.annotations.ColumnTransformer;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table
public class RefundRequestComponent implements Serializable {

    private Long id;
    private Session session;
    private String amount;
    private String name;
    private String line1;
    private String line2;
    private String city;
    private String state;
    private String postalCode;
    private String ani;
    private Date requestedDate;
    private Date approvedDate;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    @OneToOne(cascade = {CascadeType.MERGE})
    @JoinColumn(name = "session_id")
    public Session getSession() {
        return session;
    }

    public void setSession(final Session session) {
        this.session = session;
    }

    public String getAmount() {
        return amount;
    }

    public void setAmount(final String amount) {
        this.amount = amount;
    }

    @ColumnTransformer(
            read = "CONVERT(VARCHAR(512), DECRYPTBYKEY([name]))",
            write = "ENCRYPTBYKEY(KEY_GUID('CCAEncryptionSymmetricKey'),?)"
    )
    public String getName() {
        return name;
    }

    public void setName(final String name) {
        this.name = name;
    }

    @Column(name = "line_1")
    public String getLine1() {
        return line1;
    }

    public void setLine1(final String line1) {
        this.line1 = line1;
    }

    @Column(name = "line_2")
    public String getLine2() {
        return line2;
    }

    public void setLine2(final String line2) {
        this.line2 = line2;
    }

    public String getCity() {
        return city;
    }

    public void setCity(final String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(final String state) {
        this.state = state;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(final String postalCode) {
        this.postalCode = postalCode;
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

    @Temporal(TemporalType.TIMESTAMP)
    public Date getRequestedDate() {
        return requestedDate;
    }

    public void setRequestedDate(final Date requestedDate) {
        this.requestedDate = requestedDate;
    }

    @Temporal(TemporalType.TIMESTAMP)
    public Date getApprovedDate() {
        return approvedDate;
    }

    public void setApprovedDate(final Date approvedDate) {
        this.approvedDate = approvedDate;
    }
}
