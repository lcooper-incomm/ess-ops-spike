//package com.incomm.cca.qa.acceptance;
//
//import com.incomm.cca.qa.functional.BaseFT;
//import org.testng.annotations.DataProvider;
//import org.testng.annotations.Test;
//
//import static org.hamcrest.MatcherAssert.assertThat;
//import static org.hamcrest.Matchers.equalTo;
//import static org.hamcrest.Matchers.is;
//
///**
// * User: mgalloway
// * Date: 8/6/13
// * Time: 9:45 AM
// */
//public class VendorStatusCheckAT extends BaseFT {
//
//    final private String ASSIGNMENT_ID = "55cd9c75-c890-46b7-b6e6-a211010037a7";
//    // This comes from Enterprise Tester's Execution Set URI for the given automated test class
//
//    @Test(groups = {"version-2.2.0", "in-progress", "new_call", "search", "status"}, dataProvider = "vendors", description = "Search for Vendor Status",  enabled = false)
//    public void testNewCallVendorStatusSearchResult(String platform, String pin, String expectedVendorStatus, String expectedStatusTitle) {
//
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.toggleStatusSearch();
//        assertThat("default search result message", newCallSearch.getSearchStatusResultsPanelContents(), is(equalTo(newCallSearch.NEW_STATUS_SEARCH_MESSAGE)));
//        newCallSearch.selectSearchPlatform(platform);
//        newCallSearch.search("status", pin);
//        assertThat("Vendor Status Results Message", newCallSearch.getSearchStatusResultsFor(), is(equalTo(String.format(newCallSearch.RESULTS_STATUS_MESSAGE, pin, platform))));
//        assertThat("Vendor Status", newCallSearch.getSearchResultStatus().get("vendorStatus"), is(equalTo(expectedVendorStatus)));
//        assertThat("Status Title", newCallSearch.getSearchResultStatus().get("cardStatusTitle"), is(equalTo(expectedStatusTitle)));
//
//    }
//
//    @DataProvider(name = "vendors")
//    private Object[][] vendors() {
//        return new Object[][]{
//                {"Boost", "51001512257718", "Other", "LC: PIN is returned. A PIN in Locked status can be reactivated and sold to another customer."},
//                {"Virgin", "1861734012119113", "Active", "16301: PIN Card: PIN is already activated."},
//        };
//    }
//
//}
