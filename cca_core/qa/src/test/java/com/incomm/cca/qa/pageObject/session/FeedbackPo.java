package com.incomm.cca.qa.pageObject.session;

import com.incomm.aqat.driver.AqatDriver;
import com.incomm.cca.qa.pageObject.dock.DockPo;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;

/**
 * Selenium Page Object for the "Feedback" tab of the Dock in CCA
 * <p>
 * User: Darren Carpenter (dcarpenter)
 * Date: 11/30/2016
 */
public class FeedbackPo extends DockPo {

    //LOCATORS
    public static final String DOCK_FEEDBACK_HEADER_XPATH = "//*[@id='atlScriptlet']//*[text() = 'CCA Feedback']";
    //WEB ELEMENTS
    @FindBy(xpath = DOCK_FEEDBACK_HEADER_XPATH)
    WebElement dockFeedbackHeader;

    public FeedbackPo(AqatDriver driver) {
        super(driver);
    }

    public String getHeaderText() {

        driver.switchTo()
              .frame("atlwdg-frame");
        driver.getWebDriverWait()
              .until(ExpectedConditions.visibilityOf(dockFeedbackHeader));
        String feedbackHeader = dockFeedbackHeader.getText();
        driver.switchTo()
              .defaultContent();
        return feedbackHeader;

    }

}
