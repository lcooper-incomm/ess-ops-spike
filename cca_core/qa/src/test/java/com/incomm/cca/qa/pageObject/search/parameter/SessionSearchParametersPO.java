package com.incomm.cca.qa.pageObject.search.parameter;

import com.incomm.aqat.component.formcontrol.material1.MdSelect;
import com.incomm.aqat.component.formcontrol.material1.MdTextInput;
import com.incomm.aqat.driver.AqatDriver;
import com.incomm.cca.qa.pageObject.enums.SearchParameter;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class SessionSearchParametersPO extends SearchParametersPO {

    /*
        Constant Parameters
         */
    public static final List<SearchParameter> PARAMETERS = new ArrayList<>(Arrays.asList(
            SearchParameter.SID,
            SearchParameter.SERIAL_NUMBER,
            SearchParameter.VAN
    ));
    /*
    Locators
     */
    public static final String CONTAINER_ID = "ecomm-order-search-parameters-container";
    public static final String SID_ID = "sid";
    public static final String SERIAL_NUMBER_ID = "serial-number";
    public static final String VAN_ID = "van";
    public static final String SESSION_CLASS_OPTIONS_ID = "session-class";
    /*
    WebElements
     */
    @FindBy(id = CONTAINER_ID)
    public WebElement container;
    @FindBy(id = SID_ID)
    public WebElement sid;
    @FindBy(id = SERIAL_NUMBER_ID)
    public WebElement serialNumber;
    @FindBy(id = VAN_ID)
    public WebElement vanID;
    @FindBy(id = SESSION_CLASS_OPTIONS_ID)
    public WebElement sessionClassOptions;

    public SessionSearchParametersPO(AqatDriver driver) {
        super(driver);
    }

	
	
    /*
    Md Components
     */

    public MdTextInput getSid() {
        return new MdTextInput(sid, this.driver);
    }

    public MdTextInput getSerialNumber() {
        return new MdTextInput(serialNumber, this.driver);
    }

    public MdTextInput getVanID() {
        return new MdTextInput(vanID, this.driver);
    }

    public MdSelect getSessionClass() {
        return new MdSelect(sessionClassOptions, this.driver);
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
        parameters.add(SearchParameter.SID);
        parameters.add(SearchParameter.SERIAL_NUMBER);
        parameters.add(SearchParameter.VAN);
        return parameters;
    }

    @Override
    protected WebElement getParameterElement(SearchParameter parameter) {
        switch (parameter) {
            case SID:
                return sid;
            case SERIAL_NUMBER:
                return serialNumber;
            case VAN:
                return vanID;
            default:
                throw new IllegalArgumentException(String.format("'%s' is not a valid parameter for this search type", parameter));
        }
    }
}
