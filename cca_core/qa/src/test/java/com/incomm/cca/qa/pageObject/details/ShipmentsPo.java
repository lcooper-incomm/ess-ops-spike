package com.incomm.cca.qa.pageObject.details;

import com.incomm.aqat.driver.AqatDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

public class ShipmentsPo extends DetailsPo {

    // LOCATORS
    public static final String FILTER_CSS = "#order-shipments-filter input";
    public static final String SHIPMENTS_TOTAL_COUNT_ID = "order-shipments-total-count";
    // WEB ELEMENTS
    @FindBy(css = FILTER_CSS)
    public WebElement filter;
    @FindBy(id = SHIPMENTS_TOTAL_COUNT_ID)
    public WebElement shipmentsTotalCount;

    public ShipmentsPo(AqatDriver driver) {
        super(driver);
    }
}
