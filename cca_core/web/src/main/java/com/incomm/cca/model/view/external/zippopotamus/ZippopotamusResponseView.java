package com.incomm.cca.model.view.external.zippopotamus;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ZippopotamusResponseView implements Serializable {

    @JsonProperty(value = "post code")
    private String postCode;
    private String country;
    @JsonProperty(value = "country abbreviation")
    private String countryAbbreviation;
    private List<ZippopotamusPlaceView> places = new ArrayList<>();

    public String getPostCode() {
        return postCode;
    }

    public void setPostCode(String postCode) {
        this.postCode = postCode;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCountryAbbreviation() {
        return countryAbbreviation;
    }

    public void setCountryAbbreviation(String countryAbbreviation) {
        this.countryAbbreviation = countryAbbreviation;
    }

    public List<ZippopotamusPlaceView> getPlaces() {
        return places;
    }

    public void setPlaces(List<ZippopotamusPlaceView> places) {
        this.places = places;
    }

    public void trimCity() {
        for (ZippopotamusPlaceView place : places) {
            place.trimCity();
        }
    }
}
