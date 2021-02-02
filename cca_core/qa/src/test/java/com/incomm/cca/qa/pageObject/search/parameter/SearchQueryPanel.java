package com.incomm.cca.qa.pageObject.search.parameter;

import com.incomm.cca.qa.pageObject.enums.SearchParameter;
import com.incomm.cca.qa.pageObject.search.results.SearchResultsPanelPo;
import org.openqa.selenium.WebElement;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public interface SearchQueryPanel {

    String QUERY_PANEL_LOCATOR = ("cca-card-panel#search-parameters div.card-container");

    Map<SearchParameter, String> getCurrentValues();

    WebElement getHeaderTitle();

    boolean isDisplayed();

    SearchResultsPanelPo clickSearch();

    default List<SearchParameter> getAvailableParameters() {
        return new ArrayList<>(this.getCurrentValues()
                                   .keySet());
    }

    SearchQueryPanel clickOnClearButton();

    default boolean hasAdvancedQueryFields() {
        return false;
    }

    default SearchQueryPanel clickOnAdvancedToggle() {
        return null;
    }

    WebElement getSearchContainer();

    void reload();

}
