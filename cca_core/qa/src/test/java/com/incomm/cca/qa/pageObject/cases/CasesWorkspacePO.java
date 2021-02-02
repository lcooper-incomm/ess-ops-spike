package com.incomm.cca.qa.pageObject.cases;

import com.incomm.aqat.driver.AqatDriver;
import com.incomm.cca.qa.pageObject.BasePo;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

import static com.incomm.aqat.util.AqatWait.waitForPageLoad;

/**
 * Created by gscholes on 10/7/2019
 */
public class CasesWorkspacePO extends BasePo {

    @FindBy(tagName = "cca-case-workspace")
    private WebElement ccaCaseWorkspace;
    @FindBy(tagName = "cca-spinner")
    private WebElement busySpinner;

    //FixMe: This PO is only partially worked. Created just so we can use the NavigationPO for testing.
    public CasesWorkspacePO(final AqatDriver driver) {
        super(driver);
        waitForPageLoad(driver);
        PageFactory.initElements(driver, this);
    }

    public Boolean isDisplayed() {
        return ccaCaseWorkspace.isDisplayed();
    }

    public Boolean isBusy() {
        return busySpinner.isDisplayed();
    }

    /*
     * CaseIdsid
     * ***************************************************************
     */

    public WebElement getCaseIdsidElement() {
        return driver.findElement(By.id("mat-input-34"));
    }

    public String getCaseIdsid() {
        return getCaseIdsidElement().getAttribute("value");
    }

    public void setCaseIdsid(String value) {
        getCaseIdsidElement().sendKeys(value);
    }

    /*
     * SerialNumber
     * ***************************************************************
     */

    public WebElement getSerialNumberElement() {
        return driver.findElement(By.id("mat-input-35"));
    }

    public String getSerialNumber() {
        return getSerialNumberElement().getAttribute("value");
    }

    public void setSerialNumber(String value) {
        getSerialNumberElement().sendKeys(value);
    }

    /*
     * Van
     * ***************************************************************
     */

    public WebElement getVanElement() {
        return driver.findElement(By.id("mat-input-36"));
    }

    public String getVan() {
        return getVanElement().getAttribute("value");
    }

    public void setVan(String value) {
        getVanElement().sendKeys(value);
    }

    /*
     * Assignee
     * ***************************************************************
     */

    public WebElement getAssigneeElement() {
        return driver.findElement(By.id("mat-input-37"));
    }

    public String getAssignee() {
        return getAssigneeElement().getAttribute("value");
    }

    public void setAssignee(String value) {
        getAssigneeElement().sendKeys(value);
    }

    /*
     * Search
     * ***************************************************************
     */

    public WebElement getSearchElement() {
        return driver.findElement(By.cssSelector("div[class*='router-outlet-container'] > cca-case-workspace > div > cca-card-panel:nth-of-type(1) > div > div:nth-of-type(2) > form > div:nth-of-type(3) > button:nth-of-type(1)"));
    }

    public void clickSearch() {
        getSearchElement().click();
    }

    /*
     * Clear
     * ***************************************************************
     */

    public WebElement getClearElement() {
        return driver.findElement(By.cssSelector("div[class*='router-outlet-container'] > cca-case-workspace > div > cca-card-panel:nth-of-type(1) > div > div:nth-of-type(2) > form > div:nth-of-type(3) > button:nth-of-type(2)"));
    }

    public void clickClear() {
        getClearElement().click();
    }

    /*
     * Changesortingforsid
     * ***************************************************************
     */

    public WebElement getChangesortingforsidElement() {
        return driver.findElement(By.cssSelector("button[aria-label='Change sorting for sid']"));
    }

    public void clickChangesortingforsid() {
        getChangesortingforsidElement().click();
    }

    /*
     * ChangesortingforcreatedDa
     * ***************************************************************
     */

    public WebElement getChangesortingforcreatedDaElement() {
        return driver.findElement(By.cssSelector("button[aria-label='Change sorting for createdDate']"));
    }

    public void clickChangesortingforcreatedDa() {
        getChangesortingforcreatedDaElement().click();
    }

    /*
     * Changesortingfortype
     * ***************************************************************
     */

    public WebElement getChangesortingfortypeElement() {
        return driver.findElement(By.cssSelector("button[aria-label='Change sorting for type']"));
    }

    public void clickChangesortingfortype() {
        getChangesortingfortypeElement().click();
    }

    /*
     * Changesortingforqueue
     * ***************************************************************
     */

    public WebElement getChangesortingforqueueElement() {
        return driver.findElement(By.cssSelector("button[aria-label='Change sorting for queue']"));
    }

    public void clickChangesortingforqueue() {
        getChangesortingforqueueElement().click();
    }

    /*
     * Changesortingforstatus
     * ***************************************************************
     */

    public WebElement getChangesortingforstatusElement() {
        return driver.findElement(By.cssSelector("button[aria-label='Change sorting for status']"));
    }

    public void clickChangesortingforstatus() {
        getChangesortingforstatusElement().click();
    }

    /*
     * Changesortingforteam
     * ***************************************************************
     */

    public WebElement getChangesortingforteamElement() {
        return driver.findElement(By.cssSelector("button[aria-label='Change sorting for team']"));
    }

    public void clickChangesortingforteam() {
        getChangesortingforteamElement().click();
    }

    /*
     * Changesortingforassignee
     * ***************************************************************
     */

    public WebElement getChangesortingforassigneeElement() {
        return driver.findElement(By.cssSelector("button[aria-label='Change sorting for assignee']"));
    }

    public void clickChangesortingforassignee() {
        getChangesortingforassigneeElement().click();
    }

    /*
     * Previouspage
     * ***************************************************************
     */

    public WebElement getPreviouspageElement() {
        return driver.findElement(By.cssSelector("button[aria-label='Previous page']"));
    }

    public void clickPreviouspage() {
        getPreviouspageElement().click();
    }

    /*
     * Nextpage
     * ***************************************************************
     */

    public WebElement getNextpageElement() {
        return driver.findElement(By.cssSelector("button[aria-label='Next page']"));
    }

    public void clickNextpage() {
        getNextpageElement().click();
    }

}
