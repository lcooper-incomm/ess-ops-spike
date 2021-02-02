//package com.incomm.cca.qa.acceptance;
//
//import com.incomm.cca.qa.functional.BaseFT;
//import org.openqa.selenium.WebElement;
//import org.testng.annotations.Test;
//
//import java.util.ArrayList;
//import java.util.Arrays;
//import java.util.List;
//import java.util.Map;
//
//import static org.hamcrest.MatcherAssert.assertThat;
//import static org.hamcrest.Matchers.*;
//
///**
// * New Call Location Details Acceptance Tests
// * User: mgalloway
// * Date: 7/25/13
// * Time: 9:20 AM
// */
//public class NewCallLocationDetailsAT extends BaseFT {
//
//    final private String ASSIGNMENT_ID = null;
//    // This comes from Enterprise Tester's Execution Set URI for the given automated test class
//
//    @Test(groups = {"version-2.0.0", "in-progress", "new_call", "search", "location-search", "multiple_results"}, description = "Location Details Validation",  enabled = false)
//    public void testNewCallLocationDetailsFields() {
//
//        String locationName = "7704972346SkytalkCommunications";
//
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.toggleLocationSearch();
//        newCallSearch.search("Name", locationName);
//        newCallSearch.autoAddTransitionWait();
//
//        assertThat("Location Name", newCallLocationDetails.getSelectedLocationName(), is(equalTo(locationName)));
//        assertThat("Location Address Line 1", newCallLocationDetails.getSelectedLocationAddressLine1(), is(equalTo("3750 Venture Dr")));
//        assertThat("Location Address Line 2", newCallLocationDetails.getSelectedLocationAddressLine2(), is(equalTo("")));
//        assertThat("Location City", newCallLocationDetails.getSelectedLocationAddressCity(), is(equalTo("Duluth,")));
//        assertThat("Location State", newCallLocationDetails.getSelectedLocationAddressState(), is(equalTo("GA")));
//        assertThat("Location Postal Code", newCallLocationDetails.getSelectedLocationAddressPostalCode(), is(equalTo("30096")));
//        assertThat("Location Country", newCallLocationDetails.getSelectedLocationAddressCountry(), is(equalTo("")));
//        assertThat("Location Contact", newCallLocationDetails.getSelectedLocationContact(), is(equalTo("Richard Ahn")));
//        assertThat("Location Phone", newCallLocationDetails.getSelectedLocationPhone(), is(equalTo("770-497-2346")));
//        assertThat("Location Fax", newCallLocationDetails.getSelectedLocationFax(), is(equalTo("770-497-2347")));
//        assertThat("Location Email", newCallLocationDetails.getSelectedLocationEmail(), is(equalTo("1skytalk@bellsouth.net")));
//        assertThat("Location Description", newCallLocationDetails.getSelectedLocationDescription(), is(equalTo("")));
//        assertThat("Location Merchant ID", newCallLocationDetails.getSelectedLocationMerchantId(), is(equalTo("11624")));
//        assertThat("Location Merchant Name", newCallLocationDetails.getSelectedLocationMerchantName(), is(equalTo("7704972346 - Skytalk Communications")));
//        assertThat("Location Created", newCallLocationDetails.getSelectedLocationCreatedDate(), is(equalTo("May 15, 2009 9:06:12 AM EDT")));
//
//
//    }
//
//    @Test(groups = {"version-2.0.0", "in-progress", "new_call", "search", "location-search", "terminals"},  enabled = false)
//    public void testNewCallLocationDetailsTerminals() {
//
//        String locationName = "0075 - Holiday";
//        List<String> locationTerminals = new ArrayList<>(
//                Arrays.asList("AICA2602290", "HSSVFF710217146", "VFF710217146")
//        );
//
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.toggleLocationSearch();
//        newCallSearch.search("Name", locationName);
//        newCallSearch.autoAddTransitionWait();
//
//        assertThat("Location Name", newCallLocationDetails.getSelectedLocationName(), is(equalTo(locationName)));
//        List<WebElement> terminals = newCallLocationDetails.getSelectedLocationTerminals();
//        assertThat("terminal count", terminals.size(), is(equalTo(3)));
//        for(int i = 0; i < terminals.size(); i++) {
//
//            Map<String, String> terminalInfo = newCallLocationDetails.getSelectedLocationTerminalItem(i);
//            assertThat("terminal number", terminalInfo.get("terminalNumber"), is(equalTo(locationTerminals.get(i))));
//
//        }
//
//    }
//
//    @Test(groups = {"version-2.0.0", "in-progress", "new_call", "search", "location-search", "terminals"},  enabled = false)
//    public void testNewCallLocationDetailsNoTerminals() {
//
//        String locationName = "7-11 Test3";
//
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.toggleLocationSearch();
//        newCallSearch.search("Name", locationName);
//        newCallSearch.autoAddTransitionWait();
//
//        assertThat("Location Name", newCallLocationDetails.getSelectedLocationName(), is(equalTo(locationName)));
//        assertThat("No Terminal Message", newCallLocationDetails.getSelectedLocationNoTerminals(), is(equalTo(newCallLocationDetails.LOCATION_TERMINALS_NO_ITEMS_MESSAGE)));
//
//    }
//
//    @Test(groups = {"version-2.4.0", "in-progress", "new_call", "search", "location-search"},  enabled = false)
//    public void testNewCallLocationHierarchyWithoutParentMerchant() {
//
//        String locationName = "0075 - holiday";
//
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.toggleLocationSearch();
//        newCallSearch.search("Name", locationName);
//        newCallSearch.autoAddTransitionWait();
//        // Validate hierarchy values in location panel header
//        assertThat("location [" + locationName + "] Hierarchy", newCallSearch.getLocationHeadingText(), containsString("Location - 0075 - Holiday → Holiday Station Stores → West Entertainment"));
//
//    }
//
//    @Test(groups = {"version-2.4.0", "in-progress", "new_call", "search", "location-search"},  enabled = false)
//    public void testNewCallLocationHierarchyWithParentMerchant() {
//
//        String locationName = "J & J Foods - # 1467";
//
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.toggleLocationSearch();
//        newCallSearch.search("Name", locationName);
//        newCallSearch.autoAddTransitionWait();
//        // Validate hierarchy values in location panel header
//        assertThat("location [" + locationName + "] Hierarchy", newCallSearch.getLocationHeadingText(), containsString("Location - J & J Foods - # 1467 → J&J Foods → MDI → U.S. South"));
//
//    }
//
//}
