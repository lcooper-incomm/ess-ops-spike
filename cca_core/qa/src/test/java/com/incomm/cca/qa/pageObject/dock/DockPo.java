package com.incomm.cca.qa.pageObject.dock;

import com.incomm.aqat.driver.AqatDriver;
import com.incomm.aqat.util.AqatExpectedConditions;
import com.incomm.cca.qa.pageObject.BasePo;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;

import static com.incomm.aqat.util.AqatWait.waitForPageLoad;

public class DockPo extends BasePo {

    /*
    WebElements
     */
    @FindBy(id = "dock-pin-button")
    private WebElement dockPinButton;
    @FindBy(tagName = "cca-dock")
    private WebElement dockContainer;
    @FindBy(id = "dock-workspace-button")
    private WebElement workspaceButton;
    @FindBy(id = "dock-help-button")
    private WebElement helpButton;
    @FindBy(id = "dock-wrapper")
    private WebElement dockWrapper;
    @FindBy(id = "dock-toggle")
    private WebElement dockToggle;
    @FindBy(id = "dock-maximize")
    private WebElement btnMaximize;
    @FindBy(id = "dock-minimize")
    private WebElement btnMinimize;
    @FindBy(id = "pin-dock")
    private WebElement btnPin;
    @FindBy(id = "dock-tab-directory")
    private WebElement btnDirectoryTab;
    @FindBy(id = "dock-tab-feedback")
    private WebElement btnFeedbackTab;
    @FindBy(id = "dock-tab-help")
    private WebElement btnHelpTab;
    @FindBy(id = "dock-tab-links")
    private WebElement btnLinksTab;
    @FindBy(id = "dock-tab-queue")
    private WebElement btnQueueTab;
    @FindBy(id = "dock-tab-services")
    private WebElement btnServicesTab;
    @FindBy(id = "dock-tab-workspace")
    private WebElement btnWorkspaceTab;

    public DockPo(AqatDriver driver) {
        super(driver);
        waitForPageLoad(driver);
        PageFactory.initElements(driver, this);
    }

   /*
    Methods
     */

    public boolean isDisplayed() {
        return dockContainer.isDisplayed();
    }

    public boolean isOpen() {
        driver.getWebDriverWait()
              .until(ExpectedConditions.visibilityOf(dockWrapper));
        return dockWrapper.getAttribute("class")
                          .contains("open");
    }

    public boolean isClosed() {
        return !isOpen();
    }

    public void open() {
        if (!isOpen()) {
            dockToggle.click();
            driver.getWebDriverWait()
                  .until(ExpectedConditions.attributeContains(dockWrapper, "class", "open"));
            driver.getWebDriverWait()
                  .until(AqatExpectedConditions.elementisNotMoving(dockToggle));
        }
    }

    public void close() {
        if (isOpen()) {
            dockToggle.click();
            driver.getWebDriverWait()
                  .until(AqatExpectedConditions.attributeDoesNotContain(dockWrapper, "class", "open"));
            driver.getWebDriverWait()
                  .until(AqatExpectedConditions.elementisNotMoving(dockToggle));
        }
    }

    /**
     * Toggles the open/close stateOrProvince of the dock.
     *
     * @return true if open, false if closed after toggling
     */
    public Boolean toggle() {
        if (isOpen()) {
            close();
        } else {
            open();
        }
        return isOpen();
    }

    public Boolean isUnpinned() {
        driver.getWebDriverWait()
              .until(ExpectedConditions.visibilityOf(dockWrapper));
        return dockWrapper.getAttribute("class")
                          .contains("unpinned");
    }

    public Boolean isPinned() {
        return !isUnpinned();
    }

    public void pin() {
        if (isUnpinned()) {
            btnPin.click();
            driver.getWebDriverWait()
                  .until(AqatExpectedConditions.attributeDoesNotContain(dockWrapper, "class", "unpinned"));
        }
    }

    public void unpin() {
        if (isPinned()) {
            btnPin.click();
            driver.getWebDriverWait()
                  .until(ExpectedConditions.attributeContains(dockWrapper, "class", "unpinned"));
        }
    }

    public void minimize() {
        if (isPinned() && isOpen()) {
            btnMinimize.click();
            driver.getWebDriverWait()
                  .until(AqatExpectedConditions.elementisNotMoving(dockWrapper));
        }
    }

    public void maximize() {
        if (isPinned() && isClosed()) {
            btnMaximize.click();
            driver.getWebDriverWait()
                  .until(AqatExpectedConditions.elementisNotMoving(dockWrapper));
        }
    }

    public void clickFeedback() {
        btnFeedbackTab.click();
    }

    public void goToDirectoryTab() {
        handleButtonClick(btnDirectoryTab);
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.id(DockDirectoryTabPO.TAB_ID)));
    }

    public void goToHelpTab() {
        handleButtonClick(btnHelpTab);
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath(DockHelpTabPO.TAB_XPATH)));
    }

    public void goToLinksTab() {
        handleButtonClick(btnLinksTab);
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.id(DockLinksTabPO.TAB_ID)));
    }

    public void goToQueueTab() {
        handleButtonClick(btnQueueTab);
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.id(DockQueueTabPO.TAB_ID)));
    }

    public void goToServicesTab() {
        handleButtonClick(btnServicesTab);
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.id(DockServicesTabPO.TAB_ID)));
    }

    public void goToWorkspaceTab() {
        handleButtonClick(btnWorkspaceTab);
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.id(DockWorkspaceTabPO.TAB_ID)));
    }

    private void handleButtonClick(WebElement webElement) {
        if (isClosed()) {
            webElement.click();
            driver.getWebDriverWait()
                  .until(AqatExpectedConditions.elementisNotMoving(dockWrapper));
        } else if (!webElement.getAttribute("class")
                              .contains("active")) {
            webElement.click();
        }
    }

}
