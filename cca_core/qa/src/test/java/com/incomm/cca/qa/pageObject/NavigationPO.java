package com.incomm.cca.qa.pageObject;

import com.incomm.aqat.driver.AqatDriver;
import com.incomm.cca.qa.pageObject.admin.ControlPanelPo;
import com.incomm.cca.qa.pageObject.cases.CasesWorkspacePO;
import com.incomm.cca.qa.pageObject.dashboard.DashboardPo;
import com.incomm.cca.qa.pageObject.details.DetailsPo;
import com.incomm.cca.qa.pageObject.profile.ProfilePo;
import com.incomm.cca.qa.pageObject.reports.ReportsMenuPo;
import com.incomm.cca.qa.pageObject.reports.ReportsPo;
import com.incomm.cca.qa.pageObject.search.SearchMenuPO;
import com.incomm.cca.qa.pageObject.search.SearchPo;
import com.incomm.cca.qa.pageObject.services.ServicesMenuPO;
import com.incomm.cca.qa.pageObject.services.ServicesPanelPO;
import com.incomm.cca.qa.pageObject.session.SessionWizardPo;
import com.incomm.cca.qa.pageObject.user.UserMenuPO;
import org.openqa.selenium.By;
import org.openqa.selenium.ElementClickInterceptedException;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.PageFactory;

import static com.incomm.aqat.util.AqatWait.waitForPageLoad;

public class NavigationPO extends BasePo {
	
	public static final By DETAIL_PANEL_NAV_BUTTON = By.id( "detail-panel-nav-button" );
	public static final By DISPLAY_NAME = By.cssSelector( "cca-user-chip span" );
	public static final By REPORTS_MENU_TRIGGER = By.id( "reports-menu-trigger" );
	public static final By SEARCH_MENU_TRIGGER = By.id( "search-menu-trigger" );
	public static final By CONTROL_MENU_TRIGGER = By.id( "control-panel-trigger" );
	public static final By SERVICES_MENU_TRIGGER = By.id( "services-menu-trigger" );
	public static final By USER_PROFILE_BUTTON = By.cssSelector( "cca-user-chip#profile-nav-button" );
	public static final By USER_MENU_BUTTON = By.cssSelector( "button#user-menu-button fa-icon" );
	public static final By CREATE_SESSION_BUTTON = By.id( "create-session-button" );
	public static final By CONTROL_PANEL_NAV_BUTTON = By.id( "control-panel-nav-button" );
	public static final By SERVICES_NAV_BUTTON = By.id( "services-nav-button" );
	public static final By REPORTS_NAV_BUTTON = By.id( "reports-nav-button" );
	public static final By SEARCH_NAV_BUTTON = By.id( "search-nav-button" );
	public static final By CASE_WORKSPACE_BUTTON = By.id( "case-workspace-nav-button" );
	public static final By DASHBOARD_NAV_BUTTON = By.id( "dashboard-nav-button" );
	public static final By MAIN_NAVIGATION_BAR = By.cssSelector( "app-root cca-main-navigation mat-toolbar.main-navigation" );
	
	
	public NavigationPO( AqatDriver driver ) {
		super( driver );
		waitForPageLoad( driver );
		PageFactory.initElements( driver, this );
	}
	
	/**
	 * Waits until all the members of the navigation page object are displayed
	 *
	 * @return true once all the members are displayed; false if the members do not display in time.
	 */
	public Boolean isDisplayed() {
		return driver.findElement( MAIN_NAVIGATION_BAR )
		             .isDisplayed();
	}
	
	
	/*
	 * DashboardNavButton
	 * ***************************************************************
	 */
	
	public DashboardPo navigateToDashboard() {
		return clickDashboardNavButton();
	}
	
	public DashboardPo clickDashboardNavButton() {
		try {
			getDashboardNavButtonElement().click();
		}
		catch( ElementClickInterceptedException e ) {
			clickOverlayContainer();
			getDashboardNavButtonElement().click();
		}
		return new DashboardPo( driver );
	}
	
	public WebElement getDashboardNavButtonElement() {
		return driver.findElement( DASHBOARD_NAV_BUTTON );
	}
	
