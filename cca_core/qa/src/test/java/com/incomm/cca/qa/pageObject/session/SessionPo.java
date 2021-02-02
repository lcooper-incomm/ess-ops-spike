package com.incomm.cca.qa.pageObject.session;

import com.incomm.aqat.component.formcontrol.material2.MatSelect;
import com.incomm.aqat.component.formcontrol.material2.MatTextArea;
import com.incomm.aqat.component.formcontrol.material2.MatTextInput;
import com.incomm.aqat.driver.AqatDriver;
import com.incomm.cca.qa.pageObject.BasePo;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;

import java.util.List;

import static com.incomm.aqat.util.AqatWait.waitForPageLoad;

/**
 * Created by Allen on 1/31/2017.
 */
public class SessionPo extends BasePo {

    private static final String SESSION_CARD_ID = "session-card";
    private static final String COLLAPSED_SESSION_ID = "collapsed-session";
    private static final String AUTOWRAP_PROGRESS_BAR_ID = "session-autowrap-container";
    /*
    WebElements
     */
    @FindBy(id = "change-session-type-button")
    public WebElement changeSessionTypeBtn;
    @FindBy(id = "ivr-data-button")
    public WebElement ivrDataBtn;
    @FindBy(id = "raise-case-button")
    public WebElement raiseCaseBtn;
    @FindBy(css = "cca-session-panel div.session-panel-container div.session-panel-header#session-panel-header")
    private WebElement sessionPanelHeader;
    @FindBy(id = "session-header-session-type")
    private WebElement sessionHeaderSessionType;
    @FindBy(id = SESSION_CARD_ID)
    private WebElement sessionCard;
    @FindBy(id = "restore-session-toggle")
    private WebElement restoreSessionToggle;
    @FindBy(id = COLLAPSED_SESSION_ID)
    private WebElement collapsedSession;
    @FindBy(id = "create-session-button")
    private WebElement createSessionBtn;
    @FindBy(id = "collapse-session")
    private WebElement collapseSessionBtn;
    @FindBy(css = "button#close-session-button")
    private WebElement closeSessionBtn;
    @FindBy(id = AUTOWRAP_PROGRESS_BAR_ID)
    private WebElement autowrapProgressBar;
    /*
    Form field elements
     */
    @FindBy(css = "mat-form-field#session-queue")
    private WebElement queueField;
    @FindBy(id = "session-category")
    private WebElement categoryField;
    @FindBy(id = "session-wrap-up-code")
    private WebElement codeField;
    @FindBy(id = "session-status")
    private WebElement statusField;
    @FindBy(id = "session-team")
    private WebElement teamField;
    @FindBy(id = "session-assignee")
    private WebElement assigneeField;
    @FindBy(id = "session-caller-name")
    private WebElement callerNameField;
    @FindBy(id = "session-callback-number")
    private WebElement callbackNumberField;
    @FindBy(id = "session-ani")
    private WebElement aniField;
    @FindBy(id = "session-dnis")
    private WebElement dnisField;
    @FindBy(id = "session-comment")
    private WebElement noteField;
    @FindBy(id = "session-add-comment-button")
    private WebElement addCommentBtn;
    @FindBy(className = "cca-session-comment")
    private List<WebElement> viewCommentsList;
    @FindBy(className = "cca-wizard-dialog")
    private WebElement ccaWizardDialog;
    @FindBy(id = "view-comments-link")
    private WebElement viewAllCommentsLink;

    public SessionPo(AqatDriver driver) {
        super(driver);
        waitForPageLoad(driver);
        PageFactory.initElements(driver, this);
    }

    public MatSelect getQueueField() {
        return new MatSelect(queueField, this.driver);
    }
	
    /*
    Form Field Component getters
     */

    public MatSelect getCategoryField() {
        return new MatSelect(categoryField, this.driver);
    }

    public MatSelect getCodeField() {
        return new MatSelect(codeField, this.driver);
    }

    public MatSelect getStatusField() {
        return new MatSelect(statusField, this.driver);
    }

    public MatSelect getTeamField() {
        return new MatSelect(teamField, this.driver);
    }

    public MatSelect getAssigneeField() {
        return new MatSelect(assigneeField, this.driver);
    }

    public MatTextInput getCallerNameField() {
        return new MatTextInput(callerNameField, this.driver);
    }

    public MatTextInput getCallbackNumberField() {
        return new MatTextInput(callbackNumberField, this.driver);
    }

