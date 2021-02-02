//package com.incomm.cca.qa.util;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.incomm.cca.model.view.i3.IVRCallDetailView;
//import com.incomm.cca.qa.module.I3Module;
//import org.apache.commons.lang.StringUtils;
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
// * Time: 12:41 PM
// */
//@Component
//public class IvrUtil {
//
//    @Autowired
//    protected I3Module i3Module;
//
//	public static IVRCallDetailView getIvrCallDetail( String json ) {
//
//        ObjectMapper mapper = new ObjectMapper();
//		IVRCallDetailView callDetail = null;
//
//        try {
//
//	        callDetail = mapper.readValue( json, IVRCallDetailView.class );
//
//        } catch (IOException e) {
//
//            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
//
//        }
//
//        return callDetail;
//
//    }
//
//	public static String getIvrCallDetailJson( IVRCallDetailView callDetail ) {
//
//        ObjectMapper mapper = new ObjectMapper();
//
//        String out = null;
//
//        try {
//
//            out = mapper.writeValueAsString(callDetail);
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
//	public static IVRCallDetailView newIvrCallDetail( String uid, String dnis, String ani, String min, String serialNumber, String pin, String van16, String proxyNumber ) {
//
//		IVRCallDetailView detail = new IVRCallDetailView();
//		detail.setUid(uid);
//        detail.setDnis(dnis);
//        detail.setAni(ani);
//        detail.setMin(min);
//        detail.setProxyNumber(proxyNumber);
//        detail.setPlatform("INCOMM");
//        if(!proxyNumber.isEmpty()){
//            detail.setPlatform("vms");
//        }
//        if(StringUtils.isNotBlank(serialNumber)) {
//            detail.setSerialNumber(serialNumber);
//        }
//        else {
//            detail.setSerialNumber("");
//        }
//        if(StringUtils.isNotBlank(pin)) {
//            detail.setPin(pin);
//        }
//        else {
//            detail.setPin("");
//        }
//        if(StringUtils.isNotBlank(van16)) {
//            detail.setVan16(van16);
//        }
//        else {
//            detail.setVan16("");
//        }
//
//        return detail;
//
//    }
//    public ResponseEntity<String> createCall(String newDNIS,String phoneNumber, String SN, String pin, String van16, String PN,String UID){
//        String uid = UID;
//        String ani = phoneNumber;
//        String min = "1234567";
//        String dnis = newDNIS;
//        String serialNumber = SN ;
//        String proxyNumber = PN ;
//	    IVRCallDetailView detail = newIvrCallDetail( uid, dnis, ani, min, serialNumber, pin, van16, PN );
//	    String detailJson = getIvrCallDetailJson(detail);
// //{"ani":"7702406100","dnis":"8555984818","min":"1234567","pin":"","serialNumber":"","uid":"18096d65-9d1f-4f13-b7e4-46d5d7af172a","van16":"","sessionId":null,"platform":"INCOMM","proxyNumber":""}
//         ResponseEntity<String> connectResponse = i3Module.receiveCardDetails(detailJson);
//        return connectResponse;
//
//    }
//    public void disconnectCall(String callIDKey,String user){
//        String callKey = callIDKey;
//        String userName = user;
//        String disconnectType="REMOTE";
//        ResponseEntity<String> connectResponse = i3Module.callDisconected(callIDKey,disconnectType,userName);
//
//    }
//
//    public static String generateUid() {
//
//        UUID uid = UUID.randomUUID();
//        return uid.toString();
//
//    }
//
//}
