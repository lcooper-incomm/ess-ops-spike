package com.incomm.cca.qa.pageObject.reports;

import com.incomm.aqat.driver.AqatDriver;
import com.incomm.cca.qa.pageObject.BasePo;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

import static com.incomm.aqat.util.AqatWait.waitForPageLoad;

public class ReportsMenuPo extends BasePo {

    @FindBy(className = "super-menu reports-menu")
    private WebElement reportsMenuContainer;

    public ReportsMenuPo(final AqatDriver driver) {
        super(driver);
        waitForPageLoad(driver);
        PageFactory.initElements(driver, this);
    }

    public Boolean isDisplayed() {
        return reportsMenuContainer.isDisplayed();
    }

}
