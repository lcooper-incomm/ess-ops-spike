package com.incomm.cca.qa.acceptance.actions.customer;

import com.incomm.cca.qa.functional.BaseFT;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

/**
 * Functional Test used to test the VMS Adjust Balance functinality in CCA
 * <p>
 * User: Phil Boatwright
 * Date: 7/12/2016
 */
public class VMSAdjustBalanceAT extends BaseFT {
    //Good candidate for Adjust Balance: 4420620100040079
    //The card's status IS NOT one of the following:
    //    HOT CARDED
    //    LOST-STOLEN
    //    CLOSED

    @Test(groups = {"version-4.11.0", "acceptance", "actions"}, dataProvider = "addVMSAdjustBalancePermission", enabled = false)
    public void vmsAdjustBalancePermission(String description, boolean addRemovePermission) throws Exception {
        //        nav.signin();
        //        adminUtils.changePermission("JAX-SUPERVISOR","VMS Adjust Balance",addRemovePermission);
        //        nav.signout();
        //        nav.signin(constants.APP_CC_JAX_SUPER_USERNAME,constants.APP_CC_JAX_SUPER_PASSWORD,true);
        //        searchUtils.searchByFormElementHandler(constants.QS_SEARCHGROUP_GPR,"accountNumber", "0610002430664", null,true);
        //        boolean exists= webDriverUtil.isElementPresent("card.vmsAdjustBalanceAction");
        //        assertThat(description,exists, is(addRemovePermission));
    }

    @DataProvider(name = "addVMSAdjustBalancePermission")
    private Object[][] addVMSAdjustBalancePermission() {
        return new Object[][]{
                {"Add Adjust Balance Permission. Card to Card Transfer Action should display.", true},
                {"Remove Adjust Balance Permission, Card to Card Tranfer Action should not display.", false},
        };
    }

    @Test(groups = {"version-4.11.0", "acceptance", "actions"}, dataProvider = "vmsAdjustBalanceActionExists", enabled = false)
    public void vmsAdjustBalanceActionExists(String expStatus, String accountNumber, boolean shouldExist) throws Exception {
        //        nav.signin();
        //        String actStatus ="";
        //        searchUtils.searchByFormElementHandler(constants.QS_SEARCHGROUP_GPR,"accountNumber", accountNumber, null,true);
        //        try {
        //            webDriverUtil.scrollDownWithKeys("card.incommStatus");
        //            actStatus = webDriverUtil.getText("card.incommStatus");
        //        } catch (Exception e) {
        //            e.printStackTrace();
        //        }
        //        boolean bExists= webDriverUtil.isElementPresent("card.vmsAdjustBalanceAction");
        //        assertThat("Balance Adjustment Action Verificatio for"+expStatus+" status.", bExists, is(shouldExist));
        //        assertThat("Balance Adjustment Status is "+expStatus+" status.", actStatus, is(expStatus));
    }

    @DataProvider(name = "vmsAdjustBalanceActionExists")
    private Object[][] vmsAdjustBalanceActionExists() {
        return new Object[][]{
                {"Active", "0610002430664", true},
                {"Inactive", "0990000000044", true},
                {"Closed", "0610003479728", false},
                {"Lost-Stolen", "0610003479959", false},
                {"Hot Carded", "0610003479991", false},
                {"SUSPENDED CREDIT", "0610003669385", true},
        };
    }

    @Test(groups = {"version-4.11.0", "acceptance", "actions"}, dataProvider = "vmsAdjustBalance", enabled = false)
    public void vmsAdjustBalance(String description, boolean credit) throws Exception {
        //        nav.signin();
        //        String actStatus ="";
        //        searchUtils.searchByFormElementHandler(constants.QS_SEARCHGROUP_GPR,"accountNumber", "0610002430664", null,true);
        //        try {
        //            webDriverUtil.scrollDownWithKeys("card.incommStatus");
        //            webDriverUtil.waitAndClick("card.vmsAdjustBalanceAction");
        //        } catch (Exception e) {
        //            e.printStackTrace();
        //        }
        //        String oldAvailableBalance=webDriverUtil.getText("card.vmsAvailableBalances");
        //        String expNewAvailableBalance=adjustBalance(oldAvailableBalance,"50",credit);
        //        String actNewAvailableBalance=webDriverUtil.getText("card.vmsAvailableBalances");
        //        assertThat(description, actNewAvailableBalance.replace(",",""), containsString(expNewAvailableBalance));
    }

    @DataProvider(name = "vmsAdjustBalance")
    private Object[][] vmsAdjustBalance() {
        return new Object[][]{
                {"Adjust Available Balance by Credit", true},
                {"AdjustAvailable Balance by Debit", false},
        };
    }

    //    public String adjustBalance(String expAvailableBalance, String amount,boolean credit) {
    //        webDriverUtil.waitForElementPresent("card.vmsAdjustBalance.title");
    //        String message="";
    //        String accountNumber = webDriverUtil.getText("card.vmsAdjustBalance.accountNumber");
    //        String actAvailableBalance = webDriverUtil.getText("card.vmsAdjustBalance.availableBalance");
    //        webDriverUtil.clear("card.vmsAdjustBalance.amount");
    //        try {
    //            webDriverUtil.sendKeysRetry("card.vmsAdjustBalance.amount",amount,3);
    //        } catch (Exception e) {}
    //        if (credit)
    //            webDriverUtil.waitAndClick("card.vmsAdjustBalance.credit");
    //        else
    //            webDriverUtil.waitAndClick("card.vmsAdjustBalance.debit");
    //        webDriverUtil.selectText("card.vmsAdjustBalance.reason", "Merchant Refund");
    //        webDriverUtil.sendKeys("card.vmsAdjustBalance.addComment", "Adjusting balance by  " + amount);
    //        webDriverUtil.waitAndClick("card.vmsAdjustBalance.submit");
    //        webDriverUtil.waitForElementPresent("card.vmsAdjustBalance.availableBalance");
    //        String confirmAvailableBalance=webDriverUtil.getText("card.vmsAdjustBalance.confirm.availableBalance");
    //        String confirmAmount=webDriverUtil.getText("card.vmsAdjustBalance.confirm.amount");
    //        String confirmAewBalance=webDriverUtil.getText("card.vmsAdjustBalance.confirm.newBalance");
    //        assertThat("Balance Adjustment Available Balance Verification", confirmAmount, containsString(amount));
    //        assertThat("Balance Adjustment Amount Verification", confirmAvailableBalance, containsString(confirmAvailableBalance));
    //        webDriverUtil.waitAndClick("card.vmsAdjustBalance.confirm.yes");
    //        message = cardUtils.getAlertMessage(20);
    //        assertThat("Adjustment Successful", message, containsString("Success"));
    //        return confirmAewBalance;
    //    }

}
