package com.incomm.cca.qa.acceptance.services;

import com.incomm.cca.qa.functional.BaseFT;

/**
 * Acceptance Test Class for the Bulk Product Export section of Services
 * <p>
 * User: Darren Carpenter (dcarpenter)
 * Date: 12/8/2017
 */
public class BulkProductExportAT extends BaseFT {

    //todo: Features will be modified for 7.0. These tests use fields and PageObjects that have been commented out.
    // We want to keep the tests as place holders for future functionality.
//	@Test( groups = { "version-6.6.0", "acceptance", "services" }, enabled = true )
//	public void verifyBulkProductExport() {
//
//		login.defaultLogin();
//		nav.navigateToServices();
//		services.bulkProductExport.click();
//
//		assertThat( bulkProductExport.isBulkProductExportDisplayed() ).isTrue();
//
//	}
//
//	@Test( groups = { "version-6.6.0", "acceptance", "services" }, enabled = false )
//	public void verifyExportProduct() throws Exception{
//
//		login.defaultLogin();
//		nav.navigateToServices();
//		services.bulkProductExport.click();
//
//		bulkProductExport.getCardInput().selectOptionByText( "Card ID List" );
//		bulkProductExport.getCardIdList().setValue( "2159758245,5284513708" );
//		bulkProductExport.getPlatform().selectOptionByText( "GreenCard" );
//		bulkProductExport.btnSubmit.click(); //SUBMIT button
//		bulkProductExport.btnSubmit.click(); //YES button
//
//		// Test if Successful
//		assertThat( bulkProductExport.getSuccessMessageText() ).isEqualTo( BulkProductExportPO.MESSAGE_SUCCESS_TEXT );
//
//	}

}
