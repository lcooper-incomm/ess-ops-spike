package com.incomm.cca.qa.acceptance.search;

import com.incomm.cca.qa.dataProvider.functional.acceptance.dashboard.SearchDP;
import com.incomm.cca.qa.functional.BaseFT;
import com.incomm.cca.qa.pageObject.LoginPO;
import com.incomm.cca.qa.pageObject.NavigationPO;
import com.incomm.cca.qa.pageObject.enums.SearchType;
import com.incomm.cca.qa.pageObject.search.SearchPo;
import com.incomm.cca.qa.pageObject.search.parameter.LocationSearchParametersPO;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.testng.annotations.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class LocationSearchAT extends BaseFT {

    @Test(groups = {"version-6.0.0", "acceptance", "search"}, dataProviderClass = SearchDP.class, dataProvider = "locationParameters", enabled = true)
    public void verifyFields(String description, String field, String value, String result) {
        LoginPO login = new LoginPO(driver);
        login.defaultSignIn();
        NavigationPO nav = new NavigationPO(driver);
        nav.navigateToSearch();
        SearchPo search = new SearchPo(driver);
        search.selectSearchType(SearchType.LOCATION);
        LocationSearchParametersPO locationSearchParameters = new LocationSearchParametersPO(driver);

        switch (field) {
            case "Merchant Name":
                locationSearchParameters.search(field, value);
                search.clickSearch();
                break;
            case "Location Name":
                locationSearchParameters.search(field, value);
                search.clickSearch();
                break;
            case "Terminal ID":
                locationSearchParameters.search(field, value);
                search.clickSearchAndExpectNavigateToDetails();
                nav.navigateToSearch();
                break;
            case "Phone Number":
                locationSearchParameters.search(field, value);
                search.clickSearchAndExpectNavigateToDetails();
                nav.navigateToSearch();
                break;
            case "Street Name":
                locationSearchParameters.search(field, value);
                search.clickSearchAndExpectNavigateToDetails();
                nav.navigateToSearch();
                break;
            case "City":
                locationSearchParameters.search(field, value);
                search.clickSearch();
                break;
            case "State":
                locationSearchParameters.search(field, value);
                search.clickSearch();
                break;
            case "Postal Code":
                locationSearchParameters.search(field, value);
                search.clickSearch();
                break;
        }
        wait.until(ExpectedConditions.visibilityOf(search.searchResultsCount));
        assertThat(search.searchResultsCount.getText()).as(description)
                                                       .isEqualTo(result);
    }
}
