package com.incomm.cca.model.dictionary;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.incomm.cca.model.domain.AuditableEntity;
import org.apache.commons.lang3.StringUtils;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

/**
 * A dictionary class that returns its columns as value, display, group, and isActive.
 */
@Entity
@Table(name = "bank_product_dictionary")
public class BankProductDictionary extends AuditableEntity implements DictionaryEntity, Serializable {

    private Long id;
    private String bank;
    private String product;
    Boolean isActive;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonGetter("value")
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @JsonGetter("group")
    public String getBank() {
        return bank;
    }

    public void setBank(String bank) {
        this.bank = bank;
    }

    @JsonGetter("displayValue")
    public String getProduct() {
        return product;
    }

    public void setProduct(String product) {
        this.product = product;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    @Override
    public void validate() throws IllegalArgumentException {
        if (StringUtils.isBlank(product)) {
            throw new IllegalArgumentException("Product must be provided");
        } else if (StringUtils.isBlank(bank)) {
            throw new IllegalArgumentException("Bank name must be provided");
        }
    }
}
