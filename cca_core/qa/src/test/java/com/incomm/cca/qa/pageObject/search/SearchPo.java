package com.incomm.cca.qa.pageObject.search;

import com.incomm.aqat.component.formcontrol.material1.MdCheckbox;
import com.incomm.aqat.component.formcontrol.material1.MdSelect;
import com.incomm.aqat.component.formcontrol.material1.MdSwitch;
import com.incomm.aqat.component.formcontrol.material1.MdTextInput;
import com.incomm.aqat.driver.AqatDriver;
import com.incomm.cca.qa.pageObject.BasePo;
import com.incomm.cca.qa.pageObject.details.DetailsPo;
import com.incomm.cca.qa.pageObject.enums.SearchParameter;
import com.incomm.cca.qa.pageObject.enums.SearchType;
import com.incomm.cca.qa.pageObject.search.parameter.DDPSearchParametersPO;
import com.incomm.cca.qa.pageObject.search.parameter.ECommSearchParametersPO;
import com.incomm.cca.qa.pageObject.search.parameter.JIRASearchParametersPO;
import com.incomm.cca.qa.pageObject.search.parameter.LocationSearchParametersPO;
import com.incomm.cca.qa.pageObject.search.parameter.SearchParametersPO;
import com.incomm.cca.qa.pageObject.search.parameter.SessionSearchParametersPO;
import com.incomm.cca.qa.pageObject.search.parameter.VMSGPRSearchQueryPanelPo;
import com.incomm.cca.qa.pageObject.search.parameter.VMSGiftCardSearchParametersPO;
import com.incomm.cca.qa.pageObject.search.parameter.VRNSearchParametersPO;
import com.incomm.cca.qa.pageObject.search.parameter.VanillaSearchParametersPO;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;

import java.util.ArrayList;
import java.util.List;

import static com.incomm.aqat.util.AqatWait.waitForPageLoad;

/**
 * Created by Allen on 2/3/2017.
 */
public class SearchPo extends BasePo {

    /*
    WebElements
     */
    @FindBy(id = "search-result-total-count")
    public WebElement searchResultsCount;
    //FixMe: Remove premature instantiation of Page Objects.
    protected DDPSearchParametersPO ddpSearchParameters;
    protected VMSGPRSearchQueryPanelPo gprSearchParameters;
    protected JIRASearchParametersPO jiraSearchParameters;
    protected LocationSearchParametersPO locationSearchParameters;
    protected VRNSearchParametersPO vrnSearchParameters;
    protected SessionSearchParametersPO sessionSearchParameters;
    protected VMSGiftCardSearchParametersPO vmsGiftCardSearchParameters;
    protected ECommSearchParametersPO eCommSearchParameters;
    protected VanillaSearchParametersPO vanillaSearchParameters;
    @FindBy(id = "search-container")
    private WebElement searchContainer;
    @FindBy(tagName = "input")
    private WebElement input1;
    @FindBy(id = "search-header")
    private WebElement searchHeader;
    @FindBy(id = "search-type")
    private WebElement searchType;
    @FindBy(id = "partner")
    private WebElement partner;
    @FindBy(id = "show-advanced")
    private WebElement showAdvanced;
    @FindBy(id = "search")
    private WebElement btnSearch;
    @FindBy(xpath = "//*[contains(@class,'spinner-search')]")
    private WebElement searchSpinner;
    @FindBy(id = "clear")
    private WebElement btnClear;
    @FindBy(id = "recent-activity")
    private WebElement recentActivity;
    @FindBy(id = "search-parameters-container")
    private WebElement searchParametersContainer;
    @FindBy(id = "search-results-container")
    private WebElement searchResultsContainer;
    @FindBy(id = "search-result-summary")
    private WebElement searchResultsSummary;
    @FindBy(id = "search-results-filter")
    private WebElement searchResultsFilter;
    @FindBy(xpath = "//div[contains(@class, 'md-select-menu-container')]//md-option[@ng-value='searchType']/div[contains(@class,'md-text')]")
    private List<WebElement> searchOptions;

    public SearchPo(AqatDriver driver) {
        super(driver);
        waitForPageLoad(driver);
        PageFactory.initElements(driver, this);

        this.ddpSearchParameters = new DDPSearchParametersPO(this.driver);
        this.gprSearchParameters = new VMSGPRSearchQueryPanelPo(this.driver);
        this.jiraSearchParameters = new JIRASearchParametersPO(this.driver);
        this.locationSearchParameters = new LocationSearchParametersPO(this.driver);
        this.vrnSearchParameters = new VRNSearchParametersPO(this.driver);
        this.sessionSearchParameters = new SessionSearchParametersPO(this.driver);
        this.vmsGiftCardSearchParameters = new VMSGiftCardSearchParametersPO(this.driver);
        this.eCommSearchParameters = new ECommSearchParametersPO(this.driver);
        this.vanillaSearchParameters = new VanillaSearchParametersPO(this.driver);
    }
	

	
    /*
    Md Components
     */

    public MdSelect getSearchType() {
        return new MdSelect(searchType, this.driver);
    }

