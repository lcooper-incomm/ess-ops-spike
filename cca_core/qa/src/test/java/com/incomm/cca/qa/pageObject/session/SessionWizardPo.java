package com.incomm.cca.qa.pageObject.session;

import com.incomm.aqat.component.formcontrol.material2.MatSelect;
import com.incomm.aqat.driver.AqatDriver;
import com.incomm.cca.qa.pageObject.BasePo;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

import static com.incomm.aqat.util.AqatWait.waitForPageLoad;

public class SessionWizardPo extends BasePo {

    public static final By SESSION_CLASS = By.cssSelector("#create-session-session-class");
    public static final By SESSION_TYPE = By.cssSelector("#create-session-session-type");
    public static final By HEADER_TEXT = By.cssSelector("div.header-container");
    public static final By CLOSE_BUTTON = By.id("close-button");
    public static final By BACK_BUTTON = By.id("back-button");
    public static final By CREATE_BUTTON = By.id("next-button");
    /*
    WebElements
     */
    @FindBy(id = "create-session-session-class")
    private WebElement selectSessionClass;
    @FindBy(id = "create-session-session-type")
    private WebElement selectSessionType;

    public SessionWizardPo(final AqatDriver driver) {
        super(driver);
        waitForPageLoad(driver);
        PageFactory.initElements(driver, this);
    }

    public MatSelect getSessionClass() {
        return new MatSelect(selectSessionClass, this.driver);
    }

    public MatSelect getSessionType() {
        return new MatSelect(selectSessionType, this.driver);
    }

    public SessionPo createSessionOfType(SessionPo.SessionClass sessionClass) {
        if (sessionClass == null) {
            throw new IllegalArgumentException("sessionClass cannot be null");
        }
        getSessionClass().chooseOption(sessionClass.toString());
        if (sessionClass == SessionPo.SessionClass.Case) {
            getSessionType().chooseOption("Dispute");
        }
        clickCreateButton();
        return new SessionPo(driver);
    }

    /*
     * CaseSessionClass
     * ***************************************************************
     */

    public WebElement getSessionClassElement() {
        return driver.findElement(SESSION_CLASS);
    }


    /*
     * SessionTypeSessionType
     * ***************************************************************
     */

    public WebElement getSessionTypeElement() {
        return driver.findElement(SESSION_TYPE);
    }

    /*
     * CreateButton
     * ***************************************************************
     */

    public WebElement getCreateButtonElement() {
        return driver.findElement(CREATE_BUTTON);
    }

    public void clickCreateButton() {
        getCreateButtonElement().click();
    }

    /*
     * Backbutton
     * ***************************************************************
     */

    public WebElement getBackbuttonElement() {
        return driver.findElement(BACK_BUTTON);
    }

    public void clickBackbutton() {
        getBackbuttonElement().click();
    }

    /*
     * Closebutton
     * ***************************************************************
     */

    public WebElement getCloseButtonElement() {
        return driver.findElement(CLOSE_BUTTON);
    }

    public void clickCloseButton() {
        getCloseButtonElement().click();
    }


    /*
     * EmailCcaSupport
     * ***************************************************************
     */

    public WebElement getHeaderElement() {
        return driver.findElement(HEADER_TEXT);
    }

    public String getHeaderText() {
        return getHeaderElement().getText();
    }

}
