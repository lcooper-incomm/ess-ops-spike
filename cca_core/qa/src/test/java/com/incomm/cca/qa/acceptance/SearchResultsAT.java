package com.incomm.cca.qa.acceptance;

import com.incomm.cca.qa.functional.BaseFT;
import com.incomm.cca.qa.pageObject.LoginPO;
import com.incomm.cca.qa.pageObject.NavigationPO;
import com.incomm.cca.qa.pageObject.enums.SearchParameter;
import com.incomm.cca.qa.pageObject.enums.SearchType;
import com.incomm.cca.qa.pageObject.search.SearchPo;
import com.incomm.cca.qa.pageObject.search.SearchResultsPO;
import com.incomm.cca.qa.pageObject.search.parameter.LocationSearchParametersPO;
import org.assertj.core.api.SoftAssertions;
import org.testng.annotations.Test;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * Created by Matt on 5/18/2016.
 */
public class SearchResultsAT extends BaseFT {

    @Test(groups = {"version-6.0.0", "acceptance", "search"}, enabled = false)
    public void searchResultsHeader() throws Exception {

        String searchValue = "5049984363196541";
        LoginPO login = new LoginPO(driver);
        login.defaultSignIn();
        NavigationPO nav = new NavigationPO(driver);
        nav.navigateToSearch();
        SearchPo search = new SearchPo(driver);
        search.selectSearchType(SearchType.FASTCARD);
        search.getParameters(SearchType.FASTCARD)
              .setValue(SearchParameter.VAN, searchValue);
        search.clickSearch();
        SearchResultsPO searchResults = new SearchResultsPO(driver);

        HashMap<String, Object> searchReport = searchResults.getResultsReport();
        ArrayList<String> terms = (ArrayList) searchReport.get("terms");

        SoftAssertions softly = new SoftAssertions();
        softly.assertThat(searchReport.get("totalCount"))
              .as("Result Total Count")
              .isEqualTo(2);
        softly.assertThat(terms.size())
              .as("Search Term Size")
              .isEqualTo(1);
        softly.assertThat(terms.get(0))
              .as("%s Value", SearchParameter.VAN.toString())
              .isEqualTo("VAN (16/19):" + searchValue);
        softly.assertAll();

    }

    @Test(groups = {"version-6.0.0", "acceptance", "search"}, enabled = false)
    public void searchResultsFilter() throws InterruptedException {
        LoginPO login = new LoginPO(driver);
        login.defaultSignIn();
        NavigationPO nav = new NavigationPO(driver);
        nav.navigateToSearch();
        SearchPo search = new SearchPo(driver);
        search.selectSearchType(SearchType.LOCATION);

        LocationSearchParametersPO parameters = (LocationSearchParametersPO) search.getParameters(SearchType.LOCATION);
        parameters.getState()
                  .selectOptionByText("Wyoming (WY)");
        search.clickSearch();
        SearchResultsPO searchResults = new SearchResultsPO(driver);
        searchResults.filteringResults("83001");
        String actualTotalResultCount = searchResults.getRowCount();

        HashMap<String, Object> searchReport = searchResults.getResultsReport();
        ArrayList<String> terms = (ArrayList) searchReport.get("terms");
        SoftAssertions softly = new SoftAssertions();
        // Search Result counts do not reflect the correct totals when using the filter
        softly.assertThat(actualTotalResultCount)
              .as("Result Total Count")
              .isEqualTo("10");
        softly.assertAll();
    }

    @Test(groups = {"version-6.0.0", "acceptance", "search"}, enabled = false)
    public void productSearchResultsColumns() {
        List<String> actColumns = new ArrayList<>();
        List<String> expColumns = new ArrayList<>();
        expColumns.add("Serial Number arrow_downward");
        expColumns.add("VAN16");
        expColumns.add("PIN");
        expColumns.add("Amount");
        expColumns.add("UPC");
        expColumns.add("Description");
        expColumns.add("Status");

        LoginPO login = new LoginPO(driver);
        login.defaultSignIn();
        NavigationPO nav = new NavigationPO(driver);
        nav.navigateToSearch();
        SearchPo search = new SearchPo(driver);
        search.selectSearchType(SearchType.FASTCARD);
        search.getParameters(SearchType.FASTCARD)
              .setValue(SearchParameter.VENDOR_SERIAL_NUMBER, "999192938444");
        search.clickSearch();

        nav.navigateToSearch();
        SearchResultsPO searchResults = new SearchResultsPO(driver);
        actColumns = searchResults.getSearchResultColumnNames();
        boolean columnNameCompare = actColumns.equals(expColumns);
        SoftAssertions softly = new SoftAssertions();
        softly.assertThat(columnNameCompare)
              .as("Column Names")
              .isEqualTo(true);

    }

