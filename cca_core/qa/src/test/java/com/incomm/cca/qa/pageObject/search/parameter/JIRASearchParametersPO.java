package com.incomm.cca.qa.pageObject.search.parameter;

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
public class JIRASearchParametersPO extends SearchParametersPO {

    /*
    Constant for PARAMETERS
     */
    public static final List<SearchParameter> PARAMETERS = new ArrayList<>(Arrays.asList(
            SearchParameter.ISSUE_ID,
            SearchParameter.CUSTOMER_NAME
    ));
    /*
    Locators
     */
    public static final String CONTAINER_ID = "jira-search-parameters-container";
    public static final String REFERENCE_ID_ID = "reference-id";
    public static final String CUSTOMER_NAME_ID = "customer-name";
    public static final String SUMMARY_ID = "summary";
    public static final String DESCRIPTION_ID = "description";
    public static final String CUSTOMER_PHONE_ID = "customer-phone";
    /*
    WebElements
     */
    @FindBy(id = CONTAINER_ID)
    public WebElement container;
    @FindBy(id = REFERENCE_ID_ID)
    public WebElement referenceId;
    @FindBy(id = CUSTOMER_NAME_ID)
    public WebElement customerName;
    @FindBy(id = SUMMARY_ID)
    public WebElement summary;
    @FindBy(id = DESCRIPTION_ID)
    public WebElement description;
    @FindBy(id = CUSTOMER_PHONE_ID)
    public WebElement customerPhone;

    public JIRASearchParametersPO(AqatDriver driver) {
        super(driver);
        waitForPageLoad(driver);
        PageFactory.initElements(driver, this);
    }

    /*
    Md Components
     */

    public MdTextInput getReferenceId() {
        return new MdTextInput(referenceId, this.driver);
    }

    public MdTextInput getCustomerName() {
        return new MdTextInput(customerName, this.driver);
    }

    public MdTextInput getSummary() {
        return new MdTextInput(summary, this.driver);
    }

    public MdTextInput getDescription() {
        return new MdTextInput(description, this.driver);
    }

    public MdTextInput getCustomerPhone() {
        return new MdTextInput(customerPhone, this.driver);
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
        parameters.add(SearchParameter.ISSUE_ID);
        parameters.add(SearchParameter.CUSTOMER_NAME);
        parameters.add(SearchParameter.SUMMARY);
        parameters.add(SearchParameter.DESCRIPTION);
        parameters.add(SearchParameter.CUSTOMER_PHONE);
        return parameters;
    }

    @Override
    protected WebElement getParameterElement(SearchParameter parameter) {
        switch (parameter) {
            case ISSUE_ID:
                return referenceId;
            case CUSTOMER_NAME:
                return customerName;
            case SUMMARY:
                return summary;
            case DESCRIPTION:
                return description;
            case CUSTOMER_PHONE:
                return customerPhone;
            default:
                throw new IllegalArgumentException(String.format("'%s' is not a valid parameter for this search type", parameter));
        }
    }

    public void search(String fieldName, String value) {
        switch (fieldName) {
            case "Reference ID":
                getReferenceId().setValue(value);
                break;
            case "Customer Name":
                getCustomerName().setValue(value);
                break;
        }
    }
}
