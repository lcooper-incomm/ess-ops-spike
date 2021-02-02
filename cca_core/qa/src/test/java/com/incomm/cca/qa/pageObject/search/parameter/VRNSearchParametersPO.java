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
 * Created by Allen on 3/10/2017.
 */
public class VRNSearchParametersPO extends SearchParametersPO {

    /*
    Constant PARAMETERS
     */
    public static final List<SearchParameter> PARAMETERS = new ArrayList<>(Arrays.asList(
            SearchParameter.CONTROL_NUMBER,
            SearchParameter.PAN
    ));
    /*
    Locators
     */
    public static final String CONTAINER_ID = "vrn-search-parameters-container";
    public static final String CONTROL_NUMBER_ID = "control-number";
    public static final String PAN_ID = "cardNumber";
    /*
    WebElements
     */
    @FindBy(id = CONTAINER_ID)
    public WebElement container;
    @FindBy(id = CONTROL_NUMBER_ID)
    public WebElement controlNumber;
    @FindBy(id = PAN_ID)
    public WebElement pan;

    public VRNSearchParametersPO(AqatDriver driver) {
        super(driver);
    }
	
	/*
	MdComponents
	 */

    public MdTextInput getControlNumber() {
        return new MdTextInput(controlNumber, this.driver);
    }

    public MdTextInput getPan() {
        return new MdTextInput(pan, this.driver);
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
        parameters.add(SearchParameter.CONTROL_NUMBER);
        parameters.add(SearchParameter.PAN);
        return parameters;
    }

    @Override
    protected WebElement getParameterElement(SearchParameter parameter) {
        switch (parameter) {
            case CONTROL_NUMBER:
                return controlNumber;
            case PAN:
                return pan;
            default:
                throw new IllegalArgumentException(String.format("'%s' is not a valid parameter for this search type", parameter));
        }
    }

    public void search(String fieldName, String value) {
        switch (fieldName) {
            case "Control Number":
                getControlNumber().setValue(value);
                break;
            case "PAN":
                getPan().setValue(value);
                break;
        }
    }

}
