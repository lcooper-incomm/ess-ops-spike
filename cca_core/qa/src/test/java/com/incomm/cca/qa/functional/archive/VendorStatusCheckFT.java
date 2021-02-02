//package com.incomm.cca.qa.functional;
//
//import org.testng.annotations.Test;
//
//import static org.hamcrest.MatcherAssert.assertThat;
//import static org.hamcrest.Matchers.equalTo;
//import static org.hamcrest.Matchers.is;
//
///**
// * User: mgalloway
// * Date: 8/6/13
// * Time: 1:10 PM
// */
//public class VendorStatusCheckFT extends BaseFT {
//
//    final private String ASSIGNMENT_ID = "4a8b3bfc-5367-4c7b-a977-a2110103939f";
//    // This comes from Enterprise Tester's Execution Set URI for the given automated test class
//
//    @Test(groups = {"version-2.2.0", "new_call", "search", "status"}, description = "No results for vendor status search",  enabled = false)
//    public void testNewCallStatusSearchNoResults() {
//
//        String pin = "123456";
//        String platform = "Boost";
//
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.toggleStatusSearch();
//        newCallSearch.selectSearchPlatform(platform);
//        newCallSearch.search("status", pin);
//        assertThat("Vendor Status Results Message", newCallSearch.getStatusSearchNoResultsMessage(), is(equalTo(String.format(newCallSearch.NO_RESULTS_STATUS_MESSAGE, pin, platform))));
//
//    }
//
//    @Test(groups = {"version-2.2.0", "new_call", "search", "status"}, description = "Vendor status search form empty value",  enabled = false)
//    public void testNewCallStatusSearchEmpty() {
//
//        String pin = "";
//        String platform = "Boost";
//
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.toggleStatusSearch();
//        newCallSearch.selectSearchPlatform(platform);
//        newCallSearch.search("status", pin);
////        assertThat("Notification message", alerts.getNotificationText(), is(equalTo("Please provide the PIN for a status search")));
//
//    }
//
//}
