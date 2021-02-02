//package com.incomm.cca.qa.acceptance;
//
//import com.incomm.cca.qa.functional.BaseFT;
//
///**
// * Acceptance tests around I3 integration functionality in CCA
// * User: mgalloway
// * Date: 11/18/13
// * Time: 12:46 PM
// */
//public class NewCallI3AT extends BaseFT {
//
//    final private String ASSIGNMENT_ID = null;
//    // This comes from Enterprise Tester's Execution Set URI for the given automated test class
//
//    @Test(groups = {"version-2.4.0", "in-progress", "new_call", "I3"}, enabled = false)
//    public void testNewCallI3IncomingCall() {
//
//        String uid = ivrUtil.generateUid();
//        String callId = i3Util.generateCallId();
//
//        // Simulate new call details from IVR
//        IvrCallDetail callDetail = ivrUtil.newIvrCallDetail(uid, "1-800-698-4940", "404-935-4937", "702-456-7878", "1338004934", null, null);
//        String callDetailsJson = ivrUtil.getIvrCallDetailJson(callDetail);
//        ivrModule.postCallDetail(callDetailsJson);
//
//        // Simulate new call connection from I3 for call details received from IVR
//        I3Call expectedCall = i3Util.newI3call(callId, "cca_admin", "1-800-698-4940", "404-935-4937",
//                "PayPal", uid, new ArrayList<>(Arrays.asList("54", "55", "23")));
//        String callJson = i3Util.getI3CallJson(expectedCall);
//        i3Module.receiveCall(callJson);
//
//        // Validate "Incoming Call" notification
//        nav.signin();
//        assertThat("Incoming Call button is shown", callDetails.incomingCallButton.isDisplayed(), is(true));
//
//    }
//
//    @Test(groups = {"version-2.4.0", "in-progress", "new_call", "I3"}, enabled = false)
//    public void testNewCallI3CallDetailsPopulated() {
//
//        String uid = ivrUtil.generateUid();
//        String callId = i3Util.generateCallId();
//
//        // Simulate new call details from IVR
//        IvrCallDetail callDetail = ivrUtil.newIvrCallDetail(uid, "1-800-698-4940", "404-935-4937", "702-456-7878", "1338004934", null, null);
//        String callDetailsJson = ivrUtil.getIvrCallDetailJson(callDetail);
//        ivrModule.postCallDetail(callDetailsJson);
//
//        // Simulate new call connection from I3 for call details received from IVR
//        I3Call expectedCall = i3Util.newI3call(callId, "cca_admin", "1-800-698-4940", "404-935-4937",
//                "PayPal", uid, new ArrayList<>(Arrays.asList("54", "55", "23")));
//        String callJson = i3Util.getI3CallJson(expectedCall);
//        i3Module.receiveCall(callJson);
//
//        // Validate Call Details
//        nav.signin();
//        assertThat("Incoming Call button opens Call Details", callDetails.clickIncomingCallButton(), is(true));
//        String ccaCallId = callDetails.getNewCallId();
//        assertThat("Caller Name", callDetails.getCallBackNumber(), is(equalTo("")));
//        assertThat("Call Back Number", callDetails.getCallBackNumber(), is(equalTo("")));
//        assertThat("Called From (ANI)", callDetails.getCalledFromAni(), is(equalTo(callDetail.getAni())));
//        assertThat("Number Called (DNIS)", callDetails.getNumberCalledDnis(), is(equalTo(callDetail.getDnis())));
//        assertThat("DNIS is read only field", callDetails.fieldIsReadyOnly("numberCalled"), is(true));
//        assertThat("Queue", transactionUtil.getQueueById(transactionUtil.getCall(ccaCallId).get("queue_id").toString()).get("name").toString(), is(equalTo(expectedCall.getQueueById())));
//        assertThat("Queue is read only field", callDetails.fieldIsReadyOnly("readonlyQueue"), is(true));
//        assertThat("MIN", callDetails.getMin(), is(equalTo(callDetail.getMin())));
//
//    }
//
//    @Test(groups = {"version-2.4.0", "in-progress", "new_call", "I3"}, enabled = false)
//    public void testNewCallI3CallDetailsWrapupCodes() {
//
//        String uid = ivrUtil.generateUid();
//        String callId = i3Util.generateCallId();
//
//        // Simulate new call details from IVR
//        IvrCallDetail callDetail = ivrUtil.newIvrCallDetail(uid, "1-800-698-4940", "404-935-4937", "702-456-7878", "1338004934", null, null);
//        String callDetailsJson = ivrUtil.getIvrCallDetailJson(callDetail);
//        ivrModule.postCallDetail(callDetailsJson);
//
//        // Simulate new call connection from I3 for call details received from IVR
//        I3Call expectedCall = i3Util.newI3call(callId, "cca_admin", "1-800-698-4940", "404-935-4937",
//                "PayPal", uid, new ArrayList<>(Arrays.asList("54", "55", "23")));
//        String callJson = i3Util.getI3CallJson(expectedCall);
//        i3Module.receiveCall(callJson);
//
//        // Validate Expected Wrapup Codes
//        nav.signin();
//        assertThat("Incoming Call button opens Call Details", callDetails.clickIncomingCallButton(), is(true));
//        callDetails.openWrapUpDialogue();
//        List<WebElement> wrapupCodeOptions = callDetails.getWrapupCodeOptions();
//        Integer i = 0;
//        expectedCall.getWrapupCodes().add(0, "-- Select Wrap Up Code --");
//        for(WebElement code : wrapupCodeOptions) {
//            assertThat("wrapup code: " + expectedCall.getWrapupCodes().get(i), code.getText(), is(equalTo(expectedCall.getWrapupCodes().get(i))));
//            i = i + 1;
//        }
//
//
//    }
//
//    @Test(groups = {"version-2.4.0", "in-progress", "new_call", "I3"}, enabled = false)
//    public void testNewCallI3DisconnectTriggersWrapup() throws InterruptedException {
//
//        String uid = ivrUtil.generateUid();
//        String callId = i3Util.generateCallId();
//
//        // Simulate new call details from IVR
//        IvrCallDetail callDetail = ivrUtil.newIvrCallDetail(uid, "1-800-698-4940", "404-935-4937", "702-456-7878", "1338004934", null, null);
//        String callDetailsJson = ivrUtil.getIvrCallDetailJson(callDetail);
//        ivrModule.postCallDetail(callDetailsJson);
//
//        // Simulate new call connection from I3 for call details received from IVR
//        I3Call expectedCall = i3Util.newI3call(callId, "cca_admin", "1-800-698-4940", "404-935-4937",
//                "PayPal", uid, new ArrayList<>(Arrays.asList("54", "55", "23")));
//        String callJson = i3Util.getI3CallJson(expectedCall);
//        i3Module.receiveCall(callJson);
//
//        // Open CCA and navigate to Call
//        nav.signin();
//        assertThat("Incoming Call button opens Call Details", callDetails.clickIncomingCallButton(), is(true));
//
//        // Simulate I3 Disconnect Notice
//        i3Module.callDisconected(callId);
//        Thread.sleep(1000);
//
//        // Validate Wrapup Triggered
//        assertThat("Wrapup dialogue opens", callDetails.isWrapupModalOpen(), is(true));
//
//    }
//
//    @Test(groups = {"version-2.4.0", "in-progress", "new_call", "I3"}, enabled = false)
//    public void testNewCallI3CompleteCall() throws InterruptedException {
//
//        String uid = ivrUtil.generateUid();
//        String callId = i3Util.generateCallId();
//
//        // Simulate new call details from IVR
//        IvrCallDetail callDetail = ivrUtil.newIvrCallDetail(uid, "1-800-698-4940", "404-935-4937", "702-456-7878", "1338004934", null, null);
//        String callDetailsJson = ivrUtil.getIvrCallDetailJson(callDetail);
//        ivrModule.postCallDetail(callDetailsJson);
//
//        // Simulate new call connection from I3 for call details received from IVR
//        I3Call expectedCall = i3Util.newI3call(callId, "cca_admin", "1-800-698-4940", "404-935-4937",
//                "PayPal", uid, new ArrayList<>(Arrays.asList("54", "55", "23")));
//        String callJson = i3Util.getI3CallJson(expectedCall);
//        i3Module.receiveCall(callJson);
//
//        // Open CCA and navigate to Call
//        nav.signin();
//        assertThat("Incoming Call button opens Call Details", callDetails.clickIncomingCallButton(), is(true));
//
//        // Simulate I3 Disconnect Notice
//        i3Module.callDisconected(callId);
//
//        // Validate call wrap up and completion
//        callDetails.selectWrapupCode(expectedCall.getWrapupCodes().get(0));
//        callDetails.setModalCallNotes("test notes");
//        callDetails.setCallerName("AQAT", true);
//        callDetails.completeWrapUpCall();
//
//    }
//
//}
