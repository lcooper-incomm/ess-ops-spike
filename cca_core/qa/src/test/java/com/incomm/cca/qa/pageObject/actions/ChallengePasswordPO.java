package com.incomm.cca.qa.pageObject.actions;

import com.incomm.aqat.driver.AqatDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;

/**
 * Created by Matt on 7/26/2016.
 */
public class ChallengePasswordPO extends ActionDialogPO {

    // LOCATORS
    public static final String ACTIONS_TERMINAL_CHALLENGE_PASSWORD_KEY_XPATH = "//*[@id='terminal-key']/input"; // material
    public static final String ACTIONS_TERMINAL_CHALLENGE_PASSWORD_PASSWORD_ID = "password"; // material
    // WEB ELEMENTS
    @FindBy(xpath = ACTIONS_TERMINAL_CHALLENGE_PASSWORD_KEY_XPATH)
    WebElement actionsTerminalChallengePasswordKey;
    @FindBy(id = ACTIONS_TERMINAL_CHALLENGE_PASSWORD_PASSWORD_ID)
    WebElement actionsTerminalChallengePasswordPassword;

    public ChallengePasswordPO(AqatDriver driver) {
        super(driver);
    }

    public void setTerminalChallengePasswordKey(String key) {

        driver.getWebDriverWait()
              .until(ExpectedConditions.visibilityOf(actionsTerminalChallengePasswordKey));
        actionsTerminalChallengePasswordKey.sendKeys(key);

    }

    public String getTerminalChallengePasswordPassword() {

        driver.getWebDriverWait()
              .until(ExpectedConditions.visibilityOf(actionsTerminalChallengePasswordPassword));
        return actionsTerminalChallengePasswordPassword.getText();

    }

}
