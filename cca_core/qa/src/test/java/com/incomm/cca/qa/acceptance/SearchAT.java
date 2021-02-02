package com.incomm.cca.qa.acceptance;

import com.incomm.aqat.listener.TestListener;
import com.incomm.cca.qa.CcaTest;
import com.incomm.cca.qa.dataProvider.functional.acceptance.dashboard.SearchDP;
import com.incomm.cca.qa.pageObject.LoginPO;
import com.incomm.cca.qa.pageObject.NavigationPO;
import com.incomm.cca.qa.pageObject.enums.SearchCategory;
import com.incomm.cca.qa.pageObject.enums.SearchParameter;
import com.incomm.cca.qa.pageObject.enums.SearchType;
import com.incomm.cca.qa.pageObject.search.SearchMenuPO;
import com.incomm.cca.qa.pageObject.search.parameter.SearchQueryPanel;
import com.incomm.cca.qa.tags.SmokeTest;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.springframework.test.context.ContextConfiguration;
import org.testng.ITestContext;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Listeners;
import org.testng.annotations.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Search Acceptance Tests
 * User: mgalloway
 * Date: 7/25/13
 * Time: 9:30 AM
 */
@Listeners( { TestListener.class } )
@ContextConfiguration( "classpath:spring-context.xml" )
@SmokeTest
public class SearchAT extends CcaTest {
	SearchAT() {
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
		navigationPO.logout();
		this.driver.quit();
	}
	
	@Test( groups = { "version-7.0.0", "smoke", "search" },
	       description = "Verify that the actual names of search categories/columns in the search menu match the expected names."
	)
	public void verifySearchCategories() {
		SearchMenuPO searchMenuPo = navigationPO.navigateToSearchMenu();
		List< String > actualMenuCategories = searchMenuPo.getMenuColumnHeadersLabels();
		List< String > expectedMenuCategories = SearchCategory.getLabels();
		assertThat( actualMenuCategories.containsAll( expectedMenuCategories ) );
		assertThat( expectedMenuCategories.containsAll( actualMenuCategories ) );
	}
	
	@Test( groups = { "version-7.0.0", "smoke", "search" },
	       description = "Verify that the actual names of search links in the search menu match the expected names."
	)
	public void verifySearchLinks() {
		SearchMenuPO searchMenuPo = navigationPO.navigateToSearchMenu();
		List< String > actualMenuLinks = searchMenuPo.getMenuOptionLabels();
		List< String > expectedMenuLinks = SearchType.getLabels();
		assertThat( actualMenuLinks.containsAll( expectedMenuLinks ) );
		assertThat( expectedMenuLinks.containsAll( actualMenuLinks ) );
	}
	
	@Test( groups = { "version-7.0.0", "smoke", "search" },
	       description = "The correct parameters for each search type should appear in the search panel.",
	       dataProviderClass = SearchDP.class,
	       dataProvider = "searchTypeParameters" )
	public void verifySearchTypeParameters( String testDescription, SearchType searchType, List< SearchParameter > expectedParams ) {
		SearchMenuPO searchMenuPo = navigationPO.navigateToSearchMenu();
		SearchQueryPanel panel = searchMenuPo.selectMenuOption( searchType );
		assertThat( panel != null );
		wait.until( ExpectedConditions.elementToBeClickable( panel.getHeaderTitle() ) );
		if( panel.hasAdvancedQueryFields() ) {
			panel = panel.clickOnAdvancedToggle();
			panel.reload();
		}
		List< SearchParameter > actualParams = panel.getAvailableParameters();
		assertThat( actualParams.containsAll( expectedParams ) );
		assertThat( expectedParams.containsAll( actualParams ) );
	}
	
	
//	@Test( groups = { "version-6.0.0", "acceptance", "search", "permissions" }, enabled = false )
//	public void verifySearchTypePermissions() {
//	}
	
}
