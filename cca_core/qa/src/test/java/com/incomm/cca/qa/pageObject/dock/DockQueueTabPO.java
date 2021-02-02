package com.incomm.cca.qa.pageObject.dock;

import com.incomm.aqat.driver.AqatDriver;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;

/**
 * Created by Allen on 1/30/2017.
 */
public class DockQueueTabPO extends DockPo {

    /*
    Locators
     */
    public static final String TAB_ID = "queue-content";
    /*
    WebElements
     */
    @FindBy(id = TAB_ID)
    public WebElement queueTab;

    public DockQueueTabPO(AqatDriver driver) {
        super(driver);
    }

    /*
    Methods
     */

    public boolean isDisplayed() {
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.id(TAB_ID)));
        return queueTab.isDisplayed();
    }
}
