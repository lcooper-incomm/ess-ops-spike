package com.incomm.cca.qa.acceptance;

import com.incomm.aqat.listener.TestListener;
import com.incomm.cca.qa.CcaTest;
import com.incomm.cca.qa.pageObject.LoginPO;
import com.incomm.cca.qa.pageObject.NavigationPO;
import com.incomm.cca.qa.pageObject.admin.ControlPanelPo;
import com.incomm.cca.qa.pageObject.dashboard.DashboardPo;
import com.incomm.cca.qa.pageObject.profile.ProfilePo;
import com.incomm.cca.qa.pageObject.reports.ReportsPo;
import com.incomm.cca.qa.pageObject.search.SearchPo;
import com.incomm.cca.qa.pageObject.services.ServicesPanelPO;
import com.incomm.cca.qa.tags.Smoke;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.test.context.ContextConfiguration;
import org.testng.ITestContext;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Listeners;
import org.testng.annotations.Test;
import org.testng.asserts.SoftAssert;

import static org.assertj.core.api.Assertions.assertThat;
import static org.testng.Assert.assertTrue;

@Listeners( { TestListener.class } )
@ContextConfiguration( "classpath:spring-context.xml" )
@Smoke
@TestMethodOrder( MethodOrderer.Alphanumeric.class )
public class NavigationAT extends CcaTest {
	
	NavigationAT() {
		super();
	}
	protected NavigationPO navigationPO;
	
	@BeforeClass( groups = { "base" }, alwaysRun = true )
	void setUp( ITestContext testContext ) throws Exception {
		this.initDriver( testContext );
		this.driver.get( constants.APP_URL );
		LoginPO signIn = new LoginPO( driver );
		navigationPO = signIn.defaultSignIn();
		navigationPO.waitForTransitionOverlayToGoAway();
	}
	

	@AfterClass( groups = { "base" }, alwaysRun = true )
	void tearDown() {
		this.driver.quit();
	}
	
	@Test( groups = { "version-7.0.0", "smoke", "navigation" }, enabled = true )
	public void navigationToAllPointsInNavigationBar() {
		SearchPo searchPo = navigationPO.navigateToSearch();
		SoftAssert softly = new SoftAssert();
		softly.assertTrue( searchPo.isDisplayed() );
		DashboardPo dashboardPo = navigationPO.navigateToDashboard();
		softly.assertTrue( dashboardPo.isDisplayed() );
		ReportsPo reportsPo = navigationPO.navigateToReports();
		softly.assertTrue( reportsPo.isDisplayed() );
		ServicesPanelPO servicesPanelPo = navigationPO.navigateToServices();
		softly.assertTrue( servicesPanelPo.isDisplayed() );
		navigationPO.navigateToDashboard();
		ControlPanelPo controlPanelPo = navigationPO.navigateToControlPanel();
		softly.assertTrue( controlPanelPo.isDisplayed() );
		ProfilePo profilePo = navigationPO.navigateToProfile();
		softly.assertTrue( profilePo.isDisplayed() );
		softly.assertAll();
	}
	
	//todo: Add navigation to Cases Workspace
	//todo: Add navigation to Details when Session is active.
	
	
	@Test( groups = { "version-7.0.0", "smoke", "dashboard" },
	       enabled = true )
	public void dashboardWorkspace() {
		assertThat( navigationPO.getDashboardNavButtonElement()
		                        .isDisplayed() );
		navigationPO.navigateToDashboard();
		assertThat( navigationPO.isDisplayed() );
	}
	
	@Test( groups = { "version-7.0.0", "smoke", "navigation" }, enabled = true )
	public void searchPage() {
		SearchPo searchPo = navigationPO.navigateToSearch();
		assertTrue( searchPo.isDisplayed() );
	}
	
	@Test( groups = { "version-7.0.0", "smoke", "navigation" }, enabled = true )
	public void servicesPage() {
		navigationPO.waitForTransitionOverlayToGoAway();
		ServicesPanelPO servicesPanelPo = navigationPO.navigateToServices();
		assertTrue( servicesPanelPo.isDisplayed() );
	}
	
	@Test( groups = { "version-7.0.0", "smoke", "navigation" }, enabled = true )
	public void reportsPage() {
		ReportsPo reportsPo = navigationPO.navigateToReports();
		assertTrue( reportsPo.isDisplayed() );
	}
	
	@Test( groups = { "version-7.0.0", "smoke", "navigation" }, enabled = true )
	public void controlPanelPage() {
		ControlPanelPo controlPanelPo = navigationPO.navigateToControlPanel();
		assertTrue( controlPanelPo.isDisplayed() );
	}
	
	@Test( groups = { "version-7.0.0", "smoke", "navigation" },
	       enabled = true )
	public void profilePage() {
		SoftAssert softly = new SoftAssert();
		softly.assertTrue(navigationPO.isDisplayed());
		ProfilePo profilePo = navigationPO.navigateToProfile();
		softly.assertTrue( profilePo.isDisplayed() );
		softly.assertAll();
	}
	
	
	@Test( groups = { "version-7.0.0", "smoke", "navigation" }, enabled = true )
	public void zlogout() {
		navigationPO.logout();
		assertTrue( driver.getCurrentUrl().contains("login") );
	}
	
//
//	@Test( groups = { "version-4.13.0", "acceptance", "navigation" }, enabled = false )
//	public void logoutActiveSession() {
//		/*
//		TODO: 4/1/2019 data for this test is no longer providing expected results in the search
//		Needs new accurate data
//		*/
//
//		String searchValue = "117821408569869";
//
//		LoginPO signIn = new LoginPO( driver );
//		NavigationPO navigation = signIn.defaultSignIn();
//		SearchMenuPO searchMenuPo = navigation.navigateToSearchMenu();
//
//		FastCardSearchQueryPanelPO fastCardSearchPanelPo = ( FastCardSearchQueryPanelPO ) searchMenuPo.selectMenuOption( SearchType.FASTCARD );
//		wait.until( ExpectedConditions.elementToBeClickable( fastCardSearchPanelPo.getSearchButton() ) );
//		fastCardSearchPanelPo.getPin()
//		                     .setValue( searchValue );
//		SessionDetailPO sessionDetailPo = fastCardSearchPanelPo.clickSearchAndExpectNavigateToDetails();
//		assertThat( sessionDetailPo.isDisplayed() );
//		navigationPO.logout();
//		assertThat( driver.getCurrentUrl()
//		                  .contains( "/login" ) );
//
//	}
//
}