    public MdSelect getPartner() {
        return new MdSelect(partner, this.driver);
    }

    public MdSwitch getShowAdvanced() {
        return new MdSwitch(showAdvanced, this.driver);
    }

    public MdCheckbox getRecentActivity() {
        return new MdCheckbox(recentActivity, this.driver);
    }

    public MdTextInput getSearchResultsFilter() {
        return new MdTextInput(searchResultsFilter, this.driver);
    }

    /*
    Methods
     */

    public boolean isDisplayed() {
        return searchContainer.isDisplayed();
    }

    public String getHeaderText() {
        return searchHeader.getText();
    }

    public void selectSearchType(SearchType searchType) {
        getSearchType().selectOptionByText(searchType.getLabel());
        driver.getWebDriverWait()
              .until(ExpectedConditions.visibilityOf(searchParametersContainer));
    }

    public List<String> getOptionsText() {
        List<String> options = new ArrayList<>();
        driver.getWebDriverWait()
              .until(ExpectedConditions.visibilityOfAllElements(searchOptions));
        for (WebElement e : searchOptions) {
            if (e.getText()
                 .length() > 1) {
                options.add(e.getText());
            }
        }
        return options;
    }

    public List<String> labelsToParams(List<String> actual) {
        String transform;
        List<String> params = new ArrayList<>();
        for (String a : actual) {
            transform = a.replace(" ", "_")
                         .replace("(", "")
                         .replace(")", "")
                         .toUpperCase();
            params.add(transform);
        }
        return params;
    }

    public List<String> paramListToString(List<SearchParameter> params) {
        List<String> stringParams = new ArrayList<>();
        String val;
        for (SearchParameter s : params) {
            val = String.valueOf(s);
            stringParams.add(val);
        }
        return stringParams;
    }

    // TODO: 3/26/2019 Replace with calls to SearchQueryPanelFactory

    /**
     * Use this method to get a search parameters object generically, when you don't know the value of searchType.
     * Else, if you know the search type you're working with, you can use one of the specific getters.
     */
    public SearchParametersPO getParameters(SearchType searchType) {
        switch (searchType) {
            case FASTCARD:
                //				return new FastCardSearchQueryPanelPo( toolbox );
                return null;
            case FINANCIAL_GIFT:
                //				return financialGiftSearchParameters;
                return null;
            case VMS_GPR:
                //				return gprSearchParameters;
                return null;
            case LOCATION:
                return locationSearchParameters;
            case VRN:
                return vrnSearchParameters;
            case DDP:
                return ddpSearchParameters;
            case JIRA:
                return jiraSearchParameters;
            case ECOMM:
                return eCommSearchParameters;
            case SESSION:
                return sessionSearchParameters;
            case VANILLA:
                return vanillaSearchParameters;
            case VMS_GIFT:
                return vmsGiftCardSearchParameters;
            default:
                throw new IllegalArgumentException(String.format("No parameters defined for SearchType '%s'", searchType));
        }
    }

    public DDPSearchParametersPO getDdpSearchParameters() {
        return ddpSearchParameters;
    }

    public VMSGPRSearchQueryPanelPo getGprSearchParameters() {
        return gprSearchParameters;
    }

    public SessionSearchParametersPO getSessionSearchParameters() {
        return sessionSearchParameters;
    }

    public JIRASearchParametersPO getJiraSearchParameters() {
        return jiraSearchParameters;
    }

    public LocationSearchParametersPO getLocationSearchParameters() {
        return locationSearchParameters;
    }

    public VRNSearchParametersPO getVrnSearchParameters() {
        return vrnSearchParameters;
    }

    public List<String> getAvailableParameters() {
        List<WebElement> parameterElements = searchParametersContainer.findElements(By.xpath("//*[contains(@id,'search-parameters-container')]//label"));
        List<String> elementText = new ArrayList<>();
        for (WebElement e : parameterElements) {
            if (!e.getText()
                  .isEmpty()) {
                elementText.add(e.getText());
            }
        }
        return elementText;
    }

    /**
     * Clicks search button and waits only for search spinner to disappear
     */
    public void clickSearch() {
        driver.getWebDriverWait()
              .until(ExpectedConditions.elementToBeClickable(btnSearch));
        btnSearch.click();
        driver.getWebDriverWait()
              .until(ExpectedConditions.invisibilityOf(searchSpinner));
    }

    /**
     * Clicks search button and waits for BB8 to drop and detail page to appear
     */
    public void clickSearchAndExpectNavigateToDetails() {
        clickSearch();
        waitForTransitionOverlayToGoAway();
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.id(DetailsPo.DETAIL_CONTAINER_ID)));
    }

    /**
     * Clicks search button and waits for verify dialog to appear
     */
    public void clickSearchAndExpectVerifyCustomerDialog() {
        clickSearch();
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.id("verify-customer-dialog")));
    }

    /**
     * Clicks search button and waits for verify order dialog to appear
     */
    public void clickSearchAndExpectVerifyOrderDialog() {
        clickSearch();
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.id(OrderVerificationPo.CONTAINER_ID)));
    }
}
