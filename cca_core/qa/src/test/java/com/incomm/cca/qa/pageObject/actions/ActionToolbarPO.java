package com.incomm.cca.qa.pageObject.actions;

import com.incomm.aqat.driver.AqatDriver;
import com.incomm.cca.qa.pageObject.details.DetailsPo;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Created by Matt on 7/26/2016.
 */
public class ActionToolbarPO extends DetailsPo {

    /*
    Card Actions
     */
    public static final List<String> INITIAL_GC_ACTIONS = new ArrayList<String>(Arrays.asList("ADJUST BALANCE", "C2C TRANSFER", "CHANGE STATUS", "REPLACE CARD"));
    public static final List<String> ACTIVE_GC_ACTIONS = new ArrayList<String>(Arrays.asList("ADJUST BALANCE", "C2C TRANSFER", "CHANGE STATUS", "REPLACE CARD"));
    public static final List<String> DEACTIVE_GC_ACTIONS = new ArrayList<String>(Arrays.asList("ADJUST BALANCE", "CHANGE STATUS"));
    public static final List<String> ON_HOLD_GC_ACTIONS = new ArrayList<String>(Arrays.asList("ADJUST BALANCE", "CHANGE STATUS"));
    public static final List<String> STOLEN_GC_ACTIONS = new ArrayList<String>(Arrays.asList("ADJUST BALANCE", "CHANGE STATUS", "REPLACE CARD"));
    public static final List<String> LOST_GC_ACTIONS = new ArrayList<String>(Arrays.asList("ADJUST BALANCE", "CHANGE STATUS", "REPLACE CARD"));
    public static final List<String> BAD_CREDIT_GC_ACTIONS = new ArrayList<String>(Arrays.asList("ADJUST BALANCE", "CHANGE STATUS", "MERCHANDISE RELEASE"));
    public static final List<String> DEFAULT_GC_ACTIONS = new ArrayList<String>(Arrays.asList("ADJUST BALANCE"));
    public static final List<String> EXPIRED_GC_ACTIONS = new ArrayList<String>(Arrays.asList("ADJUST BALANCE", "CHANGE STATUS", "REPLACE CARD"));
    public static final List<String> RR_GC_ACTIONS = new ArrayList<String>(Arrays.asList("ACTIVATE CARD", "ADJUST BALANCE", "CHANGE STATUS", "REPLACE CARD"));
    /*
    Locators
     */
    public static final String TOOLBAR_ID = "details-action-toolbar";
    public static final String ACTION_BUTTON_XPATH = "//button[@data-qa-action-key='%s']";
    public static final String DISPLAYED_ACTION_BUTTONS_XPATH = "//button[@data-qa-action-key]";
    /*
    WebElements
     */
    @FindBy(id = TOOLBAR_ID)
    public WebElement toolbar;
    @FindBy(xpath = DISPLAYED_ACTION_BUTTONS_XPATH)
    public List<WebElement> displayedButtons;

    public ActionToolbarPO(AqatDriver driver) {
        super(driver);
        PageFactory.initElements(driver, this);
    }

    public boolean isDisplayed() {
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.id(TOOLBAR_ID)));
        return toolbar.isDisplayed();
    }

    /*
    Methods
     */

    public boolean isActionButtonDisplayedNow(ActionKey actionKey) {
        return isElementDisplayedNow(By.xpath(formatActionButtonSelector(actionKey)));
    }

    public WebElement findActionButton(ActionKey actionKey) {
        driver.getWebDriverWait()
              .until(ExpectedConditions.visibilityOfElementLocated(By.xpath(formatActionButtonSelector(actionKey))));
        return driver.findElement(By.xpath(formatActionButtonSelector(actionKey)));
    }

    public void clickActionButton(ActionKey actionKey) {
        WebElement button = findActionButton(actionKey);
        button.click();
        driver.getWebDriverWait()
              .until(ExpectedConditions.visibilityOfElementLocated(By.id(ActionDialogPO.DIALOG_CONTAINER_ID)));
    }

    private String formatActionButtonSelector(ActionKey actionKey) {
        return String.format(ACTION_BUTTON_XPATH, actionKey);
    }

    public List<String> getDisplayedActionNames() {
        driver.getWebDriverWait()
              .until(ExpectedConditions.visibilityOfElementLocated(By.xpath(DISPLAYED_ACTION_BUTTONS_XPATH)));
        List<String> displayedActionNames = new ArrayList<>();
        for (WebElement item : displayedButtons) {
            displayedActionNames.add(item.getText());
        }
        return displayedActionNames;
    }

    public enum ActionKey {
        ACTIVATE_FAST_CARD,
        CCL_ACTIVATE_CARD,
        CHANGE_SESSION_TYPE,
        FASTCARD_DEACTIVATE,
        GREENCARD_ACTIVATE_B2B_CARD,
        GREENCARD_ACTIVATE_GIFT_CARD,
        GREENCARD_ADJUST_BALANCE,
        GREENCARD_CHANGE_STATUS,
        GREENCARD_REPLACE_CARD,
        GREENCARD_TRANSFER_CARD,
        GREENCARD_RELEASE_MERCHANDISE,
        LOCATION_CHALLENGE_PASSWORD,
        VMS_RESET_PIN,
        VMS_ADJUST_BALANCE,
        VMS_CHANGE_STATUS,
        VMS_ACTIVATE_CARD,
        VMS_REGISTER_CARD,
        VMS_C2C_TRANSFER_REQUEST,
        VMS_REPLACE_CARD,
        VMS_RESET_ONLINE_PASSWORD,
        VMS_SEND_FORM,
        VMS_EDIT_CARD_HOLDER
    }
}
