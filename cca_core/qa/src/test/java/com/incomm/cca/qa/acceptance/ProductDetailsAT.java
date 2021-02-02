//package com.incomm.cca.qa.acceptance;
//
//import com.incomm.cca.qa.functional.BaseFT;
//import org.testng.annotations.DataProvider;
//import org.testng.annotations.Test;
//
//import java.util.ArrayList;
//import java.util.LinkedHashMap;
//import java.util.List;
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
//public class ProductDetailsAT extends BaseFT {
//
//    @Test(groups = { "version-4.0.0", "accpetance" }, dataProvider = "prodPurchaseLocationLink", enabled = false)
//    public void prodPurchaseLocationLinkGetLocation(String searchType,String searchID,String searchValue, String linkLocator) throws Exception {
////        nav.signin();
////        webDriverUtil.waitForElementPresent("quickSearch.Dropdown");
////        searchUtils.searchByFormElementHandler(searchType,searchID,searchValue,null,false);
////        search.autoSelectWait();
////        webDriverUtil.waitAndClick(linkLocator);
////        search.autoSelectWait();
////        assertThat("Verify Location Summary Page Displayed", webDriverUtil.waitForElementPresent("location.businessUnit"), is(true));
//    }
//    @DataProvider(name = "prodPurchaseLocationLink")
//    private Object[][] prodPurchaseLocationLink() {
//        return new Object[][]{
//                {constants.QS_SEARCHGROUP_FASTCARD_PIN, "serialNumber","5013867833", "card.purchaseLocation"},
//        };
//    }
//
//    @Test(groups = { "version-4.7.0", "accpetance" }, dataProvider = "prodProductOwnerLink", enabled = false)
//    public void prodProductOwnerLinkGetLocation(String searchType,String searchID,String searchValue, String linkLocator) throws Exception {
////        nav.signin();
////        searchUtils.searchByFormElementHandler(searchType, searchID, searchValue, null, false);
////        search.autoSelectWait();
////        webDriverUtil.click(linkLocator);
////        search.autoSelectWait();
////        webDriverUtil.waitForElementPresent("advSearch.locResultsFirstRow");
////        webDriverUtil.waitAndClick(("advSearch.locResultsFirstRow"));
////        search.autoSelectWait();
////        assertThat("Verify Summary Page Displayed", webDriverUtil.waitForElementPresent("location.businessUnit"), is(true));
//    }
//    @DataProvider(name = "prodProductOwnerLink")
//    private Object[][]  prodProductOwnerLink() {
//        return new Object[][]{
//                {constants.QS_SEARCHGROUP_FINANCIAL_GIFT, "greencardSerialNumber","3136411906", "card.productOwner"},
//        };
//    }
//
//    @Test(groups = { "version-4.7.0", "accpetance" }, dataProvider = "prodTxnHistExportTxns", enabled = false)
//    public void prodTxnHistExport(String description,String searchType, String searchID,String searchValue, String fromDate, String toDate,boolean selectMMtxns,String exportFileType,boolean selectionAll) throws Exception {
//        String message="";
//        boolean isVMS=false;
////        nav.signin();
//        if (searchType.equals(constants.QS_SEARCHGROUP_GPR)){
//            isVMS=true;
//        }
////        searchUtils.searchByFormElementHandler(searchType, searchID, searchValue, null, isVMS);
//        webDriverUtil.waitForElementPresent("transaction.txnHistoryRangeSearch");
//        if (selectMMtxns) {
//            webDriverUtil.selectText("transaction.selectHistoryPlatform", "Merchant Manager");
//        }
//        if (!fromDate.isEmpty())
////           searchUtils.setLocTxnRange(fromDate, toDate);
//        webDriverUtil.waitWhileExists("transaction.txnLoadSpinner");
//        if (selectionAll) {
//            webDriverUtil.waitAndClick("transaction.exportSelectAllTxns");
//        }
//        else {
//            webDriverUtil.waitAndClick("transaction.exportFirstRow");
//            webDriverUtil.waitAndClick("transaction.exportSecondRow");
//            webDriverUtil.waitAndClick("transaction.exportThirdRow");
//        }
//        webDriverUtil.waitAndClick("transaction.exportOptions");
//        webDriverUtil.waitAndClick(exportFileType);
////        message=searchUtils.getResultsMessage();
//        assertThat(description,message, containsString("Success"));
//     }
//    @DataProvider(name = "prodTxnHistExportTxns")
//    private Object[][] prodTxnHistExportTxns() {
//        return new Object[][]{
//                {"Exporting All GreenCard txns to CSV file",constants.QS_SEARCHGROUP_FINANCIAL_GIFT, "greencardSerialNumber","3136411906","","", false,"transaction.exportToCSV",true},
//                {"Exporting All Merchant Manager txns to an Excel file",constants.QS_SEARCHGROUP_FINANCIAL_GIFT, "greencardSerialNumber","2367191811","04/17/2014","04/30/2014", true,"transaction.exportToXCL",true},
//                {"Exporting Some GreenCard txns to CSV file",constants.QS_SEARCHGROUP_FINANCIAL_GIFT, "greencardSerialNumber","3136411906","","", false,"transaction.exportToCSV",false},
//                {"Exporting Some FastCard txns to PDF file",constants.QS_SEARCHGROUP_FASTCARD_PIN, "van16","5049980359284564","","", false,"transaction.exportToPDF",false},
//                {"Exporting Some Merchant Manager txns to an Excel file",constants.QS_SEARCHGROUP_FINANCIAL_GIFT, "greencardSerialNumber","2367191811","04/01/2014","04/30/2014", true,"transaction.exportToXCL",false},
//                {"Exporting All FastCard txns to PDF file",constants.QS_SEARCHGROUP_FASTCARD_PIN, "van16","5049980359284564","","", false,"transaction.exportToPDF",true},
//                {"Exporting Some VMS txns to a CSV file",constants.QS_SEARCHGROUP_GPR, "serialNumber","7562433802","","", false,"transaction.exportToCSV",false},
//                {"Exporting All VMS txns to s CSV file",constants.QS_SEARCHGROUP_GPR, "serialNumber","7562433802","","", false,"transaction.exportToCSV",true},
//         };
//     }
//
//    public Map<String, String> getLocTermID_TRGNOBI2222() {
//        Map<String, String> searchValues = new LinkedHashMap<String, String>();
//        searchValues.put("terminalID", "TRGNOBI2222");
//        return searchValues;
//    }
//
//    @Test( groups = { "version-4.7.0", "accpetance" }, dataProvider = "prodViewDetails", enabled = false)
//    public void prodViewTransactionDetails(String description, String searchType, String searchID, String searchValue, String fromDate, String toDate,boolean selectMM,List<String> expTxnDrawerValues,List<String> expFullDetailsValues) {
//        List<String> actTxnDrawerValues = new ArrayList<>();
//        List<String> actFullDetailsValues = new ArrayList<>();
//        boolean drawerResult=false;
//        boolean fullDetailResults=false;
////        nav.signin();
////        searchUtils.searchByFormElementHandler(searchType, searchID, searchValue, null, false);
//        if (selectMM)
//            webDriverUtil.selectText("transaction.selectHistoryPlatform", "Merchant Manager");
//        if (!fromDate.isEmpty())
////            searchUtils.setLocTxnRange(fromDate, toDate);
//        webDriverUtil.waitAndClick("transaction.txnHistoryFirstRow");
//        int i=0;
//        try{
//        while (!webDriverUtil.waitForElementPresent("transaction.viewFullTxnDetails")) {
//            i++;
//            if (i == 10) {
//                throw new Exception("Transaction Drawer cannot be opened.");
//            }
//            webDriverUtil.waitAndClick("transaction.txnHistoryFirstRow");
//            break;
//        }
//        actTxnDrawerValues = webDriverUtil.getTextByList("transaction.viewTxnDrawerValues", 0);
//        webDriverUtil.waitAndClick("transaction.viewFullTxnDetails");
//        actFullDetailsValues = webDriverUtil.getTextByList("transaction.gcViewValues", 0);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
////        drawerResult = adminUtils.compareLists(expTxnDrawerValues, actTxnDrawerValues,"vmsDrawerTxnValues",false);
////        fullDetailResults = adminUtils.compareLists(expFullDetailsValues, actFullDetailsValues,"vmsFullTxnValues",false);
//         assertThat(description,fullDetailResults, is(true));
//    }
//    @DataProvider(name = "prodViewDetails")
//    public Object[][] prodViewDetails() {
//        return new Object[][]{
////        {"Validate GreenCard drawer and full detail values",constants.QS_SEARCHGROUP_FINANCIAL_GIFT, "greencardSerialNumber","3136411906","","",false,getGCDrawerTxnValues(),getGCFullTxnValues()},
////        {"Validate FastCard drawer and full detail values",constants.QS_SEARCHGROUP_FASTCARD_PIN, "van16","5049980359284564","11/05/2015","12/19/2015",false,getFCDrawerTxnValues(),getFCFullTxnValues()},
////        {"Validate Merchant Manager drawer and full detail values",constants.QS_SEARCHGROUP_FINANCIAL_GIFT, "greencardSerialNumber","1732175529","06/01/2010","06/30/2010", true,getMMDrawerTxnValues(),getMFullTxnValues()},
////        {"Validate VMS drawer and full detail values",constants.QS_SEARCHGROUP_GPR, "PAN","4420620303666811","08/30/2014","08/30/2015", false,getVMSDrawerTxnValues(),getVMSFullTxnValues()},
////        };
//    }
//    private List<String> getGCDrawerTxnValues() {
//        List<String> gcDrawerTxnValues= new ArrayList<String>();
//        gcDrawerTxnValues.add("INCOMM");
//        gcDrawerTxnValues.add("840");
//        gcDrawerTxnValues.add("$50.00");
//        gcDrawerTxnValues.add("$50.00");
//        gcDrawerTxnValues.add("");
//        gcDrawerTxnValues.add("");
//        gcDrawerTxnValues.add("");
//        gcDrawerTxnValues.add("");
//        gcDrawerTxnValues.add("");
//        gcDrawerTxnValues.add("DEAC (Card Deactivation)");
//        gcDrawerTxnValues.add("2002 (Card Deactivation)");
//        gcDrawerTxnValues.add("No");
//
//        return gcDrawerTxnValues;
//    }
//    private List<String> getGCFullTxnValues() {
//        List<String> gcFullTxnValues= new ArrayList<String>();
//        gcFullTxnValues.add("Summary");
//        gcFullTxnValues.add("04/20/2016 02:59");
//        gcFullTxnValues.add("1221302831");
//        gcFullTxnValues.add("/GlNkIxBUrLyBB4VOuHApQPCvreLoD1635GC12fdzRM=");
//        gcFullTxnValues.add("3136411906");
//        gcFullTxnValues.add("INCOMM");
//        gcFullTxnValues.add("Card Deactivation (2002)");
//        gcFullTxnValues.add("$50.00");
//        gcFullTxnValues.add("Details");
//        gcFullTxnValues.add("");
//        gcFullTxnValues.add("");
//        gcFullTxnValues.add("");
//        gcFullTxnValues.add("");
//        gcFullTxnValues.add("");
//        gcFullTxnValues.add("$50.00");
//        gcFullTxnValues.add("");
//        gcFullTxnValues.add("");
//        gcFullTxnValues.add("No");
//        gcFullTxnValues.add("1757033");
//        gcFullTxnValues.add("");
//        gcFullTxnValues.add("");
//        gcFullTxnValues.add("");
//        gcFullTxnValues.add("");
//        gcFullTxnValues.add("04/20/2016 02:59");
//        gcFullTxnValues.add("");
//        gcFullTxnValues.add("USD (840)");
//        gcFullTxnValues.add("");
//        gcFullTxnValues.add("");
//        gcFullTxnValues.add("");
//        gcFullTxnValues.add("");
//        gcFullTxnValues.add("No");
//        gcFullTxnValues.add("No");
//        gcFullTxnValues.add("");
//        gcFullTxnValues.add("");
//        gcFullTxnValues.add("");
//        gcFullTxnValues.add("");
//        gcFullTxnValues.add("");
//        gcFullTxnValues.add("");
//        gcFullTxnValues.add("");
//        gcFullTxnValues.add("");
//        gcFullTxnValues.add("");
//        gcFullTxnValues.add("");
//        gcFullTxnValues.add("");
//        gcFullTxnValues.add("No");
//        gcFullTxnValues.add("No");
//        gcFullTxnValues.add("");
//        gcFullTxnValues.add("");
//        gcFullTxnValues.add("");
//        gcFullTxnValues.add("");
//        gcFullTxnValues.add("");
//        gcFullTxnValues.add("");
//        gcFullTxnValues.add("");
//        gcFullTxnValues.add("");
//        gcFullTxnValues.add("");
//        gcFullTxnValues.add("12/31/1969 17:00");
//        gcFullTxnValues.add("");
//        gcFullTxnValues.add("");
//        gcFullTxnValues.add("");
//        gcFullTxnValues.add("6651475948");
//        gcFullTxnValues.add("No");
//        gcFullTxnValues.add("");
//        gcFullTxnValues.add("No");
//        gcFullTxnValues.add("No");
//        gcFullTxnValues.add("");
//        gcFullTxnValues.add("GREENCARD");
//        gcFullTxnValues.add("");
//        gcFullTxnValues.add("");
//        gcFullTxnValues.add("");
//        gcFullTxnValues.add("Card Deactivation (2002)");
//        gcFullTxnValues.add("$50.00");
//        gcFullTxnValues.add("");
//        gcFullTxnValues.add("");
//        gcFullTxnValues.add("");
//        gcFullTxnValues.add("");
//        gcFullTxnValues.add("No");
//        gcFullTxnValues.add("");
//        gcFullTxnValues.add("");
//        gcFullTxnValues.add("Unknown");
//        gcFullTxnValues.add("3136411906");
//        gcFullTxnValues.add("12/31/1969 17:00");
//        gcFullTxnValues.add("GREENCARD");
//        gcFullTxnValues.add("");
//        gcFullTxnValues.add("");
//        gcFullTxnValues.add("INCOMM");
//        gcFullTxnValues.add("04/20/2016 02:59");
//        gcFullTxnValues.add("");
//        gcFullTxnValues.add("5049980349668587");
//        gcFullTxnValues.add("Card Deactivation");
//        gcFullTxnValues.add("DEAC");
//        gcFullTxnValues.add("");
//        gcFullTxnValues.add("DEAC");
//
//        return gcFullTxnValues;
//    }
//
//    private List<String> getFCDrawerTxnValues() {
//        List<String> fcDrawerTxnValues= new ArrayList<String>();
//        fcDrawerTxnValues.add("GameStop");
//        fcDrawerTxnValues.add("04444GAMESTOP");
//        fcDrawerTxnValues.add("GMS04444001");
//        fcDrawerTxnValues.add("16475 NE 74TH ST, STE E-225");
//        fcDrawerTxnValues.add("E-225");
//        fcDrawerTxnValues.add("REDMOND");
//        fcDrawerTxnValues.add("WA");
//        fcDrawerTxnValues.add("98052");
//        fcDrawerTxnValues.add("");
//        fcDrawerTxnValues.add("4000 - No DCMS action (X)");
//
//        return fcDrawerTxnValues;
//    }
//    private List<String> getFCFullTxnValues() {
//        List<String> fcFullTxnValues= new ArrayList<String>();
//        fcFullTxnValues.add("Summary");
//        fcFullTxnValues.add("11/13/2015 15:04");
//        fcFullTxnValues.add("1721232798");
//        fcFullTxnValues.add("168219635");
//        fcFullTxnValues.add("GMS04444001");
//        fcFullTxnValues.add("4000 - No DCMS action (X)");
//        fcFullTxnValues.add("$10.00");
//        fcFullTxnValues.add("Details");
//        fcFullTxnValues.add("");
//        fcFullTxnValues.add("");
//        fcFullTxnValues.add("");
//        fcFullTxnValues.add("");
//        fcFullTxnValues.add("");
//        fcFullTxnValues.add("$10.00");
//        fcFullTxnValues.add("");
//        fcFullTxnValues.add("");
//        fcFullTxnValues.add("No");
//        fcFullTxnValues.add("");
//        fcFullTxnValues.add("");
//        fcFullTxnValues.add("");
//        fcFullTxnValues.add("Act Suspected Fraud::344206:20151113140445:");
//        fcFullTxnValues.add("");
//        fcFullTxnValues.add("11/13/2015 15:04");
//        fcFullTxnValues.add("OTHER");
//        fcFullTxnValues.add("");
//        fcFullTxnValues.add("");
//        fcFullTxnValues.add("");
//        fcFullTxnValues.add("");
//        fcFullTxnValues.add("");
//        fcFullTxnValues.add("No");
//        fcFullTxnValues.add("No");
//        fcFullTxnValues.add("");
//        fcFullTxnValues.add("");
//        fcFullTxnValues.add("");
//        fcFullTxnValues.add("");
//        fcFullTxnValues.add("");
//        fcFullTxnValues.add("");
//        fcFullTxnValues.add("");
//        fcFullTxnValues.add("");
//        fcFullTxnValues.add("");
//        fcFullTxnValues.add("");
//        fcFullTxnValues.add("");
//        fcFullTxnValues.add("");
//        fcFullTxnValues.add("No");
//        fcFullTxnValues.add("");
//        fcFullTxnValues.add("");
//        fcFullTxnValues.add("");
//        fcFullTxnValues.add("");
//        fcFullTxnValues.add("");
//        fcFullTxnValues.add("");
//        fcFullTxnValues.add("");
//        fcFullTxnValues.add("");
//        fcFullTxnValues.add("");
//        fcFullTxnValues.add("");
//        fcFullTxnValues.add("4000");
//        fcFullTxnValues.add("X");
//        fcFullTxnValues.add("No DCMS action");
//        fcFullTxnValues.add("");
//        fcFullTxnValues.add("");
//        fcFullTxnValues.add("");
//        fcFullTxnValues.add("No");
//        fcFullTxnValues.add("No");
//        fcFullTxnValues.add("");
//        fcFullTxnValues.add("INCOMM");
//        fcFullTxnValues.add("");
//        fcFullTxnValues.add("");
//        fcFullTxnValues.add("");
//        fcFullTxnValues.add("");
//        fcFullTxnValues.add("");
//        fcFullTxnValues.add("");
//        fcFullTxnValues.add("");
//        fcFullTxnValues.add("");
//        fcFullTxnValues.add("");
//        fcFullTxnValues.add("No");
//        fcFullTxnValues.add("");
//        fcFullTxnValues.add("");
//        fcFullTxnValues.add("");
//        fcFullTxnValues.add("168219635");
//        fcFullTxnValues.add("");
//        fcFullTxnValues.add("activityLog");
//        fcFullTxnValues.add("");
//        fcFullTxnValues.add("");
//        fcFullTxnValues.add("GMS04444001");
//        fcFullTxnValues.add("");
//        fcFullTxnValues.add("");
//        fcFullTxnValues.add("5049980359284564");
//        fcFullTxnValues.add("");
//        fcFullTxnValues.add("");
//        fcFullTxnValues.add("");
//        fcFullTxnValues.add("");
//
//        return fcFullTxnValues;
//    }
//
//    private List<String> getMMDrawerTxnValues() {
//        List<String> mmDrawerTxnValues= new ArrayList<String>();
//        mmDrawerTxnValues.add("7 Eleven");
//        mmDrawerTxnValues.add("25855");
//        mmDrawerTxnValues.add("SVLN25855001");
//        mmDrawerTxnValues.add("100 South Sycamore Street");
//        mmDrawerTxnValues.add("Newtown");
//        mmDrawerTxnValues.add("PA");
//        mmDrawerTxnValues.add("18940");
//        mmDrawerTxnValues.add("");
//        mmDrawerTxnValues.add("2001 - Activate card (A)");
//        return mmDrawerTxnValues;
//    }
//    private List<String> getMFullTxnValues() {
//        List<String> mmFullTxnValues = new ArrayList<String>();
//        mmFullTxnValues.add("Summary");
//        mmFullTxnValues.add("06/01/2010 13:28");
//        mmFullTxnValues.add("23797367");
//        mmFullTxnValues.add("1732175529");
//        mmFullTxnValues.add("Vanilla Visa Gift Box $100");
//        mmFullTxnValues.add("ITSTFAD009997000");
//        mmFullTxnValues.add("2001 - Activate card (A)");
//        mmFullTxnValues.add("$100.00");
//        mmFullTxnValues.add("Details");
//        mmFullTxnValues.add("");
//        mmFullTxnValues.add("");
//        mmFullTxnValues.add("");
//        mmFullTxnValues.add("");
//        mmFullTxnValues.add("");
//        mmFullTxnValues.add("$100.00");
//        mmFullTxnValues.add("");
//        mmFullTxnValues.add("");
//        mmFullTxnValues.add("Yes");
//        mmFullTxnValues.add("");
//        mmFullTxnValues.add("");
//        mmFullTxnValues.add("");
//        mmFullTxnValues.add("Greencard Giftcard Activation");
//        mmFullTxnValues.add("");
//        mmFullTxnValues.add("06/01/2010 13:28");
//        mmFullTxnValues.add("CREDIT");
//        mmFullTxnValues.add("");
//        mmFullTxnValues.add("");
//        mmFullTxnValues.add("");
//        mmFullTxnValues.add("Vanilla Visa Gift Box $100");
//        mmFullTxnValues.add("");
//        mmFullTxnValues.add("No");
//        mmFullTxnValues.add("No");
//        mmFullTxnValues.add("");
//        mmFullTxnValues.add("");
//        mmFullTxnValues.add("");
//        mmFullTxnValues.add("");
//        mmFullTxnValues.add("");
//        mmFullTxnValues.add("");
//        mmFullTxnValues.add("");
//        mmFullTxnValues.add("");
//        mmFullTxnValues.add("");
//        mmFullTxnValues.add("");
//        mmFullTxnValues.add("");
//        mmFullTxnValues.add("");
//        mmFullTxnValues.add("No");
//        mmFullTxnValues.add("");
//        mmFullTxnValues.add("");
//        mmFullTxnValues.add("");
//        mmFullTxnValues.add("");
//        mmFullTxnValues.add("");
//        mmFullTxnValues.add("");
//        mmFullTxnValues.add("");
//        mmFullTxnValues.add("");
//        mmFullTxnValues.add("");
//        mmFullTxnValues.add("");
//        mmFullTxnValues.add("2001");
//        mmFullTxnValues.add("A");
//        mmFullTxnValues.add("Activate card");
//        mmFullTxnValues.add("");
//        mmFullTxnValues.add("");
//        mmFullTxnValues.add("");
//        mmFullTxnValues.add("No");
//        mmFullTxnValues.add("No");
//        mmFullTxnValues.add("");
//        mmFullTxnValues.add("INCOMM");
//        mmFullTxnValues.add("");
//        mmFullTxnValues.add("");
//        mmFullTxnValues.add("");
//        mmFullTxnValues.add("");
//        mmFullTxnValues.add("");
//        mmFullTxnValues.add("");
//        mmFullTxnValues.add("");
//        mmFullTxnValues.add("");
//        mmFullTxnValues.add("");
//        mmFullTxnValues.add("No");
//        mmFullTxnValues.add("");
//        mmFullTxnValues.add("");
//        mmFullTxnValues.add("");
//        mmFullTxnValues.add("1732175529");
//        mmFullTxnValues.add("");
//        mmFullTxnValues.add("activityLog");
//        mmFullTxnValues.add("");
//        mmFullTxnValues.add("");
//        mmFullTxnValues.add("ITSTFAD009997000");
//        mmFullTxnValues.add("");
//        mmFullTxnValues.add("");
//        mmFullTxnValues.add("0000001732175529");
//        mmFullTxnValues.add("");
//        mmFullTxnValues.add("");
//        mmFullTxnValues.add("");
//        mmFullTxnValues.add("");
//        return mmFullTxnValues;
//    }
//
//    private List<String> getVMSDrawerTxnValues() {
//        List<String> vmsDrawerTxnValues= new ArrayList<String>();
//        vmsDrawerTxnValues.add("OR00000001AC");
//        vmsDrawerTxnValues.add("CARD ACCEPTOR");
//        vmsDrawerTxnValues.add("FSS-3485");
//        vmsDrawerTxnValues.add("Mumbai");
//        vmsDrawerTxnValues.add("0000000000");
//        vmsDrawerTxnValues.add("INR");
//        vmsDrawerTxnValues.add("Debit");
//        vmsDrawerTxnValues.add("ATM CASHWITHDRAWAL (10)");
//        vmsDrawerTxnValues.add("Daily Transaction Amount Limit exceeded (L02)");
//        vmsDrawerTxnValues.add("Financial Institutions-Automated Cash Disbursements (6011)");
//        vmsDrawerTxnValues.add("PIN Based");
//
//        return vmsDrawerTxnValues;
//    }
//    private List<String> getVMSFullTxnValues() {
//        List<String> vmsFullTxnValues= new ArrayList<String>();
//        vmsFullTxnValues.add("Summary");
//        vmsFullTxnValues.add("08/30/2015 08:01");
//        vmsFullTxnValues.add("OR00000001AC");
//        vmsFullTxnValues.add("442062******6811");
//        vmsFullTxnValues.add("FSS-3485");
//        vmsFullTxnValues.add("ATM CASHWITHDRAWAL (10)");
//        vmsFullTxnValues.add("Daily Transaction Amount Limit exceeded (L02)");
//        vmsFullTxnValues.add("‑$80.64");
//        vmsFullTxnValues.add("0.00");
//        vmsFullTxnValues.add("$8,801.50");
//        vmsFullTxnValues.add("$8,801.50");
//        vmsFullTxnValues.add("Details");
//        vmsFullTxnValues.add("1400000069907");
//        vmsFullTxnValues.add("");
//        vmsFullTxnValues.add("Address Verification Failed (N)");
//        vmsFullTxnValues.add("Yes");
//        vmsFullTxnValues.add("PIN Based");
//        vmsFullTxnValues.add("‑$80.64");
//        vmsFullTxnValues.add("$8,801.50");
//        vmsFullTxnValues.add("$8,801.50");
//        vmsFullTxnValues.add("No");
//        vmsFullTxnValues.add("");
//        vmsFullTxnValues.add("");
//        vmsFullTxnValues.add("");
//        vmsFullTxnValues.add("");
//        vmsFullTxnValues.add("");
//        vmsFullTxnValues.add("08/30/2015 08:01");
//        vmsFullTxnValues.add("Debit");
//        vmsFullTxnValues.add("(INR)");
//        vmsFullTxnValues.add("");
//        vmsFullTxnValues.add("");
//        vmsFullTxnValues.add("");
//        vmsFullTxnValues.add("");
//        vmsFullTxnValues.add("No");
//        vmsFullTxnValues.add("No");
//        vmsFullTxnValues.add("");
//        vmsFullTxnValues.add("");
//        vmsFullTxnValues.add("");
//        vmsFullTxnValues.add("");
//        vmsFullTxnValues.add("0.00");
//        vmsFullTxnValues.add("");
//        vmsFullTxnValues.add("");
//        vmsFullTxnValues.add("");
//        vmsFullTxnValues.add("");
//        vmsFullTxnValues.add("INCOMM");
//        vmsFullTxnValues.add("");
//        vmsFullTxnValues.add("No");
//        vmsFullTxnValues.add("No");
//        vmsFullTxnValues.add("");
//        vmsFullTxnValues.add("");
//        vmsFullTxnValues.add("Financial Institutions-Automated Cash Disbursements (6011)");
//        vmsFullTxnValues.add("");
//        vmsFullTxnValues.add("");
//        vmsFullTxnValues.add("FSS-3485");
//        vmsFullTxnValues.add("");
//        vmsFullTxnValues.add("CARD ACCEPTOR");
//        vmsFullTxnValues.add("");
//        vmsFullTxnValues.add("");
//        vmsFullTxnValues.add("");
//        vmsFullTxnValues.add("");
//        vmsFullTxnValues.add("");
//        vmsFullTxnValues.add("");
//        vmsFullTxnValues.add("No");
//        vmsFullTxnValues.add("");
//        vmsFullTxnValues.add("No");
//        vmsFullTxnValues.add("No");
//        vmsFullTxnValues.add("");
//        vmsFullTxnValues.add("VMS");
//        vmsFullTxnValues.add("");
//        vmsFullTxnValues.add("");
//        vmsFullTxnValues.add("");
//        vmsFullTxnValues.add("ATM CASHWITHDRAWAL (10)");
//        vmsFullTxnValues.add("");
//        vmsFullTxnValues.add("");
//        vmsFullTxnValues.add("");
//        vmsFullTxnValues.add("");
//        vmsFullTxnValues.add("Daily Transaction Amount Limit exceeded (L02)");
//        vmsFullTxnValues.add("No");
//        vmsFullTxnValues.add("");
//        vmsFullTxnValues.add("");
//        vmsFullTxnValues.add("");
//        vmsFullTxnValues.add("");
//        vmsFullTxnValues.add("");
//        vmsFullTxnValues.add("");
//        vmsFullTxnValues.add("");
//        vmsFullTxnValues.add("");
//        vmsFullTxnValues.add("");
//        vmsFullTxnValues.add("");
//        vmsFullTxnValues.add("");
//        vmsFullTxnValues.add("");
//        vmsFullTxnValues.add("");
//        vmsFullTxnValues.add("");
//        vmsFullTxnValues.add("");
//        vmsFullTxnValues.add("");
//
//        return vmsFullTxnValues;
//    }
//    @Test(groups = { "version-4.0.0", "accpetance" }, dataProvider = "cardActionsAvailable", enabled = false)
//    public void cardActionsAvailable(String description,String searchType,String searchID,String searchValue, List<String> expCardActions) throws Exception {
////        nav.signin();
////        List<String> actCardActions = new ArrayList<>();
////        webDriverUtil.waitForElementPresent("quickSearch.Dropdown");
////        searchUtils.searchByFormElementHandler(searchType,searchID,searchValue,null,false);
////        actCardActions = webDriverUtil.getTextByList("card.cardActions", 0);
////        boolean cardCompareResults = adminUtils.compareLists(expCardActions, actCardActions,"",false);
////        assertThat(description,cardCompareResults, is(true));
//    }
//    @DataProvider(name = "cardActionsAvailable")
//    private Object[][] cardActionsAvailable() {
//        return new Object[][]{
////failing                {"Verify the correct card actions display for a GC card in 'Initial' status",constants.QS_SEARCHGROUP_FINANCIAL_GIFT, "greencardSerialNumber","1732175529", gcActionsInital()},
//                {"Verify the correct card actions display for a GC card in 'Replacement Requested' status",constants.QS_SEARCHGROUP_FINANCIAL_GIFT, "greencardSerialNumber","5284513710\n", gcActionsRR()},
//                {"Verify the correct card actions display for a GC card in 'Active' status",constants.QS_SEARCHGROUP_FINANCIAL_GIFT, "greencardSerialNumber","9100000603", gcActionsActive()},
//                {"Verify the correct card actions display for a GC card in 'Bad Credit' status",constants.QS_SEARCHGROUP_FINANCIAL_GIFT, "greencardSerialNumber","4569590305", gcActionsBC()},
//                {"Verify the correct card actions display for a GC card in 'Balance Write-off' status",constants.QS_SEARCHGROUP_FINANCIAL_GIFT, "greencardSerialNumber","4569590307", gcActionsBWO()},
//                {"Verify the correct card actions display for a GC card in 'Lost' status",constants.QS_SEARCHGROUP_FINANCIAL_GIFT, "greencardSerialNumber","1732131507", gcActionsLost()},
//                {"Verify the correct card actions display for a GC card in 'Stolen' status",constants.QS_SEARCHGROUP_FINANCIAL_GIFT, "greencardSerialNumber","5210984235", gcActionsStolen()},
//                {"Verify the correct card actions display for a GC card in 'Expired' status",constants.QS_SEARCHGROUP_FINANCIAL_GIFT, "greencardSerialNumber","5210984250", gcActionsExpired()},
//                {"Verify the correct card actions display for a GC card in 'On Hold' status",constants.QS_SEARCHGROUP_FINANCIAL_GIFT, "greencardSerialNumber","5210984268", gcActionsChangeStatusOnly()},
//                {"Verify the correct card actions display for a GC card in 'Frauds Watch' status",constants.QS_SEARCHGROUP_FINANCIAL_GIFT, "greencardSerialNumber","5210984268", gcActionsChangeStatusOnly()},
//                {"Verify the correct card actions display for a GC card in 'Deactivate' status",constants.QS_SEARCHGROUP_FINANCIAL_GIFT, "greencardSerialNumber","5210984198", gcActionsDeactive()},
//                {"Verify the correct card actions display for a GC card in 'Balance Transferred' status",constants.QS_SEARCHGROUP_FINANCIAL_GIFT, "greencardSerialNumber","2162980890\n", gcActionsChangeStatusOnly()},
//                {"Verify the correct card actions display for a GC card in 'Consumed In FCMS' status",constants.QS_SEARCHGROUP_FINANCIAL_GIFT, "greencardSerialNumber","4642613113", gcActionsChangeStatusOnly()},
//                {"Verify the correct card actions display for a GC card in 'Hot Card' status",constants.QS_SEARCHGROUP_FINANCIAL_GIFT, "greencardSerialNumber","4647361910", gcActionsChangeStatusOnly()},
//                {"Verify the correct card actions display for a GC card in 'OFAC Failed' status",constants.QS_SEARCHGROUP_FINANCIAL_GIFT, "greencardSerialNumber","4647361828", gcActionsChangeStatusOnly()},
//                {"Verify the correct card actions display for a GC card in 'On Hold - Negative Balance' status",constants.QS_SEARCHGROUP_FINANCIAL_GIFT, "greencardSerialNumber","2162980760", gcActionsChangeStatusOnly()},
//        };
//    }
//    private  List<String> gcActionsInital() {
//        List<String> gcActionsRR = new ArrayList<String>();
//        gcActionsRR.add("Adjust Balance");
//        gcActionsRR.add("Activate Card");
//        gcActionsRR.add("Change Status");
//        gcActionsRR.add("Replace Card");
//        return gcActionsRR;
//    }
//    private  List<String> gcActionsBWO() {
//        List<String> gcActionsBWO = new ArrayList<String>();
//        gcActionsBWO.add("Change Status");
//        return gcActionsBWO;
//    }
//    private  List<String> gcActionsRR() {
//        List<String> gcActionsRR = new ArrayList<String>();
//        gcActionsRR.add("Activate Card");
//        gcActionsRR.add("Change Status");
//        gcActionsRR.add("Replace Card");
//        return gcActionsRR;
//    }
//    private  List<String> gcActionsBC() {
//        List<String> gcActionsBC = new ArrayList<String>();
//        gcActionsBC.add("Change Status");
//        gcActionsBC.add("Merchandise Release");
//        return gcActionsBC;
//    }
//    private  List<String> gcActionsActive() {
//        List<String> gcActionsActive = new ArrayList<String>();
//        gcActionsActive.add("Adjust Balance");
//        gcActionsActive.add("C2C Transfer");
//        gcActionsActive.add("Change Status");
//        gcActionsActive.add("Replace Card");
//        return gcActionsActive;
//    }
//    private  List<String> gcActionsInitial() {
//        List<String> gcActionsInitial = new ArrayList<String>();
//        gcActionsInitial.add("Activate Card");
//        gcActionsInitial.add("Change Status");
//        gcActionsInitial.add("Adjust Balance");
//        return gcActionsInitial;
//    }
//    private  List<String> gcActionsLost() {
//        List<String> gcActionsLost = new ArrayList<String>();
//        gcActionsLost.add("Change Status");
//        gcActionsLost.add("Replace Card");
//        return gcActionsLost;
//    }
//    private  List<String> gcActionsStolen() {
//        List<String> gcActionsStolen = new ArrayList<String>();
//        gcActionsStolen.add("Change Status");
//        gcActionsStolen.add("Replace Card");
//        return gcActionsStolen;
//    }
//    private  List<String> gcActionsOnHold() {
//        List<String> gcActionsOnHold = new ArrayList<String>();
//        gcActionsOnHold.add("Change Status");
//        return gcActionsOnHold;
//    }
//    private  List<String> gcActionsExpired() {
//        List<String> gcActionsExpired = new ArrayList<String>();
//        gcActionsExpired.add("Adjust Balance");
//        gcActionsExpired.add("Change Status");
//        gcActionsExpired.add("Replace Card");
//        return gcActionsExpired;
//    }
//    private  List<String> gcActionsDeactive() {
//        List<String> gcActionsDeactive = new ArrayList<String>();
//        gcActionsDeactive.add("Adjust Balance");
//        gcActionsDeactive.add("Change Status");
//        return gcActionsDeactive;
//    }
//    private  List<String> gcActionsChangeStatusOnly() {
//        List<String> gcActionsChangeStatusOnly = new ArrayList<String>();
//        gcActionsChangeStatusOnly.add("Change Status");
//        return gcActionsChangeStatusOnly;
//    }
//
//
//}
//
