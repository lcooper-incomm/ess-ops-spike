package com.incomm.cca.qa.acceptance.dashboard;

import com.incomm.cca.qa.dataProvider.functional.acceptance.dashboard.DashboardDP;
import com.incomm.cca.qa.functional.BaseFT;
import com.incomm.cca.qa.pageObject.LoginPO;
import com.incomm.cca.qa.pageObject.dashboard.QuickLookupPo;
import org.testng.annotations.Test;

import static com.incomm.cca.qa.pageObject.dashboard.QuickLookupPo.Option;
import static com.incomm.cca.qa.pageObject.dashboard.QuickLookupPo.OptionGroup;
import static org.assertj.core.api.Assertions.assertThat;

/**
 * Acceptance tests validating the Quick Lookup Widget functionality
 * <p>
 * User: Darren Carpenter (dcarpenter)
 * Date: 8/26/2016
 */
public class QuickLookupAT extends BaseFT {

    @Test(groups = {"version-5.0.0", "acceptance", "quick3rdPartyStatus"}, enabled = true)
    public void verifyQuickLookupStatus() {

        LoginPO login = new LoginPO(driver);
        login.defaultSignIn();
        QuickLookupPo quickLookup = new QuickLookupPo(driver);
        assertThat(quickLookup.isDisplayed()).isTrue();

    }

    @Test(groups = {"version-5.0.0", "acceptance", "quick3rdPartyStatus"}, enabled = true)
    public void verifyQuickLookupStatusTitle() {

        LoginPO login = new LoginPO(driver);
        login.defaultSignIn();
        QuickLookupPo quickLookup = new QuickLookupPo(driver);
        assertThat(quickLookup.getHeaderText()).containsIgnoringCase(QuickLookupPo.MESSAGE_QUICK_LOOKUP_WIDGET_HEADER_TEXT);

    }

    @Test(groups = {"version-6.0.0", "acceptance", "quick3rdPartyStatus"}, dataProviderClass = DashboardDP.class, dataProvider = "quickLookupData", enabled = true)
    public void verifyQuickLookupStatusResult(OptionGroup type, Option option, String identifier, String result) throws Exception {

        LoginPO login = new LoginPO(driver);
        login.defaultSignIn();
        QuickLookupPo quickLookup = new QuickLookupPo(driver);
        quickLookup.search(type, option, identifier);
        assertThat(quickLookup.getResultText()).isEqualTo(result);

    }

}
