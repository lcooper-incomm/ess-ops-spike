package com.incomm.cca.qa.acceptance.actions.customer;

import com.incomm.cca.qa.functional.BaseFT;
import com.incomm.cca.qa.pageObject.LoginPO;
import com.incomm.cca.qa.pageObject.NavigationPO;
import com.incomm.cca.qa.pageObject.actions.ActionToolbarPO;
import com.incomm.cca.qa.pageObject.actions.SendFormsPo;
import com.incomm.cca.qa.pageObject.enums.SearchType;
import com.incomm.cca.qa.pageObject.search.CustomerVerificationPo;
import com.incomm.cca.qa.pageObject.search.SearchPo;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Acceptance Test Class for the VMS Send Forms Actions
 * <p>
 * User: Darren Carpenter (dcarpenter)
 * Date: 5/31/2016
 */
public class VMSSendFormsAT extends BaseFT {

    @Test(groups = {"version-4.9.0", "acceptance", "details"}, dataProvider = "sendDirectDepositData", enabled = true)
    public void vmsSendDirectDepositForm(String searchValue, boolean isFax, String faxNumber) throws Exception {
        LoginPO login = new LoginPO(driver);
        login.defaultSignIn();
        NavigationPO nav = new NavigationPO(driver);
        nav.navigateToSearch();
        SearchPo search = new SearchPo(driver);
        search.selectSearchType(SearchType.VMS_GPR);
        search.getGprSearchParameters()
              .getCardNumber()
              .setValue(searchValue);
        search.clickSearchAndExpectVerifyCustomerDialog();
        CustomerVerificationPo customerVerification = new CustomerVerificationPo(driver);

        customerVerification.verifyCustomer();

        //Click the "Send Forms" action button
        ActionToolbarPO actionToolbar = new ActionToolbarPO(driver);
        actionToolbar.clickActionButton(ActionToolbarPO.ActionKey.VMS_SEND_FORM);

        // Choose the "Direct Deposit" Form
        SendFormsPo sendForms = new SendFormsPo(driver);
        sendForms.getSelectFormTypeField()
                 .selectOptionByText("Direct Deposit");

        if (isFax) {
            sendForms.getSelectDeliveryMethodField()
                     .selectOptionByText("Fax");
            sendForms.getFaxField()
                     .setValue(faxNumber);
        } else {
            sendForms.getSelectDeliveryMethodField()
                     .selectOptionByText("Email");
        }

        sendForms.clickNext();
        sendForms.clickNext();

        // Test if Successful
        assertThat(sendForms.getSuccessMessageText()).isEqualTo(SendFormsPo.MESSAGE_SUCCESS_TEXT);
    }

    @DataProvider(name = "sendDirectDepositData")
    public Object[][] sendDirectDepositData() {
        return new Object[][]{
                //Search Value(VMS_GPR Card Number must be ACTIVE status), isFax, Fax Number
                {"4798660000009299", true, "8013334444"},
                {"4798660000009299", false, ""}
        };
    }

    @Test(groups = {"version-4.10.0", "acceptance", "details"}, dataProvider = "sendAccountStatementData", enabled = false)
    public void vmsSendAccountStatement(String description, String searchID, String searchValue, boolean isFax, String faxNumber, boolean waiveFee) {
        //        double stmtFee = 4.95;
        //        nav.signin();
        //        searchUtils.searchByFormElementHandler(constants.QS_SEARCHGROUP_GPR, searchID, searchValue, null, true);
        //        session.closeSessionDrawer();
        //
        //        String availableBalance = webDriverUtil.getText("card.vmsAvailableBalances");
        //        double numAvailableBalance = Double.parseDouble(availableBalance.replace("$", ""));
        //
        //        webDriverUtil.formElementHandler("customer-detail-nav-tab-cardholder", "Select", null); // Account Holder tab
        //        webDriverUtil.formElementHandler("VMS_SEND_FORM", "Select", null); // Send Forms button
        //        webDriverUtil.formElementHandler("vms-send-form-type", "Account Statement", null); // Send Forms Form Type
        //
        //        if (waiveFee) {
        //            webDriverUtil.waitAndClick("vms.sendForms.acctStmt.waiveFee");
        //        }
        //
        //        if (isFax){
        //            webDriverUtil.formElementHandler("deliveryMethod", "Fax", null);
        //            webDriverUtil.formElementHandler("fax-number", faxNumber, null);
        //        }
        //        else {
        //            webDriverUtil.formElementHandler("deliveryMethod", "Mail", null);
        //        }
        //
        //        webDriverUtil.formElementHandler("action-modal-next", "Select", null); // Submit Button
        //        webDriverUtil.formElementHandler("action-modal-submit", "Select", null); // Yes Button
        //        String message = cardUtils.getAlertMessage(30);
        //        assertThat(description, message, containsString("Success"));
        // TODO: Still need to compare if available balance goes down when fee is charged. Waiting for Paul to fix the fee charging problem
    }

    @DataProvider(name = "sendAccountStatementData")
    public Object[][] sendAccountStatementData() {
        return new Object[][]{
                // Description, Search ID, Search Value, isFax, Fax Number, waiveFee
                {"VMS Send Account Statement - FAX", "PAN", "4420620100030013", true, "801-333-4444", true},
                {"VMS Send Account Statement - MAIL", "PAN", "4420620100030013", false, "", false}
        };
    }
}
