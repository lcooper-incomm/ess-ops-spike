package com.incomm.cca.model.view.session.dispute;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cca.model.view.auth.UserView;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class DisputeProbingQuestionView implements Serializable {

    private Long id;
    private UserView createdBy;
    private String question;
    private String answer;

    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public UserView getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(final UserView createdBy) {
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
}
