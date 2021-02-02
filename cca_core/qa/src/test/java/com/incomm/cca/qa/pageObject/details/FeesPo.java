package com.incomm.cca.qa.pageObject.details;

import com.incomm.aqat.driver.AqatDriver;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;

/**
 * Page Object for the VMS_GPR Fee Plan screen
 * <p>
 * User: Darren Carpenter (dcarpenter)
 * Date: 12/15/2016
 */
public class FeesPo extends DetailsPo {

    //MESSAGES
    public static final String MESSAGE_FEES_HEADER_TEXT = "Current Fee Plan Summary";
    public static final String MESSAGE_CHANGE_FEE_PLAN_SUCCESS_TEXT = "The action completed successfully.";
    //LOCATORS
    public static final String FEES_WRAPPER_ID = "fees-outer-wrapper";  //material
    public static final String FEES_LABEL_XPATH = "//*[@id='fees-label']/div/div/span";  //material
    public static final String FEES_CHANGE_FEE_PLAN_BUTTON_ID = "change-fee-plan-button";  //material
    public static final String FEES_SELECT_PLAN_BUTTON_XPATH = "(//md-whiteframe/div/button[contains(@class,'md-button')])[2]";  //material
    public static final String FEES_CHANGE_FEE_PLAN_COMMENT_XPATH = "//*[@id='change-fee-plan-comment']/div/textarea";  //material
    public static final String FEES_CHANGE_FEE_PLAN_SUCCESS_ID = "success-message";  //material
    public static final String FEES_CURRENT_NAME_PLAN_ID = "current-fee-plan-name";
    public static final String FEES_COLUMN_HEADER_DESCRIPTION_XPATH = "//*[@class='cs-table']//div[contains(@label,'Description')]";
    public static final String FEES_Column_Header_AMOUNT_XPATH = "//*[@class='cs-table']//div[@label='Amount']";
    //WEB ELEMENTS
    @FindBy(id = FEES_WRAPPER_ID)
    public WebElement feesWrapper;
    @FindBy(xpath = FEES_LABEL_XPATH)
    public WebElement feesLabel;
    @FindBy(id = FEES_CHANGE_FEE_PLAN_BUTTON_ID)
    public WebElement feesChangeFeePlanButton;
    @FindBy(xpath = FEES_SELECT_PLAN_BUTTON_XPATH)
    public WebElement feesSelectPlanButton;
    @FindBy(xpath = FEES_CHANGE_FEE_PLAN_COMMENT_XPATH)
    public WebElement feesChangeFeePlanComment;
    @FindBy(id = FEES_CHANGE_FEE_PLAN_SUCCESS_ID)
    public WebElement feesChangeFeePlanSuccess;
    @FindBy(id = FEES_CURRENT_NAME_PLAN_ID)
    public WebElement feesCurrentNamePlan;
    @FindBy(xpath = FEES_COLUMN_HEADER_DESCRIPTION_XPATH)
    public WebElement feesColumnHeaderDescription;
    @FindBy(xpath = FEES_Column_Header_AMOUNT_XPATH)
    public WebElement feesColumnHeaderAmount;

    public FeesPo(AqatDriver driver) {
        super(driver);
    }

    public Boolean isFeesDisplayed() {

        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.id(FEES_WRAPPER_ID)));
        return feesWrapper.isDisplayed();
    }

    public String getFeesLabelText() {

        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(FEES_LABEL_XPATH)));
        return feesLabel.getText();
    }

    public String getCurrentNamePlan() {
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.id(FEES_CURRENT_NAME_PLAN_ID)));
        return feesCurrentNamePlan.getText();
    }

    public void sortByDescription() {
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(FEES_COLUMN_HEADER_DESCRIPTION_XPATH)));
        feesColumnHeaderDescription.click();
    }

    public void sortByAmount() {
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(FEES_Column_Header_AMOUNT_XPATH)));
        feesColumnHeaderAmount.click();

    }
}
