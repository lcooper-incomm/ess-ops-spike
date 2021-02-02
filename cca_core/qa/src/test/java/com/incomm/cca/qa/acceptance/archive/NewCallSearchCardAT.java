//package com.incomm.cca.qa.acceptance;
//
//import com.incomm.cca.qa.functional.BaseFT;
//import org.openqa.selenium.By;
//import org.openqa.selenium.WebElement;
//import org.openqa.selenium.support.ui.ExpectedConditions;
//import org.testng.annotations.Test;
//
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Map;
//
//import static org.hamcrest.MatcherAssert.assertThat;
//import static org.hamcrest.Matchers.*;
//
///**
// * New Call Search Card (Product) Acceptance Tests
// * User: mgalloway
// * Date: 7/25/13
// * Time: 9:29 AM
// * To change this template use File | Settings | File Templates.
// */
//public class NewCallSearchCardAT extends BaseFT {
//
//    final private String ASSIGNMENT_ID = "406f33a2-635a-48bc-ac2f-a20a00cda2ff";
//    // This comes from Enterprise Tester's Execution Set URI for the given automated test class
//
//    @Test(groups = {"version-2.0.0", "in-progress", "new_call", "product", "search"},  enabled = false)
//    public void testNewCallCardSearchProductTypeOptions() {
//
//        nav.signin();
//        nav.navigateToSearch();
//        // Get all the search type options
//        List<WebElement> actual = newCallSearch.getSearchProductTypeOptions();
//        // Get all the options text
//        List<String> options = new ArrayList<>();
//        for(WebElement ele : actual) {
//            options.add(ele.getText());
//        }
//        // Set all the expected options (these are not stored in the database)
//        List<String> expectedStrings = new ArrayList<>();
//        expectedStrings.add("PIN");
//        expectedStrings.add("Serial #");
//        expectedStrings.add("Account # (VAN16)");
//        expectedStrings.add("Transaction #");
//        // Validate each expected option is available
//        assertThat("Search Type: Size", actual.size(), is(equalTo(4)));
//        for(String expected : expectedStrings) {
//            assertThat("Search Type: " + expected, options.contains(expected), is(true));
//        }
//
//    }
//
//    @Test(groups = {"version-2.0.0", "in-progress", "new_call", "product", "search"},  enabled = false)
//    public void testNewCallCardSearchNoResults() {
//
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.search("PIN", "0");
//        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id(newCallSearch.SEARCH_CARD_RESULTS_MESSAGE_NO_RESULTS)));
//        assertThat(newCallSearch.getCardSearchNoResultsMessage(), is(equalTo(String.format(newCallSearch.NO_RESULTS_MESSAGE, "PIN", "0"))));
//
//    }
//
//    @Test(groups = {"version-2.0.0", "in-progress", "new_call", "product", "search", "card-search"},  enabled = false)
//    public void testNewCallCardSearchSingleResultAutoDisplayProduct() {
//
//        String pin = "117821408569869";
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.search("PIN", pin);
//        newCallSearch.autoAddTransitionWait();
//        assertThat("Search is collapsed", newCallSearch.isSearchDisplayed(), is(false));
//        assertThat("Product Details are displayed", newCallSearch.isProductDisplayed(), is(true));
//
//    }
//
//    @Test(groups = {"version-2.0.0", "in-progress", "product", "new_call", "search"},  enabled = false)
//    public void testNewCallCardSearchResultSingleResultAutoAdd() {
//
//        String pin = "117821408569869";
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.search("PIN", pin);
//        newCallSearch.autoAddTransitionWait();
//        newCallSearch.toggleSearch();
////        String callId = callDetails.getNewCallId();
////        Map<String, Object> call = transactionUtil.getCall(callId);
////        String callDetailId = call.get("call_detail_id").toString();
//        Map<String, WebElement> card = newCallSearch.getSingleSearchResultCard(0);
////        assertThat("Call Details has Card Associated", transactionUtil.getCallDetailsById(callDetailId).get("product_serial_number").toString(), is(equalTo(card.get("serialNumber").getText())));
//
//    }
//
//    @Test(groups = {"version-2.4.0", "in-progress", "product", "new_call", "search"},  enabled = false)
//    public void testNewCallCardSearchMultipleResult() {
//
//        String van16 = "5049984363196541";
//        String fakeVan16 = "0000000585996201";
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.search("Account # (VAN16)", van16);
//        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id(newCallSearch.SEARCH_CARD_RESULTS_FOR)));
//        assertThat("Search Result returns two products", newCallSearch.getSearchCardResultsFor(), is(equalTo("2 result(s) for Account # (VAN16): 5049984363196541")));
//        assertThat("Search Results card count is two", newCallSearch.getSearchResultCount(), is(2));
//
//        Map<String, WebElement> card1 = newCallSearch.getSingleSearchResultCard(0);
//        assertThat("Search Result [0] van16", card1.get("accountNumber").getText(), is(equalTo(van16)));
//
//        Map<String, WebElement> card2 = newCallSearch.getSingleSearchResultCard(1);
//        assertThat("Search Result [1] fake van16", card2.get("accountNumber").getText(), is(equalTo(fakeVan16)));
//
//    }
//
//    @Test(groups = {"version-2.0.0", "in-progress", "product", "new_call", "search"},  enabled = false)
//    public void testNewCallCardSearchResultCardSummary() {
//
//        String pin = "117821408569869";
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.search("PIN", pin);
//        newCallSearch.autoAddTransitionWait();
//        newCallSearch.toggleSearch();
//        Map<String, WebElement> card = newCallSearch.getSingleSearchResultCard(0);
//        assertThat("Platform Vendor", card.get("platformVendor").getText(), is(equalToIgnoringCase("Incomm: TracFone")));
//        assertThat("UPC", card.get("upc").getText(), is(equalTo("616960037538")));
//        assertThat("SN", card.get("serialNumber").getText(), is(equalTo("3281606392")));
//        assertThat("Account Number", card.get("accountNumber").getText(), is(equalTo("5049989429219583")));
//        assertThat("PIN", card.get("pin").getText(), is(equalTo(pin)));
//        assertThat("Product Type", card.get("productType").getText(), is(equalToIgnoringCase("7000 - Wireless Replenishment")));
//        assertThat("Amount", card.get("amount").getText(), is(equalTo("$19.99")));
//
//    }
//
//}
