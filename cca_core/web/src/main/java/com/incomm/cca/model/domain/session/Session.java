package com.incomm.cca.model.domain.session;

import com.incomm.cca.model.constant.SessionStatus;
import com.incomm.cca.model.domain.AuditableEntity;
import com.incomm.cca.model.domain.Comment;
import com.incomm.cca.model.domain.Identifier;
import com.incomm.cca.model.domain.SessionQueue;
import com.incomm.cca.model.domain.Team;
import com.incomm.cca.model.domain.User;
import com.incomm.cca.model.domain.WrapUpCode;
import com.incomm.cca.model.domain.WrapUpCodeCategory;
import com.incomm.cca.model.domain.session.dispute.DisputeComponent;
import org.apache.commons.lang3.StringUtils;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "cca_session")
public class Session extends AuditableEntity {

    private Long id;
    private Date closedDate;
    private User user;
    private String status;
    private WrapUpCode wrapUpCode;
    private WrapUpCodeCategory wrapUpCodeCategory;
    private SessionQueue queue;
    private String sessionClass;
    private String sessionType;
	private CallComponent callComponent;
    private ComplaintComponent complaintComponent;
	private CustomerComponent customerComponent;
    private CardsComponent cardsComponent;
	private DisputeComponent disputeComponent;
    private DocumentsComponent documentsComponent;
    private EncorComponent encorComponent;
	private LawEnforcementComponent lawEnforcementComponent;
	private MerchantComponent merchantComponent;
    private PrivacyRequestComponent privacyRequestComponent;
	private ReceiptComponent receiptComponent;
	private RefundRequestComponent refundRequestComponent;
    private Team team;
    private String summary;

    private Set<Selection> selections = new HashSet<>();
    private List<Comment> comments = new ArrayList<>();

    public Session() {
    }

    public Session(String status) {
        this();
        this.status = status;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @ManyToOne(cascade = {CascadeType.MERGE})
    @JoinColumn(name = "user_id")
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "wrap_up_code_id")
    public WrapUpCode getWrapUpCode() {
        return wrapUpCode;
    }

    public void setWrapUpCode(WrapUpCode wrapUpCode) {
        this.wrapUpCode = wrapUpCode;
    }

