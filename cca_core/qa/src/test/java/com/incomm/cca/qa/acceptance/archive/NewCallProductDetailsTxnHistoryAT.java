//package com.incomm.cca.qa.acceptance;
//
//import com.incomm.cca.qa.functional.BaseFT;
//import org.openqa.selenium.By;
//import org.openqa.selenium.WebElement;
//import org.openqa.selenium.support.ui.ExpectedConditions;
//import org.testng.annotations.DataProvider;
//import org.testng.annotations.Test;
//
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Map;
//import java.util.regex.Matcher;
//import java.util.regex.Pattern;
//
//import static org.hamcrest.MatcherAssert.assertThat;
//import static org.hamcrest.Matchers.*;
//
///**
// * New Call Product Details Transaction History Acceptance Tests
// * User: mgalloway
// * Date: 7/25/13
// * Time: 9:27 AM
// * To change this template use File | Settings | File Templates.
// */
//public class NewCallProductDetailsTxnHistoryAT extends BaseFT {
//
//    final private String ASSIGNMENT_ID = "881fe682-b1e7-47a1-b69b-a20a00cd5616";
//    // This comes from Enterprise Tester's Execution Set URI for the given automated test class
//
//    @Test(groups = {"version-2.0.0", "in-progress", "new_call", "product", "details", "inventory_transaction"},  enabled = false)
//    public void testNewCallProductDetailsNoTransactions() {
//
//        String pin = "117821408569869";
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.search("PIN", pin);
//        newCallSearch.autoAddTransitionWait();
//        assertThat("Transaction History is Empty", newCallProductHistory.isCurrentTransactionHistoryEmpty(), is(true));
//        assertThat("Transaction History is Empty Message", newCallProductHistory.getNoCurrentTransactionHistoryMessage(), is(equalTo(newCallProductHistory.NO_CURRENT_TRANSACTION_HISTORY_MESSAGE)));
//
//    }
//
//    @Test(groups = {"version-2.0.0", "in-progress", "new_call", "product", "details", "inventory_transaction"},  enabled = false)
//    public void testNewCallProductDetailsMultipleTransactions() {
//
//        String serialNumber = "2367191811";
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.search("Serial #", serialNumber);
//        newCallSearch.autoAddTransitionWait();
//        assertThat("Transaction History is not Empty", newCallProductHistory.isCurrentTransactionHistoryEmpty(), is(false));
//        assertThat("Transaction History Count", newCallProductHistory.getAllTransactions().size(), is(25));
//        String[] pages = newCallProductHistory.getCurrentProductTransactionsSearchResultPageTop().split(" ");
//        Integer totalPages = Integer.parseInt(pages[3]);
//        Integer totalTransactions = newCallProductHistory.getAllTransactions().size();
//        for(int i = 1; i < totalPages; i++) {
//
//            String expectedNextPage = String.valueOf(i + 1);
//            newCallProductHistory.clickPaginationProductTransactionsTopNext(expectedNextPage);
//            totalTransactions += newCallProductHistory.getAllTransactions().size();
//
//        }
//        assertThat("Transaction History Total Count", newCallProductHistory.getDisplayedTransactionCount(), is(equalTo(totalTransactions)));
//
//    }
//
//    @Test(groups = {"version-2.0.0", "in-progress", "new_call", "product", "details", "inventory_transaction"},  enabled = false)
//    public void testNewCallProductDetailsTransactionFields() {
//
//        String serialNumber = "2367191811";
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.search("Serial #", serialNumber);
//        newCallSearch.autoAddTransitionWait();
//        //assertThat("Transaction History is not Empty", newCallProductHistory.isCurrentTransactionHistoryEmpty(), is(false));
//        Map<String, WebElement> actual = newCallProductHistory.getSelectedCardTransactionHistoryItem(0);
//        assertThat("Transaction ID", actual.get("id").getText(), is(equalTo("681819509")));
//        assertThat("Transaction Create Date", actual.get("created").getText(), is(equalTo("11/11/2013 16:52:34")));
//        assertThat("Transaction Create Date Title", actual.get("created").getAttribute("title"), is(equalTo("Nov 11, 2013 4:52:34 PM EST")));
//        assertThat("Transaction Amount", actual.get("amount").getText(), is(equalTo("$15.00")));
//        assertThat("Transaction Amount Title", actual.get("amount").getAttribute("title"), is(equalTo("$15.00")));
//        assertThat("Transaction Entity Name and Type", actual.get("entityNameType").getText(), is(equalTo("GLOBAL")));
//        assertThat("Transaction Entity Name Type", actual.get("entityNameType").getAttribute("title"), is(equalTo("GLOBAL")));
//        assertThat("Transaction opCodeFlag", actual.get("opCodeFlag").getText(), is(equalTo("OP Code: X")));
//        assertThat("Transaction opCodeFlag Title", actual.get("opCodeFlag").getAttribute("title"), is(equalTo("4000 - No DCMS action (X)")));
////        assertThat("Transaction Entity Name is a Link", actual.get("entityNameLink").getTagName(), is(equalTo("a")));
//        assertThat("Transaction LegacyNote", actual.get("note").getText(), is(equalTo("balinq Pending::371726:20131111163030: []")));
//
//    }
//
//    @Test(groups = {"version-2.0.0", "in-progress", "new_call", "product", "details", "inventory_transaction"}, enabled = false)
//    public void testNewCallProductDetailsSearchTransactionsNoResults() {
//
//        String serialNumber = "2367191811";
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.search("Serial #", serialNumber);
//        newCallSearch.autoAddTransitionWait();
//        newCallProductHistory.searchTransactionHistory("z", false);
//        assertThat("Transaction Filtered History is Empty", newCallProductHistory.isSearchHistoryEmpty(), is(true));
//        Boolean noTransactions;
//        try {
//            newCallProductHistory.getAllTransactions();
//            noTransactions = false;
//        }
//        catch(Exception e) {
//            noTransactions = true;
//        }
//        assertThat("No Transactions Listed", noTransactions, is(true));
//        assertThat("No results message", newCallProductHistory.getNoSearchResultsMessage(), is(equalTo(newCallProductHistory.NO_FILTERED_HISTORY_MESSAGE)));
//
//    }
//
//    @Test(groups = {"version-2.0.0", "in-progress", "new_call", "product", "details", "inventory_transaction"}, dataProvider = "searchCriteria", enabled = false)
//    public void testNewCallProductDetailsSearchTransactions(String type, String value) {
//
//        String serialNumber = "2367191811";
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.search("Serial #", serialNumber);
//        newCallSearch.autoAddTransitionWait();
//        newCallProductHistory.searchTransactionHistory(value, true);
//        List<WebElement> transactions = newCallProductHistory.getAllTransactions();
//        for(WebElement transaction : transactions) {
//            Integer id = Integer.parseInt(transaction.getAttribute("id").substring(transaction.getAttribute("id").length() - 1));
//            Map<String, WebElement> fields = newCallProductHistory.getSelectedCardTransactionHistoryItem(id);
//            assertThat("Each Transaction has " + value + " for the "+ type, fields.get(type).getText(), containsString(value.replace("(", "").replace(")", "")));
//        }
//
//    }
//
//    @Test(groups = {"version-2.0.0", "in-progress", "new_call", "product", "details", "inventory_transaction"}, enabled = false)
//    public void testNewCallProductDetailsFilterTransactionsByStatus() {
//
//        String serialNumber = "2367191811";
//        String action = "No DCMS action";
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.search("Serial #", serialNumber);
//        newCallSearch.autoAddTransitionWait();
//        assertThat("Transaction History is not Empty", newCallProductHistory.isCurrentTransactionHistoryEmpty(), is(false));
//        newCallProductHistory.setSearchTransactionAction(action);
//        List<WebElement> transactions = newCallProductHistory.getAllTransactions();
//        for(WebElement transaction : transactions) {
//            Integer id = Integer.parseInt(transaction.getAttribute("id").substring(transaction.getAttribute("id").length() - 1));
//            Map<String, WebElement> fields = newCallProductHistory.getSelectedCardTransactionHistoryItem(id);
//            assertThat("Each Transaction has " + action + " for the action [opCodeText]", fields.get("opCodeFlag").getAttribute("title"), containsString(action));
//        }
//
//    }
//
//    @Test(groups = {"version-2.0.0", "in-progress", "new_call", "product", "details", "inventory_transaction"}, enabled = false)
//    public void testNewCallProductDetailsTransactionActionFilterOptions() {
//
//        String serialNumber = "2367191811";
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.search("Serial #", serialNumber);
//        newCallSearch.autoAddTransitionWait();
//        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("transaction-history-0")));
//        List<String> expectedOptions = new ArrayList<>();
//        List<String> actualOptions = new ArrayList<>();
//        assertThat("Transaction History is not Empty", newCallProductHistory.isCurrentTransactionHistoryEmpty(), is(false));
//
//        // Establish actual options available
//        List<WebElement> options = newCallProductHistory.getSearchTransactionActionListOptions();
//        for(WebElement option : options) {
//            actualOptions.add(option.getText());
//        }
//        // Establish expected options available derived from list of transactions
//        List<WebElement> transactions = newCallProductHistory.getAllTransactions();
//        for(WebElement txn : transactions) {
//            String elementId = txn.getAttribute("id");
//            String[] elementIdSegments = elementId.split("-");
//            Integer id = Integer.parseInt(elementIdSegments[2]);
//            Map<String, WebElement> fields = newCallProductHistory.getSelectedCardTransactionHistoryItem(id);
//            Pattern p = Pattern.compile("(.*) - (.*) \\((.*)\\)");
//            String currentOpCodeTitle = fields.get("opCodeFlag").getAttribute("title");
//            Matcher matcher = p.matcher(currentOpCodeTitle);
//            String currentOpcodeText = null;
//            if(matcher.matches()) {
//                currentOpcodeText = matcher.group(2);
//            }
//            if(!expectedOptions.contains(currentOpcodeText)) {
//                expectedOptions.add(currentOpcodeText);
//            }
//        }
//
//        assertThat("Number of Options", actualOptions.size()-1, is(equalTo(expectedOptions.size())));
//        for(String expected : expectedOptions) {
//            assertThat("Transaction Action Option: [" + expected + "]", actualOptions, hasItem(expected));
//        }
//
//    }
//
//    @Test(groups = {"version-2.4.0", "in-progress", "new_call", "product", "details", "transaction", "date_range"},  enabled = false)
//    public void testNewCallProductDetailsTransactionsDateRangeCurrent() {
//
//        String serialNumber = "2367191811";
//        String startDate = "03/01/2012";
//        String endDate = "03/30/2012";
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.search("Serial #", serialNumber);
//        assertThat("Transaction History is not Empty", newCallProductHistory.isCurrentTransactionHistoryEmpty(), is(false));
//        assertThat("Transaction History Default Page 1 Count", newCallProductHistory.getAllTransactions().size(), is(25));
//        // Filter transactions by date range
//        newCallProductHistory.addStartDateRange(startDate);
//        newCallProductHistory.addEndDateRange(endDate);
//        newCallProductHistory.clickDateRangeFilter();
//        assertThat("Transaction History is not Empty after filtering", newCallProductHistory.isCurrentTransactionHistoryEmpty(), is(false));
//        assertThat("Archived Transaction History Count Displayed", newCallProductHistory.getDisplayedTransactionCount(), is(equalTo(9)));
//        assertThat("Transaction History Count is Filtered", newCallProductHistory.getAllTransactions().size(), is(equalTo(9)));
//
//    }
//
//    @Test(groups = {"version-2.4.1", "in-progress", "new_call", "product", "details", "transaction", "date_range"},  enabled = false)
//    public void testNewCallProductDetailsTransactionsDateRangeNoResultsCurrent() {
//
//        String serialNumber = "2367191811";
//        String startDate = "01/01/2014";
//        String endDate = "02/01/2014";
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.search("Serial #", serialNumber);
//        assertThat("Transaction History is not Empty", newCallProductHistory.isCurrentTransactionHistoryEmpty(), is(false));
//        assertThat("Transaction History Default Page 1 Count", newCallProductHistory.getAllTransactions().size(), is(25));
//        // Filter transactions by date range
//        newCallProductHistory.addStartDateRange(startDate);
//        newCallProductHistory.addEndDateRange(endDate);
//        newCallProductHistory.clickDateRangeFilter();
//        assertThat("Transaction History No Results Message", newCallProductHistory.getNoSearchResultsMessage(), is(equalTo(newCallLocationHistory.NO_FILTERED_HISTORY_MESSAGE)));
//        assertThat("Date Range Form is still visible", newCallProductHistory.startDateRange.isDisplayed(), is(true));
//
//    }
//
//    @Test(groups = {"version-2.4.1", "in-progress", "new_call", "product", "details", "transaction", "date_range"},  enabled = false)
//    public void testNewCallProductDetailsTransactionsDateRangeSingleDayCurrent() {
//
//        String serialNumber = "2367191811";
//        String startDate = "11/11/2013";
//        String endDate = "11/11/2013";
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.search("Serial #", serialNumber);
//        assertThat("Transaction History is not Empty", newCallProductHistory.isCurrentTransactionHistoryEmpty(), is(false));
//        assertThat("Transaction History Default Page 1 Count", newCallProductHistory.getAllTransactions().size(), is(25));
//        // Filter transactions by date range
//        newCallProductHistory.addStartDateRange(startDate);
//        newCallProductHistory.addEndDateRange(endDate);
//        newCallProductHistory.clickDateRangeFilter();
//        assertThat("Transaction History is not Empty", newCallProductHistory.isCurrentTransactionHistoryEmpty(), is(false));
//        assertThat("Transaction History Count is Filtered", newCallProductHistory.getAllTransactions().size(), is(equalTo(1)));
//        List<WebElement> transactions = newCallProductHistory.getAllTransactions();
//        for(int i = 0; i < transactions.size(); i++) {
//
//            Map<String, WebElement> actual = newCallProductHistory.getSelectedCardTransactionHistoryItem(i);
//            assertThat("Resulting Transactions Date", actual.get("created").getText(), containsString(startDate));
//
//        }
//
//    }
//
//    @Test(groups = {"version-2.4.0", "in-progress", "new_call", "product", "details", "transaction", "date_range"},  enabled = false)
//    public void testNewCallProductDetailsTransactionsDateRangeInValidStartDate() {
//
//        String serialNumber = "2367191811";
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.search("Serial #", serialNumber);
//        assertThat("Transaction History is not Empty", newCallProductHistory.isCurrentTransactionHistoryEmpty(), is(false));
//        newCallProductHistory.addStartDateRange("abc");
//        newCallProductHistory.clickDateRangeFilter();
//        assertThat("Date Invalid Value [abc]", newCallProductHistory.getDateRangeErrorMessage(), is(equalTo("Please enter a valid Start Date")));
//
//    }
//
//    @Test(groups = {"version-2.4.0", "in-progress", "new_call", "product", "details", "transaction", "date_range"},  enabled = false)
//    public void testNewCallProductDetailsTransactionsDateRangeStartDateMissing() {
//
//        String serialNumber = "2367191811";
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.search("Serial #", serialNumber);
//        assertThat("Transaction History is not Empty", newCallProductHistory.isCurrentTransactionHistoryEmpty(), is(false));
//        // Leave start dat empty
//        newCallProductHistory.addStartDateRange("");
//        newCallProductHistory.addEndDateRange("01/01/2007");
//        newCallProductHistory.clickDateRangeFilter();
//        assertThat("Transaction History is not Empty after searching by date", newCallProductHistory.isCurrentTransactionHistoryEmpty(), is(false));
//        assertThat("Date Invalid Value", newCallProductHistory.getDateRangeErrorMessage(), is(equalTo("Please enter a valid Start Date")));
//
//    }
//
//    @Test(groups = {"version-2.4.0", "in-progress", "new_call", "product", "details", "transaction", "date_range"},  enabled = false)
//    public void testNewCallProductDetailsTransactionsDateRangeStartDateAfterEndDate() {
//
//        String serialNumber = "2367191811";
//        String startDate = "12/31/2007";
//        String endDate = "12/01/2007";
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.search("Serial #", serialNumber);
//        assertThat("Transaction History is not Empty", newCallProductHistory.isCurrentTransactionHistoryEmpty(), is(false));
//        // Filter transactions by date range
//        newCallProductHistory.addStartDateRange(startDate);
//        newCallProductHistory.addEndDateRange(endDate);
//        newCallProductHistory.clickDateRangeFilter();
//        assertThat("Start Date After End Date Error", newCallProductHistory.getDateRangeErrorMessage(), is(equalTo("Start Date cannot be after End Date")));
//
//    }
//
//    @Test(groups = {"version-2.4.0", "in-progress", "new_call", "product", "details", "transaction", "date_range"},  enabled = false)
//    public void testNewCallProductDetailsTransactionsDateRangeClear() {
//
//        String serialNumber = "193366324";
//        String startDate = "05/01/2007";
//        String endDate = "05/30/2007";
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.search("Serial #", serialNumber);
//        assertThat("Transaction History is not Empty", newCallProductHistory.isCurrentTransactionHistoryEmpty(), is(false));
//        assertThat("Transaction History Default Page 1 Count", newCallProductHistory.getAllTransactions().size(), is(25));
//        assertThat("Archived Transaction History Count Displayed", newCallProductHistory.getDisplayedTransactionCount(), is(equalTo(57)));
//        newCallProductHistory.addStartDateRange(startDate);
//        newCallProductHistory.addEndDateRange(endDate);
//        newCallProductHistory.clickDateRangeFilter();
//        assertThat("Transaction History is not Empty after filtering", newCallProductHistory.isCurrentTransactionHistoryEmpty(), is(false));
//        assertThat("Transaction History Count is Filtered", newCallProductHistory.getAllTransactions().size(), is(equalTo(3)));
//        assertThat("Archived Transaction History Count Displayed", newCallProductHistory.getDisplayedTransactionCount(), is(equalTo(3)));
//        newCallProductHistory.clickDateRangeClear();
//        assertThat("Transaction History is not Empty after filtering", newCallProductHistory.isCurrentTransactionHistoryEmpty(), is(false));
//        assertThat("Start Date is Empty", newCallProductHistory.getStartDate(), is(equalTo("")));
//        assertThat("End Date is Empty", newCallProductHistory.getEndDate(), is(equalTo("")));
//        assertThat("Transaction History No Longer Filtered", newCallProductHistory.getAllTransactions().size(), is(25));
//        assertThat("Archived Transaction History Count Displayed", newCallProductHistory.getDisplayedTransactionCount(), is(equalTo(57)));
//
//    }
//
//    @Test(groups = {"version-2.4.0", "in-progress", "new_call", "product", "details", "transaction", "date_range"}, enabled = false)
//    public void testNewCallProductDetailsTransactionsDateRangeArchived() {
//
//        String serialNumber = "1274144898";
//        String startDate = "12/01/2007";
//        String endDate = "12/31/2007";
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.search("Serial #", serialNumber);
//        assertThat("Transaction History is not Empty", newCallProductHistory.isCurrentTransactionHistoryEmpty(), is(false));
//        newCallProductHistory.clickArchiveTransactions();
//        newCallProductHistory.addStartDateRange(startDate);
//        newCallProductHistory.addEndDateRange(endDate);
//        newCallProductHistory.clickDateRangeFilter();
//        assertThat("Transaction History is Empty after filtering", newCallProductHistory.isCurrentTransactionHistoryEmpty(), is(true));
//
//    }
//
//    @Test(groups = {"version-2.4.0", "in-progress", "new_call", "product", "details", "transaction", "date_range"}, enabled = false)
//    public void testNewCallProductDetailsTransactionsArchived() {
//
//        String serialNumber = "1274144898";
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.search("Serial #", serialNumber);
//        newCallSearch.autoAddTransitionWait();
//        assertThat("Transaction History is not Empty", newCallProductHistory.isCurrentTransactionHistoryEmpty(), is(false));
//        newCallProductHistory.clickArchiveTransactions();
//        assertThat("Transaction History is not Empty", newCallProductHistory.isCurrentTransactionHistoryEmpty(), is(false));
//        assertThat("Archived Transaction History Count", newCallProductHistory.getAllTransactions().size(), is(equalTo(1)));
//        assertThat("Archived Transaction History Count Displayed", newCallProductHistory.getDisplayedTransactionCount(), is(equalTo(1)));
//        assertThat("Archived Transaction Source Displayed", newCallProductHistory.getCurrentSelectedHistorySource(), is(equalTo("Archive")));
//
//    }
//
//    @Test(groups = {"version-2.4.0", "in-progress", "new_call", "product", "details", "transaction", "date_range"}, enabled = false)
//    public void testNewCallProductDetailsTransactionsArchivedBackToCurrent() {
//
//        String serialNumber = "193366324";
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.search("Serial #", serialNumber);
//        newCallSearch.autoAddTransitionWait();
//        assertThat("Transaction History is not Empty", newCallProductHistory.isCurrentTransactionHistoryEmpty(), is(false));
//        newCallProductHistory.clickArchiveTransactions();
//        assertThat("Transaction History is not Empty", newCallProductHistory.isCurrentTransactionHistoryEmpty(), is(true));
//        assertThat("Archived Transaction History Count Displayed", newCallProductHistory.getDisplayedTransactionCount(), is(equalTo(null)));
//        assertThat("Archived Transaction Source Displayed", newCallProductHistory.getCurrentSelectedHistorySource(), is(equalTo("Archive")));
//        newCallProductHistory.clickCurrentTransactions();
//        assertThat("Transaction History is not Empty", newCallProductHistory.isCurrentTransactionHistoryEmpty(), is(false));
//        assertThat("Archived Transaction History Count", newCallProductHistory.getAllTransactions().size(), is(equalTo(25)));
//        assertThat("Archived Transaction History Count Displayed", newCallProductHistory.getDisplayedTransactionCount(), is(equalTo(57)));
//        assertThat("Archived Transaction Source Displayed", newCallProductHistory.getCurrentSelectedHistorySource(), is(equalTo("Current")));
//
//    }
//
//    @DataProvider(name = "searchCriteria")
//    private Object[][] searchCriteria() {
//        return new Object[][]{
//                {"amount", "$0.00"},
//                {"created", "08/15/2013"},
//                {"entityNameType", "GLOBAL"},
//                {"opCodeFlag", "(D)"}
//        };
//    }
//
//}
