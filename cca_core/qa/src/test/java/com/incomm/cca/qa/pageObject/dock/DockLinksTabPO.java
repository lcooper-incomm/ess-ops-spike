package com.incomm.cca.qa.pageObject.dock;

import com.incomm.aqat.driver.AqatDriver;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;

/**
 * Created by Allen on 1/30/2017.
 */
public class DockLinksTabPO extends DockPo {

    /*
    Locators
     */
    public static final String TAB_ID = "links-content";
    /*
    WebElements
     */
    @FindBy(id = TAB_ID)
    public WebElement linksTab;

    public DockLinksTabPO(AqatDriver driver) {
        super(driver);
    }

    /*
    Methods
     */

    public boolean isDisplayed() {
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.id(TAB_ID)));
        return linksTab.isDisplayed();
    }
}
