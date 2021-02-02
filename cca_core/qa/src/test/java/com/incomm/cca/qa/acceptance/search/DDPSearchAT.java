package com.incomm.cca.qa.acceptance.search;

import com.incomm.cca.qa.dataProvider.functional.acceptance.dashboard.SearchDP;
import com.incomm.cca.qa.functional.BaseFT;
import com.incomm.cca.qa.pageObject.LoginPO;
import com.incomm.cca.qa.pageObject.NavigationPO;
import com.incomm.cca.qa.pageObject.enums.SearchType;
import com.incomm.cca.qa.pageObject.search.SearchPo;
import com.incomm.cca.qa.pageObject.search.parameter.DDPSearchParametersPO;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.testng.annotations.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class DDPSearchAT extends BaseFT {

    @Test(groups = {"version-6.0.0", "acceptance", "search"}, dataProviderClass = SearchDP.class, dataProvider = "DDPParameters", enabled = true)
    public void verifyFields(String description, String field, String value, String result) {
        LoginPO signIn = new LoginPO(driver);
        NavigationPO navigationPo = signIn.defaultSignIn();
        SearchPo searchPo = navigationPo.navigateToSearch();
        SearchPo search = new SearchPo(driver);
        search.selectSearchType(SearchType.DDP);
        DDPSearchParametersPO ddpSearchParameters = new DDPSearchParametersPO(driver);

        switch (field) {
            case "Transaction ID":
                ddpSearchParameters.search(field, value);
                search.clickSearch();
                break;
            case "PAN":
                ddpSearchParameters.search(field, value);
                search.clickSearch();
                break;
            case "PIN":
                ddpSearchParameters.search(field, value);
                search.clickSearch();
                break;
            case "Serial Number":
                ddpSearchParameters.search(field, value);
                search.clickSearch();
                break;
        }
        wait.until(ExpectedConditions.visibilityOf(search.searchResultsCount));
        assertThat(search.searchResultsCount.getText()).as(description)
                                                       .isEqualTo(result);
    }
}
