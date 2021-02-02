//package com.incomm.cca.qa.functional;
//
///**
// * Acceptance tests around I3 integration functionality in CCA
// * User: mgalloway
// * Date: 11/18/13
// * Time: 12:46 PM
// * To change this template use File | Settings | File Templates.
// */
//public class NewCallI3FT extends BaseFT {
//
//    final private String ASSIGNMENT_ID = "d3aee70b-d085-4dea-8e09-a2ab01106aad";
//    // This comes from Enterprise Tester's Execution Set URI for the given automated test class
//
//    @Test(groups = {"version-2.4.0", "new_call", "I3"}, enabled = false)
//    public void testNewCallI3AutoSearchProduct() {
//
//        String uid = ivrUtil.generateUid();
//        String callId = i3Util.generateCallId();
//        String serialNumber = "1338004934";
//        String productHeader = "Product - 9000 - Universal Wireless $25.00 (USA Dollars)";
//
//        // Simulate new call details from IVR
//        IvrCallDetail callDetail = ivrUtil.newIvrCallDetail(uid, "666-666-6666", "801-422-4075", "123456789", serialNumber, null, null);
//        String callDetailsJson = ivrUtil.getIvrCallDetailJson(callDetail);
//        ivrModule.postCallDetail(callDetailsJson);
//
//        // Simulate new call connection from I3 for call details received from IVR
//        I3Call expectedCall = i3Util.newI3call(callId, "cca_admin", "555-555-5555", "801-422-4075",
//                "Wireless", uid, new ArrayList<>(Arrays.asList("First Wrapup Code", "Second Wrapup Code", "Third Wrapup Code")));
//        String callJson = i3Util.getI3CallJson(expectedCall);
//        i3Module.receiveCall(callJson);
//
//        // Open CCA and navigate to Call
//        nav.signin();
//        assertThat("Incoming Call button opens Call Details", callDetails.clickIncomingCallButton(), is(true));
//
//        // Validate product details are presented
//        assertThat("Product header content", newCallSearch.getProductHeadingText(), containsString(productHeader));
//        assertThat("Product Details Correct", newCallProductDetails.getSelectedCardSerialNumber(), containsString(serialNumber));
//
//    }
//
//    @Test(groups = {"version-2.4.0", "new_call", "I3"}, enabled = false)
//    public void testNewCallI3AutoSearchLocation() {
//
//        String uid = ivrUtil.generateUid();
//        String callId = i3Util.generateCallId();
//        String locationName = "0075 - Holiday";
//
//        // Simulate new call details from IVR
//        IvrCallDetail callDetail = ivrUtil.newIvrCallDetail(uid, "1-800-698-4940", "763-422-4075", "702-456-7878", null, null, null);
//        String callDetailsJson = ivrUtil.getIvrCallDetailJson(callDetail);
//        ivrModule.postCallDetail(callDetailsJson);
//
//        // Simulate new call connection from I3 for call details received from IVR
//        I3Call expectedCall = i3Util.newI3call(callId, "cca_admin", "1-800-698-4940", "763-422-4075",
//                "PayPal", uid, new ArrayList<>(Arrays.asList("54", "55", "23")));
//        String callJson = i3Util.getI3CallJson(expectedCall);
//        i3Module.receiveCall(callJson);
//
//        // Open CCA and navigate to Call
//        nav.signin();
//        assertThat("Incoming Call button opens Call Details", callDetails.clickIncomingCallButton(), is(true));
//        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("selectedLocationCreateDate"))); // TODO shouldn't implement app driver layer on the test layer
//
//        // Validate location details associated
//        assertThat("Location header content", newCallSearch.getLocationHeadingText(), containsString(locationName));
//
//    }
//
//    @Test(groups = {"version-2.4.0", "new_call", "I3"}, enabled = false)
//    public void testNewCallI3AutoSearchProductAndLocation() {
//
//        String uid = ivrUtil.generateUid();
//        String callId = i3Util.generateCallId();
//        String locationName = "0075 - Holiday";
//        String serialNumber = "3281606392";
//        String productHeader = "Product - 7000 - Wireless Replenishment $19.99 (USA Dollars)";
//
//        // Simulate new call details from IVR
//        IvrCallDetail callDetail = ivrUtil.newIvrCallDetail(uid, "1-800-698-4940", "763-422-4075", "702-456-7878", serialNumber, null, null);
//        String callDetailsJson = ivrUtil.getIvrCallDetailJson(callDetail);
//        ivrModule.postCallDetail(callDetailsJson);
//
//        // Simulate new call connection from I3 for call details received from IVR
//        I3Call expectedCall = i3Util.newI3call(callId, "cca_admin", "1-800-698-4940", "763-422-4075",
//                "PayPal", uid, new ArrayList<>(Arrays.asList("54", "55", "23")));
//        String callJson = i3Util.getI3CallJson(expectedCall);
//        i3Module.receiveCall(callJson);
//
//        // Open CCA and navigate to Call
//        nav.signin();
//        assertThat("Incoming Call button opens Call Details", callDetails.clickIncomingCallButton(), is(true));
//        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("selectedCardSerialNumber"))); // TODO shouldn't implement app driver layer on the test layer
//
//        // Validate Location and Product, default to product details open
//        assertThat("Location header content", newCallSearch.getLocationHeadingText(), containsString(locationName));
//        assertThat("Product header content", newCallSearch.getProductHeadingText(), containsString(productHeader));
//        assertThat("Product details defaults to open", newCallProductDetails.cardDetails.isDisplayed(), is(true));
//
//    }
//
//    @Test(groups = {"version-2.4.0", "new_call", "I3"}, enabled = false)
//    public void testNewCallI3AutoWrapup() throws InterruptedException {
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
//        // Validate Auto Wrapup function and presentation
//        assertThat("Wrapup timer is present", Integer.parseInt(callDetails.getWrapupCodeTimer()), is(lessThanOrEqualTo(60)));
//        assertThat("Wrapup progress bar is present", callDetails.getWrapupCodeProgressBarElement().isDisplayed(), is(true));
//        Thread.sleep(61000);
//        assertThat("Wrapup sent message", callDetails.getWrapupCodeSentMessage(), is(equalTo("Wrap up sent")));
//        assertThat("Auto Wrapup code selection", callDetails.getSelectedWrapupCodeOption(), is(equalTo("Not Wrapped")));
//
//    }
//
//}
