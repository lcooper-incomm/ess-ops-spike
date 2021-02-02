package com.incomm.cca.qa.acceptance.session;

import com.incomm.cca.qa.functional.BaseFT;
import com.incomm.cca.qa.pageObject.LoginPO;
import com.incomm.cca.qa.pageObject.NavigationPO;
import com.incomm.cca.qa.pageObject.session.SessionPo;
import com.incomm.cca.qa.pageObject.session.SessionWizardPo;
import org.testng.annotations.Test;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Created by mgalloway on 5/22/2014.
 * Revised by gscholes on 3/29/2019.
 */
@Test
public class SessionAT extends BaseFT {

    protected String user = "";
    protected String password = "";
    protected String callerName = "";
    protected String ani;
    protected String queue;
    protected String notes;
    protected boolean autoWrapUpCodeSent;
    protected String wrapUpCategoryID;
    protected String wrapUpCode;
    protected String wrapUpCategory;
    protected String wrapUpCodeID;
    protected String callBackNumber;
    protected String dnis;
    protected String min;

    @Test(groups = {"version-7.0.0", "smoke", "session"}, enabled = true)
    public void createNewGeneralSessionManually() {
        LoginPO signIn = new LoginPO(this.driver);
        NavigationPO navigation = signIn.defaultSignIn();
        navigation.waitForTransitionOverlayToGoAway();
        SessionWizardPo sessionWizardPO = navigation.clickCreateSessionButton();
        SessionPo sessionPo = sessionWizardPO.createSessionOfType(SessionPo.SessionClass.General);
        String result = sessionPo.retrieveSessionTypeCreated();
        assertThat(result).isEqualTo(SessionPo.SessionClass.General.toString());
    }

    @Test(groups = {"version-7.0.0", "smoke", "session"}, enabled = true)
    public void createNewCallSessionManually() {

        LoginPO signIn = new LoginPO(this.driver);
        NavigationPO navigation = signIn.defaultSignIn();
        navigation.waitForTransitionOverlayToGoAway();
        SessionWizardPo sessionWizardPO = navigation.clickCreateSessionButton();
        SessionPo sessionPo = sessionWizardPO.createSessionOfType(SessionPo.SessionClass.Call);
        String result = sessionPo.retrieveSessionTypeCreated();
        assertThat(result).isEqualTo(SessionPo.SessionClass.Call.toString());

    }

    @Test(groups = {"version-7.0.0", "smoke", "session"}, enabled = true)
    public void createManuallyAndDismissGeneralSession() {

        LoginPO signIn = new LoginPO(this.driver);
        NavigationPO navigation = signIn.defaultSignIn();
        navigation.waitForTransitionOverlayToGoAway();
        SessionWizardPo sessionWizardPO = navigation.clickCreateSessionButton();
        SessionPo sessionPo = sessionWizardPO.createSessionOfType(SessionPo.SessionClass.General);
        sessionPo.addCommentToSession("This is a comment");
        sessionPo.closeSession();
        navigation.reload();
        assertThat(navigation.isDisplayed()).isTrue();

    }

    @Test(groups = {"version-7.0.0", "smoke", "session"}, enabled = true)
    public void testRequiredSessionFields() throws Exception {

        LoginPO signIn = new LoginPO(this.driver);
        NavigationPO navigation = signIn.defaultSignIn();
        navigation.waitForTransitionOverlayToGoAway();
        SessionWizardPo sessionWizardPO = navigation.clickCreateSessionButton();
        SessionPo sessionPo = sessionWizardPO.createSessionOfType(SessionPo.SessionClass.Call);
        sessionPo.addCommentToSession("This is a comment");
        sessionPo.getQueueField()
                 .chooseOption("Airtime");
        assertThat(sessionPo.getCallerNameField()
                            .isDisplayed());
        assertThat(sessionPo.getCallbackNumberField()
                            .isDisplayed());
        assertThat(sessionPo.getAniField()
                            .isDisplayed());
        assertThat(sessionPo.getDnisField()
                            .isDisplayed());
        assertThat(sessionPo.isCloseButtonDisabled());

        sessionPo.closeSession();
        assertThat(navigation.isDisplayed());

    }

    @Test(groups = {"version-7.0.0", "smoke", "session"}, enabled = true)
    public void testSessionComments() {
        LoginPO signIn = new LoginPO(this.driver);
        NavigationPO navigation = signIn.defaultSignIn();
        navigation.waitForTransitionOverlayToGoAway();
        SessionWizardPo sessionWizardPO = navigation.clickCreateSessionButton();
        SessionPo sessionPo = sessionWizardPO.createSessionOfType(SessionPo.SessionClass.Call);
        sessionPo.addCommentToSession("This is a comment");
        assertThat(sessionPo.getViewAllCommentsLink()
                            .isDisplayed());
        sessionPo.viewAllComments();
        assertThat(sessionPo.getViewCommentsList()
                            .size() > 0);
    }

    @Test(groups = {"version-3.0.0", "smoke", "session"}, enabled = false)
    public void dismissCleanSession() {
        LoginPO signIn = new LoginPO(this.driver);
        NavigationPO navigation = signIn.defaultSignIn();
        navigation.waitForTransitionOverlayToGoAway();
        SessionWizardPo sessionWizardPO = navigation.clickCreateSessionButton();
        SessionPo sessionPo = sessionWizardPO.createSessionOfType(SessionPo.SessionClass.Call);
        sessionPo.addCommentToSession("This is a comment");
        sessionPo.getQueueField()
                 .chooseOption("Airtime");
        assertThat(navigation.isDisplayed());
    }

    @Test(groups = {"version-3.0.0", "acceptance", "session"}, enabled = false)
    public void startNewSessionAutomatically() {

    }

    @Test(groups = {"version-4.1.1", "acceptance", "session"}, enabled = false)
    public void autoWrapTimedOutCall() throws Exception {

    }

    @Test(groups = {"version-4.1.1", "acceptance", "session"}, enabled = false)
    public void droppedCall() throws Exception {

    }

    @Test(groups = {"version-3.0.0", "acceptance", "session"}, enabled = false)
    public void activeSessionDrawerTab() {

    }

    @Test(groups = {"version-4.1.1", "acceptance", "session"}, enabled = false)
    public void autoWrapSearchBySelectionType() throws Exception {

    }

    @Test(groups = {"version-3.0.0", "in-progress", "session"}, enabled = false)
    public void sessionWrapUpRequiredFieldsManualSession() {

    }

    @Test(groups = {"version-3.0.0", "acceptance", "session"}, enabled = false)
    public void sessionWrapUp() {

    }

}
