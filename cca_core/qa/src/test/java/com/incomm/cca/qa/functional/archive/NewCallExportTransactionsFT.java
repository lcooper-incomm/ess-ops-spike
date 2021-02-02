//package com.incomm.cca.qa.functional;
//
//import org.openqa.selenium.WebElement;
//import org.testng.annotations.DataProvider;
//import org.testng.annotations.Test;
//
//import java.util.List;
//import java.util.Map;
//
//import static org.hamcrest.MatcherAssert.assertThat;
//import static org.hamcrest.Matchers.equalTo;
//import static org.hamcrest.Matchers.is;
//
///**
// * User: mgalloway
// * Date: 1/3/14
// * Time: 10:08 AM
// */
//public class NewCallExportTransactionsFT extends BaseFT {
//
//    final private String ASSIGNMENT_ID = "a61559d9-fc7f-495f-a824-a2a800d49a3d";
//    // This comes from Enterprise Tester's Execution Set URI for the given automated test class
//
//
//    @Test(groups = {"version-2.4.0", "transaction", "export"}, dataProvider = "productLocation", enabled = false)
//    public void testNoTransactionsExportActionsHidden(String searchType, String noTransactionsEntity, String validEntity) {
//
//        String expectedPin = "117821408569869";
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.search("PIN", expectedPin);
//        newCallSearch.autoAddTransitionWait();
//        assertThat("Transaction History is Empty", newCallProductHistory.isCurrentTransactionHistoryEmpty(), is(true));
//        assertThat("Export Actions Hidden", export.isExportActionsDisplayed(searchType), is(false));
//
//    }
//
//    @Test(groups = {"version-2.4.0", "transaction", "export"}, enabled = false)
//    public void testExportExceedsTransactionLimit() {
//
//        String locationName = "WMTTSTS01";
//        //GIVEN a product or location is being viewed
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.toggleLocationSearch();
//        newCallSearch.search("Name", locationName);
//        newCallSearch.autoAddTransitionWait();
//        //AND transaction history results have been returned
//        assertThat("Transaction History is Empty", newCallLocationHistory.isCurrentTransactionHistoryEmpty(), is(false));
//        //WHEN a user clicks the Select All checkbox
//        assertThat("Check All Transactions", export.exportCheckAll("LOCATION"), is(true));
//
//        //AND the user clicks export - to file
//        export.exportToFile("LOCATION");
//
//        //THEN the user is presented with a failure to export message due to there being too many transactions (>= 5000) selected
//        assertThat("Export Size Limit Exceeded Warning Modal", export.isExportWarningModalDisplayed(), is(true));
//        assertThat("Export Size Limit Exceeded Warning Message", export.getExportWarningMessage(), is(equalTo("Transaction history export is currently limited to 5000 history records. If you wish to continue, a report will be generated with the most recent 5000 records from your selection. Otherwise, please cancel and filter your selection further.")));
//
//    }
//
//    @Test(groups = {"version-2.4.1", "transaction", "export"}, dataProvider = "productsLocations", enabled = false)
//    public void testExportCheckboxClearedAfterExport(String searchType, String validEntity1, String validEntity2) {
//
//        //GIVEN a product or location is being viewed
//        nav.signin();
//        nav.navigateToSearch();
//        List<WebElement> transactions = null;
//        if(searchType.equals("PRODUCT")) {
//            newCallSearch.search("Serial #", validEntity1);
//            newCallSearch.autoAddTransitionWait();
//            //WHEN no transaction history results have been returned
//            assertThat("Transaction History is Empty", newCallProductHistory.isCurrentTransactionHistoryEmpty(), is(false));
//            //THEN the Select All checkbox is enabled
//            assertThat("Export ALL Checkbox Displayed", export.isCheckAllDisplayed(searchType), is(true));
//            transactions = newCallProductHistory.getAllTransactions();
//        }
//        if(searchType.equals("LOCATION")) {
//            newCallSearch.toggleLocationSearch();
//            newCallSearch.search("Name", validEntity1);
//            newCallSearch.autoAddTransitionWait();
//            //WHEN no transaction history results have been returned
//            assertThat("Transaction History is Empty", newCallLocationHistory.isCurrentTransactionHistoryEmpty(), is(false));
//            //THEN the Select All checkbox is enabled
//            assertThat("Export ALL Checkbox Displayed", export.isCheckAllDisplayed(searchType), is(true));
//            transactions = newCallLocationHistory.getAllTransactions();
//        }
//
//        //WHEN a user clicks the Select All checkbox
//        assertThat("Check All Transactions", export.exportCheckAll(searchType), is(true));
//
//        //AND every transaction history item has been checked
//        for(WebElement transaction : transactions) {
//
//            Integer id = Integer.parseInt(transaction.getAttribute("id").substring(transaction.getAttribute("id").length() - 1));
//            Map<String, WebElement> fields = null;
//            if(searchType.equals("PRODUCT")) {
//                fields = newCallProductHistory.getSelectedCardTransactionHistoryItem(id);
//            }
//            if(searchType.equals("LOCATION")) {
//                fields = newCallLocationHistory.getSelectedLocationTransactionHistoryItem(id);
//            }
//            assertThat("Transaction ID [" + fields.get("id") + "] is Checked", fields.get("selected").isSelected(), is(true));
//
//        }
//
//        //AND the user clicks export - to file
//        export.exportToFile(searchType);
//
//        //THEN the checkboxes are all cleared
//        for(WebElement transaction : transactions) {
//
//            Integer id = Integer.parseInt(transaction.getAttribute("id").substring(transaction.getAttribute("id").length() - 1));
//            Map<String, WebElement> fields = null;
//            if(searchType.equals("PRODUCT")) {
//                fields = newCallProductHistory.getSelectedCardTransactionHistoryItem(id);
//            }
//            if(searchType.equals("LOCATION")) {
//                fields = newCallLocationHistory.getSelectedLocationTransactionHistoryItem(id);
//            }
//            assertThat("Transaction ID [" + fields.get("id") + "] is Checked", fields.get("selected").isSelected(), is(false));
//
//        }
//
//    }
//
//    @Test(groups = {"version-2.4.1", "transaction", "export"}, dataProvider = "productsLocations", enabled = false)
//    public void testExportCheckboxClearedNewLocation(String searchType, String validEntity1, String validEntity2) {
//
//        //GIVEN a product or location is being viewed
//        nav.signin();
//        nav.navigateToSearch();
//        List<WebElement> transactions = null;
//        if(searchType.equals("PRODUCT")) {
//            newCallSearch.search("Serial #", validEntity1);
//            newCallSearch.autoAddTransitionWait();
//            //WHEN no transaction history results have been returned
//            assertThat("Transaction History is Empty", newCallProductHistory.isCurrentTransactionHistoryEmpty(), is(false));
//            //THEN the Select All checkbox is enabled
//            assertThat("Export ALL Checkbox Displayed", export.isCheckAllDisplayed(searchType), is(true));
//            transactions = newCallProductHistory.getAllTransactions();
//        }
//        if(searchType.equals("LOCATION")) {
//            newCallSearch.toggleLocationSearch();
//            newCallSearch.search("Name", validEntity1);
//            newCallSearch.autoAddTransitionWait();
//            //WHEN no transaction history results have been returned
//            assertThat("Transaction History is Empty", newCallLocationHistory.isCurrentTransactionHistoryEmpty(), is(false));
//            //THEN the Select All checkbox is enabled
//            assertThat("Export ALL Checkbox Displayed", export.isCheckAllDisplayed(searchType), is(true));
//            transactions = newCallLocationHistory.getAllTransactions();
//        }
//
//        //WHEN a user clicks the Select All checkbox
//        assertThat("Check All Transactions", export.exportCheckAll(searchType), is(true));
//
//        //AND every transaction history item has been checked
//        for(WebElement transaction : transactions) {
//
//            Integer id = Integer.parseInt(transaction.getAttribute("id").substring(transaction.getAttribute("id").length() - 1));
//            Map<String, WebElement> fields = null;
//            if(searchType.equals("PRODUCT")) {
//                fields = newCallProductHistory.getSelectedCardTransactionHistoryItem(id);
//            }
//            if(searchType.equals("LOCATION")) {
//                fields = newCallLocationHistory.getSelectedLocationTransactionHistoryItem(id);
//            }
//            assertThat("Transaction ID [" + fields.get("id") + "] is Checked", fields.get("selected").isSelected(), is(true));
//
//        }
//
//        //AND the user searches for a different location
//        newCallSearch.toggleSearch();
//        if(searchType.equals("PRODUCT")) {
//            newCallSearch.search("Serial #", validEntity2);
//            newCallSearch.autoAddTransitionWait();
//            //WHEN no transaction history results have been returned
//            assertThat("Transaction History is Empty", newCallProductHistory.isCurrentTransactionHistoryEmpty(), is(false));
//            //THEN the Select All checkbox is enabled
//            assertThat("Export ALL Checkbox Displayed", export.isCheckAllDisplayed(searchType), is(true));
//            transactions = newCallProductHistory.getAllTransactions();
//        }
//        if(searchType.equals("LOCATION")) {
//            newCallSearch.toggleLocationSearch();
//            newCallSearch.search("Name", validEntity2);
//            newCallSearch.autoAddTransitionWait();
//            //WHEN no transaction history results have been returned
//            assertThat("Transaction History is Empty", newCallLocationHistory.isCurrentTransactionHistoryEmpty(), is(false));
//            //THEN the Select All checkbox is enabled
//            assertThat("Export ALL Checkbox Displayed", export.isCheckAllDisplayed(searchType), is(true));
//            transactions = newCallLocationHistory.getAllTransactions();
//        }
//
//        //THEN the checkboxes are all cleared
//        for(WebElement transaction : transactions) {
//
//            Integer id = Integer.parseInt(transaction.getAttribute("id").substring(transaction.getAttribute("id").length() - 1));
//            Map<String, WebElement> fields = null;
//            if(searchType.equals("PRODUCT")) {
//                fields = newCallProductHistory.getSelectedCardTransactionHistoryItem(id);
//            }
//            if(searchType.equals("LOCATION")) {
//                fields = newCallLocationHistory.getSelectedLocationTransactionHistoryItem(id);
//            }
//            assertThat("Transaction ID [" + fields.get("id") + "] is Checked", fields.get("selected").isSelected(), is(false));
//
//        }
//
//    }
//
//    @DataProvider(name = "productLocation")
//    private Object[][] productLocation() {
//        return new Object[][]{
//                {"PRODUCT", "117821408569869", "2367191811"},
//                {"LOCATION", "4062162807 - Velocity Wireless (Walmart)", "0075 - Holiday"}
//        };
//    }
//
//    @DataProvider(name = "productsLocations")
//    private Object[][] productLocations() {
//        return new Object[][]{
//                {"PRODUCT", "193366324", "1903955673"},
//                {"LOCATION", "WMTTSTS01", "0075 - Holiday"}
//        };
//    }
//
//}
