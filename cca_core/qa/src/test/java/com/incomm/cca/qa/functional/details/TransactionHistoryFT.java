package com.incomm.cca.qa.functional.details;

import com.incomm.cca.qa.pageObject.LoginPO;
import com.incomm.cca.qa.pageObject.NavigationPO;
import com.incomm.cca.qa.pageObject.details.TransactionHistoryPo;
import com.incomm.cca.qa.pageObject.details.model.CustomerTransactionHistory;
import com.incomm.cca.qa.pageObject.details.model.ExpandedCustomerTransactionHistory;
import com.incomm.cca.qa.pageObject.details.model.ExpandedProductTransactionHistory;
import com.incomm.cca.qa.pageObject.details.model.ProductTransactionHistory;
import com.incomm.cca.qa.pageObject.enums.SearchParameter;
import com.incomm.cca.qa.pageObject.enums.SearchType;
import com.incomm.cca.qa.pageObject.search.CustomerVerificationPo;
import com.incomm.cca.qa.pageObject.search.SearchPo;
import org.testng.Assert;
import org.testng.annotations.Test;

import java.text.ParseException;
import java.util.Date;

/**
 * Created by svukkadapu on 1/31/2017.
 */
public class TransactionHistoryFT extends DetailsFT {

    private static final String SERIAL_NUMBER = "1182512727";

    @Test(groups = {"version-6.0.0", "acceptance", "profile"}, enabled = false)
    public void testHistoryDetails() {
        navigateToTransactionHistory(SearchType.FINANCIAL_GIFT, SERIAL_NUMBER);
        TransactionHistoryPo transactionHistory = new TransactionHistoryPo(driver);
        transactionHistory.isSelectAllTransactionsChecked();
        transactionHistory.orderByDate();
        transactionHistory.orderByTranasctionId();
//        transactionHistory.selectDateRange(transactionHistory.DATE_RANGE_OPTION_LAST_6_MONTHS_XPATH);
        //		transactionHistory.enterStartDate( new Date() );
        //		transactionHistory.enterEndDate( new Date() );
        //		transactionHistory.clickSearch();
    }

    @Test(groups = {"version-6.0.0", "acceptance", "profile"}, enabled = false)
    public void testHistoryDetailsDatePicker() throws ParseException {
        navigateToTransactionHistory(SearchType.FINANCIAL_GIFT, SERIAL_NUMBER);
        Date date = new Date();
        TransactionHistoryPo transactionHistory = new TransactionHistoryPo(driver);
        transactionHistory.orderByDate();
//        transactionHistory.selectDateRange(transactionHistory.DATE_RANGE_OPTION_TODAY_XPATH);
//        String startDateString = transactionHistory.getStartDate();
//        String endDateString = transactionHistory.getEndDate();
//        SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy");
//        Assert.assertEquals(sdf.format(date), sdf.format(sdf.parse(startDateString)));
//        Assert.assertEquals(sdf.format(date), sdf.format(sdf.parse(endDateString)));
    }

    @Test(groups = {"version-6.0.0", "acceptance", "profile"}, enabled = false)
    public void testTransactionHistoryCount() {
        navigateToTransactionHistory(SearchType.FINANCIAL_GIFT, SERIAL_NUMBER);
        TransactionHistoryPo transactionHistory = new TransactionHistoryPo(driver);
        transactionHistory.selectGreenCardPlatformFromFilter();
//        String totalTransactionHistoryCount = transactionHistory.getTotalTransactionHistoryCount();
//        Assert.assertTrue(StringUtils.isNumeric(totalTransactionHistoryCount));
    }

    @Test(groups = {"version-6.0.0", "acceptance", "profile"}, enabled = false)
    public void testFilterandSearchSummary() {
        navigateToTransactionHistory(SearchType.FINANCIAL_GIFT, SERIAL_NUMBER);
        TransactionHistoryPo transactionHistory = new TransactionHistoryPo(driver);
        transactionHistory.selectMerchantManagerPlatformFromFilter();
        String platform = transactionHistory.getPlatformFromSearchSummary();
        Assert.assertTrue(platform.equals("INCOMM") || platform.equals("SEJ"));
        transactionHistory.selectGreenCardPlatformFromFilter();
        platform = transactionHistory.getPlatformFromSearchSummary();
        Assert.assertEquals(platform, "GREENCARD");
    }

    @Test(groups = {"version-6.0.0", "acceptance", "profile"}, enabled = true)
    public void testDateRangeandSearchSummary() throws ParseException {
        navigateToTransactionHistory(SearchType.FINANCIAL_GIFT, SERIAL_NUMBER);
        TransactionHistoryPo transactionHistory = new TransactionHistoryPo(driver);
        transactionHistory.selectAllTransactions();
//        transactionHistory.selectDateRange(transactionHistory.TRANSACTION_HISTORY_DATE_RANGE_OPTION_TODAY_XPATH);
//        String startDateFromSearchSummary = transactionHistory.getStartDateFromSearchSummary();
//        String endDateFromSearchSummary = transactionHistory.getEndDateFromSearchSummary();
//        String startDate = transactionHistory.getStartDate();
//        String endDate = transactionHistory.getEndDate();
//        SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy");
//        Assert.assertEquals(sdf.format(sdf.parse(startDate)), startDateFromSearchSummary);
//        Assert.assertEquals(sdf.format(sdf.parse(endDate)), endDateFromSearchSummary);
    }

    @Test(groups = {"version-6.0.0", "acceptance", "profile"}, enabled = true)
    public void testSelectAllTransactions() {
        navigateToTransactionHistory(SearchType.FINANCIAL_GIFT, SERIAL_NUMBER);
        TransactionHistoryPo transactionHistory = new TransactionHistoryPo(driver);
        transactionHistory.selectAllTransactions();
        Assert.assertEquals(transactionHistory.isSelectAllTransactionsChecked(), true);
    }

    @Test(groups = {"version-6.0.0", "acceptance", "profile"}, enabled = true)
    public void testGetExpandedProductTransaction() throws ParseException {
        navigateToTransactionHistory(SearchType.FINANCIAL_GIFT, SERIAL_NUMBER);
        TransactionHistoryPo transactionHistory = new TransactionHistoryPo(driver);
        ExpandedProductTransactionHistory expandedTransaction = transactionHistory.getExpandedProductTransactionHistory(0);
        ProductTransactionHistory transaction = transactionHistory.getProductTransactionHistory(0);
        Assert.assertEquals(transaction.getEntity(), expandedTransaction.getLocation());
    }

    @Test(groups = {"version-6.0.0", "acceptance", "profile"}, enabled = true)
    public void testGetExpandedCustomerTransaction() throws ParseException {
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
        ExpandedCustomerTransactionHistory expandedCustomerTransactionHistory = transactionHistory.getExpandedCustomerTransactionHistory(0);
        CustomerTransactionHistory customerTransactionHistory = transactionHistory.getCustomerTransactionHistory(0);
    }

    @Test(groups = {"version-6.0.0", "acceptance", "profile"}, enabled = true)
    public void testEnterFilterText() throws ParseException {
        navigateToTransactionHistory(SearchType.FINANCIAL_GIFT, SERIAL_NUMBER);
        String expectedValue = "test";
        TransactionHistoryPo transactionHistory = new TransactionHistoryPo(driver);
        transactionHistory.enterFilterText(expectedValue);
        Assert.assertEquals(transactionHistory.getFilterText(), expectedValue);
    }
}