	/*
	 * CaseWorkspaceNavButton
	 * ***************************************************************
	 */
	
	public WebElement getCaseWorkspaceNavButtonElement() {
		return driver.findElement( CASE_WORKSPACE_BUTTON );
	}
	
	public CasesWorkspacePO clickCaseWorkspaceNavButton() {
		try {
			getCaseWorkspaceNavButtonElement().click();
		}
		catch( ElementClickInterceptedException e ) {
			clickOverlayContainer();
			getCaseWorkspaceNavButtonElement().click();
		}
		return new CasesWorkspacePO( driver );
	}
	
	
	public CasesWorkspacePO navigateToCasesWorkspace() {
		return clickCaseWorkspaceNavButton();
	}
	
	/*
	 * SearchNavButton
	 * ***************************************************************
	 */
	
	public WebElement getSearchNavButtonElement() {
		return driver.findElement( SEARCH_NAV_BUTTON );
	}
	
	public SearchPo clickSearchNavButton() {
		try {
			getSearchNavButtonElement().click();
		}
		catch( ElementClickInterceptedException e ) {
			clickOverlayContainer();
			getSearchNavButtonElement().click();
		}
		return new SearchPo( driver );
	}
	
	public SearchPo navigateToSearch() {
		return clickSearchNavButton();
	}
	
	/*
	 * SearchMenuTrigger
	 * ***************************************************************
	 */
	
	public WebElement getSearchMenuTriggerElement() {
		return driver.findElement( SEARCH_MENU_TRIGGER );
	}
	
	public SearchMenuPO clickSearchMenuTrigger() {
		try {
			getSearchMenuTriggerElement().click();
		}
		catch( ElementClickInterceptedException e ) {
			clickOverlayContainer();
			getSearchMenuTriggerElement().click();
		}
		return new SearchMenuPO( driver );
	}
	
	public SearchMenuPO navigateToSearchMenu() {
		return clickSearchMenuTrigger();
	}
	
	
	/*
	 * DetailPanelNavButton
	 * ***************************************************************
	 */
	
	public WebElement getDetailPanelNavButtonElement() {
		return driver.findElement( DETAIL_PANEL_NAV_BUTTON );
	}
	
	public DetailsPo clickDetailPanelNavButton() {
		try {
			getDetailPanelNavButtonElement().click();
		}
		catch( ElementClickInterceptedException e ) {
			clickOverlayContainer();
			getDetailPanelNavButtonElement().click();
		}
		return new DetailsPo( driver );
	}
	/*
	 * ReportsNavButton
	 * ***************************************************************
	 */
	
	public WebElement getReportsNavButtonElement() {
		return driver.findElement( REPORTS_NAV_BUTTON );
	}
	
	public ReportsPo clickReportsNavButton() {
		try {
			getReportsNavButtonElement().click();
		}
		catch( ElementClickInterceptedException e ) {
			clickOverlayContainer();
			getReportsNavButtonElement().click();
		}
		return new ReportsPo( driver );
	}
	
	public ReportsPo navigateToReports() {
		return clickReportsNavButton();
	}
	
	/*
	 * ReportsMenuTrigger
	 * ***************************************************************
	 */
	
	public WebElement getReportsMenuTriggerElement() {
		return driver.findElement( REPORTS_MENU_TRIGGER );
	}
	
	public ReportsMenuPo clickReportsMenuTrigger() {
		try {
			getReportsMenuTriggerElement().click();
		}
		catch( ElementClickInterceptedException e ) {
			clickOverlayContainer();
			getReportsMenuTriggerElement().click();
		}
		return new ReportsMenuPo( driver );
	}
	
	
	/*
	 * ServicesNavButton
	 * ***************************************************************
	 */
	
	public WebElement getServicesNavButtonElement() {
		return driver.findElement( SERVICES_NAV_BUTTON );
	}
	
	public ServicesMenuPO clickServicesNavButton() {
		try {
			getServicesNavButtonElement().click();
		}
		catch( ElementClickInterceptedException e ) {
			clickOverlayContainer();
			getServicesNavButtonElement().click();
		}
		return new ServicesMenuPO( driver );
	}
	
