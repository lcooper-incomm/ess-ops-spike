package com.incomm.cca.qa.pageObject.session;

import com.incomm.aqat.driver.AqatDriver;
import com.incomm.cca.qa.pageObject.BasePo;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

import static com.incomm.aqat.util.AqatWait.waitForPageLoad;

public class SessionDetailPO extends BasePo {

    @FindBy(css = "cca-detail div.detail-container")
    private WebElement sessionDetailContainer;
    @FindBy(css = "cca-detail cca-card-panel div.card-header.primary h4")
    private WebElement cardHeaderContent;

    public SessionDetailPO(final AqatDriver driver) {
        super(driver);
        waitForPageLoad(driver);
        PageFactory.initElements(driver, this);
    }

    public boolean isDisplayed() {
        return sessionDetailContainer.isDisplayed();
    }

    public WebElement getSessionDetailContainer() {
        return sessionDetailContainer;
    }

    public String getCardHeaderContent() {
        return cardHeaderContent.getText();
    }
}
