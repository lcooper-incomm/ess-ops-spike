package com.incomm.cca.qa.acceptance.search;

import com.incomm.cca.qa.dataProvider.functional.acceptance.dashboard.SearchDP;
import com.incomm.cca.qa.functional.BaseFT;
import com.incomm.cca.qa.pageObject.LoginPO;
import com.incomm.cca.qa.pageObject.NavigationPO;
import com.incomm.cca.qa.pageObject.enums.SearchType;
import com.incomm.cca.qa.pageObject.search.SearchPo;
import com.incomm.cca.qa.pageObject.search.parameter.ECommSearchParametersPO;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.testng.annotations.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class ECommSearchAT extends BaseFT {

    @Test(groups = {"version-6.0.0", "acceptance", "search"}, dataProviderClass = SearchDP.class, dataProvider = "EcommParameters", enabled = true)
    public void verifyFields(String description, String field, String value, String result) {
        LoginPO login = new LoginPO(driver);
        login.defaultSignIn();
        NavigationPO nav = new NavigationPO(driver);
        nav.navigateToSearch();
        SearchPo search = new SearchPo(driver);
        search.selectSearchType(SearchType.VMS_GIFT);
        ECommSearchParametersPO eCommSearchParameters = new ECommSearchParametersPO(driver);
        switch (field) {
            case "Order Number":
                eCommSearchParameters.search(field, value);
                search.clickSearch();
                break;
            case "Shipment Number":
                eCommSearchParameters.search(field, value);
                search.clickSearch();
                break;
            case "Serial Number":
                eCommSearchParameters.search(field, value);
                search.clickSearch();
                break;
            case "Name":
                eCommSearchParameters.search(field, value);
                search.clickSearch();
                break;
            case "Email":
                eCommSearchParameters.search(field, value);
                search.clickSearch();
                break;
            case "Last Four":
                eCommSearchParameters.search(field, value);
                search.clickSearch();
                break;
        }
        wait.until(ExpectedConditions.visibilityOf(search.searchResultsCount));
        assertThat(search.searchResultsCount.getText()).as(description)
                                                       .isEqualTo(result);
    }
}
