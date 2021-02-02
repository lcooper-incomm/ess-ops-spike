package com.incomm.cca.qa.pageObject.details;

import com.incomm.aqat.driver.AqatDriver;
import com.incomm.cca.qa.pageObject.details.model.AccountHistory;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Matt on 7/26/2016.
 */
public class AccountHistoryPo extends DetailsPo {

    //LOCATORS
    //TODO Establish Locator Constants
    public static final String LOCATOR_ID = "";
    public static final String LOCATOR_CLASS = "";
    public static final String LOCATOR_XPATH = "";
    public static final String ACCOUNT_HISTORY_TOTAL_COUNT_ID = "account-history-total-count";
    public static final String COLUMN_HEADER_DATE_ID = "account-history-column-header-date";
    public static final String COLUMN_HEADER_TRANS_ID = "account-history-column-header-trans";
    public static final String COLUMN_HEADER_USERNAME_ID = "account-history-column-header-username";
    public static final String COLUMN_HEADER_UPDATE_TYPE_ID = "account-history-column-header-update-type";
    public static final String COLUMN_HEADER_DESCRIPTION_ID = "account-history-column-header-description";
    public static final String COLUMN_HEADER_NOTE_ID = "account-history-column-header-note";
    public static final String FILTER_XPATH = "//*[@id='account-history-filter']/input";
    public static final String ACCOUNT_HISTORY_DATE_XPATH = "//*[@id='account-history-1']/td[contains(@class,'account-history-date')]";
    public static final String ACCOUNT_HISTORY_ID_XPATH = "//*[@id='account-history-1']/td[contains(@class,'account-history-id')]";
    public static final String ACCOUNT_HISTORY_USERNAME_XPATH = "//*[@id='account-history-1']/td[contains(@class,'account-history-username')]";
    public static final String ACCOUNT_HISTORY_UPDATE_TYPE_XPATH = "//*[@id='account-history-1']/td[contains(@class,'account-history-update-type')]";
    public static final String ACCOUNT_HISTORY_DESCRIPTION_XPATH = "//*[@id='account-history-1']/td[contains(@class,'account-history-description')]";
    public static final String ACCOUNT_HISTORY_NOTE_XPATH = "//*[@id='account-history-1']/td[contains(@class,'account-history-note')]";
    //WEB ELEMENTS
    //TODO Establish Web Elements
    @FindBy(id = LOCATOR_ID)
    WebElement locatorId;
    @FindBy(className = LOCATOR_CLASS)
    WebElement locatorClass;
    @FindBy(xpath = LOCATOR_XPATH)
    WebElement locatorXpath;
    @FindBy(id = ACCOUNT_HISTORY_TOTAL_COUNT_ID)
    WebElement accountHistoryTotalCount;
    @FindBy(id = COLUMN_HEADER_DATE_ID)
    WebElement columnHeaderDate;
    @FindBy(id = COLUMN_HEADER_TRANS_ID)
    WebElement columnHeaderTrans;
    @FindBy(id = COLUMN_HEADER_USERNAME_ID)
    WebElement columnHeaderUsername;
    @FindBy(id = COLUMN_HEADER_UPDATE_TYPE_ID)
    WebElement columnHeaderUserType;
    @FindBy(id = COLUMN_HEADER_DESCRIPTION_ID)
    WebElement columnHeaderDescription;
    @FindBy(id = COLUMN_HEADER_NOTE_ID)
    WebElement columnHeaderNote;
    @FindBy(xpath = FILTER_XPATH)
    WebElement filter;

    public AccountHistoryPo(AqatDriver driver) {
        super(driver);
    }

    public Boolean isAccountHistoryDisplayed() {

        //TODO Page Validator
        return true;
    }

    public int getTotalAccountHistoryCount() {
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.id(ACCOUNT_HISTORY_TOTAL_COUNT_ID)));
        return Integer.parseInt(accountHistoryTotalCount.getText());
    }

    public void sortByDate() {
        clickById(columnHeaderDate, COLUMN_HEADER_DATE_ID);
    }

    public void sortByTrans() {
        clickById(columnHeaderTrans, COLUMN_HEADER_TRANS_ID);
    }

    public void sortByUsername() {
        clickById(columnHeaderUsername, COLUMN_HEADER_USERNAME_ID);
    }

    public void sortByUpdateType() {
        clickById(columnHeaderUserType, COLUMN_HEADER_UPDATE_TYPE_ID);
    }

    public void sortByDescription() {
        clickById(columnHeaderDescription, COLUMN_HEADER_DESCRIPTION_ID);
    }

    public void sortByNote() {
        clickById(columnHeaderNote, COLUMN_HEADER_NOTE_ID);
    }

    public void enterFilterText(String filterText) {
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(FILTER_XPATH)));
        filter.sendKeys(filterText);
    }

    public void clearFilterText() {
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(FILTER_XPATH)));
        filter.clear();
    }

    public String getFilterText() {
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(FILTER_XPATH)));
        return filter.getAttribute("value");
    }

    public AccountHistory getAccountHistory(int index) {
        AccountHistory accountHistory = new AccountHistory();
        String xpath5 = String.format(ACCOUNT_HISTORY_DATE_XPATH, index);
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(xpath5)));
        accountHistory.setDate(driver.findElement(By.xpath(xpath5))
                                     .getText());
        String xpath4 = String.format(ACCOUNT_HISTORY_ID_XPATH, index);
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(xpath4)));
        accountHistory.setId(driver.findElement(By.xpath(xpath4))
                                   .getText());
        String xpath3 = String.format(ACCOUNT_HISTORY_USERNAME_XPATH, index);
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(xpath3)));
        accountHistory.setUsername(driver.findElement(By.xpath(xpath3))
                                         .getText());
        String xpath2 = String.format(ACCOUNT_HISTORY_UPDATE_TYPE_XPATH, index);
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(xpath2)));
        accountHistory.setUserType(driver.findElement(By.xpath(xpath2))
                                         .getText());
        String xpath1 = String.format(ACCOUNT_HISTORY_DESCRIPTION_XPATH, index);
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(xpath1)));
        accountHistory.setDescription(driver.findElement(By.xpath(xpath1))
                                            .getText());
        String xpath = String.format(ACCOUNT_HISTORY_NOTE_XPATH, index);
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(xpath)));
        accountHistory.setNote(driver.findElement(By.xpath(xpath))
                                     .getText());
        return accountHistory;
    }

    public List<AccountHistory> getAllAccountHistories() {
        int totalCount = getTotalAccountHistoryCount();
        List<AccountHistory> accountHistories = new ArrayList<>();
        for (int i = 0; i < totalCount; i++) {
            accountHistories.add(getAccountHistory(i));
        }
        return accountHistories;
    }

    private void clickById(WebElement webElement, String id) {
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.id(id)));
        webElement.click();
    }
}
