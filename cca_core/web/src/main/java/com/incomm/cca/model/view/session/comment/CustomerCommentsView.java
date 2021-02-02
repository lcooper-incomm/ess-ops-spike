package com.incomm.cca.model.view.session.comment;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class CustomerCommentsView implements Serializable {

    private Boolean isPartial = false;
    private List<CommentView> comments = new ArrayList<>();

    public Boolean getIsPartial() {
        return isPartial;
    }

    public void setIsPartial(final Boolean isPartial) {
        this.isPartial = isPartial;
    }

    public List<CommentView> getComments() {
        return comments;
    }

    public void setComments(final List<CommentView> comments) {
        this.comments = comments;
    }
}
