package com.incomm.cca.qa.functional;

import com.incomm.aqat.listener.TestListener;
import com.incomm.cca.qa.CcaTest;
import org.springframework.test.context.ContextConfiguration;
import org.testng.ITestContext;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Listeners;

/**
 * User: mgalloway
 * Date: 3/20/13
 * Time: 12:46 PM
 */
@Listeners({TestListener.class})
@ContextConfiguration("classpath:spring-context.xml")
public class BaseFT extends CcaTest {

    public BaseFT() {
        super();
    }

    @BeforeMethod(groups = {"base"}, alwaysRun = true)
    public void setUp(ITestContext testContext) throws Exception {
        super.initDriver(testContext);
        this.driver.get(constants.APP_URL);
    }

    @AfterMethod(groups = {"base"}, alwaysRun = true)
    public void tearDown() {
        this.driver.quit();
    }

}
