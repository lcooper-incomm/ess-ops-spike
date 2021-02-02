package com.incomm.cca.qa.pageObject.toast;

import com.incomm.aqat.driver.AqatDriver;
import com.incomm.cca.qa.pageObject.BasePo;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;

import java.util.ArrayList;
import java.util.List;

import static com.incomm.aqat.util.AqatWait.waitForPageLoad;

/**
 * Created by Allen on 2/2/2017.
 */
public class ToastPO extends BasePo {

    /*
    Locators
     */
    public static final String ATTRIBUTE_TOAST_LEVEL = "data-qa-toast-level";
    public static final String TOAST_CONTAINER_ID = "toast-container";
    public static final String TOAST_MESSAGE_ID = "toast-message";
    public static final String TOAST_NON_LINK_CORRELATION_ID_ID = "toast-correlation-id";
    public static final String TOAST_LINK_CORRELATION_ID_ID = "toast-splunk-link";
    public static final String TOAST_ACTION_BUTTONS_XPATH = "//button[contains(@class, 'toast-action')]";
    public static final String TOAST_ACTION_BUTTON_XPATH = "//button[contains(@class, 'toast-action') and text()='%s']";
    /*
    WebElements
     */
    @FindBy(id = TOAST_CONTAINER_ID)
    public WebElement toastContainer;
    @FindBy(id = TOAST_MESSAGE_ID)
    public WebElement toastMessage;
    @FindBy(id = TOAST_NON_LINK_CORRELATION_ID_ID)
    public WebElement toastNonLinkCorrelationId;
    @FindBy(id = TOAST_LINK_CORRELATION_ID_ID)
    public WebElement toastLinkCorrelationId;

    public ToastPO(AqatDriver driver) {
        super(driver);
        waitForPageLoad(driver);
        PageFactory.initElements(driver, this);
    }
	
    /*
    Methods
     */

    /**
     * Returns whether the toast is displayed, after waiting
     */
    public boolean isToastDisplayed() {
        return toastContainer.isDisplayed();
    }

    /**
     * Returns whether the toast is displayed RIGHT NOW, without waiting
     */
    public boolean isToastDisplayedNow() {
        return isElementDisplayedNow(By.id(TOAST_CONTAINER_ID));
    }

    public String getToastLevel() {
        return toastContainer.getAttribute(ATTRIBUTE_TOAST_LEVEL);
    }

    public String getToastText() {
        return toastMessage.getText();
    }

    public void dismissToast() {
        toastContainer.click();
        driver.getWebDriverWait()
              .until(ExpectedConditions.invisibilityOfElementLocated(By.id(TOAST_CONTAINER_ID)));
    }

    /**
     * Returns whether the correlation ID is displayed, after waiting
     */
    public boolean isNonLinkCorrelationIdDisplayed() {
        return toastNonLinkCorrelationId.isDisplayed();
    }

    /**
     * Returns whether the correlation ID is displayed RIGHT NOW, without waiting
     */
    public boolean isNonLinkCorrelationIdDisplayedNow() {
        return isElementDisplayedNow(By.id(TOAST_NON_LINK_CORRELATION_ID_ID));
    }

    public String getNonLinkCorrelationIdText() {
        return toastNonLinkCorrelationId.getText();
    }

    /**
     * Returns whether the correlation ID is displayed, after waiting
     */
    public boolean isLinkCorrelationIdDisplayed() {
        return toastLinkCorrelationId.isDisplayed();
    }

    /**
     * Returns whether the correlation ID is displayed RIGHT NOW, without waiting
     */
    public boolean isLinkCorrelationIdDisplayedNow() {
        return isElementDisplayedNow(By.id(TOAST_NON_LINK_CORRELATION_ID_ID));
    }

    public String getLinkCorrelationIdText() {
        return toastLinkCorrelationId.getText();
    }

    public void clickLinkCorrelationId() {
        toastLinkCorrelationId.click();
    }

    public List<WebElement> getActionButtons() {
        return toastContainer.findElements(By.xpath(TOAST_ACTION_BUTTONS_XPATH));
    }

    public List<String> getActionButtonsText() {
        List<WebElement> buttonElements = getActionButtons();
        List<String> values = new ArrayList<>();

        for (WebElement buttonElement : buttonElements) {
            values.add(buttonElement.getText());
        }

        return values;
    }

    public WebElement getActionButtonByText(String value) {
        return toastContainer.findElement(By.xpath(String.format(TOAST_ACTION_BUTTON_XPATH, value)));
    }

    public void clickActionButtonWithText(String value) {
        getActionButtonByText(value).click();
    }
}
