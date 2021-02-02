package com.incomm.cca.model.domain.encor;

import java.io.Serializable;

public class EncorSymphonyRequest implements Serializable {

    private String emsUserEmailAddress;
    private String memberExtNumber;
    private String programExtNumber;

    public String getEmsUserEmailAddress() {
        return emsUserEmailAddress;
    }

    public void setEmsUserEmailAddress(String emsUserEmailAddress) {
        this.emsUserEmailAddress = emsUserEmailAddress;
    }

    public String getMemberExtNumber() {
        return memberExtNumber;
    }

    public void setMemberExtNumber(String memberExtNumber) {
        this.memberExtNumber = memberExtNumber;
    }

    public String getProgramExtNumber() {
        return programExtNumber;
    }

    public void setProgramExtNumber(String programExtNumber) {
        this.programExtNumber = programExtNumber;
    }
}
