package com.incomm.cca.qa.pageObject.details;

import com.incomm.aqat.driver.AqatDriver;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;

/**
 * Created by Matt on 7/26/2016.
 */
public class SummaryLocationPo extends DetailsPo {

    // MESSAGES
    public static final String MESSAGE_LOCATION_SUMMARY_UNAVAILABLE_STATUS_TEXT = "Unavailable";
    public static final String MESSAGE_LOCATION_SUMMARY_ACTIVE_STATUS_TEXT = "Active";
    // LOCATORS
    public static final String DETAILS_LOCATION_SUMMARY_WRAPPER_ID = "location-summary-wrapper"; // material
    public static final String DETAILS_LOCATION_SUMMARY_STATUS_XPATH = "//*[@id='status']/span"; // material
    public static final String DETAILS_LOCATION_SUMMARY_TERMINALS_SHOW_ALL_ID = "location-terminals-show-all"; // material
    public static final String DETAILS_LOCATION_SUMMARY_HIERARCHY_WRAPPER = "hierarchy-wrapper";
    public static final String DETAILS_LOCATION_SUMMARY_ADDRESS_WRAPPER = "address-wrapper";
    public static final String DETAILS_LOCATION_SUMMARY_LOCATION_ID = "location-summary-location"; //Ask Matt G. where this ID might have gone in the html.
    protected TerminalsPo terminals;
    // WEB ELEMENTS
    @FindBy(id = DETAILS_LOCATION_SUMMARY_WRAPPER_ID)
    WebElement detailsLocationSummaryWrapper;
    @FindBy(xpath = DETAILS_LOCATION_SUMMARY_STATUS_XPATH)
    WebElement detailsLocationSummaryStatus;
    @FindBy(id = DETAILS_LOCATION_SUMMARY_TERMINALS_SHOW_ALL_ID)
    WebElement detailsLocationSummaryTerminalsShowAll;
    @FindBy(id = DETAILS_LOCATION_SUMMARY_HIERARCHY_WRAPPER)
    WebElement detailsLocationSummaryHierarchyWrapper;
    @FindBy(id = DETAILS_LOCATION_SUMMARY_ADDRESS_WRAPPER)
    WebElement detailsLocationSummaryAddressWrapper;
    @FindBy(id = DETAILS_LOCATION_SUMMARY_LOCATION_ID)
    WebElement detailsLocationSummaryLocationName;

    public SummaryLocationPo(AqatDriver driver) {
        super(driver);
        this.terminals = new TerminalsPo(this.driver);

    }

    public Boolean isLocationSummaryDisplayed() {

        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.id(DETAILS_LOCATION_SUMMARY_WRAPPER_ID)));
        return detailsLocationSummaryWrapper.isDisplayed();

    }

    public String getLocationName() {

        return detailsLocationSummaryLocationName.getText();

    }

    public String getLocationSummaryStatusText() {

        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(DETAILS_LOCATION_SUMMARY_STATUS_XPATH)));
        return detailsLocationSummaryStatus.getText();

    }

    public Boolean goToTerminals() {

        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.id(DETAILS_LOCATION_SUMMARY_TERMINALS_SHOW_ALL_ID)));
        driver.scrollToAndClickElement(detailsLocationSummaryTerminalsShowAll, 200);

        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.id(terminals.TERMINALS_WRAPPER_ID)));
        return terminals.isTerminalsDisplayed();

    }

}
