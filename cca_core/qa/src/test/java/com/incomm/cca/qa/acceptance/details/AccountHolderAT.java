package com.incomm.cca.qa.acceptance.details;

import com.incomm.cca.qa.functional.BaseFT;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

import java.util.ArrayList;
import java.util.List;

/**
 * Search Acceptance Tests
 * User: mgalloway
 * Date: 7/25/13
 * Time: 9:30 AM
 */
public class AccountHolderAT extends BaseFT {

    @Test(groups = {"version-4.7.0", "acceptance", "smoke"}, dataProvider = "viewAccountHolder", enabled = false)
    public void vmsAccountHolders(String description, String searchID, String searchValue, List<String> expCardHolderValues, boolean shouldReturnResult) throws Exception {
        //        List<String> actCardHolderValues = new ArrayList<String>();
        //        nav.signin();
        //        nav.navigateToSearch();
        //        searchUtils.searchByFormElementHandler(constants.QS_SEARCHGROUP_GPR,searchID, searchValue, null, true);
        //        webDriverUtil.waitWhileExists("card.txnSpinner");
        //        session.closeSessionDrawer();
        //        webDriverUtil.formElementHandler("customer-detail-nav-tab-cardholder", "Select", null);
        //        try {
        //            actCardHolderValues = webDriverUtil.getTextByList("prod.vmsAccountHolderList", 0);
        //        } catch (Exception e) {
        //            e.printStackTrace();
        //        }
        //        boolean matchValues=adminUtils.compareLists(expCardHolderValues,actCardHolderValues,"accountHolderValues",false);
        //        assertThat("Expected Account Holder Values to Match Actual Account Holder Values found.", matchValues, is(true));
    }

    @DataProvider(name = "viewAccountHolder")
    public Object[][] viewAccountHolder() {
        return new Object[][]{
                {"Validate Account Holder Information", "PAN", "4420620100044386", getAccountHolderValues(), true},

        };
    }

    private List<String> getAccountHolderValues() {
        List<String> accountHolderValues = new ArrayList<String>();
        accountHolderValues.add("1400000074725");
        accountHolderValues.add("Charles");
        accountHolderValues.add("King");
        accountHolderValues.add("02/11/1974");
        accountHolderValues.add("*****7777");
        accountHolderValues.add("Kim");
        accountHolderValues.add("04/06/2016");
        accountHolderValues.add("04/18/2016");
        accountHolderValues.add("Website");
        accountHolderValues.add("SUCCESS");
        accountHolderValues.add("5036381960");
        accountHolderValues.add("5036381960");
        accountHolderValues.add("test@gmail.com");
        accountHolderValues.add("61 High Mountain Ave\nNo 2\nDenver CO 87124\nUS");
        accountHolderValues.add("61 High Mountain Ave\nNo 2\nDenver CO 87124\nUS");
        accountHolderValues.add("0");
        accountHolderValues.add("102357812");

        return accountHolderValues;
    }

    @Test(groups = {"version-4.7.0", "acceptance", "smoke"}, dataProvider = "viewAccountLimits", enabled = false)
    public void vmsAccountLimits(String description, String searchID, String searchValue, List<String> expCardLimitsValues, boolean shouldReturnResult) {
        //        List<String> actCardLimitsValues = new ArrayList<>();
        //        nav.signin();
        //        nav.navigateToSearch();
        //        searchUtils.searchByFormElementHandler(constants.QS_SEARCHGROUP_GPR,searchID, searchValue, null, true);
        //       session.closeSessionDrawer();
        //        webDriverUtil.formElementHandler("customer-detail-nav-tab-limits", "Select",null);
        //        try {
        //            actCardLimitsValues=webDriverUtil.getTextByList("prod.vmsAccountLimitsRows",0);
        //        } catch (Exception e) {
        //            e.printStackTrace();
        //        }
        //        assertThat("Expected Limits to Match Actual Limits found.", adminUtils.compareLists(expCardLimitsValues, actCardLimitsValues,"accountLimits",false), is(true));
    }

    @DataProvider(name = "viewAccountLimits")
    public Object[][] viewAccountLimits() {
        return new Object[][]{
                {"Validate Account Limits Information", "serialNumber", "7562433801", getAccountLimits(), true},

        };
    }

    private List<String> getAccountLimits() {
        List<String> accountLimits = new ArrayList<String>();
        accountLimits.add("POS - Transaction Limit - CHECK CARD LOAD - Domestic-PIN-MCC(NA) $0.00 $250.00 $0.00 $0.00");
        accountLimits.add("POS - Transaction Limit - CHECK CARD LOAD - International-Signature-MCC(NA) $0.00 $250.00 $0.00 $0.00");
        accountLimits.add("POS - Transaction Limit - CHECK CARD LOAD - Domestic-Signature-MCC(NA) $0.00 $250.00 $0.00 $0.00");

        return accountLimits;
    }

    @Test(groups = {"version-4.0.0", "acceptance", "smoke"}, dataProvider = "viewAlerts", enabled = false)
    public void vmsAlerts(String description, String searchID, String searchValue, List<String> expCardLimitsValues, boolean shouldReturnResult) {
        //        List<String> actCardLimitsValues = new ArrayList<>();
        //        nav.signin();
        //        nav.navigateToSearch();
        //        searchUtils.searchByFormElementHandler(constants.QS_SEARCHGROUP_GPR, searchID, searchValue, null, true);
        //        session.closeSessionDrawer();
        //        webDriverUtil.formElementHandler("customer-detail-nav-tab-cardholder", "Select",null);
        //        try {
        //            actCardLimitsValues=webDriverUtil.getTextByList("prod.vmsAlertsRows",0);
        //        } catch (Exception e) {
        //            e.printStackTrace();
        //        }
        //        assertThat("Expected Alerts to Match Actual Alerts found.",  adminUtils.compareLists(expCardLimitsValues, actCardLimitsValues,"vmsAlerts",false), is(true));

    }

