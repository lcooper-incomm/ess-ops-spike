//package com.incomm.cca.qa.integration;
//
///**
// * User: mgalloway
// * Date: 10/22/13
// * Time: 9:29 AM
// */
////public class I3CallHandlingIT extends BaseIT {
//
// //   final private String ASSIGNMENT_ID = "c054cbe1-044e-4aa8-9444-a25f01069f0c";
//    // This comes from Enterprise Tester's Execution Set URI for the given automated test class
//
////    @Test(groups = {"version-2.3.0", "i3", "integration"}, enabled = false)
////    public void testReceiveCallNewQueue() {
////
////        String uid = ivrUtil.generateUid();
////        String callId = i3Util.generateCallId();
////
////        // Create new call object for call detail
////        I3Call call = i3Util.newI3call(callId, "AQAT", "1-800-698-4940", "404-935-4937",
////                "testQueue-" + callId, uid, new ArrayList<>(Arrays.asList("testCode-54", "testCode-55", "testCode-23")));
////        String callJson = i3Util.getI3CallJson(call);
////
////        //Receive Call (picked up by agent)
////        i3Module.receiveCall(callJson);
////
////        // Validate new queues are inserted
////        List<Map<String, Object>> allQueues = transactionUtil.getAllCallQueues();
////        List<String> queueNames = new ArrayList<>();
////        for (Map<String, Object> queue : allQueues) {
////            queueNames.add(queue.get("name").toString());
////        }
////        assertThat("New Queue was inserted into the list of queues", queueNames.contains(call.getQueueById()), is(true));
////        assertThat("New Queue Type is I3", transactionUtil.getCallQueueByName(call.getQueueById()).get("queue_type").toString(), is(equalTo("I3")));
////        assertThat("New Queue Is Active", Boolean.parseBoolean(transactionUtil.getCallQueueByName(call.getQueueById()).get("active").toString()), is(true));
////
////    }
////
////    @Test(groups = {"version-2.3.0", "i3", "integration"}, enabled = false)
////    public void testReceiveCallExistingAndNewQueue() {
////
////        String uid = ivrUtil.generateUid();
////        String callId1 = i3Util.generateCallId();
////        String callId2 = i3Util.generateCallId();
////
////        // Create new call objects for call detail
////        I3Call call1 = i3Util.newI3call(callId1, "AQAT", "1-800-698-4940", "404-935-4937",
////                "testQueue-" + callId1, uid, new ArrayList<>(Arrays.asList("testCode-54", "testCode-55", "testCode-23")));
////        String callJson1 = i3Util.getI3CallJson(call1);
////
////        I3Call call2 = i3Util.newI3call(callId2, "AQAT", "1-800-698-4940", "404-935-4937",
////                "PayPal", uid, new ArrayList<>(Arrays.asList("testCode-54", "testCode-55", "testCode-23")));
////        String callJson2 = i3Util.getI3CallJson(call2);
////
////        //Receive Call (picked up by agent)
////        i3Module.receiveCall(callJson1);
////        i3Module.receiveCall(callJson2);
////
////        // Validate new queues inserted and not existing (no duplicates)
////        List<Map<String, Object>> allQueues = transactionUtil.getAllCallQueues();
////        List<String> queueNames = new ArrayList<>();
////        List<String> existingQueue = new ArrayList<>();
////        for (Map<String, Object> queue : allQueues) {
////            queueNames.add(queue.get("name").toString());
////            if(queue.get("name").equals(call2.getQueueById())) {
////                existingQueue.add(queue.get("name").toString());
////            }
////        }
////        assertThat("New Queue was inserted into the list of queues", queueNames.contains(call1.getQueueById()), is(true));
////        assertThat("Existing Queue still remains", queueNames.contains(call2.getQueueById()), is(true));
////        assertThat("No Duplicates of Existing Queue", existingQueue.size(), is(equalTo(1)));
////
////    }
////
////    @Test(groups = {"version-2.3.0", "i3", "integration"}, enabled = false)
////    public void testReceiveCallNewWrapupCodes() {
////
////        String uid = ivrUtil.generateUid();
////        String callId = i3Util.generateCallId();
////
////        // Create new call objects for call detail
////        I3Call call = i3Util.newI3call(callId, "AQAT", "1-800-698-4940", "404-935-4937",
////                "testQueue-" + callId, uid, new ArrayList<>(Arrays.asList("testCode-54", "testCode-55", "testCode-23")));
////        String callJson = i3Util.getI3CallJson(call);
////
////        //Receive Call (picked up by agent)
////        I3Call callResponse = i3Util.getI3call(i3Module.receiveCall(callJson).getBody());
////
////        // Validate new wrap up codes inserted
////        List<Map<String, Object>> allCodes = transactionUtil.getAllWrapupCodes();
////        List<String> codeNames = new ArrayList<>();
////        for (Map<String, Object> code : allCodes) {
////            codeNames.add(code.get("name").toString());
////        }
////        assertThat("New Code was inserted into the list of Wrapup Codes", codeNames.containsAll(call.getWrapupCodes()), is(true));
////
////        // Validate wrap up codes are associated to call
////        List<Map<String, Object>> allCallCodes = transactionUtil.getCallWrapupCodes(callResponse.getId().toString());
////        List<String> callCodes = new ArrayList<>();
////        for(Map<String, Object> code : allCallCodes) {
////            callCodes.add(transactionUtil.getWrapupCode(code.get("wrapup_code_id").toString()).get("name").toString());
////        }
////        assertThat("Codes are linked to call", callCodes.containsAll(call.getWrapupCodes()), is(true));
////
////    }
////
////    @Test(groups = {"version-2.3.0", "i3", "integration"}, enabled = false)
////    public void testReceiveCallExistingAndNewWrapupCodes() {
////
////        String uid = ivrUtil.generateUid();
////        String callId1 = i3Util.generateCallId();
////        String callId2 = i3Util.generateCallId();
////
////        // Create new call objects for call detail
////        I3Call call1 = i3Util.newI3call(callId1, "AQAT", "1-800-698-4940", "404-935-4937",
////                "testQueue-" + callId1, uid, new ArrayList<>(Arrays.asList("testCode-54", "testCode-55", "testCode-23")));
////        String callJson1 = i3Util.getI3CallJson(call1);
////
////        I3Call call2 = i3Util.newI3call(callId2, "AQAT", "1-800-698-4940", "404-935-4937",
////                "PayPal", uid, new ArrayList<>(Arrays.asList("Code 1", "Code 2", "Code 3")));
////        String callJson2 = i3Util.getI3CallJson(call2);
////
////        //Receive Call (picked up by agent)
////        I3Call call1Response = I3Util.getI3call(i3Module.receiveCall(callJson1).getBody());
////        I3Call call2Response = I3Util.getI3call(i3Module.receiveCall(callJson2).getBody());
////
////        // Validate new wrap up codes inserted and not existing (no duplicates)
////        List<Map<String, Object>> allWrapupCodes = transactionUtil.getAllWrapupCodes();
////        List<String> codeNames = new ArrayList<>();
////        List<String> existingCode = new ArrayList<>();
////        for (Map<String, Object> code : allWrapupCodes) {
////            codeNames.add(code.get("name").toString());
////            if(call2.getWrapupCodes().contains(code.get("name"))) {
////                existingCode.add(code.get("name").toString());
////            }
////        }
////        assertThat("New Code was inserted into the list of Wrapup Codes", codeNames.containsAll(call1.getWrapupCodes()), is(true));
////        assertThat("Existing Code still remains", codeNames.containsAll(call2.getWrapupCodes()), is(true));
////        assertThat("No Duplicates of Existing Code", existingCode.size(), is(equalTo(3)));
////
////        // Validate wrap up codes are associated to call
////        List<Map<String, Object>> allCall1Codes = transactionUtil.getCallWrapupCodes(call1Response.getId().toString());
////        List<Map<String, Object>> allCall2Codes = transactionUtil.getCallWrapupCodes(call2Response.getId().toString());
////        List<String> call1Codes = new ArrayList<>();
////        List<String> call2Codes = new ArrayList<>();
////        for(Map<String, Object> code1 : allCall1Codes) {
////            call1Codes.add(transactionUtil.getWrapupCode(code1.get("wrapup_code_id").toString()).get("name").toString());
////        }
////        for(Map<String, Object> code2 : allCall2Codes) {
////            call2Codes.add(transactionUtil.getWrapupCode(code2.get("wrapup_code_id").toString()).get("name").toString());
////        }
////        assertThat("Codes are linked to call 1", call1Codes.containsAll(call1.getWrapupCodes()), is(true));
////        assertThat("Codes are linked to call 2", call2Codes.containsAll(call2.getWrapupCodes()), is(true));
////
////    }
////
////    @Test(groups = {"version-2.3.0", "i3", "integration"}, enabled = false)
////    public void testReceiveCallIVRDataOverridesI3() {
////
////        String uid = ivrUtil.generateUid();
////        String callId = i3Util.generateCallId();
////
////        // Create new call detail object
////        IvrCallDetail expectedCallDetail = ivrUtil.newIvrCallDetail(uid, "1-800-698-4940", "404-935-4937", "702-456-7878", "1338004934", null, null);
////        String callDetailJson = ivrUtil.getIvrCallDetailJson(expectedCallDetail);
////
////        // IVR forward of call detail
////        ivrModule.postCallDetail(callDetailJson);
////
////        // Create new call object for call detail
////        I3Call call = i3Util.newI3call(callId, "AQAT", "1-800-698-1111", "404-935-1111",
////                "PayPal", uid, new ArrayList<>(Arrays.asList("54", "55", "23")));
////        String callJson = i3Util.getI3CallJson(call);
////
////        //Receive Call (picked up by agent)
////        i3Module.receiveCall(callJson);
////
////        // Validate call details remained the same from original post from IVR after receiving ONE calls from I3
////        Map<String, Object> actualCallDetail = transactionUtil.getCallDetailsByUid(uid);
////        assertThat("Call details: ANI", actualCallDetail.get("called_from").toString(), is(equalTo(expectedCallDetail.getAni())));
////        assertThat("Call details: DNIS", actualCallDetail.get("number_called").toString(), is(equalTo(expectedCallDetail.getDnis())));
////        assertThat("Call details: UID", actualCallDetail.get("uid").toString(), is(equalTo(expectedCallDetail.getUid())));
////
////    }
////
////    @Test(groups = {"version-2.3.0", "i3", "integration"}, enabled = false)
////    public void testReceiveCallIVRDataOverridesI3Escalation() {
////
////        String uid = ivrUtil.generateUid();
////        String callId1 = i3Util.generateCallId();
////        String callId2 = i3Util.generateCallId();
////
////        // Create new call detail object
////        IvrCallDetail expectedCallDetail = ivrUtil.newIvrCallDetail(uid, "1-800-698-4940", "404-935-4937", "702-456-7878", "1338004934", null, null);
////        String callDetailJson = ivrUtil.getIvrCallDetailJson(expectedCallDetail);
////
////        // IVR forward of call detail
////        ivrModule.postCallDetail(callDetailJson);
////
////        // Create new call 1 object for call detail
////        I3Call call1 = i3Util.newI3call(callId1, "AQAT", "1-800-698-1111", "404-935-1111",
////                "PayPal", uid, new ArrayList<>(Arrays.asList("54", "55", "23")));
////        String callJson1 = i3Util.getI3CallJson(call1);
////        i3Module.receiveCall(callJson1);
////
////        // Create new call 2 object for call detail
////        I3Call call2 = i3Util.newI3call(callId2, "AQAT", "1-800-698-1111", "404-935-1111",
////                "PayPal", uid, new ArrayList<>(Arrays.asList("54", "55", "23")));
////        String callJson2 = i3Util.getI3CallJson(call2);
////        i3Module.receiveCall(callJson2);
////
////        // Validate call details remained the same from original post from IVR after receiving TWO calls from I3
////        Map<String, Object> actualCallDetail = transactionUtil.getCallDetailsByUid(uid);
////        assertThat("Call details: ANI", actualCallDetail.get("called_from").toString(), is(equalTo(expectedCallDetail.getAni())));
////        assertThat("Call details: DNIS", actualCallDetail.get("number_called").toString(), is(equalTo(expectedCallDetail.getDnis())));
////        assertThat("Call details: UID", actualCallDetail.get("uid").toString(), is(equalTo(expectedCallDetail.getUid())));
////
////    }
//
////}
