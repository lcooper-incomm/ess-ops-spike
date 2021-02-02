package com.incomm.cca.qa.pageObject.dashboard;

import com.incomm.aqat.component.formcontrol.material1.MdSelect;
import com.incomm.aqat.component.formcontrol.material1.MdTextInput;
import com.incomm.aqat.driver.AqatDriver;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;

/**
 * Created by Matt on 7/26/2016.
 */
public class QuickLookupPo extends DashboardPo {

    /*
    Messages
     */
    public static final String MESSAGE_QUICK_LOOKUP_WIDGET_HEADER_TEXT = "Quick Lookup";
    public static final String MESSAGE_QUICK_LOOKUP_INACTIVE_TEXT = "Inactive";
    public static final String MESSAGE_QUICK_LOOKUP_NOT_AVAILABLE_TEXT = "Not Available";
    public static final String MESSAGE_QUICK_LOOKUP_UNAVAILABLE_TEXT = "Unavailable";
    public static final String MESSAGE_QUICK_LOOKUP_OTHER_TEXT = "Other";
    public static final String MESSAGE_QUICK_LOOKUP_COLD_TEXT = "PIN Is In A Cold Status And Is Ready To Be Activated For Use";
    public static final String MESSAGE_QUICK_LOOKUP_NO_RESULTS = "No Results Found";
    public static final String MESSAGE_QUICK_LOOKUP_UNKNOWN_CARD = "Unknown Card";
    public static final String MESSAGE_QUICK_LOOKUP_ASSOCIATED_CARD = "Associated Card Numbers:";
    public static final String MESSAGE_QUICK_LOOKUP_VIRGIN_COLD_TEXT = "PIN Card PIN Is Cold";
    /*
    Locators
     */
    public static final String WIDGET_CONTAINER_ID = "quick-lookup-widget";
    public static final String WIDGET_HEADER_ID = "quick-lookup-header";
    public static final String SEARCH_TYPE_ID = "quick-lookup-identifier-type";
    public static final String SEARCH_VALUE_ID = "quick-lookup-identifier";
    public static final String BTN_QUICK_STATUS_ID = "quick-lookup-button";
    public static final String RESULT_XPATH = "//*[@id='quick-lookup-result-status']/div/span";
    public static final String FOUND_CARD_ID = "quick-lookup-found-cards";
    public static final String NO_RESULT_ID = "quick-lookup-no-results";
    public static final String SPINNER_ID = "quick-lookup-spinner";
    /*
    WebElements
     */
    @FindBy(id = WIDGET_CONTAINER_ID)
    public WebElement widgetContainer;
    @FindBy(id = WIDGET_HEADER_ID)
    public WebElement widgetHeader;
    @FindBy(id = SEARCH_TYPE_ID)
    public WebElement searchTypeField;
    @FindBy(id = SEARCH_VALUE_ID)
    public WebElement searchValueField;
    @FindBy(id = BTN_QUICK_STATUS_ID)
    public WebElement btnQuickStatus;
    @FindBy(xpath = RESULT_XPATH)
    public WebElement result;
    @FindBy(id = NO_RESULT_ID)
    public WebElement noResult;
    @FindBy(xpath = SPINNER_ID)
    public WebElement quickStatusSpinner;
    @FindBy(id = FOUND_CARD_ID)
    public WebElement hasCardResult;

    public QuickLookupPo(AqatDriver driver) {
        super(driver);
    }

    public MdSelect getSearchTypeField() {
        return new MdSelect(searchTypeField, this.driver);
    }

    public MdTextInput getSearchValueField() {
        return new MdTextInput(searchValueField, this.driver);
    }

    /*
    Md Components
     */

    @Override
    public boolean isDisplayed() {
        return widgetContainer.isDisplayed();
    }

    public String getHeaderText() {
        return widgetHeader.getText();
    }

    /*
    Methods
     */

    public boolean isSearchButtonEnabled() {
        return btnQuickStatus.isEnabled();
    }

    public boolean isSearchButtonDisabled() {
        return !isSearchButtonEnabled();
    }

    public boolean isSearchSpinnerDisplayed() {
        return quickStatusSpinner.isDisplayed();
    }

    public boolean isSearchSpinnerDisplayedNow() {
        return isElementDisplayedNow(By.id(SPINNER_ID));
    }

    /**
     * Clicks search button, and waits for search spinner to disappear
     */
    public void clickSearch() {
        btnQuickStatus.click();
        driver.getWebDriverWait()
              .until(ExpectedConditions.invisibilityOfElementLocated(By.id(SPINNER_ID)));
    }

    public void selectOption(OptionGroup group, Option option) {
        getSearchTypeField().selectOptionInGroupByText(group.getLabel(), option.getLabel());
    }

    /**
     * Does not wait for anything beyond the search spinner's disappearance
     */
    public void search(OptionGroup optionGroup, Option option, String identifier) {
        selectOption(optionGroup, option);
        getSearchValueField().setValue(identifier);
        clickSearch();
    }

    public boolean hasNoResult() {
        return isElementDisplayedNow(By.id(NO_RESULT_ID));
    }

    public boolean hasCardResult() {
        return isElementDisplayedNow(By.id(FOUND_CARD_ID));
    }

    public String getResultText() {
        if (hasNoResult()) {
            return noResult.getText();
        } else if (hasCardResult()) {
            return MESSAGE_QUICK_LOOKUP_ASSOCIATED_CARD;
        } else {
            return result.getText();
        }
    }

    public enum OptionGroup {
        CARD_NUMBER("Card Number"),
        CARD_STATUS("Card Status");
        private String label;

        OptionGroup(String label) {
            this.label = label;
        }

        public String getLabel() {
            return this.label;
        }
    }

    public enum Option {
        BOOST("Boost PIN"),
        MICROSOFT("Microsoft VAN"),
        MICROSOFT_PIN("Microsoft PIN"),
        NET10("Net10 PIN"),
        TRACFONE("TracFone PIN"),
        VIRGIN("Virgin PIN"),
        GREENCARD_CAN("Greencard CAN"),
        GREENCARD_SERIAL("Greencard Serial Number"),
        VMS_ACCOUNT("VMS Account Number"),
        VMS_CARD_ID("VMS Card ID"),
        VMS_SERIAL("VMS Serial Number");
        private String label;

        Option(String label) {
            this.label = label;
        }

        public String getLabel() {
            return this.label;
        }
    }
}
