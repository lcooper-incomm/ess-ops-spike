package com.incomm.cca.qa.pageObject.search.parameter;

import com.incomm.aqat.component.formcontrol.material2.MatTextInput;
import com.incomm.aqat.driver.AqatDriver;
import com.incomm.cca.qa.pageObject.enums.IdentificationType;
import com.incomm.cca.qa.pageObject.enums.SearchParameter;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class VMSGPRSearchQueryPanelPo extends SearchQueryPanelPo implements SearchQueryPanel {

    /*
    Constant Parameters
     */
    public static final List<SearchParameter> PARAMETERS = new ArrayList<>(Arrays.asList(
            SearchParameter.PARTNER,
            SearchParameter.CARD_NUMBER,
            SearchParameter.ACCOUNT_NUMBER,
            SearchParameter.SERIAL_NUMBER,
            SearchParameter.PROXY_NUMBER,
            SearchParameter.CARD_ID,
            SearchParameter.FIRST_NAME,
            SearchParameter.LAST_NAME,
            SearchParameter.ONLINE_USER_ID,
            SearchParameter.EMAIL_ADDRESS,
            SearchParameter.DATE_OF_BIRTH,
            SearchParameter.IDENTIFICATION_TYPE,
            SearchParameter.IDENTIFICATION_ID,
            SearchParameter.ADDRESS_1,
            SearchParameter.ADDRESS_2,
            SearchParameter.POSTAL_CODE,
            SearchParameter.CITY,
            SearchParameter.STATE_PROVINCE
    ));
    public static final By PARTNER_TRIGGER = By.cssSelector("cca-partner-field div.mat-select-arrow");
    public static final By PARTNER_VALUE = By.cssSelector("cca-partner-field span.mat-select-value-text");
    public static final By ADVANCED_SEARCH = By.id("search-show-advanced");
    public static final By ADVANCED_SEARCH_IS_SELECTED = By.cssSelector("#search-show-advanced-input");
    public static final By TOGGLE_BAR = By.cssSelector("div.mat-slide-toggle-thumb");
    @FindBy(css = "div[qa-field-name='PAN_VMS']")
    private WebElement cardNumber;
    @FindBy(css = "div[qa-field-name='ACCOUNT_NUMBER']")
    private WebElement accountNumber;
    @FindBy(css = "div[qa-field-name='SERIAL_NUMBER']")
    private WebElement serialNumber;
    @FindBy(css = "div[qa-field-name='PROXY_NUMBER']")
    private WebElement proxyNumber;
    @FindBy(css = "input.card-id-field")
    private WebElement cardId;
    @FindBy(css = "div[qa-field-name='FIRST_NAME']")
    private WebElement firstName;
    @FindBy(css = "div[qa-field-name='LAST_NAME']")
    private WebElement lastName;
    @FindBy(css = "div[qa-field-name='ONLINE_USER_ID']")
    private WebElement onlineUserId;
    @FindBy(css = "div[qa-field-name='EMAIL_ADDRESS'] input.email-address-field")
    private WebElement email;
    @FindBy(css = "div[qa-field-name='DATE_OF_BIRTH'] input.date-field")
    private WebElement dateOfBirth;
    @FindBy(css = "div[qa-field-name='ADDRESS_LINE_1'] input.text-field")
    private WebElement address1;
    @FindBy(css = "div[qa-field-name='ADDRESS_LINE_2'] input.text-field")
    private WebElement address2;
    @FindBy(css = "div[qa-field-name='POSTAL_CODE'] input.text-field")
    private WebElement postalCode;
    @FindBy(css = "div[qa-field-name='CITY'] input.text-field")
    private WebElement city;
    @FindBy(css = "mat-select.state-province-field")
    private WebElement stateOrProvince;
    @FindBy(css = "cca-identification-field button.mat-icon-button")
    private WebElement idOptionButton;
    private IdentificationType idType = null;
    @FindBy(css = "div[qa-field-name='IDENTIFICATION']")
    private WebElement identificationId;

    public VMSGPRSearchQueryPanelPo(AqatDriver driver) {
        super(driver);
    }

    /*
    Methods
     */
    public PartnerSelectorPo clickOnPartnerTrigger() {
        driver.findElement(PARTNER_TRIGGER)
              .click();
        return new PartnerSelectorPo(driver);
    }

    public IdentificationTypeSelectorPo clickIdOptionButton() {
        idOptionButton.click();
        return new IdentificationTypeSelectorPo(driver);
    }

    public MatTextInput getCardNumber() {
        return new MatTextInput(cardNumber, this.driver);
    }

    public MatTextInput getAccountNumber() {
        return new MatTextInput(accountNumber, this.driver);
    }

    public MatTextInput getSerialNumber() {
        return new MatTextInput(serialNumber, this.driver);
    }

    public MatTextInput getProxyNumber() {
        return new MatTextInput(proxyNumber, this.driver);
    }

    public MatTextInput getCardId() {
        return new MatTextInput(cardId, this.driver);
    }

    public MatTextInput getFirstName() {
        return new MatTextInput(firstName, this.driver);
    }

    public MatTextInput getLastName() {
        return new MatTextInput(lastName, this.driver);
    }

    public MatTextInput getOnlineUserId() {
        return new MatTextInput(onlineUserId, this.driver);
    }

    public MatTextInput getEmail() {
        return new MatTextInput(email, this.driver);
    }

    public MatTextInput getDateOfBirth() {
        return new MatTextInput(dateOfBirth, this.driver);
    }

    public MatTextInput getAddress1() {
        return new MatTextInput(address1, this.driver);
    }

    public MatTextInput getAddress2() {
        return new MatTextInput(address2, this.driver);
    }

    public MatTextInput getPostalCode() {
        return new MatTextInput(postalCode, this.driver);
    }

    public MatTextInput getCity() {
        return new MatTextInput(city, this.driver);
    }

    public MatTextInput getStateOrProvince() {
        return new MatTextInput(stateOrProvince, this.driver);
    }

    public MatTextInput getIdentificationNumber() {
        return new MatTextInput(identificationId, this.driver);
    }

    public IdentificationType getIdType() {
        return idType;
    }

    public VMSGPRSearchQueryPanelPo clickOnClearButton() {
        driver.findElement(CLEAR_BUTTON)
              .click();
        PageFactory.initElements(driver, this);
        return this;
    }

    @Override
    public boolean advancedFeaturesVisible() {
        String value = driver.findElement(ADVANCED_SEARCH_IS_SELECTED)
                             .getAttribute("aria-checked");
        return value.equalsIgnoreCase("true");
    }

    @Override
    public SearchQueryPanel clickOnAdvancedToggle() {
        driver.findElement(ADVANCED_SEARCH)
              .findElement(TOGGLE_BAR)
              .click();
        PageFactory.initElements(driver, this);
        return this;
    }

    @Override
    public Map<SearchParameter, String> getCurrentValues() {
        Map<SearchParameter, String> queryMap = new HashMap<>();
        queryMap.put(SearchParameter.PARTNER, driver.findElement(PARTNER_VALUE)
                                                    .getText());
        queryMap.put(SearchParameter.CARD_NUMBER, cardNumber.getText());
        queryMap.put(SearchParameter.ACCOUNT_NUMBER, accountNumber.getText());
        queryMap.put(SearchParameter.SERIAL_NUMBER, serialNumber.getText());
        queryMap.put(SearchParameter.PROXY_NUMBER, proxyNumber.getText());
        queryMap.put(SearchParameter.CARD_ID, cardNumber.getText());
        queryMap.put(SearchParameter.FIRST_NAME, firstName.getText());
        queryMap.put(SearchParameter.LAST_NAME, lastName.getText());
        if (advancedFeaturesVisible()) {
            queryMap.put(SearchParameter.ONLINE_USER_ID, onlineUserId.getText());
            queryMap.put(SearchParameter.EMAIL_ADDRESS, email.getText());
            queryMap.put(SearchParameter.DATE_OF_BIRTH, dateOfBirth.getText());
        }
        if (idType != null) {
            queryMap.put(SearchParameter.IDENTIFICATION_TYPE, idType.getLabel());
            queryMap.put(SearchParameter.IDENTIFICATION_ID, identificationId.getText());
        } else {
            queryMap.put(SearchParameter.IDENTIFICATION_TYPE, "");
            queryMap.put(SearchParameter.IDENTIFICATION_ID, "");
        }
        queryMap.put(SearchParameter.ADDRESS_1, address1.getText());
        queryMap.put(SearchParameter.ADDRESS_2, address2.getText());
        queryMap.put(SearchParameter.POSTAL_CODE, postalCode.getText());
        queryMap.put(SearchParameter.CITY, city.getText());
        queryMap.put(SearchParameter.STATE_PROVINCE, stateOrProvince.getText());
        return queryMap;
    }

    @Override
    public boolean hasAdvancedQueryFields() {
        return true;
    }
}



