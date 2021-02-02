package com.incomm.cca.model.domain.session;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cca.model.view.i3.IVRCallDetailView;
import com.incomm.cscore.client.apls.constant.AplsPlatform;
import com.incomm.cscore.client.maples.constant.MaplesPlatform;
import org.apache.commons.lang3.StringUtils;
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
import javax.persistence.Transient;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table
@JsonIgnoreProperties(ignoreUnknown = true)
public class CallComponent implements Serializable {

    private Long id;
    private Date createdDate;
	private Date modifiedDate;
    private String callerName;
    private String callbackNumber;
    private String uid;
    private String dnis;
    private String ani;
    private String originalDnis;
    private String originalAni;
    private String lastFour;
    private String proxyNumber;
    private String platform;
    private Session session;
    private String callId;
    private String callIdKey;
    private Date connectedDate;
    private Date disconnectedDate;
    private String disconnectType;
    private String serialNumber;
    private String pin;
    private String van;
    private String ivrRemoteAddress;
    private String accountNumber;
    private String orderNumber;
    private String accountId;
    private Boolean isCardVerified;
    private Boolean isDateOfBirthVerified;
    private Boolean isLastFourSsnVerified;

	@PrePersist
	private void prePersist() {
		this.createdDate = new Date();
		this.modifiedDate = new Date();
	}

	@PreUpdate
	private void preUpdate() {
		this.modifiedDate = new Date();
	}

    public CallComponent() {
        this.createdDate = new Date();
    }

    public CallComponent(Session session) {
        this();
        this.session = session;
    }

