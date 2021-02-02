package com.incomm.cca.qa.pageObject.search;

import com.incomm.aqat.driver.AqatDriver;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

public class SearchResultsPO extends SearchMenuPO {

    // MESSAGES
    public static final String MESSAGE_SEARCH_NO_RESULTS_ALL = "No results found for this search.";
    public static final String MESSAGE_SEARCH_NO_RESULTS_PRODUCT = "No results found for product search.";
    public static final String MESSAGE_SEARCH_NO_RESULTS_LOCATION = "No results found for location search.";
    //WEB ELEMENTS
    @FindBy(css = "cca-card-panel#search-results")
    WebElement searchResultsPanel;
    @FindBy(xpath = ".//*[@class='cs-table']/tbody/tr")
    WebElement searchResultRows;
    @FindBy(id = "search-result-count")
    WebElement searchResultCount;
    @FindBy(id = "search-result-total-count")
    WebElement searchResultTotalCount;
    @FindBy(id = "search-result-show-more")
    WebElement searchResultsShowMore;
    @FindBy(id = "loading-spinner-show-more")
    WebElement searchResultsShowMoreSpinner;
    @FindBy(xpath = "//div[@class='spinner-wrapper'][@data-qa-name='search-results']")
    WebElement searchResultsSpinner;
    @FindBy(id = "no-search-results")
    WebElement noSearchResults;
    @FindBy(id = "search-result-report")
    WebElement searchResultsReport;
    @FindBy(id = "search-result-for")
    WebElement searchResultsFor;
    @FindBy(className = "search-result-term")
    List<WebElement> searchResultsTerms;
    @FindBy(id = "locationSearchResults")
    WebElement searchResultsTableLocation;
    @FindBy(xpath = ".//*[@id='search-wrapper']//*[@label]")
    WebElement searchResultsColumnNames;
    @FindBy(id = "productSearchResults")
    WebElement searchResultsTableProduct;
    @FindBy(id = "customerSearchResults")
    WebElement searchResultsTableCustomer;
    @FindBy(id = "jiraSearchResults")
    WebElement searchResultsTableJira;
    @FindBy(id = "locationSearchResults_filter")
    WebElement searchResultsFilterLocation;
    @FindBy(xpath = "//*[@cs-label='Filter']/input")
    WebElement searchResultsFilter;
    @FindBy(id = "productSearchResults_filter")
    WebElement searchResultsFilterProduct;
    @FindBy(id = "customerSearchResults_filter")
    WebElement searchResultsFilterCustomer;
    @FindBy(id = "jiraSearchResults_filter")
    WebElement searchResultsFilterJira;
    @FindBy(id = "verify-card-holder")
    WebElement verifyCardHolderModal;
    @FindBy(xpath = "//div[@id='" + "verify-card-holder" + "']//h3")
    WebElement verifyCardHolderModalTitle;
    @FindBy(id = "not-verified")
    WebElement verifyCardHolderNotVerified;
    @FindBy(id = "verified")
    WebElement verifyCardHolderVerified;
    @FindBy(id = "card-number")
    WebElement verifyCardHolderCardNumber;
    @FindBy(id = "first-name")
    WebElement verifyCardHolderFirstName;
    @FindBy(id = "last-name")
    WebElement verifyCardHolderLastName;
    @FindBy(id = "maiden-name")
    WebElement verifyCardHolderMaidenName;
    @FindBy(id = "dob")
    WebElement verifyCardHolderDob;
    @FindBy(id = "identificationId")
    WebElement verifyCardHolderSsn;
    @FindBy(id = "physical-address")
    WebElement verifyCardHolderAddress;
    @FindBy(id = "load-amount")
    WebElement verifyCardHolderLoadAmount;
    @FindBy(css = ".search-result-summary-container > span")
    private WebElement searchResultsSummaryText;

    public SearchResultsPO(AqatDriver driver) {
        super(driver);
    }

    public Boolean isSearchResultsDisplayed() {
        return searchResultsPanel.isDisplayed();
    }

    public void showMore() throws Exception {
        searchResultsShowMore.click();
        driver.getWebDriverWait()
              .until(ExpectedConditions.invisibilityOf(searchResultsShowMoreSpinner));
    }

    public String getRowCount() {
        driver.getWebDriverWait()
              .until(ExpectedConditions.visibilityOf(searchResultTotalCount));
        return Integer.toString(driver.findElements(By.xpath(".//*[@class='cs-table']/tbody/tr"))
                                      .size());
    }

    public String getResultsCount() {

        driver.getWebDriverWait()
              .until(ExpectedConditions.visibilityOf(searchResultCount));
        return searchResultCount.getText();

    }

    public String getTotalResultsCount() {

        driver.getWebDriverWait()
              .until(ExpectedConditions.visibilityOf(searchResultTotalCount));
        return searchResultTotalCount.getText();

    }

    public String getSearchResultsSummaryText() {
        return searchResultsSummaryText.getText();
    }

