package com.incomm.cca.qa.pageObject.search.parameter;

import com.incomm.aqat.component.formcontrol.material2.MatTextInput;
import com.incomm.aqat.driver.AqatDriver;
import com.incomm.cca.qa.pageObject.enums.SearchParameter;
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
public class FastCardSearchQueryPanelPO extends SearchQueryPanelPo implements SearchQueryPanel {
	
	public FastCardSearchQueryPanelPO( AqatDriver driver ) {
		super(driver);
	}
	
	/*
	Constant Parameters
	 */
	public static final List< SearchParameter > PARAMETERS = new ArrayList<>( Arrays.asList(
		SearchParameter.SERIAL_NUMBER,
		SearchParameter.VAN,
		SearchParameter.PIN,
		SearchParameter.VENDOR_SERIAL_NUMBER,
		SearchParameter.PROXY_NUMBER,
		SearchParameter.CONTROL_NUMBER,
		SearchParameter.TRANSACTION_ID,
		SearchParameter.RECENT_ONLY
	) );
	/*
    WebElements
     */
	@FindBy( css = "div[qa-field-name='SERIAL_NUMBER']" )
	private WebElement serialNumber;
	
	@FindBy( css = "div[qa-field-name='VAN']" )
	private WebElement van;
	
	@FindBy( css = "div[qa-field-name='PIN']" )
	private WebElement pin;
	
	@FindBy( css = "div[qa-field-name='VENDOR_SERIAL_NUMBER']" )
	private WebElement vendorSerialNumber;
	
	@FindBy( css = "div[qa-field-name='PROXY_NUMBER']" )
	private WebElement proxyNumber;
	
	@FindBy( css = "div[qa-field-name='CONTROL_NUMBER']" )
	private WebElement controlNumber;
	
	@FindBy( css = "div[qa-field-name='TRANSACTION_ID']" )
	private WebElement transactionId;
	
	@FindBy( css = "input#search-recent-activity-only-input" )
	private WebElement recentActivityOnlyCheckBox;

	/*
	Methods
	 */
	
	public MatTextInput getSerialNumber() {
		return new MatTextInput( serialNumber, this.driver );
	}
	
	public MatTextInput getVan() {
		return new MatTextInput( van, this.driver );
	}
	
	public MatTextInput getPin() {
		return new MatTextInput( pin, this.driver );
	}
	
	public MatTextInput getVendorSerialNumber() {
		return new MatTextInput( vendorSerialNumber, this.driver );
	}
	
	public MatTextInput getProxyNumber() {
		return new MatTextInput( proxyNumber, this.driver );
	}
	
	public MatTextInput getControlNumber() {
		return new MatTextInput( controlNumber, this.driver );
	}
	
	public MatTextInput getTransactionId() {
		return new MatTextInput( transactionId, this.driver );
	}
	
	public FastCardSearchQueryPanelPO clickOnClearButton() {
		driver.findElement( CLEAR_BUTTON ).click();
		PageFactory.initElements( driver, this );
		return this;
	}
	
	public WebElement getRecentActivityOnlyCheckBox() {
		return recentActivityOnlyCheckBox;
	}
	
	@Override
	public Map< SearchParameter, String > getCurrentValues() {
		Map< SearchParameter, String > queryMap = new HashMap<>();
		queryMap.put( SearchParameter.SERIAL_NUMBER, getSerialNumber().getValue() );
		queryMap.put( SearchParameter.VAN, getVan().getValue() );
		queryMap.put( SearchParameter.PIN, getPin().getValue() );
		queryMap.put( SearchParameter.VENDOR_SERIAL_NUMBER, getVendorSerialNumber().getValue() );
		queryMap.put( SearchParameter.PROXY_NUMBER, getProxyNumber().getValue() );
		queryMap.put( SearchParameter.CONTROL_NUMBER, getControlNumber().getValue() );
		queryMap.put( SearchParameter.TRANSACTION_ID, getTransactionId().getValue() );
		queryMap.put( SearchParameter.RECENT_ONLY, getRecentActivityOnlyCheckBox().getAttribute( "aria-checked" ) );
		return queryMap;
	}
	
	
	@Override
	public SearchQueryPanel clickOnAdvancedToggle() {
		return null;
	}
}
