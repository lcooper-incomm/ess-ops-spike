package com.incomm.cca.qa.pageObject.services;

import com.incomm.aqat.driver.AqatDriver;
import com.incomm.cca.qa.pageObject.BasePo;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

import static com.incomm.aqat.util.AqatWait.waitForPageLoad;

public class ServicesPanelPO extends BasePo {

    //WEB ELEMENTS
    @FindBy(css = "div.mat-menu-panel.services-menu")
    private WebElement servicesWrapper;

    public ServicesPanelPO(AqatDriver driver) {
        super(driver);
        waitForPageLoad(driver);
        PageFactory.initElements(driver, this);
    }

    //todo: These fields are legacy fields
//	@FindBy( id = "bulk-deactivate" )
//	private WebElement bulkDeactivate;
//
//	@FindBy( id = "bulk-product-export" )
//	private WebElement bulkProductExport;
//
//	@FindBy( id = "kyc" )
//	private WebElement kyc;
//
//	@FindBy( id = "jira-search" )
//	private WebElement jiraSearch;
//
//	@FindBy( id = "order-new-card" )
//	private WebElement orderNewCard;
//
//	@FindBy( id = "job-queue" )
//	private WebElement jobQueue;

    //Methods
    public Boolean isDisplayed() {

        return servicesWrapper.isDisplayed();

    }

}
