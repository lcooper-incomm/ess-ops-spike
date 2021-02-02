package com.incomm.cca.qa.pageObject.dock;

import com.incomm.aqat.driver.AqatDriver;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;

/**
 * Created by Allen on 1/30/2017.
 */
public class DockWorkspaceTabPO extends DockPo {

    /*
    Locators
     */
    public static final String TAB_ID = "workspace-content";
    public static final String ACTIVE_SESSION_WORKSPACE_CARD_CONTAINER_ID = "active-session-workspace-card-container";
    public static final String ACTIVE_SESSION_WORKSPACE_CARD_ID = "active-session-workspace-card";
    public static final String WORKSPACE_CARD_CONTAINER_ID = "workspace-card-container";
    public static final String WORKSPACE_CARD_CLASS = "workspace-card";
    public static final String WORKSPACE_FILTER_ID = "workspace-filter";
    public static final String WORKSPACE_SPINNER_XPATH = "//*[contains(@class, 'spinner-active-sessions')]";
    /*
    WebElements
     */
    @FindBy(id = TAB_ID)
    public WebElement workspaceTab;
    @FindBy(id = ACTIVE_SESSION_WORKSPACE_CARD_CONTAINER_ID)
    public WebElement activeSessionWorkspaceCardContainer;
    @FindBy(id = ACTIVE_SESSION_WORKSPACE_CARD_ID)
    public WebElement activeSessionWorkspaceCard;
    @FindBy(id = WORKSPACE_CARD_CONTAINER_ID)
    public WebElement workspaceCardContainer;
    @FindBy(id = WORKSPACE_FILTER_ID)
    public WebElement workspaceFilter;
    @FindBy(xpath = WORKSPACE_SPINNER_XPATH)
    public WebElement workspaceSpinner;

    public DockWorkspaceTabPO(AqatDriver driver) {
        super(driver);
    }

    /*
    Methods
     */

    public boolean isDisplayed() {
        driver.getWebDriverWait()
              .until(ExpectedConditions.visibilityOf(workspaceTab));
        return workspaceTab.isDisplayed();
    }

    public boolean isActiveSessionCardDisplayed() {
        return activeSessionWorkspaceCard.isDisplayed();
    }

    public void clearFilter() {
        workspaceFilter.clear();
    }

    public void filterByText(String text) {
        workspaceFilter.sendKeys(text);
    }

    public int getWorkspaceCardCount() {
        return workspaceCardContainer.findElements(By.className(WORKSPACE_CARD_CLASS))
                                     .size();
    }

    public WorkspaceCard findWorkspaceCardBySessionId(String sessionId) {
        WebElement root = workspaceCardContainer.findElement(By.id("session-" + sessionId));
        return new WorkspaceCard(sessionId, root);
    }

    public class WorkspaceCard {

        private static final String ROOT_CARD_ID = "session-%s";
        private static final String SESSION_ID_FIELD_CLASS = "workspace-card-session-id";
        private static final String PRODUCTS_ICON_CLASS = "workspace-card-products-icon-container";
        private static final String LOCATIONS_ICON_CLASS = "workspace-card-locations-icon-container";
        private static final String CUSTOMERS_ICON_CLASS = "workspace-card-customers-icon-container";
        private static final String CREATED_DATE_FIELD_CLASS = "workspace-card-created-date";
        private static final String CALLER_NAME_FIELD_CLASS = "workspace-card-caller-name";
        private static final String CLOSE_BUTTON_XPATH = "//*[@id='%s']//div[@class='close-session']/button";
        private String sessionId;
        private WebElement root;

        public WorkspaceCard(String sessionId) {
            this.sessionId = sessionId;
            driver.getWebDriverWait()
                  .until(ExpectedConditions.presenceOfElementLocated(By.id(formatSelector(ROOT_CARD_ID))));
            root = driver.findElement(By.id(formatSelector(ROOT_CARD_ID)));
        }

        public WorkspaceCard(String sessionId, WebElement root) {
            this.sessionId = sessionId;
            this.root = root;
        }

        private String formatSelector(String value) {
            return String.format(value, sessionId);
        }

        public String getSessionId() {
            return root.findElement(By.className(SESSION_ID_FIELD_CLASS))
                       .getText();
        }

        public String getCreatedDate() {
            return root.findElement(By.className(CREATED_DATE_FIELD_CLASS))
                       .getText();
        }

        public boolean isCallerNameDisplayed() {
            return isElementDisplayedNow(By.className(CALLER_NAME_FIELD_CLASS));
        }

        public String getCallerName() {
            if (isCallerNameDisplayed()) {
                return root.findElement(By.className(CALLER_NAME_FIELD_CLASS))
                           .getText();
            } else {
                return null;
            }
        }

        public boolean isProductsIconDisplayed() {
            return root.findElement(By.className(PRODUCTS_ICON_CLASS))
                       .isDisplayed();
        }

        public boolean isLocationsIconDisplayed() {
            return root.findElement(By.className(LOCATIONS_ICON_CLASS))
                       .isDisplayed();
        }

        public boolean isCustomersIconDisplayed() {
            return root.findElement(By.className(CUSTOMERS_ICON_CLASS))
                       .isDisplayed();
        }

        public boolean isCloseButtonEnabled() {
            return root.findElement(By.xpath(CLOSE_BUTTON_XPATH))
                       .isEnabled();
        }

        public void clickCloseButton() {
            if (isCloseButtonEnabled()) {
                root.findElement(By.xpath(CLOSE_BUTTON_XPATH))
                    .click();
            }
        }

        public void click() {
            root.click();
            waitForTransitionOverlayToGoAway();
        }
    }
}
