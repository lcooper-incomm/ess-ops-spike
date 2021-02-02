package com.incomm.cca.qa.acceptance.search;

import com.incomm.aqat.listener.TestListener;
import com.incomm.cca.qa.CcaTest;
import com.incomm.cca.qa.dataProvider.functional.acceptance.dashboard.SearchDP;
import com.incomm.cca.qa.pageObject.LoginPO;
import com.incomm.cca.qa.pageObject.NavigationPO;
import com.incomm.cca.qa.pageObject.enums.SearchType;
import com.incomm.cca.qa.pageObject.search.SearchMenuPO;
import com.incomm.cca.qa.pageObject.search.parameter.FinancialGiftSearchQueryPanelPo;
import com.incomm.cca.qa.pageObject.session.SessionDetailPO;
import com.incomm.cca.qa.tags.SmokeTest;
import org.springframework.test.context.ContextConfiguration;
import org.testng.ITestContext;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Listeners;
import org.testng.annotations.Test;

import static org.assertj.core.api.Assertions.assertThat;

@Listeners( { TestListener.class } )
@ContextConfiguration( "classpath:spring-context.xml" )
@SmokeTest
public class FinancialGiftSearchAT extends CcaTest {
	FinancialGiftSearchAT() {
		super();
	}
	private NavigationPO navigationPO;
	
	@BeforeClass( groups = { "base" }, alwaysRun = true )
	void setUp( ITestContext testContext ) throws Exception {
		super.initDriver( testContext );
		this.driver.get( constants.APP_URL );
		LoginPO signIn = new LoginPO( driver );
		navigationPO = signIn.defaultSignIn();
		navigationPO.waitForTransitionOverlayToGoAway();
	}
	
	@AfterClass( groups = { "base" }, alwaysRun = true )
	void tearDown() {
		navigationPO.logout();
		this.driver.quit();
	}
	
	
	//fixme: 9/9/2019 GScholes : We need valid test GreenCard numbers (Financial Gift Card Numbers) in order to fully test these scenarios.
	
	@Test( groups = { "version-7.0.0", "smoke", "search" },
	       description = "Verify Serial Number Search",
	       dataProviderClass = SearchDP.class,
	       dataProvider = "FinancialGift_serialNumber",
	       enabled = true )
	public void verifySerialNumber( final String inputValue, final String expectedResult ) {
		FinancialGiftSearchQueryPanelPo financialGiftSearchPanelPo = navigateToFinancialGiftSearchPanel();
		financialGiftSearchPanelPo.getSerialNumber()
		                          .setValue( inputValue );
		SessionDetailPO sessionDetailPo = financialGiftSearchPanelPo.clickSearchAndExpectNavigateToDetails();
		assertThat( sessionDetailPo.isDisplayed() );
		navigateToFinancialGiftSearchPanel();
		financialGiftSearchPanelPo.clickOnClearButton();
		//		assertThat( searchResultsPO.getCardHeaderContent()
//		assertThat( searchResultsPO.getCardHeaderContent()
//		                           .contains( expectedResult ) );
	}
	
	@Test( groups = { "version-7.0.0", "smoke", "search" },
	       description = "Verify Card Number Search",
	       dataProviderClass = SearchDP.class,
	       dataProvider = "FinancialGift_cardNumber",
	       enabled = true )
	public void verifyCardNumber( final String inputValue, final String expectedResult ) {
		FinancialGiftSearchQueryPanelPo financialGiftSearchPanelPo = navigateToFinancialGiftSearchPanel();
		financialGiftSearchPanelPo.getCardNumber()
		                          .setValue( inputValue );
		SessionDetailPO sessionDetailPo = financialGiftSearchPanelPo.clickSearchAndExpectNavigateToDetails();
		assertThat( sessionDetailPo.isDisplayed() );
		navigateToFinancialGiftSearchPanel();
		financialGiftSearchPanelPo.clickOnClearButton();
		//		assertThat( searchResultsPO.getCardHeaderContent()
//		assertThat( searchResultsPO.getCardHeaderContent()
//		                           .contains( expectedResult ) );
	}
	
