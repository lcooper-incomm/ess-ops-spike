package com.incomm.cca.qa.pageObject.search.parameter;

import com.incomm.aqat.component.formcontrol.material2.MatTextInput;
import com.incomm.aqat.driver.AqatDriver;
import com.incomm.cca.qa.pageObject.enums.SearchParameter;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Allen on 2/3/2017.
 */
public class FinancialGiftSearchQueryPanelPo extends SearchQueryPanelPo implements SearchQueryPanel {
	
	public FinancialGiftSearchQueryPanelPo( AqatDriver driver ) {
		super(driver);
	}
	
	/*
	Constant Parameters
	 */
	public static final List< SearchParameter > PARAMETERS = new ArrayList<>( Arrays.asList(
		SearchParameter.SERIAL_NUMBER,
		SearchParameter.CARD_NUMBER,
		SearchParameter.VAN,
		SearchParameter.CAN,
		SearchParameter.TRANSACTION_ID,
		SearchParameter.PREAUTH_KEY
	) );
	
	/*
    WebElements
     */
	
	@FindBy( css = "div[qa-field-name='SERIAL_NUMBER']" )
	private WebElement serialNumber;
	
	@FindBy( css = "div[qa-field-name='PAN']" )
	private WebElement cardNumber;
	
	@FindBy( css = "div[qa-field-name='VAN']" )
	private WebElement van;
	
	public static final By CAN_FIELD = By.cssSelector( "cca-can-field input" );
	
	@FindBy( css = "div[qa-field-name='TRANSACTION_ID']" )
	private WebElement transactionId;
	
	@FindBy( css = "div[qa-field-name='PRE_AUTH_KEY']" )
	private WebElement preauthKey;

    /*
    Mat Components
     */
	
	public MatTextInput getSerialNumber() {
		return new MatTextInput( serialNumber, this.driver );
	}
	
	public MatTextInput getCardNumber() {
		return new MatTextInput( cardNumber, this.driver );
	}
	
	public MatTextInput getVan() {
		return new MatTextInput( van, this.driver );
	}
	
	public WebElement getCAN() {
		return driver.findElement( CAN_FIELD );
	}
	
	public void setCanFieldValue( String value) {
		getCAN().clear();
		getCAN().sendKeys( value );
	}
	
	public MatTextInput getTransactionId() {
		return new MatTextInput( transactionId, this.driver );
	}
	
	public MatTextInput getPreauthKey() {
		return new MatTextInput( preauthKey, this.driver );
	}

    /*
    Methods
     */
	
	public void search( String fieldName, String value ) {
		switch( fieldName ) {
			case "Serial Number":
				getSerialNumber().setValue( value );
				break;
			case "Card Number":
				getCardNumber().setValue( value );
				break;
			case "VAN":
				getVan().setValue( value );
				break;
			case "CAN":
				setCanFieldValue( value );
				break;
			case "Transaction ID":
				getTransactionId().setValue( value );
				break;
			case "PreAuth Key":
				getPreauthKey().setValue( value );
				break;
			
		}
	}
	
	@Override
	public Map< SearchParameter, String > getCurrentValues() {
		Map< SearchParameter, String > queryMap = new HashMap<>();
		queryMap.put( SearchParameter.SERIAL_NUMBER, getSerialNumber().getValue() );
		queryMap.put( SearchParameter.CARD_NUMBER, getCardNumber().getValue() );
		queryMap.put( SearchParameter.VAN, getVan().getValue() );
		queryMap.put( SearchParameter.CAN, getCAN().getText());
		queryMap.put( SearchParameter.TRANSACTION_ID, getTransactionId().getValue() );
		queryMap.put( SearchParameter.PREAUTH_KEY, getPreauthKey().getValue() );
		return queryMap;
	}
	
	
	public FinancialGiftSearchQueryPanelPo clickOnClearButton() {
		driver.findElement( CLEAR_BUTTON ).click();
		PageFactory.initElements( driver, this );
		return this;
	}
	
	@Override
	public SearchQueryPanel clickOnAdvancedToggle() {
		return null;
	}
}
