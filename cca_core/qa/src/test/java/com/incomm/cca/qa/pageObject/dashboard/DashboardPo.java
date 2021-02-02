package com.incomm.cca.qa.pageObject.dashboard;

import com.incomm.aqat.driver.AqatDriver;
import com.incomm.cca.qa.pageObject.BasePo;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;

import static com.incomm.aqat.util.AqatWait.waitForPageLoad;

public class DashboardPo extends BasePo {

    @FindBy(css = "div.dashboard-container")
    private WebElement dashboardContainer;
    /*
    WebElements
     */

    public DashboardPo(AqatDriver driver) {
        super(driver);
        waitForPageLoad(driver);
        PageFactory.initElements(driver, this);
    }
	
    /*
    Methods
     */

    public WebElement getDashboardContainer() {
        return dashboardContainer;
    }

    public boolean isDisplayed() {
        return dashboardContainer.isDisplayed();
    }

    public void waitForDashboardContainerToBeVisible() {
        driver.getWebDriverWait()
              .until(ExpectedConditions.visibilityOf(dashboardContainer));
    }

}
