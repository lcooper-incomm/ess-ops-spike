package com.incomm.cca.qa.acceptance.details;

import com.incomm.cca.qa.functional.BaseFT;
import com.incomm.cca.qa.pageObject.NavigationPO;
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
public class VMSAccountHolderAT extends BaseFT {

    final private String ASSIGNMENT_ID = null;

    @Test(groups = {"version-4.7.0", "in-progress", "smoke"}, dataProvider = "viewAccountHolder", enabled = false)
    public void vmsAccountHolders(String description, String searchID, String searchValue, List<String> expCardHolderValues, boolean shouldReturnResult) {
        List<String> actCardHolderValues = new ArrayList<>();
        //        nav.signin();
        NavigationPO nav = new NavigationPO(driver);
        nav.navigateToSearch();
        //        searchUtils.searchByFormElementHandler(constants.QS_SEARCHGROUP_GPR,searchID, searchValue, null, true);
        //        session.closeSessionDrawer();
        //        webDriverUtil.formElementHandler("customer-detail-nav-tab-cardholder", "Select", null);
        try {
            //            actCardHolderValues = webDriverUtil.getTextByList("prod.vmsAccountHolderList", 0);
        } catch (Exception e) {
            e.printStackTrace();
        }
        //        assertThat("Expected Account Holder Values to Match Actual Account Holder Values found.", adminUtils.compareLists(expCardHolderValues, actCardHolderValues,"",false), is(true));
    }

    @DataProvider(name = "viewAccountHolder")
    public Object[][] viewAccountHolder() {
        return new Object[][]{
                {"Validate Account Holder Information", "PAN", "4420620100044386", viewAccountHolderValues(), true},

        };
    }

    private List<String> viewAccountHolderValues() {
        List<String> AccountHolderValues = new ArrayList<String>();
        AccountHolderValues.add("102357812");
        AccountHolderValues.add("Charles");
        AccountHolderValues.add("King");
        AccountHolderValues.add("02/10/1974");
        AccountHolderValues.add("*****7777");
        AccountHolderValues.add("Kim");
        AccountHolderValues.add("04/06/2016");
        AccountHolderValues.add("04/14/2016");
        AccountHolderValues.add("Website");
        AccountHolderValues.add("ID SUCCESS");
        AccountHolderValues.add("5036381960");
        AccountHolderValues.add("5036381960");
        AccountHolderValues.add("test@gmail.com");
        AccountHolderValues.add("61 High Mountain Ave\nNo 2\nDenver CO 87124\nUS");
        AccountHolderValues.add("61 High Mountain Ave\nNo 2\nDenver CO 87124\nUS");
        AccountHolderValues.add("0");
        return AccountHolderValues;
    }

