package com.incomm.cca.model.domain.session.dispute;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.incomm.cca.model.domain.User;
import com.incomm.cscore.mvcutils.model.CrudEntity;
import org.apache.commons.lang3.StringUtils;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.io.Serializable;

@Entity
@Table
public class DisputeProbingQuestion implements CrudEntity<Long>, Serializable {

    private Long id;
    private DisputeComponent disputeComponent;
    private User createdBy;
    private String question;
    private String answer;

    @Id
    @Override
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "dispute_component_id")
    public DisputeComponent getDisputeComponent() {
        return disputeComponent;
    }

    public void setDisputeComponent(final DisputeComponent disputeComponent) {
        this.disputeComponent = disputeComponent;
    }

    @ManyToOne
    @JoinColumn(name = "created_by")
    public User getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(final User createdBy) {
        this.createdBy = createdBy;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(final String question) {
        this.question = question;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(final String answer) {
        this.answer = answer;
    }

    @Override
    public void validate() throws IllegalArgumentException {
        if (this.disputeComponent == null) {
            throw new IllegalArgumentException("DisputeProbingQuestion must be associated to a dispute component");
        } else if (this.createdBy == null) {
            throw new IllegalArgumentException("DisputeProbingQuestion must be associated to a user");
        } else if (StringUtils.isBlank(this.question)) {
            throw new IllegalArgumentException("DisputeProbingQuestion must have a question value");
        } else if (this.question.length() > 500) {
            throw new IllegalArgumentException("DisputeProbingQuestion question cannot exceed 500 characters");
        } else if (StringUtils.isBlank(this.answer)) {
            throw new IllegalArgumentException("DisputeProbingQuestion must have an answer value");
        } else if (this.answer.length() > 500) {
            throw new IllegalArgumentException("DisputeProbingQuestion answer cannot exceed 500 characters");
        }
    }
}
