package com.incomm.cca.qa.pageObject.details;

import com.incomm.aqat.driver.AqatDriver;
import com.incomm.cca.qa.pageObject.BasePo;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;

import static com.incomm.aqat.util.AqatWait.waitForPageLoad;

/**
 * Created by Matt on 7/26/2016.
 */
public class DetailsPo extends BasePo {

    //LOCATORS
    public static final String ACCOUNT_HOLDER_BUTTON_XPATH = "//*[@id='right-detail-nav-account-holder']/button";
    public static final String FEES_TAB_BUTTON_XPATH = "//*[@id='right-detail-nav-fees']/button";
    public static final String TRANSACTION_HISTORY_TAB_BUTTON_XPATH = "//*[@id='right-detail-nav-transaction-history']/button";
    public static final String ACCOUNT_HISTORY_TAB_BUTTON_XPATH = "//*[@id='right-detail-nav-account-history']/button";
    public static final String ITEMS_TAB_BUTTON_CSS = "#right-detail-nav-items button";
    public static final String NOTES_TAB_BUTTON_XPATH = "//*[@id='right-detail-nav-notes']/button";
    public static final String NOTIFICATIONS_TAB_BUTTON_CSS = "#right-detail-nav-notifications button";
    public static final String SHIPMENTS_TAB_BUTTON_CSS = "#right-detail-nav-shipments button";
    public static final String PROCESSING_HISTORY_TAB_BUTTON_CSS = "#right-detail-nav-processing button";
    public static final String DETAIL_CONTAINER_ID = "detail-container";  //material
    public static final String DETAILS_LOCATION_DETAIL_WRAPPER = "location-detail-wrapper";
    public static final String DETAILS_PRODUCT_DETAIL_WRAPPER = "location-detail-wrapper";
    // "RIGHT-DETAIL-CONTAINER" NAV BAR LOCATORS
    public static final String RIGHT_DETAIL_NAV_FEES_XPATH = "//*[@id='right-detail-nav-fees']/button";  //material
    public static final String RIGHT_DETAIL_NAV_TRANSACTION_HISTORY_XPATH = "//*[@id='right-detail-nav-transaction-history']/button";  //material
    public static final String RIGHT_DETAIL_NAV_NOTES_XPATH = "//*[@id='right-detail-nav-notes']/button";  //material
    public static final String RIGHT_DETAIL_NAV_ACCOUNT_HISTORY_XPATH = "//*[@id='right-detail-nav-account-history']/button";  //material
    public static final String RIGHT_DETAIL_NAV_ACCOUNT_HOLDER_XPATH = "//*[@id='right-detail-nav-account-holder']/button";  //material
    public static final String RIGHT_DETAIL_NAV_LIMITS_XPATH = "//*[@id='right-detail-nav-limits']/button";  //material
    public static final String RIGHT_DETAIL_NAV_TERMINALS_XPATH = "//*[@id='right-detail-nav-terminals']/button";  //material
    // LEFT-DETAIL-CONTAINER ELEMENTS
    public static final String LEFT_DETAIL_PAYMENT_DETAILS_XPATH = "//*[@id='order-summary-container']/order-purchase-section/section/div[2]/span[2]/a";
    // PAYMENT DETAILS MODAL
    public static final String AUTHORIZATION_CODE_XPATH = "//*[@id=\"dialogContent_payment-details-dialog\"]/div/key-value-label[4]/div/span[2]";
    // SUB-NAV
    public static final String DETAILS_SUMMARY_LOADING_SPINNER_ID = "loading-spinner-summary";
    public static final String DETAILS_HISTORY_LOADING_SPINNER_ID = "loading-spinner-history";
    public static final String DETAILS_LOADING_SPINNER_DETAIL = "loading-spinner-detail";
    public static final By CONTAINER = By.id(DetailsPo.DETAIL_CONTAINER_ID);
    //WEB ELEMENTS
    @FindBy(id = DETAIL_CONTAINER_ID)
    public WebElement detailContainer;
    @FindBy(id = DETAILS_LOCATION_DETAIL_WRAPPER)
    public WebElement detailsLocationDetailWrapper;
    @FindBy(id = DETAILS_PRODUCT_DETAIL_WRAPPER)
    public WebElement detailsProductDetailWrapper;
    @FindBy(xpath = RIGHT_DETAIL_NAV_FEES_XPATH)
    public WebElement rightDetailNavFees;
    @FindBy(xpath = RIGHT_DETAIL_NAV_TRANSACTION_HISTORY_XPATH)
    public WebElement rightDetailNavTransactionHistory;
    @FindBy(xpath = RIGHT_DETAIL_NAV_NOTES_XPATH)
    public WebElement rightDetailNavNotes;
    @FindBy(xpath = RIGHT_DETAIL_NAV_ACCOUNT_HISTORY_XPATH)
    public WebElement rightDetailNavAccountHistory;
    @FindBy(xpath = RIGHT_DETAIL_NAV_ACCOUNT_HOLDER_XPATH)
    public WebElement rightDetailNavAccountHolder;
    @FindBy(xpath = RIGHT_DETAIL_NAV_LIMITS_XPATH)
    public WebElement rightDetailNavLimits;
    @FindBy(xpath = RIGHT_DETAIL_NAV_TERMINALS_XPATH)
    public WebElement rightDetailNavTerminals;
    @FindBy(xpath = TRANSACTION_HISTORY_TAB_BUTTON_XPATH)
    public WebElement transactionHistoryTab;
    @FindBy(xpath = ACCOUNT_HISTORY_TAB_BUTTON_XPATH)
    public WebElement accountHistoryTab;
    @FindBy(css = ITEMS_TAB_BUTTON_CSS)
    public WebElement itemsTab;
    @FindBy(xpath = NOTES_TAB_BUTTON_XPATH)
    public WebElement notesTab;
    @FindBy(css = NOTIFICATIONS_TAB_BUTTON_CSS)
    public WebElement notificationsTab;
    @FindBy(css = SHIPMENTS_TAB_BUTTON_CSS)
    public WebElement shipmentsTab;
    @FindBy(css = PROCESSING_HISTORY_TAB_BUTTON_CSS)
    public WebElement processingHistoryTab;
    @FindBy(xpath = FEES_TAB_BUTTON_XPATH)
    public WebElement feesTab;
    @FindBy(xpath = ACCOUNT_HOLDER_BUTTON_XPATH)
    public WebElement accountHolderTab;
    @FindBy(xpath = LEFT_DETAIL_PAYMENT_DETAILS_XPATH)
    public WebElement viewPaymentDetails;
    @FindBy(xpath = AUTHORIZATION_CODE_XPATH)
    public WebElement authorizationCode;

