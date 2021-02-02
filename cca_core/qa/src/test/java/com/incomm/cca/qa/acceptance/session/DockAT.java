package com.incomm.cca.qa.acceptance.session;

import com.incomm.cca.qa.functional.BaseFT;
import com.incomm.cca.qa.pageObject.LoginPO;
import com.incomm.cca.qa.pageObject.NavigationPO;
import com.incomm.cca.qa.pageObject.dock.DockPo;
import com.incomm.cca.qa.pageObject.session.FeedbackPo;
import org.testng.annotations.Test;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Acceptance tests validating the Dock functionality
 * <p>
 * User: Darren Carpenter (dcarpenter)
 * Date: 11/23/2016
 */
public class DockAT extends BaseFT {

    //MESSAGES
    private static final String MESSAGE_DOCK_FEEDBACK_TITLE_TEXT = "CCA Feedback";

    @Test(groups = {"version-6.0.0", "acceptance", "dock"}, enabled = false)
    public void verifyToggleDock() {

        LoginPO signIn = new LoginPO(driver);
        NavigationPO navigation = signIn.defaultSignIn();
//		DockPo dockPo = navigation.navigateToDock();
        DockPo dock = new DockPo(driver);
        assertThat(dock.isDisplayed()).isFalse();
        assertThat(dock.toggle()).isTrue();

    }

    @Test(groups = {"version-6.0.0", "acceptance", "dock"}, enabled = true)
    public void verifyDockPinStatus() throws Exception {

        LoginPO signIn = new LoginPO(driver);
        NavigationPO navigation = signIn.defaultSignIn();
        DockPo dock = new DockPo(driver);
        assertThat(dock.isUnpinned()).isTrue();
        dock.pin();
        assertThat(dock.isPinned()).isTrue();

    }

    @Test(groups = {"version-6.0.0", "acceptance", "dock"}, enabled = true)
    public void verifySessionWorkspaceHeader() {

        LoginPO signIn = new LoginPO(driver);
        NavigationPO navigation = signIn.defaultSignIn();
        //        dock.dockSessionWorkspaceButton.click();
        //        assertThat(sessionWorkspace.getHeaderText()).isEqualTo(SessionWorkspacePo.MESSAGE_SESSION_WORKSPACE_TITLE_TEXT);

    }

    @Test(groups = {"version-6.0.0", "acceptance", "dock"}, enabled = true)
    public void verifyDockHelpHeader() {

        LoginPO signIn = new LoginPO(driver);
        NavigationPO navigation = signIn.defaultSignIn();
        //        dock.dockHelpButton.click();
        //        assertThat(dockHelpTab.getHeaderText()).isEqualTo(DockHelpPo.MESSAGE_DOCK_HELP_TITLE_TEXT);

    }

    @Test(groups = {"version-6.0.0", "acceptance", "dock"}, enabled = false)
    public void verifyFeedbackHeader() {

        LoginPO signIn = new LoginPO(driver);
        NavigationPO navigation = signIn.defaultSignIn();
        //        dock.dockFeedbackButton.click();
        FeedbackPo feedback = new FeedbackPo(driver);
        assertThat(feedback.getHeaderText()).isEqualTo(MESSAGE_DOCK_FEEDBACK_TITLE_TEXT);

    }

}
