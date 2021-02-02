package com.incomm.cca.qa.acceptance.search;

import com.incomm.aqat.driver.AqatDriver;
import com.incomm.aqat.listener.TestListener;
import com.incomm.cca.qa.CcaTest;
import com.incomm.cca.qa.dataProvider.functional.acceptance.dashboard.VMSGPRCardDP;
import com.incomm.cca.qa.pageObject.LoginPO;
import com.incomm.cca.qa.pageObject.NavigationPO;
import com.incomm.cca.qa.pageObject.enums.IdentificationType;
import com.incomm.cca.qa.pageObject.enums.SearchType;
import com.incomm.cca.qa.pageObject.search.SearchMenuPO;
import com.incomm.cca.qa.pageObject.search.parameter.SearchQueryPanelPo;
import com.incomm.cca.qa.pageObject.search.parameter.VMSGPRSearchQueryPanelPo;
import com.incomm.cca.qa.pageObject.search.results.SearchResultsPanelPo;
import com.incomm.cca.qa.pageObject.wizards.VerifyCustomerWizard;
import com.incomm.cca.qa.tags.SmokeTest;
import net.serenitybdd.core.annotations.findby.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.springframework.test.context.ContextConfiguration;
import org.testng.ITestContext;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Listeners;
import org.testng.annotations.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@Listeners({TestListener.class})
@ContextConfiguration("classpath:spring-context.xml")
@SmokeTest
public class VMSGPRCardAT extends CcaTest {

    protected NavigationPO navigationPO;

    VMSGPRCardAT() {
        super();
    }

    @BeforeClass(groups = {"base"}, alwaysRun = true)
    void setUp(ITestContext testContext) throws Exception {
        this.initDriver(testContext);
        this.driver.get(constants.APP_URL);
        LoginPO signIn = new LoginPO(driver);
        navigationPO = signIn.defaultSignIn();
        navigationPO.waitForTransitionOverlayToGoAway();
    }

    @AfterClass(groups = {"base"}, alwaysRun = true)
    void tearDown() {
        navigationPO.logout();
        this.driver.quit();
    }

    @Test(groups = {"version-7.0.0", "smoke", "search"},
            dataProviderClass = VMSGPRCardDP.class,
            dataProvider = "VMSGPR_DriversLicense",
            enabled = false)
    // We don't have data for this test. Also, it is a low priority
    public void verifyZDriversLicenseSearchWorks(final String partner, final String value, final String expectedResult) {
        clearSearchParameters();
        VMSGPRSearchQueryPanelPo searchPanelPo = navigateTo_VMSGPR_Search();
        assertThat(!(searchPanelPo.getSearchButton()
                                  .isEnabled()));
        searchPanelPo.clickOnPartnerTrigger()
                     .selectPartner(partner);
        searchPanelPo.clickIdOptionButton()
                     .selectIdType(IdentificationType.DRIVERS_LICENSE);
        searchPanelPo.getIdentificationNumber()
                     .setValue(value);
        assertThat(searchPanelPo.getSearchButton()
                                .isEnabled());
        SearchResultsPanelPo resultsPo = searchPanelPo.clickSearch();
        dismissVerifyCustomerDialog(driver);
        assertThat(resultsPo.getReportSummary()
                            .getText()
                            .contains(expectedResult));
    }

    @Test(groups = {"version-7.0.0", "smoke", "search"},
            dataProviderClass = VMSGPRCardDP.class,
            dataProvider = "VMSGPR_SSN",
            enabled = true)
    public void verifySSNSearchWorks(final String partner, final String name, final String value, final String expectedResult) {
        clearSearchParameters();
        VMSGPRSearchQueryPanelPo searchPanelPo = navigateTo_VMSGPR_Search();
        assertThat(!(searchPanelPo.getSearchButton()
                                  .isEnabled()));
        searchPanelPo.clickOnPartnerTrigger()
                     .selectPartner(partner);
        searchPanelPo.clickIdOptionButton()
                     .selectIdType(IdentificationType.SOCIAL_SECURITY_NUMBER);
        searchPanelPo.getIdentificationNumber()
                     .setValue(value);
        searchPanelPo.getLastName()
                     .setValue(name);
        assertThat(searchPanelPo.getSearchButton()
                                .isEnabled());
        SearchResultsPanelPo resultsPo = searchPanelPo.clickSearch();
        waitForSpinnerToGoAway();
        List<WebElement> searchResultsArray = driver.findElements(By.cssSelector("cca-vms-gpr-search-results-table tbody tr.clickable"));
        searchResultsArray.get(0).click();
        dismissVerifyCustomerDialog(driver);
        assertThat(resultsPo.getReportSummary()
                            .getText()
                            .contains(expectedResult));
    }

    private void waitForSpinnerToGoAway() {
        driver.getWebDriverWait().until(ExpectedConditions.invisibilityOfElementLocated(SearchQueryPanelPo.SEARCH_BUTTON_SPINNER));
    }