    public DetailsPo(AqatDriver driver) {
        super(driver);
        waitForPageLoad(driver);
        PageFactory.initElements(driver, this);
    }

    public Boolean isDetailsContainerDisplayed() {

        Boolean retVal = false;
        try {
            retVal = detailContainer.isDisplayed();
        } catch (Exception e) {
        }
        return retVal;

    }

    /**
     * Returns "success" if no error is returned, otherwise returns the error message
     *
     * @return
     */
    public void summaryWait() {

        driver.getWebDriverWait()
              .until(ExpectedConditions.invisibilityOfElementLocated(By.id(DETAILS_SUMMARY_LOADING_SPINNER_ID)));

    }

    /**
     * Returns "success" if no error is returned, otherwise returns the error message
     *
     * @return
     */
    public void historyWait() {

        driver.getWebDriverWait()
              .until(ExpectedConditions.invisibilityOfElementLocated(By.id(DETAILS_HISTORY_LOADING_SPINNER_ID)));

    }

    public String getDetailsUrl() {

        return driver.getCurrentUrl();

    }

    /**
     * Use to click on any of the Right Detail Nav buttons.
     *
     * @param button <code>WebElement</code>
     */
    public void clickRightDetailNavButton(WebElement button) {
        driver.getWebDriverWait()
              .until(ExpectedConditions.visibilityOf(button));
        driver.scrollToAndClickElement(button, 200);
    }

    public void selectAccountHistory() {
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(ACCOUNT_HISTORY_TAB_BUTTON_XPATH)));
        accountHistoryTab.click();
    }

    public void selectItemsTab() {
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.cssSelector(ITEMS_TAB_BUTTON_CSS)));
        itemsTab.click();
    }

    public void selectNotes() {
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(NOTES_TAB_BUTTON_XPATH)));
        notesTab.click();
    }

    public void selectNotificationsTab() {
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.cssSelector(NOTIFICATIONS_TAB_BUTTON_CSS)));
        notificationsTab.click();
    }

    public void selectShipmentsTab() {
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.cssSelector(SHIPMENTS_TAB_BUTTON_CSS)));
        shipmentsTab.click();
    }

    public void selectProcessingHistoryTab() {
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.cssSelector(PROCESSING_HISTORY_TAB_BUTTON_CSS)));
        processingHistoryTab.click();
    }

    public void selectTransactionHistory() {
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(TRANSACTION_HISTORY_TAB_BUTTON_XPATH)));
        transactionHistoryTab.click();
    }

    public void selectFees() {
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(FEES_TAB_BUTTON_XPATH)));
        feesTab.click();
    }

    public void selectAccountHolders() {
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(ACCOUNT_HOLDER_BUTTON_XPATH)));
        accountHolderTab.click();
    }

    public void viewPaymentDetails() {
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(LEFT_DETAIL_PAYMENT_DETAILS_XPATH)));
        driver.scrollToAndClickElement(viewPaymentDetails, 50);
    }
}
