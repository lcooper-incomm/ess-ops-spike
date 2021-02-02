package com.incomm.cca.qa.pageObject.search.parameter;

import com.incomm.aqat.component.formcontrol.material1.MdTextInput;
import com.incomm.aqat.driver.AqatDriver;
import com.incomm.cca.qa.pageObject.enums.SearchParameter;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ECommSearchParametersPO extends SearchParametersPO {

    /*
        Constant Parameters
         */
    public static final List<SearchParameter> PARAMETERS = new ArrayList<>(Arrays.asList(
            SearchParameter.ORDER_NUMBER,
            SearchParameter.SHIPMENT_NUMBER,
            SearchParameter.SERIAL_NUMBER,
            SearchParameter.FIRST_NAME,
            SearchParameter.LAST_NAME,
            SearchParameter.EMAIL_ADDRESS,
            SearchParameter.LAST_FOUR
    ));
    /*
    Locators
     */
    public static final String CONTAINER_ID = "ecomm-order-search-parameters-container";
    public static final String ORDER_NUMBER_ID = "order-number";
    public static final String SHIPMENT_NUMBER_ID = "shipment-number";
    public static final String SERIAL_NUMBER_ID = "serial-number";
    public static final String FIRST_NAME_ID = "first-name";
    public static final String LAST_NAME_ID = "last-name";
    public static final String EMAIL_ID = "email";
    public static final String LAST_FOUR_ID = "last-four";
    /*
    WebElements
     */
    @FindBy(id = CONTAINER_ID)
    public WebElement container;
    @FindBy(id = ORDER_NUMBER_ID)
    public WebElement orderNumber;
    @FindBy(id = SHIPMENT_NUMBER_ID)
    public WebElement shipmentNumber;
    @FindBy(id = SERIAL_NUMBER_ID)
    public WebElement serialNumber;
    @FindBy(id = FIRST_NAME_ID)
    public WebElement firstName;
    @FindBy(id = LAST_NAME_ID)
    public WebElement lastName;
    @FindBy(id = EMAIL_ID)
    public WebElement email;
    @FindBy(id = LAST_FOUR_ID)
    public WebElement lastFour;

    public ECommSearchParametersPO(AqatDriver driver) {
        super(driver);
    }
	
	
    /*
    Md Components
     */

    public MdTextInput getOrderNumber() {
        return new MdTextInput(orderNumber, this.driver);
    }

    public MdTextInput getShipmentNumber() {
        return new MdTextInput(shipmentNumber, this.driver);
    }

    public MdTextInput getSerialNumber() {
        return new MdTextInput(serialNumber, this.driver);
    }

    public MdTextInput getFirstName() {
        return new MdTextInput(firstName, this.driver);
    }

    public MdTextInput getLastName() {
        return new MdTextInput(lastName, this.driver);
    }

    public MdTextInput getEmail() {
        return new MdTextInput(email, this.driver);
    }

    public MdTextInput getLastFour() {
        return new MdTextInput(lastFour, this.driver);
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
        parameters.add(SearchParameter.ORDER_NUMBER);
        parameters.add(SearchParameter.SHIPMENT_NUMBER);
        parameters.add(SearchParameter.SERIAL_NUMBER);
        parameters.add(SearchParameter.FIRST_NAME);
        parameters.add(SearchParameter.LAST_NAME);
        parameters.add(SearchParameter.EMAIL_ADDRESS);
        parameters.add(SearchParameter.LAST_FOUR);
        return parameters;
    }

    @Override
    protected WebElement getParameterElement(SearchParameter parameter) {
        switch (parameter) {
            case ORDER_NUMBER:
                return orderNumber;
            case SHIPMENT_NUMBER:
                return shipmentNumber;
            case SERIAL_NUMBER:
                return serialNumber;
            case FIRST_NAME:
                return firstName;
            case LAST_NAME:
                return lastName;
            case EMAIL_ADDRESS:
                return email;
            case LAST_FOUR:
                return lastFour;
            default:
                throw new IllegalArgumentException(String.format("'%s' is not a valid parameter for this search type", parameter));
        }
    }

    public void search(String fieldName, String value) {
        switch (fieldName) {
            case "Order Number":
                getOrderNumber().setValue(value);
                break;
            case "Shipment Number":
                getShipmentNumber().setValue(value);
                break;
            case "Serial Number":
                getSerialNumber().setValue(value);
                break;
            case "Name":
                String[] name = value.split(" ");
                String firstName = name[0];
                String lastName = name[1];
                getFirstName().setValue(firstName);
                getLastName().setValue(lastName);
                break;
            case "Email":
                getEmail().setValue(value);
                break;
            case "Last Four":
                String[] nameFour = value.split(" ");
                String ln = nameFour[0];
                String lf = nameFour[1];
                getLastFour().setValue(lf);
                getLastName().setValue(ln);
                break;
        }
    }
}


