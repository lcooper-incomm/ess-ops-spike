//package com.incomm.cca.qa.integration;
//
//import com.incomm.cca.qa.integration.BaseIT;
//import org.springframework.http.HttpStatus;
//import org.springframework.web.client.HttpClientErrorException;
//import org.testng.ITestContext;
//import org.testng.annotations.Test;
//
//import java.net.MalformedURLException;
//
//import static org.hamcrest.MatcherAssert.assertThat;
//import static org.hamcrest.Matchers.equalTo;
//import static org.hamcrest.Matchers.is;
//
///**
// * User: mgalloway
// * Date: 10/15/13
// * Time: 8:59 AM
// */
//public class IvrNewCallDetailsIntergrationAT extends BaseIT {
//
//    public IvrNewCallDetailsIntergrationAT(ITestContext testContext) throws Exception {
//        super(testContext);
//    }
//
////   @Test(groups = {"version-2.3.0", "in-progress", "ivr", "integration"}, dataProvider = "callDetails", enabled = false)
////   public void testNewIvrCall(String scenario, String expectedLocationId, String expectedSerialNumber, IvrCallDetail callDetail) {
////
////       Create test data
////       String callDetailJson = ivrUtil.getIvrCallDetailJson(callDetail);
////
////       //Call API
////       ResponseEntity<String> ivrResponse = ivrModule.postCallDetail(callDetailJson);
////       String statusCode = ivrResponse.getStatusCode().toString();
////
////       //Validate Response
////       assertThat("Post New Call API StatusCode is 200", statusCode, is(equalTo("200")));
////
////       // Validate new call detail record is created awaiting to be received
////       Map<String, Object> actualCallDetail = transactionUtil.getCallDetailsByUid(callDetail.getUid());
////       assertThat("Call Detail successfully received", actualCallDetail.isEmpty(), is(false));
////
////       // Validate new call detail fields
////       assertThat("Call Detail: UID", actualCallDetail.get("uid").toString(), is(equalTo(callDetail.getUid())));
////       assertThat("Call Detail: DNIS", actualCallDetail.get("number_called").toString(), is(equalTo(callDetail.getDnis())));
////       assertThat("Call Detail: ANI", actualCallDetail.get("called_from").toString(), is(equalTo(callDetail.getAni())));
////       assertThat("Call Detail: MIN", actualCallDetail.get("mobile_reload_number").toString(), is(equalTo(callDetail.getMin())));
////       assertThat("Call Detail: Serial #", actualCallDetail.get("product_serial_number").toString(), is(equalTo(expectedSerialNumber)));  // Product is auto looked up
////       assertThat("Call Detail: Location ID", actualCallDetail.get("location_id").toString(), is(equalTo(expectedLocationId))); // Location is auto looked up
////
////   }
////
////    @Test(groups = {"version-2.3.0", "in-progress", "ivr", "integration"}, dataProvider = "requiredFields", enabled = false)
////    public void testNewIvrCallRequiredFields(String field, String expectedMessage, IvrCallDetail callDetail) {
////
////        // Create test POST data
////        String callDetailJson = ivrUtil.getIvrCallDetailJson(callDetail);
////
////        try {
////            ivrModule.postCallDetail(callDetailJson);
////            assertThat(field + " is required", true, is(false));
////        }
////        catch(HttpClientErrorException client) {
////
////            assertThat(field + " is required HTTP Response is 400", client.getStatusCode(), is(equalTo(HttpStatus.BAD_REQUEST)));
////            assertThat(field + " is required Error Message", client.getResponseBodyAsString(), is(equalTo(expectedMessage)));
////
////        }
////
////    }
//
//    @Test(groups = {"version-2.3.0", "in-progress", "ivr", "integration"}, enabled = false)
//    public void testNewIvrCallEmptyData() {
//
//        try {
//            ivrModule.postCallDetail("");
//            assertThat("Data is required", true, is(false));
//        }
//        catch(HttpClientErrorException client) {
//
//            assertThat("Data is required HTTP Response is 400", client.getStatusCode(), is(equalTo(HttpStatus.BAD_REQUEST)));
//            assertThat("Data is required Error Message", client.getResponseBodyAsString(), is(equalTo("No IVR call details provided")));
//
//        }
//
//    }
//
////    @DataProvider(name = "requiredFields")
////    private Object[][] requiredFields() {
////        return new Object[][]{
////                {"DNIS", "DNIS is required", ivrUtil.newIvrCallDetail(ivrUtil.generateUid(), "", "937-378-2620", "702-456-7878", "1338004934", null, null)}, // Missing DNIS
////                {"UID", "UID is required", ivrUtil.newIvrCallDetail("", "1-800-698-4940", "937-378-2620", "702-456-7878", "1338004934", null, null)}  // Missing UID
////        };
////    }
////
////    @DataProvider(name = "callDetails")
////    private Object[][] callDetails() {
////        return new Object[][]{
////                {"With Serial #", "30850", "3281606392", ivrUtil.newIvrCallDetail(ivrUtil.generateUid(), "1-800-698-4940", "763-422-4075", "702-456-7878", "3281606392", null, null)},
////                {"With PIN", "30850", "3281606392", ivrUtil.newIvrCallDetail(ivrUtil.generateUid(), "1-800-698-4940", "763-422-4075", "702-456-7878", null, "117821408569869", null)},
////                {"With VAN16", "30850", "3281606392", ivrUtil.newIvrCallDetail(ivrUtil.generateUid(), "1-800-698-4940", "763-422-4075", "702-456-7878", null, null, "5049989429219583")},
////                {"With All Identifiers", "30850", "3281606392", ivrUtil.newIvrCallDetail(ivrUtil.generateUid(), "1-800-698-4940", "763-422-4075", "702-456-7878", "3281606392", "117821408569869", "5049989429219583")}
////        };
////    }
//
//}
