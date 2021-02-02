package com.incomm.cca.qa.acceptance.details;

import com.incomm.cca.qa.functional.BaseFT;
import com.incomm.cca.qa.pageObject.LoginPO;
import com.incomm.cca.qa.pageObject.NavigationPO;
import com.incomm.cca.qa.pageObject.details.SummaryLocationPo;
import com.incomm.cca.qa.pageObject.enums.SearchParameter;
import com.incomm.cca.qa.pageObject.enums.SearchType;
import com.incomm.cca.qa.pageObject.search.SearchPo;
import org.testng.annotations.Test;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Acceptance Test Class for the Detail Summary Location functionality
 * <p>
 * User: Darren Carpenter (dcarpenter)
 * Date: 1/9/2017
 */
public class SummaryLocationAT extends BaseFT {

    @Test(groups = {"version-6.0.0", "acceptance", "summaryLocation"}, enabled = true)
    public void verifySummaryLocation() throws Exception {

        LoginPO login = new LoginPO(driver);
        login.defaultSignIn();
        NavigationPO nav = new NavigationPO(driver);
        nav.navigateToSearch();
        SearchPo search = new SearchPo(driver);
        search.selectSearchType(SearchType.LOCATION);
        search.getParameters(SearchType.LOCATION)
              .setValue(SearchParameter.MERCHANT_NAME, "cvs");
        search.getParameters(SearchType.LOCATION)
              .setValue(SearchParameter.LOCATION_NAME, "02232");
        search.clickSearchAndExpectNavigateToDetails();
        SummaryLocationPo summaryLocation = new SummaryLocationPo(driver);

        assertThat(summaryLocation.isLocationSummaryDisplayed()).isTrue();

    }

    @Test(groups = {"version-6.0.0", "acceptance", "summaryLocation"}, enabled = true)
    public void verifySummaryLocationStatus() throws Exception {

        LoginPO login = new LoginPO(driver);
        login.defaultSignIn();
        NavigationPO nav = new NavigationPO(driver);
        nav.navigateToSearch();
        SearchPo search = new SearchPo(driver);
        search.selectSearchType(SearchType.LOCATION);
        search.getParameters(SearchType.LOCATION)
              .setValue(SearchParameter.MERCHANT_NAME, "cvs");
        search.getParameters(SearchType.LOCATION)
              .setValue(SearchParameter.LOCATION_NAME, "02232");
        search.clickSearchAndExpectNavigateToDetails();

        SummaryLocationPo summaryLocation = new SummaryLocationPo(driver);
        assertThat(summaryLocation.getLocationSummaryStatusText()).isEqualTo(SummaryLocationPo.MESSAGE_LOCATION_SUMMARY_ACTIVE_STATUS_TEXT);

    }

    @Test(groups = {"version-6.0.0", "acceptance", "summaryLocation"}, enabled = true)
    public void verifyTerminalsLink() throws Exception {

        LoginPO login = new LoginPO(driver);
        login.defaultSignIn();
        NavigationPO nav = new NavigationPO(driver);
        nav.navigateToSearch();
        SearchPo search = new SearchPo(driver);
        search.selectSearchType(SearchType.LOCATION);
        search.getParameters(SearchType.LOCATION)
              .setValue(SearchParameter.MERCHANT_NAME, "cvs");
        search.getParameters(SearchType.LOCATION)
              .setValue(SearchParameter.LOCATION_NAME, "02232");
        search.clickSearchAndExpectNavigateToDetails();

        SummaryLocationPo summaryLocation = new SummaryLocationPo(driver);
        assertThat(summaryLocation.goToTerminals()).isTrue();

    }

}
