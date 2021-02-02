package com.incomm.cca.model.domain.migration;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table
public class MigrationJobStatus {

    private Long id;
    private String name;
    private LocalDateTime lastProcessed;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(final String name) {
        this.name = name;
    }

    public LocalDateTime getLastProcessed() {
        return lastProcessed;
    }

    public void setLastProcessed(final LocalDateTime lastProcessed) {
        this.lastProcessed = lastProcessed;
    }
}
