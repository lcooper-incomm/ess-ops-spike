package com.incomm.cca.qa.pageObject.details;

import com.incomm.aqat.driver.AqatDriver;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;

/**
 * Created by Matt on 7/26/2016.
 */
public class SummaryProductPo extends DetailsPo {

    //LOCATORS
    public static final String DETAILS_PRODUCT_SUMMARY_WRAPPER_ID = "product-summary-status-wrapper";
    public static final String DETAILS_PRODUCT_SUMMARY_SERIAL_NUMBER_ID = "product-summary-serial-number";
    public static final String DETAILS_PRODUCT_SUMMARY_ACCOUNT_NUMBER_ID = "product-summary-account-number";
    public static final String DETAILS_PRODUCT_SUMMARY_PIN_ID = "product-summary-pin";
    //WEB ELEMENTS
    @FindBy(id = DETAILS_PRODUCT_SUMMARY_WRAPPER_ID)
    WebElement detailsProductSummaryWrapper;
    @FindBy(id = DETAILS_PRODUCT_SUMMARY_SERIAL_NUMBER_ID)
    WebElement detailsProductSummarySerialNumber;
    @FindBy(id = DETAILS_PRODUCT_SUMMARY_ACCOUNT_NUMBER_ID)
    WebElement detailsProductSummaryAccountNumber;
    @FindBy(id = DETAILS_PRODUCT_SUMMARY_PIN_ID)
    WebElement detailsProductSummaryPin;

    public SummaryProductPo(AqatDriver driver) {
        super(driver);
    }

    public Boolean isSummaryDisplayed() {

        return detailsProductSummaryWrapper.isDisplayed();

    }

    public String getSerialNumber() {

        return detailsProductSummarySerialNumber.getText();

    }

    public String getAccountNumber() {

        return detailsProductSummaryAccountNumber.getText()
                                                 .replace(" ", "");

    }

    public String getPin() {

        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.id(DETAILS_PRODUCT_SUMMARY_PIN_ID)));
        return detailsProductSummaryPin.getText();

    }

}
