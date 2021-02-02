package com.incomm.cca.model.domain;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "wrap_up_code")
public class WrapUpCode implements Serializable {

    private Long id;
    private String i3Name;
    private String displayName;
    private Boolean active = true;
    private Boolean locked = false;
    private List<WrapUpCodeCategory> categories = new ArrayList<>();

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Column(name = "i3_name")
    public String getI3Name() {
        return i3Name;
    }

    public void setI3Name(String i3Name) {
        this.i3Name = i3Name;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public Boolean getLocked() {
        return locked;
    }

    public void setLocked(Boolean locked) {
        this.locked = locked;
    }

    @ManyToMany(mappedBy = "wrapUpCodes", cascade = {CascadeType.MERGE})
    public List<WrapUpCodeCategory> getCategories() {
        return categories;
    }

    public void setCategories(final List<WrapUpCodeCategory> categories) {
        this.categories = categories;
    }

    @Override
    public String toString() {
        return "WrapUpCode{" +
                "id=" + id +
                ", i3Name='" + i3Name + '\'' +
                ", displayName='" + displayName + '\'' +
                ", active=" + active +
                ", locked=" + locked +
                '}';
    }
}
