package com.incomm.cca.qa.pageObject.search.parameter;

import com.incomm.aqat.component.formcontrol.material2.MatFormControl;
import com.incomm.aqat.component.formcontrol.material2.MatSelect;
import com.incomm.aqat.component.formcontrol.material2.MatTextInput;
import com.incomm.aqat.driver.AqatDriver;
import com.incomm.cca.qa.pageObject.BasePo;
import com.incomm.cca.qa.pageObject.enums.SearchParameter;
import org.apache.commons.lang3.StringUtils;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.PageFactory;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.incomm.aqat.util.AqatWait.waitForPageLoad;

/**
 * Created by Allen on 2/3/2017.
 */
public abstract class SearchParametersPO extends BasePo {

    public SearchParametersPO(AqatDriver driver) {
        super(driver);
        waitForPageLoad(driver);
        PageFactory.initElements(driver, this);
    }

    protected abstract List<SearchParameter> getParameterOptions();

    protected abstract WebElement getParameterElement(SearchParameter parameter);

    /**
     * Takes into account the type of the parameter, so will set text for text inputs,
     * will select options (by text value) for selects, etc.
     */
    public void setValue(SearchParameter parameter, String value) {
        switch (parameter.getType()) {
            case TEXT:
                getTextParameter(parameter).setValue(value);
                break;
            case SELECT:
                // FIXME: 3/20/2019
                //				getSelectParameter( parameter ).selectOptionByText( value );
                break;
            default:
                throw new UnsupportedOperationException(String.format("'%s' parameter type is not yet supported", parameter.getType()));
        }
    }

    /**
     * Wrap the given search parameter with the MatTextInput component functionality
     */
    public MatTextInput getTextParameter(SearchParameter parameter) {
        return new MatTextInput(getParameterElement(parameter), this.driver);
    }

    /**
     * Returns the current values of all search parameter fields
     */
    public Map<SearchParameter, String> getCurrentValues() {
        Map<SearchParameter, String> results = new HashMap<>();

        for (SearchParameter parameter : getParameterOptions()) {
            String value = getCurrentValue(parameter);

            if (StringUtils.isNotBlank(value)) {
                results.put(parameter, value);
            }
        }

        return results;
    }

    /**
     * Returns a list of all SearchParameters that are currently enabled
     */
    public List<SearchParameter> getEnabledFields() {
        List<SearchParameter> results = new ArrayList<>();

        for (SearchParameter parameter : getParameterOptions()) {
            if (isEnabled(parameter)) {
                results.add(parameter);
            }
        }

        return results;
    }

    /**
     * Returns a list of all SearchParameters that are currently disabled
     */
    public List<SearchParameter> getDisabledFields() {
        List<SearchParameter> results = new ArrayList<>();

        for (SearchParameter parameter : getParameterOptions()) {
            if (isDisabled(parameter)) {
                results.add(parameter);
            }
        }

        return results;
    }

    /**
     * Returns a list of all SearchParameters that are currently "required" (as far as Angular form validation is concerned)
     */
    public List<SearchParameter> getRequiredFields() {
        List<SearchParameter> results = new ArrayList<>();

        for (SearchParameter parameter : getParameterOptions()) {
            if (isRequired(parameter)) {
                results.add(parameter);
            }
        }
        return results;
    }

    /**
     * Returns a list of all SearchParameters that are currently highlighted (via CSS class "highlighted")
     */
    public List<SearchParameter> getHighlightedFields() {
        List<SearchParameter> results = new ArrayList<>();

        for (SearchParameter parameter : getParameterOptions()) {
            if (isHighlighted(parameter)) {
                results.add(parameter);
            }
        }

        return results;
    }

    /**
     * Returns a list of all SearchParameters that are currently valid (as far as Angular form validation is concerned)
     */
    public List<SearchParameter> getValidFields() {
        List<SearchParameter> results = new ArrayList<>();

        for (SearchParameter parameter : getParameterOptions()) {
            if (isValid(parameter)) {
                results.add(parameter);
            }
        }

        return results;
    }

    /**
     * Returns a list of all SearchParameters that are currently invalid (as far as Angular form validation is concerned)
     */
    public List<SearchParameter> getInvalidFields() {
        List<SearchParameter> results = new ArrayList<>();

        for (SearchParameter parameter : getParameterOptions()) {
            if (isInvalid(parameter)) {
                results.add(parameter);
            }
        }

        return results;
    }

    public String getCurrentValue(SearchParameter parameter) {
        return getParameter(parameter).getText();
    }

    public boolean isDisabled(SearchParameter parameter) {
        return !isEnabled(parameter);
    }

    // FIXME: 3/20/2019
    public boolean isEnabled(SearchParameter parameter) {
        //return getParameter( parameter ).isEnabled();
        return true;
    }

    public boolean isInvalid(SearchParameter parameter) {
        return !isValid(parameter);
    }

    public boolean isRequired(SearchParameter parameter) {
        return getParameter(parameter).isRequired();
    }

    // FIXME: 3/20/2019
    public boolean isValid(SearchParameter parameter) {
        //		return getParameter( parameter ).isValid();
        return true;
    }

    // FIXME: 3/20/2019
    public boolean isHighlighted(SearchParameter parameter) {
        //		return getParameter( parameter ).getElement()
        //		                                .getAttribute( "class" )
        //		                                .contains( "highlighted" );
        return true;
    }

    /**
     * Wrap the given search parameter with the basic MatInput component functionality
     */
    public MatFormControl getParameter(SearchParameter parameter) {
        switch (parameter.getType()) {
            case TEXT:
                return getTextParameter(parameter);
            case SELECT:
                return getSelectParameter(parameter);
            case MENU:
                //TODO
            default:
                throw new UnsupportedOperationException(String.format("'%s' parameter type is not yet supported", parameter.getType()));
        }
    }

    /**
     * Wrap the given search parameter with the MatSelect component functionality
     */
    public MatSelect getSelectParameter(SearchParameter parameter) {
        return new MatSelect(getParameterElement(parameter), this.driver);
    }

}
