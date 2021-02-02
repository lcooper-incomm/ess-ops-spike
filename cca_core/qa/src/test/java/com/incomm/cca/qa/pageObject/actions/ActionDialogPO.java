package com.incomm.cca.qa.pageObject.actions;

import com.incomm.aqat.driver.AqatDriver;
import com.incomm.cca.qa.pageObject.BasePo;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;

import static com.incomm.aqat.util.AqatWait.waitForPageLoad;

/**
 * Represents an action framework dialog (not an "embedded dialog", but a true dialog)
 */
public abstract class ActionDialogPO extends BasePo {

    // MESSAGES
    public final static String MESSAGE_SUCCESS_TEXT = "The action completed successfully.";
    /*
    LOCATORS
     */
    public final static String ATTRIBUTE_DIALOG_PAGE = "data-qa-dialog-page";
    public final static String DIALOG_CONTAINER_ID = "action-dialog";
    public final static String DIALOG_NEXT_BUTTON_ID = "action-modal-next";  // SUBMIT, YES, CLOSE (Blue)
    public final static String DIALOG_BACK_BUTTON_ID = "action-modal-back";  // NO
    public final static String DIALOG_CANCEL_BUTTON_ID = "action-modal-cancel";  // CANCEL, CLOSE (White)
    public final static String DIALOG_CANCEL_TOP_BUTTON_ID = "action-modal-cancel-top";  // The "X" in the upper-right corner of the modal.
    public final static String DIALOG_HEADER_ID = "action-modal-header";
    public final static String SUCCESS_MESSAGE_ID = "success-message";
    public final static String FAILURE_MESSAGE_ID = "failure-message";
    public final static String INSTRUCTIONS_ID = "instructions";
    public final static String INSTRUCTIONS_CONTAINER_ID = "instructions-container";
    public final static String ALERT_CONTAINER_ID = "alert-container";
    public final static String ALERT_ID = "alert";
    public final static String DIALOG_SPINNER_XPATH = "//div[contains(@class, 'spinner-action-modal-spinner')]";
    /*
    WEB ELEMENTS
     */
    @FindBy(id = DIALOG_CONTAINER_ID)
    public WebElement dialogContainer;
    @FindBy(id = DIALOG_NEXT_BUTTON_ID)
    public WebElement btnNext;
    @FindBy(id = DIALOG_BACK_BUTTON_ID)
    public WebElement btnBack;
    @FindBy(id = DIALOG_CANCEL_BUTTON_ID)
    public WebElement btnCancel;
    @FindBy(id = DIALOG_CANCEL_TOP_BUTTON_ID)
    public WebElement btnUpperRightCancel;
    @FindBy(id = DIALOG_HEADER_ID)
    public WebElement dialogHeader;
    @FindBy(id = SUCCESS_MESSAGE_ID)
    public WebElement successMessage;
    @FindBy(id = FAILURE_MESSAGE_ID)
    public WebElement failureMessage;
    @FindBy(id = INSTRUCTIONS_ID)
    public WebElement instructions;
    @FindBy(id = INSTRUCTIONS_CONTAINER_ID)
    public WebElement instructionsContainer;
    @FindBy(id = ALERT_CONTAINER_ID)
    public WebElement alertContainer;
    @FindBy(id = ALERT_ID)
    public WebElement alert;
    @FindBy(xpath = DIALOG_SPINNER_XPATH)
    public WebElement dialogLoadingSpinner;

    public ActionDialogPO(AqatDriver driver) {
        super(driver);
        waitForPageLoad(driver);
        PageFactory.initElements(driver, this);
    }

