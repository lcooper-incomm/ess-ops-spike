package com.incomm.cca.qa.pageObject;

import com.incomm.aqat.driver.AqatDriver;
import com.incomm.aqat.exception.ErrorRootCause;
import com.incomm.aqat.exception.QaException;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import java.util.List;

public class OverlayPage extends BasePo implements ComponentPage {

    public static final By SELECTION_PANEL = By.cssSelector("div.mat-select-panel-wrap");
    public static final By OVERLAY_CONTAINER = By.cssSelector("div.cdk-overlay-container");
    public static final By OVERLAY_BACKDROP = By.cssSelector("div.cdk-overlay-backdrop");
    public static final By OPTIONS = By.tagName("mat-option");
    private AqatDriver driver;

    public OverlayPage(final AqatDriver driver) {
        super(driver);
    }

    public Boolean isOpen() throws QaException {
        try {
            return ((null != driver.findElement(OVERLAY_CONTAINER)) && (null != driver.findElement(OVERLAY_CONTAINER).findElement(OVERLAY_BACKDROP)));
        } catch (NullPointerException e) {
            throw new QaException("Could not determine if overlay is open", ErrorRootCause.NULL_POINTER_EXCEPTION);
        }
    }

    public Boolean isBackdropDisplayed() {
        return driver.findElement(OVERLAY_BACKDROP)
                     .isDisplayed();
    }

    public Boolean isSelectPanelDisplayed() {
        return driver.findElement(SELECTION_PANEL)
                     .isDisplayed();
    }

    public List<WebElement> getSelections() {
        return driver.findElement(SELECTION_PANEL).findElements(OPTIONS);
    }

    @Override
    public Boolean isDisplayed() {
        return isBackdropDisplayed() || isSelectPanelDisplayed();
    }

}
