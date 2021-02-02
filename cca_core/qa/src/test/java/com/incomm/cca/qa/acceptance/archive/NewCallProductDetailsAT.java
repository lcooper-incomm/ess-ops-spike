//package com.incomm.cca.qa.acceptance;
//
//import com.incomm.cca.qa.functional.BaseFT;
//import org.openqa.selenium.By;
//import org.openqa.selenium.support.ui.ExpectedConditions;
//import org.testng.annotations.Test;
//
//import static org.hamcrest.MatcherAssert.assertThat;
//import static org.hamcrest.Matchers.*;
//
///**
// * New Call Product Details Acceptance Tests
// * User: mgalloway
// * Date: 7/25/13
// * Time: 9:25 AM
// */
//public class NewCallProductDetailsAT extends BaseFT {
//
//    final private String ASSIGNMENT_ID = "e9e9f45f-a598-4467-8d47-a20a00cd14c9";
//    // This comes from Enterprise Tester's Execution Set URI for the given automated test class
//
//    @Test(groups = {"version-2.0.0", "in-progress", "new_call", "details"},  enabled = false)
//    public void testNewCallProductDetailsCardSummary() {
//
//        String pin = "117821408569869";
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.search("PIN", pin);
//        newCallSearch.autoAddTransitionWait();
//        String platformVendor = newCallProductDetails.getSelectedCardPlatformVendor();
//        String productType = newCallProductDetails.getSelectedCardProductType();
//        String amount = newCallProductDetails.getSelectedCardAmount();
//        assertThat("Selected Card [" + pin + "] Platform & Vendor", platformVendor, is(equalToIgnoringCase("InComm: TracFone")));
//        assertThat("Selected Card [" + pin + "] Product Type", productType, is(equalToIgnoringCase("7000 - Wireless Replenishment")));
//        assertThat("Selected Card [" + pin + "] Amount", amount, is(equalToIgnoringCase("$19.99 (USA Dollars)")));
//
//    }
//
//    @Test(groups = {"version-2.0.0", "in-progress", "new_call", "details"},  enabled = false)
//    public void testNewCallProductDetailsTable() {
//
//        String expectedPin = "63460653203267";
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.search("PIN", expectedPin);
//        newCallSearch.autoAddTransitionWait();
//        String cardGroup = newCallProductDetails.getSelectedCardGroup();
//        String inventoryDate = newCallProductDetails.getSelectedCardInventoryDate();
//        String accountNumber = newCallProductDetails.getSelectedCardAccountNumber();
//        String serialNumber = newCallProductDetails.getSelectedCardSerialNumber();
//        String actualPin = newCallProductDetails.getSelectedCardPin();
//        String upc = newCallProductDetails.getSelectedCardUpc();
//        String min = newCallProductDetails.getSelectedCardMin();
//        String cardOwner = newCallProductDetails.getSelectedCardCardOwner();
//        assertThat("Selected Card [" + expectedPin + "] Table row count", newCallProductDetails.getSelectedCardDetailsTableRows().size(), is(9));
//        assertThat("Selected Card [" + expectedPin + "] Card Group", cardGroup, is(equalToIgnoringCase("8740 - GENERIC Boost Select Denom Recharge")));
//        assertThat("Selected Card [" + expectedPin + "] Inventory Date", inventoryDate, is(equalToIgnoringCase("Aug 28, 2009 2:43:00 AM EDT")));
//        assertThat("Selected Card [" + expectedPin + "] Account Number (VAN16)", accountNumber, is(equalToIgnoringCase("5049986995585322")));
//        assertThat("Selected Card [" + expectedPin + "] Serial Number", serialNumber, is(equalToIgnoringCase("1903955673")));
//        assertThat("Selected Card [" + expectedPin + "] Actual Pin", actualPin, is(equalToIgnoringCase(expectedPin)));
//        assertThat("Selected Card [" + expectedPin + "] UPC", upc, is(equalToIgnoringCase("851427002593")));
//        assertThat("Selected Card [" + expectedPin + "] Redeemed for MIN", min, is(equalToIgnoringCase("2132161042")));
//        assertThat("Selected Card [" + expectedPin + "] Card Owner", cardOwner, is(equalToIgnoringCase("Merchant Dollar General")));
//
//    }
//
//    @Test(groups = {"version-2.4.0", "in-progress", "new_call", "details"},  enabled = false)
//    public void testNewCallMultipleProductsResult() {
//
//        String van16 = "5049984363196541";
//        String fakeVan16 = "0000000585996201";
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.search("Account # (VAN16)", van16);
//        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id(newCallSearch.SEARCH_CARD_RESULTS_FOR)));
//        assertThat("Two Products Returned for [" + van16 + "] Result count", newCallSearch.getSearchResultCount(), is(equalTo(2)));
//        assertThat("Two Products Returned for [" + van16 + "] Result message", newCallSearch.getSearchCardResultsFor(), is(equalTo(String.format(newCallSearch.RESULTS_MESSAGE, 2, "Account # (VAN16)", van16))));
//        assertThat("Two Products Returned for [" + van16 + "] 1st card", newCallSearch.getSingleSearchResultCard(0).get("accountNumber").getText(), is(equalTo(van16)));
//        assertThat("Two Products Returned for [" + van16 + "] 2nd card", newCallSearch.getSingleSearchResultCard(1).get("accountNumber").getText(), is(equalTo(fakeVan16)));
//
//    }
//
//    @Test(groups = {"version-2.4.0", "in-progress", "new_call", "details"},  enabled = false)
//    public void testNewCallMultipleProductsResultAddToCall() {
//
//        String van16 = "5049984363196541";
//        String fakeVan16 = "0000000585996201";
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.search("Account # (VAN16)", van16);
//        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id(newCallSearch.SEARCH_CARD_RESULTS_FOR)));
//        newCallSearch.getSingleSearchResultCard(0).get("add").click();
//        newCallSearch.autoAddTransitionWait();
//        String actualVan16 = newCallProductDetails.getSelectedCardAccountNumber();
//        assertThat("Selected Card [" + van16 + "] Van16", actualVan16, is(equalTo(van16)));
//        // Go back to search results and add the other product
//        newCallSearch.toggleSearch();
//        newCallSearch.getSingleSearchResultCard(1).get("add").click();
//        newCallSearch.autoAddTransitionWait();
//        String actualFakeVan16 = newCallProductDetails.getSelectedCardAccountNumber();
//        assertThat("Selected Card [" + van16 + "] Van16", actualFakeVan16, is(equalTo(fakeVan16)));
//
//    }
//
//}
