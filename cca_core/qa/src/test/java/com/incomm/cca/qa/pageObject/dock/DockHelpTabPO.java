package com.incomm.cca.qa.pageObject.dock;

import com.incomm.aqat.driver.AqatDriver;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;

/**
 * Created by Allen on 1/30/2017.
 */
public class DockHelpTabPO extends DockPo {

    /*
    Locators
     */
    public static final String TAB_HEADER_ID = "dock-help-tab-header";
    public static final String TAB_XPATH = "//div[contains(@class, 'help-tab')]";
    public static final String USER_GUIDE_LINK_ID = "user-guide";
    /*
    WebElements
     */
    @FindBy(id = TAB_HEADER_ID)
    public WebElement header;
    @FindBy(xpath = TAB_XPATH)
    public WebElement helpTab;
    @FindBy(id = USER_GUIDE_LINK_ID)
    public WebElement userGuideLink;

    public DockHelpTabPO(AqatDriver driver) {
        super(driver);
    }

    /*
    Methods
     */

    public boolean isDisplayed() {
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.id(TAB_XPATH)));
        return helpTab.isDisplayed();
    }

    public void clickUserGuideLink() {
        userGuideLink.click();
    }
}
