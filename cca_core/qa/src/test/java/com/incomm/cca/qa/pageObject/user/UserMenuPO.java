package com.incomm.cca.qa.pageObject.user;

import com.incomm.aqat.driver.AqatDriver;
import com.incomm.cca.qa.pageObject.BasePo;
import com.incomm.cca.qa.pageObject.LoginPO;
import org.openqa.selenium.By;
import org.openqa.selenium.ElementClickInterceptedException;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;

import static com.incomm.aqat.util.AqatWait.waitForPageLoad;

public class UserMenuPO extends BasePo {
	
	public static final By SIGN_OUT_BUTTON = By.cssSelector( "button#sign-out-button.mat-menu-item" );
	public static final By FEEDBACK_BUTTON = By.cssSelector( "button#feedback-button.mat-menu-item" );
	public static final By USER_MENU_PANEL = By.cssSelector( "div.user-menu div.mat-menu-content" );
	public static final By USER_MENU_BUTTON = By.cssSelector( "button#user-menu-button.user-menu-button.mat-mini-fab.mat-accent" );
	
	public UserMenuPO( final AqatDriver driver ) {
		super( driver );
		waitForPageLoad( driver );
		PageFactory.initElements( driver, this );
	}

	public WebElement getUserSignOutButton() {
		return driver.findElement(SIGN_OUT_BUTTON);
	}

    public Boolean isDisplayed() {
		return driver.findElement( USER_MENU_PANEL )
		             .isDisplayed();
	}
	
	/*
	 * FeedBackButton
	 * ***************************************************************
	 */
	
	private WebElement getFeedBackButtonElement() {
		return driver.findElement( FEEDBACK_BUTTON );
	}
	
	public void clickFeedBackButton() {
		try {
			getFeedBackButtonElement().click();
		}
		catch( ElementClickInterceptedException e ) {
			clickOverlayContainer();
			getUserMenuButton()
				.click();
			getFeedBackButtonElement().click();
		}
		
	}
	

	/*
	 * SignOutButton
	 * ***************************************************************
	 */
	
	public LoginPO clickSignOutButton() {
			driver.getWebDriverWait().until( ExpectedConditions.elementToBeClickable( SIGN_OUT_BUTTON ) );
			getSignOutButton()
				.click();
		
		return new LoginPO( driver );
	}
	
	private WebElement getUserMenuButton() {
		return driver.findElement( USER_MENU_BUTTON );
	}
	
	private WebElement getSignOutButton() {
		return driver.findElement( SIGN_OUT_BUTTON );
	}
	
	
}
