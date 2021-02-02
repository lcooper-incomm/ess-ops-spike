package com.incomm.cca.model.view.external.zippopotamus;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ZippopotamusPlaceView implements Serializable {

    @JsonProperty(value = "place name")
    private String placeName;
    private String longitude;
    private String latitude;
    private String state;
    @JsonProperty(value = "state abbreviation")
    private String stateAbbreviation;

    public String getPlaceName() {
        return placeName;
    }

    public void setPlaceName(String placeName) {
        this.placeName = placeName;
    }

    public String getLongitude() {
        return longitude;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

    public String getLatitude() {
        return latitude;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getStateAbbreviation() {
        return stateAbbreviation;
    }

    public void setStateAbbreviation(String stateAbbreviation) {
        this.stateAbbreviation = stateAbbreviation;
    }

    /**
     * Remove any thing in the place name including the first parentheses and everything that follows.
     */
    public void trimCity() {
        int i;
        if ((i = placeName.indexOf(" (")) > 0) {
            placeName = placeName.substring(0, i).trim();
        }
    }
}
