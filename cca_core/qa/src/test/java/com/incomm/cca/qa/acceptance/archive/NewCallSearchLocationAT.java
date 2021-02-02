//package com.incomm.cca.qa.acceptance;
//
//import com.incomm.cca.qa.functional.BaseFT;
//import org.openqa.selenium.By;
//import org.openqa.selenium.WebElement;
//import org.openqa.selenium.support.ui.ExpectedConditions;
//import org.testng.annotations.Test;
//
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Map;
//
//import static org.hamcrest.MatcherAssert.assertThat;
//import static org.hamcrest.Matchers.*;
//
///**
// * New Call Search Location Acceptance Tests
// * User: mgalloway
// * Date: 7/25/13
// * Time: 9:31 AM
// */
//public class NewCallSearchLocationAT extends BaseFT {
//
//    final private String ASSIGNMENT_ID = "387af832-f745-40fe-916a-a20a00cdc263";
//    // This comes from Enterprise Tester's Execution Set URI for the given automated test class
//
//    @Test(groups = {"version-2.2.0", "in-progress", "new_call", "product", "search"},  enabled = false)
//    public void testNewCallCardSearchLocationTypeOptions() {
//
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.toggleLocationSearch();
//        // Get all the search type options
//        List<WebElement> actual = newCallSearch.getSearchLocationTypeOptions();
//        // Get all the options text
//        List<String> options = new ArrayList<>();
//        for(WebElement ele : actual) {
//            options.add(ele.getText());
//        }
//        // Set all the expected options (these are not stored in the database)
//        List<String> expectedStrings = new ArrayList<>();
//        expectedStrings.add("Name");
//        expectedStrings.add("Phone");
//        expectedStrings.add("Terminal");
//        // Validate each expected option is available
//        assertThat("Search Type: Size", actual.size(), is(equalTo(3)));
//        for(String expected : expectedStrings) {
//            assertThat("Search Type: " + expected, options.contains(expected), is(true));
//        }
//
//    }
//
//    @Test(groups = {"version-2.0.0", "in-progress", "new_call", "search", "location", "multiple_results"}, description = "replace existing location added to call with another from results",  enabled = false)
//    public void testNewCallLocationSearchResultReplace() {
//
//        String locationName = "7-11";
//        String firstLocationId = "21005485";
//        String secondLocationId = "21005550";
//
//        nav.signin();
//        nav.navigateToSearch();
////        String callId = callDetails.getNewCallId();
////        Map<String, Object> call = transactionUtil.getCall(callId);
////        String callDetailId = call.get("call_detail_id").toString();
//        newCallSearch.toggleLocationSearch();
//        newCallSearch.search("Name", locationName); // returns two results
//        Map<String, WebElement> firstLocationResult = newCallSearch.getSingleSearchResultLocation(0);
//        Map<String, WebElement> secondLocationResult = newCallSearch.getSingleSearchResultLocation(1);
//
//        // Add first location to call
//        firstLocationResult.get("add").click();
//        assertThat("1st Location is displayed in Location Details", newCallLocationDetails.getSelectedLocationDescription(), is(equalTo(firstLocationResult.get("description").getText())));
////        assertThat("1st Location is associated with call in database", transactionUtil.getCallDetailsById(callDetailId).get("location_id").toString(), is(equalTo(firstLocationId)));
//        newCallSearch.toggleSearch();
//        assertThat("1st Location 'Add to Call' button is removed", firstLocationResult.get("add").getAttribute("class").contains("invisible"), is(true));
//
//        // Add second location to call
//        secondLocationResult.get("add").click();
//
//        // Verify second location is now shown and added to call
//        assertThat("2nd Location is displayed in Location Details", newCallLocationDetails.getSelectedLocationDescription(), is(equalTo(secondLocationResult.get("description").getText())));
//        newCallSearch.toggleSearch();
//        assertThat("2nd Location 'Add to Call' button is removed", secondLocationResult.get("add").getAttribute("class").contains("invisible"), is(true));
////        assertThat("2nd Location is associated with call in database", transactionUtil.getCallDetailsById(callDetailId).get("location_id").toString(), is(equalTo(secondLocationId)));
//
//    }
//
//    @Test(groups = {"version-2.0.0", "in-progress", "new_call", "search", "location", "multiple_results"}, description = "Add a location from the results to the call",  enabled = false)
//    public void testNewCallLocationSearchResultAddToCall() {
//
//        String locationName = "7-11";
//        String locationId = "21005485";
//
//        nav.signin();
//        nav.navigateToSearch();
////        String callId = callDetails.getNewCallId();
////        Map<String, Object> call = transactionUtil.getCall(callId);
////        String callDetailId = call.get("call_detail_id").toString();
//        newCallSearch.toggleLocationSearch();
//        newCallSearch.search("Name", locationName);
//        Map<String, WebElement> locationResult = newCallSearch.getSingleSearchResultLocation(0);
//
//        // Add location to call
//        locationResult.get("add").click();
//        assertThat("Location is displayed in Location Details", newCallLocationDetails.getSelectedLocationDescription(), is(equalTo(locationResult.get("description").getText())));
////        assertThat("1st Location is associated with call in database", transactionUtil.getCallDetailsById(callDetailId).get("location_id").toString(), is(equalTo(locationId)));
//
//    }
//
//    @Test(groups = {"version-2.0.0", "in-progress", "new_call", "search", "location", "multiple_results"},  enabled = false)
//    public void testNewCallLocationSearchMultipleResult() {
//
//        String locationName = "bestbuy";
//
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.toggleLocationSearch();
//        newCallSearch.search("Name", locationName);
//        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id(newCallSearch.SEARCH_LOCATION_RESULTS_FOR)));
//        List<WebElement> cards = newCallSearch.getSearchResultCards();
//        assertThat("Expected total pages", newCallSearch.getCurrentLocationSearchResultPage(), is(equalTo("Page 1 of 16")));
//        assertThat("Expected default results per page are shown", newCallSearch.getSearchResultCount(), is(equalTo(25)));
//        assertThat("Result count displayed", newCallSearch.getSearchLocationResultsFor(), is(equalTo(String.format(newCallSearch.RESULTS_MESSAGE, "385", "location", locationName))));
//        for(WebElement card : cards) {
//
//            String id = card.getAttribute("id");
//            Integer i = Integer.parseInt(id.substring(id.length() - 1));
//            Map<String, WebElement> currentCard = newCallSearch.getSingleSearchResultLocation(i);
//            assertThat("All expected location cards have 'Add to Call' button", currentCard.get("add").isDisplayed(), is(true));
//
//        }
//
//    }
//
//    @Test(groups = {"version-2.0.0", "in-progress", "new_call", "search", "location"}, description = "Validate Terminal Number search returns expected results",  enabled = false)
//    public void testNewCallLocationSearchTerminalNumber() {
//
//        String terminalNumber = "BBYCH00001001";
//
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.toggleLocationSearch();
//        newCallSearch.search("Terminal", terminalNumber);
////        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id(newCallSearch.SEARCH_LOCATION_RESULTS_FOR)));
////        assertThat("Result count", newCallSearch.getSearchResultCount(), is(equalTo(2)));
////        Map<String, WebElement> location = newCallSearch.getSingleSearchResultLocation(0);
////        location.get("add").click();
//        newCallSearch.autoAddTransitionWait();
//        assertThat("Result are expected: location phone", newCallLocationDetails.getSelectedLocationPhone(), is(equalTo("217-748-3647")));
//
//        List<String> terminals = new ArrayList<>();
//        for(WebElement terminalElement : newCallLocationDetails.getSelectedLocationTerminals()) {
//            terminals.add(terminalElement.getText());
//        }
//        assertThat("Result are expected: terminal number searched is listed", terminals.contains(terminalNumber), is(true));
//
//    }
//
//    @Test(groups = {"version-2.0.0", "in-progress", "new_call", "search", "location"}, description = "Validate phone search returns expected results",  enabled = false)
//    public void testNewCallLocationSearchPhone() {
//
//        String locationPhone = "217-748-3647";
//
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.toggleLocationSearch();
//        newCallSearch.search("Phone", locationPhone);
//        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id(newCallSearch.SEARCH_LOCATION_RESULTS_FOR)));
//        assertThat("Result count", newCallSearch.getSearchResultCount(), is(equalTo(2)));
//        assertThat("Result message", newCallSearch.getSearchLocationResultsFor(), is(equalTo(String.format(newCallSearch.RESULTS_MESSAGE, 2, "location", locationPhone))));
//        assertThat("Result are expected", newCallSearch.getSingleSearchResultLocation(0).get("phone").getText(), is(equalTo(locationPhone)));
//        assertThat("Result are expected", newCallSearch.getSingleSearchResultLocation(1).get("phone").getText(), is(equalTo(locationPhone)));
//
//    }
//
//    @Test(groups = {"version-2.0.0", "in-progress", "new_call", "search", "location"}, description = "",  enabled = false)
//    public void testNewCallLocationSearchName() {
//
//        String locationName = "06614Murphy USA";
//
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.toggleLocationSearch();
//        newCallSearch.search("Name", locationName);
//        newCallSearch.autoAddTransitionWait();
//        assertThat("Result are expected", newCallLocationDetails.getSelectedLocationName(), is(equalTo(locationName)));
//        newCallSearch.toggleSearch();
//        assertThat("Result count", newCallSearch.getSearchResultCount(), is(equalTo(1)));
//        assertThat("Result count displayed", newCallSearch.getSearchLocationResultsFor(), is(equalTo(String.format(newCallSearch.RESULTS_MESSAGE, newCallSearch.getSearchResultCount(), "location", locationName))));
//        assertThat("Result message", newCallSearch.getSearchLocationResultsFor(), containsString(locationName));
//        assertThat("Result contains location", newCallSearch.getSingleSearchResultLocation(0).get("name").getText(), is(equalTo(locationName)));
//
//    }
//
//    @Test(groups = {"version-2.0.0", "in-progress", "new_call", "search", "location"}, description = "",  enabled = false)
//    public void testNewCallLocationSearchSingleResultAutoDisplay() {
//
//        String locationName = "06614Murphy USA";
//
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.toggleLocationSearch();
//        newCallSearch.search("Name", locationName);
//        newCallSearch.autoAddTransitionWait();
//        assertThat("Search is collapsed", newCallSearch.isSearchDisplayed(), is(false));
//        assertThat("Location Details are displayed", newCallSearch.isLocationDisplayed(), is(true));
//
//    }
//
//    @Test(groups = {"version-2.0.0", "in-progress", "new_call", "search", "location"}, description = "",  enabled = false)
//    public void testNewCallLocationSearchResultSingleResultAutoAdd() {
//
//        String locationName = "06614Murphy USA";
//        String locationId = "531856";
//
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.toggleLocationSearch();
//        newCallSearch.search("Name", locationName);
//        newCallSearch.autoAddTransitionWait();
////        String callId = callDetails.getNewCallId();
////        Map<String, Object> call = transactionUtil.getCall(callId);
////        String callDetailId = call.get("call_detail_id").toString();
////        assertThat("Call Details has Location Associated", transactionUtil.getCallDetailsById(callDetailId).get("location_id").toString(), is(equalTo(locationId)));
//
//    }
//
//    @Test(groups = {"version-2.0.0", "in-progress", "new_call", "search", "location"}, description = "",  enabled = false)
//    public void testNewCallLocationSearchResultSummary() {
//
//        String locationPhone = "404-756-3817";
//
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.toggleLocationSearch();
//        newCallSearch.search("Phone", locationPhone);
//        newCallSearch.autoAddTransitionWait();
//        newCallSearch.toggleSearch();
//        Map<String, WebElement> location = newCallSearch.getSingleSearchResultLocation(0);
//        assertThat("Name", location.get("name").getText(), is(equalTo("Atlanta Tech - Independent")));
//        assertThat("Description", location.get("description").getText(), is(equalTo("")));
//        assertThat("Phone", location.get("phone").getText(), is(equalTo("404-756-3817")));
//        assertThat("Fax", location.get("fax").getText(), is(equalTo("404-756-5459")));
//
//    }
//
//}
