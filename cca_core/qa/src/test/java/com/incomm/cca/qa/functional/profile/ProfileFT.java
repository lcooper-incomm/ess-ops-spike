package com.incomm.cca.qa.functional.profile;

import com.incomm.cca.qa.functional.BaseFT;
import com.incomm.cca.qa.pageObject.LoginPO;
import com.incomm.cca.qa.pageObject.NavigationPO;
import com.incomm.cca.qa.pageObject.profile.ProfilePo;
import org.assertj.core.api.SoftAssertions;
import org.testng.annotations.Test;

/**
 * Created by Matt on 8/1/2016.
 */
public class ProfileFT extends BaseFT {

    @Test(groups = {"version-4.13.0", "profile"}, enabled = true)
    public void profileOptions() throws Exception {

        LoginPO login = new LoginPO(driver);
        login.defaultSignIn();
        NavigationPO nav = new NavigationPO(driver);
        nav.navigateToProfile();
        ProfilePo profile = new ProfilePo(driver);

        SoftAssertions softly = new SoftAssertions();
        softly.assertThat(profile.isProfileOptionDisplayed(profile.profilePreferences))
              .isTrue();
        softly.assertThat(profile.isProfileOptionDisplayed(profile.profilePermissions))
              .isTrue();
        softly.assertThat(profile.isProfileOptionDisplayed(profile.profileRoles))
              .isTrue();
        softly.assertThat(profile.isProfileOptionDisplayed(profile.profileGroups))
              .isTrue();
        softly.assertThat(profile.isProfileOptionDisplayed(profile.profileInfo))
              .isTrue();
        softly.assertAll();

    }

}
