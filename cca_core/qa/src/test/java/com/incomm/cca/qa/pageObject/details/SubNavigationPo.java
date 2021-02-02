package com.incomm.cca.qa.pageObject.details;

import com.incomm.aqat.driver.AqatDriver;
import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Matt on 7/26/2016.
 */
public class SubNavigationPo extends DetailsPo {

    //LOCATORS
    public static final String DETAILS_SUB_NAV_WRAPPER_ID = "sub-navigation-wrapper";
    public static final String DETAILS_SUB_NAV_BUTTON_NAME = "sub-nav-btn";
    public static final String DETAILS_SUB_NAV_BUTTON_MORE_NAME = "sub-nav-btn-more";
    public static final String DETAILS_SUB_NAV_BUTTON_ID = "sub-nav-btn-?";
    public static final String DETAILS_SUB_NAV_BUTTON_DESCRIPTION_ID = "sub-nav-btn-?-description";
    public static final String DETAILS_SUB_NAV_BUTTON_DESCRIPTION_XPATH = ".//*[contains(@class,'btn btn-default btn-sm btn-sub-nav wrapper ng-scope')]";
    public static final String DETAILS_SUB_NAV_BUTTON_DESCRIPTION_NAME = "sub-nav-btn-description";
    public static final String DETAILS_SUB_NAV_BUTTON_DESCRIPTION_MORE_NAME = "sub-nav-btn-description-more";
    public static final String DETAILS_SUB_NAV_BUTTON_TEXT_PRODUCT_DESCRIPTION_ID = "sub-nav-btn-%s-description-product-description";
    public static final String DETAILS_SUB_NAV_BUTTON_TEXT_LOCATION_NAME_ID = "sub-nav-btn-%s-description-location-name";
    public static final String DETAILS_SUB_NAV_BUTTON_TEXT_MERCHANT_NAME_ID = "sub-nav-btn-%s-description-merchant-name";
    public static final String DETAILS_SUB_NAV_BUTTON_DATA_QA_IDENTIFIER_XPATH = "//button[@data-qa-identifier='%s']";
    public static final String DETAILS_SUB_NAV_BUTTON_DATA_QA_IDENTIFIER_TYPE_XPATH = "//button[@data-qa-identifierType='%s']";
    // SUB-NAV MORE
    public static final String DETAILS_SUB_NAV_MORE_BUTTON_ID = "sub-nav-btn-more";
    // SPINNERS
    public static final String DETAILS_SUB_NAV_BUTTON_LOCATION_ID_LOADING_SPINNER_ID = "loading-spinner-sub-nav-btn-locationId-%s";
    public static final String DETAILS_SUB_NAV_BUTTON_PRODUCT_ID_LOADING_SPINNER_ID = "loading-spinner-sub-nav-btn-serialNumber-%s";
    //WEB ELEMENTS
    @FindBy(id = DETAILS_SUB_NAV_WRAPPER_ID)
    WebElement detailsSubNavWrapper;
    @FindBy(name = DETAILS_SUB_NAV_BUTTON_NAME)
    List<WebElement> detailsSubNavButtons;
    @FindBy(xpath = DETAILS_SUB_NAV_BUTTON_DESCRIPTION_XPATH)
    List<WebElement> detailsSubNavButtonDescriptions;
    @FindBy(name = DETAILS_SUB_NAV_BUTTON_MORE_NAME)
    List<WebElement> detailsSubNavButtonsMore;
    @FindBy(name = DETAILS_SUB_NAV_BUTTON_DESCRIPTION_MORE_NAME)
    List<WebElement> detailsSubNavButtonDescriptionsMore;
    @FindBy(id = DETAILS_SUB_NAV_MORE_BUTTON_ID)
    WebElement detailsSubNavMoreButton;

    public SubNavigationPo(AqatDriver driver) {
        super(driver);
    }

    public Boolean isSubNavigationDisplayed() {

        return detailsSubNavWrapper.isDisplayed();

    }

