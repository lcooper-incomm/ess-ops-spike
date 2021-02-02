package com.incomm.cca.qa.pageObject.details;

import com.incomm.aqat.driver.AqatDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

/**
 * Created by Matt on 7/26/2016.
 */
public class SummaryCustomerPo extends DetailsPo {

    //LOCATORS
    public static final String LOCATOR_ID = "";
    //WEB ELEMENTS
    @FindBy(id = LOCATOR_ID)
    WebElement locatorId;

    public SummaryCustomerPo(AqatDriver driver) {
        super(driver);
    }

    public Boolean isCustomerSummaryDisplayed() {

        return true;

    }

}
