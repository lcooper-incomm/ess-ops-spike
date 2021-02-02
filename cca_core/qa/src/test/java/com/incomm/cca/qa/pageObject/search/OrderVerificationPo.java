package com.incomm.cca.qa.pageObject.search;

import com.incomm.aqat.driver.AqatDriver;
import com.incomm.cca.qa.pageObject.BasePo;
import com.incomm.cca.qa.pageObject.details.DetailsPo;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;

import static com.incomm.aqat.util.AqatWait.waitForPageLoad;

public class OrderVerificationPo extends BasePo {

    //LOCATORS
    public static final String CONTAINER_ID = "verify-order-dialog";
    public static final String ORDER_VERIFICATION_VERIFIED_BUTTON_ID = "verified";  //material
    public static final String ORDER_VERIFICATION_NOT_VERIFIED_BUTTON_ID = "not-verified";  //material
    //WEB ELEMENTS
    @FindBy(id = CONTAINER_ID)
    public WebElement dialogContainer;
    @FindBy(id = ORDER_VERIFICATION_VERIFIED_BUTTON_ID)
    public WebElement orderVerificationVerifiedButton;
    @FindBy(id = ORDER_VERIFICATION_NOT_VERIFIED_BUTTON_ID)
    public WebElement orderVerificationNotVerifiedButton;

    //Constructor
    public OrderVerificationPo(AqatDriver driver) {
        super(driver);
        waitForPageLoad(driver);
        PageFactory.initElements(driver, this);
    }

    //Methods
    public boolean isDisplayed() {
        return dialogContainer.isDisplayed();
    }

    public void verifyOrder() {
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.id(ORDER_VERIFICATION_VERIFIED_BUTTON_ID)));
        driver.scrollToAndClickElement(orderVerificationVerifiedButton, 0);
        waitForTransitionOverlayToGoAway();
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.id(DetailsPo.DETAIL_CONTAINER_ID)));
    }

}
