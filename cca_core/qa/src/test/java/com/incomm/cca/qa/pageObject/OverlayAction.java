package com.incomm.cca.qa.pageObject;

import com.incomm.aqat.driver.AqatDriver;
import com.incomm.aqat.exception.ErrorRootCause;
import com.incomm.aqat.exception.QaException;
import org.apache.commons.lang.StringUtils;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class OverlayAction  {

    public static void clickOverlaySelectOptionById(AqatDriver driver , final String optionId) {
        WebDriverWait wait = driver.getWebDriverWait();
        wait.until(ExpectedConditions.visibilityOf(findOverlayContainer(driver)));
        wait.until(ExpectedConditions.and(
                ExpectedConditions.visibilityOf(findOverlayContainer(driver)),
                ExpectedConditions.visibilityOf(findOverlayOptionById(driver, optionId)),
                ExpectedConditions.elementToBeClickable(findOverlayOptionById(driver, optionId))
        ));
        WebElement option = driver.findElement(By.id(optionId));
        option.click();
    }

    /**
     * The overlay container is a dynamic page tag that has unpredictable render times. Need to use base driver to
     * get this element in a page after it is rendered in the page.
     * It needs to be used with a FluentWait so that it can be polled periodically.
     *
     * @return
     */
    public static WebElement findOverlayContainer(AqatDriver driver) throws QaException {
        try {
            WebDriverWait wait = driver.getWebDriverWait();
            // cdk-overlay-container is not in the page until the first time a user clicks an option selector.
            // this is why we are using the driver to see if the elements are displayed.
            wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.className("cdk-overlay-container"))));
            return driver.findElement(By.className("cdk-overlay-container"));
        } catch (org.openqa.selenium.NoSuchElementException e) {
            throw new QaException("Could not find overlay container.", ErrorRootCause.NO_SUCH_ELEMENT_FOUND);
        } catch (NullPointerException e) {
            throw new QaException("Could not find the overlay container due to NPE", ErrorRootCause.NULL_POINTER_EXCEPTION);
        }
    }

    public static WebElement findOverlayOptionById(AqatDriver driver, final String selectId) throws QaException {
        if (StringUtils.isBlank(selectId)) {
            throw new QaException(selectId + " is not a valid parameter", ErrorRootCause.INVALID_PARAMETER);
        }
        WebElement overlay = findOverlayContainer(driver);
        return overlay.findElement(By.id(selectId));
    }

    public static String findOverlayOptionText(AqatDriver driver, final String optionId) throws QaException {
        if (StringUtils.isBlank(optionId)) {
            throw new QaException(optionId + " is not a valid parameter", ErrorRootCause.INVALID_PARAMETER);
        }
        return findOverlayOptionById(driver, optionId).getText();
    }

    // Added to Action instead of Page due to dynamic nature of overlay.
    public static Boolean isOptionDisplayed(AqatDriver driver, final String optionText) throws QaException {
        if (StringUtils.isBlank(optionText)) {
            throw new QaException(optionText + " is not a valid parameter", ErrorRootCause.INVALID_PARAMETER);
        }
        return findOverlayOptionById(driver, optionText).isDisplayed();
    }
}
