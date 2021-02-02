//package com.incomm.cca.qa.functional;
//
//import org.openqa.selenium.By;
//import org.openqa.selenium.WebElement;
//import org.openqa.selenium.support.ui.ExpectedConditions;
//import org.testng.annotations.DataProvider;
//import org.testng.annotations.Test;
//
//import java.util.Map;
//
//import static org.hamcrest.MatcherAssert.assertThat;
//import static org.hamcrest.Matchers.equalTo;
//import static org.hamcrest.Matchers.is;
//
///**
// * User: mgalloway
// * Date: 3/26/13
// * Time: 9:46 AM
// */
//public class NewCallSearchCardFT extends BaseFT {
//
//    final private String ASSIGNMENT_ID = "6165f252-b3db-42e7-9647-a20a00d5232b";
//    // This comes from Enterprise Tester's Execution Set URI for the given automated test class
//
//    @Test(groups = {"version-2.0.0", "new_call", "product", "search"}, dataProvider = "pins",  enabled = false)
//    public void testNewCallCardSearchPin(String pin) {
//
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.search("PIN", pin);
//        newCallSearch.autoAddTransitionWait();
//        newCallSearch.toggleSearch();
//        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id(newCallSearch.SEARCH_CARD_RESULTS_FOR)));
//        assertThat("Results message", newCallSearch.getSearchCardResultsFor(), is(equalTo(String.format(newCallSearch.RESULTS_MESSAGE, newCallSearch.getSearchResultCount(), "PIN", pin))));
//        assertThat("Results count", newCallSearch.getSearchResultCount(), is(equalTo(1)));
//        Map<String, WebElement> card = newCallSearch.getSingleSearchResultCard(0);
//        assertThat("Results contain expected product", card.get("pin").getText(), is(equalTo(pin)));
//
//    }
//
//    @Test(groups = {"version-2.0.0", "new_call", "product", "search", "card-search"}, dataProvider = "serialNumbers",  enabled = false)
//    public void testNewCallCardSearchSerialNumber(String serialNumber) {
//
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.search("Serial #", serialNumber);
//        newCallSearch.autoAddTransitionWait();
//        newCallSearch.toggleSearch();
//        assertThat("Results message", newCallSearch.getSearchCardResultsFor(), is(equalTo(String.format(newCallSearch.RESULTS_MESSAGE, newCallSearch.getSearchResultCount(), "Serial #", serialNumber))));
//        assertThat("Results count", newCallSearch.getSearchResultCount(), is(equalTo(1)));
//        Map<String, WebElement> card = newCallSearch.getSingleSearchResultCard(0);
//        assertThat("Results contain expected product", card.get("serialNumber").getText(), is(equalTo(serialNumber)));
//
//    }
//
//    @Test(groups = {"version-2.0.0", "new_call", "product", "search"}, dataProvider = "van16s",  enabled = false)
//    public void testNewCallCardSearchVan16(String van16, String pin) {
//
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.search("Account # (VAN16)", van16);
//        newCallSearch.autoAddTransitionWait();
//        newCallSearch.toggleSearch();
//        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id(newCallSearch.SEARCH_CARD_RESULTS_FOR)));
//        assertThat("Results message", newCallSearch.getSearchCardResultsFor(), is(equalTo(String.format(newCallSearch.RESULTS_MESSAGE, newCallSearch.getSearchResultCount(), "Account # (VAN16)", van16))));
//        assertThat("Results count", newCallSearch.getSearchResultCount(), is(equalTo(1)));
//        Map<String, WebElement> card = newCallSearch.getSingleSearchResultCard(0);
//        assertThat("Results contain expected product", card.get("pin").getText(), is(equalTo(pin)));
//
//    }
//
//    @Test(groups = {"version-2.0.0", "new_call", "product", "search"},  enabled = false)
//    public void testNewCallCardSearchResultRetained() {
//
//        String pin = "117821408569869";
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.search("PIN", pin);
//        newCallSearch.autoAddTransitionWait();
//        newCallSearch.toggleSearch();
//        assertThat("Search Results Message Retained", newCallSearch.getSearchCardResultsFor(), is(equalTo(String.format(newCallSearch.RESULTS_MESSAGE, newCallSearch.getSearchResultCount(), "PIN", pin))));
//        assertThat("Search Results Retained", newCallSearch.getSearchResultCount(), is(1));
//
//    }
//
//    @DataProvider(name = "pins")
//    private Object[][] pins() {
//        return new Object[][]{
//                {"117821408569869"},
//                {"692661790520196"}
//        };
//    }
//
//    @DataProvider(name = "serialNumbers")
//    private Object[][] serialNumbers() {
//        return new Object[][]{
//                {"3281606392"},
//                {"104792251"}
//        };
//    }
//
//    @DataProvider(name = "van16s")
//    private Object[][] van16s() {
//        return new Object[][]{
//                {"5049989429219583", "117821408569869"},
//                {"5049989580310924", "692661790520196"}
//        };
//    }
//
//}
