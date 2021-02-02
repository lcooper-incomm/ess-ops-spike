package com.incomm.cca.qa.pageObject.services;

import com.incomm.aqat.driver.AqatDriver;
import com.incomm.cca.qa.pageObject.BasePo;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

import static com.incomm.aqat.util.AqatWait.waitForPageLoad;

public class ServicesMenuPO extends BasePo {

    @FindBy(linkText = "Order New Card")
    private WebElement orderNewCardLink;
    @FindBy(linkText = "Job Queue")
    private WebElement jobQueueLink;

    public ServicesMenuPO(final AqatDriver driver) {
        super(driver);
        waitForPageLoad(driver);
        PageFactory.initElements(driver, this);
    }

    public WebElement getOrderNewCardLink() {
        return orderNewCardLink;
    }

    public WebElement getJobQueueLink() {
        return jobQueueLink;
    }
}
