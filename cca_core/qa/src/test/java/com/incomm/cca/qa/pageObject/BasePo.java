package com.incomm.cca.qa.pageObject;

import com.incomm.aqat.driver.AqatDriver;
import com.incomm.aqat.exception.ErrorRootCause;
import com.incomm.aqat.exception.QaException;
import org.apache.commons.lang3.StringUtils;
import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import static com.incomm.aqat.util.AqatWait.waitForPageLoad;

/**
 * Created by Matt on 7/26/2016.
 */
public abstract class BasePo {

    public static final By OVERLAY_CONTAINER = By.cssSelector("div.cdk-overlay-container");
    public static final By INCOMM_LOGO = By.cssSelector("cca-footer img.incomm-logo");
    protected final AqatDriver driver;
    @FindBy(css = "cca-dock")
    protected WebElement mainDock;
    @FindBy(css = "#transition div.transition-content-container")
    private WebElement transitionOverlay;

    public BasePo(AqatDriver driver) {
        this.driver = driver;
        waitForPageLoad(driver);
        PageFactory.initElements(driver, this);
    }

    public void reload() {
        PageFactory.initElements(driver, this);
    }
	/*
    Methods
     */

    public boolean isElementDisplayedNow(By by) {
        this.driver.turnOffImplicitWaits();
        try {
            return driver.findElement(by)
                         .isDisplayed();
        } catch (NoSuchElementException e) {
            return false;
        } finally {
            this.driver.turnOnImplicitWaits();
        }
    }

    public WebElement findOverlayContainer() throws QaException {
        try {
            // cdk-overlay-container is not in the page until the first time a user clicks an option selector.
            // this is why we are using the driver to see if the elements are displayed.
            driver.getWebDriverWait().until(ExpectedConditions.visibilityOf(this.driver.findElement(OVERLAY_CONTAINER)));
            return this.driver.findElement(OVERLAY_CONTAINER);
        } catch (org.openqa.selenium.NoSuchElementException e) {
            throw new QaException("Could not find overlay container.", ErrorRootCause.NO_SUCH_ELEMENT_FOUND);
        } catch (NullPointerException e) {
            throw new QaException("Could not find the overlay container due to NPE", ErrorRootCause.NULL_POINTER_EXCEPTION);
        }
    }

    public void clickOverlaySelectOptionById(final String optionId) {
        WebDriverWait wait = this.driver.getWebDriverWait();
        wait.until(ExpectedConditions.visibilityOf(findOverlayContainer()));
        wait.until(ExpectedConditions.and(
                ExpectedConditions.visibilityOf(findOverlayContainer()),
                ExpectedConditions.visibilityOf(findOverlayOptionById(optionId)),
                ExpectedConditions.elementToBeClickable(findOverlayOptionById(optionId))
        ));
        WebElement option = driver.findElement(By.id(optionId));
        option.click();
    }

    public WebElement findOverlayOptionById(final String selectId) throws QaException {
        if (StringUtils.isBlank(selectId)) {
            throw new QaException(selectId + " is not a valid parameter", ErrorRootCause.INVALID_PARAMETER);
        }
        WebElement overlay = findOverlayContainer();
        return overlay.findElement(By.id(selectId));
    }
    /**
     * Waits for the transition pieces to finish
     */
    public void waitForTransitionOverlayToGoAway() {
        if (transitionOverlay.isDisplayed()) {
            driver.getWebDriverWait()
                  .until(ExpectedConditions.invisibilityOf(transitionOverlay));
        }
    }

    protected void clickOverlayContainer() {
        driver.findElement(BasePo.OVERLAY_CONTAINER)
              .click();
    }

    protected boolean isChecked(WebElement webElement) {
        String value = webElement.getAttribute("checked");
        return value != null && value.equals("true");
    }

}