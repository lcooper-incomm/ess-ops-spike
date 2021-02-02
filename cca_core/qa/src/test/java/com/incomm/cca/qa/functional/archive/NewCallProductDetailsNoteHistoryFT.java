//package com.incomm.cca.qa.functional;
//
///**
// * User: mgalloway
// * Date: 4/17/13
// * Time: 3:10 PM
// */
//public class NewCallProductDetailsNoteHistoryFT extends BaseFT {
//
//    final private String ASSIGNMENT_ID = "25335b47-e35b-4e95-b7c9-a20a00d4da6c";
//    // This comes from Enterprise Tester's Execution Set URI for the given automated test class
//
//    @Test(groups = {"version-2.0.0", "new_call", "product", "details", "note_history"},  enabled = false)
//    public void testNewCallProductDetailsNoteHistoryCount() throws SQLException {
//
//        String pin = "117821408569869";
//        String serialNumber = "3281606392";
//
//        // Create Test Data
//        testDataCallDetails.create(10, serialNumber, null, "NOR");
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.search("PIN", pin);
//        newCallSearch.autoAddTransitionWait();
//        assertThat("Note History Title", newCallProductDetails.getSelectedCardNoteHistoryTitle(), containsString("Note History"));
//        assertThat("Note History Total", newCallProductDetails.getSelectedCardNoteHistoryTotal(), is(equalTo("(10)")));
//
//    }
//
//    @Test(groups = {"version-2.0.0", "new_call", "product", "details", "note_history"},  enabled = false)
//    public void testNewCallProductDetailsNoteHistorySortOrderDesc() throws SQLException, ParseException {
//
//        String pin = "117821408569869";
//        String serialNumber = "3281606392";
//
//        // Create Test Data
//        List<Call> expected = testDataCallDetails.create(10, serialNumber, null, "NOR");
//        // reorder expected to be LIFO
//        List<Call> expectedReordered = new ArrayList<>();
//        Integer size = expected.size();
//        for(int i = 1; i < size; i++) {
//            expectedReordered.add(expected.get(size - i));
//        }
//        SimpleDateFormat sdf = new SimpleDateFormat("MMM d, y h:mm:ss a z");
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.search("PIN", pin);
//        List<WebElement> calls = newCallProductDetails.getSelectedCardNoteHistory();
//        Date previous = null;
//        for(WebElement call : calls) {
//
//            String id = call.getAttribute("id");
//            Integer i = Integer.parseInt(id.substring(id.length() - 1));
//            Map<String, WebElement> currentElement = newCallProductDetails.getSelectedCardNoteHistoryItem(i);
//            Date currentDate =  sdf.parse(currentElement.get("created").getText());
//            if(i.equals(calls.size() - 1)) {
//                assertThat("Default sort is Desc (last item is older than the previous): [History Item: " + i + "]", currentDate, is(lessThan(previous)));
//            }
//            else {
//                Map<String, WebElement> nextElement = newCallProductDetails.getSelectedCardNoteHistoryItem(i + 1);
//                Date nextDate =  sdf.parse(nextElement.get("created").getText());
//                assertThat("Default sort is Desc (current item is newer than the next): [History Item: " + i + "]", currentDate, is(greaterThan(nextDate)));
//            }
//            previous = currentDate;
//
//        }
//
//    }
//
//}
