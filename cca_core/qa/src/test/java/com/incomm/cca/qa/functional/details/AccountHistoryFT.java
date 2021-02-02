package com.incomm.cca.qa.functional.details;

import com.incomm.cca.qa.pageObject.details.AccountHistoryPo;
import com.incomm.cca.qa.pageObject.details.DetailsPo;
import com.incomm.cca.qa.pageObject.enums.SearchType;
import org.testng.Assert;
import org.testng.annotations.Test;

/**
 * Created by svukkadapu on 2/2/2017.
 */
public class AccountHistoryFT extends DetailsFT {

    private static final String SERIAL_NUMBER = "1182512727";

    @Test
    public void getTotalAccountHistoryCountTest() {
        navigateToTransactionHistory(SearchType.FINANCIAL_GIFT, SERIAL_NUMBER);
        DetailsPo detailsPo = new DetailsPo(driver);
        detailsPo.selectAccountHistory();
        AccountHistoryPo accountHistoryPo = new AccountHistoryPo(driver);
        accountHistoryPo.sortByDescription();
        int totalAccountHistoryCount = accountHistoryPo.getTotalAccountHistoryCount();
        Assert.assertTrue(totalAccountHistoryCount >= 0);
    }

    @Test
    public void testFilter() {
        navigateToTransactionHistory(SearchType.FINANCIAL_GIFT, SERIAL_NUMBER);
        DetailsPo detailsPo = new DetailsPo(driver);
        detailsPo.selectAccountHistory();
        AccountHistoryPo accountHistoryPo = new AccountHistoryPo(driver);
        accountHistoryPo.enterFilterText("test");
        Assert.assertEquals(accountHistoryPo.getFilterText(), "test");
        accountHistoryPo.clearFilterText();
        Assert.assertEquals(accountHistoryPo.getFilterText(), "");
    }
}