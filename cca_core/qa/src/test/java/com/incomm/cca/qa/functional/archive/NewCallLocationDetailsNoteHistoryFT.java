//package com.incomm.cca.qa.functional;
//
//import org.openqa.selenium.WebElement;
//import org.testng.annotations.Test;
//
//import java.sql.SQLException;
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
// * Date: 5/22/13
// * Time: 4:13 PM
// */
//public class NewCallLocationDetailsNoteHistoryFT extends BaseFT {
//
//    final private String ASSIGNMENT_ID = "efe3baef-fbc6-4606-a40c-a20a00d475b6";
//    // This comes from Enterprise Tester's Execution Set URI for the given automated test class
//
//    @Test(groups = {"version-2.0.0", "new_call", "location", "details", "note_history"},  enabled = false)
//    public void testNewCallLocationDetailsNoteHistorySortOrderDesc() throws SQLException, ParseException {
//
//        String locationName = "0075 - Holiday";
//
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.toggleLocationSearch();
//        newCallSearch.search("Name", locationName);
//        newCallSearch.autoAddTransitionWait();
//        SimpleDateFormat sdf = new SimpleDateFormat("MMM d, y h:mm:ss a z");
//        List<WebElement> calls = newCallLocationDetails.getSelectedLocationNoteHistory();
//        Date previous = null;
//        for(WebElement call : calls) {
//
//            String id = call.getAttribute("id");
//            Integer i = Integer.parseInt(id.substring(id.length() - 1));
//            Map<String, WebElement> currentElement = newCallLocationDetails.getSelectedLocationNoteHistoryItem(i);
//            Date currentDate =  sdf.parse(currentElement.get("created").getText());
//            if(i.equals(calls.size() - 1)) {
//                assertThat("Default sort is Desc (last item is older than the previous): [History Item: " + i + "]", currentDate, is(lessThanOrEqualTo(previous)));
//            }
//            else {
//                Map<String, WebElement> nextElement = newCallLocationDetails.getSelectedLocationNoteHistoryItem(i + 1);
//                Date nextDate =  sdf.parse(nextElement.get("created").getText());
//                assertThat("Default sort is Desc (current item is newer than the next): [History Item: " + i + "]", currentDate, is(greaterThanOrEqualTo(nextDate)));
//            }
//            previous = currentDate;
//
//        }
//
//    }
//
//    @Test(groups = {"version-2.0.0", "new_call", "location", "details", "note_history"},  enabled = false)
//    public void testNewCallLocationDetailsNoteHistoryCommentMore() throws SQLException {
//
//        String locationName = "holiday";
//
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.toggleLocationSearch();
//        newCallSearch.search("Name", locationName);
//        Map<String, WebElement> selectedLocation = newCallSearch.getSingleSearchResultLocation(8);
//        selectedLocation.get("add").click();
//        newCallSearch.autoAddTransitionWait();
//        List<WebElement> notes = newCallLocationDetails.getSelectedLocationNoteHistory();
//        for(WebElement note : notes) {
//            String id = note.getAttribute("id");
//            Integer i = Integer.parseInt(id.substring(id.length() - 1));
//            Map<String, WebElement> element = newCallLocationDetails.getSelectedLocationNoteHistoryItem(i);
//            if(element.get("note").getText().length() >= 43) {
//                assertThat("LegacyNote History Item [" + i + "]: moreLess", element.get("moreLess").isDisplayed(), is(true));
//                // Click for more
//                newCallLocationDetails.clickNoteMoreLess(i);
//                assertThat("LegacyNote Expanded", newCallLocationDetails.isLocationNoteExpanded(), is(true));
//                break;
//            }
//
//        }
//
//    }
//
//    @Test(groups = {"version-2.0.0", "new_call", "location", "details", "note_history"},  enabled = false)
//    public void testNewCallLocationDetailsNoteHistoryCommentLess() throws SQLException {
//
//        String locationName = "holiday";
//
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.toggleLocationSearch();
//        newCallSearch.search("Name", locationName);
//        Map<String, WebElement> selectedLocation = newCallSearch.getSingleSearchResultLocation(8);
//        selectedLocation.get("add").click();
//        newCallSearch.autoAddTransitionWait();
//        List<WebElement> calls = newCallLocationDetails.getSelectedLocationNoteHistory();
//        for(WebElement call : calls) {
//            String id = call.getAttribute("id");
//            Integer i = Integer.parseInt(id.substring(id.length() - 1));
//            Map<String, WebElement> element = newCallLocationDetails.getSelectedLocationNoteHistoryItem(i);
//            if(element.get("note").getText().length() >= 43) {
//                assertThat("LegacyNote History Item [" + i + "]: moreLess", element.get("moreLess").isDisplayed(), is(true));
//                // Click for more
//                newCallLocationDetails.clickNoteMoreLess(i);
//                // Click for less
//                newCallLocationDetails.clickNoteMoreLess(i);
//                assertThat("LegacyNote Expanded", newCallLocationDetails.isLocationNoteExpanded(), is(false));
//            }
//
//        }
//
//    }
//
//
//
//}
