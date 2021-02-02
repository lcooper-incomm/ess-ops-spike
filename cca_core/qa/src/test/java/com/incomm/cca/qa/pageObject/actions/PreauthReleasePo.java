package com.incomm.cca.qa.pageObject.actions;

import com.incomm.aqat.driver.AqatDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

/**
 * Created by Matt on 7/27/2016.
 */
public class PreauthReleasePo extends ActionDialogPO {

    //LOCATORS
    //TODO Establish Locator Constants
    public static final String LOCATOR_ID = "";
    public static final String LOCATOR_CLASS = "";
    public static final String LOCATOR_XPATH = "";
    //WEB ELEMENTS
    //TODO Establish Web Elements
    @FindBy(id = LOCATOR_ID)
    WebElement locatorId;
    @FindBy(className = LOCATOR_CLASS)
    WebElement locatorClass;
    @FindBy(xpath = LOCATOR_XPATH)
    WebElement locatorXpath;

    public PreauthReleasePo(AqatDriver driver) {
        super(driver);
    }

    public Boolean isPreauthReleaseDisplayed() {

        //TODO Page Validator
        return true;

    }

}
