package com.incomm.cca.qa.pageObject.search;

import com.incomm.aqat.driver.AqatDriver;
import com.incomm.cca.qa.pageObject.BasePo;
import com.incomm.cca.qa.pageObject.details.DetailsPo;
import com.incomm.cca.qa.pageObject.details.TransactionHistoryPo;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;

import static com.incomm.aqat.util.AqatWait.waitForPageLoad;

/**
 * Page Object for the Customer Verification Modal

 */
public class CustomerVerificationPo extends BasePo {

    public static final By VERIFIED_BUTTON = By.id("verified");
    //WEB ELEMENTS
    @FindBy(id = "verify-customer-dialog")
    public WebElement dialogContainer;
    @FindBy(id = "verified")
    public WebElement custVerificationVerifiedButton;
    @FindBy(id = "not-verified")
    public WebElement custVerificationNotVerifiedButton;

    public CustomerVerificationPo(AqatDriver driver) {
        super(driver);
        waitForPageLoad(driver);
        PageFactory.initElements(driver, this);
    }

    public boolean isDisplayed() {
        return dialogContainer.isDisplayed();
    }

    public void verifyCustomer() {
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(VERIFIED_BUTTON));
        driver.scrollToAndClickElement(custVerificationVerifiedButton, 0);
        waitForTransitionOverlayToGoAway();
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(DetailsPo.CONTAINER));
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(TransactionHistoryPo.HISTORY_CONTAINER));
    }

}
