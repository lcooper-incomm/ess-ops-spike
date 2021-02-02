//package com.incomm.cca.qa.acceptance;
//
//import com.incomm.cca.qa.functional.BaseFT;
//import org.openqa.selenium.WebElement;
//import org.testng.annotations.Test;
//
//import java.sql.SQLException;
//import java.util.List;
//import java.util.Map;
//
//import static org.hamcrest.MatcherAssert.assertThat;
//import static org.hamcrest.Matchers.*;
//
///**
// * New Call Location Details LegacyNote History Acceptance Tests
// * User: mgalloway
// * Date: 7/25/13
// * Time: 9:21 AM
// */
//public class NewCallLocationDetailsNoteHistoryAT extends BaseFT {
//
//    final private String ASSIGNMENT_ID = "cea3d929-aa5d-4891-b02d-a20a00cb6d84";
//    // This comes from Enterprise Tester's Execution Set URI for the given automated test class
//
//    @Test(groups = {"version-2.0.0", "in-progress", "new_call", "location", "details", "note_history"},  enabled = false)
//    public void testNewCallLocationDetailsNoteHistoryCount() throws SQLException {
//
//        String locationName = "0075 - Holiday";
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.toggleLocationSearch();
//        newCallSearch.search("Name", locationName);
//        newCallSearch.autoAddTransitionWait();
//        List<WebElement> notes = newCallLocationDetails.getSelectedLocationNoteHistory();
//        assertThat("LegacyNote History Title", newCallLocationDetails.getSelectedLocationNoteHistoryTitle(), containsString("LegacyNote History"));
//        assertThat("LegacyNote History Total", Integer.parseInt(newCallLocationDetails.getSelectedLocationNoteHistoryTotal().replace("(","").replace(")","")), is(greaterThanOrEqualTo(74)));
//        assertThat("LegacyNote History Actual (1st page) Total", notes.size(), is(equalTo(25)));
//
//    }
//
//    @Test(groups = {"version-2.0.0", "in-progress", "new_call", "location", "details", "note_history"},  enabled = false)
//    public void testNewCallLocationDetailsNoteHistoryFields() throws SQLException {
//
//        String locationName = "TEST QUIK";
//
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.toggleLocationSearch();
//        newCallSearch.search("Name", locationName);
//        newCallSearch.autoAddTransitionWait();
//        List<WebElement> notes = newCallLocationDetails.getSelectedLocationNoteHistory();
//        Map<String, WebElement> noteUnderTest = null;
//        String id = null;
//        for(WebElement note : notes) {
//            id = note.getAttribute("id");
//            Integer i = Integer.parseInt(id.substring(id.length() - 1));
//            noteUnderTest = newCallLocationDetails.getSelectedLocationNoteHistoryItem(i);
//            if(noteUnderTest.get("created").getText().equals("Feb 10, 2009 4:36:14 PM EST")) break;
//        }
//        assertThat("LegacyNote History Item [" + id + "]: Created", noteUnderTest.get("created").getText(), is(equalTo("Feb 10, 2009 4:36:14 PM EST")));
//        assertThat("LegacyNote History Item [" + id + "]: agentName", noteUnderTest.get("agentName").getText(), is(equalTo("iTracTest")));
//        assertThat("LegacyNote History Item [" + id + "]: note", noteUnderTest.get("note").getText(), is(equalTo("Select * from;--alaliatest")));
//
//    }
//
//    @Test(groups = {"version-2.0.0", "in-progress", "new_call", "location", "details", "note_history"},  enabled = false)
//    public void testNewCallLocationDetailsNoteHistoryNoHistory() {
//
//        String locationName = "7-11";
//
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.toggleLocationSearch();
//        newCallSearch.search("Name", locationName);
//        Map<String, WebElement> selectedLocation = newCallSearch.getSingleSearchResultLocation(2);
//        selectedLocation.get("add").click();
//        newCallSearch.autoAddTransitionWait();
//        assertThat("No LegacyNote History Total Displayed", newCallLocationDetails.locationNoteHistorySectionTotalHistories.isDisplayed(), is(false));
//        assertThat("No LegacyNote History Message", newCallLocationDetails.getSelectedLocationNoteHistoryNoMessage(), is(equalTo(newCallLocationDetails.LOCATION_NOTE_HISTORY_NO_ITEMS_MESSAGE)));
//
//    }
//
//    @Test(groups = {"version-2.0.0", "in-progress", "new_call", "location", "details", "note_history"}, description = "Upon wrapup of call with location, the note is saved in MM and viewable upon next location view",  enabled = false)
//    public void testNewCallLocationDetailsCreateMMNoteOnWrapup() throws SQLException {
//
//        String locationName = "7-11 Test8";
//        String locationId = "21005548";
//        String callerName = "Superman_test";
//        String callbackNumber = "801-743-4066";
//        String calledFromAniNumber = "801-745-2856";
//        String numberCalledDnis = "800-123-4567";
//        String queue ="Wireless";
//        String min = "801-234-4567";
//        String notes = "Testing Location LegacyNote Creation";
//        nav.signin();
//        nav.navigateToSearch();
////        String callId = callDetails.getNewCallId();
//        newCallSearch.toggleLocationSearch();
//        newCallSearch.search("Name", locationName);
//        newCallSearch.autoAddTransitionWait();
//        Integer currentNoteTotal;
//        if(newCallLocationDetails.getSelectedLocationNoteHistoryTotal().equals("")) {
//            currentNoteTotal = 0;
//        }
//        else {
//            currentNoteTotal = Integer.parseInt(newCallLocationDetails.getSelectedLocationNoteHistoryTotal().replace(")", "").replace("(", ""));
//        }
////        callDetails.createNewJaxCall(callerName, callbackNumber, calledFromAniNumber, numberCalledDnis, queue, min, notes, true);
//        nav.navigateToSearch();
//        newCallSearch.toggleLocationSearch();
//        newCallSearch.search("Name", locationName);
//        newCallSearch.autoAddTransitionWait();
//        Integer updatedNoteTotal;
//        if(newCallLocationDetails.getSelectedLocationNoteHistoryTotal().equals("")) {
//            updatedNoteTotal = 0;
//        }
//        else {
//            updatedNoteTotal = Integer.parseInt(newCallLocationDetails.getSelectedLocationNoteHistoryTotal().replace(")", "").replace("(", ""));
//        }
//        assertThat("LegacyNote History Total was updated by one", updatedNoteTotal, is(equalTo(currentNoteTotal + 1)));
////        String noteId = transactionUtil.getCall(callId).get("note_id").toString();
////        assertThat("LegacyNote is in CCA DB", dataEncryptor.decrypt(transactionUtil.getNote(noteId).get("encrypted_note").toString()), is(equalTo(notes)));
//        String locationNoteId = transactionUtil.getLatestLocationLocationNote(locationId).get("location_note_id").toString();
//        assertThat("LegacyNote is associated with Location ID", transactionUtil.getLocationLocationNote(locationNoteId).get("location_id").toString(), is(equalTo(locationId)));
//        assertThat("APLS LegacyNote ID is stored with CCA LegacyNote ID", transactionUtil.getLocationNote(locationNoteId).get("apls_id").toString(), is(notNullValue()));
//
//    }
//
//}
