package com.incomm.cca.qa.acceptance;

import com.incomm.aqat.listener.TestListener;
import com.incomm.cca.qa.CcaTest;
import com.incomm.cca.qa.dataProvider.common.UserData;
import com.incomm.cca.qa.pageObject.LoginPO;
import com.incomm.cca.qa.pageObject.NavigationPO;
import com.incomm.cca.qa.tags.SmokeTest;
import org.springframework.test.context.ContextConfiguration;
import org.testng.ITestContext;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Listeners;
import org.testng.annotations.Test;

import static org.assertj.core.api.Assertions.assertThat;

@Listeners( { TestListener.class } )
@ContextConfiguration( "classpath:spring-context.xml" )
@SmokeTest
public class SignInAT extends CcaTest {
	
	SignInAT() {
		super();
	}
	
	@BeforeClass( groups = { "base" }, alwaysRun = true )
	void setUp( ITestContext testContext ) throws Exception {
		super.initDriver( testContext );
		this.driver.get( constants.APP_URL );
	}
	
	@AfterClass( groups = { "base" }, alwaysRun = true )
	void tearDown() {
		this.driver.quit();
	}
	
	
	@Test( groups = { "version-7.0.0", "smoke", "navigation" }, enabled = true )
	public void defaultSignInMethodWorksForRegression() {
		LoginPO signIn = new LoginPO( driver );
		NavigationPO navigation = signIn.defaultSignIn();
		navigation.waitForTransitionOverlayToGoAway();
		assertThat( navigation.isDisplayed() );
		navigation.logout();
	}
	
	@Test( groups = { "version-7.0.0", "smoke", "navigation" }, dataProvider = "invalidCredentials", enabled = true )
	public void invalidUserCredentialsFailSignInAttempt( String username, String password ) {
		LoginPO loginPO = new LoginPO(  driver );
		loginPO.signInWithUsernameAndPassword( username, password );
		assertThat(loginPO.getAlertContainer().isDisplayed()).isTrue();
		assertThat( loginPO.getAlertText() ).contains( LoginPO.MESSAGE_LOGIN_FAILURE );
	}
	
	@DataProvider( name = "invalidCredentials" )
	private Object[][] invalidCredentials() {
		return new Object[][]{
			{ UserData.CCA_ADMIN.getUsername(), "badpassword" },
			{ "badusername", UserData.CCA_ADMIN.getPassword() },
			{ "badusername", "badpassword" },
			};
	}
	
	@Test( groups = { "version-7.0.0", "smoke", "navigation" }, dataProvider = "validUsers", enabled = true )
	public void validUserCredentialsSucceedSignInAttempt( UserData.Credential user ) {
		LoginPO loginPO = new LoginPO(  driver );
		loginPO.signInWithUsernameAndPassword( user.getUsername(), user.getPassword() );
		loginPO.waitForTransitionOverlayToGoAway();
		NavigationPO navigationPO = loginPO.expectNavigationPO();
		assertThat(navigationPO.isDisplayed()).as("Username " + user.getUsername() + " attempted to sign-in with " + user.getPassword()+ " but has failed.").isTrue();
		navigationPO.logout();
	}
	
	@DataProvider( name = "validUsers" )
	private Object[][] validUsers() {
		return new Object[][]{
			{ UserData.CCA_ADMIN },
			{ UserData.MANAGER1 },
			{ UserData.MANAGER2 },
			{ UserData.MANAGER3 },
			{ UserData.SUPERVISOR1 },
			{ UserData.SUPERVISOR2 },
			{ UserData.SUPERVISOR3 },
			{ UserData.AGENT1 },
			{ UserData.AGENT2 },
			{ UserData.AGENT3 },
			};
	}
	
	//	static Stream< Arguments > invalidCredentials() {
	//		return Stream.of(
	//			Arguments.arguments( TestUser.CCA_ADMIN.getUsername(), "badPassword" ),
	//			Arguments.arguments( "badUsername", TestUser.CCA_ADMIN.getPassword() ),
	//			Arguments.arguments( "badUsername", "badPassword" ),
	//		);
	//	}
}
