package com.incomm.cca.qa.pageObject.search.parameter;

import com.incomm.aqat.component.formcontrol.material1.MdSelect;
import com.incomm.aqat.component.formcontrol.material1.MdTextInput;
import com.incomm.aqat.driver.AqatDriver;
import com.incomm.cca.qa.pageObject.enums.SearchParameter;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static com.incomm.aqat.util.AqatWait.waitForPageLoad;

/**
 * Created by Allen on 2/3/2017.
 */
public class LocationSearchParametersPO extends SearchParametersPO {

    /*
    Constant Paramaters
     */
    public static final List<SearchParameter> PARAMETERS = new ArrayList<>(Arrays.asList(
            SearchParameter.MERCHANT_NAME,
            SearchParameter.LOCATION_NAME,
            SearchParameter.TERMINAL_ID,
            SearchParameter.PHONE_NUMBER,
            SearchParameter.ADDRESS_1,
            SearchParameter.CITY,
            SearchParameter.POSTAL_CODE
    ));
    /*
    Locators
     */
    public static final String CONTAINER_ID = "location-search-parameters-container";
    public static final String MERCHANT_NAME_ID = "merchant-name";
    public static final String LOCATION_NAME_ID = "location-name";
    public static final String TERMINAL_ID_ID = "terminal-id";
    public static final String PHONE_NUMBER_ID = "phone-number";
    public static final String STREET_ID = "street";
    public static final String CITY_ID = "city";
    public static final String STATE_ID = "stateOrProvince";
    public static final String POSTAL_CODE_ID = "postal-code";
    /*
    WebElements
     */
    @FindBy(id = CONTAINER_ID)
    public WebElement container;
    @FindBy(id = MERCHANT_NAME_ID)
    public WebElement merchantName;
    @FindBy(id = LOCATION_NAME_ID)
    public WebElement locationName;
    @FindBy(id = TERMINAL_ID_ID)
    public WebElement terminalId;
    @FindBy(id = PHONE_NUMBER_ID)
    public WebElement phoneNumber;
    @FindBy(id = STREET_ID)
    public WebElement street;
    @FindBy(id = CITY_ID)
    public WebElement city;
    @FindBy(id = STATE_ID)
    public WebElement state;
    @FindBy(id = POSTAL_CODE_ID)
    public WebElement postalCode;

    public LocationSearchParametersPO(AqatDriver driver) {
        super(driver);
        waitForPageLoad(driver);
        PageFactory.initElements(driver, this);
    }
	
	
    /*
    Md Components
     */

    public MdTextInput getMerchantName() {
        return new MdTextInput(merchantName, this.driver);
    }

    public MdTextInput getLocationName() {
        return new MdTextInput(locationName, this.driver);
    }

    public MdTextInput getTerminalId() {
        return new MdTextInput(terminalId, this.driver);
    }

    public MdTextInput getPhoneNumber() {
        return new MdTextInput(phoneNumber, this.driver);
    }

    public MdTextInput getStreet() {
        return new MdTextInput(street, this.driver);
    }

    public MdTextInput getCity() {
        return new MdTextInput(city, this.driver);
    }

    public MdSelect getState() {
        return new MdSelect(state, this.driver);
    }

    public MdTextInput getPostalCode() {
        return new MdTextInput(postalCode, this.driver);
    }

    /*
    Methods
     */

    public boolean isDisplayed() {
        return container.isDisplayed();
    }

    @Override
    public List<SearchParameter> getParameterOptions() {
        List<SearchParameter> parameters = new ArrayList<>();
        parameters.add(SearchParameter.MERCHANT_NAME);
        parameters.add(SearchParameter.LOCATION_NAME);
        parameters.add(SearchParameter.TERMINAL_ID);
        parameters.add(SearchParameter.PHONE_NUMBER);
        parameters.add(SearchParameter.ADDRESS_1);
        parameters.add(SearchParameter.CITY);
        parameters.add(SearchParameter.STATE_PROVINCE);
        parameters.add(SearchParameter.POSTAL_CODE);
        return parameters;
    }

    @Override
    protected WebElement getParameterElement(SearchParameter parameter) {
        switch (parameter) {
            case MERCHANT_NAME:
                return merchantName;
            case LOCATION_NAME:
                return locationName;
            case TERMINAL_ID:
                return terminalId;
            case PHONE_NUMBER:
                return phoneNumber;
            case ADDRESS_1:
                return street;
            case CITY:
                return city;
            case STATE_PROVINCE:
                return state;
            case POSTAL_CODE:
                return postalCode;
            default:
                throw new IllegalArgumentException(String.format("'%s' is not a valid parameter for this search type", parameter));
        }
    }

    /**
     * Enters search query then clicks search
     */
    public void search(String fieldName, String value) {
        switch (fieldName) {
            case "Merchant Name":
                getMerchantName().setValue(value);
                break;
            case "Location Name":
                getLocationName().setValue(value);
                break;
            case "Terminal ID":
                getTerminalId().setValue(value);
                break;
            case "Phone Number":
                getPhoneNumber().setValue(value);
                break;
            case "Street Name":
                getStreet().setValue(value);
                break;
            case "City":
                getCity().setValue(value);
                break;
            case "State":
                getState().selectOptionInGroupByText("United States", value);
                break;
            case "Postal Code":
                getPostalCode().setValue(value);
                break;
        }

    }
}
