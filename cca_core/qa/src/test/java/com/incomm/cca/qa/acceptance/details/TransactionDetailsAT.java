package com.incomm.cca.qa.acceptance.details;

import com.incomm.cca.qa.dataProvider.functional.acceptance.dashboard.SearchDP;
import com.incomm.cca.qa.functional.BaseFT;
import com.incomm.cca.qa.pageObject.LoginPO;
import com.incomm.cca.qa.pageObject.NavigationPO;
import com.incomm.cca.qa.pageObject.details.DetailsPo;
import com.incomm.cca.qa.pageObject.enums.SearchType;
import com.incomm.cca.qa.pageObject.search.OrderVerificationPo;
import com.incomm.cca.qa.pageObject.search.SearchPo;
import com.incomm.cca.qa.pageObject.search.SearchResultsPO;
import com.incomm.cca.qa.pageObject.search.parameter.ECommSearchParametersPO;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.testng.annotations.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class TransactionDetailsAT extends BaseFT {

    @Test(groups = {"acceptance", "transaction-details", "version-6.16.0"}, dataProviderClass = SearchDP.class, dataProvider = "EcommDetailParameters", enabled = true)
    public void verifyEcommDetails(String description, String field, String value, String result) {
        LoginPO login = new LoginPO(driver);
        login.defaultSignIn();
        NavigationPO nav = new NavigationPO(driver);
        nav.navigateToSearch();
        SearchPo search = new SearchPo(driver);
        search.selectSearchType(SearchType.ECOMM);
        ECommSearchParametersPO eCommSearchParameters = new ECommSearchParametersPO(driver);
        eCommSearchParameters.search(field, value);
        DetailsPo detailsPo = new DetailsPo(driver);
        OrderVerificationPo orderVerification = new OrderVerificationPo(driver);
        SearchResultsPO searchResults = new SearchResultsPO(driver);

        switch (field) {
            case "Order Number":
                search.clickSearchAndExpectVerifyOrderDialog();
                orderVerification.verifyOrder();
                detailsPo.viewPaymentDetails();
                break;
            case "Shipment Number":
                search.clickSearchAndExpectVerifyOrderDialog();
                orderVerification.verifyOrder();
                detailsPo.viewPaymentDetails();
                break;
            case "Serial Number":
                search.clickSearchAndExpectVerifyOrderDialog();
                orderVerification.verifyOrder();
                detailsPo.viewPaymentDetails();
                break;
            case "Name":
                eCommSearchParameters.search(field, value);
                search.clickSearch();
                searchResults.clickSearchResultByRowKey(1);
                orderVerification.verifyOrder();
                detailsPo.viewPaymentDetails();
                break;
            case "Email":
                eCommSearchParameters.search(field, value);
                search.clickSearch();
                searchResults.clickSearchResultByRowKey(1);
                orderVerification.verifyOrder();
                detailsPo.viewPaymentDetails();
                break;
            case "Last Four":
                eCommSearchParameters.search(field, value);
                search.clickSearch();
                searchResults.clickSearchResultByRowKey(1);
                orderVerification.verifyOrder();
                detailsPo.viewPaymentDetails();
                break;
        }
        wait.until(ExpectedConditions.visibilityOf(detailsPo.authorizationCode));
        assertThat(detailsPo.authorizationCode.getText()).as(description)
                                                         .isEqualTo(result);

    }
}