    @OneToMany(
            mappedBy = "session",
            cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    public Set<Selection> getSelections() {
        return selections;
    }

    public void setSelections(Set<Selection> selections) {
        this.selections = selections;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "wrap_up_code_category_id")
    public WrapUpCodeCategory getWrapUpCodeCategory() {
        return wrapUpCodeCategory;
    }

    public void setWrapUpCodeCategory(WrapUpCodeCategory wrapUpCodeCategory) {
        this.wrapUpCodeCategory = wrapUpCodeCategory;
    }

    @ManyToOne
    @JoinColumn(name = "session_queue_id")
    public SessionQueue getQueue() {
        return queue;
    }

    public void setQueue(SessionQueue queue) {
        this.queue = queue;
    }

    @Temporal(TemporalType.TIMESTAMP)
    public Date getClosedDate() {
        return closedDate;
    }

    public void setClosedDate(Date closedDate) {
        this.closedDate = closedDate;
    }

    public String getSessionClass() {
        return sessionClass;
    }

    public void setSessionClass(String sessionClass) {
        this.sessionClass = sessionClass;
    }

    public String getSessionType() {
        return sessionType;
    }

    public void setSessionType(String sessionType) {
        this.sessionType = sessionType;
    }

    @OneToOne(mappedBy = "session", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY, orphanRemoval = true)
    public ComplaintComponent getComplaintComponent() {
        return complaintComponent;
    }

    public void setComplaintComponent(final ComplaintComponent complaintComponent) {
        this.complaintComponent = complaintComponent;
    }

    @OneToOne(mappedBy = "session", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY, orphanRemoval = true)
    public DocumentsComponent getDocumentsComponent() {
        return documentsComponent;
    }

    public void setDocumentsComponent(final DocumentsComponent documentsComponent) {
        this.documentsComponent = documentsComponent;
    }

    @OneToOne(mappedBy = "session", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY, orphanRemoval = true)
    public EncorComponent getEncorComponent() {
        return encorComponent;
    }

    public void setEncorComponent(EncorComponent encorComponent) {
        this.encorComponent = encorComponent;
    }

    @OneToOne(mappedBy = "session", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY, orphanRemoval = true)
	public CallComponent getCallComponent() {
		return callComponent;
    }

	public void setCallComponent(CallComponent callComponent) {
		this.callComponent = callComponent;
    }

    @OneToOne(mappedBy = "session", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY, orphanRemoval = true)
	public CustomerComponent getCustomerComponent() {
		return customerComponent;
    }

	public void setCustomerComponent(final CustomerComponent customerComponent) {
		this.customerComponent = customerComponent;
    }

    @OneToOne(mappedBy = "session", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY, orphanRemoval = true)
	public DisputeComponent getDisputeComponent() {
        return disputeComponent;
    }

	public void setDisputeComponent(final DisputeComponent disputeComponent) {
        this.disputeComponent = disputeComponent;
    }

    @OneToOne(mappedBy = "session", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY, orphanRemoval = true)
	public MerchantComponent getMerchantComponent() {
		return merchantComponent;
    }

	public void setMerchantComponent(final MerchantComponent merchantComponent) {
		this.merchantComponent = merchantComponent;
    }

    @OneToOne(mappedBy = "session", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY, orphanRemoval = true)
    public PrivacyRequestComponent getPrivacyRequestComponent() {
        return privacyRequestComponent;
    }

    public void setPrivacyRequestComponent(final PrivacyRequestComponent privacyRequestComponent) {
        this.privacyRequestComponent = privacyRequestComponent;
    }

    @OneToOne(mappedBy = "session", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY, orphanRemoval = true)
	public ReceiptComponent getReceiptComponent() {
		return receiptComponent;
    }

	public void setReceiptComponent(final ReceiptComponent receiptComponent) {
		this.receiptComponent = receiptComponent;
    }

    @OneToOne(mappedBy = "session", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY, orphanRemoval = true)
    public CardsComponent getCardsComponent() {
        return cardsComponent;
    }

    public void setCardsComponent(final CardsComponent cardsComponent) {
        this.cardsComponent = cardsComponent;
    }

    @OneToOne(mappedBy = "session", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY, orphanRemoval = true)
	public LawEnforcementComponent getLawEnforcementComponent() {
		return lawEnforcementComponent;
    }

	public void setLawEnforcementComponent(final LawEnforcementComponent lawEnforcementComponent) {
		this.lawEnforcementComponent = lawEnforcementComponent;
    }

    @OneToOne(mappedBy = "session", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY, orphanRemoval = true)
	public RefundRequestComponent getRefundRequestComponent() {
		return refundRequestComponent;
    }

	public void setRefundRequestComponent(final RefundRequestComponent refundRequestComponent) {
		this.refundRequestComponent = refundRequestComponent;
    }

    @ManyToOne(cascade = {CascadeType.MERGE})
    @JoinColumn(name = "team_id")
    public Team getTeam() {
        return team;
    }

    public void setTeam(final Team team) {
        this.team = team;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "session_comment",
            joinColumns = @JoinColumn(name = "session_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "comment_id", referencedColumnName = "id")
    )
    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(final List<Comment> comments) {
        this.comments = comments;
    }

    /**
     * Returns the selection, if any, that matches the given SelectionDto's
     * type, platform, and identifiers.
     */
    @Transient
    public Selection getSelectionMatchingRequest(Selection request) {
        for (Selection selection : selections) {
            if (
                    Objects.equals(selection.getType(), request.getType()) //Must match type
                            && Objects.equals(selection.getPlatform(), request.getPlatform()) //Must match platform
            ) {
                //Now, must match identifiers
                boolean matchesAllIdentifiers = true;
                for (Identifier dtoIdentifier : request.getIdentifiers()) {
                    boolean matchesThisIdentifier = false;
                    for (Identifier identifier : selection.getIdentifiers()) {
                        if (Objects.equals(identifier.getIdentifierType(), dtoIdentifier.getIdentifierType())
                                && identifier.getValue()
                                             .equals(dtoIdentifier.getValue())
                                && (StringUtils.isBlank(identifier.getPartner()) || identifier.getPartner()
                                                                                              .equalsIgnoreCase(dtoIdentifier.getPartner()))) {
                            matchesThisIdentifier = true;
                            break;
                        }
                    }
                    if (!matchesThisIdentifier) {
                        matchesAllIdentifiers = false;
                        break;
                    }
                }

                if (matchesAllIdentifiers) {
                    return selection;
                }
            }
        }
        return null;
    }

    @Transient
    public boolean isClosed() {
        return this.closedDate != null
                || (this.status != null && this.status.equalsIgnoreCase(SessionStatus.CLOSED))
                || (this.status != null && this.status.equalsIgnoreCase(SessionStatus.FORCED_CLOSED));
    }

    @Override
    public String toString() {
        return "Session{" +
                ", id=" + id +
                ", closedDate=" + closedDate +
                ", createdDate=" + createdDate +
                ", user=" + user +
                ", status=" + status +
                ", wrapUpCode=" + wrapUpCode +
                ", wrapUpCodeCategory=" + wrapUpCodeCategory +
                ", queue=" + queue +
                ", sessionClass=" + sessionClass +
                ", sessionType=" + sessionType +
                '}';
    }
}
