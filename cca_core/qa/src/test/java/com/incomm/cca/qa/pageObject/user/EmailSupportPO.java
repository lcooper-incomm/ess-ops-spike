package com.incomm.cca.qa.pageObject.user;

import com.incomm.aqat.driver.AqatDriver;
import com.incomm.cca.qa.pageObject.BasePo;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.PageFactory;

import static com.incomm.aqat.util.AqatWait.waitForPageLoad;

/**
 * Created by gscholes on 9/11/2019
 */
public class EmailSupportPO extends BasePo {

    public static final By HEADER_TEXT = By.className("header-container");
    public static final By INSTRUCTION_TEXT = By.id("instruction-text");
    public static final By CANCEL_BUTTON = By.id("close-button");
    public static final By BACK_BUTTON = By.id("back-button");
    public static final By SUBMIT_BUTTON = By.id("next-button");
    public static final By MESSAGE_TEXT_AREA = By.id("email-support-textarea-input");
    public static final By SUBJECT_TEXT_AREA = By.cssSelector("cca-text-field#email-support-subject-input");

    public EmailSupportPO(final AqatDriver driver) {
        super(driver);
        waitForPageLoad(driver);
        PageFactory.initElements(driver, this);
    }

    /*
     * Subject
     * ***************************************************************
     */

    public WebElement getSubjectElement() {
        return driver.findElement(SUBJECT_TEXT_AREA);
    }

    public String getSubject() {
        return getSubjectElement().getAttribute("value");
    }

    public void setSubject(String value) {
        getSubjectElement().sendKeys(value);
    }

    /*
     * Message
     * ***************************************************************
     */

    public WebElement getMessageElement() {
        return driver.findElement(MESSAGE_TEXT_AREA);
    }

    public String getMessage() {
        return getMessageElement().getAttribute("value");
    }

    public void setMessage(String value) {
        getMessageElement().sendKeys(value);
    }

    /*
     * Nextbutton
     * ***************************************************************
     */

    public WebElement getSubmitButtonElement() {
        return driver.findElement(SUBMIT_BUTTON);
    }

    public void clickSubmitButton() {
        getSubmitButtonElement().click();
    }

    /*
     * Backbutton
     * ***************************************************************
     */

    public WebElement getBackbuttonElement() {
        return driver.findElement(BACK_BUTTON);
    }

    public void clickBackbutton() {
        getBackbuttonElement().click();
    }

    /*
     * Closebutton
     * ***************************************************************
     */

    public WebElement getClosebuttonElement() {
        return driver.findElement(CANCEL_BUTTON);
    }

    public void clickClosebutton() {
        getClosebuttonElement().click();
    }

    /*
     * Instructiontext
     * ***************************************************************
     */

    public WebElement getInstructiontextElement() {
        return driver.findElement(INSTRUCTION_TEXT);
    }

    public String getInstructiontext() {
        return getInstructiontextElement().getText();
    }

    /*
     * EmailCcaSupport
     * ***************************************************************
     */

    public WebElement getEmailCcaSupportElement() {
        return driver.findElement(HEADER_TEXT);
    }

    public String getEmailCcaSupport() {
        return getEmailCcaSupportElement().getText();
    }
}
