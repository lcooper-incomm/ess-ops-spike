package com.incomm.cca.model.view.session.selection;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cscore.client.apls.constant.AplsPlatform;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class WorkspaceSelectionView implements Serializable {

    protected Long id;
    protected String type;
    protected AplsPlatform platform;
    protected Boolean isSearchComplete = false;
    protected Boolean isResultsFound = false;
    protected Boolean isSelectionMade = false;

    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(final String type) {
        this.type = type;
    }

    public AplsPlatform getPlatform() {
        return platform;
    }

    public void setPlatform(final AplsPlatform platform) {
        this.platform = platform;
    }

    public Boolean getIsSearchComplete() {
        return isSearchComplete;
    }

    public void setIsSearchComplete(final Boolean searchComplete) {
        isSearchComplete = searchComplete;
    }

    public Boolean getIsResultsFound() {
        return isResultsFound;
    }

    public void setIsResultsFound(final Boolean resultsFound) {
        isResultsFound = resultsFound;
    }

    public Boolean getIsSelectionMade() {
        return isSelectionMade;
    }

    public void setIsSelectionMade(final Boolean selectionMade) {
        isSelectionMade = selectionMade;
    }
}