    @Test(groups = {"version-6.0.0", "acceptance", "search"}, enabled = false)
    public void locationSearchResultsColumns() {
        List<String> actColumns = new ArrayList<>();
        List<String> expColumns = new ArrayList<>();
        expColumns.add("ID");
        expColumns.add("Location");
        expColumns.add("Merchant");
        expColumns.add("Phone");
        expColumns.add("Address");
        expColumns.add("City");
        expColumns.add("State");
        expColumns.add("Postal Code");
        expColumns.add("Status");

        LoginPO login = new LoginPO(driver);
        login.defaultSignIn();
        NavigationPO nav = new NavigationPO(driver);
        nav.navigateToSearch();
        SearchPo search = new SearchPo(driver);
        search.selectSearchType(SearchType.LOCATION);
        search.getParameters(SearchType.LOCATION)
              .setValue(SearchParameter.POSTAL_CODE, "30002");
        search.clickSearch();

        SearchResultsPO searchResults = new SearchResultsPO(driver);
        actColumns = searchResults.getSearchResultColumnNames();
        boolean columnNameCompare = actColumns.equals(expColumns);
        SoftAssertions softly = new SoftAssertions();
        softly.assertThat(columnNameCompare)
              .as("Column Names")
              .isEqualTo(true);

    }

    @Test(groups = {"version-6.0.0", "acceptance", "search"}, enabled = false)
    public void customerSearchResultsColumns() {

        List<String> actColumns = new ArrayList<>();
        List<String> expColumns = new ArrayList<>();
        expColumns.add("Card Number");
        expColumns.add("Card ID");
        expColumns.add("Date of Birth");
        expColumns.add("First Name");
        expColumns.add("Last Name");
        expColumns.add("Available Balance");
        expColumns.add("Product Category");
        expColumns.add("Card Status");

        LoginPO login = new LoginPO(driver);
        login.defaultSignIn();
        NavigationPO nav = new NavigationPO(driver);
        nav.navigateToSearch();
        SearchPo search = new SearchPo(driver);
        search.selectSearchType(SearchType.VMS_GPR);
        search.getParameters(SearchType.VMS_GPR)
              .setValue(SearchParameter.SERIAL_NUMBER, "7562433801");
        search.clickSearch();

        SearchResultsPO searchResults = new SearchResultsPO(driver);
        actColumns = searchResults.getSearchResultColumnNames();
        boolean columnNameCompare = actColumns.equals(expColumns);
        SoftAssertions softly = new SoftAssertions();
        softly.assertThat(columnNameCompare)
              .as("Column Names")
              .isEqualTo(true);

    }

    @Test(groups = {"version-6.0.0", "acceptance", "search"}, enabled = false)
    public void vrnSearchResultsColumns() {

        List<String> actColumns = new ArrayList<>();
        List<String> expColumns = new ArrayList<>();
        expColumns.add("Serial Number arrow_downward");
        expColumns.add("Control Number");
        expColumns.add("Amount");
        expColumns.add("PAN");
        expColumns.add("Description");
        expColumns.add("Header ID");
        expColumns.add("Activation Date");
        expColumns.add("Product Owner");
        expColumns.add("Status");

        LoginPO login = new LoginPO(driver);
        login.defaultSignIn();
        NavigationPO nav = new NavigationPO(driver);
        nav.navigateToSearch();
        SearchPo search = new SearchPo(driver);
        search.selectSearchType(SearchType.VRN);
        search.getParameters(SearchType.VRN)
              .setValue(SearchParameter.PAN, "5113171926091762");
        search.clickSearchAndExpectNavigateToDetails();

        nav.navigateToSearch();
        SearchResultsPO searchResults = new SearchResultsPO(driver);
        actColumns = searchResults.getSearchResultColumnNames();
        boolean columnNameCompare = actColumns.equals(expColumns);
        SoftAssertions softly = new SoftAssertions();
        softly.assertThat(columnNameCompare)
              .as("Column Names")
              .isEqualTo(true);

    }

    @Test(groups = {"version-6.0.0", "acceptance", "search"}, enabled = false)
    public void locationSearchSelectResult() {

        //TODO

    }

    @Test(groups = {"version-6.0.0", "acceptance", "search"}, enabled = false)
    public void jiraSearchSelectResult() {

        //TODO

    }

    @Test(groups = {"version-6.0.0", "acceptance", "search"}, enabled = false)
    public void customerSearchResultsPAN() {

        List<String> actColumns = new ArrayList<>();
        List<String> expColumns = new ArrayList<>();
        expColumns.add("Card Number");
        expColumns.add("Card ID");
        expColumns.add("Date of Birth");
        expColumns.add("First Name");
        expColumns.add("Last Name");
        expColumns.add("Available Balance");
        expColumns.add("Product Category");
        expColumns.add("Card Status");

        LoginPO login = new LoginPO(driver);
        login.defaultSignIn();
        NavigationPO nav = new NavigationPO(driver);
        nav.navigateToSearch();
        SearchPo search = new SearchPo(driver);
        search.selectSearchType(SearchType.VMS_GPR);
        search.getParameters(SearchType.VMS_GPR)
              .setValue(SearchParameter.PAN, "4420620303647449");
        search.clickSearch();

        SearchResultsPO searchResults = new SearchResultsPO(driver);
        actColumns = searchResults.getSearchResultColumnNames();
        boolean columnNameCompare = actColumns.equals(expColumns);
        SoftAssertions softly = new SoftAssertions();
        softly.assertThat(columnNameCompare)
              .as("Column Names")
              .isEqualTo(true);
    }

}
