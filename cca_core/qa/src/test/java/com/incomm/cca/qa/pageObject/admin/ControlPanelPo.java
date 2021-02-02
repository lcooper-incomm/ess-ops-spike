package com.incomm.cca.qa.pageObject.admin;

import com.incomm.aqat.driver.AqatDriver;
import com.incomm.cca.qa.pageObject.BasePo;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

import static com.incomm.aqat.util.AqatWait.waitForPageLoad;

public class ControlPanelPo extends BasePo {

    @FindBy(css = "div.mat-menu-panel.control-panel-menu")
    private WebElement controlPanelContainer;

    public ControlPanelPo(AqatDriver driver) {
        super(driver);
        waitForPageLoad(driver);
        PageFactory.initElements(driver, this);
    }

    public Boolean isDisplayed() {
        return controlPanelContainer.isDisplayed();
    }

}
