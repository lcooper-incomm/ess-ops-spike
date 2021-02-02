package com.incomm.cca.qa.pageObject;

import com.incomm.aqat.driver.AqatDriver;
import com.incomm.cca.qa.dataProvider.common.UserData;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;

import static com.incomm.aqat.util.AqatWait.waitForPageLoad;

public class LoginPO extends BasePo {

    public static final String MESSAGE_LOGIN_FAILURE = "Please check your username and password.";
    public static final By SIGN_IN_USERNAME = By.cssSelector("#login-username input");
    public static final By SIGN_IN_PASSWORD = By.cssSelector("#login-password input");
    public static final By BUTTON_SIGN_IN = By.cssSelector("button#login-button");
    public static final By SIGN_IN_CONTAINER = By.cssSelector("cca-login div.login-container");
    public static final By ALERT_CONTAINER = By.cssSelector("#login-error-panel");
    public static final By LOGIN_CONTAINER = By.id("#login-container");

    public LoginPO(AqatDriver driver) {
        super(driver);
        waitForPageLoad(driver);
        PageFactory.initElements(driver, this);
    }

    /**
     * Returns whether the login is displayed, after waiting
     */
    public boolean isDisplayed() {
        return driver.findElement(LOGIN_CONTAINER).isDisplayed();
    }

    public WebElement getAlertContainer() {
        return driver.findElement(ALERT_CONTAINER);
    }

    public String getAlertText() {
        return getAlertContainer().getText();
    }

    /**
     * Signs in as default cca_admin user
     */
    public NavigationPO defaultSignIn() {
        signInWithUsernameAndPassword(UserData.CCA_ADMIN.getUsername(), UserData.CCA_ADMIN.getPassword());
        return expectNavigationPO();
    }

    public NavigationPO expectNavigationPO() {
        NavigationPO navigation = new NavigationPO(driver);
        waitForTransitionOverlayToGoAway();
        waitForPageLoad(driver);
        return navigation;
    }

    public void signInWithUsernameAndPassword(final String username, final String password) {
        driver.getWebDriverWait()
              .until(ExpectedConditions.visibilityOf(getUsernameElement()));
        setUsername(username);
        setPassword(password);
        getLoginbuttonElement().click();
        driver.getWebDriverWait()
              .until(ExpectedConditions.invisibilityOfElementLocated(By.tagName("cca-spinner")));
    }

    /*
     * Username
     * ***************************************************************
     */

    public WebElement getUsernameElement() {
        return driver.findElement(SIGN_IN_USERNAME);
    }

    public String getUsername() {
        return getUsernameElement().getAttribute("value");
    }

    public void setUsername(String value) {
        getUsernameElement().clear();
        getUsernameElement().sendKeys(value);
    }

    /*
     * Password
     * ***************************************************************
     */

    public WebElement getPasswordElement() {
        return driver.findElement(SIGN_IN_PASSWORD);
    }

    public String getPassword() {
        return getPasswordElement().getAttribute("value");
    }

    public void setPassword(String value) {
        getPasswordElement().clear();
        getPasswordElement().sendKeys(value);
    }

    /*
     * Loginbutton
     * ***************************************************************
     */

    public WebElement getLoginbuttonElement() {
        return driver.findElement(BUTTON_SIGN_IN);
    }

    /*
     * Logincontainer
     * ***************************************************************
     */

    public WebElement getLogincontainerElement() {
        return driver.findElement(SIGN_IN_CONTAINER);
    }

    public String getLogincontainer() {
        return getLogincontainerElement().getText();
    }
}
