package com.incomm.cca.qa.integration;

import com.incomm.aqat.listener.TestListener;
import com.incomm.cca.qa.CcaTest;
import com.incomm.cca.qa.module.I3Module;
import com.incomm.cca.qa.module.IvrModule;
import org.openqa.selenium.support.events.EventFiringWebDriver;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.TestPropertySource;
import org.testng.ITestContext;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Listeners;

/**
 * User: mgalloway
 * Date: 10/16/13
 * Time: 10:46 AM
 */
@Listeners({TestListener.class})
@TestPropertySource("classpath:config-${app.env:local}.properties")
public class BaseIT extends CcaTest {

    // modules
    @Autowired
    protected I3Module i3Module;
    @Autowired
    protected IvrModule ivrModule;
    // Utilities
    protected EventFiringWebDriver driver;
    protected WebDriverWait wait;

    public BaseIT() {
        super();
    }

    @BeforeClass(groups = {"baseIT"})
    public void setup(ITestContext testContext) throws Exception {
        super.initDriver(testContext);
    }

    @BeforeMethod(groups = {"baseIT"})
    @AfterMethod(groups = {"baseIT"})
    public void clearData() {
    }

}