package com.incomm.cca.model.domain.mapping;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "gc_request")
public class GCRequest {

    private Long id;
    private String x95Code;
    private String requestCode;
    private String requestValue;
    private String transactionType;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Column(name = "x95_code")
    public String getX95Code() {
        return x95Code;
    }

    public void setX95Code(String x95Code) {
        this.x95Code = x95Code;
    }

    public String getRequestCode() {
        return requestCode;
    }

    public void setRequestCode(String requestCode) {
        this.requestCode = requestCode;
    }

    public String getRequestValue() {
        return requestValue;
    }

    public void setRequestValue(String requestValue) {
        this.requestValue = requestValue;
    }

    public String getTransactionType() {
        return transactionType;
    }

    public void setTransactionType(String transactionType) {
        this.transactionType = transactionType;
    }

    @Override
    public String toString() {
        return "GCRequest{" +
                "id=" + id +
                ", x95Code='" + x95Code + '\'' +
                ", requestCode='" + requestCode + '\'' +
                ", requestValue='" + requestValue + '\'' +
                ", transactionType=" + transactionType +
                '}';
    }
}
