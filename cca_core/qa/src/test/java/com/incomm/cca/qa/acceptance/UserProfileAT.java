package com.incomm.cca.qa.acceptance;

import org.testng.annotations.Test;

@Test
public class UserProfileAT  {
//
//	@BeforeAll
//	public void setUp( ITestContext testContext ) throws Exception {
//		initDriver( testContext );
//		this.driver.get( constants.APP_URL );
//	}
//
//
//	@Tag( value = "CCA7" )
//	@Test( groups = { "version-4.11.0", "in-progress", "profile" }, dataProvider = "userRoles", enabled = true )
//	public void userProfileUserDetails( String username, String password, List< String > expectedRoles ) {
//		LoginPO loginPO = new LoginPO( driver );
//		loginPO.signInWithUsernameAndPassword( username, password );
//		NavigationPO nav = loginPO.expectNavigationPO();
//		ProfilePo profile = nav.navigateToProfile();
//		assertThat( profile.getProfileUsername() ).isEqualTo( username );
//		//		//TODO: update for new profile menu and layout
//		nav.logout();
//	}
//
//	@DataProvider( name = "userRoles" )
//	private Object[][] userRoles() {
//		return new Object[][]{
//			{ UserData.CCA_ADMIN.getUsername(), UserData.CCA_ADMIN.getPassword(), new ArrayList<>( Arrays.asList( "Basic CCA User", "System Administrator" ) ) },
//			{ UserData.AGENT1.getUsername(), UserData.AGENT1.getPassword(), new ArrayList<>( Arrays.asList( "JAX-CSR", "Basic CCA User" ) ) },
//			};
//	}
//
}