	@Test( groups = { "version-7.0.0", "smoke", "search" },
	       description = "Verify VAN Search",
	       dataProviderClass = SearchDP.class,
	       dataProvider = "FinancialGift_van",
	       enabled = true )
	public void verifyVan( final String inputValue, final String expectedResult ) {
		FinancialGiftSearchQueryPanelPo financialGiftSearchPanelPo = navigateToFinancialGiftSearchPanel();
		financialGiftSearchPanelPo.getVan()
		                          .setValue( inputValue );
		SessionDetailPO sessionDetailPo = financialGiftSearchPanelPo.clickSearchAndExpectNavigateToDetails();
		assertThat( sessionDetailPo.isDisplayed() );
		navigateToFinancialGiftSearchPanel();
		financialGiftSearchPanelPo.clickOnClearButton();
		//		assertThat( searchResultsPO.getCardHeaderContent()
//		assertThat( searchResultsPO.getCardHeaderContent()
//		                           .contains( expectedResult ) );
	}
	
	@Test( groups = { "version-7.0.0", "smoke", "search" },
	       description = "Verify CAN Search",
	       dataProviderClass = SearchDP.class,
	       dataProvider = "FinancialGift_can",
	       enabled = true )
	public void verifyCan( final String inputValue, final String expectedResult ) {
		FinancialGiftSearchQueryPanelPo financialGiftSearchPanelPo = navigateToFinancialGiftSearchPanel();
		financialGiftSearchPanelPo.setCanFieldValue( inputValue );
		SessionDetailPO sessionDetailPo = financialGiftSearchPanelPo.clickSearchAndExpectNavigateToDetails();
		assertThat( sessionDetailPo.isDisplayed() );
		navigateToFinancialGiftSearchPanel();
		financialGiftSearchPanelPo.clickOnClearButton();
		//		assertThat( searchResultsPO.getCardHeaderContent()
//		assertThat( searchResultsPO.getCardHeaderContent()
//		                           .contains( expectedResult ) );
	}
	
	@Test( groups = { "version-7.0.0", "smoke", "search" },
	       description = "Verify Transaction ID Search",
	       dataProviderClass = SearchDP.class,
	       dataProvider = "FinancialGift_transactionId",
	       enabled = true )
	public void verifyTransactionId( final String inputValue, final String expectedResult ) {
		FinancialGiftSearchQueryPanelPo financialGiftSearchPanelPo = navigateToFinancialGiftSearchPanel();
		financialGiftSearchPanelPo.getTransactionId()
		                          .setValue( inputValue );
		SessionDetailPO sessionDetailPo = financialGiftSearchPanelPo.clickSearchAndExpectNavigateToDetails();
		assertThat( sessionDetailPo.isDisplayed() );
		navigateToFinancialGiftSearchPanel();
		financialGiftSearchPanelPo.clickOnClearButton();
		//		assertThat( searchResultsPO.getCardHeaderContent()
//		assertThat( searchResultsPO.getCardHeaderContent()
//		                           .contains( expectedResult ) );
	}
	
	@Test( groups = { "version-7.0.0", "smoke", "search" },
	       description = "Verify PreAuth Key",
	       dataProviderClass = SearchDP.class,
	       dataProvider = "FinancialGift_preAuthKey",
	       enabled = true )
	public void verifyPreAuthKey( final String inputValue, final String expectedResult ) {
		FinancialGiftSearchQueryPanelPo financialGiftSearchPanelPo = navigateToFinancialGiftSearchPanel();
		financialGiftSearchPanelPo.getPreauthKey()
		                          .setValue( inputValue );
		SessionDetailPO sessionDetailPo = financialGiftSearchPanelPo.clickSearchAndExpectNavigateToDetails();
		assertThat( sessionDetailPo.isDisplayed() );
		navigateToFinancialGiftSearchPanel();
		financialGiftSearchPanelPo.clickOnClearButton();
//		assertThat( searchResultsPO.getCardHeaderContent()
//		                           .contains( expectedResult ) );
	}
	
	private FinancialGiftSearchQueryPanelPo navigateToFinancialGiftSearchPanel() {
		SearchMenuPO menuPo = navigationPO.navigateToSearchMenu();
		FinancialGiftSearchQueryPanelPo financialGiftSearchQueryPanelPo = ( FinancialGiftSearchQueryPanelPo ) menuPo.selectMenuOption( SearchType.FINANCIAL_GIFT );
		assertThat( financialGiftSearchQueryPanelPo.isDisplayed() );
		return financialGiftSearchQueryPanelPo;
	}
}
