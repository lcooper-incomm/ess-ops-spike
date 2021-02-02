package com.incomm.cca.qa.pageObject.dashboard;

import com.incomm.aqat.component.formcontrol.material1.MdSelect;
import com.incomm.aqat.component.formcontrol.material1.MdTextInput;
import com.incomm.aqat.driver.AqatDriver;
import com.incomm.cca.qa.pageObject.details.DetailsPo;
import com.incomm.cca.qa.pageObject.search.SearchPo;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;

/**
 * Created by Matt on 7/26/2016.
 */
public class QuickSearchPo extends DashboardPo {

    public static final String MESSAGE_QUICK_SEARCH_WIDGET_TEXT = "Quick Search";
    /*
    Locators
     */
    public static final String WIDGET_CONTAINER_ID = "quick-search-widget";
    public static final String WIDGET_HEADER_ID = "quick-search-label";
    public static final String SEARCH_TYPE_ID = "quick-search-type";
    public static final String SEARCH_VALUE_ID = "quick-search-value";
    public static final String BTN_QUICK_SEARCH_ID = "quick-search";
    public static final String SEARCH_SPINNER_XPATH = "//*[contains(@class,'spinner-search-btn-spinner')]";
    public static final String SEARCH_NAV_ID = "nav-search";
    public static final String CUSTOMER_VERIFICATION_ID = "verify-customer-dialog";
    public static final String CUSTOMER_NOT_VERIFIED_ID = "not-verified";
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
    @FindBy(id = BTN_QUICK_SEARCH_ID)
    public WebElement btnQuickSearch;
    @FindBy(xpath = SEARCH_SPINNER_XPATH)
    public WebElement quickSearchSpinner;
    @FindBy(id = SEARCH_NAV_ID)
    public WebElement searchNav;
    @FindBy(id = CUSTOMER_VERIFICATION_ID)
    public WebElement customerVerifyModal;
    @FindBy(id = CUSTOMER_NOT_VERIFIED_ID)
    public WebElement notVerifiedBtn;

    public QuickSearchPo(AqatDriver driver) {
        super(driver);
        PageFactory.initElements(driver, this);
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
        return btnQuickSearch.isEnabled();
    }

    public boolean isSearchButtonDisabled() {
        return !isSearchButtonEnabled();
    }

    public boolean isSearchSpinnerDisplayed() {
        return quickSearchSpinner.isDisplayed();
    }

    public boolean isSearchSpinnerDisplayedNow() {
        return isElementDisplayedNow(By.xpath(SEARCH_SPINNER_XPATH));
    }

    /**
     * Clicks search button, and waits for search spinner to disappear
     */
    public void clickSearch() {
        btnQuickSearch.click();
        driver.getWebDriverWait()
              .until(ExpectedConditions.invisibilityOfElementLocated(By.xpath(SEARCH_SPINNER_XPATH)));
    }

    /**
     * Waits for search page to appear
     */
    public SearchPo searchAndExpectNavigateToSearch(OptionGroup optionGroup, Option option, String identifier) {
        selectOption(optionGroup, option);
        getSearchValueField().setValue(identifier);
        return clickSearchAndExpectNavigateToSearch();
    }

    /**
     * Clicks search button, and waits for verify window to appear
     */
    public void clickSearchAndExpectVerify() {
        clickSearch();
        if (isElementDisplayedNow(By.id(CUSTOMER_VERIFICATION_ID))) {
            notVerifiedBtn.click();
        }
    }

    /**
     * Clicks search button, and waits for BB8 to disappear and details page to appear
     */
    public void clickSearchAndExpectNavigateToDetails() {
        clickSearch();
        waitForTransitionOverlayToGoAway();
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.id(DetailsPo.DETAIL_CONTAINER_ID)));
    }

    /**
     * Clicks search button, and waits for BB8 to disappear and services page to appear
     */
    public void clickSearchAndExpectNavigateToServices() {
        clickSearch();
        waitForTransitionOverlayToGoAway();
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.id("services-container")));
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

    /**
     * Clicks search button, and waits for search page to appear
     */
    public SearchPo clickSearchAndExpectNavigateToSearch() {
        clickSearch();
        return new SearchPo(driver);
    }

    /**
     * Waits for search page to appear
     */
    public void searchAndExpectVerify(OptionGroup optionGroup, Option option, String identifier) {
        selectOption(optionGroup, option);
        getSearchValueField().setValue(identifier);
        clickSearchAndExpectVerify();
    }

    /**
     * Waits for details page to appear
     */
    public void searchAndExpectNavigateToDetails(OptionGroup optionGroup, Option option, String identifier) {
        selectOption(optionGroup, option);
        getSearchValueField().setValue(identifier);
        clickSearchAndExpectNavigateToDetails();
    }

    /**
     * Waits for services page to appear
     */
    public void searchAndExpectNavigateToServices(OptionGroup optionGroup, Option option, String identifier) {
        selectOption(optionGroup, option);
        getSearchValueField().setValue(identifier);
        clickSearchAndExpectNavigateToServices();
    }

    public enum OptionGroup {
        DDP("DDP"),
        FASTCARD("FastCard/PIN"),
        FINANCIAL_GIFT("Financial Gift"),
        VMS_GPR("VMS VMS_GPR Card"),
        JIRA("JIRA"),
        LOCATION("Location"),
        PAYPAL("PayPal"),
        PROMOTIONS("Promotions"),
        VANILLA_DIRECT("Vanilla Direct"),
        VMS_GIFT_CARD("VMS Gift Card"),
        VRN("VRN/Swipe Reload");
        private String label;

        OptionGroup(String label) {
            this.label = label;
        }

        public String getLabel() {
            return this.label;
        }
    }

    public enum Option {
        ACCOUNT_NUMBER("Account Number"),
        CAN("CAN"),
        CARD_NUMBER("Card Number"),
        CONTROL_NUMBER("Control Number"),
        CONTROL_NUMBER_MIN("Control Number (MIN)"),
        CUSTOMER_NAME("Customer Name"),
        EMAIL_ADDRESS("Email Address"),
        LOCATION("Location"),
        MERCHANT("Merchant"),
        ORDER_CONFIRMATION_ID("Order Confirmation ID"),
        PAN("PAN"),
        PHONE_NUMBER("Phone Number"),
        PIN("PIN"),
        PREAUTH_KEY("Preauth Key"),
        PROMO_CODE("Promo Code"),
        PROXY_ID("Proxy ID"),
        REFERENCE_ID("Reference ID"),
        SERIAL_NUMBER("Serial Number"),
        TERMINAL_ID("Terminal ID"),
        TRANSACTION_ID("Transaction ID"),
        VAN("VAN (16/19)"),
        VENDOR_SERIAL_NUMBER("Vendor Serial Number");
        private String label;

        Option(String label) {
            this.label = label;
        }

        public String getLabel() {
            return this.label;
        }
    }
}
