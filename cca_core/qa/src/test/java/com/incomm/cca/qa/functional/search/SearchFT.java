package com.incomm.cca.qa.functional.search;

import com.incomm.cca.qa.functional.BaseFT;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;
import org.xml.sax.SAXException;

import javax.xml.parsers.ParserConfigurationException;
import javax.xml.xpath.XPathExpressionException;
import java.io.IOException;

/**
 * Basic Search functionality not specific to a Card or Location but the search viewport itself
 * User: mgalloway
 * Date: 5/15/13
 * Time: 11:02 AM
 */
public class SearchFT extends BaseFT {

    @Test(groups = {"version-3.0.0", "search"}, dataProvider = "productsNotFound", enabled = false)
    public void productSearchNotFound(String searchType, String searchTerm) {

        //        nav.signin();
        //
        //        search.submit(searchType, searchTerm);
        //        System.out.println("Failure is related to issue CCA-1143");
        //                assertThat("Product not found error message for: " + searchType, search.getNoProductSearchResults(), is(equalTo(search.SEARCH_NO_RESULTS_PRODUCT_MESSAGE)));

    }

    @Test(groups = {"version-3.0.0", "search"}, dataProvider = "locationsNotFound", enabled = false)
    public void locationSearchNotFound(String searchType, String searchTerm) {

        //        nav.signin();
        //
        //        search.submit(searchType, searchTerm);
        //
        //        assertThat("Location not found error message for: " + searchType, search.getNoLocationSearchResults(), is(equalTo(search.SEARCH_NO_RESULTS_LOCATION_MESSAGE)));

    }

    @Test(groups = {"version-3.0.0", "search"}, enabled = false)
    public void tooManySearchTermsMessage() {

        //        nav.signin();
        //
        //        search.submit("Name", "1 2 3 4 5");
        //        assertThat("Too Many Terms Modal Appears", search.isTooManyTermsModalDisplayed(), is(true));
        //        assertThat("Too Many Terms Modal Header", search.getModalHeader(), is(equalTo("Too Many Search Terms")));
        //        assertThat("Too Many Terms Modal Body", search.getModalBody(), containsString("CCA currently supports up to 4 search terms. Your search contains 5 terms. If you continue, your search will be completed with only the first four terms"));

    }

    @Test(groups = {"version-3.0.0", "search"}, enabled = false)
    public void tooManySearchTermsCancel() {

        //        nav.signin();
        //
        //        search.submit("Name", "1 2 3 4 5");
        //        assertThat("Too Many Terms Modal Appears", search.isTooManyTermsModalDisplayed(), is(true));
        //        search.modalCancel();
        //        assertThat("Too Many Terms Modal Appears", search.isTooManyTermsModalDisplayed(), is(false));
        //        assertThat("", search.getSearchIdentifier(), is(equalTo("1 2 3 4 5")));

    }

    @Test(groups = {"version-3.0.0", "search"}, enabled = false)
    public void tooManySearchTermsContinue() {

        //        nav.signin();
        //
        //        search.submit("Name", "1 2 3 4 5");
        //        assertThat("Too Many Terms Modal Appears", search.isTooManyTermsModalDisplayed(), is(true));
        //        assertThat("Click Continue is successful", search.modalContinue(), is(equalTo(true)));
        //        assertThat("", search.getSearchIdentifier(), is(equalTo("1 2 3 4")));

    }

    @Test(groups = {"version-3.0.0", "search"}, enabled = false)
    public void invalidSearchClearsPreviousSearchResults() throws SAXException, ParserConfigurationException, XPathExpressionException, IOException {

        //        nav.signin();

        //        search.submit("VAN16", "5049984363196541");
        //        assertThat("Initial Search Result Report", search.getSearchResultCount(), is(equalTo("0")));
        //        System.out.println("Failure is related to issue CCA-1143");
        //           search.submit("VAN16", "123");
        //        assertThat("Invalid Message", alerts.getAlertErrorMessage(), is(equalTo(search.SEARCH_INVALID_ACCOUNT_SEARCH_TERM_ERROR_MESSAGE)));
        //        assertThat("Previous Search Result Report Cleared", search.getSearchResultCount(), is(equalTo("0")));
        //        assertThat("Previous Search Result Cards Cleared", search.getSearchResultCards().size(), is(equalTo(0)));

    }

    @Test(groups = {"version-3.0.0", "search"}, enabled = false)
    public void locationSearchResultRetained() {

        //        nav.signin();
        //
        //        search.submit("Name", "0075 Holiday");
        //        assertThat("Single result is auto selected", search.autoSelectWait(), is(equalTo(false)));
        //        session.closeSessionDrawer();
        //
        //        assertThat("Search Identifier", search.getSearchIdentifier(), is(equalTo("0075 Holiday")));
        //        assertThat("Result count", search.getSearchResultCards().size(), is(equalTo(1)));
        //        assertThat("Result card", search.getSearchResultLocation(0).get("name"), is(equalTo("0075 - Holiday")));

    }

    @Test(groups = {"version-3.0.0", "search"}, enabled = false)
    public void productSearchResultRetained() {

        //        nav.signin();
        //
        //        search.submit("PIN", "117821408569869");
        //        assertThat("Single result is auto selected", search.autoSelectWait(), is(equalTo(false)));
        //        session.closeSessionDrawer();
        //
        //        assertThat("Search Identifier", search.getSearchIdentifier(), is(equalTo("117821408569869")));
        //        assertThat("Result count", search.getSearchResultCards().size(), is(equalTo(1)));
        //        assertThat("Result card", search.getSearchResultProduct(0).get("pin"), is(equalTo("117821408569869")));

    }

    @Test(groups = {"version-3.0.0", "search"}, enabled = false)
    public void searchPagination() throws Exception {

        //        nav.signin();
        //
        //        search.submit("Name", "walmart");
        //        assertThat("Showing initial 50 results", search.getSearchResultCount(), is(equalTo("50")));
        //        search.showMore();
        //        assertThat("Showing next 50 results", search.getSearchResultCount(), is(equalTo("100")));

    }

    @DataProvider(name = "productsNotFound")
    private Object[][] productsNotFound() {
        return new Object[][]{
                {"PIN", "12345"},
                {"VAN", "12345"},
                {"Serial #", "12345"},
                {"Transaction ID", "12345"}
        };
    }

    @DataProvider(name = "locationsNotFound")
    private Object[][] locationsNotFound() {
        return new Object[][]{
                {"Name", "goofyman"},
                {"Terminal ID", "12345"},
                {"Name", "<123>"}
        };
    }

}
