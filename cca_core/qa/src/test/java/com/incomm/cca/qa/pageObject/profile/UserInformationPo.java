package com.incomm.cca.qa.pageObject.profile;

import com.incomm.aqat.driver.AqatDriver;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;

/**
 * Created by Matt on 7/26/2016.
 */
public class UserInformationPo extends ProfilePo {

    // MESSAGES
    public static final String MESSAGE_USER_INFO_HEADER = "User Information";
    //LOCATORS
    public static final String USER_INFO_WRAPPER_ID = "user-info-wrapper";
    public static final String USER_INFO_HEADER_ID = "user-info-header";
    //WEB ELEMENTS
    @FindBy(id = USER_INFO_WRAPPER_ID)
    public WebElement userInfoWrapper;
    @FindBy(id = USER_INFO_HEADER_ID)
    public WebElement userInfoHeader;

    public UserInformationPo(AqatDriver driver) {
        super(driver);
    }

    public Boolean isUserInformationDisplayed() {

        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.id(USER_INFO_WRAPPER_ID)));
        return userInfoWrapper.isDisplayed();

    }

    public String getUserInformationHeaderText() {

        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.id(USER_INFO_HEADER_ID)));
        return userInfoHeader.getText();

    }

}
