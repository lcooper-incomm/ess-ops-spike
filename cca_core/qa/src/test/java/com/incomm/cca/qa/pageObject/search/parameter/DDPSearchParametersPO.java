package com.incomm.cca.qa.pageObject.search.parameter;

import com.incomm.aqat.component.formcontrol.material1.MdTextInput;
import com.incomm.aqat.driver.AqatDriver;
import com.incomm.cca.qa.pageObject.enums.SearchParameter;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Created by Allen on 2/3/2017.
 */
public class DDPSearchParametersPO extends SearchParametersPO {

    /*
    Constant for PARAMETERS
     */
    public static final List<SearchParameter> PARAMETERS = new ArrayList<>(Arrays.asList(
            SearchParameter.TRANSACTION_ID,
            SearchParameter.PAN,
            SearchParameter.PIN,
            SearchParameter.SERIAL_NUMBER
    ));
    /*
    Locators
     */
    public static final String CONTAINER_ID = "ddp-search-parameters-container";
    public static final String TRANSACTION_ID_ID = "transaction-id";
    public static final String PAN_ID = "cardNumber";
    public static final String PIN_ID = "pin";
    public static final String SERIAL_NUMBER_ID = "serial-number";
    /*
    WebElements
     */
    @FindBy(id = CONTAINER_ID)
    public WebElement container;
    @FindBy(id = TRANSACTION_ID_ID)
    public WebElement transactionId;
    @FindBy(id = PAN_ID)
    public WebElement pan;
    @FindBy(id = PIN_ID)
    public WebElement pin;
    @FindBy(id = SERIAL_NUMBER_ID)
    public WebElement serialNumber;

    public DDPSearchParametersPO(AqatDriver driver) {
        super(driver);
    }

    /*
    Md Components
     */

    public MdTextInput getTransactionId() {
        return new MdTextInput(transactionId, this.driver);
    }

    public MdTextInput getPan() {
        return new MdTextInput(pan, this.driver);
    }

    public MdTextInput getPin() {
        return new MdTextInput(pin, this.driver);
    }

    public MdTextInput getSerialNumber() {
        return new MdTextInput(serialNumber, this.driver);
    }

    /*
    Methods
     */

    public boolean isDisplayed() {
        return container.isDisplayed();
    }

    @Override
    protected List<SearchParameter> getParameterOptions() {
        List<SearchParameter> parameters = new ArrayList<>();
        parameters.add(SearchParameter.TRANSACTION_ID);
        parameters.add(SearchParameter.PAN);
        parameters.add(SearchParameter.PIN);
        parameters.add(SearchParameter.SERIAL_NUMBER);
        return parameters;
    }

    @Override
    protected WebElement getParameterElement(SearchParameter parameter) {
        switch (parameter) {
            case TRANSACTION_ID:
                return transactionId;
            case PAN:
                return pan;
            case PIN:
                return pin;
            case SERIAL_NUMBER:
                return serialNumber;
            default:
                throw new IllegalArgumentException(String.format("'%s' is not a valid parameter for this search type", parameter));
        }
    }

    public void search(String fieldName, String value) {
        switch (fieldName) {
            case "Transaction ID":
                getTransactionId().setValue(value);
                break;
            case "PAN":
                getPan().setValue(value);
                break;
            case "PIN":
                getPin().setValue(value);
                break;
            case "Serial Number":
                getSerialNumber().setValue(value);
                break;
        }
    }
}
