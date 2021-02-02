//package com.incomm.cca.qa.functional;
//
//import org.testng.annotations.Test;
//
//import java.text.SimpleDateFormat;
//import java.util.Date;
//
//import static org.hamcrest.MatcherAssert.assertThat;
//import static org.hamcrest.Matchers.equalTo;
//import static org.hamcrest.Matchers.is;
//
///**
// * User: mgalloway
// * Date: 12/30/13
// * Time: 8:02 AM
// */
//public class NewCallLocationDetailsTxnHistoryFT extends BaseFT {
//
//    final private String ASSIGNMENT_ID = "77047dd8-21ae-49ae-896b-a2a400c6e36f";
//    // This comes from Enterprise Tester's Execution Set URI for the given automated test class
//
//    @Test(groups = {"version-2.4.0", "new_call", "location", "details", "transaction", "date_range"},  enabled = false)
//    public void testNewCallLocationDetailsTransactionsDateRangePopCalendarAccessible() {
//
//        String location = "0075 - Holiday";
//        String startDate = "";
//        String endDate = "";
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.toggleLocationSearch();
//        newCallSearch.search("Name", location);
//        assertThat("Transaction History is not Empty", newCallLocationHistory.isCurrentTransactionHistoryEmpty(), is(false));
//        newCallLocationHistory.openStartDatePicker();
//        assertThat("Calendar Popup Appears for START Date Field", newCallLocationHistory.isDatePickerDisplayed(), is(true));
//        newCallLocationHistory.openEndDatePicker();
//        assertThat("Calendar Popup Appears for END Date Field", newCallLocationHistory.isDatePickerDisplayed(), is(true));
//
//    }
//
//    @Test(groups = {"version-2.4.0", "new_call", "location", "details", "transaction", "date_range"},  enabled = false)
//    public void testNewCallLocationDetailsTransactionsDateRangeEmptyEndDate() {
//
//        String location = "0075 - Holiday";
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.toggleLocationSearch();
//        newCallSearch.search("Name", location);
//        assertThat("Transaction History is not Empty", newCallLocationHistory.isCurrentTransactionHistoryEmpty(), is(false));
//        // Leave start dat empty
//        newCallLocationHistory.addStartDateRange("01/01/2007");
//        newCallLocationHistory.addEndDateRange("");
//        newCallLocationHistory.clickDateRangeFilter();
//        assertThat("Transaction History is not Empty after searching by date", newCallLocationHistory.isCurrentTransactionHistoryEmpty(), is(false));
//        Date today = new Date();
//        SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy");
//        String currentDate = sdf.format(today);
//        assertThat("Notification that end date was auto set", newCallLocationHistory.getDateRangeErrorMessage(), is(equalTo("Today's date used as End Date")));
//        assertThat("End Date Auto Set to Current Date", newCallLocationHistory.getEndDate(), is(equalTo(currentDate)));
//
//    }
//
//    @Test(groups = {"version-2.4.0", "new_call", "location", "details", "transaction", "date_range"},  enabled = false)
//    public void testNewCallLocationDetailsTransactionsEndDateRangeFutureDate() {
//
//        String location = "0075 - Holiday";
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.toggleLocationSearch();
//        newCallSearch.search("Name", location);
//        assertThat("Transaction History is not Empty", newCallLocationHistory.isCurrentTransactionHistoryEmpty(), is(false));
//        // Leave start dat empty
//        newCallLocationHistory.addStartDateRange("01/01/2007");
//        newCallLocationHistory.addEndDateRange("01/01/2020");
//        newCallLocationHistory.clickDateRangeFilter();
//        Date today = new Date();
//        SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy");
//        String currentDate = sdf.format(today);
//        assertThat("End Date Auto Set to Current Date", newCallLocationHistory.getEndDate(), is(equalTo(currentDate)));
//        assertThat("Notification that end date was auto set", newCallLocationHistory.getDateRangeErrorMessage(), is(equalTo("End Date automatically reduced to today's date")));
//
//    }
//
//    @Test(groups = {"version-2.4.0", "new_call", "location", "details", "transaction", "date_range"},  enabled = false)
//    public void testNewCallLocationDetailsTransactionsStartDateRangeFutureDate() {
//
//        String location = "0075 - Holiday";
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.toggleLocationSearch();
//        newCallSearch.search("Name", location);
//        assertThat("Transaction History is not Empty", newCallLocationHistory.isCurrentTransactionHistoryEmpty(), is(false));
//        // Leave start dat empty
//        newCallLocationHistory.addStartDateRange("01/01/2020");
//        newCallLocationHistory.clickDateRangeFilter();
//        assertThat("Notification that end date was auto set", newCallLocationHistory.getDateRangeErrorMessage(), is(equalTo("Start Date cannot be in the future")));
//
//    }
//
//    @Test(groups = {"version-2.4.0", "new_call", "location", "details", "transaction", "date_range"},  enabled = false)
//    public void testNewCallLocationDetailsTransactionsEndDateRangeInvalid() {
//
//        String location = "0075 - Holiday";
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.toggleLocationSearch();
//        newCallSearch.search("Name", location);
//        assertThat("Transaction History is not Empty", newCallLocationHistory.isCurrentTransactionHistoryEmpty(), is(false));
//        // Leave start dat empty
//        newCallLocationHistory.addStartDateRange("01/01/2007");
//        newCallLocationHistory.addEndDateRange("abc");
//        newCallLocationHistory.clickDateRangeFilter();
//        assertThat("Transaction History is not Empty after searching by date", newCallLocationHistory.isCurrentTransactionHistoryEmpty(), is(false));
//        assertThat("Notification that end date was auto set", newCallLocationHistory.getDateRangeErrorMessage(), is(equalTo("Today's date used as End Date")));
//
//    }
//
//}
