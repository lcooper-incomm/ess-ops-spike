package com.incomm.cca.model.view.session.queue;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class WrapUpCodeView implements Serializable {

    private Long id;
    private String i3Name;
    private String displayName;
    private Boolean isActive = false;
    private Boolean isLocked = false;
    private List<WrapUpCodeCategoryView> categories = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public String getI3Name() {
        return i3Name;
    }

    public void setI3Name(final String i3Name) {
        this.i3Name = i3Name;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(final String displayName) {
        this.displayName = displayName;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(final Boolean active) {
        isActive = active;
    }

    public Boolean getIsLocked() {
        return isLocked;
    }

    public void setIsLocked(final Boolean locked) {
        isLocked = locked;
    }

    public List<WrapUpCodeCategoryView> getCategories() {
        return categories;
    }

    public void setCategories(final List<WrapUpCodeCategoryView> categories) {
        this.categories = categories;
    }
}
