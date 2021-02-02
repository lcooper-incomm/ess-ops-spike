//package com.incomm.cca.qa.acceptance;
//
//import com.incomm.cca.qa.functional.BaseFT;
//import org.testng.annotations.DataProvider;
//import org.testng.annotations.Test;
//
//import java.util.LinkedHashMap;
//import java.util.Map;
//
//import static org.hamcrest.MatcherAssert.assertThat;
//import static org.hamcrest.Matchers.containsString;
//import static org.hamcrest.Matchers.is;
//
///**
// * User: pboatwright
// * Date: 10/15/15
// * Time: 8:44 AM
// */
//public class LocationTxnHistoryAT extends BaseFT {
//
//    @Test( groups = { "version-4.0.0", "accpetance", "search" }, dataProvider = "locTxnHistData", enabled = false)
//    public void locTxnHistLinkGetProduct(String searchType, Map<String, String> searchValues, String startDate, String endDate, String linkLocator) throws Exception {
////        nav.signin();
//         nav.navigateToSearch();
////        search.submit(searchType, searchValues);
////        search.autoSelectWait();
////        searchUtils.setLocTxnRange(startDate, endDate);
//        webDriverUtil.waitForElementPresent("transaction.txnHistoryFirstRow");
//        if (linkLocator.contains(("Van16"))) {
//             webDriverUtil.waitAndClick("transaction.txnHistoryFirstRow");
//         }
//        webDriverUtil.waitAndClick(linkLocator);
//        assertThat("Verify Summary Page Displayed", webDriverUtil.waitForElementPresent("card.incommStatus"), is(true));
//    }
//
//    @DataProvider(name = "locTxnHistData")
//    private Object[][] locTxnHistData() {
//        return new Object[][]{
//            {constants.QS_SEARCHGROUP_LOCATION, getLocTermID_TRGNOBI2222(), "10/01/2014", "10/01/2014", "transaction.txnHistorySerialNumber"},
//            {constants.QS_SEARCHGROUP_LOCATION, getLocTermID_TRGNOBI2222(), "10/01/2014", "10/01/2014", "transaction.txnHistoryVan16"},
//        };
//    }
//
//    @Test( groups = { "version-4.7.0", "acceptance", "search" }, dataProvider = "locTxnHistExportTxns", enabled = false)
//    public void locTxnHistExportTxns(String description, String searchType, Map<String, String> searchValues, String exportFileType,boolean selectionAll) throws Exception {
//
//        String message;
////        nav.signin();
//        nav.navigateToSearch();
////        search.submit(searchType, searchValues);
////        search.autoSelectWait();
////        searchUtils.setLocTxnRange("10/01/2014", "10/01/2014");
////        search.autoSelectWait();
//        if (selectionAll)
//           webDriverUtil.waitAndClick("transaction.exportSelectAllTxns");
//        else {
//            webDriverUtil.waitAndClick("transaction.exportFirstRow");
//            webDriverUtil.waitAndClick("transaction.exportSecondRow");
//            webDriverUtil.waitAndClick("transaction.exportThirdRow");
//        }
//        webDriverUtil.waitAndClick("transaction.exportOptions");
//        webDriverUtil.waitAndClick(exportFileType);
//        try {
////            message = cardUtils.getAlertMessage(30);
//        }catch(Exception e){
//            message=e.getMessage();
//        }
////        assertThat(description,message, containsString("Success"));
//    }
//
//    @DataProvider(name = "locTxnHistExportTxns")
//    private Object[][] locTxnHistExportTxns() {
//        return new Object[][]{
//               {"Exporting some Location txns to CSV file",constants.QS_SEARCHGROUP_LOCATION, getLocTermID_TRGNOBI2222(),"transaction.exportToCSV",false},
//               {"Exporting some Location txns to PDF file",constants.QS_SEARCHGROUP_LOCATION, getLocTermID_TRGNOBI2222(),"transaction.exportToPDF",false},
//               {"Exporting all Location txns to XCL file",constants.QS_SEARCHGROUP_LOCATION, getLocTermID_TRGNOBI2222(),"transaction.exportToXCL",true},
//         };
//     }
//
//    public Map<String, String> getLocTermID_TRGNOBI2222() {
//        Map<String, String> searchValues = new LinkedHashMap<String, String>();
//        searchValues.put("merchantName", "cvs");
//        searchValues.put("locationName", "02232");
//        return searchValues;
//    }
//
//
//}
