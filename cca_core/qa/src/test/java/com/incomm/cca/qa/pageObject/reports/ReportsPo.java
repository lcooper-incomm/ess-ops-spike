package com.incomm.cca.qa.pageObject.reports;

import com.incomm.aqat.driver.AqatDriver;
import com.incomm.cca.qa.pageObject.BasePo;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

import static com.incomm.aqat.util.AqatWait.waitForPageLoad;

public class ReportsPo extends BasePo {

    // WEB ELEMENTS
    @FindBy(tagName = "cca-report")
    WebElement reportsContainer;

    public ReportsPo(AqatDriver driver) {
        super(driver);
        waitForPageLoad(driver);
        PageFactory.initElements(driver, this);
    }

    // METHODS
    public Boolean isDisplayed() {

        return reportsContainer.isDisplayed();

    }

}
