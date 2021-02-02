package com.incomm.cca.qa.acceptance.actions.location;

import com.incomm.cca.qa.functional.BaseFT;
import com.incomm.cca.qa.pageObject.LoginPO;
import com.incomm.cca.qa.pageObject.NavigationPO;
import com.incomm.cca.qa.pageObject.actions.ActionToolbarPO;
import com.incomm.cca.qa.pageObject.actions.ChallengePasswordPO;
import com.incomm.cca.qa.pageObject.enums.SearchParameter;
import com.incomm.cca.qa.pageObject.enums.SearchType;
import com.incomm.cca.qa.pageObject.search.SearchPo;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * User: mgalloway
 * Date: 8/28/13
 * Time: 8:44 AM
 */
public class TerminalChallengePasswordAT extends BaseFT {

    @Test(groups = {"version-6.0.0", "acceptance", "location", "actions"}, dataProvider = "keys", enabled = true)
    public void verifyChallengePassword(String terminalKey, String password) {

        String locationName = "0075 - Holiday";

        LoginPO login = new LoginPO(driver);
        login.defaultSignIn();
        NavigationPO nav = new NavigationPO(driver);
        nav.navigateToSearch();
        SearchPo search = new SearchPo(driver);
        search.selectSearchType(SearchType.LOCATION);
        search.getParameters(SearchType.LOCATION)
              .setValue(SearchParameter.LOCATION_NAME, locationName);
        search.clickSearch();

        // Click the "Challenge Password" action button
        ActionToolbarPO actionToolbar = new ActionToolbarPO(driver);
        actionToolbar.clickActionButton(ActionToolbarPO.ActionKey.LOCATION_CHALLENGE_PASSWORD);
        ChallengePasswordPO challengePassword = new ChallengePasswordPO(driver);
        challengePassword.setTerminalChallengePasswordKey(terminalKey);
        challengePassword.clickNext();  // Submit Button
        challengePassword.clickNext();  // YES button

        // Test if Successful
        assertThat(challengePassword.getTerminalChallengePasswordPassword()).isEqualTo(password);

    }

    @DataProvider(name = "keys")
    private Object[][] keys() {
        return new Object[][]{
                {"400882573", "156007"},
                {"221955071", "130108"}
        };
    }

}