    public void verifySelection(Boolean confirmed) {

        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.id("verify-card-holder")));
        if (confirmed) {
            verifyCardHolderVerified.click();
        } else {
            verifyCardHolderNotVerified.click();
        }
        driver.getWebDriverWait()
              .until(ExpectedConditions.invisibilityOfElementLocated(By.id("verify-card-holder")));

    }

    public Boolean isVerificationModalDisplayed(Boolean confirmed) {

        return verifyCardHolderModal.isDisplayed();

    }

    public HashMap<String, String> getVerificationFields() {

        HashMap<String, String> fields = new HashMap();

        if (verifyCardHolderLoadAmount.isDisplayed()) {

            fields.put("loadAmount", verifyCardHolderLoadAmount.getText());

        } else {

            fields.put("cardNumber", verifyCardHolderCardNumber.getText());
            fields.put("firstName", verifyCardHolderFirstName.getText());
            fields.put("lastName", verifyCardHolderLastName.getText());
            fields.put("maidenName", verifyCardHolderMaidenName.getText());
            fields.put("dob", verifyCardHolderDob.getText());
            fields.put("identificationId", verifyCardHolderSsn.getText());
            fields.put("address", verifyCardHolderAddress.getText());

        }

        return fields;

    }

    public HashMap<String, Object> getResultsReport() {

        driver.getWebDriverWait()
              .until(ExpectedConditions.visibilityOf(searchResultsReport));

        HashMap<String, Object> report = new HashMap<>();
        report.put("totalCount", Integer.parseInt(getTotalResultsCount()));
        report.put("terms", new ArrayList<String>());
        ArrayList<String> terms = (ArrayList) report.get("terms");

        for (WebElement term : searchResultsTerms) {

            terms.add(term.getText());

        }

        return report;

    }

    public Integer getResultCount() {

        return Integer.parseInt(searchResultCount.getText());

    }

    public Integer getTotalResultCount() {

        return Integer.parseInt(searchResultTotalCount.getText());

    }

    public ArrayList<String> getResultReportTerms() {

        ArrayList<String> terms = new ArrayList<>();

        for (WebElement term : searchResultsTerms) {

            terms.add(term.getText());

        }

        return terms;

    }

    public List<String> getSearchResultColumnNames() {
        driver.getWebDriverWait()
              .until(ExpectedConditions.visibilityOf(searchResultsColumnNames));
        List<WebElement> selectTypes = driver.findElements(By.xpath(".//*[@id='search-wrapper']//*[@label]"));
        List<String> types = new ArrayList<>();
        for (WebElement type : selectTypes) {
            types.add(type.getText());
        }
        return types;
    }

    public void clickSearchResultByRowKey(int key) { //This has been altered for Material

        String rowXpath = "//*[@class='cs-table']/tbody/tr[ " + key + " ]";
        driver.getWebDriverWait()
              .until(ExpectedConditions.elementToBeClickable(By.xpath(rowXpath)));
        driver.findElement(By.xpath(rowXpath))
              .click();

    }

    /**
     * Each click changes the sort direction, the first column in the table is by default sorted by ACS
     *
     * @param column the Display name of column to be sorted
     */
    public void sortColumn(String column) {

        driver.findElement(By.xpath("//thead/tr/th[contains(text() = '" + column + "')]"))
              .click();

    }

    public ArrayList<HashMap<String, String>> getProductResults() {

        return this.getResults("product");

    }

    public ArrayList<HashMap<String, String>> getCustomerResults() {

        return this.getResults("customer");

    }

    public ArrayList<HashMap<String, String>> getLocationResults() {

        return this.getResults("location");

    }

    public ArrayList<HashMap<String, String>> getJiraResults() {

        return this.getResults("jira");

    }

    public void filterProductResults(String value) {

        this.filterResults("product", value);

    }

    public void filterCustomerResults(String value) {

        this.filterResults("customer", value);

    }

    public void filterLocationResults(String value) {

        this.filterResults("location", value);

    }

    public void filterJiraResults(String value) {

        this.filterResults("jira", value);

    }

    // ***** PRIVATE METHODS *****//

    private ArrayList<HashMap<String, String>> getResults(String resultType) {

        ArrayList<HashMap<String, String>> results = new ArrayList<HashMap<String, String>>();
        WebElement table;
        List<WebElement> rows;
        List<WebElement> headers;

        driver.getWebDriverWait()
              .until(ExpectedConditions.invisibilityOf(searchResultsSpinner));

        switch (resultType) {

            case "product":
                table = searchResultsTableProduct;
                break;
            case "location":
                table = searchResultsTableLocation;
                break;
            case "customer":
                table = searchResultsTableCustomer;
                break;
            case "jira":
                table = searchResultsTableJira;
                break;
            default:
                table = searchResultsTableProduct;

        }

        rows = table.findElements(By.xpath("/tbody/tr"));
        headers = table.findElements(By.xpath("/thead/th"));

        final AtomicInteger count = new AtomicInteger();

        rows.forEach(row -> {

            HashMap<String, String> columns = new HashMap<>();

            List<WebElement> tds = row.findElements(By.xpath("td"));

            for (WebElement td : tds) {

                columns.put(headers.get(count.getAndIncrement())
                                   .getText(), td.getText());

            }

            results.add(columns);

        });

        return results;

    }

    //material
    public void filteringResults(String value) {

        driver.getWebDriverWait()
              .until(ExpectedConditions.visibilityOf(searchResultTotalCount));
        searchResultsFilter.sendKeys(value);
    }

    private void filterResults(String resultType, String value) {

        switch (resultType) {

            case "product":
                searchResultsFilterProduct.sendKeys(value);
                break;
            case "location":
                searchResultsFilterLocation.sendKeys(value);
                break;
            case "customer":
                searchResultsFilterCustomer.sendKeys(value);
                break;
            case "jira":
                searchResultsFilterJira.sendKeys(value);
                break;

        }

    }

    //fixme: This function needs to be properly implemented.
    public String getCardHeaderContent() {
        return null;
    }

}
