//package com.incomm.cca.qa.util;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.incomm.cca.model.view.i3.I3CallRequestView;
//import com.incomm.cca.qa.module.I3Module;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Component;
//
//import java.io.IOException;
//import java.util.UUID;
//
///**
// * User: mgalloway
// * Date: 10/15/13
// * Time: 12:42 PM
// */
//@Component
//public class I3Util {
//
//    @Autowired
//    protected I3Module i3Module;
//
//    @Autowired
//    protected IvrUtil ivrUtil;
//      public String connectToCall(String uid,String userName,String callQueue,String phoneNumber,String callerID)  {
//
//        // Test Data
//        String UID = uid;
//        String callId =callerID;
//        String callIdKey = "0123456789";
//        String agentUsername = userName;
//        String ani = phoneNumber;
//        String dnis = "8555984818";
//        String queue = callQueue;
//        String connectType = "NORMAL";
//	      I3CallRequestView call = newI3CallDto( callId, callIdKey, agentUsername, dnis, ani, queue, UID, connectType );
//	      String callJson = getI3CallDtoJson(call);
//        ResponseEntity<String> connectResponse = i3Module.receiveCall(callJson);
//        return uid;
//    }
//
//
//	public static I3CallRequestView getI3CallDto( String json ) {
//
//        ObjectMapper mapper = new ObjectMapper();
//		I3CallRequestView call = null;
//		try {
//
//	        call = mapper.readValue( json, I3CallRequestView.class );
//
//        } catch (IOException e) {
//
//            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
//
//        }
//
//        return call;
//    }
//
//	public static String getI3CallDtoJson( I3CallRequestView call ) {
//
//        ObjectMapper mapper = new ObjectMapper();
//
//        String out = null;
//
//        try {
//
//            out = mapper.writeValueAsString(call);
//
//        } catch (IOException e) {
//
//            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
//
//        }
//
//        return out;
//
//    }
//
//	public static I3CallRequestView newI3CallDto( String callId, String callIdKey, String agentName, String dnis, String ani,
//	                                              String queue, String uid, String connectType ) {
//
//		I3CallRequestView call = new I3CallRequestView();
//		call.setCallId(callId);
//        call.setCallIdKey(callIdKey);
//        call.setAgentUserId(agentName);
//        call.setAni(ani);
//        call.setDnis(dnis);
//        call.setQueue(queue);
//        call.setUid(uid);
//        call.setConnectType(connectType);
//
//        return call;
//
//    }
//
//    public String generateCallId() {
//
//        return UUID.randomUUID().toString();
//
//    }
//
//}
