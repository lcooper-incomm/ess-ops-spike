//package com.incomm.cca.qa.acceptance;
//
//import com.incomm.cca.qa.functional.BaseFT;
//import org.testng.annotations.Test;
//
//import static org.hamcrest.MatcherAssert.assertThat;
//import static org.hamcrest.Matchers.equalTo;
//import static org.hamcrest.Matchers.is;
//
///**
//* New Call Product Details Note History Acceptance Tests
//* User: mgalloway
//* Date: 7/25/13
//* Time: 9:26 AM
//* To change this template use File | Settings | File Templates.
//*/
//@Test(groups = {"skip"})
//public class NewCallProductDetailsNoteHistoryAT extends BaseFT {
//
//    final private String ASSIGNMENT_ID = "0569325e-3003-4096-89c5-a20a00cd3684";
//    // This comes from Enterprise Tester's Execution Set URI for the given automated test class
//
//    @Test(groups = {"version-2.0.0", "in-progress", "new_call", "product", "details", "note_history"},  enabled = false)
//    public void testNewCallProductDetailsNoteHistoryFields() throws SQLException, ParseException {
//
//        String pin = "117821408569869";
//        String serialNumber = "3281606392";
//
//        // Create Test Data
//        List<Call> expected = testDataCallDetails.create(10, serialNumber, null, "NOR");
//        // reorder expected to be LIFO
//        List<Call> expectedReordered = new ArrayList<>();
//        Integer size = expected.size();
//        for(int i = 1; i <= size; i++) {
//            expectedReordered.add(expected.get(size - i));
//        }
//        SimpleDateFormat sdf = new SimpleDateFormat("MMM d, y h:mm a z");
//        SimpleDateFormat sdf2 = new SimpleDateFormat("MMM d, y h:mm:ss a z");
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.search("PIN", pin);
//        List<WebElement> calls = newCallProductDetails.getSelectedCardNoteHistory();
//        for(WebElement call : calls) {
//            String id = call.getAttribute("id");
//            Integer i = Integer.parseInt(id.substring(id.length() - 1));
//            Map<String, WebElement> element = newCallProductDetails.getSelectedCardNoteHistoryItem(i);
//            assertThat("Note History Item [" + i + "]: Created", sdf.format(sdf2.parse(element.get("created").getText())), is(equalTo(sdf.format(expectedReordered.get(i).getNote().getCreated()))));
////            assertThat("Note History Item [" + i + "]: agentName", element.get("agentName").getText(), is(equalTo(expectedReordered.get(i).getAgentName())));
//            for(Note note : expectedReordered.get(i).getCallDetail().getProductTransactionHistory().getNote()) {
//                assertThat("Note History Item [" + i + "]: note", element.get("note").getText(), is(equalTo(note.getNote())));
//            }
//            assertThat("Note History Item [" + i + "]: moreLess", element.get("moreLess").isDisplayed(), is(true));
//        }
//
//    }
//
//    @Test(groups = {"version-2.0.0", "in-progress", "new_call", "product", "details", "note_history"},  enabled = false)
//    public void testNewCallProductDetailsNoteHistoryCommentMore() throws SQLException {
//
//        String pin = "117821408569869";
//        String serialNumber = "3281606392";
//
//        // Create Test Data
//        testDataCallDetails.create(10, serialNumber, null, "NOR");
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.search("PIN", pin);
//        List<WebElement> calls = newCallProductDetails.getSelectedCardNoteHistory();
//        for(WebElement call : calls) {
//            String id = call.getAttribute("id");
//            Integer i = Integer.parseInt(id.substring(id.length() - 1));
//            Map<String, WebElement> element = newCallProductDetails.getSelectedCardNoteHistoryItem(i);
//            assertThat("Note History Item [" + i + "]: moreLess", element.get("moreLess").isDisplayed(), is(true));
//            // Click for more
//            newCallProductDetails.clickNoteMoreLess(i);
//            assertThat("Note Expanded", newCallProductDetails.isCardNoteExpanded(), is(true));
//
//        }
//
//    }
//
//    @Test(groups = {"version-2.0.0", "in-progress", "new_call", "product", "details", "note_history"},  enabled = false)
//    public void testNewCallProductDetailsNoteHistoryCommentLess() throws SQLException {
//
//        String pin = "117821408569869";
//        String serialNumber = "3281606392";
//
//        // Create Test Data
//        testDataCallDetails.create(10, serialNumber, null, "NOR");
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.search("PIN", pin);
//        List<WebElement> calls = newCallProductDetails.getSelectedCardNoteHistory();
//        for(WebElement call : calls) {
//            String id = call.getAttribute("id");
//            Integer i = Integer.parseInt(id.substring(id.length() - 1));
//            Map<String, WebElement> element = newCallProductDetails.getSelectedCardNoteHistoryItem(i);
//            assertThat("Note History Item [" + i + "]: moreLess", element.get("moreLess").isDisplayed(), is(true));
//            // Click for more
//            newCallProductDetails.clickNoteMoreLess(i);
//            // Click for less
//            newCallProductDetails.clickNoteMoreLess(i);
//            assertThat("Note Expanded", newCallProductDetails.isCardNoteExpanded(), is(false));
//
//        }
//
//    }
//
//    @Test(groups = {"version-2.0.0", "in-progress", "new_call", "product", "details", "note_history"},  enabled = false)
//    public void testNewCallProductDetailsNoteHistoryNoHistory() {
//
//        String pin = "117821408569869";
//
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.search("PIN", pin);
//        newCallSearch.autoAddTransitionWait();
//        assertThat("No Note History Total", newCallProductDetails.getSelectedCardNoteHistoryTotal(), is(equalTo("")));
//        assertThat("No Note History 0 Total Displayed", newCallProductDetails.cardNoteHistorySectionTitleHistories.isDisplayed(), is(false));
//        assertThat("No Note History Displayed", newCallProductDetails.cardNoteHistoryNoHistory.isDisplayed(), is(true));
//        assertThat("No Note History Message", newCallProductDetails.getSelectedCardNoteHistoryNoMessage(), is(equalTo(newCallProductDetails.CARD_NOTE_HISTORY_NO_ITEMS_MESSAGE)));
//
//    }
//
//}
