package com.incomm.cca.qa.acceptance.dashboard;

import com.incomm.cca.qa.dataProvider.functional.acceptance.dashboard.DashboardDP;
import com.incomm.cca.qa.functional.BaseFT;
import com.incomm.cca.qa.pageObject.LoginPO;
import com.incomm.cca.qa.pageObject.dashboard.QuickSearchPo;
import com.incomm.cca.qa.pageObject.search.SearchResultsPO;
import org.testng.annotations.Test;

import java.util.HashMap;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Acceptance tests validating the Quick Search Widget functionality
 * <p>
 * User: Darren Carpenter (dcarpenter)
 * Date: 8/12/2016
 */
public class QuickSearchAT extends BaseFT {

//	@Test( groups = { "version-5.0.0", "acceptance", "quickSearch" }, enabled = true )
//	public void verifyQuickSearch() {
//
    //		login.defaultSignIn();
//		assertThat( quickSearch.isQuickSearchWidgetDisplayed() ).isTrue();
//
//	}

    @Test(groups = {"version-5.0.0", "acceptance", "quickSearch"}, enabled = true)
    public void verifyQuickSearchTitle() {

        LoginPO login = new LoginPO(driver);
        login.defaultSignIn();
        QuickSearchPo quickSearch = new QuickSearchPo(driver);
        assertThat(quickSearch.getHeaderText()).isEqualTo(QuickSearchPo.MESSAGE_QUICK_SEARCH_WIDGET_TEXT);

    }

    @Test(groups = {"version-6.0.0", "acceptance", "quickSearch"}, dataProvider = "quickSearchData", dataProviderClass = DashboardDP.class, enabled = true)
    public void verifyQuickSearchResults(QuickSearchPo.OptionGroup optionGroup, QuickSearchPo.Option option, String identifier, int resultCount) throws Exception {

        LoginPO login = new LoginPO(driver);
        login.defaultSignIn();
        QuickSearchPo quickSearch = new QuickSearchPo(driver);
        quickSearch.searchAndExpectNavigateToSearch(optionGroup, option, identifier);

        SearchResultsPO searchResults = new SearchResultsPO(driver);
        HashMap<String, Object> searchReport = searchResults.getResultsReport();
        assertThat(searchReport.get("totalCount")).as("Result Total Count")
                                                  .isEqualTo(resultCount);

    }

    @Test(groups = {"version-6.0.0", "acceptance", "quickSearch"}, dataProvider = "quickSearchCustomerData", dataProviderClass = DashboardDP.class, enabled = true)
    public void verifyQuickSearchCustomerResults(QuickSearchPo.OptionGroup optionGroup, QuickSearchPo.Option option, String identifier, int resultCount) throws Exception {

        LoginPO login = new LoginPO(driver);
        login.defaultSignIn();
        QuickSearchPo quickSearch = new QuickSearchPo(driver);
        quickSearch.searchAndExpectVerify(optionGroup, option, identifier);

        SearchResultsPO searchResults = new SearchResultsPO(driver);
        HashMap<String, Object> searchReport = searchResults.getResultsReport();
        assertThat(searchReport.get("totalCount")).as("Result Total Count")
                                                  .isEqualTo(resultCount);

    }

}
