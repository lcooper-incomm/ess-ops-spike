package com.incomm.cca.model.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "wrap_up_code_category")
public class WrapUpCodeCategory implements Serializable {

    private Long id;
    private String i3Name;
    private String displayName;
    private Boolean active;
    private List<SessionQueue> queues = new ArrayList<>();
    private List<WrapUpCode> wrapUpCodes = new ArrayList<>();

    public WrapUpCodeCategory() {
    }

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

    @JsonIgnore
    @ManyToMany(mappedBy = "wrapUpCodeCategories")
    public List<SessionQueue> getQueues() {
        return queues;
    }

    public void setQueues(List<SessionQueue> queues) {
        this.queues = queues;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    @ManyToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinTable(name = "wrap_up_code_category_wrap_up_code",
            joinColumns = @JoinColumn(name = "category_id"),
            inverseJoinColumns = @JoinColumn(name = "code_id"))
    public List<WrapUpCode> getWrapUpCodes() {
        return wrapUpCodes;
    }

    public void setWrapUpCodes(List<WrapUpCode> wrapUpCodes) {
        this.wrapUpCodes = wrapUpCodes;
    }

    @Override
    public String toString() {
        return "WrapUpCodeCategory{" +
                "id=" + id +
                ", i3Name='" + i3Name + '\'' +
                ", displayName='" + displayName + '\'' +
                ", active=" + active +
                '}';
    }
}