    @Test(groups = {"version-4.7.0", "in-progress", "smoke"}, dataProvider = "viewAccountLimits", enabled = false)
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
        //        assertThat("Expected Limits to Match Actual Limits found.", adminUtils.compareLists(expCardLimitsValues, actCardLimitsValues,"",false), is(true));
    }

    @DataProvider(name = "viewAccountLimits")
    public Object[][] viewAccountLimits() {
        return new Object[][]{
                {"Validate Account Limits Information", "serialNumber", "7562433801", viewAccountLimitsValues(), true},

        };
    }

    private List<String> viewAccountLimitsValues() {
        List<String> AccountLimitsValues = new ArrayList<String>();
        AccountLimitsValues.add("POS - Transaction Limit - CHECK CARD LOAD - Domestic-PIN-MCC(NA) $0.00 $250.00 $0.00 $0.00");
        AccountLimitsValues.add("POS - Transaction Limit - CHECK CARD LOAD - International-Signature-MCC(NA) $0.00 $250.00 $0.00 $0.00");
        AccountLimitsValues.add("POS - Transaction Limit - CHECK CARD LOAD - Domestic-Signature-MCC(NA) $0.00 $250.00 $0.00 $0.00");
        return AccountLimitsValues;
    }

    @Test(groups = {"version-4.0.0", "in-progress", "smoke"}, dataProvider = "viewAlerts", enabled = false)
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
        //        assertThat("Expected Alerts to Match Actual Alerts found.",  adminUtils.compareLists(expCardLimitsValues, actCardLimitsValues,"",false), is(true));

    }

    @DataProvider(name = "viewAlerts")
    public Object[][] viewAlerts() {
        return new Object[][]{
                {"Validate Alerts Displayed", "PAN", "4420620100040202", viewAlertsValues(), true},

        };
    }

    private List<String> viewAlertsValues() {
        List<String> AlertsValues = new ArrayList<String>();
        AlertsValues.add("Load/Credit Alert Whenever the available balance increases, the customer will receive an alert message\nOFF");
        AlertsValues.add("Low Balance Alert If the available balance is less than or equal to Low Balance Amount, the customer will receive an alert message $15.00\nBOTH");
        AlertsValues.add("Negative Balance Alert Once the balance goes negative, the system will send alerts whenever the customer performs any transaction and the available balance is less than zero\nOFF");
        AlertsValues.add("Daily Balance Alert This alert provides the daily balance to the customer\nOFF");
        AlertsValues.add("Incorrect PIN Alert This alert is sent every time an invalid PIN is entered\nOFF");
        AlertsValues.add("High Authorization Alert This alert is sent when the authorization amount of a transaction exceeds the customer-provided limit $100.00\nBOTH");
        AlertsValues.add("Insufficient Fund Alert This alert will be sent when the available balance is insufficient for a transaction\nOFF");
        return AlertsValues;
    }

    @Test(groups = {"version-4.0.0", "in-progress", "smoke"}, dataProvider = "viewFees", enabled = false)
    public void vmsFees(String description, String searchID, String searchValue, List<String> expCardLimitsValues, boolean shouldReturnResult) {
        //        List<String> actCardLimitsValues = new ArrayList<>();
        //        nav.signin();
        //        nav.navigateToSearch();
        //        searchUtils.searchByFormElementHandler(constants.QS_SEARCHGROUP_GPR, searchID, searchValue, null, true);
        //        session.closeSessionDrawer();
        //        webDriverUtil.waitAndClick("prod.vmsFeesTab");
        //        try {
        //            actCardLimitsValues = webDriverUtil.getTextByList("prod.vmsFeeRows", 0);
        //        } catch (Exception e) {
        //            e.printStackTrace();
        //        }
        //       assertThat("Expected Fees to Match Actual Fees found.",  adminUtils.compareLists(expCardLimitsValues, actCardLimitsValues,"",false), is(true));
    }

    @DataProvider(name = "viewFees")
    public Object[][] viewFees() {
        return new Object[][]{
                {"Validate Fees Displayed", "serialNumber", "7562433801", viewFeesValues(), true},

        };
    }

    private List<String> viewFeesValues() {
        List<String> FeesValues = new ArrayList<String>();
        FeesValues.add("PAPER STATEMENT FEE $4.95 $0.00 No");
        FeesValues.add("ATM WITHDRAWAL FEE $1.95 $0.00 No");
        FeesValues.add("INTERNATIONAL ATM CASH WDL FEE $4.95 $1.00 No");
        FeesValues.add("SIGNATURE PURCHASE TXN FEE $1.50 $1.00 No");
        FeesValues.add("PIN DEBIT PURCHASE TXN FEE $1.25 $1.00 No");
        FeesValues.add("CARD TO CARD TRANSFER FEE CSR $4.95 $0.00 No");
        FeesValues.add("REPLACEMENT CARD FEE $6.00 $0.00 No");
        FeesValues.add("CHW CTC TRAN FEE $2.50 $0.00 No");
        FeesValues.add("EXPEDITED CARD FEE $16.00 $0.00 No");
        FeesValues.add("IVR C T C FEE $2.00 $0.00 No");
        FeesValues.add("DORMANCY FEE $3.95 $0.00 No");
        FeesValues.add("OTC CASH WITHDRAWAL FEE $1.95 $0.00 No");
        FeesValues.add("OTC CASH WITHDRAWAL FEE $1.95 $0.00 No");
        FeesValues.add("ATM BALANCE INQUIRY $1.00 $1.00 No");
        FeesValues.add("ATM BALANCE INQUIRY $1.00 $1.00 No");
        FeesValues.add("INTERNATIONAL TRANSACTION FEE $0.50 $0.51 No");
        FeesValues.add("INTERNATIONAL TRANSACTION FEE $0.50 $0.51 No");
        FeesValues.add("PREAUTH COMPLETION FEE $0.50 $0.00 No");
        FeesValues.add("PREAUTH COMPLETION FEE $0.50 $0.00 No");
        FeesValues.add("PREAUTH COMPLETION FEE $0.50 $0.51 No");
        FeesValues.add("PREAUTH COMPLETION FEE $0.50 $0.51 No");
        FeesValues.add("FSS POS RETURN FEE $3.78 $0.00 No");
        FeesValues.add("FSS POS RETURN FEE $3.78 $0.00 No");
        FeesValues.add("FSS POS RETURN FEE $3.78 $0.00 No");
        FeesValues.add("FSS POS RETURN FEE $3.78 $0.00 No");
        FeesValues.add("INTERNATIONAL TRANSACTION FEE $0.50 $0.51 No");
        FeesValues.add("INTERNATIONAL TRANSACTION FEE $0.50 $0.51 No");
        FeesValues.add("ATM WITHDRAWAL DECLINE FEE $0.75 $0.00 No");
        FeesValues.add("ATM WITHDRAWAL DECLINE FEE $0.75 $0.00 No");
        return FeesValues;
    }

}