    public boolean isDisplayed() {
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.id(DIALOG_CONTAINER_ID)));
        return dialogContainer.isDisplayed();
    }

    /**
     * Returns whether the button is showing, after waiting.
     */
    public boolean isNextButtonDisplayed() {
        return btnNext.isDisplayed();
    }

    /**
     * Returns whether the button is showing NOW, without waiting.
     */
    public boolean isNextButtonDisplayedNow() {
        return isElementDisplayedNow(By.id(DIALOG_NEXT_BUTTON_ID));
    }

    /**
     * Returns whether the button is showing, after waiting.
     */
    public boolean isBackButtonDisplayed() {
        return btnBack.isDisplayed();
    }

    /**
     * Returns whether the button is showing NOW, without waiting.
     */
    public boolean isBackButtonDisplayedNow() {
        return isElementDisplayedNow(By.id(DIALOG_BACK_BUTTON_ID));
    }

    /**
     * Returns whether the button is showing, after waiting.
     */
    public boolean isCancelButtonDisplayed() {
        return btnCancel.isDisplayed();
    }

    /**
     * Returns whether the button is showing NOW, without waiting.
     */
    public boolean isCancelButtonDisplayedNow() {
        return isElementDisplayedNow(By.id(DIALOG_CANCEL_TOP_BUTTON_ID));
    }

    /**
     * Returns whether the button is showing, after waiting.
     */
    public boolean isUpperRightCancelButtonDisplayed() {
        return btnUpperRightCancel.isDisplayed();
    }

    /**
     * Returns whether the button is showing NOW, without waiting.
     */
    public boolean isUpperRightCancelButtonDisplayedNow() {
        return isElementDisplayedNow(By.id(DIALOG_CANCEL_TOP_BUTTON_ID));
    }

    public boolean isNextButtonEnabled() {
        return btnNext.isEnabled();
    }

    public boolean isNextButtonDisabled() {
        return !isNextButtonEnabled();
    }

    /**
     * Clicks next without waiting for any special condition afterward
     */
    public void clickNext() {
        btnNext.click();
    }

    /**
     * Clicks next and waits for the "data-qa-dialog-page" attribute to be set to the specified page
     */
    public void clickNextAndExpectNextPageToBe(DialogPage page) {
        btnNext.click();
        driver.getWebDriverWait()
              .until(ExpectedConditions.attributeToBe(dialogContainer, ATTRIBUTE_DIALOG_PAGE, page.toString()));
    }

    /**
     * Clicks next and waits for the dialog to fully close
     */
    public void clickNextAndExpectDialogToClose() {
        btnNext.click();
        driver.getWebDriverWait()
              .until(ExpectedConditions.invisibilityOfElementLocated(By.id(DIALOG_CONTAINER_ID)));
    }

    public boolean isCancelButtonEnabled() {
        return btnCancel.isEnabled();
    }

    public boolean isCancelButtonDisabled() {
        return !isCancelButtonEnabled();
    }

    /**
     * Clicks Cancel/Close and waits for dialog to fully close
     */
    public void clickCancel() {
        btnCancel.click();
        driver.getWebDriverWait()
              .until(ExpectedConditions.invisibilityOfElementLocated(By.id(DIALOG_CONTAINER_ID)));
    }

    public boolean isUpperRightCancelButtonEnabled() {
        return btnUpperRightCancel.isEnabled();
    }

    public boolean isUpperRightCancelButtonDisabled() {
        return !isUpperRightCancelButtonEnabled();
    }

    public void clickUpperRightCancel() {
        btnUpperRightCancel.click();
        driver.getWebDriverWait()
              .until(ExpectedConditions.invisibilityOfElementLocated(By.id(DIALOG_CONTAINER_ID)));
    }

    public boolean isBackButtonEnabled() {
        return btnBack.isEnabled();
    }

    public boolean isBackButtonDisabled() {
        return !isBackButtonEnabled();
    }

    /**
     * Clicks back button without waiting for any special condition afterward
     */
    public void clickBack() {
        btnBack.click();
    }

    /**
     * Clicks back and waits for the "data-qa-dialog-page" attribute to be set to the given page
     */
    public void clickBackAndExpectPageToBe(DialogPage page) {
        btnBack.click();
        driver.getWebDriverWait()
              .until(ExpectedConditions.attributeToBe(dialogContainer, ATTRIBUTE_DIALOG_PAGE, page.toString()));
    }

    public String getNextButtonText() {
        return btnNext.getText();
    }

    public String getBackButtonText() {
        return btnBack.getText();
    }

    public String getCancelButtonText() {
        return btnCancel.getText();
    }

    /**
     * Returns whether the success message is displayed, after waiting
     */
    public boolean isSuccessMessageDisplayed() {
        return successMessage.isDisplayed();
    }

    /**
     * Returns whether the success message is displayed RIGHT NOW, without waiting
     */
    public boolean isSuccessMessageDisplayedNow() {
        return isElementDisplayedNow(By.id(SUCCESS_MESSAGE_ID));
    }

    public String getSuccessMessageText() {
        driver.getWebDriverWait()
              .until(ExpectedConditions.visibilityOf(successMessage));
        return successMessage.getText();
    }

    /**
     * Returns whether the failure message is displayed, after waiting
     */
    public boolean isFailureMessageDisplayed() {
        return failureMessage.isDisplayed();
    }

    /**
     * Returns whether the failure message is displayed RIGHT NOW, without waiting
     */
    public String getFailureMessageText() {
        return failureMessage.getText();
    }

    /**
     * Returns whether instructions are displayed, after waiting
     */
    public boolean isInstructionsDisplayed() {
        return instructionsContainer.isDisplayed();
    }

    /**
     * Returns whether instructions are displayed RIGHT NOW, without waiting
     */
    public boolean isInstructionsDisplayedNow() {
        return isElementDisplayedNow(By.id(INSTRUCTIONS_CONTAINER_ID));
    }

    public String getInstructionsText() {
        return instructions.getText();
    }

    /**
     * Returns whether an alert is displayed, after waiting
     */
    public boolean isAlertDisplayed() {
        return alertContainer.isDisplayed();
    }

    /**
     * Returns whether an alert is displayed RIGHT NOW, without waiting
     */
    public boolean isAlertDisplayedNow() {
        return isElementDisplayedNow(By.id(ALERT_CONTAINER_ID));
    }

    public String getAlertText() {
        return alert.getText();
    }

    public void waitForDialogLoadingSpinner() {
        driver.getWebDriverWait()
              .until(ExpectedConditions.invisibilityOfElementLocated(By.xpath(DIALOG_SPINNER_XPATH)));
    }

    /**
     * Returns whether the dialog loading spinner is displayed, after waiting
     */
    public boolean isDialogLoadingSpinnerDisplayed() {
        return dialogLoadingSpinner.isDisplayed();
    }

    /**
     * Returns whether the dialog loading spinner is displayed RIGHT NOW, without waiting
     */
    public boolean isDialogLoadingSpinnerDisplayedNow() {
        return isElementDisplayedNow(By.xpath(DIALOG_SPINNER_XPATH));
    }

    public enum DialogPage {
        VALIDATION_PROMPT,
        VALIDATION_FORM,
        FORM,
        CONFIRM,
        SUCCESS,
        FAILURE
    }
}
