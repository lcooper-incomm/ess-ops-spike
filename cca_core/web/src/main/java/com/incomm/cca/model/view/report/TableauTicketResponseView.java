package com.incomm.cca.model.view.report;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class TableauTicketResponseView implements Serializable {

    private String ticketNumber;
    private Boolean error = false;

    public Boolean isError() {
        return error;
    }

    public void setError(boolean error) {
        this.error = error;
    }

    public String getTicketNumber() {
        return ticketNumber;
    }

    public void setTicketNumber(String ticketNumber) {
        this.ticketNumber = ticketNumber;

        if (this.ticketNumber == null || this.ticketNumber.length() < 24) {
            setError(true);
        }
    }

    @Override
    public String toString() {
        return "TableauTicketResponseView{" +
                "ticketNumber='" + ticketNumber + '\'' +
                ", error=" + error +
                '}';
    }
}
