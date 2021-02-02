package com.incomm.cca.qa.pageObject.search.parameter;

import com.incomm.aqat.component.formcontrol.material1.MdTextInput;
import com.incomm.aqat.driver.AqatDriver;
import com.incomm.cca.qa.pageObject.enums.SearchParameter;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class VanillaSearchParametersPO extends SearchParametersPO {

    /*
        Constant Parameters
         */
    public static final List<SearchParameter> PARAMETERS = new ArrayList<>(Arrays.asList(
            SearchParameter.ACCOUNT_NUMBER
    ));
    /*
    Locators
     */
    public static final String CONTAINER_ID = "vanilla-direct-search-parameters-container";
    public static final String ACCOUNT_NUMBER_ID = "account-number";
    /*
    WebElements
     */
    @FindBy(id = CONTAINER_ID)
    public WebElement container;
    @FindBy(id = ACCOUNT_NUMBER_ID)
    public WebElement accountNumber;

    public VanillaSearchParametersPO(AqatDriver driver) {
        super(driver);
    }
	
    /*
    Md Components
     */

    public MdTextInput getAccountNumber() {
        return new MdTextInput(accountNumber, this.driver);
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
        parameters.add(SearchParameter.ACCOUNT_NUMBER);
        return parameters;
    }

    @Override
    protected WebElement getParameterElement(SearchParameter parameter) {
        switch (parameter) {
            case ACCOUNT_NUMBER:
                return accountNumber;
            default:
                throw new IllegalArgumentException(String.format("'%s' is not a valid parameter for this search type", parameter));
        }
    }

    public void search(String fieldName, String value) {
        switch (fieldName) {
            case "Account Number":
                getAccountNumber().setValue(value);
                break;
        }
    }
}