    public CallComponent(Session session, IVRCallDetailView ivrCallDetailView, String ivrRemoteAddress) {
        this();
        this.session = session;
        this.uid = ivrCallDetailView.getUid();
        this.dnis = ivrCallDetailView.getDnis();
        this.ani = ivrCallDetailView.getAni();
        this.originalAni = ivrCallDetailView.getAni();
        this.originalDnis = ivrCallDetailView.getDnis();
        this.proxyNumber = ivrCallDetailView.getProxyNumber();
        this.serialNumber = ivrCallDetailView.getSerialNumber();
        this.pin = ivrCallDetailView.getPin();
        this.van = ivrCallDetailView.getVan16();
        this.ivrRemoteAddress = ivrRemoteAddress;
        this.accountId = ivrCallDetailView.getAccountId();
        this.isCardVerified = ivrCallDetailView.getIsCardVerified();
        this.isDateOfBirthVerified = ivrCallDetailView.getIsDateOfBirthVerified();
        this.isLastFourSsnVerified = ivrCallDetailView.getIsLastFourSsnVerified();

        if (StringUtils.isNotBlank(ivrCallDetailView.getPlatform())) {
            if(ivrCallDetailView.getPlatform().equalsIgnoreCase(MaplesPlatform.SERVE.toString())){
                MaplesPlatform maplesPlatform = MaplesPlatform.convert(ivrCallDetailView.getPlatform());
                this.platform = maplesPlatform.toString();
            } else {
                AplsPlatform aplsPlatform = AplsPlatform.convert(ivrCallDetailView.getPlatform());
                this.platform = aplsPlatform.toString();
            }
        } else {
            this.platform = AplsPlatform.INCOMM.toString();
        }

        //Only save the lastFour if it actually is 4 digits to protect downstream functionality
        if (StringUtils.isNotBlank(ivrCallDetailView.getLastFour()) && ivrCallDetailView.getLastFour()
                                                                                        .length() == 4) {
            this.lastFour = ivrCallDetailView.getLastFour();
        }
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Temporal(TemporalType.TIMESTAMP)
    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

	@Temporal(TemporalType.TIMESTAMP)
	public Date getModifiedDate() {
		return modifiedDate;
	}

	public void setModifiedDate(Date modifiedDate) {
		this.modifiedDate = modifiedDate;
	}

    @Column(name = "encrypted_caller_name")
    @ColumnTransformer(
            read = "CONVERT(VARCHAR(512), DECRYPTBYKEY([encrypted_caller_name]))",
            write = "ENCRYPTBYKEY(KEY_GUID('CCAEncryptionSymmetricKey'),?)"
    )
    public String getCallerName() {
        return callerName;
    }

    public void setCallerName(String callerName) {
        this.callerName = callerName;
    }

    @Column(name = "encrypted_callback_number")
    @ColumnTransformer(
            read = "CONVERT(VARCHAR(512), DECRYPTBYKEY([encrypted_callback_number]))",
            write = "ENCRYPTBYKEY(KEY_GUID('CCAEncryptionSymmetricKey'),?)"
    )
    public String getCallbackNumber() {
        return callbackNumber;
    }

    public void setCallbackNumber(String callbackNumber) {
        this.callbackNumber = callbackNumber;
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getDnis() {
        return dnis;
    }

    public void setDnis(String dnis) {
        this.dnis = dnis;
    }

    @ColumnTransformer(
            read = "CONVERT(VARCHAR(512), DECRYPTBYKEY([ani]))",
            write = "ENCRYPTBYKEY(KEY_GUID('CCAEncryptionSymmetricKey'),?)"
    )
    public String getAni() {
        return ani;
    }

    public void setAni(String ani) {
        this.ani = ani;
    }

    public String getOriginalDnis() {
        return originalDnis;
    }

    public void setOriginalDnis(String originalDnis) {
        this.originalDnis = originalDnis;
    }

    public String getOriginalAni() {
        return originalAni;
    }

    public void setOriginalAni(String originalAni) {
        this.originalAni = originalAni;
    }

    public String getLastFour() {
        return lastFour;
    }

    public void setLastFour(final String lastFour) {
        this.lastFour = lastFour;
    }

    public String getProxyNumber() {
        return proxyNumber;
    }

    public void setProxyNumber(String proxyNumber) {
        this.proxyNumber = proxyNumber;
    }

    public String getPlatform() {
        return platform;
    }

    public void setPlatform(String platform) {
        this.platform = platform;
    }

    @OneToOne(cascade = {CascadeType.MERGE})
    @JoinColumn(name = "session_id")
    public Session getSession() {
        return session;
    }

    public void setSession(Session session) {
        this.session = session;
    }

    public String getCallId() {
        return callId;
    }

    public void setCallId(String callId) {
        this.callId = callId;
    }

    @Temporal(TemporalType.TIMESTAMP)
    public Date getConnectedDate() {
        return connectedDate;
    }

    public void setConnectedDate(Date connectedDate) {
        this.connectedDate = connectedDate;
    }

    @Temporal(TemporalType.TIMESTAMP)
    public Date getDisconnectedDate() {
        return disconnectedDate;
    }

    public void setDisconnectedDate(Date disconnectedDate) {
        this.disconnectedDate = disconnectedDate;
    }

    public String getCallIdKey() {
        return callIdKey;
    }

    public void setCallIdKey(String callIdKey) {
        this.callIdKey = callIdKey;
    }

    public String getDisconnectType() {
        return disconnectType;
    }

    public void setDisconnectType(String disconnectType) {
        this.disconnectType = disconnectType;
    }

    public String getSerialNumber() {
        return serialNumber;
    }

    public void setSerialNumber(String serialNumber) {
        this.serialNumber = serialNumber;
    }

    public String getPin() {
        return pin;
    }

    public void setPin(String pin) {
        this.pin = pin;
    }

    @Column(name = "van16")
    public String getVan() {
        return van;
    }

    public void setVan(String van) {
        this.van = van;
    }

    public String getIvrRemoteAddress() {
        return ivrRemoteAddress;
    }

    public void setIvrRemoteAddress(final String ivrRemoteAddress) {
        this.ivrRemoteAddress = ivrRemoteAddress;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(final String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(final String orderNumber) {
        this.orderNumber = orderNumber;
    }

    public String getAccountId() {
        return accountId;
    }

    public void setAccountId(String accountId) {
        this.accountId = accountId;
    }

    @Column(name = "is_card_verified")
    public Boolean getIsCardVerified() {
        return isCardVerified;
    }

    public void setIsCardVerified(Boolean isCardVerified) {
        this.isCardVerified = isCardVerified;
    }

    @Column(name = "is_date_of_birth_verified")
    public Boolean getIsDateOfBirthVerified() {
        return isDateOfBirthVerified;
    }

    public void setIsDateOfBirthVerified(Boolean isDateOfBirthVerified) {
        this.isDateOfBirthVerified = isDateOfBirthVerified;
    }

    @Column(name = "is_last_four_ssn_verified")
    public Boolean getIsLastFourSsnVerified() {
        return isLastFourSsnVerified;
    }

    public void setIsLastFourSsnVerified(Boolean isLastFourSsnVerified) {
        this.isLastFourSsnVerified = isLastFourSsnVerified;
    }

    @Transient
    @JsonIgnore
    public boolean isDroppedCall() {
        return this.connectedDate != null
                && this.disconnectedDate != null
                && this.disconnectedDate.getTime() - this.connectedDate.getTime() <= 5000;
    }

}
