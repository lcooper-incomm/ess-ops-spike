package com.incomm.cca.qa.pageObject.details;

import com.incomm.aqat.driver.AqatDriver;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;

/**
 * Created by Matt on 7/26/2016.
 */
public class AccountHolderPo extends DetailsPo {

    //LOCATORS
    //TODO Establish Locator Constants
    public static final String LOCATOR_ID = "";
    public static final String LOCATOR_CLASS = "";
    public static final String LOCATOR_XPATH = "";
    public static final String FIRST_NAME_ID = "account-holder-first-name";
    public static final String LAST_NAME_ID = "account-holder-last-name";
    @FindBy(id = FIRST_NAME_ID)
    public WebElement firstName;
    @FindBy(id = LAST_NAME_ID)
    public WebElement lastName;
    //WEB ELEMENTS
    //TODO Establish Web Elements
    @FindBy(id = LOCATOR_ID)
    WebElement locatorId;
    @FindBy(className = LOCATOR_CLASS)
    WebElement locatorClass;
    @FindBy(xpath = LOCATOR_XPATH)
    WebElement locatorXpath;

    public AccountHolderPo(AqatDriver driver) {
        super(driver);
    }

    public String getFirstName() {
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.id(FIRST_NAME_ID)));
        return firstName.getText();
    }

    public String getLastName() {
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.id(LAST_NAME_ID)));
        return lastName.getText();
    }

    public Boolean isAccountHolderDisplayed() {

        //TODO Page Validator
        return true;

    }

}
