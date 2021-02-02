package com.incomm.cca.qa.pageObject;

public interface ComponentPage  {

    default String getUrl() {
        return null;
    }
    default Boolean isAt() {
        return false;
    }
    default Boolean isDisplayed() {
        return false;
    }
}