    public String getSubNavDataQaIdentifierType(Integer index) {

        return driver.findElement(By.id(String.format(DETAILS_SUB_NAV_BUTTON_ID, index)))
                     .getAttribute("data-qa-identifierType");

    }

    public String getSubNavDataQaIdentifier(Integer index) {

        return driver.findElement(By.id(String.format(DETAILS_SUB_NAV_BUTTON_ID, index)))
                     .getAttribute("data-qa-identifier");

    }

    public String getSubNavButtonDescription(Integer index) {

        return driver.findElement(By.id(String.format(DETAILS_SUB_NAV_BUTTON_DESCRIPTION_ID, index)))
                     .getText();

    }

    public void clickSubNavButton(Integer index) {

        driver.findElement(By.id(String.format(DETAILS_SUB_NAV_BUTTON_ID, index)))
              .click();

    }

    public void clickSubNavButton(String identifierType, String identifier) {

        driver.getWebDriverWait()
              .until(ExpectedConditions.elementToBeClickable(By.xpath(String.format(DETAILS_SUB_NAV_BUTTON_DATA_QA_IDENTIFIER_XPATH, identifier))));
        driver.findElement(By.xpath(String.format(DETAILS_SUB_NAV_BUTTON_DATA_QA_IDENTIFIER_XPATH, identifier)))
              .click();

    }

    public List<Integer> getAllSubNavButtonIds() {

        List<WebElement> buttons = detailsSubNavButtons;
        List<Integer> ids = new ArrayList<>();
        for (WebElement button : buttons) {
            Integer buttonId = Integer.parseInt(button.getAttribute("id")
                                                      .split("-")[3]);
            ids.add(buttonId);
        }
        return ids;

    }

    public Integer getSubNavButtonId(String identifier) {

        return Integer.parseInt(driver.findElement(By.xpath(String.format(DETAILS_SUB_NAV_BUTTON_DATA_QA_IDENTIFIER_XPATH, identifier)))
                                      .getAttribute("id")
                                      .split("-")[3]);

    }

    public List<String> getAllSubNavButtonDescriptions() throws InterruptedException {

        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfAllElementsLocatedBy(By.xpath(DETAILS_SUB_NAV_BUTTON_DESCRIPTION_XPATH)));
        List<String> descriptions = new ArrayList<>();
        List<WebElement> subNavButtonDescriptions = detailsSubNavButtonDescriptions;
        for (WebElement description : subNavButtonDescriptions) {
            descriptions.add(description.getText());
        }
        return descriptions;

    }

    public void clickSubNavMore() {

        driver.getWebDriverWait()
              .until(ExpectedConditions.elementToBeClickable(By.id(DETAILS_SUB_NAV_MORE_BUTTON_ID)));
        detailsSubNavMoreButton.click();

    }

    public String getSubNavMoreButtonText() {

        driver.getWebDriverWait()
              .until(ExpectedConditions.elementToBeClickable(By.id(DETAILS_SUB_NAV_MORE_BUTTON_ID)));
        return detailsSubNavMoreButton.getText();

    }

    public Boolean isSubNavMoreButtonExpanded() {

        driver.getWebDriverWait()
              .until(ExpectedConditions.elementToBeClickable(By.id(DETAILS_SUB_NAV_MORE_BUTTON_ID)));
        WebElement we = driver.findElement(By.id("subnav-expand-selections"));
        String result = we.getAttribute("class");

        return result.contains("open");
    }

    public Boolean isSubNavMoreButtonDisplayed() {

        try {
            return detailsSubNavMoreButton.isDisplayed();
        } catch (NoSuchElementException e) {
            return false;
        }

    }

    public Boolean isSubNavMoreButtonActive() {

        driver.getWebDriverWait()
              .until(ExpectedConditions.elementToBeClickable(By.id(DETAILS_SUB_NAV_MORE_BUTTON_ID)));
        return detailsSubNavMoreButton.getAttribute("class")
                                      .contains("active");

    }

}
