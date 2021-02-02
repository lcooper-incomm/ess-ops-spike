package com.incomm.cca.qa.functional.actions.location;

import com.incomm.cca.qa.dataProvider.common.UserData;
import com.incomm.cca.qa.functional.BaseFT;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

/**
 * User: mgalloway
 * Date: 8/28/13
 * Time: 8:47 AM
 */
public class TerminalChallengePasswordFT extends BaseFT {

    @Test(groups = {"version-3.0.0", "location", "actions"}, dataProvider = "invalidKeys", enabled = false)
    public void challengePasswordFieldValidation(String key) {

        String locationName = "0075 - Holiday";

        //        nav.signin(constants.APP_CC_JAX_SUPER_USERNAME, constants.APP_CC_JAX_SUPER_PASSWORD, true);
        //        nav.navigateToSearch();
        //        search.submit("Name", locationName);
        //        search.autoSelectWait();
        //        actions.openTerminalChallengePassword();
        //        actions.submitTerminalChallengePassword(key);
        //        assertThat("Error Message Displayed", alerts.getAlertErrorMessage(), is(equalTo(actions.ACTIONS_CHALLENGE_PASSWORD_ERROR_MESSAGE)));

    }

    @Test(groups = {"version-3.0.0", "location", "actions"}, dataProvider = "authorization", enabled = false)
    public void challengePasswordAuthorizedAccess(String user, String password, Boolean hasAccess) {

        //        String locationName = "0075 - Holiday";
        //        nav.signin(user, password, true);
        //        nav.navigateToSearch();
        //        search.submit("Name", locationName);
        //        search.autoSelectWait();
        //        assertThat("Terminal Actions Limited to only Supervisors and Managers [" + user + "]", actions.isTerminalChallengePasswordAvailable(), is(hasAccess));

    }

    @Test(groups = {"version-3.0.0", "location", "actions"}, enabled = false)
    public void challengePasswordModalClose() {

        String locationName = "0075 - Holiday";

        //        nav.signin(constants.APP_CC_JAX_SUPER_USERNAME, constants.APP_CC_JAX_SUPER_PASSWORD, true);
        //        nav.navigateToSearch();
        //        search.submit("Name", locationName);
        //        search.autoSelectWait();
        //        actions.openTerminalChallengePassword();
        //        assertThat("Tool is open", actions.isActionsModalOpen(), is(true));
        //        assertThat("The correct Tool is open", actions.getModalTitle(), is(equalTo("Challenge Password")));
        //        actions.closeTerminalChallengePassword();
        //        assertThat("Tool is dismissed, closed", actions.isActionsModalOpen(), is(false));

    }

    @DataProvider(name = "invalidKeys")
    private Object[][] invalidKeys() {
        return new Object[][]{
                {"1234567890"},
                {"abcd"},
                {"a1b2c3"}
        };
    }

    @DataProvider(name = "authorization")
    private Object[][] authorization() {
        return new Object[][]{
                {UserData.MANAGER1.getUsername(), UserData.MANAGER1.getPassword(), true},
                {UserData.SUPERVISOR1.getUsername(), UserData.SUPERVISOR1.getPassword(), true},
                {UserData.AGENT1.getUsername(), UserData.AGENT1.getPassword(), false}
        };
    }

}