    @DataProvider(name = "viewAlerts")
    public Object[][] viewAlerts() {
        return new Object[][]{
                {"Validate Alerts Displayed", "PAN", "4420620100040202", getvmsAlerts(), true},

        };
    }

    private List<String> getvmsAlerts() {
        List<String> vmsAlerts = new ArrayList<String>();
        vmsAlerts.add("Load/Credit Alert Whenever the available balance increases, the customer will receive an alert message\nOFF");
        vmsAlerts.add("Low Balance Alert If the available balance is less than or equal to Low Balance Amount, the customer will receive an alert message $15.00\nBOTH");
        vmsAlerts.add("Negative Balance Alert Once the balance goes negative, the system will send alerts whenever the customer performs any transaction and the available balance is less than zero\nOFF");
        vmsAlerts.add("Daily Balance Alert This alert provides the daily balance to the customer\nOFF");
        vmsAlerts.add("Incorrect PIN Alert This alert is sent every time an invalid PIN is entered\nOFF");
        vmsAlerts.add("High Authorization Alert This alert is sent when the authorization amount of a transaction exceeds the customer-provided limit $100.00\nBOTH");
        vmsAlerts.add("Insufficient Fund Alert This alert will be sent when the available balance is insufficient for a transaction\nOFF");

        return vmsAlerts;
    }

    @Test(groups = {"version-4.0.0", "acceptance", "smoke"}, dataProvider = "viewFees", enabled = false)
    public void vmsFees(String description, String searchID, String searchValue, List<String> expCardLimitsValues, boolean shouldReturnResult) throws Exception {
        //        List<String> actCardLimitsValues = new ArrayList<>();
        //        nav.signin();
        //        nav.navigateToSearch();
        //        searchUtils.searchByFormElementHandler(constants.QS_SEARCHGROUP_GPR, searchID, searchValue, null, true);
        //        webDriverUtil.waitWhileExists("card.txnSpinner");
        //        session.closeSessionDrawer();
        //        webDriverUtil.waitAndClick("prod.vmsFeesTab");
        //        try {
        //            actCardLimitsValues = webDriverUtil.getTextByList("prod.vmsFeeRows", 0);
        //        } catch (Exception e) {
        //            e.printStackTrace();
        //        }
        //       assertThat("Expected Fees to Match Actual Fees found.",  adminUtils.compareLists(expCardLimitsValues, actCardLimitsValues,"vmsFees",true), is(true));
    }

    @DataProvider(name = "viewFees")
    public Object[][] viewFees() {
        return new Object[][]{
                {"Validate Fees Displayed", "serialNumber", "7562433801", getvmsFees(), true},

        };
    }

    private List<String> getvmsFees() {
        List<String> vmsFees = new ArrayList<String>();
        vmsFees.add("PAPER STATEMENT FEE $4.95 $0.00 No");
        vmsFees.add("ATM WITHDRAWAL FEE $1.95 $0.00 No");
        vmsFees.add("INTERNATIONAL ATM CASH WDL FEE $4.95 $0.00 No");
        vmsFees.add("SIGNATURE PURCHASE TXN FEE $1.50 $0.00 No");
        vmsFees.add("PIN DEBIT PURCHASE TXN FEE $1.25 $0.00 No");
        vmsFees.add("CARD TO CARD TRANSFER FEE CSR $4.95 $0.00 No");
        vmsFees.add("REPLACEMENT CARD FEE $6.00 $0.00 No");
        vmsFees.add("CHW CTC TRAN FEE $2.50 $0.00 No");
        vmsFees.add("EXPEDITED CARD FEE $16.00 $0.00 No");
        vmsFees.add("IVR C T C FEE $2.00 $0.00 No");
        vmsFees.add("DORMANCY FEE $3.95 $0.00 No");
        vmsFees.add("OTC CASH WITHDRAWAL FEE $1.95 $0.00 No");
        vmsFees.add("OTC CASH WITHDRAWAL FEE $1.95 $0.00 No");
        vmsFees.add("ATM BALANCE INQUIRY $1.00 $0.00 No");
        vmsFees.add("ATM BALANCE INQUIRY $1.00 $0.00 No");
        vmsFees.add("INTERNATIONAL TRANSACTION FEE $0.50 $0.51 No");
        vmsFees.add("INTERNATIONAL TRANSACTION FEE $0.50 $0.51 No");
        vmsFees.add("PREAUTH COMPLETION FEE $0.50 $0.00 No");
        vmsFees.add("PREAUTH COMPLETION FEE $0.50 $0.00 No");
        vmsFees.add("PREAUTH COMPLETION FEE $0.50 $0.51 No");
        vmsFees.add("PREAUTH COMPLETION FEE $0.50 $0.51 No");
        vmsFees.add("FSS POS RETURN FEE $3.78 $0.00 No");
        vmsFees.add("FSS POS RETURN FEE $3.78 $0.00 No");
        vmsFees.add("FSS POS RETURN FEE $3.78 $0.00 No");
        vmsFees.add("FSS POS RETURN FEE $3.78 $0.00 No");
        vmsFees.add("INTERNATIONAL TRANSACTION FEE $0.50 $0.51 No");
        vmsFees.add("INTERNATIONAL TRANSACTION FEE $0.50 $0.51 No");
        vmsFees.add("ATM WITHDRAWAL DECLINE FEE $0.75 $0.00 No");
        vmsFees.add("ATM WITHDRAWAL DECLINE FEE $0.75 $0.00 No");

        return vmsFees;
    }
}
