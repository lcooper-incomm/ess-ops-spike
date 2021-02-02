package com.incomm.cca.qa.pageObject.details;

import com.incomm.aqat.driver.AqatDriver;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;

/**
 * Created by Matt on 7/26/2016.
 */
public class TerminalsPo extends DetailsPo {

    // LOCATORS
    public static final String TERMINALS_WRAPPER_ID = "terminals-wrapper";  //material
    // WEB ELEMENTS
    @FindBy(id = TERMINALS_WRAPPER_ID)
    WebElement terminalsWrapper;

    public TerminalsPo(AqatDriver driver) {
        super(driver);
    }

    public Boolean isTerminalsDisplayed() {

        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.id(TERMINALS_WRAPPER_ID)));
        return terminalsWrapper.isDisplayed();

    }

}
