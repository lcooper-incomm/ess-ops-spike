//package com.incomm.cca.qa.functional;
//
//import org.openqa.selenium.WebElement;
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
// * User: mgalloway
// * Date: 4/17/13
// * Time: 3:11 PM
// */
//public class NewCallProductDetailsTxnHistoryFT extends BaseFT {
//
//    final private String ASSIGNMENT_ID = "b9eb80c2-6b36-4297-be51-a20a00d5042e";
//    // This comes from Enterprise Tester's Execution Set URI for the given automated test class
//
//    @Test(groups = {"version-2.0.0", "new_call", "product", "details", "inventory_transaction"},  enabled = false)
//    public void testNewCallProductDetailsTransactionsDefaultSortOrderDesc() throws ParseException {
//
//        String serialNumber = "2367191811";
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.search("Serial #", serialNumber);
//        newCallSearch.autoAddTransitionWait();
//        assertThat("Transaction History is not Empty", newCallProductHistory.isCurrentTransactionHistoryEmpty(), is(false));
//        SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yy HH:mm:ss");
//        List<WebElement> transactions = newCallProductHistory.getAllTransactions();
//        Date previous = null;
//        for(WebElement transaction : transactions) {
//
//            String id = transaction.getAttribute("id");
//            Integer i = Integer.parseInt(id.substring(id.length() - 1));
//            Map<String, WebElement> currentElement = newCallProductHistory.getSelectedCardTransactionHistoryItem(i);
//            Date currentDate =  sdf.parse(currentElement.get("created").getText());
//            if(i.equals(transactions.size() - 1)) {
//                assertThat("Default sort is Desc (last item is older than the previous): [Transaction Item: " + i + "]", currentDate, is(lessThanOrEqualTo(previous)));
//            }
//            else {
//                Map<String, WebElement> nextElement = newCallProductHistory.getSelectedCardTransactionHistoryItem(i + 1);
//                Date nextDate =  sdf.parse(nextElement.get("created").getText());
//                assertThat("Default sort is Desc (current item is newer than the next): [Transaction Item: " + i + "]", currentDate, is(greaterThanOrEqualTo(nextDate)));
//            }
//            previous = currentDate;
//
//        }
//
//    }
//
//    @Test(groups = {"version-2.4.0", "new_call", "product", "details", "transaction", "date_range"},  enabled = false)
//    public void testNewCallProductDetailsTransactionsDateRangePopCalendarAccessible() {
//
//        String serialNumber = "1274144898";
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.search("Serial #", serialNumber);
//        assertThat("Transaction History is not Empty", newCallProductHistory.isCurrentTransactionHistoryEmpty(), is(false));
//        newCallProductHistory.openStartDatePicker();
//        assertThat("Calendar Popup Appears for START Date Field", newCallProductHistory.isDatePickerDisplayed(), is(true));
//        newCallProductHistory.openEndDatePicker();
//        assertThat("Calendar Popup Appears for END Date Field", newCallProductHistory.isDatePickerDisplayed(), is(true));
//
//    }
//
//    @Test(groups = {"version-2.4.0", "new_call", "product", "details", "transaction", "date_range"},  enabled = false)
//    public void testNewCallProductDetailsTransactionsDateRangeEmptyEndDate() {
//
//        String serialNumber = "1274144898";
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.search("Serial #", serialNumber);
//        assertThat("Transaction History is not Empty", newCallProductHistory.isCurrentTransactionHistoryEmpty(), is(false));
//        newCallProductHistory.addStartDateRange("01/01/2007");
//        newCallProductHistory.addEndDateRange("");
//        newCallProductHistory.clickDateRangeFilter();
//        Date today = new Date();
//        SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy");
//        String currentDate = sdf.format(today);
//        assertThat("End Date Auto Set to Current Date", newCallProductHistory.getEndDate(), is(equalTo(currentDate)));
//        assertThat("Notification that end date was auto set", newCallProductHistory.getDateRangeErrorMessage(), is(equalTo("Today's date used as End Date")));
//
//    }
//
//    @Test(groups = {"version-2.4.0", "new_call", "product", "details", "transaction", "date_range"},  enabled = false)
//    public void testNewCallProductDetailsTransactionsEndDateRangeFutureDate() {
//
//        String serialNumber = "1274144898";
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.search("Serial #", serialNumber);
//        assertThat("Transaction History is not Empty", newCallProductHistory.isCurrentTransactionHistoryEmpty(), is(false));
//        newCallProductHistory.addStartDateRange("01/01/2007");
//        newCallProductHistory.addEndDateRange("01/01/2020");
//        newCallProductHistory.clickDateRangeFilter();
//        Date today = new Date();
//        SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy");
//        String currentDate = sdf.format(today);
//        assertThat("End Date Auto Set to Current Date", newCallProductHistory.getEndDate(), is(equalTo(currentDate)));
//        assertThat("Notification that end date was auto set", newCallProductHistory.getDateRangeErrorMessage(), is(equalTo("End Date automatically reduced to today's date")));
//
//    }
//
//    @Test(groups = {"version-2.4.0", "new_call", "product", "details", "transaction", "date_range"},  enabled = false)
//    public void testNewCallProductDetailsTransactionsStartDateRangeFutureDate() {
//
//        String serialNumber = "1274144898";
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.search("Serial #", serialNumber);
//        assertThat("Transaction History is not Empty", newCallProductHistory.isCurrentTransactionHistoryEmpty(), is(false));
//        newCallProductHistory.addStartDateRange("01/01/2020");
//        newCallProductHistory.clickDateRangeFilter();
//        assertThat("Notification that end date was auto set", newCallProductHistory.getDateRangeErrorMessage(), is(equalTo("Start Date cannot be in the future")));
//
//    }
//
//    @Test(groups = {"version-2.4.0", "new_call", "location", "details", "transaction", "date_range"},  enabled = false)
//    public void testNewCallProductDetailsTransactionsEndDateRangeInvalid() {
//
//        String serialNumber = "1274144898";
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.search("Serial #", serialNumber);
//        assertThat("Transaction History is not Empty", newCallProductHistory.isCurrentTransactionHistoryEmpty(), is(false));
//        newCallProductHistory.addStartDateRange("01/01/2007");
//        newCallProductHistory.addEndDateRange("abc");
//        newCallProductHistory.clickDateRangeFilter();
//        assertThat("Transaction History is not Empty after searching by date", newCallProductHistory.isCurrentTransactionHistoryEmpty(), is(false));
//        assertThat("Notification that end date was auto set", newCallProductHistory.getDateRangeErrorMessage(), is(equalTo("Today's date used as End Date")));
//
//    }
//
//}
