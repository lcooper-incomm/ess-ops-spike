package com.incomm.cca.qa.functional.profile;

import com.incomm.cca.qa.functional.BaseFT;
import com.incomm.cca.qa.pageObject.LoginPO;
import com.incomm.cca.qa.pageObject.NavigationPO;
import com.incomm.cca.qa.pageObject.profile.UserInformationPo;
import org.testng.annotations.Test;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Acceptance tests validating the User Information Screen functionality
 * <p>
 * User: Darren Carpenter (dcarpenter)
 * Date: 11/17/2016
 */
public class UserInformationAT extends BaseFT {

    @Test(groups = {"version-6.0.0", "acceptance", "profile"}, enabled = false)
    public void verifyUserInformation() {

        LoginPO login = new LoginPO(driver);
        login.defaultSignIn();
        NavigationPO nav = new NavigationPO(driver);
        nav.navigateToProfile();
        UserInformationPo userInformation = new UserInformationPo(driver);
        assertThat(userInformation.isUserInformationDisplayed()).isTrue();
    }

    @Test(groups = {"version-6.0.0", "acceptance", "profile"}, enabled = false)
    public void verifyUserInformationTitle() {

        LoginPO login = new LoginPO(driver);
        login.defaultSignIn();
        NavigationPO nav = new NavigationPO(driver);
        nav.navigateToProfile();
        UserInformationPo userInformation = new UserInformationPo(driver);
        assertThat(userInformation.getUserInformationHeaderText()).isEqualTo(userInformation.MESSAGE_USER_INFO_HEADER);
    }

}
