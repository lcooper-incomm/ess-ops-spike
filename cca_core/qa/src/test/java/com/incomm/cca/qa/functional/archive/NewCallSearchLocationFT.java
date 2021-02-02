//package com.incomm.cca.qa.functional;
//
//import org.openqa.selenium.By;
//import org.openqa.selenium.WebElement;
//import org.openqa.selenium.support.ui.ExpectedConditions;
//import org.testng.annotations.Test;
//
//import java.util.Map;
//
//import static org.hamcrest.MatcherAssert.assertThat;
//import static org.hamcrest.Matchers.equalTo;
//import static org.hamcrest.Matchers.is;
//
///**
// * User: mgalloway
// * Date: 5/15/13
// * Time: 11:00 AM
// */
//public class NewCallSearchLocationFT extends BaseFT {
//
//    final private String ASSIGNMENT_ID = "05d79ce6-d474-44a0-afe6-a20a00d56f2a";
//    // This comes from Enterprise Tester's Execution Set URI for the given automated test class
//
//    @Test(groups = {"version-2.0.0", "new_call", "search", "location", "multiple_results"}, description = "The 'Add to Call' button is disabled with new label of 'In Call'",  enabled = false)
//    public void testNewCallLocationSearchResultInCall() {
//
//        String locationName = "7-11";
//        String locationId = "21005550";
//
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.toggleLocationSearch();
//        newCallSearch.search("Name", locationName);
//        Map<String, WebElement> locationResult = newCallSearch.getSingleSearchResultLocation(0);
//
//        // Add location to call
//        locationResult.get("add").click();
//        assertThat("Location is displayed in Location Details", newCallLocationDetails.getSelectedLocationDescription(), is(equalTo(locationResult.get("description").getText())));
//        newCallSearch.toggleSearch();
//        assertThat("Location 'Add to Call' button is removed", locationResult.get("add").getAttribute("class").contains("invisible"), is(true));
//
//    }
//
//    @Test(groups = {"version-2.0.0", "new_call", "search", "location"}, description = "Confirm the no results message",  enabled = false)
//    public void testNewCallLocationSearchNoResults() {
//
//        String locationName = "noresults";
//
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.toggleLocationSearch();
//        newCallSearch.search("Name", locationName);
//        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id(newCallSearch.SEARCH_LOCATION_RESULTS_MESSAGE_NO_RESULTS)));
//        assertThat ( newCallSearch.searchLocationResultsMessageNoResults.getText(), is(equalTo(String.format(newCallSearch.NO_RESULTS_MESSAGE, "location", locationName))));
//
//    }
//
//    @Test(groups = {"version-2.0.0", "new_call", "search", "location"}, description = "",  enabled = false)
//    public void testNewCallLocationSearchResultRetained() {
//
//        String locationPhone = "404-756-3817";
//
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.toggleLocationSearch();
//        newCallSearch.search("Phone", locationPhone);
//        newCallSearch.autoAddTransitionWait();
//        newCallSearch.toggleSearch();
//        assertThat("Search Results Message Retained", newCallSearch.getSearchLocationResultsFor(), is(equalTo(String.format(newCallSearch.RESULTS_MESSAGE, newCallSearch.getSearchResultCount(), "location", locationPhone))));
//        assertThat("Search Results Retained", newCallSearch.getSearchResultCount(), is(1));
//
//    }
//
//}