    @Test(groups = {"version-7.0.0", "smoke", "search"},
            dataProviderClass = VMSGPRCardDP.class,
            dataProvider = "VMSGPR_AccountNumber",
            enabled = true)
    public void verifyAccountNumberSearchWorks(final String partner, final String value, final String expectedResult) {
        clearSearchParameters();
        VMSGPRSearchQueryPanelPo searchPanelPo = navigateTo_VMSGPR_Search();
        assertThat(!(searchPanelPo.getSearchButton()
                                  .isEnabled()));
        searchPanelPo.clickOnPartnerTrigger()
                     .selectPartner(partner);
        searchPanelPo.getAccountNumber()
                     .setValue(value);

        assertThat(searchPanelPo.getSearchButton()
                                .isEnabled());

        SearchResultsPanelPo resultsPo = searchPanelPo.clickSearch();
        dismissVerifyCustomerDialog(driver);
        assertThat(resultsPo.getReportSummary()
                            .getText()
                            .contains(expectedResult));
    }

    @Test(groups = {"version-7.0.0", "smoke", "search"},
            dataProviderClass = VMSGPRCardDP.class,
            dataProvider = "VMSGPR_CardNumber",
            enabled = true)
    public void verifyCardNumberSearchWorks(final String partner, final String value, final String expectedResult) {
        clearSearchParameters();
        VMSGPRSearchQueryPanelPo searchPanelPo = navigateTo_VMSGPR_Search();
        assertThat(!(searchPanelPo.getSearchButton()
                                  .isEnabled()));
        searchPanelPo.clickOnPartnerTrigger()
                     .selectPartner(partner);
        searchPanelPo.getCardNumber()
                     .setValue(value);

        assertThat(searchPanelPo.getSearchButton()
                                .isEnabled());

        SearchResultsPanelPo resultsPo = searchPanelPo.clickSearch();
        dismissVerifyCustomerDialog(driver);

        assertThat(resultsPo.getReportSummary()
                            .getText()
                            .contains(expectedResult));
    }

    @Test(groups = {"version-7.0.0", "smoke", "search"},
            dataProviderClass = VMSGPRCardDP.class,
            dataProvider = "VMSGPR_SerialNumber",
            enabled = true)
    public void verifySerialNumberSearchWorks(final String partner, final String value, final String expectedResult) {
        clearSearchParameters();
        VMSGPRSearchQueryPanelPo searchPanelPo = navigateTo_VMSGPR_Search();
        assertThat(!(searchPanelPo.getSearchButton()
                                  .isEnabled()));
        searchPanelPo.clickOnPartnerTrigger()
                     .selectPartner(partner);
        searchPanelPo.getSerialNumber()
                     .setValue(value);

        assertThat(searchPanelPo.getSearchButton()
                                .isEnabled());

        SearchResultsPanelPo resultsPo = searchPanelPo.clickSearch();
        dismissVerifyCustomerDialog(driver);
        assertThat(resultsPo.getReportSummary()
                            .getText()
                            .contains(expectedResult));
    }

    @Test(groups = {"version-7.0.0", "smoke", "search"},
            dataProviderClass = VMSGPRCardDP.class,
            dataProvider = "VMSGPR_CustomerName",
            enabled = false)
    public void verifyCustomerNameSearchWorks(final String partner, final String firstName, final String lastName, final String expectedResult) {
        clearSearchParameters();
        VMSGPRSearchQueryPanelPo searchPanelPo = navigateTo_VMSGPR_Search();
        assertThat(!(searchPanelPo.getSearchButton()
                                  .isEnabled()));
        searchPanelPo.clickOnPartnerTrigger()
                     .selectPartner(partner);
        searchPanelPo.getFirstName()
                     .setValue(firstName);
        searchPanelPo.getLastName()
                     .setValue(lastName);

        assertThat(searchPanelPo.getSearchButton()
                                .isEnabled());

        SearchResultsPanelPo resultsPo = searchPanelPo.clickSearch();

        assertThat(resultsPo.getReportSummary()
                            .getText()
                            .contains(expectedResult));

    }

    private VMSGPRSearchQueryPanelPo navigateTo_VMSGPR_Search() {
        SearchMenuPO searchMenuPo = navigationPO.navigateToSearchMenu();
        return (VMSGPRSearchQueryPanelPo) searchMenuPo.selectMenuOption(SearchType.VMS_GPR);
    }

    private void clearSearchParameters() {
        VMSGPRSearchQueryPanelPo searchPanelPo = navigateTo_VMSGPR_Search();
        searchPanelPo.clickOnClearButton();
    }

    private static void dismissVerifyCustomerDialog(final AqatDriver driver) {
        driver.getWebDriverWait()
              .until(ExpectedConditions.visibilityOfElementLocated(VerifyCustomerWizard.VERIFY_CUSTOMER_FORM_PAGE));
        WebElement verifyCustomerWizard = driver.findElement(VerifyCustomerWizard.VERIFY_CUSTOMER_FORM_PAGE);
        assertThat(verifyCustomerWizard
                .isDisplayed());
        assertThat(verifyCustomerWizard
                .isEnabled());
        driver.findElement(VerifyCustomerWizard.VERIFIED_BUTTON)
              .click();
        driver.getWebDriverWait()
              .until(ExpectedConditions.invisibilityOf(verifyCustomerWizard));
    }
}