	/*
	 * ServicesMenuTrigger
	 * ***************************************************************
	 */
	
	
	public ServicesPanelPO navigateToServices() {
		return clickServicesMenuTrigger();
	}
	
	public WebElement getServicesMenuTriggerElement() {
		return driver.findElement( SERVICES_MENU_TRIGGER );
	}
	
	public ServicesPanelPO clickServicesMenuTrigger() {
		try {
			getServicesMenuTriggerElement().click();
		}
		catch( ElementClickInterceptedException e ) {
			clickOverlayContainer();
			getServicesMenuTriggerElement().click();
		}
		return new ServicesPanelPO( driver );
	}
	
	/*
	 * ControlPanelNavButton
	 * ***************************************************************
	 */
	
	public WebElement getControlPanelNavButton() {
		return driver.findElement( CONTROL_PANEL_NAV_BUTTON );
	}
	
	/*
	 * ControlPanelTrigger
	 * ***************************************************************
	 */
	public WebElement getControlPanelTriggerElement() {
		return driver.findElement( CONTROL_MENU_TRIGGER );
	}
	
	public ControlPanelPo navigateToControlPanel() {
		try {
			getControlPanelTriggerElement().click();
		}
		catch( ElementClickInterceptedException e ) {
			clickOverlayContainer();
			getControlPanelTriggerElement().click();
		}
		return new ControlPanelPo( driver );
	}
	
	
	/*
	 * ProfileNavButton
	 * ***************************************************************
	 */
	
	public WebElement getUserProfileButton() {
		return driver.findElement( USER_PROFILE_BUTTON );
	}
	
	public WebElement hoverOverUserProfileButton() {
		//todo: implement this
		return null;
	}
	
	public ProfilePo clickProfileNavButton() {
		try {
			getUserProfileButton().click();
		}
		catch( ElementClickInterceptedException e ) {
			clickOverlayContainer();
			getUserProfileButton().click();
		}
		return new ProfilePo( driver );
	}
	
	public ProfilePo navigateToProfile() {
		return clickProfileNavButton();
	}
	
	/*
	 * DisplayedName
	 * ***************************************************************
	 */
	
	public WebElement getDisplayNameElement() {
		return driver.findElement( DISPLAY_NAME );
	}
	
	public String getDisplayName() {
		return getDisplayNameElement().getText();
		
	}
	
	
	/*
	 * CreateSessionButton
	 * ***************************************************************
	 */
	
	public WebElement getCreateSessionButtonElement() {
		return driver.findElement( CREATE_SESSION_BUTTON );
	}
	
	public SessionWizardPo clickCreateSessionButton() {
	    try {
		getCreateSessionButtonElement().click();
        } catch (ElementClickInterceptedException e) {
            clickOverlayContainer();
            getCreateSessionButtonElement().click();
        }
		return new SessionWizardPo( driver );
	}
	
	/*
	 * UserMenuButton
	 * ***************************************************************
	 */
	
	public WebElement getUserMenuButtonElement() {
		return driver.findElement( USER_MENU_BUTTON );
	}

	public void logout() {
//		Actions userMoves = new Actions(driver);
////		userMoves.moveToElement(getUserMenuButtonElement()).perform();
//		userMoves.click(getUserMenuButtonElement()).perform();
//		UserMenuPO userMenuPO = new UserMenuPO(driver);
//
//		driver.getWebDriverWait().until(ExpectedConditions.elementToBeClickable(userMenuPO.getUserSignOutButton()));
//		WebElement signOutButton = driver.findElement(UserMenuPO.SIGN_OUT_BUTTON);
//		driver.clickAt(signOutButton, 0 , 0 );
//	}
		try {
			getUserMenuButtonElement().click();
		} catch (ElementClickInterceptedException e) {
			clickOverlayContainer();
			getUserMenuButtonElement().click();
		}
		driver.findElement(UserMenuPO.SIGN_OUT_BUTTON).click();

	}
	
}
