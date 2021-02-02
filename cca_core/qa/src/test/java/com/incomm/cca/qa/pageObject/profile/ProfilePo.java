package com.incomm.cca.qa.pageObject.profile;

import com.incomm.aqat.driver.AqatDriver;
import com.incomm.cca.qa.pageObject.BasePo;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;

import java.util.ArrayList;
import java.util.List;

import static com.incomm.aqat.util.AqatWait.waitForPageLoad;

/**
 * Created by Matt on 7/26/2016.
 */
public class ProfilePo extends BasePo {

    public static final String PROFILE_OPTION_ROLES_ID = "option-roles";
    public static final String PROFILE_OPTION_GROUPS_ID = "option-groups";
    public static final String PROFILE_OPTION_PERMISSIONS_ID = "option-permissions";
    public static final String PROFILE_OPTION_INFO_ID = "option-info";
    public static final String PROFILE_OPTION_PREFERENCES_ID = "option-preferences";
    public static final String PROFILE_INFO_USERNAME_ID = "profile-info-username";
    @FindBy(id = "profile-panel")
    public WebElement profilePanel;
    @FindBy(id = PROFILE_OPTION_ROLES_ID)
    public WebElement profileRoles;
    @FindBy(id = PROFILE_OPTION_GROUPS_ID)
    public WebElement profileGroups;
    @FindBy(id = PROFILE_OPTION_PERMISSIONS_ID)
    public WebElement profilePermissions;
    @FindBy(id = PROFILE_OPTION_INFO_ID)
    public WebElement profileInfo;
    @FindBy(id = PROFILE_OPTION_PREFERENCES_ID)
    public WebElement profilePreferences;
    @FindBy(id = PROFILE_INFO_USERNAME_ID)
    public WebElement profileInfoUsername;
    // FIXME: 3/18/2019 Need a better identifier for profile-panel-header
    //WEB ELEMENTS
    @FindBy(tagName = "cca-profile")
    private WebElement profileContainer;
    @FindBy(id = "preferences-panel")
    private WebElement preferencesPanel;

    public ProfilePo(AqatDriver driver) {
        super(driver);
        waitForPageLoad(driver);
        PageFactory.initElements(driver, this);
    }

    public Boolean isDisplayed() {

        return profileContainer.isDisplayed();

    }

    public Boolean isProfileOptionDisplayed(WebElement option) {

        driver.getWebDriverWait()
              .until(ExpectedConditions.visibilityOf(option));
        return option.isDisplayed();

    }

    public String getProfileUsername() {

        driver.getWebDriverWait()
              .until(ExpectedConditions.visibilityOf(profileInfoUsername));
        return profileInfoUsername.getText();

    }

    public Boolean clickProfileOption(String option) {

        driver.getWebDriverWait()
              .until(ExpectedConditions.visibilityOf(profilePanel));
        switch (option) {
            case "roles":
                driver.getWebDriverWait()
                      .until(ExpectedConditions.elementToBeClickable(By.id(PROFILE_OPTION_ROLES_ID)));
                profileRoles.click();
                return this.isProfileOptionDisplayed(profileRoles);
            case "groups":
                driver.getWebDriverWait()
                      .until(ExpectedConditions.elementToBeClickable(By.id(PROFILE_OPTION_GROUPS_ID)));
                profileGroups.click();
                return this.isProfileOptionDisplayed(profileGroups);
            case "info":
                driver.getWebDriverWait()
                      .until(ExpectedConditions.elementToBeClickable(By.id(PROFILE_OPTION_INFO_ID)));
                profileInfo.click();
                return this.isProfileOptionDisplayed(profileInfo);
            case "permissions":
                driver.getWebDriverWait()
                      .until(ExpectedConditions.elementToBeClickable(By.id(PROFILE_OPTION_PERMISSIONS_ID)));
                profilePermissions.click();
                return this.isProfileOptionDisplayed(profilePermissions);
            case "preferences":
                driver.getWebDriverWait()
                      .until(ExpectedConditions.elementToBeClickable(By.id(PROFILE_OPTION_PREFERENCES_ID)));
                profilePreferences.click();
                return this.isProfileOptionDisplayed(profilePreferences);
            default:
                return false;
        }

    }

    public List<String> getProfileRoles() {

        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.className(PROFILE_OPTION_ROLES_ID)));

        List<WebElement> roleElements = profileRoles.findElements(By.xpath("li"));
        List<String> roles = new ArrayList<>();
        for (WebElement e : roleElements) {
            roles.add(e.getText());
        }
        return roles;

    }

}
