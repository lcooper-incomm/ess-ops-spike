package com.incomm.cca.qa.functional.details;

import com.incomm.cca.qa.pageObject.LoginPO;
import com.incomm.cca.qa.pageObject.NavigationPO;
import com.incomm.cca.qa.pageObject.details.AccountHolderPo;
import com.incomm.cca.qa.pageObject.enums.SearchParameter;
import com.incomm.cca.qa.pageObject.enums.SearchType;
import com.incomm.cca.qa.pageObject.search.CustomerVerificationPo;
import com.incomm.cca.qa.pageObject.search.SearchPo;
import org.testng.Assert;
import org.testng.annotations.Test;

/**
 * Created by svukkadapu on 2/6/2017.
 */
public class AccountHolderFT extends DetailsFT {

    @Test
    public void testClickAccountHolderTab() {
        LoginPO login = new LoginPO(driver);
        login.defaultSignIn();
        NavigationPO nav = new NavigationPO(driver);
        nav.navigateToSearch();
        SearchPo search = new SearchPo(driver);
        search.selectSearchType(SearchType.VMS_GPR);
        search.getParameters(SearchType.VMS_GPR)
              .setValue(SearchParameter.PAN, "5262910010001636");
        search.clickSearchAndExpectVerifyCustomerDialog();
        CustomerVerificationPo customerVerification = new CustomerVerificationPo(driver);
        customerVerification.verifyCustomer();
        AccountHolderPo accountHolderPo = new AccountHolderPo(driver);
        String actual = accountHolderPo.getFirstName();
        String expected = "EMILY";
        Assert.assertEquals(actual, expected);
        String actualLastName = accountHolderPo.getLastName();
        String expectedLastName = "CARTER";
        Assert.assertEquals(actualLastName, expectedLastName);
    }
}
