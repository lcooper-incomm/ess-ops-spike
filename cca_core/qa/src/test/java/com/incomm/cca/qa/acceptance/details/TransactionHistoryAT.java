package com.incomm.cca.qa.acceptance.details;

import com.incomm.cca.qa.functional.BaseFT;
import com.incomm.cca.qa.pageObject.LoginPO;
import com.incomm.cca.qa.pageObject.NavigationPO;
import com.incomm.cca.qa.pageObject.details.TransactionHistoryPo;
import com.incomm.cca.qa.pageObject.enums.SearchParameter;
import com.incomm.cca.qa.pageObject.enums.SearchType;
import com.incomm.cca.qa.pageObject.search.CustomerVerificationPo;
import com.incomm.cca.qa.pageObject.search.SearchPo;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Acceptance tests validating the Transaction History functionality
 * <p>
 * User: Darren Carpenter (dcarpenter)
 * Date: 2/3/2017
 */
public class TransactionHistoryAT extends BaseFT {

    @Test(groups = {"version-6.0.0", "acceptance", "transactionHistory"}, enabled = true)
    public void verifyTransactionHistory() {

        LoginPO login = new LoginPO(driver);
        login.defaultSignIn();
        NavigationPO nav = new NavigationPO(driver);
        nav.navigateToSearch();
        SearchPo search = new SearchPo(driver);
        search.selectSearchType(SearchType.VMS_GPR);
        search.getParameters(SearchType.VMS_GPR)
              .setValue(SearchParameter.CARD_NUMBER, "5262910010001636");
        search.clickSearchAndExpectVerifyCustomerDialog();
        CustomerVerificationPo customerVerification = new CustomerVerificationPo(driver);

        customerVerification.verifyCustomer();
        TransactionHistoryPo transactionHistory = new TransactionHistoryPo(driver);

        assertThat(transactionHistory.isTransactionHistoryDisplayed()).isTrue();
    }

    // EXPORT to PDF

    @Test(groups = {"version-6.0.0", "acceptance", "transactionHistory"}, enabled = false)
    public void verifyExportToPdfSelectAllGPR() throws Exception {

        LoginPO login = new LoginPO(driver);
        login.defaultSignIn();
        NavigationPO nav = new NavigationPO(driver);
        nav.navigateToSearch();
        SearchPo search = new SearchPo(driver);
        search.selectSearchType(SearchType.VMS_GPR);
        search.getParameters(SearchType.VMS_GPR)
              .setValue(SearchParameter.PAN, "4420620100030013");
        search.clickSearchAndExpectVerifyCustomerDialog();
        CustomerVerificationPo customerVerification = new CustomerVerificationPo(driver);

        customerVerification.verifyCustomer();

        // Set the Transaction History Search dates
        Date startDate = new GregorianCalendar(2016, Calendar.FEBRUARY, 11).getTime();
        TransactionHistoryPo transactionHistory = new TransactionHistoryPo(driver);
        transactionHistory.enterStartDate(startDate);
        Date endDate = new GregorianCalendar(2017, Calendar.FEBRUARY, 10).getTime();
        transactionHistory.enterEndDate(endDate);
        transactionHistory.clickSearch();

        // Select All
        transactionHistory.selectAllTransactions();
        assertThat(transactionHistory.isSelectAllTransactionsChecked()).isTrue();

        // Click Export to PDF
        transactionHistory.clickExportToPdf();  // This step is currently broken in CCA for VMS_GPR. Will finish it when it is fixed.

    }

    @Test(groups = {"version-6.0.0", "acceptance", "transactionHistory"}, dataProvider = "exportToPdfSelectAllData", enabled = false)
    public void verifyExportToPdfSelectAll(String platform, String searchValue) {

        LoginPO login = new LoginPO(driver);
        login.defaultSignIn();
        NavigationPO nav = new NavigationPO(driver);
        nav.navigateToSearch();
        SearchPo search = new SearchPo(driver);
        search.selectSearchType(SearchType.FINANCIAL_GIFT);
        search.getParameters(SearchType.FINANCIAL_GIFT)
              .setValue(SearchParameter.SERIAL_NUMBER, searchValue);
        search.clickSearchAndExpectNavigateToDetails();

        // Select All
        TransactionHistoryPo transactionHistory = new TransactionHistoryPo(driver);
        transactionHistory.selectAllTransactions();
        assertThat(transactionHistory.isSelectAllTransactionsChecked()).isTrue();

        // Click Export to PDF
        transactionHistory.clickExportToPdf();

        //        assertThat(transactionHistory.isTransactionHistoryDisplayed()).isTrue();

    }

    @DataProvider(name = "exportToPdfSelectAllData")
    public Object[][] exportToPdfSelectAllData() {
        return new Object[][]{
                // Platform, Search Value
                // {"VMS_GPR", "5262910010001636"},
                {"GREENCARD", "2159758245"}
        };
    }

}
