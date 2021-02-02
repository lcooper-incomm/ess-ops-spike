package com.incomm.cca.qa.acceptance.search;

import com.incomm.aqat.listener.TestListener;
import com.incomm.cca.qa.CcaTest;
import com.incomm.cca.qa.dataProvider.functional.acceptance.dashboard.SearchDP;
import com.incomm.cca.qa.pageObject.LoginPO;
import com.incomm.cca.qa.pageObject.NavigationPO;
import com.incomm.cca.qa.pageObject.enums.SearchType;
import com.incomm.cca.qa.pageObject.search.SearchMenuPO;
import com.incomm.cca.qa.pageObject.search.parameter.FastCardSearchQueryPanelPO;
import com.incomm.cca.qa.pageObject.search.parameter.SearchQueryPanel;
import com.incomm.cca.qa.pageObject.search.results.SearchResultsPanelPo;
import com.incomm.cca.qa.pageObject.session.SessionDetailPO;
import com.incomm.cca.qa.tags.SmokeTest;
import org.openqa.selenium.support.ui.ExpectedConditions;
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
public class FastCardSearchAT extends CcaTest {
	
	FastCardSearchAT() {
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
	
	
	@Test( groups = { "version-7.0.0", "smoke", "search" },
	       description = "Verify Transaction ID Search Works",
	       dataProviderClass = SearchDP.class,
	       dataProvider = "FastCard_transactionID",
	       enabled = true )
	public void transactionIdSearch( String testCaseDescription, String inputValue, String expectedResult ) {
		FastCardSearchQueryPanelPO fastCardSearchPanel = navigateToFastCardPanel();
		fastCardSearchPanel.waitForTransitionOverlayToGoAway();
		SearchResultsPanelPo searchResultsPo;
		fastCardSearchPanel.getTransactionId()
		                   .setValue( inputValue );
		searchResultsPo = fastCardSearchPanel.clickSearch();
		assertThat( searchResultsPo.getReportSummary()
		                           .getText()
		                           .contains( expectedResult ) );
		navigateToFastCardPanel();
		fastCardSearchPanel.clickOnClearButton();
	}
	
	@Test( groups = { "version-7.0.0", "smoke", "search" },
	       description = "Verify Control Number Search works",
	       dataProviderClass = SearchDP.class,
	       dataProvider = "FastCard_controlNumber",
	       enabled = true )
	public void controlNumberSearch( String testCaseDescription, String inputValue, String expectedResult ) {
		FastCardSearchQueryPanelPO fastCardSearchPanel = navigateToFastCardPanel();
		fastCardSearchPanel.waitForTransitionOverlayToGoAway();
		SearchResultsPanelPo searchResultsPo;
		fastCardSearchPanel.getControlNumber()
		                   .setValue( inputValue );
		searchResultsPo = fastCardSearchPanel.clickSearch();
		assertThat( searchResultsPo.getReportSummary()
		                           .getText()
		                           .contains( expectedResult ) );
		navigateToFastCardPanel();
		fastCardSearchPanel.clickOnClearButton();
		
	}
	
	@Test( groups = { "version-7.0.0", "smoke", "search" },
	       description = "Verify Proxy Number Search works",
	       dataProviderClass = SearchDP.class,
	       dataProvider = "FastCard_proxyNumber",
	       enabled = true )
	public void proxyNumberSearch( String testCaseDescription, String inputValue, String expectedResult ) {
		FastCardSearchQueryPanelPO fastCardSearchPanel = navigateToFastCardPanel();
		fastCardSearchPanel.waitForTransitionOverlayToGoAway();
		SearchResultsPanelPo searchResultsPo;
		fastCardSearchPanel.getProxyNumber()
		                   .setValue( inputValue );
		searchResultsPo = fastCardSearchPanel.clickSearch();
		assertThat( searchResultsPo.getReportSummary()
		                           .getText()
		                           .contains( expectedResult ) );
		navigateToFastCardPanel();
		fastCardSearchPanel.clickOnClearButton();
		
	}
	
	@Test( groups = { "version-7.0.0", "smoke", "search" },
	       description = "Verify Vendor Serial Number Search works",
	       dataProviderClass = SearchDP.class,
	       dataProvider = "FastCard_vendorSerialNumber",
	       enabled = true )
	public void vendorSerialNumberSearch( String testCaseDescription, String inputValue, String expectedResult ) {
		FastCardSearchQueryPanelPO fastCardSearchPanel = navigateToFastCardPanel();
		fastCardSearchPanel.waitForTransitionOverlayToGoAway();
		SearchResultsPanelPo searchResultsPo;
		fastCardSearchPanel.getVendorSerialNumber()
		                   .setValue( inputValue );
		searchResultsPo = fastCardSearchPanel.clickSearch();
		assertThat( searchResultsPo.getReportSummary()
		                           .getText()
		                           .contains( expectedResult ) );
		navigateToFastCardPanel();
		fastCardSearchPanel.clickOnClearButton();
		
	}
	
	@Test( groups = { "version-7.0.0", "smoke", "search" },
	       description = "Verify PIN Search works",
	       dataProviderClass = SearchDP.class,
	       dataProvider = "FastCard_pinNumber",
	       enabled = true )
	public void pinSearch( String testCaseDescription, String inputValue, String expectedResult ) {
		FastCardSearchQueryPanelPO fastCardSearchPanel = navigateToFastCardPanel();
		fastCardSearchPanel.waitForTransitionOverlayToGoAway();
		SessionDetailPO sessionDetailPo;
		fastCardSearchPanel.getPin()
		                   .setValue( inputValue );
		sessionDetailPo = fastCardSearchPanel.clickSearchAndExpectNavigateToDetails();
		assertThat( sessionDetailPo.isDisplayed() );
		assertThat( sessionDetailPo.getCardHeaderContent()
		                           .contains( expectedResult ) );
		navigateToFastCardPanel();
		fastCardSearchPanel.clickOnClearButton();
		
	}
	
	@Test( groups = { "version-7.0.0", "smoke", "search" },
	       description = "Verify VAN Search works",
	       dataProviderClass = SearchDP.class,
	       dataProvider = "FastCard_vanNumber",
	       enabled = true )
	public void vanNumberSearch( String testCaseDescription, String inputValue, String expectedResult ) {
		FastCardSearchQueryPanelPO fastCardSearchPanel = navigateToFastCardPanel();
		fastCardSearchPanel.waitForTransitionOverlayToGoAway();
		SessionDetailPO sessionDetailPo;
		fastCardSearchPanel.getVan()
		                   .setValue( inputValue );
		sessionDetailPo = fastCardSearchPanel.clickSearchAndExpectNavigateToDetails();
		assertThat( sessionDetailPo.isDisplayed() );
		assertThat( sessionDetailPo.getCardHeaderContent()
		                           .contains( expectedResult ) );
		navigateToFastCardPanel();
		fastCardSearchPanel.clickOnClearButton();
		
	}
	
	@Test( groups = { "version-7.0.0", "smoke", "search" },
	       description = "Verify Serial Number Search works",
	       dataProviderClass = SearchDP.class,
	       dataProvider = "FastCard_serialNumber",
	       enabled = true )
	public void serialNumberSearch( String testCaseDescription, String inputValue, String expectedResult ) {
		FastCardSearchQueryPanelPO fastCardSearchPanel = navigateToFastCardPanel();
		fastCardSearchPanel.waitForTransitionOverlayToGoAway();
		SessionDetailPO sessionDetailPo;
		fastCardSearchPanel.getSerialNumber()
		                   .setValue( inputValue );
		sessionDetailPo = fastCardSearchPanel.clickSearchAndExpectNavigateToDetails();
		assertThat( sessionDetailPo.isDisplayed() );
		assertThat( sessionDetailPo.getCardHeaderContent()
		                           .contains( expectedResult ) );
		navigateToFastCardPanel();
		fastCardSearchPanel.clickOnClearButton();
		
	}
	
	private FastCardSearchQueryPanelPO navigateToFastCardPanel() {
		SearchMenuPO menuPo = navigationPO.navigateToSearchMenu();
		SearchQueryPanel searchQueryPanel = menuPo.selectMenuOption( SearchType.FASTCARD );
		assertThat( searchQueryPanel instanceof FastCardSearchQueryPanelPO );
		FastCardSearchQueryPanelPO fastCardSearchPanel = ( FastCardSearchQueryPanelPO ) searchQueryPanel;
		wait.until( ExpectedConditions.elementToBeClickable( fastCardSearchPanel.getClearButton() ) );
		assertThat( fastCardSearchPanel.isDisplayed() );
		return fastCardSearchPanel;
	}
}
