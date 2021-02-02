package com.incomm.cca.qa.functional.details;

import com.incomm.cca.qa.functional.BaseFT;
import com.incomm.cca.qa.pageObject.LoginPO;
import com.incomm.cca.qa.pageObject.NavigationPO;
import com.incomm.cca.qa.pageObject.details.DetailsPo;
import com.incomm.cca.qa.pageObject.enums.SearchParameter;
import com.incomm.cca.qa.pageObject.enums.SearchType;
import com.incomm.cca.qa.pageObject.search.CustomerVerificationPo;
import com.incomm.cca.qa.pageObject.search.SearchPo;

/**
 * Created by Matt on 5/27/2014.
 */
public class DetailsFT extends BaseFT {

    //TODO These methods should not be performing searches, they stateOrProvince they're for "navigating"...
    //TODO response: I think the only way to navigate to some of these pages is to do a specific kind of search.

    protected void navigateToTransactionHistory(SearchType searchType, String serialNumber) {
        LoginPO login = new LoginPO(driver);
        login.defaultSignIn();
        NavigationPO nav = new NavigationPO(driver);
        nav.navigateToSearch();
        SearchPo search = new SearchPo(driver);
        search.selectSearchType(searchType);
        search.getParameters(searchType)
              .setValue(SearchParameter.SERIAL_NUMBER, serialNumber);
        search.clickSearchAndExpectNavigateToDetails();
    }

    protected void setupForNavigateToEcommTabs(SearchType searchType, String orderNumber) {
        LoginPO login = new LoginPO(driver);
        login.defaultSignIn();
        NavigationPO nav = new NavigationPO(driver);
        nav.navigateToSearch();
        SearchPo search = new SearchPo(driver);
        search.selectSearchType(searchType);  // should be using e-comm search type
        search.getParameters(searchType)
              .setValue(SearchParameter.ORDER_NUMBER, orderNumber);
        search.clickSearchAndExpectNavigateToDetails();
    }

    protected void navigateToEcommItems(SearchType searchType, String orderNumber) {
        setupForNavigateToEcommTabs(searchType, orderNumber);
        DetailsPo detailsPo = new DetailsPo(driver);
        detailsPo.selectItemsTab();
    }

    protected void navigateToEcommNotes(SearchType searchType, String orderNumber) {
        setupForNavigateToEcommTabs(searchType, orderNumber);
        DetailsPo detailsPo = new DetailsPo(driver);
        detailsPo.selectNotes();
    }

    protected void navigateToEcommNotifications(SearchType searchType, String orderNumber) {
        setupForNavigateToEcommTabs(searchType, orderNumber);
        DetailsPo detailsPo = new DetailsPo(driver);
        detailsPo.selectNotificationsTab();
    }

    protected void navigateToEcommShipments(SearchType searchType, String orderNumber) {
        setupForNavigateToEcommTabs(searchType, orderNumber);
        DetailsPo detailsPo = new DetailsPo(driver);
        detailsPo.selectShipmentsTab();
    }

    protected void navigateToEcommProcessingHistory(SearchType searchType, String orderNumber) {
        setupForNavigateToEcommTabs(searchType, orderNumber);
        DetailsPo detailsPo = new DetailsPo(driver);
        detailsPo.selectProcessingHistoryTab();
    }

    protected void navigateToFees(SearchType searchType, String serialNumber) {
        NavigationPO nav = new NavigationPO(driver);
        nav.navigateToSearch();
        SearchPo search = new SearchPo(driver);
        search.selectSearchType(searchType);
        search.getParameters(searchType)
              .setValue(SearchParameter.SERIAL_NUMBER, serialNumber);
        search.clickSearchAndExpectVerifyCustomerDialog();
        CustomerVerificationPo customerVerification = new CustomerVerificationPo(driver);
        customerVerification.verifyCustomer();
        DetailsPo detailsPo = new DetailsPo(driver);
        detailsPo.selectFees();
    }

    protected void navigateToAccountHolder(SearchType searchType, String serialNumber) {
        NavigationPO nav = new NavigationPO(driver);
        nav.navigateToSearch();
        SearchPo search = new SearchPo(driver);
        search.selectSearchType(searchType);
        search.getParameters(searchType)
              .setValue(SearchParameter.SERIAL_NUMBER, serialNumber);
        search.clickSearchAndExpectVerifyCustomerDialog();
        CustomerVerificationPo customerVerification = new CustomerVerificationPo(driver);
        customerVerification.verifyCustomer();
        DetailsPo detailsPo = new DetailsPo(driver);
        detailsPo.selectAccountHolders();
    }
}
