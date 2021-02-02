package com.incomm.cca.qa.pageObject.search.parameter;

import com.incomm.aqat.component.formcontrol.material1.MdTextInput;
import com.incomm.aqat.driver.AqatDriver;
import com.incomm.cca.qa.pageObject.enums.SearchParameter;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class VMSGiftCardSearchParametersPO extends SearchParametersPO {

    /*
    Locators
     */
    public static final String CONTAINER_ID = "gpr-search-parameters-container";
    public static final String CARD_NUMBER_ID = "cardNumber";
    public static final String ACCOUNT_NUMBER_ID = "account-number";
    public static final String SERIAL_NUMBER_ID = "serial-number";
    public static final List<SearchParameter> PARAMETERS = new ArrayList<>(Arrays.asList(
            SearchParameter.CARD_NUMBER,
            SearchParameter.ACCOUNT_NUMBER,
            SearchParameter.SERIAL_NUMBER
    ));
    /*
    WebElements
     */
    @FindBy(id = CONTAINER_ID)
    public WebElement container;
    @FindBy(id = CARD_NUMBER_ID)
    public WebElement cardNumber;
    @FindBy(id = ACCOUNT_NUMBER_ID)
    public WebElement accountNumber;
    @FindBy(id = SERIAL_NUMBER_ID)
    public WebElement serialNumber;
	
	

    /*
    Md Components
     */

    public VMSGiftCardSearchParametersPO(AqatDriver driver) {
        super(driver);
    }

    public MdTextInput getCardNumber() {
        return new MdTextInput(cardNumber, this.driver);
    }

    public MdTextInput getAccountNumber() {
        return new MdTextInput(accountNumber, this.driver);
    }

    public MdTextInput getSerialNumber() {
        return new MdTextInput(serialNumber, this.driver);
    }

    @Override
    public List<SearchParameter> getParameterOptions() {
        List<SearchParameter> parameters = new ArrayList<>();
        parameters.add(SearchParameter.CARD_NUMBER);
        parameters.add(SearchParameter.ACCOUNT_NUMBER);
        parameters.add(SearchParameter.SERIAL_NUMBER);
        return parameters;
    }

    @Override
    protected WebElement getParameterElement(SearchParameter parameter) {
        switch (parameter) {
            case CARD_NUMBER:
                return cardNumber;
            case ACCOUNT_NUMBER:
                return accountNumber;
            case SERIAL_NUMBER:
                return serialNumber;
            default:
                throw new IllegalArgumentException(String.format("'%s' is not a valid parameter for this search type", parameter));
        }
    }

    public void search(String fieldName, String value) {
        switch (fieldName) {
            case "Serial Number":
                getSerialNumber().setValue(value);
                break;
            case "Account Number":
                getAccountNumber().setValue(value);
                break;
            case "Card Number":
                getCardNumber().setValue(value);
                break;
        }
    }

}
	
