//package com.incomm.cca.qa.acceptance;
//
//import com.incomm.cca.qa.functional.BaseFT;
//import org.openqa.selenium.By;
//import org.openqa.selenium.WebElement;
//import org.openqa.selenium.support.ui.ExpectedConditions;
//import org.testng.annotations.Test;
//
//import java.text.ParseException;
//import java.text.SimpleDateFormat;
//import java.util.Date;
//import java.util.List;
//import java.util.Map;
//
//import static org.hamcrest.MatcherAssert.assertThat;
//import static org.hamcrest.Matchers.*;
//
///**
// * New Call Location Details Transaction History Acceptance Tests
// * User: mgalloway
// * Date: 7/25/13
// * Time: 9:23 AM
// */
//public class NewCallLocationDetailsTxnHistoryAT extends BaseFT {
//
//    final private String ASSIGNMENT_ID = "fb9f91ae-bb74-482f-b909-a20a00ccbc49";
//    // This comes from Enterprise Tester's Execution Set URI for the given automated test class
//
//    @Test(groups = {"version-2.0.0", "in-progress", "new_call", "location", "details", "transaction"},  enabled = false)
//    public void testNewCallLocationDetailsNoTransactions() {
//
//        String location = "4062162807 - Velocity Wireless (Walmart)";
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.toggleLocationSearch();
//        newCallSearch.search("Name", location);
//        newCallSearch.autoAddTransitionWait();
//        assertThat("Transaction History is Empty", newCallLocationHistory.isCurrentTransactionHistoryEmpty(), is(true));
//        assertThat("Transaction History is Empty Message", newCallLocationHistory.getNoCurrentTransactionHistoryMessage(), is(equalTo(newCallLocationHistory.NO_CURRENT_TRANSACTION_HISTORY_MESSAGE)));
//
//    }
//
//    @Test(groups = {"version-2.0.0", "in-progress", "new_call", "location", "details", "transaction"},  enabled = false)
//    public void testNewCallLocationDetailsMultipleTransactions() {
//
//        String location = "0075 - Holiday";
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.toggleLocationSearch();
//        newCallSearch.search("Name", location);
//        assertThat("Transaction History is not Empty", newCallLocationHistory.isCurrentTransactionHistoryEmpty(), is(false));
//        assertThat("Transaction History Default Page 1 Count", newCallLocationHistory.getAllTransactions().size(), is(25));
//        String[] pages = newCallLocationHistory.getCurrentLocationTransactionsSearchResultPageTop().split(" ");
//        Integer totalPages = Integer.parseInt(pages[3]);
//        Integer totalTransactions = newCallLocationHistory.getAllTransactions().size();
//        for(int i = 1; i < totalPages; i++) {
//
//            String expectedNextPage = String.valueOf(i + 1);
//            newCallLocationHistory.clickPaginationLocationTransactionsTopNext(expectedNextPage);
//            totalTransactions += newCallLocationHistory.getAllTransactions().size();
//
//        }
//        assertThat("Transaction History Total Count", newCallLocationHistory.getDisplayedTransactionCount(), is(equalTo(totalTransactions)));
//
//    }
//
//    @Test(groups = {"version-2.0.0", "in-progress", "new_call", "location", "details", "transaction"},  enabled = false)
//    public void testNewCallLocationDetailsTransactionFields() {
//
//        String location = "0075 - Holiday";
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.toggleLocationSearch();
//        newCallSearch.search("Name", location);
//        assertThat("Transaction History is not Empty", newCallLocationHistory.isCurrentTransactionHistoryEmpty(), is(false));
//        Map<String, WebElement> actual = newCallLocationHistory.getSelectedLocationTransactionHistoryItem(8);
//        assertThat("Transaction ID", actual.get("id").getText(), is(equalTo("17118346")));
//        assertThat("Transaction Create Date", actual.get("created").getText(), is(equalTo("07/14/2005 17:12:35")));
//        assertThat("Transaction Create Date Title", actual.get("created").getAttribute("title"), is(equalTo("Jul 14, 2005 5:12:35 PM EDT")));
//        assertThat("Transaction Amount", actual.get("amount").getText(), is(equalTo("$10.00")));
//        assertThat("Transaction Amount Title", actual.get("amount").getAttribute("title"), is(equalTo("$10.00")));
//        assertThat("Transaction Entity Name and Type", actual.get("entityNameType").getText(), is(equalTo("0075 - Holiday")));
//        assertThat("Transaction Entity Name Type", actual.get("entityNameType").getAttribute("title"), is(equalTo("LOCATION")));
//        assertThat("Transaction opCodeFlag", actual.get("opCodeFlag").getText(), is(equalTo("OP Code: X")));
//        assertThat("Transaction opCodeFlag Title", actual.get("opCodeFlag").getAttribute("title"), is(equalTo("2100 - Wireless Replenishment (X)")));
//        assertThat("Transaction Account #", actual.get("accountNumber").getText(), is(equalTo("4137395013465473")));
//        assertThat("Transaction Serial #", actual.get("serialNumber").getText(), is(equalTo("193366324")));
//        assertThat("Transaction Serial Number is a Link", actual.get("serialNumber").findElement(By.tagName("a")).isDisplayed(), is(true));
//        assertThat("Transaction LegacyNote", actual.get("note").getText(), is(equalTo("Fastcard Wireless Redemption [ATT Wireless]")));
//
//    }
//
//    @Test(groups = {"version-2.0.0", "in-progress", "new_call", "location", "details", "transaction"},  enabled = false)
//    public void testNewCallLocationDetailsTransactionsDefaultSortOrderDesc() throws ParseException {
//
//        String location = "0075 - Holiday";
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.toggleLocationSearch();
//        newCallSearch.search("Name", location);
//        assertThat("Transaction History is not Empty", newCallLocationHistory.isCurrentTransactionHistoryEmpty(), is(false));
//        SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
//        List<WebElement> transactions = newCallLocationHistory.getAllTransactions();
//        Date previous = null;
//        for(WebElement transaction : transactions) {
//
//            String id = transaction.getAttribute("id");
//            Integer i = Integer.parseInt(id.substring(id.length() - 1));
//            Map<String, WebElement> currentElement = newCallLocationHistory.getSelectedLocationTransactionHistoryItem(i);
//            Date currentDate =  sdf.parse(currentElement.get("created").getText());
//            if(i.equals(transactions.size() - 1)) {
//                assertThat("Default sort is Desc (last item is older than the previous): [Transaction Item: " + i + "]", currentDate, is(lessThanOrEqualTo(previous)));
//            }
//            else {
//                Map<String, WebElement> nextElement = newCallLocationHistory.getSelectedLocationTransactionHistoryItem(i + 1);
//                Date nextDate =  sdf.parse(nextElement.get("created").getText());
//                assertThat("Default sort is Desc (current item is newer than the next): [Transaction Item: " + i + "]", currentDate, is(greaterThanOrEqualTo(nextDate)));
//            }
//            previous = currentDate;
//
//        }
//
//
//    }
//
//    @Test(groups = {"version-2.4.0", "in-progress", "new_call", "location", "details", "transaction", "date_range"},  enabled = false)
//    public void testNewCallLocationDetailsTransactionsDateRangeCurrent() {
//
//        String location = "0075 - Holiday";
//        String startDate = "01/01/2007";
//        String endDate = "12/01/2007";
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.toggleLocationSearch();
//        newCallSearch.search("Name", location);
//        assertThat("Transaction History is not Empty", newCallLocationHistory.isCurrentTransactionHistoryEmpty(), is(false));
//        assertThat("Transaction History Default Page 1 Count", newCallLocationHistory.getAllTransactions().size(), is(25));
//        // Filter transactions by date range
//        newCallLocationHistory.addStartDateRange(startDate);
//        newCallLocationHistory.addEndDateRange(endDate);
//        newCallLocationHistory.clickDateRangeFilter();
//        assertThat("Transaction History is not Empty", newCallLocationHistory.isCurrentTransactionHistoryEmpty(), is(false));
//        assertThat("Transaction History Count is Filtered", newCallLocationHistory.getAllTransactions().size(), is(equalTo(2)));
//
//    }
//
//    @Test(groups = {"version-2.4.1", "in-progress", "new_call", "location", "details", "transaction", "date_range"},  enabled = false)
//    public void testNewCallLocationDetailsTransactionsDateRangeNoResultsCurrent() {
//
//        String location = "0075 - Holiday";
//        String startDate = "01/01/2014";
//        String endDate = "02/01/2014";
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.toggleLocationSearch();
//        newCallSearch.search("Name", location);
//        assertThat("Transaction History is not Empty", newCallLocationHistory.isCurrentTransactionHistoryEmpty(), is(false));
//        assertThat("Transaction History Default Page 1 Count", newCallLocationHistory.getAllTransactions().size(), is(25));
//        // Filter transactions by date range
//        newCallLocationHistory.addStartDateRange(startDate);
//        newCallLocationHistory.addEndDateRange(endDate);
//        newCallLocationHistory.clickDateRangeFilter();
//        assertThat("Transaction History No Results Message", newCallLocationHistory.getNoSearchResultsMessage(), is(equalTo(newCallLocationHistory.NO_FILTERED_HISTORY_MESSAGE)));
//        assertThat("Date Range Form is still visible", newCallLocationHistory.startDateRange.isDisplayed(), is(true));
//
//    }
//
//    @Test(groups = {"version-2.4.1", "in-progress", "new_call", "location", "details", "transaction", "date_range"},  enabled = false)
//    public void testNewCallLocationDetailsTransactionsDateRangeSingleDayCurrent() {
//
//        String location = "0075 - Holiday";
//        String startDate = "07/05/2007";
//        String endDate = "07/05/2007";
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.toggleLocationSearch();
//        newCallSearch.search("Name", location);
//        assertThat("Transaction History is not Empty", newCallLocationHistory.isCurrentTransactionHistoryEmpty(), is(false));
//        assertThat("Transaction History Default Page 1 Count", newCallLocationHistory.getAllTransactions().size(), is(25));
//        // Filter transactions by date range
//        newCallLocationHistory.addStartDateRange(startDate);
//        newCallLocationHistory.addEndDateRange(endDate);
//        newCallLocationHistory.clickDateRangeFilter();
//        assertThat("Transaction History is not Empty", newCallLocationHistory.isCurrentTransactionHistoryEmpty(), is(false));
//        assertThat("Transaction History Count is Filtered", newCallLocationHistory.getAllTransactions().size(), is(equalTo(1)));
//        List<WebElement> transactions = newCallLocationHistory.getAllTransactions();
//        for(int i = 0; i < transactions.size(); i++) {
//
//            Map<String, WebElement> actual = newCallLocationHistory.getSelectedLocationTransactionHistoryItem(i);
//            assertThat("Resulting Transactions Date", actual.get("created").getText(), containsString(startDate));
//
//        }
//
//    }
//
//    @Test(groups = {"version-2.4.0", "in-progress", "new_call", "location", "details", "transaction", "date_range"},  enabled = false)
//    public void testNewCallLocationDetailsTransactionsDateRangeInValidStartDate() {
//
//        String location = "0075 - Holiday";
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.toggleLocationSearch();
//        newCallSearch.search("Name", location);
//        assertThat("Transaction History is not Empty", newCallLocationHistory.isCurrentTransactionHistoryEmpty(), is(false));
//        newCallLocationHistory.addStartDateRange("abc");
//        newCallLocationHistory.clickDateRangeFilter();
//        assertThat("Date Invalid Value [abc]", newCallLocationHistory.getDateRangeErrorMessage(), is(equalTo("Please enter a valid Start Date")));
//
//    }
//
//    @Test(groups = {"version-2.4.0", "in-progress", "new_call", "location", "details", "transaction", "date_range"},  enabled = false)
//    public void testNewCallLocationDetailsTransactionsDateRangeStartDateMissing() {
//
//        String location = "0075 - Holiday";
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.toggleLocationSearch();
//        newCallSearch.search("Name", location);
//        assertThat("Transaction History is not Empty", newCallLocationHistory.isCurrentTransactionHistoryEmpty(), is(false));
//        // Leave start dat empty
//        newCallLocationHistory.addStartDateRange("");
//        newCallLocationHistory.addEndDateRange("01/01/2007");
//        newCallLocationHistory.clickDateRangeFilter();
//        assertThat("Date Invalid Value", newCallLocationHistory.getDateRangeErrorMessage(), is(equalTo("Please enter a valid Start Date")));
//
//    }
//
//    @Test(groups = {"version-2.4.0", "in-progress", "new_call", "location", "details", "transaction", "date_range"},  enabled = false)
//    public void testNewCallLocationDetailsTransactionsDateRangeStartDateAfterEndDate() {
//
//        String location = "0075 - Holiday";
//        String startDate = "12/31/2007";
//        String endDate = "12/01/2007";
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.toggleLocationSearch();
//        newCallSearch.search("Name", location);
//        assertThat("Transaction History is not Empty", newCallLocationHistory.isCurrentTransactionHistoryEmpty(), is(false));
//        // Filter transactions by date range
//        newCallLocationHistory.addStartDateRange(startDate);
//        newCallLocationHistory.addEndDateRange(endDate);
//        newCallLocationHistory.clickDateRangeFilter();
//        assertThat("Transaction History is not Empty after searching by date", newCallLocationHistory.isCurrentTransactionHistoryEmpty(), is(false));
//        assertThat("Start Date After End Date Error", newCallLocationHistory.getDateRangeErrorMessage(), is(equalTo("Start Date cannot be after End Date")));
//
//    }
//
//    @Test(groups = {"version-2.4.0", "in-progress", "new_call", "location", "details", "transaction", "date_range"},  enabled = false)
//    public void testNewCallLocationDetailsTransactionsDateRangeClear() {
//
//        String location = "0075 - Holiday";
//        String startDate = "07/01/2007";
//        String endDate = "07/31/2007";
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.toggleLocationSearch();
//        newCallSearch.search("Name", location);
//        assertThat("Transaction History is not Empty", newCallLocationHistory.isCurrentTransactionHistoryEmpty(), is(false));
//        assertThat("Transaction History Default Page 1 Count", newCallLocationHistory.getAllTransactions().size(), is(25));
//        assertThat("Archived Transaction History Count Displayed", newCallLocationHistory.getDisplayedTransactionCount(), is(equalTo(62)));
//        newCallLocationHistory.addStartDateRange(startDate);
//        newCallLocationHistory.addEndDateRange(endDate);
//        newCallLocationHistory.clickDateRangeFilter();
//        assertThat("Transaction History is not Empty", newCallLocationHistory.isCurrentTransactionHistoryEmpty(), is(false));
//        assertThat("Transaction History Count is Filtered", newCallLocationHistory.getAllTransactions().size(), is(equalTo(1)));
//        assertThat("Archived Transaction History Count Displayed", newCallLocationHistory.getDisplayedTransactionCount(), is(equalTo(1)));
//        newCallLocationHistory.clickDateRangeClear();
//        assertThat("Start Date is Empty", newCallLocationHistory.getStartDate(), is(equalTo("")));
//        assertThat("End Date is Empty", newCallLocationHistory.getEndDate(), is(equalTo("")));
//        assertThat("Transaction History Default Page 1 Count", newCallLocationHistory.getAllTransactions().size(), is(25));
//        assertThat("Archived Transaction History Count Displayed", newCallLocationHistory.getDisplayedTransactionCount(), is(equalTo(62)));
//
//    }
//
//    @Test(groups = {"version-2.4.0", "in-progress", "new_call", "location", "details", "transaction", "date_range"}, enabled = false)
//    public void testNewCallLocationDetailsTransactionsDateRangeArchived() {
//
//        String location = "Dept Promos";
//        String startDate = "12/01/2007";
//        String endDate = "12/31/2007";
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.toggleLocationSearch();
//        newCallSearch.search("Name", location);
//
//        List<WebElement> results = newCallSearch.getSearchResultCards();
//        Map<String, WebElement> selectedLocation = null;
//        for(int i = 0; i <= results.size(); i++) {
//            Map<String, WebElement> locationResult = newCallSearch.getSingleSearchResultLocation(i);
//            if(locationResult.get("merchant").getText().equals("FSS")) {
//                selectedLocation = locationResult;
//                break;
//            }
//        }
//
//        selectedLocation.get("add").click();
//        newCallSearch.autoAddTransitionWait();
//        assertThat("Transaction History is not Empty", newCallLocationHistory.isCurrentTransactionHistoryEmpty(), is(false));
//        newCallLocationHistory.clickArchiveTransactions();
//        newCallLocationHistory.addStartDateRange(startDate);
//        newCallLocationHistory.addEndDateRange(endDate);
//        newCallLocationHistory.clickDateRangeFilter();
//        assertThat("Transaction History is not Empty", newCallLocationHistory.isCurrentTransactionHistoryEmpty(), is(false));
//        assertThat("Archived Transaction History Count is Filtered", newCallLocationHistory.getAllTransactions().size(), is(equalTo(1)));
//
//    }
//
//    @Test(groups = {"version-2.4.0", "in-progress", "new_call", "location", "details", "transaction", "date_range"}, enabled = false)
//     public void testNewCallLocationDetailsTransactionsArchived() {
//
//        String location = "Dept Promos";
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.toggleLocationSearch();
//        newCallSearch.search("Name", location);
//
//        List<WebElement> results = newCallSearch.getSearchResultCards();
//        Map<String, WebElement> selectedLocation = null;
//        for(int i = 0; i < results.size(); i++) {
//            Map<String, WebElement> locationResult = newCallSearch.getSingleSearchResultLocation(i);
//            if(locationResult.get("merchant").getText().equals("FSS")) {
//                selectedLocation = locationResult;
//                break;
//            }
//        }
//
//        selectedLocation.get("add").click();
//        newCallSearch.autoAddTransitionWait();
//        assertThat("Current Transaction History is not Empty", newCallLocationHistory.isCurrentTransactionHistoryEmpty(), is(false));
//        newCallLocationHistory.clickArchiveTransactions();
//        assertThat("Archived Transaction History is not Empty", newCallLocationHistory.isArchivedTransactionHistoryEmpty(), is(false));
//        assertThat("Archived Transaction History Count", newCallLocationHistory.getAllTransactions().size(), is(equalTo(4)));
//        assertThat("Archived Transaction History Count Displayed", newCallLocationHistory.getDisplayedTransactionCount(), is(equalTo(4)));
//        assertThat("Archived Transaction Source Displayed", newCallLocationHistory.getCurrentSelectedHistorySource(), is(equalTo("Archive")));
//
//    }
//
//    @Test(groups = {"version-2.4.0", "in-progress", "new_call", "location", "details", "transaction", "date_range"}, enabled = false)
//    public void testNewCallLocationDetailsTransactionsArchivedBackToCurrent() {
//
//        String location = "Dept Promos";
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.toggleLocationSearch();
//        newCallSearch.search("Name", location);
//
//        List<WebElement> results = newCallSearch.getSearchResultCards();
//        Map<String, WebElement> selectedLocation = null;
//        for(int i = 0; i < results.size(); i++) {
//            Map<String, WebElement> locationResult = newCallSearch.getSingleSearchResultLocation(i);
//            if(locationResult.get("merchant").getText().equals("FSS")) {
//                selectedLocation = locationResult;
//                break;
//            }
//        }
//
//        selectedLocation.get("add").click();
//        newCallSearch.autoAddTransitionWait();
//        assertThat("Transaction History is not Empty", newCallLocationHistory.isCurrentTransactionHistoryEmpty(), is(false));
//        newCallLocationHistory.clickArchiveTransactions();
//        assertThat("Transaction History is not Empty", newCallLocationHistory.isCurrentTransactionHistoryEmpty(), is(false));
//        assertThat("Archived Transaction History Count", newCallLocationHistory.getAllTransactions().size(), is(equalTo(4)));
//        assertThat("Archived Transaction History Count Displayed", newCallLocationHistory.getDisplayedTransactionCount(), is(equalTo(4)));
//        assertThat("Archived Transaction Source Displayed", newCallLocationHistory.getCurrentSelectedHistorySource(), is(equalTo("Archive")));
//        newCallLocationHistory.clickCurrentTransactions();
//        assertThat("Transaction History is not Empty", newCallLocationHistory.isCurrentTransactionHistoryEmpty(), is(false));
//        assertThat("Archived Transaction History Count", newCallLocationHistory.getAllTransactions().size(), is(equalTo(1)));
//        assertThat("Archived Transaction History Count Displayed", newCallLocationHistory.getDisplayedTransactionCount(), is(equalTo(1)));
//        assertThat("Archived Transaction Source Displayed", newCallLocationHistory.getCurrentSelectedHistorySource(), is(equalTo("Current")));
//
//    }
//
//    @Test(groups = {"version-2.4.0", "in-progress", "new_call", "search", "location-search"},  enabled = false)
//    public void testNewCallProductLink() {
//
//        String locationName = "0075 - holiday";
//        String serialNumber = "193366324";
//
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.toggleLocationSearch();
//        newCallSearch.search("Name", locationName);
//        newCallSearch.autoAddTransitionWait();
//        // CLick serial number from transaction history
//        newCallLocationHistory.clickTransactionHistorySerialNumber(serialNumber, 0);
//        wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(By.name(newCallProductHistory.TRANSACTION_HISTORY)));
//        assertThat("Product Returned", newCallSearch.isProductDisplayed(), is(true));
//        assertThat("Product Returned is " + serialNumber, newCallProductDetails.getSelectedCardSerialNumber(), is(equalTo(serialNumber)));
//
//    }
//
//    @Test(groups = {"version-2.4.0", "in-progress", "new_call", "search", "location-search"}, enabled = false)
//    public void testNewCallProductLinkNotFound() {
//
//        String locationName = "Dept Promos";
//        String serialNumber = "773883088";
//
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.toggleLocationSearch();
//        newCallSearch.search("Name", locationName);
//        newCallSearch.autoAddTransitionWait();
//        newCallLocationHistory.clickArchiveTransactions();
//        assertThat("Archived Transaction History is not Empty", newCallLocationHistory.isCurrentTransactionHistoryEmpty(), is(false));
//        // CLick serial number from transaction history
//        newCallLocationHistory.clickTransactionHistorySerialNumber(serialNumber, 0);
//        // Validate not found notification and message
////        assertThat("product not found for serial number", alerts.getNotificationText(), is(equalTo("No data could be found for that serial number.")));
//
//    }
//
//}
