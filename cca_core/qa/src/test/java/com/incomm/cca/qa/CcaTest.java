package com.incomm.cca.qa;

import com.incomm.aqat.AqatFramework;
import com.incomm.aqat.configuration.AqatFrameworkConfig;
import com.incomm.aqat.constants.BrowserType;
import com.incomm.aqat.constants.DriverType;
import com.incomm.aqat.driver.AqatDriver;
import com.incomm.cca.qa.configuration.Constants;
import org.openqa.selenium.Platform;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.testng.AbstractTestNGSpringContextTests;
import org.testng.ITestContext;

import java.util.TimeZone;

public abstract class CcaTest extends AbstractTestNGSpringContextTests {
	
	@Autowired
	protected Constants constants;
	protected AqatDriver driver;
	protected WebDriverWait wait;
	
	public CcaTest() {
		TimeZone.setDefault( TimeZone.getTimeZone( "America/New_York" ) );
	}
	
	public void initDriver( ITestContext testContext ) {
		this.driver = AqatFramework.buildDriver( buildAqatConfig( testContext ) );
		this.wait = this.driver.getWebDriverWait();
	}
	
	/**
	 * Any special configuration of the AQAT framework should happen here.
	 */
	public AqatFrameworkConfig buildAqatConfig( ITestContext testContext ) {
		testContext.setAttribute( "appVersion", constants.APP_VERSION );
		testContext.setAttribute( "bambooBuildNumber", constants.BUILD_NUMBER );
		
		AqatFrameworkConfig config = new AqatFrameworkConfig( testContext );
		config.setDriverType( constants.driverType );
		config.setDefaultExplicitWait( constants.defaultExplicitWait );
		config.setDefaultExplicitWaitTimeUnit( constants.defaultExplicitWaitTimeUnit );
		config.setDefaultImplicitWait( constants.defaultImplicitWait );
		config.setDefaultImplicitWaitTimeUnit( constants.defaultImplicitWaitTimeUnit );
		
		//If local, set to Chrome on Windows, else, let AQAT load from testContext
		if( config.getDriverType() == DriverType.LOCAL ) {
			config.setBrowser( BrowserType.CHROME );
			config.setPlatform( Platform.WINDOWS );
		}
		
		return config;
	}
	

}
