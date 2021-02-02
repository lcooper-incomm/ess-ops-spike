package com.incomm.cca.model.view.transaction;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cca.model.enums.apls.AplsIdentifier;
import com.incomm.cscore.client.apls.constant.AplsPlatform;
import com.incomm.cscore.client.apls.model.transaction.TransactionHistoryRequestSupport;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class TransactionSearchRequestView implements Serializable {

    private String accountType;
    private String cashierId;
    private String endDate;
    private String identifier;
    private AplsIdentifier identifierType;
    private Boolean isArchive = false;
    private Boolean isBillable = false;
    private Integer page;
    private AplsPlatform platform;
    private Integer resultsPerPage;
    private Long selectionId;
    private TransactionHistoryRequestSupport.SortOrder sortOrder;
    private String startDate;
    private String token;
    private String transactionFilter;

    public String getAccountType() {
        return accountType;
    }

    public void setAccountType(final String accountType) {
        this.accountType = accountType;
    }

    public String getCashierId() {
        return cashierId;
    }

    public void setCashierId(final String cashierId) {
        this.cashierId = cashierId;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(final String endDate) {
        this.endDate = endDate;
    }

    public String getIdentifier() {
        return identifier;
    }

    public void setIdentifier(final String identifier) {
        this.identifier = identifier;
    }

    public AplsIdentifier getIdentifierType() {
        return identifierType;
    }

    public void setIdentifierType(final AplsIdentifier identifierType) {
        this.identifierType = identifierType;
    }

    public Boolean getIsArchive() {
        return isArchive;
    }

    public void setIsArchive(final Boolean archive) {
        isArchive = archive;
    }

    public Boolean getIsBillable() {
        return isBillable;
    }

    public void setIsBillable(final Boolean billable) {
        isBillable = billable;
    }

    public Integer getPage() {
        return page;
    }

    public void setPage(final Integer page) {
        this.page = page;
    }

    public AplsPlatform getPlatform() {
        return platform;
    }

    public void setPlatform(final AplsPlatform platform) {
        this.platform = platform;
    }

    public Integer getResultsPerPage() {
        return resultsPerPage;
    }

    public void setResultsPerPage(final Integer resultsPerPage) {
        this.resultsPerPage = resultsPerPage;
    }

    public Long getSelectionId() {
        return selectionId;
    }

    public void setSelectionId(final Long selectionId) {
        this.selectionId = selectionId;
    }

    public TransactionHistoryRequestSupport.SortOrder getSortOrder() {
        return sortOrder;
    }

    public void setSortOrder(final TransactionHistoryRequestSupport.SortOrder sortOrder) {
        this.sortOrder = sortOrder;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(final String startDate) {
        this.startDate = startDate;
    }

    public String getToken() {
        return token;
    }

    public void setToken(final String token) {
        this.token = token;
    }

    public String getTransactionFilter() {
        return transactionFilter;
    }

    public void setTransactionFilter(final String transactionFilter) {
        this.transactionFilter = transactionFilter;
    }
}
