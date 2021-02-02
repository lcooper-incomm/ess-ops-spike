package com.incomm.cca.qa.pageObject.search.parameter;

import com.incomm.aqat.driver.AqatDriver;
import com.incomm.cca.qa.pageObject.BasePo;
import com.incomm.cca.qa.pageObject.enums.SearchParameter;
import com.incomm.cca.qa.pageObject.search.SearchResultsPO;
import com.incomm.cca.qa.pageObject.search.results.SearchResultsPanelPo;
import com.incomm.cca.qa.pageObject.session.SessionDetailPO;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.ExpectedConditions;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static com.incomm.aqat.util.AqatWait.waitForPageLoad;

public abstract class SearchQueryPanelPo extends BasePo implements SearchQueryPanel {

    public static final By SEARCH_PARAMETERS_CONTAINER = By.cssSelector("#search-parameters div.card-container");
    public static final By SEARCH_PARAMETERS_HEADER_BAR = By.cssSelector("#search-parameters div.card-header.primary.clickable");
    public static final By SEARCH_PARAMETER_HEADER_TITLE = By.cssSelector("#search-parameters div.card-header.primary.clickable > h4");
    public static final By QUERY_PANEL_CONTENT = By.cssSelector("#search-parameters div.card-content");
    public static final By SEARCH_BUTTON = By.cssSelector("button#search-search-button");
    public static final By CLEAR_BUTTON = By.cssSelector("button#search-clear-button");
    public static final By SEARCH_BUTTON_SPINNER = By.cssSelector("button#search-search-button cca-spinner");

    public SearchQueryPanelPo(final AqatDriver driver) {
        super(driver);
        waitForPageLoad(driver);
        PageFactory.initElements(driver, this);
    }

    public boolean advancedFeaturesVisible() {
        return false;
    }

    public boolean isDisplayed() {
        return driver.findElement(SEARCH_PARAMETERS_CONTAINER)
                     .isDisplayed();
    }

    public SearchResultsPanelPo clickSearch() {
        driver.findElement(SEARCH_BUTTON)
              .click();
        return new SearchResultsPanelPo(driver);
    }

    public List<SearchParameter> getAvailableParameters() {
        return new ArrayList<>(getCurrentValues().keySet());
    }

    @Override
    public SearchQueryPanel clickOnClearButton() {
        driver.findElement(CLEAR_BUTTON)
              .click();
        this.reload();
        return this;
    }

    public void reload() {
        PageFactory.initElements(driver, this);
        driver.getWebDriverWait()
              .until(ExpectedConditions.elementToBeClickable(driver.findElement(CLEAR_BUTTON)));
    }

    public WebElement getHeaderBar() {
        return driver.findElement(SEARCH_PARAMETERS_HEADER_BAR);
    }

    public WebElement getQueryPanelContent() {
        return driver.findElement(QUERY_PANEL_CONTENT);
    }

    public WebElement getClearButton() {
        return driver.findElement(CLEAR_BUTTON);
    }

    @Override
    public boolean hasAdvancedQueryFields() {
        return false;
    }

    public abstract SearchQueryPanel clickOnAdvancedToggle();

    public SearchQueryPanel clickOnHeaderBar() {
        driver.findElement(SEARCH_PARAMETERS_HEADER_BAR)
              .click();
        PageFactory.initElements(driver, this);
        return this;
    }

    @Override
    public WebElement getHeaderTitle() {
        return driver.findElement(SEARCH_PARAMETER_HEADER_TITLE);
    }

    public SessionDetailPO clickSearchAndExpectNavigateToDetails() {
        clickSearch();
        SessionDetailPO sessionDetailPo = new SessionDetailPO(driver);
        driver.getWebDriverWait()
              .until((ExpectedCondition<Boolean>) driver -> sessionDetailPo.isDisplayed());
        return sessionDetailPo;
    }

    public SearchResultsPO clickSearchAndExpectZeroSearchResults() {
        clickSearch();
        SearchResultsPO searchResultsPo = new SearchResultsPO(driver);
        driver.getWebDriverWait()
              .until((ExpectedCondition<Boolean>) driver -> searchResultsPo.isDisplayed());
        return searchResultsPo;
    }

    public SearchResultsPO clickSearchAndExpectResults() {
        clickSearch();
        SearchResultsPO searchResultsPo = new SearchResultsPO(driver);
        driver.getWebDriverWait()
              .until((ExpectedCondition<Boolean>) driver -> searchResultsPo.isDisplayed());
        return searchResultsPo;
    }

    public WebElement getSearchContainer() {
        return driver.findElement(SEARCH_PARAMETERS_CONTAINER);
    }

    public WebElement getSearchButton() {
        return driver.findElement(SEARCH_BUTTON);
    }

    public abstract Map<SearchParameter, String> getCurrentValues();
}