    public MatTextInput getAniField() {
        return new MatTextInput(aniField, this.driver);
    }

    public MatTextInput getDnisField() {
        return new MatTextInput(dnisField, this.driver);
    }

    public MatTextArea getNoteField() {
        return new MatTextArea(noteField, this.driver);
    }

    private WebElement getSessionHeaderSessionType() {
        return sessionHeaderSessionType;
    }

    public String retrieveSessionTypeCreated() {
//		wait.until( ExpectedConditions.visibilityOf( sessionHeaderSessionType ) );
        String sessionType = (sessionHeaderSessionType.getText());
        sessionType = sessionType.replace("(", "");
        sessionType = sessionType.replace(")", "");
        return sessionType;
    }

    public void waitForSessionPanelHeaderToBeVisible() {
        driver.getWebDriverWait()
              .until(ExpectedConditions.visibilityOf(sessionPanelHeader));
    }

    public void addCommentToSession(String comment) {
        getNoteField().setValue(comment);
        addCommentBtn.click();
    }

    /**
     * Returns whether session is in collapsed view NOW, without wait. Use this
     * if you need to discover the session's current stateOrProvince and decide what to do next.
     */
    public boolean isCollapsedViewNow() {
        return isElementDisplayedNow(By.id(COLLAPSED_SESSION_ID));
    }

    /**
     * Returns whether session is in collapsed view after wait. Use this
     * if you just collapsed and need to validate the collapse, for example.
     */
    public boolean isCollapsedView() {
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.id(COLLAPSED_SESSION_ID)));
        return collapsedSession.isDisplayed();
    }

    /**
     * Returns whether session is in default view NOW, without wait. Use this
     * if you need to discover the session's current stateOrProvince and decide what to do next.
     */
    public boolean isDefaultViewNow() {
        return isElementDisplayedNow(By.id(SESSION_CARD_ID));
    }

    /**
     * Returns whether session is in default view after wait. Use this
     * if you just collapsed and need to validate the collapse, for example.
     */
    public boolean isDefaultView() {
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.id(SESSION_CARD_ID)));
        return sessionCard.isDisplayed();
    }

    /**
     * Collapses the session (only if currently in default view)
     */
    public void collapse() {
        if (isDefaultView()) {
            collapseSessionBtn.click();
            driver.getWebDriverWait()
                  .until(ExpectedConditions.presenceOfElementLocated(By.id(COLLAPSED_SESSION_ID)));
        }
    }

    /**
     * Restores the session to default view (only if currently in collapsed view)
     */
    public void restore() {
        if (isCollapsedView()) {
            restoreSessionToggle.click();
            driver.getWebDriverWait()
                  .until(ExpectedConditions.presenceOfElementLocated(By.id(SESSION_CARD_ID)));
        }
    }

    public boolean isCloseButtonDisabled() {
        return !isCloseButtonEnabled();
    }

    /**
     * Clicks the Close button and waits for session card or session dock to completely clear before returning.
     */
    public void closeSession() {
        if (isCloseButtonEnabled()) {
            closeSessionBtn.click();
        }
    }

    public boolean isCloseButtonEnabled() {
        return closeSessionBtn.isEnabled();
    }

    public int getCommentsCount() {
        driver.getWebDriverWait()
              .until(ExpectedConditions.visibilityOf(ccaWizardDialog));
        return viewCommentsList.size();
    }

    /**
     * Waits for progress bar to appear before returning.
     */
    public boolean isAutowrapProgressBarDisplayed() {
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.id(AUTOWRAP_PROGRESS_BAR_ID)));
        return autowrapProgressBar.isDisplayed();
    }

    /**
     * Checks if progress bar is displayed RIGHT NOW, without waiting.
     */
    public boolean isAutowrapProgressBarDisplayedNow() {
        return isElementDisplayedNow(By.id(AUTOWRAP_PROGRESS_BAR_ID));
    }

    public WebElement getViewAllCommentsLink() {
        return viewAllCommentsLink;
    }

    public void viewAllComments() {
        driver.getWebDriverWait()
              .until(ExpectedConditions.visibilityOf(viewAllCommentsLink));
        viewAllCommentsLink.click();
    }

    public List<WebElement> getViewCommentsList() {
        return viewCommentsList;
    }

    public enum SessionClass {
        Call,
        Case,
        General
    }

}
