package com.incomm.cca.model.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cca.model.domain.session.Session;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.annotations.ColumnTransformer;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table
@JsonIgnoreProperties(ignoreUnknown = true)
public class Comment implements Serializable, Validatable {

    private Long id;
    private User createdBy;
    private Date createdDate;
    private User modifiedBy;
    private Date modifiedDate;
	private String content;
    private Boolean isPrivate = false;
    private List<Identifier> identifiers = new ArrayList<>();
    //These fields are simply to facilitate simpler querying using Spring Data instead of JdbcTemplate with a RowMapper
    private List<Session> sourceSessions = new ArrayList<>();

    @PrePersist
    protected void prePersist() {
        this.createdDate = new Date();
        this.modifiedDate = new Date();
    }

    @PreUpdate
    protected void preUpdate() {
        this.modifiedDate = new Date();
    }

    public Comment() {
    }

    public Comment(User user) {
        this();
        this.createdBy = user;
        this.modifiedBy = user;
    }

    public Comment(com.incomm.apls.model.response.Note note) {
        if (note != null) {
            this.id = Long.parseLong(note.getId());
            this.createdDate = new Date(note.getCreateDate());
			this.content = note.getContent();

            if (note.getUser() != null) {
                User user = new User();
                try {
                    Long userId = Long.parseLong(note.getUser()
                                                     .getId());
                    user.setId(userId);
                    user.setUsername(note.getUser()
                                         .getUsername());

                    this.createdBy = user;
                    this.modifiedBy = user;
                } catch (NumberFormatException e) {
                    //Do nothing
                }
            }
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

	@Column
    @ColumnTransformer(
            read = "CONVERT(VARCHAR(512), DECRYPTBYKEY([content]))",
            write = "ENCRYPTBYKEY(KEY_GUID('CCAEncryptionSymmetricKey'),?)"
    )
	public String getContent() {
		return content;
    }

	public void setContent(String content) {
		this.content = content;
    }

    @ManyToMany(mappedBy = "comments")
    public List<Identifier> getIdentifiers() {
        return identifiers;
    }

    public void setIdentifiers(List<Identifier> identifiers) {
        this.identifiers = identifiers;
    }

    @ManyToOne
    @JoinColumn(name = "created_by")
    public User getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(final User createdBy) {
        this.createdBy = createdBy;
    }

    @ManyToOne
    @JoinColumn(name = "modified_by")
    public User getModifiedBy() {
        return modifiedBy;
    }

    public void setModifiedBy(final User modifiedBy) {
        this.modifiedBy = modifiedBy;
    }

    @Temporal(TemporalType.TIMESTAMP)
    public Date getModifiedDate() {
        return modifiedDate;
    }

    public void setModifiedDate(final Date modifiedDate) {
        this.modifiedDate = modifiedDate;
    }

    public Boolean getIsPrivate() {
        return isPrivate;
    }

    public void setIsPrivate(final Boolean aPrivate) {
        isPrivate = aPrivate;
    }

    @ManyToMany(mappedBy = "comments")
    public List<Session> getSourceSessions() {
        return sourceSessions;
    }

    public void setSourceSessions(final List<Session> sourceSessions) {
        this.sourceSessions = sourceSessions;
    }

    @Override
    public void validate() throws IllegalArgumentException {
		if (StringUtils.isBlank(this.content)) {
            throw new IllegalArgumentException("Comment text must be provided");
        }
    }

    @Override
    public String toString() {
        return "Comment{" +
                "id=" + id +
                ", createdBy=" + createdBy +
                ", createdDate=" + createdDate +
                ", modifiedBy=" + modifiedBy +
                ", modifiedDate=" + modifiedDate +
				", content='" + content + '\'' +
                ", isPrivate=" + isPrivate +
                '}';
    }
}
