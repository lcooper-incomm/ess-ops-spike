//package com.incomm.cca.qa.acceptance;
//
//import com.incomm.cca.qa.functional.BaseFT;
//import org.openqa.selenium.By;
//import org.openqa.selenium.WebElement;
//import org.openqa.selenium.support.ui.ExpectedConditions;
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
// * Date: 12/30/13
// * Time: 11:33 AM
// */
//public class NewCallExportTransactionsAT extends BaseFT {
//
//    final private String ASSIGNMENT_ID = "ae495e23-5921-4151-9089-a2a40104535c";
//    // This comes from Enterprise Tester's Execution Set URI for the given automated test class
//
//    @Test(groups = {"version-2.4.0", "in-progress", "transaction", "export"}, dataProvider = "productLocation", enabled = false)
//    public void testNoTransactionsCheckBoxes(String searchType, String noTransactionsEntity, String validEntity) {
//
//        //GIVEN a product or location is being viewed
//        nav.signin();
//        nav.navigateToSearch();
//        if(searchType.equals("PRODUCT")) {
//            newCallSearch.search("PIN", noTransactionsEntity);
//            newCallSearch.autoAddTransitionWait();
//            //WHEN no transaction history results have been returned
//            assertThat("Transaction History is Empty", newCallProductHistory.isCurrentTransactionHistoryEmpty(), is(true));
//        }
//        if(searchType.equals("LOCATION")) {
//            newCallSearch.toggleLocationSearch();
//            newCallSearch.search("Name", noTransactionsEntity);
//            newCallSearch.autoAddTransitionWait();
//            //WHEN no transaction history results have been returned
//            assertThat("Transaction History is Empty", newCallLocationHistory.isCurrentTransactionHistoryEmpty(), is(true));
//        }
//
//        //THEN the "no results found" message is displayed normally AND no checkboxes
//        assertThat("Check 'All' Transactions Check Box is not available", export.isCheckAllDisplayed(searchType), is(false));
//
//    }
//
//    @Test(groups = {"version-2.4.0", "in-progress", "transaction", "export"}, dataProvider = "productLocation", enabled = false)
//    public void testTransactionsCheckBoxes(String searchType, String noTransactionsEntity, String validEntity) {
//
//        //GIVEN a product or location is being viewed
//        nav.signin();
//        nav.navigateToSearch();
//        List<WebElement> transactions = null;
//        if(searchType.equals("PRODUCT")) {
//            newCallSearch.search("Serial #", validEntity);
//            newCallSearch.autoAddTransitionWait();
//            //WHEN no transaction history results have been returned
//            assertThat("Transaction History is Empty", newCallProductHistory.isCurrentTransactionHistoryEmpty(), is(false));
//            //THEN the Select All checkbox is enabled
//            assertThat("Export ALL Checkbox Displayed", export.isCheckAllDisplayed(searchType), is(true));
//            transactions = newCallProductHistory.getAllTransactions();
//        }
//        if(searchType.equals("LOCATION")) {
//            newCallSearch.toggleLocationSearch();
//            newCallSearch.search("Name", validEntity);
//            newCallSearch.autoAddTransitionWait();
//            //WHEN no transaction history results have been returned
//            assertThat("Transaction History is Empty", newCallLocationHistory.isCurrentTransactionHistoryEmpty(), is(false));
//            //THEN the Select All checkbox is enabled
//            assertThat("Export ALL Checkbox Displayed", export.isCheckAllDisplayed(searchType), is(true));
//            transactions = newCallLocationHistory.getAllTransactions();
//        }
//
//        //AND every transaction history item has a corresponding (and enabled) checkbox
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
//            assertThat("Transaction ID [" + fields.get("id") + "] Has a Export Check Box", fields.get("selected").isDisplayed(), is(true));
//
//        }
//
//    }
//
//    @Test(groups = {"version-2.4.0", "in-progress", "transaction", "export"}, dataProvider = "productLocation", enabled = false)
//    public void testSelectAllTransactions(String searchType, String noTransactionsEntity, String validEntity) {
//
//        //GIVEN a product or location is being viewed
//        nav.signin();
//        nav.navigateToSearch();
//        List<WebElement> transactions = null;
//        if(searchType.equals("PRODUCT")) {
//            newCallSearch.search("Serial #", validEntity);
//            newCallSearch.autoAddTransitionWait();
//            //AND transaction history results have been returned
//            assertThat("Transaction History is Empty", newCallProductHistory.isCurrentTransactionHistoryEmpty(), is(false));
//            //WHEN a user clicks the Select All checkbox
//            assertThat("Check All Transactions", export.exportCheckAll(searchType), is(true));
//            transactions = newCallProductHistory.getAllTransactions();
//        }
//        if(searchType.equals("LOCATION")) {
//            newCallSearch.toggleLocationSearch();
//            newCallSearch.search("Name", validEntity);
//            newCallSearch.autoAddTransitionWait();
//            //AND transaction history results have been returned
//            assertThat("Transaction History is Empty", newCallLocationHistory.isCurrentTransactionHistoryEmpty(), is(false));
//            //WHEN a user clicks the Select All checkbox
//            assertThat("Check All Transactions", export.exportCheckAll(searchType), is(true));
//            transactions = newCallLocationHistory.getAllTransactions();
//        }
//
//        //THEN all visible transaction history items are selected (denoted by a checked checkbox corresponding to the item)
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
//            assertThat("Transaction ID [" + fields.get("id").getText() + "] is selected", fields.get("selected").isSelected(), is(true));
//
//        }
//
//    }
//
//    @Test(groups = {"version-2.4.0", "in-progress", "transaction", "export"}, dataProvider = "productLocation", enabled = false)
//    public void testSelectAllTransactionsNextPage(String searchType, String noTransactionsEntity, String validEntity) {
//
//        //GIVEN a product or location is being viewed
//        nav.signin();
//        nav.navigateToSearch();
//        List<WebElement> transactions = null;
//        if(searchType.equals("PRODUCT")) {
//            newCallSearch.search("Serial #", validEntity);
//            newCallSearch.autoAddTransitionWait();
//            //AND no transaction history results have been returned
//            assertThat("Transaction History is Empty", newCallProductHistory.isCurrentTransactionHistoryEmpty(), is(false));
//            //AND a user clicks the Select All checkbox
//            assertThat("Check All Transactions", export.exportCheckAll(searchType), is(true));
//            //WHEN a user clicks to load the next page of transaction history results
//            newCallProductHistory.clickPaginationProductTransactionsTopNext("2");
//            //THEN the next page loads with all transaction history items selected as well
//            transactions = newCallProductHistory.getAllTransactions();
//        }
//        if(searchType.equals("LOCATION")) {
//            newCallSearch.toggleLocationSearch();
//            newCallSearch.search("Name", validEntity);
//            newCallSearch.autoAddTransitionWait();
//            //AND no transaction history results have been returned
//            assertThat("Transaction History is Empty", newCallLocationHistory.isCurrentTransactionHistoryEmpty(), is(false));
//            //AND a user clicks the Select All checkbox
//            assertThat("Check All Transactions", export.exportCheckAll(searchType), is(true));
//            //WHEN a user clicks to load the next page of transaction history results
//            newCallLocationHistory.clickPaginationLocationTransactionsTopNext("2");
//            //THEN the next page loads with all transaction history items selected as well
//            transactions = newCallLocationHistory.getAllTransactions();
//        }
//
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
//            assertThat("Transaction ID [" + fields.get("id") + "] is selected", fields.get("selected").isSelected(), is(true));
//
//        }
//
//    }
//
//    @Test(groups = {"version-2.4.0", "in-progress", "transaction", "export"}, dataProvider = "productLocation", enabled = false)
//    public void testSelectMultipleTransactions(String searchType, String noTransactionsEntity, String validEntity) {
//
//        nav.signin();
//        nav.navigateToSearch();
//        Map<String, WebElement> transaction1 = null;
//        Map<String, WebElement> transaction2 = null;
//        if(searchType.equals("PRODUCT")) {
//            newCallSearch.search("Serial #", validEntity);
//            newCallSearch.autoAddTransitionWait();
//            //WHEN no transaction history results have been returned
//            assertThat("Transaction History is Empty", newCallProductHistory.isCurrentTransactionHistoryEmpty(), is(false));
//            transaction1 = newCallProductHistory.getSelectedCardTransactionHistoryItem(0);
//            transaction2 = newCallProductHistory.getSelectedCardTransactionHistoryItem(4);
//        }
//        if(searchType.equals("LOCATION")) {
//            newCallSearch.toggleLocationSearch();
//            newCallSearch.search("Name", validEntity);
//            newCallSearch.autoAddTransitionWait();
//            //WHEN no transaction history results have been returned
//            assertThat("Transaction History is Empty", newCallLocationHistory.isCurrentTransactionHistoryEmpty(), is(false));
//            transaction1 = newCallLocationHistory.getSelectedLocationTransactionHistoryItem(0);
//            transaction2 = newCallLocationHistory.getSelectedLocationTransactionHistoryItem(4);
//        }
//
//        transaction1.get("selected").click();
//        transaction2.get("selected").click();
//        assertThat("Transaction ID [" + transaction1.get("id") + "] is selected", transaction1.get("selected").isSelected(), is(true));
//        assertThat("Transaction ID [" + transaction2.get("id") + "] is selected", transaction2.get("selected").isSelected(), is(true));
//
//    }
//
//    @Test(groups = {"version-2.4.0", "in-progress", "transaction", "export"}, dataProvider = "productLocation", enabled = false)
//    public void testSelectMultipleTransactionsNextPreviousPage(String searchType, String noTransactionsEntity, String validEntity) {
//
//        //GIVEN a product or location is being viewed
//        nav.signin();
//        nav.navigateToSearch();
//        if(searchType.equals("PRODUCT")) {
//            newCallSearch.search("Serial #", validEntity);
//            newCallSearch.autoAddTransitionWait();
//            //AND no transaction history results have been returned
//            assertThat("Transaction History is Empty", newCallProductHistory.isCurrentTransactionHistoryEmpty(), is(false));
//            //AND at least one transaction history item has been selected
//            newCallProductHistory.getSelectedCardTransactionHistoryItem(0).get("selected").click();
//            //WHEN a user clicks to load another page of transaction history results
//            //AND clicks another transaction on the second page
//            newCallProductHistory.clickPaginationProductTransactionsTopNext("2");
//            newCallProductHistory.getSelectedCardTransactionHistoryItem(0).get("selected").click();
//            //THEN the selected items are persisted such that the user may navigate freely and view selections on any given page of results without losing the selections
//            newCallProductHistory.clickPaginationProductTransactionsTopPrevious("1");
//            assertThat("Transaction on page one is still selected", newCallProductHistory.getSelectedCardTransactionHistoryItem(0).get("selected").isSelected(), is(true));
//            newCallProductHistory.clickPaginationProductTransactionsTopNext("2");
//            assertThat("Transaction on page two is still selected", newCallProductHistory.getSelectedCardTransactionHistoryItem(0).get("selected").isSelected(), is(true));
//        }
//        if(searchType.equals("LOCATION")) {
//            newCallSearch.toggleLocationSearch();
//            newCallSearch.search("Name", validEntity);
//            newCallSearch.autoAddTransitionWait();
//            //AND no transaction history results have been returned
//            assertThat("Transaction History is Empty", newCallLocationHistory.isCurrentTransactionHistoryEmpty(), is(false));
//            //AND at least one transaction history item has been selected
//            newCallLocationHistory.getSelectedLocationTransactionHistoryItem(0).get("selected").click();
//            //WHEN a user clicks to load another page of transaction history results
//            //AND clicks another transaction on the second page
//            newCallLocationHistory.clickPaginationLocationTransactionsTopNext("2");
//            newCallLocationHistory.getSelectedLocationTransactionHistoryItem(0).get("selected").click();
//            //THEN the selected items are persisted such that the user may navigate freely and view selections on any given page of results without losing the selections
//            newCallLocationHistory.clickPaginationLocationTransactionsTopPrevious("1");
//            assertThat("Transaction on page one is still selected", newCallLocationHistory.getSelectedLocationTransactionHistoryItem(0).get("selected").isSelected(), is(true));
//            newCallLocationHistory.clickPaginationLocationTransactionsTopNext("2");
//            assertThat("Transaction on page two is still selected", newCallLocationHistory.getSelectedLocationTransactionHistoryItem(0).get("selected").isSelected(), is(true));
//        }
//
//    }
//
//    @Test(groups = {"version-2.4.0", "in-progress", "transaction", "export"}, dataProvider = "productLocation", enabled = false)
//    public void testDeselectAllTransactions(String searchType, String noTransactionsEntity, String validEntity) {
//
//        //GIVEN a product or location is being viewed
//        nav.signin();
//        nav.navigateToSearch();
//        List<WebElement> transactions = null;
//        if(searchType.equals("PRODUCT")) {
//            newCallSearch.search("Serial #", validEntity);
//            newCallSearch.autoAddTransitionWait();
//            //AND no transaction history results have been returned
//            assertThat("Transaction History is Empty", newCallProductHistory.isCurrentTransactionHistoryEmpty(), is(false));
//            transactions = newCallProductHistory.getAllTransactions();
//        }
//        if(searchType.equals("LOCATION")) {
//            newCallSearch.toggleLocationSearch();
//            newCallSearch.search("Name", validEntity);
//            newCallSearch.autoAddTransitionWait();
//            //AND no transaction history results have been returned
//            assertThat("Transaction History is Empty", newCallLocationHistory.isCurrentTransactionHistoryEmpty(), is(false));
//            transactions = newCallLocationHistory.getAllTransactions();
//        }
//
//        //AND the Select All checkbox is checked
//        assertThat("Check All Transactions", export.exportCheckAll(searchType), is(true));
//        for(WebElement transaction : transactions) {
//
//            Integer id = Integer.parseInt(transaction.getAttribute("id").substring(transaction.getAttribute("id").length() - 1));
//            Map<String, WebElement> fields = null;
//            if(searchType.equals("PRODUCT")) {
//               fields = newCallProductHistory.getSelectedCardTransactionHistoryItem(id);
//            }
//            if(searchType.equals("LOCATION")) {
//                fields = newCallLocationHistory.getSelectedLocationTransactionHistoryItem(id);
//            }
//            assertThat("Transaction ID [" + fields.get("id") + "] is selected", fields.get("selected").isSelected(), is(true));
//
//        }
//
//        //WHEN a user unchecks the Select All checkbox
//        assertThat("Check All Transactions", export.exportCheckAll(searchType), is(false));
//
//        //THEN all visible transaction history items are deselected
//        List<WebElement> transactionsDeselected = null;
//        if(searchType.equals("PRODUCT")) {
//            transactionsDeselected = newCallProductHistory.getAllTransactions();
//        }
//        if(searchType.equals("LOCATION")) {
//            transactionsDeselected = newCallLocationHistory.getAllTransactions();
//        }
//
//        for(WebElement transaction : transactionsDeselected) {
//
//            Integer id = Integer.parseInt(transaction.getAttribute("id").substring(transaction.getAttribute("id").length() - 1));
//            Map<String, WebElement> fields = null;
//            if(searchType.equals("PRODUCT")) {
//                fields = newCallProductHistory.getSelectedCardTransactionHistoryItem(id);
//            }
//            if(searchType.equals("LOCATION")) {
//                fields = newCallLocationHistory.getSelectedLocationTransactionHistoryItem(id);
//            }
//            assertThat("Transaction ID [" + fields.get("id") + "] is selected", fields.get("selected").isSelected(), is(false));
//
//        }
//
//    }
//
//    @Test(groups = {"version-2.4.0", "in-progress", "transaction", "export"}, dataProvider = "productLocation", enabled = false)
//    public void testDeselectMultipleTransactions(String searchType, String noTransactionsEntity, String validEntity) {
//
//        nav.signin();
//        nav.navigateToSearch();
//        Map<String, WebElement> transaction1 = null;
//        Map<String, WebElement> transaction2 = null;
//        if(searchType.equals("PRODUCT")) {
//            newCallSearch.search("Serial #", validEntity);
//            newCallSearch.autoAddTransitionWait();
//            //WHEN no transaction history results have been returned
//            assertThat("Transaction History is Empty", newCallProductHistory.isCurrentTransactionHistoryEmpty(), is(false));
//            transaction1 = newCallProductHistory.getSelectedCardTransactionHistoryItem(0);
//            transaction2 = newCallProductHistory.getSelectedCardTransactionHistoryItem(4);
//        }
//        if(searchType.equals("LOCATION")) {
//            newCallSearch.toggleLocationSearch();
//            newCallSearch.search("Name", validEntity);
//            newCallSearch.autoAddTransitionWait();
//            //WHEN no transaction history results have been returned
//            assertThat("Transaction History is Empty", newCallLocationHistory.isCurrentTransactionHistoryEmpty(), is(false));
//            transaction1 = newCallLocationHistory.getSelectedLocationTransactionHistoryItem(0);
//            transaction2 = newCallLocationHistory.getSelectedLocationTransactionHistoryItem(4);
//        }
//
//        // Select two transactions
//        transaction1.get("selected").click();
//        transaction2.get("selected").click();
//        assertThat("Transaction ID [" + transaction1.get("id") + "] is selected", transaction1.get("selected").isSelected(), is(true));
//        assertThat("Transaction ID [" + transaction2.get("id") + "] is selected", transaction2.get("selected").isSelected(), is(true));
//        // Deselect the same two transactions
//        transaction1.get("selected").click();
//        transaction2.get("selected").click();
//        assertThat("Transaction ID [" + transaction1.get("id") + "] is selected", transaction1.get("selected").isSelected(), is(false));
//        assertThat("Transaction ID [" + transaction2.get("id") + "] is selected", transaction2.get("selected").isSelected(), is(false));
//
//    }
//
//    @Test(groups = {"version-2.4.0", "in-progress", "transaction", "export", "product"}, dataProvider = "productLocation", enabled = false)
//    public void testExportActionsDisabled(String searchType, String noTransactionsEntity, String validEntity) {
//
//        nav.signin();
//        nav.navigateToSearch();
//        WebElement transactionCheckBox = null;
//        if(searchType.equals("PRODUCT")) {
//            newCallSearch.search("Serial #", validEntity);
//            newCallSearch.autoAddTransitionWait();
//            assertThat("Transaction History is Empty", newCallProductHistory.isCurrentTransactionHistoryEmpty(), is(false));
//            transactionCheckBox = newCallProductHistory.getSelectedCardTransactionHistoryItem(0).get("selected");
//        }
//        if(searchType.equals("LOCATION")) {
//            newCallSearch.toggleLocationSearch();
//            newCallSearch.search("Name", validEntity);
//            newCallSearch.autoAddTransitionWait();
//            assertThat("Transaction History is Empty", newCallLocationHistory.isCurrentTransactionHistoryEmpty(), is(false));
//            transactionCheckBox = newCallLocationHistory.getSelectedLocationTransactionHistoryItem(0).get("selected");
//        }
//
//        assertThat("Export Actions Disabled Without any Transactions Selected", export.isExportActionsEnabled(searchType), is(false));
//        transactionCheckBox.click();
//        assertThat("Export Actions Enabled With one Transactions Selected", export.isExportActionsEnabled(searchType), is(true));
//        transactionCheckBox.click();
//        assertThat("Export Actions Disabled again after un-checking all Transactions Selected", export.isExportActionsEnabled(searchType), is(false));
//
//    }
//
//    @Test(groups = {"version-2.4.0", "in-progress", "transaction", "export", "product"}, dataProvider = "productLocation", enabled = false)
//    public void testExportActionsEnabled(String searchType, String noTransactionsEntity, String validEntity) {
//
//        nav.signin();
//        nav.navigateToSearch();
//        Map<String, WebElement> transaction = null;
//        if(searchType.equals("PRODUCT")) {
//            newCallSearch.search("Serial #", validEntity);
//            newCallSearch.autoAddTransitionWait();
//            assertThat("Transaction History is Empty", newCallProductHistory.isCurrentTransactionHistoryEmpty(), is(false));
//            wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(By.name(newCallProductHistory.TRANSACTION_HISTORY)));
//            transaction = newCallProductHistory.getSelectedCardTransactionHistoryItem(0);
//        }
//        if(searchType.equals("LOCATION")) {
//            newCallSearch.toggleLocationSearch();
//            newCallSearch.search("Name", validEntity);
//            newCallSearch.autoAddTransitionWait();
//            assertThat("Transaction History is Empty", newCallLocationHistory.isCurrentTransactionHistoryEmpty(), is(false));
//            wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(By.name(newCallLocationHistory.TRANSACTION_HISTORY)));
//            transaction = newCallLocationHistory.getSelectedLocationTransactionHistoryItem(0);
//        }
//
//        transaction.get("selected").click();
//        assertThat("Export Actions Enabled With One Transaction Selected", export.isExportActionsEnabled(searchType), is(true));
//
//    }
//
//    @Test(groups = {"version-2.4.0", "in-progress", "transaction", "export", "product"}, dataProvider = "productLocation", enabled = false)
//    public void testExportActionsList(String searchType, String noTransactionsEntity, String validEntity) {
//
//        //GIVEN a product's details are being viewed
//        nav.signin();
//        nav.navigateToSearch();
//        Map<String, WebElement> transaction = null;
//        if(searchType.equals("PRODUCT")) {
//            newCallSearch.search("Serial #", validEntity);
//            newCallSearch.autoAddTransitionWait();
//            //WHEN no transaction history results have been returned
//            assertThat("Transaction History is Empty", newCallProductHistory.isCurrentTransactionHistoryEmpty(), is(false));
//            wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(By.name(newCallProductHistory.TRANSACTION_HISTORY)));
//            // AND at least one transaction history item is selected
//            transaction = newCallProductHistory.getSelectedCardTransactionHistoryItem(0);
//        }
//        if(searchType.equals("LOCATION")) {
//            newCallSearch.toggleLocationSearch();
//            newCallSearch.search("Name", validEntity);
//            newCallSearch.autoAddTransitionWait();
//            //WHEN no transaction history results have been returned
//            assertThat("Transaction History is Empty", newCallLocationHistory.isCurrentTransactionHistoryEmpty(), is(false));
//            wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(By.name(newCallLocationHistory.TRANSACTION_HISTORY)));
//            // AND at least one transaction history item is selected
//            transaction = newCallLocationHistory.getSelectedLocationTransactionHistoryItem(0);
//        }
//
//        transaction.get("selected").click();
//
//        //THEN an Export drop-down menu is enabled
//        assertThat("Export Actions Enabled With One Transaction Selected", export.isExportActionsEnabled(searchType), is(true));
//
//        //AND the drop-down menu contains a To File option when clicked
//        assertThat("Export Actions Contains 'To PDF'", export.getExportActions(searchType).get(0).getText(), is(equalTo("To PDF")));
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
//}
