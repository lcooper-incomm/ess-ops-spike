package com.incomm.cca.qa.pageObject.details;

import com.incomm.aqat.driver.AqatDriver;
import com.incomm.cca.qa.pageObject.details.model.CustomerTransactionHistory;
import com.incomm.cca.qa.pageObject.details.model.ExpandedCustomerTransactionHistory;
import com.incomm.cca.qa.pageObject.details.model.ExpandedProductTransactionHistory;
import com.incomm.cca.qa.pageObject.details.model.ExpandedTransactionHistory;
import com.incomm.cca.qa.pageObject.details.model.ProductTransactionHistory;
import com.incomm.cca.qa.pageObject.details.model.TransactionHistory;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class TransactionHistoryPo extends DetailsPo {

    public static final String EXPORT_TO_CSV_ID = "transaction-history-export-to-csv"; // material
    public static final By EXPORT_TO_CSV = By.id(EXPORT_TO_CSV_ID);
    public static final By HISTORY_CONTAINER = By.cssSelector("div.transaction-history-container.container");
    private static final String EXPANDED_TRANSACTION_AVAILABLE_BALANCE_VALUE_XPATH = "";
    private static final String EXPANDED_TRANSACTION_PIN_VALUE_XPATH = "";
    private static final String COLUMN_HEADER_CARD_NUMBER = "";
    private static final String COLUMN_HEADER_FEE = "";
    private static final String COLUMN_HEADER_SOURCE = "";
    //*[@id='']
    // WEB ELEMENTS

    @FindBy(id = "transaction-history-actions")
    public WebElement ActionsButton;
    @FindBy(id = EXPORT_TO_CSV_ID)
    public WebElement ExportToCsv;
    @FindBy(id = "transaction-history-export-to-pdf")
    public WebElement ExportToPdf;
    @FindBy(id = "transaction-history-export-to-excel")
    public WebElement ExportToExcel;
    @FindBy(id = "transaction-history-raise-dispute")
    public WebElement RaiseDispute;
    @FindBy(id = "transaction-history-ranges")
    public WebElement RangesButton;
    @FindBy(id = "transaction-history-filters")
    public WebElement FiltersButton;
    @FindBy(xpath = "//*[@id='transaction-history-filter']/input")
    public WebElement Filter;
    @FindBy(id = "transaction-history-total-count")
    public WebElement TotalCount;
    @FindBy(xpath = ".//*[@id='start-date']/md-datepicker/div/input")
    public WebElement StartDate;
    @FindBy(xpath = ".//*[@id='end-date']/md-datepicker/div/input")
    public WebElement EndDate;
    @FindBy(id = "transaction-history-search")
    public WebElement Search;
    @FindBy(id = "transaction-history-ranges")
    public WebElement DateRange;
    @FindBy(xpath = ".//*[@class='cs-table']/thead/tr/th/div[@label='Date']")
    public WebElement ColumnHeaderDate;
    @FindBy(xpath = ".//*[@class='cs-table']/thead/tr/th/div[@label='Transaction ID']")
    public WebElement ColumnHeaderTransactionID;
    @FindBy(xpath = ".//*[@class='cs-table']/thead/tr/th/div[@label='Entity']")
    public WebElement ColumnHeaderEntity;
    @FindBy(xpath = ".//*[@class='cs-table']/thead/tr/th/div[@label='Request']")
    public WebElement ColumnHeaderRequest;
    @FindBy(xpath = ".//*[@class='cs-table']/thead/tr/th/div[@label='Amount']")
    public WebElement ColumnHeaderAmount;
    @FindBy(xpath = ".//*[@class='cs-table']/thead/tr/th/div[@label='Holds']")
    public WebElement ColumnHeaderHolds;
    @FindBy(xpath = ".//*[@class='cs-table']/thead/tr/th/div[@label='Available']")
    public WebElement ColumnHeaderAvailable;
    @FindBy(xpath = ".//*[@class='cs-table']//div[@label='Fee']")
    public WebElement ColumnHeaderFee;
    @FindBy(xpath = ".//*[@class='cs-table']//div[@label='Source #']")
    public WebElement ColumnHeaderSource;
    @FindBy(xpath = ".//*[@class='cs-table']//div[@label='Card #']")
    public WebElement ColumnHeaderCard;
    @FindBy(xpath = ".//*[@class='md-container md-ink-ripple']")
    public WebElement ShowBillablesOnlyCheckBox;
    @FindBy(id = "transaction-history-platform-filter")
    public WebElement PlatformFilter;
    @FindBy(xpath = ".//*[@class='transaction-search-term-value transaction-search-term-PLATFORM']")
    public WebElement SearchSummaryPlatform;
    @FindBy(xpath = ".//*[@class='transaction-search-term-value transaction-search-term-START_DATE']")
    public WebElement SearchSummaryStartDate;
    @FindBy(xpath = ".//*[@class='transaction-search-term-value transaction-search-term-END_DATE']")
    public WebElement SearchSummaryEndDate;
    @FindBy(xpath = ".//*[@class='cs-table']/thead/tr/th/md-checkbox")
    public WebElement SelectAllTransaction;
    public static final By EXPORT_TO_EXCEL_OPTION = By.id("transaction-history-export-to-excel");

    public TransactionHistoryPo(AqatDriver driver) {
        super(driver);
    }

    public void clickActionsButton() {
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.id("transaction-history-actions")));
        ActionsButton.click();
    }

    public void enterStartDate(Date date) {
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(".//*[@id='start-date']/md-datepicker/div/input")));
        StartDate.clear();
        StartDate.sendKeys(new SimpleDateFormat("MM/dd/yyyy").format(date));
    }

    public void enterEndDate(Date date) {
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(".//*[@id='end-date']/md-datepicker/div/input")));
        EndDate.clear();
        EndDate.sendKeys(new SimpleDateFormat("MM/dd/yyyy").format(date));
    }

    public String getStartDate() {
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(".//*[@id='start-date']/md-datepicker/div/input")));
        return StartDate.getAttribute("value");
    }

    public String getEndDate() {
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(".//*[@id='end-date']/md-datepicker/div/input")));
        return EndDate.getAttribute("value");
    }

    public void clickSearch() {
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.id("transaction-history-search")));
        Search.click();
    }

    public void selectDateRange(String xpath) {
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.id("transaction-history-ranges")));
        clickSelectOptionByXpath(DateRange, xpath);
    }

    public void clickExportToPdf() {
        clickActionsButton();
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(EXPORT_TO_CSV));
        ExportToPdf.click();
    }

    public void clickExportToCsv() {
        clickActionsButton();
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(EXPORT_TO_CSV));
        ExportToCsv.click();
    }

    public void clickExportToExcel() {
        clickActionsButton();
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(EXPORT_TO_EXCEL_OPTION));
        driver.scrollToAndClickElement(ExportToExcel, 200);
    }

    public void orderByDate() {
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(".//*[@class='cs-table']/thead/tr/th/div[@label='Date']")));
        driver.scrollToAndClickElement(ColumnHeaderDate, 200);
    }

    public void orderByTranasctionId() {
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(".//*[@class='cs-table']/thead/tr/th/div[@label='Transaction ID']")));
        ColumnHeaderTransactionID.click();
    }

    public void orderByCard() {
       //todo: write a test about ordering transaction history by card number
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(COLUMN_HEADER_CARD_NUMBER)));
        ColumnHeaderCard.click();
    }

    public void orderByFee() {
//        todo: write a test about ordering transaction history by the fee column
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(COLUMN_HEADER_FEE)));
        ColumnHeaderFee.click();
    }

    public void orderBySource() {
// todo: write a test about ordering transaction history by Source column
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(COLUMN_HEADER_SOURCE)));
        ColumnHeaderSource.click();
    }

    public String getTotalCount() {
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.id("transaction-history-total-count")));
        return TotalCount.getText();
    }

    public void clickFilterButton() {
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.id("transaction-history-filters")));
        driver.scrollToAndClickElement(FiltersButton, 200);
    }

    public void selectShowBillablesOnly() {
        clickFilterButton();
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(".//*[@class='md-container md-ink-ripple']")));
        ShowBillablesOnlyCheckBox.click();
    }

    public void selectGreenCardPlatformFromFilter() {
        clickFilterButton();
        clickSelectOptionByXpath(PlatformFilter, ".//*[@class='md-select-menu-container md-active md-clickable']/md-select-menu/md-content/md-option/div[contains(text(),'GreenCard')]");
    }

    public void selectMerchantManagerPlatformFromFilter() {
        clickFilterButton();
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.id("transaction-history-platform-filter")));
        clickSelectOptionByXpath(PlatformFilter, ".//*[@class='md-select-menu-container md-active md-clickable']/md-select-menu/md-content/md-option/div[contains(text(),'Merchant Manager')]");
    }

    public String getPlatformFromSearchSummary() {
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(".//*[@class='transaction-search-term-value transaction-search-term-PLATFORM']")));
        return SearchSummaryPlatform.getText();
    }

    public String getStartDateFromSearchSummary() {
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(".//*[@class='transaction-search-term-value transaction-search-term-START_DATE']")));
        return SearchSummaryStartDate.getText();
    }

    public String getEndDateFromSearchSummary() {
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(".//*[@class='transaction-search-term-value transaction-search-term-END_DATE']")));
        return SearchSummaryEndDate.getText();
    }

    public void selectAllTransactions() {
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(".//*[@class='cs-table']/thead/tr/th/md-checkbox")));
        driver.scrollToAndClickElement(SelectAllTransaction, 200);
        driver.getWebDriverWait()
              .until(ExpectedConditions.attributeContains(SelectAllTransaction, "checked", "true"));
    }

    public boolean isSelectAllTransactionsChecked() {
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(".//*[@class='cs-table']/thead/tr/th/md-checkbox")));
        return isChecked(SelectAllTransaction);
    }

    public ExpandedProductTransactionHistory getExpandedProductTransactionHistory(int transactionNumber) {
        ExpandedProductTransactionHistory expandedProductTransactionHistory = new ExpandedProductTransactionHistory(getExpandedTransactionHistory(transactionNumber));
        String xpath12 = String.format("//*[@id='expanded-transaction-%s']//span[contains(@class,'transaction-requested-amount')]", transactionNumber);
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(xpath12)));
        expandedProductTransactionHistory.setRequested(driver.findElement(By.xpath(xpath12))
                                                             .getText());
        String xpath11 = String.format("//*[@id='expanded-transaction-%s']//span[contains(@class,'transaction-authorized-amount')]", transactionNumber);
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(xpath11)));
        expandedProductTransactionHistory.setAuthorized(driver.findElement(By.xpath(xpath11))
                                                              .getText());
        String xpath10 = String.format("//*[@id='expanded-transaction-%s']//span[contains(@class,'transaction-acquirer-id')]", transactionNumber);
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(xpath10)));
        expandedProductTransactionHistory.setAcquirerId(driver.findElement(By.xpath(xpath10))
                                                              .getText());
        String xpath9 = String.format("//*[@id='expanded-transaction-%s']//span[contains(@class,'transaction-fx-surcharge')]", transactionNumber);
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(xpath9)));
        expandedProductTransactionHistory.setfXSurcharge(driver.findElement(By.xpath(xpath9))
                                                               .getText());
        String xpath8 = String.format("//*[@id='expanded-transaction-%s']//span[contains(@class,'transaction-balance')]", transactionNumber);
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(xpath8)));
        expandedProductTransactionHistory.setBalance(driver.findElement(By.xpath(xpath8))
                                                           .getText());
        String xpath7 = String.format("//*[@id='expanded-transaction-%s']//span[contains(@class,'transaction-pending-amount')]", transactionNumber);
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(xpath7)));
        expandedProductTransactionHistory.setOnHold(driver.findElement(By.xpath(xpath7))
                                                          .getText());
        String xpath6 = String.format(EXPANDED_TRANSACTION_AVAILABLE_BALANCE_VALUE_XPATH, transactionNumber);
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(xpath6)));
        expandedProductTransactionHistory.setAvailableBalance(driver.findElement(By.xpath(xpath6))
                                                                    .getText());
        String xpath5 = String.format("//*[@id='expanded-transaction-%s']//span[contains(@class,'transaction-response')]", transactionNumber);
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(xpath5)));
        expandedProductTransactionHistory.setResponse(driver.findElement(By.xpath(xpath5))
                                                            .getText());
        String xpath4 = String.format("//*[@id='expanded-transaction-%s']//span[contains(@class,'transaction-expiration-date')]", transactionNumber);
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(xpath4)));
        expandedProductTransactionHistory.setExpirationDate(driver.findElement(By.xpath(xpath4))
                                                                  .getText());
        String xpath3 = String.format("//*[@id='expanded-transaction-%s']//span[contains(@class,'transaction-x95-code')]", transactionNumber);
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(xpath3)));
        expandedProductTransactionHistory.setX95MessageCode(driver.findElement(By.xpath(xpath3))
                                                                  .getText());
        String xpath2 = String.format("//*[@id='expanded-transaction-%s']//span[contains(@class,'transaction-x95-process-code')]", transactionNumber);
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(xpath2)));
        expandedProductTransactionHistory.setX95ProcessCode(driver.findElement(By.xpath(xpath2))
                                                                  .getText());
        String xpath1 = String.format(EXPANDED_TRANSACTION_PIN_VALUE_XPATH, transactionNumber);
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(xpath1)));
        expandedProductTransactionHistory.setpINTransaction(driver.findElement(By.xpath(xpath1))
                                                                  .getText());
        String xpath = String.format("//*[@id='expanded-transaction-%s']//span[contains(@class,'transaction-sic-code')]", transactionNumber);
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(xpath)));
        expandedProductTransactionHistory.setsICCode(driver.findElement(By.xpath(xpath))
                                                           .getText());
        return expandedProductTransactionHistory;
    }

    private ExpandedTransactionHistory getExpandedTransactionHistory(int transactionNumber) {
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.id(String.format("transaction-%s", transactionNumber))));
        WebElement transaction = driver.findElement(By.id(String.format("transaction-%s", transactionNumber)));
        driver.scrollToAndClickElement(transaction, 100);
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.id(String.format("expanded-transaction-%s", transactionNumber))));
        ExpandedTransactionHistory expandedTransaction = new ExpandedTransactionHistory();
        String xpath8 = String.format("//*[@id='expanded-transaction-%s']//span[contains(@class,'location')]", transactionNumber);
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(xpath8)));
        expandedTransaction.setLocation(driver.findElement(By.xpath(xpath8))
                                              .getText());
        String xpath7 = String.format("//*[@id='expanded-transaction-%s']//span[contains(@class,'transaction-address-1')]", transactionNumber);
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(xpath7)));
        expandedTransaction.setAddress(driver.findElement(By.xpath(xpath7))
                                             .getText());
        String xpath6 = String.format("//*[@id='expanded-transaction-%s']//span[contains(@class,'transaction-address-2')]", transactionNumber);
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(xpath6)));
        expandedTransaction.setAddress2(driver.findElement(By.xpath(xpath6))
                                              .getText());
        String xpath5 = String.format("//*[@id='expanded-transaction-%s']//span[contains(@class,'transaction-address-city')]", transactionNumber);
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(xpath5)));
        expandedTransaction.setCity(driver.findElement(By.xpath(xpath5))
                                          .getText());
        String xpath4 = String.format("//*[@id='expanded-transaction-%s']//span[contains(@class,'transaction-address-stateOrProvince')]", transactionNumber);
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(xpath4)));
        expandedTransaction.setState(driver.findElement(By.xpath(xpath4))
                                           .getText());
        String xpath3 = String.format("//*[@id='expanded-transaction-%s']//span[contains(@class,'transaction-currency-code')]", transactionNumber);
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(xpath3)));
        expandedTransaction.setCurrencyCode(driver.findElement(By.xpath(xpath3))
                                                  .getText());
        String xpath2 = String.format("//*[@id='expanded-transaction-%s']//span[contains(@class,'transaction-address-postal-code')]", transactionNumber);
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(xpath2)));
        expandedTransaction.setPostalCode(driver.findElement(By.xpath(xpath2))
                                                .getText());
        String xpath1 = String.format("//*[@id='expanded-transaction-%s']//span[contains(@class,'transaction-response')]", transactionNumber);
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(xpath1)));
        expandedTransaction.setResponse(driver.findElement(By.xpath(xpath1))
                                              .getText());
        String xpath = String.format("//*[@id='expanded-transaction-%s']//span[contains(@class,'transaction-settlement-date')]", transactionNumber);
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(xpath)));
        expandedTransaction.setSettlementDate(driver.findElement(By.xpath(xpath))
                                                    .getText());
        return expandedTransaction;
    }

    public ExpandedCustomerTransactionHistory getExpandedCustomerTransactionHistory(int transactionNumber) {
        ExpandedCustomerTransactionHistory expandedCustomer = new ExpandedCustomerTransactionHistory(getExpandedTransactionHistory(transactionNumber));
        String xpath10 = String.format("//*[@id='expanded-transaction-%s']//span[contains(@class,'transaction-merchant-id')]", transactionNumber);
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(xpath10)));
        expandedCustomer.setMerchantId(driver.findElement(By.xpath(xpath10))
                                             .getText());
        String xpath9 = String.format("//*[@id='expanded-transaction-%s']//span[contains(@class,'transaction-authentication-type')]", transactionNumber);
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(xpath9)));
        expandedCustomer.setAuthenticationType(driver.findElement(By.xpath(xpath9))
                                                     .getText());
        String xpath8 = String.format("//*[@id='expanded-transaction-%s']//span[contains(@class,'transaction-id')]", transactionNumber);
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(xpath8)));
        expandedCustomer.setTransactionId(driver.findElement(By.xpath(xpath8))
                                                .getText());
        String xpath7 = String.format("//*[@id='expanded-transaction-%s']//span[contains(@class,'transaction-is-international')]", transactionNumber);
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(xpath7)));
        expandedCustomer.setInternational(driver.findElement(By.xpath(xpath7))
                                                .getText());
        String xpath6 = String.format("//*[@id='expanded-transaction-%s']//span[contains(@class,'transaction-credit-debit')]", transactionNumber);
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(xpath6)));
        expandedCustomer.setCreditOrDebit(driver.findElement(By.xpath(xpath6))
                                                .getText());
        String xpath5 = String.format("//*[@id='expanded-transaction-%s']//span[contains(@class,'transaction-original-transaction-date')]", transactionNumber);
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(xpath5)));
        expandedCustomer.setOriginalTransDate(driver.findElement(By.xpath(xpath5))
                                                    .getText());
        String xpath4 = String.format("//*[@id='expanded-transaction-%s']//span[contains(@class,'transaction-original-transaction-id')]", transactionNumber);
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(xpath4)));
        expandedCustomer.setOriginalTransId(driver.findElement(By.xpath(xpath4))
                                                  .getText());
        String xpath3 = String.format("//*[@id='expanded-transaction-%s']//span[contains(@class,'transaction-original-transaction-terminal-id')]", transactionNumber);
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(xpath3)));
        expandedCustomer.setOriginalTransTerminalId(driver.findElement(By.xpath(xpath3))
                                                          .getText());
        String xpath2 = String.format("//*[@id='expanded-transaction-%s']//span[contains(@class,'transaction-request')]", transactionNumber);
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(xpath2)));
        expandedCustomer.setRequest(driver.findElement(By.xpath(xpath2))
                                          .getText());
        String xpath1 = String.format("//*[@id='expanded-transaction-%s']//span[contains(@class,'transaction-mcc-code')]", transactionNumber);
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(xpath1)));
        expandedCustomer.setmCCCode(driver.findElement(By.xpath(xpath1))
                                          .getText());
        String xpath = String.format("//*[@id='expanded-transaction-%s']//span[contains(@class,'transaction-preauth-release-date')]", transactionNumber);
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(xpath)));
        expandedCustomer.setPreAuthReleaseDate(driver.findElement(By.xpath(xpath))
                                                     .getText());
        return expandedCustomer;
    }

    public CustomerTransactionHistory getCustomerTransactionHistory(int transactionNumber) {
        CustomerTransactionHistory customerTransactionHistory = new CustomerTransactionHistory(getTransactionHistory(transactionNumber));
        String xpath2 = String.format(".//*[@id='transaction-%s']/td[contains(@class,'transaction-fee')]", transactionNumber);
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(xpath2)));
        customerTransactionHistory.setFee(driver.findElement(By.xpath(xpath2))
                              .getText());
        String xpath1 = String.format(".//*[@id='transaction-%s']/td[contains(@class,'transaction-cardNumber')]", transactionNumber);
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(xpath1)));
        customerTransactionHistory.setCard(driver.findElement(By.xpath(xpath1))
                               .getText());
        String xpath = String.format(".//*[@id='transaction-%s']/td[contains(@class,'transaction-source')]", transactionNumber);
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(xpath)));
        customerTransactionHistory.setSource(driver.findElement(By.xpath(xpath))
                                 .getText());
        return customerTransactionHistory;
    }

    public ProductTransactionHistory getProductTransactionHistory(int transactionNumber) {
        ProductTransactionHistory product = new ProductTransactionHistory(getTransactionHistory(transactionNumber));
        String xpath = String.format(".//*[@id='transaction-%s']/td[contains(@class,'transaction-id')]", transactionNumber);
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(xpath)));
        product.setTransactionId(driver.findElement(By.xpath(xpath))
                                       .getText());
        return product;
    }

    private TransactionHistory getTransactionHistory(int transactionNumber) {
        TransactionHistory transaction = new TransactionHistory();
        transaction.setSelected(isChecked(driver.findElement(By.xpath(String.format(".//*[@id='transaction-%s']/td/md-checkbox", transactionNumber)))));
        String xpath6 = String.format(".//*[@id='transaction-%s']/td[contains(@class,'transaction-date')]", transactionNumber);
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(xpath6)));
        transaction.setDate(driver.findElement(By.xpath(xpath6))
                                  .getText());
        String xpath5 = String.format(".//*[@id='transaction-%s']/td[contains(@class,'transaction-entity')]", transactionNumber);
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(xpath5)));
        transaction.setEntity(driver.findElement(By.xpath(xpath5))
                                    .getText());
        String xpath4 = String.format(".//*[@id='transaction-%s']/td[contains(@class,'transaction-response')]", transactionNumber);
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(xpath4)));
        transaction.setResponse(driver.findElement(By.xpath(xpath4))
                                      .getText());
        String xpath3 = String.format(".//*[@id='transaction-%s']/td[contains(@class,'transaction-request')]", transactionNumber);
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(xpath3)));
        transaction.setRequest(driver.findElement(By.xpath(xpath3))
                                     .getText());
        String xpath2 = String.format(".//*[@id='transaction-%s']/td[contains(@class,'transaction-holds')]", transactionNumber);
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(xpath2)));
        transaction.setHolds(driver.findElement(By.xpath(xpath2))
                                   .getText());
        String xpath1 = String.format(".//*[@id='transaction-%s']/td[contains(@class,'transaction-amount')]", transactionNumber);
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(xpath1)));
        transaction.setAmount(driver.findElement(By.xpath(xpath1))
                                    .getText());
        String xpath = String.format(".//*[@id='transaction-%s']/td[contains(@class,'transaction-available')]", transactionNumber);
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(xpath)));
        transaction.setAvailable(driver.findElement(By.xpath(xpath))
                                       .getText());
        return transaction;
    }

    public List<ProductTransactionHistory> getAllProductTransactionHistories() {
        int totalTransactions = Integer.parseInt(getTotalCount());
        List<ProductTransactionHistory> productTransactionHistories = new ArrayList<>();
        for (int i = 0; i < totalTransactions; i++) {
            productTransactionHistories.add(getProductTransactionHistory(i));
        }
        return productTransactionHistories;
    }

    public List<ExpandedProductTransactionHistory> getAllExpandedTransactions() {
        int totalTransactions = Integer.parseInt(getTotalCount());
        List<ExpandedProductTransactionHistory> expandedTransactions = new ArrayList<>();
        for (int i = 0; i < totalTransactions; i++) {
            expandedTransactions.add(getExpandedProductTransactionHistory(i));
        }
        return expandedTransactions;
    }

    public void enterFilterText(String filterText) {
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@id='transaction-history-filter']/input")));
        Filter.sendKeys(filterText);
    }

    public String getFilterText() {
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@id='transaction-history-filter']/input")));
        return Filter.getAttribute("value");
    }

    public void clearFilterText() {
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@id='transaction-history-filter']/input")));
        Filter.clear();
    }

    /**
     * Use to select an Option from a Drop-Down
     *
     * @param xpath The xpath of the option you want to select from a Drop-Down.
     */
    public void clickSelectOptionByXpath(WebElement selectElement, String xpath) {
        driver.scrollToAndClickElement(selectElement, 200);
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(xpath)));
        driver.getWebDriverWait()
              .until(ExpectedConditions.elementToBeClickable(By.xpath(xpath)));
        WebElement weOptionToSelect = driver.findElement(By.xpath(xpath));
        weOptionToSelect.click();
    }

    public Boolean isTransactionHistoryDisplayed() {
        return driver.findElement(HISTORY_CONTAINER).isDisplayed();
    }
}
