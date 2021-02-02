//package com.incomm.cca.qa.acceptance;
//
//import com.incomm.cca.qa.functional.BaseFT;
//import org.openqa.selenium.By;
//import org.openqa.selenium.support.ui.ExpectedConditions;
//import org.testng.annotations.DataProvider;
//import org.testng.annotations.Test;
//
//import static org.hamcrest.MatcherAssert.assertThat;
//import static org.hamcrest.Matchers.*;
//
///**
// * Pagination Acceptance Tests
// * User: mgalloway
// * Date: 5/29/13
// * Time: 10:22 AM
// */
//public class NewCallPaginationAT extends BaseFT {
//
//    final private String ASSIGNMENT_ID = "d917670d-8d6b-4e72-a1bf-a20a00cce5a3";
//    // This comes from Enterprise Tester's Execution Set URI for the given automated test class
//
//    @Test(groups = {"version-2.0.0", "in-progress", "new_call", "search", "location", "multiple_results", "pagination"}, dataProvider = "topBottom",  enabled = false)
//    public void testNewCallLocationPaginationMultiplePages(String topBottom) {
//
//        String locationName = "bestbuy";
//
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.toggleLocationSearch();
//        newCallSearch.search("Name", locationName);
//        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id(newCallSearch.SEARCH_LOCATION_RESULTS_FOR)));
//        assertThat("Result count displayed", newCallSearch.getSearchLocationResultsFor(), is(equalTo(String.format(newCallSearch.RESULTS_MESSAGE, "385", "location", locationName))));
//        assertThat("Expected default results per page are shown", newCallSearch.getSearchResultCount(), is(equalTo(25)));
//        assertThat("Current page(s)", newCallSearch.getCurrentLocationSearchResultPage(), is(equalTo("Page 1 of 16")));
//        String page1Result = newCallSearch.getSingleSearchResultLocation(0).get("name").getText();
//        if(topBottom.equals("top")) newCallSearch.clickPaginationLocationTopNext("2"); else newCallSearch.clickPaginationLocationBottomNext("2");
//        assertThat("Current page(s)", newCallSearch.getCurrentLocationSearchResultPage(), is(equalTo("Page 2 of 16")));
//        String page2Result = newCallSearch.getSingleSearchResultLocation(0).get("name").getText();
//        assertThat("Page 2 results are different from page 1", page1Result, is(not(equalTo(page2Result))));
//        if(topBottom.equals("top")) newCallSearch.clickPaginationLocationTopNext("3"); else newCallSearch.clickPaginationLocationBottomNext("3");
//        assertThat("Current page(s)", newCallSearch.getCurrentLocationSearchResultPage(), is(equalTo("Page 3 of 16")));
//        String page3Result = newCallSearch.getSingleSearchResultLocation(0).get("name").getText();
//        assertThat("Page 3 results are different from page 2", page3Result, is(not(equalTo(page2Result))));
//        if(topBottom.equals("top")) newCallSearch.clickPaginationLocationTopPrevious("2"); else newCallSearch.clickPaginationLocationBottomPrevious("2");
//        assertThat("Current page(s)", newCallSearch.getCurrentLocationSearchResultPage(), is(equalTo("Page 2 of 16")));
//        String currentPage = newCallSearch.getSingleSearchResultLocation(0).get("name").getText();
//        assertThat("Back to Page 2 results are same as previous page 2", currentPage, is(equalTo(page2Result)));
//        if(topBottom.equals("top")) newCallSearch.clickPaginationLocationTopPrevious("1"); else newCallSearch.clickPaginationLocationBottomPrevious("1");
//        assertThat("Current page(s)", newCallSearch.getCurrentLocationSearchResultPage(), is(equalTo("Page 1 of 16")));
//        currentPage = newCallSearch.getSingleSearchResultLocation(0).get("name").getText();
//        assertThat("Back to Page 1 results are same as previous page 1", currentPage, is(equalTo(page1Result)));
//
//    }
//
//    @Test(groups = {"version-2.0.0", "in-progress", "new_call", "search", "location", "multiple_results", "pagination"},  enabled = false)
//    public void testNewCallLocationPaginationSinglePage() {
//
//        String locationName = "7-11";
//        Integer expectedResults = 24;
//
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.toggleLocationSearch();
//        newCallSearch.search("Name", locationName);
//        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id(newCallSearch.SEARCH_LOCATION_RESULTS_FOR)));
//        assertThat("Result count displayed", newCallSearch.getSearchLocationResultsFor(), is(equalTo(String.format(newCallSearch.RESULTS_MESSAGE, expectedResults, "location", locationName))));
//        assertThat("Expected default results per page are shown", newCallSearch.getSearchResultCount(), is(equalTo(expectedResults)));
//        assertThat("Current page(s)", newCallSearch.getCurrentLocationSearchResultPage(), is(equalTo("Page 1 of 1")));
//        assertThat("Pagination Buttons Hidden", newCallSearch.isPaginationLocationTopNextDisplayed(), is(false));
//        assertThat("Pagination Buttons Hidden", newCallSearch.isPaginationLocationTopPreviousDisplayed(), is(false));
//        assertThat("Pagination Buttons Hidden", newCallSearch.isPaginationLocationBottomNextDisplayed(), is(false));
//        assertThat("Pagination Buttons Hidden", newCallSearch.isPaginationLocationBottomPreviousDisplayed(), is(false));
//
//    }
//
//    @Test(groups = {"version-2.0.0", "in-progress", "new_call", "search", "location", "multiple_results", "transaction", "pagination"}, dataProvider = "topBottom",  enabled = false)
//    public void testNewCallLocationTransactionsPaginationMultiplePages(String topBottom) {
//
//        String locationName = "0075 - Holiday";
//
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.toggleLocationSearch();
//        newCallSearch.search("Name", locationName);
//        newCallSearch.autoAddTransitionWait();
//        assertThat("Expected default results per page are shown", newCallLocationHistory.getAllTransactions().size(), is(equalTo(25)));
//        assertThat("Current page(s)", newCallLocationHistory.getCurrentLocationTransactionsSearchResultPageTop(), is(equalTo("Page 1 of 3")));
//        String page1Result = newCallLocationHistory.getSelectedLocationTransactionHistoryItem(0).get("created").getText();
//        if(topBottom.equals("top")) newCallLocationHistory.clickPaginationLocationTransactionsTopNext("2"); else newCallLocationHistory.clickPaginationLocationTransactionsBottomNext("2");
//        assertThat("Current page(s)", newCallLocationHistory.getCurrentLocationTransactionsSearchResultPageTop(), is(equalTo("Page 2 of 3")));
//        String page2Result = newCallLocationHistory.getSelectedLocationTransactionHistoryItem(0).get("created").getText();
//        assertThat("Page 2 results are different from page 1", page1Result, is(not(equalTo(page2Result))));
//        if(topBottom.equals("top")) newCallLocationHistory.clickPaginationLocationTransactionsTopNext("3"); else newCallLocationHistory.clickPaginationLocationTransactionsBottomNext("3");
//        assertThat("Current page(s)", newCallLocationHistory.getCurrentLocationTransactionsSearchResultPageTop(), is(equalTo("Page 3 of 3")));
//        String page3Result = newCallLocationHistory.getSelectedLocationTransactionHistoryItem(0).get("created").getText();
//        assertThat("Page 3 results are different from page 2", page3Result, is(not(equalTo(page2Result))));
//        if(topBottom.equals("top")) newCallLocationHistory.clickPaginationLocationTransactionsTopPrevious("2"); else newCallLocationHistory.clickPaginationLocationTransactionsBottomPrevious("2");
//        assertThat("Current page(s)", newCallLocationHistory.getCurrentLocationTransactionsSearchResultPageTop(), is(equalTo("Page 2 of 3")));
//        String currentPage = newCallLocationHistory.getSelectedLocationTransactionHistoryItem(0).get("created").getText();
//        assertThat("Back to Page 2 results are same as previous page 2", currentPage, is(equalTo(page2Result)));
//        if(topBottom.equals("top")) newCallLocationHistory.clickPaginationLocationTransactionsTopPrevious("1"); else newCallLocationHistory.clickPaginationLocationTransactionsBottomPrevious("1");
//        assertThat("Current page(s)", newCallLocationHistory.getCurrentLocationTransactionsSearchResultPageTop(), is(equalTo("Page 1 of 3")));
//        currentPage = newCallLocationHistory.getSelectedLocationTransactionHistoryItem(0).get("created").getText();
//        assertThat("Back to Page 1 results are same as previous page 1", currentPage, is(equalTo(page1Result)));
//
//    }
//
//    @Test(groups = {"version-2.0.0", "in-progress", "new_call", "search", "location", "multiple_results", "transaction", "pagination"},  enabled = false)
//    public void testNewCallLocationTransactionsPaginationSinglePage() {
//
//        String locationName = "2007 Holiday Thank You";
//        Integer expectedResults = 11;
//
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.toggleLocationSearch();
//        newCallSearch.search("Name", locationName);
//        assertThat("Expected default results per page are shown", newCallLocationHistory.getAllTransactions().size(), is(equalTo(expectedResults)));
//        assertThat("Current page(s)", newCallLocationHistory.getCurrentLocationTransactionsSearchResultPageTop(), is(equalTo("Page 1 of 1")));
//        assertThat("Pagination Buttons Hidden", newCallLocationHistory.isPaginationLocationTransactionsTopNextDisplayed(), is(false));
//        assertThat("Pagination Buttons Hidden", newCallLocationHistory.isPaginationLocationTransactionsTopPreviousDisplayed(), is(false));
//        assertThat("Pagination Buttons Hidden", newCallLocationHistory.isPaginationLocationTransactionsBottomNextDisplayed(), is(false));
//        assertThat("Pagination Buttons Hidden", newCallLocationHistory.isPaginationLocationTransactionsBottomPreviousDisplayed(), is(false));
//
//    }
//
//    @Test(groups = {"version-2.3.0", "in-progress", "new_call", "search", "product", "multiple_results", "transaction", "pagination"}, dataProvider = "topBottom",  enabled = false)
//    public void testNewCallProductTransactionsPaginationMultiplePages(String topBottom) {
//
//        String serial = "2367191811";
//
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.search("Serial #", serial);
//        newCallSearch.autoAddTransitionWait();
//        assertThat("Expected default results per page are shown", newCallProductHistory.getAllTransactions().size(), is(equalTo(25)));
//        assertThat("Current page(s)", newCallProductHistory.getCurrentProductTransactionsSearchResultPageTop(), is(equalTo("Page 1 of 2")));
//        String page1Result = newCallProductHistory.getSelectedCardTransactionHistoryItem(0).get("created").getText();
//        if(topBottom.equals("top")) newCallProductHistory.clickPaginationProductTransactionsTopNext("2"); else newCallProductHistory.clickPaginationProductTransactionsBottomNext("2");
//        assertThat("Current page(s)", newCallProductHistory.getCurrentProductTransactionsSearchResultPageTop(), is(equalTo("Page 2 of 2")));
//        String page2Result = newCallProductHistory.getSelectedCardTransactionHistoryItem(0).get("created").getText();
//        assertThat("Page 2 results are different from page 1", page1Result, is(not(equalTo(page2Result))));
//        if(topBottom.equals("top")) newCallProductHistory.clickPaginationProductTransactionsTopPrevious("1"); else newCallProductHistory.clickPaginationProductTransactionsBottomPrevious("1");
//        assertThat("Current page(s)", newCallProductHistory.getCurrentProductTransactionsSearchResultPageTop(), is(equalTo("Page 1 of 2")));
//        String currentPage = newCallProductHistory.getSelectedCardTransactionHistoryItem(0).get("created").getText();
//        assertThat("Back to Page 1 results are same as previous page 1", currentPage, is(equalTo(page1Result)));
//
//    }
//
//    @Test(groups = {"version-2.3.0", "in-progress", "new_call", "search", "product", "multiple_results", "transaction", "pagination"},  enabled = false)
//    public void testNewCallProductTransactionsPaginationSinglePage() {
//
//        String serial = "4002655112";
//        Integer expectedResults = 1;
//
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.search("Serial #", serial);
//        assertThat("Expected default results per page are shown", newCallProductHistory.getAllTransactions().size(), is(equalTo(expectedResults)));
//        assertThat("Current page(s)", newCallProductHistory.getCurrentProductTransactionsSearchResultPageTop(), is(equalTo("Page 1 of 1")));
//        assertThat("Pagination Buttons Hidden", newCallProductHistory.isPaginationProductTransactionsTopNextDisplayed(), is(false));
//        assertThat("Pagination Buttons Hidden", newCallProductHistory.isPaginationProductTransactionsTopPreviousDisplayed(), is(false));
//        assertThat("Pagination Buttons Hidden", newCallProductHistory.isPaginationProductTransactionsBottomNextDisplayed(), is(false));
//        assertThat("Pagination Buttons Hidden", newCallProductHistory.isPaginationProductTransactionsBottomPreviousDisplayed(), is(false));
//
//    }
//
//    @Test(groups = {"version-2.0.0", "in-progress", "new_call", "search", "location", "multiple_results", "transaction", "pagination"}, dataProvider = "topBottom",  enabled = false)
//    public void testNewCallLocationNotesPaginationMultiplePages(String topBottom) {
//
//        String locationName = "0075 - Holiday";
//
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.toggleLocationSearch();
//        newCallSearch.search("Name", locationName);
//        newCallSearch.autoAddTransitionWait();
//        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id(newCallLocationDetails.SEARCH_LOCATION_NOTES_RESULTS_PAGE)));
//        assertThat("Expected default results per page are shown", newCallLocationDetails.getSelectedLocationNoteHistory().size(), is(equalTo(25)));
//        assertThat("Current page(s)", newCallLocationDetails.getCurrentLocationNotesSearchResultPage(), is(equalTo("Page 1 of 6")));
//        String page1Result = newCallLocationDetails.getSelectedLocationNoteHistoryItem(0).get("created").getText();
//        if(topBottom.equals("top")) newCallLocationDetails.clickPaginationLocationNotesTopNext("2"); else newCallLocationDetails.clickPaginationLocationNotesBottomNext("2");
//        assertThat("Current page(s)", newCallLocationDetails.getCurrentLocationNotesSearchResultPage(), is(equalTo("Page 2 of 6")));
//        String page2Result = newCallLocationDetails.getSelectedLocationNoteHistoryItem(0).get("created").getText();
//        assertThat("Page 2 results are different from page 1", page1Result, is(not(equalTo(page2Result))));
//        if(topBottom.equals("top")) newCallLocationDetails.clickPaginationLocationNotesTopNext("3"); else newCallLocationDetails.clickPaginationLocationNotesBottomNext("3");
//        assertThat("Current page(s)", newCallLocationDetails.getCurrentLocationNotesSearchResultPage(), is(equalTo("Page 3 of 6")));
//        String page3Result = newCallLocationDetails.getSelectedLocationNoteHistoryItem(0).get("created").getText();
//        assertThat("Page 3 results are different from page 2", page3Result, is(not(equalTo(page2Result))));
//        if(topBottom.equals("top")) newCallLocationDetails.clickPaginationLocationNotesTopPrevious("2"); else newCallLocationDetails.clickPaginationLocationNotesBottomPrevious("2");
//        assertThat("Current page(s)", newCallLocationDetails.getCurrentLocationNotesSearchResultPage(), is(equalTo("Page 2 of 6")));
//        String currentPage = newCallLocationDetails.getSelectedLocationNoteHistoryItem(0).get("created").getText();
//        assertThat("Back to Page 2 results are same as previous page 2", currentPage, is(equalTo(page2Result)));
//        if(topBottom.equals("top")) newCallLocationDetails.clickPaginationLocationNotesTopPrevious("1"); else newCallLocationDetails.clickPaginationLocationNotesBottomPrevious("1");
//        assertThat("Current page(s)", newCallLocationDetails.getCurrentLocationNotesSearchResultPage(), is(equalTo("Page 1 of 6")));
//        currentPage = newCallLocationDetails.getSelectedLocationNoteHistoryItem(0).get("created").getText();
//        assertThat("Back to Page 1 results are same as previous page 1", currentPage, is(equalTo(page1Result)));
//
//    }
//
//    @Test(groups = {"version-2.0.0", "in-progress", "new_call", "search", "location", "multiple_results", "transaction", "pagination"},  enabled = false)
//    public void testNewCallLocationNotesPaginationSinglePage() {
//
//        String locationName = "4062162807 - Velocity Wireless (Walmart)";
//
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.toggleLocationSearch();
//        newCallSearch.search("Name", locationName);
//        newCallSearch.autoAddTransitionWait();
//        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id(newCallLocationDetails.SEARCH_LOCATION_NOTES_RESULTS_PAGE)));
//        assertThat("Expected default results per page are shown", newCallLocationDetails.getSelectedLocationNoteHistory().size(), is(equalTo(Integer.parseInt(newCallLocationDetails.getSelectedLocationNoteHistoryTotal().replace("(","").replace(")","")))));
//        assertThat("Current page(s)", newCallLocationDetails.getCurrentLocationNotesSearchResultPage(), is(equalTo("Page 1 of 1")));
//        assertThat("Pagination Buttons Hidden", newCallLocationDetails.isPaginationLocationNotesTopNextDisplayed(), is(false));
//        assertThat("Pagination Buttons Hidden", newCallLocationDetails.isPaginationLocationNotesTopPreviousDisplayed(), is(false));
//        assertThat("Pagination Buttons Hidden", newCallLocationDetails.isPaginationLocationNotesBottomNextDisplayed(), is(false));
//        assertThat("Pagination Buttons Hidden", newCallLocationDetails.isPaginationLocationNotesBottomPreviousDisplayed(), is(false));
//
//    }
//
//    @DataProvider(name = "topBottom")
//    private Object[][] topBottom() {
//        return new Object[][]{
//                {"top"},
//                {"bottom"}
//        };
//    }
//
//}
