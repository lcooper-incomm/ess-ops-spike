package com.incomm.cca.qa.pageObject.dashboard;

import com.incomm.aqat.driver.AqatDriver;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;

public class C2CTransferRequestsPo extends DashboardPo {

    //MESSAGES
    public static final String MESSAGE_C2C_TRANSFER_REQUESTS_WIDGET_HEADER_TEXT = "C2C Transfer Requests";
    public static final String MESSAGE_C2C_TRANSFER_REQUESTS_NO_REQUESTS = "There are no C2C Transfer requests pending approval.";
    //LOCATORS
    public static final String C2C_TRANSFER_REQUESTS_WIDGET_ID = "c2c-approval-widget";  //material
    public static final String C2C_TRANSFER_REQUESTS_HEADER_ID = "c2c-approval-widget-header";  //material
    public static final String C2C_TRANSFER_REQUESTS_HELP_ID = "c2c-transfer-requests-help";
    public static final String C2C_TRANSFER_REQUESTS_REFRESH_ID = "c2c-transfer-requests-refresh";
    public static final String C2C_TRANSFER_REQUESTS_VIEW_ID = "c2c-transfer-requests-view"; //View Button
    public static final String C2C_TRANSFER_REQUESTS_NO_REQUESTS_ID = "c2c-transfer-requests-no-requests"; //No Requests message
    //WEB ELEMENTS
    @FindBy(id = C2C_TRANSFER_REQUESTS_WIDGET_ID)
    WebElement c2cTransferRequestsWidget;
    @FindBy(id = C2C_TRANSFER_REQUESTS_HEADER_ID)
    WebElement c2cTransferRequestsHeader;
    @FindBy(id = C2C_TRANSFER_REQUESTS_HELP_ID)
    WebElement c2cTransferRequestsHelp;
    @FindBy(id = C2C_TRANSFER_REQUESTS_REFRESH_ID)
    WebElement c2cTransferRequestsRefresh;
    @FindBy(id = C2C_TRANSFER_REQUESTS_VIEW_ID)
    WebElement c2cTransferRequestsView;
    @FindBy(id = C2C_TRANSFER_REQUESTS_NO_REQUESTS_ID)
    WebElement c2cTransferRequestsNoRequests;

    public C2CTransferRequestsPo(AqatDriver driver) {
        super(driver);
    }

    public Boolean isC2cTransferRequestsWidgetDisplayed() {

        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.id(C2C_TRANSFER_REQUESTS_WIDGET_ID)));
        return c2cTransferRequestsWidget.isDisplayed();

    }

    public String getC2cTransferRequestsLabelText() {

        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.id(C2C_TRANSFER_REQUESTS_HEADER_ID)));
        return c2cTransferRequestsHeader.getText();

    }

}
