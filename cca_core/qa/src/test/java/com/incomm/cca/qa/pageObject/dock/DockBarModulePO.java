package com.incomm.cca.qa.pageObject.dock;

import com.incomm.aqat.driver.AqatDriver;
import com.incomm.cca.qa.pageObject.BasePo;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.PageFactory;

import static com.incomm.aqat.util.AqatWait.waitForPageLoad;

/**
 * Created by gscholes on 10/10/2019
 */
public class DockBarModulePO extends BasePo {

    public static final By SESSION_SELECTION_BUTTON = By.cssSelector("cca-dock-button#session-selections-button div button");
    public static final By SESSION_HISTORY_BUTTON = By.cssSelector("cca-dock-button#session-history-button div button");
    public static final By DOCK_WORKSPACE_BUTTON = By.cssSelector("cca-dock-button#dock-workspace-button div button");
    public static final By DOCK_HELP_BUTTON = By.cssSelector("cca-dock-button#dock-help-button div button");
    public static final By DOCK_PIN_BUTTON = By.id("dock-pin-button");
    public static final By DOCK_BAR = By.cssSelector("div.dock-bar");
    public static final By QUEUE_LINKS_BUTTON = By.cssSelector("cca-dock-button#queue-links-button div button");
    public static final By QUEUE_SERVICES_BUTTON = By.cssSelector("cca-dock-button#queue-services-button div button");
    public static final By QUEUE_PHONE_BUTTON = By.cssSelector("cca-dock-button#queue-phone-button div button");
    public static final By QUEUE_DIRECTORY_BUTTON = By.cssSelector("cca-dock-button#queue-directory-button div button");

    public DockBarModulePO(final AqatDriver driver) {
        super(driver);
        waitForPageLoad(driver);
        PageFactory.initElements(driver, this);
    }

    /*
     * DockBar
     * ***************************************************************
     */

    public WebElement getDockBarElement() {
        return driver.findElement(DOCK_BAR);
    }

    public void clickDockBar() {
        getDockBarElement().click();
    }

    /*
     * SessionsSelectionButton
     * ***************************************************************
     */

    public WebElement getSessionsSelectionButtonElement() {
        return driver.findElement(SESSION_SELECTION_BUTTON);
    }

    public void clickSessionsSelectionButton() {
        getSessionsSelectionButtonElement().click();
    }

    /*
     * SessionHistoryButton
     * ***************************************************************
     */

    public WebElement getSessionHistoryButtonElement() {
        return driver.findElement(SESSION_HISTORY_BUTTON);
    }

    public void clickSessionHistoryButton() {
        getSessionHistoryButtonElement().click();
    }

    /*
     * DockWorkspaceButton
     * ***************************************************************
     */

    public WebElement getDockWorkspaceButtonElement() {
        return driver.findElement(DOCK_WORKSPACE_BUTTON);
    }

    public void clickDockWorkspaceButton() {
        getDockWorkspaceButtonElement().click();
    }

    /*
     * DockHelpButton
     * ***************************************************************
     */

    public WebElement getDockHelpButtonElement() {
        return driver.findElement(DOCK_HELP_BUTTON);
    }

    public void clickDockHelpButton() {
        getDockHelpButtonElement().click();
    }

    /*
     * DockPinButton
     * ***************************************************************
     */

    public WebElement getDockPinButtonElement() {
        return driver.findElement(DOCK_PIN_BUTTON);
    }

    public void clickDockPinButton() {
        getDockPinButtonElement().click();
    }


    /*
     * QLinksButton
     * ***************************************************************
     */

    public WebElement getQLinksButtonElement() {
        return driver.findElement(QUEUE_LINKS_BUTTON);
    }

    public void clickQLinksButton() {
        getQLinksButtonElement().click();
    }

    /*
     * QServicesButton
     * ***************************************************************
     */

    public WebElement getQServicesButtonElement() {
        return driver.findElement(QUEUE_SERVICES_BUTTON);
    }

    public void clickQServicesButton() {
        getQServicesButtonElement().click();
    }

    /*
     * QPhoneButton
     * ***************************************************************
     */

    public WebElement getQPhoneButtonElement() {
        return driver.findElement(QUEUE_PHONE_BUTTON);
    }

    public void clickQPhoneButton() {
        getQPhoneButtonElement().click();
    }

    /*
     * QDirectoryButton
     * ***************************************************************
     */

    public WebElement getQDirectoryButtonElement() {
        return driver.findElement(QUEUE_DIRECTORY_BUTTON);
    }

    public void clickQDirectoryButton() {
        getQDirectoryButtonElement().click();
    }

}
