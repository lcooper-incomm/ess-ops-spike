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
public class VMSCardToCardTransferAT extends BaseFT {

    @Test(groups = {"version-4.11.0", "acceptance", "actions"}, dataProvider = "addVMSCardToCardTrPermission", enabled = false)
    public void vmsCardToCardTrPermission(String description, boolean addRemovePermission) throws Exception {
        //        nav.signin();
        //        adminUtils.changePermission("JAX-SUPERVISOR","VMS C2C Transfer - Request",addRemovePermission);
        //        nav.signout();
        //        nav.signin(constants.APP_CC_JAX_SUPER_USERNAME,constants.APP_CC_JAX_SUPER_PASSWORD,true);
        //        searchUtils.searchByFormElementHandler(constants.QS_SEARCHGROUP_GPR,"accountNumber", "0610002430664", null,true);
        //        boolean exists= webDriverUtil.isElementPresent("card.vmsCardToCardTrAction");
        //        assertThat(description,exists, is(addRemovePermission));
    }

    @DataProvider(name = "addVMSCardToCardTrPermission")
    private Object[][] addVMSCardToCardTrPermission() {
        return new Object[][]{
                {"Add Card To Card Permission. Card to Card Transfer Action should display.", true},
                {"Remove Card To Card Permission, Card to Card Tranfer Action should not display.", false},
        };
    }

    @Test(groups = {"version-4.11.0", "acceptance", "actions"}, dataProvider = "vmsCardToCardTrActionExists", enabled = false)
    public void vmsCardToCardTrActionExists(String expStatus, String accountNumber, boolean shouldExist) throws Exception {
        //        nav.signin();
        //        String actStatus ="";
        //        searchUtils.searchByFormElementHandler(constants.QS_SEARCHGROUP_GPR,"accountNumber", accountNumber, null,true);
        //        try {
        //            webDriverUtil.scrollDownWithKeys("card.incommStatus");
        //            actStatus = webDriverUtil.getText("card.incommStatus");
        //        } catch (Exception e) {
        //            e.printStackTrace();
        //        }
        //        boolean exists= webDriverUtil.isElementPresent("card.vmsCardToCardTrAction");
        //        assertThat("Balance Adjustment Action Verificatio for"+expStatus+" status.", exists, is(shouldExist));
        //        assertThat("Balance Adjustment Status is "+expStatus+" status.", actStatus, is(expStatus));
    }

    @DataProvider(name = "vmsCardToCardTrActionExists")
    private Object[][] vmsCardToCardTrActionExists() {
        return new Object[][]{
                {"Active", "0610002430664", true},
                {"Inactive", "0990000000044", false},
        };
    }

    @Test(groups = {"version-4.11.0", "acceptance", "actions"}, dataProvider = "vmsCardToCardTr", enabled = false)
    public void vmsCardToCardTr(String description, boolean credit) throws Exception {
        //        nav.signin();
        //        String actStatus ="";
        //        searchUtils.searchByFormElementHandler(constants.QS_SEARCHGROUP_GPR,"PAN", "4420620303638265", null,true);
        //        try {
        //            webDriverUtil.scrollDownWithKeys("card.incommStatus");
        //            webDriverUtil.waitAndClick("card.vmsCardToCardTrAction");
        //        } catch (Exception e) {
        //            e.printStackTrace();
        //        }
        //        String oldAvailableBalance=webDriverUtil.getText("card.vmsAvailableBalances");
        //        String expNewAvailableBalance=CardToCardTr(oldAvailableBalance,"50",credit);
        //        String actNewAvailableBalance=webDriverUtil.getText("card.vmsAvailableBalances");
        //        assertThat(description, actNewAvailableBalance.replace(",",""), containsString(expNewAvailableBalance));
    }

    @DataProvider(name = "vmsCardToCardTr")
    private Object[][] vmsCardToCardTr() {
        return new Object[][]{
                {"Adjust Available Balance by Credit", true},
                {"AdjustAvailable Balance by Debit", false},
        };
    }

    //    public String CardToCardTr(String expAvailableBalance, String amount,boolean credit) {
    //        webDriverUtil.waitForElementPresent("card.vmsCardToCardTr.title");
    //        String message="";
    //        String accountNumber = webDriverUtil.getText("card.vmsCardToCardTr.accountNumber");
    //        String actAvailableBalance = webDriverUtil.getText("card.vmsCardToCardTr.availableBalance");
    //        webDriverUtil.clear("card.vmsCardToCardTr.amount");
    //        try {
    //            webDriverUtil.sendKeysRetry("card.vmsCardToCardTr.amount",amount,3);
    //        } catch (Exception e) {}
    //        if (credit)
    //            webDriverUtil.waitAndClick("card.vmsCardToCardTr.credit");
    //        else
    //            webDriverUtil.waitAndClick("card.vmsCardToCardTr.debit");
    //        webDriverUtil.selectText("card.vmsCardToCardTr.reason", "Merchant Refund");
    //        webDriverUtil.sendKeys("card.vmsCardToCardTr.addComment", "Adjusting balance by  " + amount);
    //        webDriverUtil.waitAndClick("card.vmsCardToCardTr.submit");
    //        webDriverUtil.waitForElementPresent("card.vmsCardToCardTr.availableBalance");
    //        String confirmAvailableBalance=webDriverUtil.getText("card.vmsCardToCardTr.confirm.availableBalance");
    //        String confirmAmount=webDriverUtil.getText("card.vmsCardToCardTr.confirm.amount");
    //        String confirmAewBalance=webDriverUtil.getText("card.vmsCardToCardTr.confirm.newBalance");
    //        assertThat("Balance Adjustment Available Balance Verification", confirmAmount, containsString(amount));
    //        assertThat("Balance Adjustment Amount Verification", confirmAvailableBalance, containsString(confirmAvailableBalance));
    //        webDriverUtil.waitAndClick("card.vmsCardToCardTr.confirm.yes");
    //        message = cardUtils.getAlertMessage(20);
    //        assertThat("Adjustment Successful", message, containsString("Success"));
    //        return confirmAewBalance;
    //    }

}
