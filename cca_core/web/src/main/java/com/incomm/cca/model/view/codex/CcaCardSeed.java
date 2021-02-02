package com.incomm.cca.model.view.codex;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cscore.client.apls.constant.AplsPlatform;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class CcaCardSeed implements Serializable {

    private String availableBalance;
    private String currentBalance;
    private String incommStatus;
    private Boolean isB2B = false;
    private Boolean isB2C = false;
    private Boolean isBinReplacementEligible = false;
    private Boolean isReplacedInLastTenDays = false;
    private AplsPlatform platform;
    private String platformStatus;
    private Boolean useReorderFlag = false;
    private List<String> actionDeniedReasons = new ArrayList<>();
    private List<String> allowedStatuses = new ArrayList<>();
    private List<String> permissions = new ArrayList<>();

    public String getAvailableBalance() {
        return availableBalance;
    }

    public void setAvailableBalance(final String availableBalance) {
        this.availableBalance = availableBalance;
    }

    public String getCurrentBalance() {
        return currentBalance;
    }

    public void setCurrentBalance(final String currentBalance) {
        this.currentBalance = currentBalance;
    }

    public String getIncommStatus() {
        return incommStatus;
    }

    public void setIncommStatus(final String incommStatus) {
        this.incommStatus = incommStatus;
    }

    public Boolean getIsB2B() {
        return isB2B;
    }

    public void setIsB2B(final Boolean b2B) {
        isB2B = b2B;
    }

    public Boolean getIsB2C() {
        return isB2C;
    }

    public void setIsB2C(final Boolean b2C) {
        isB2C = b2C;
    }

    public Boolean getIsBinReplacementEligible() {
        return isBinReplacementEligible;
    }

    public void setIsBinReplacementEligible(final Boolean binReplacementEligible) {
        isBinReplacementEligible = binReplacementEligible;
    }

    public Boolean getIsReplacedInLastTenDays() {
        return isReplacedInLastTenDays;
    }

    public void setIsReplacedInLastTenDays(final Boolean replacedInLastTenDays) {
        isReplacedInLastTenDays = replacedInLastTenDays;
    }

    public AplsPlatform getPlatform() {
        return platform;
    }

    public void setPlatform(final AplsPlatform platform) {
        this.platform = platform;
    }

    public String getPlatformStatus() {
        return platformStatus;
    }

    public void setPlatformStatus(final String platformStatus) {
        this.platformStatus = platformStatus;
    }

    public List<String> getPermissions() {
        return permissions;
    }

    public void setPermissions(final List<String> permissions) {
        this.permissions = permissions;
    }

    public Boolean getUseReorderFlag() {
        return useReorderFlag;
    }

    public void setUseReorderFlag(final Boolean useReorderFlag) {
        this.useReorderFlag = useReorderFlag;
    }

    public List<String> getActionDeniedReasons() {
        return actionDeniedReasons;
    }

    public void setActionDeniedReasons(final List<String> actionDeniedReasons) {
        this.actionDeniedReasons = actionDeniedReasons;
    }

    public List<String> getAllowedStatuses() {
        return allowedStatuses;
    }

    public void setAllowedStatuses(final List<String> allowedStatuses) {
        this.allowedStatuses = allowedStatuses;
    }
}
