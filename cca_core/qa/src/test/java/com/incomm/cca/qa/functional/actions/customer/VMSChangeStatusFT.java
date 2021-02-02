package com.incomm.cca.qa.functional.actions.customer;

import com.incomm.cca.qa.functional.BaseFT;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

/**
 * Functional Test used to test the Card-to-Card (GreenCard) Transfer functionality in CCA
 * <p>
 * User: Darren Carpenter (dcarpenter)
 * Date: 6/12/2015
 */
public class VMSChangeStatusFT extends BaseFT {

    boolean leadingCtrlKey = false;

    @Test(groups = {"version-4.8.0", "card", "smoke"}, dataProvider = "vmsChangeStatusSubset", enabled = false)
    public void vmsChangeStatusSubset(String description, String statusFrom, String statusTo, boolean effDateRequired) {
        //        String message="";
        //        String actStatus="";
        //        nav.signin();
        //        searchUtils.searchByFormElementHandler(constants.QS_SEARCHGROUP_GPR,"PAN", "4420620100040202", null,true);
        //        message= setVMSCardStatus(statusTo, effDateRequired);
        //        actStatus=webDriverUtil.getText("card.vmsStatus");
        //        if (!actStatus.equals(statusTo))
        //            System.out.println(cardUtils.getLogData("200"));
        //        assertThat("Status change from "+statusFrom+" to "+statusTo,actStatus, containsString(statusTo));
        //        assertThat(description,message, containsString("Success"));
    }

    @DataProvider(name = "vmsChangeStatusSubset")
    private Object[][] vmsChangeStatusSubset() {
        return new Object[][]{
                //Status's that include Effective Date:ACTIVE, CLOSED, ON HOLD, or HOT CARDED
                {"VMS Change Status from Active to Spend Down", "Active", "Spend Down", false},
                {"VMS Change Status from Spend Down to Active", "Spend Down", "Active", true},
                {"VMS Change Status from Active to Lost-Stolen", "Active", "Lost-Stolen", false},
                {"VMS Change Status from Lost-Stolen to Spend Down", "Lost-Stolen", "Spend Down", false},
                {"VMS Change Status from Spend Down to Active", "Spend Down", "Active", true},
                {"VMS Change Status from Active to Damaged", "Active", "Damaged", false},
                {"VMS Change Status from Damaged to Lost-Stolen", "Damaged", "Lost-Stolen", false},
                {"VMS Change Status from Lost-Stolen to Active", "Lost-Stolen", "Active", true},
                {"VMS Change Status from Active to On Hold", "Active", "On Hold", true},
                {"VMS Change Status from On Hold to Active", "On Hold", "Active", true},
        };
    }

    @Test(groups = {"version-4.8.0", "card", "null"}, dataProvider = "vmsChangeStatus", enabled = false)
    public void vmsChangeStatus(String description, String statusFrom, String statusTo, boolean effDateRequired) {
        //        String message="";
        //        nav.signin();
        //        searchUtils.searchByFormElementHandler(constants.QS_SEARCHGROUP_GPR,"PAN", "4420620100040202", null,true);
        //        setVMSCardStatus(statusTo, effDateRequired);
    }

    @DataProvider(name = "vmsChangeStatus")
    private Object[][] vmsChangeStatus() {
        return new Object[][]{
                //Status's that include Effective Date:ACTIVE, CLOSED, ON HOLD, or HOT CARDED
                {"VMS Change Status from Active to Spend Down", "Active", "Spend Down", false},
                {"VMS Change Status from Spend Down to Active", "Spend Down", "Active", true},
                {"VMS Change Status from Active to Lost-Stolen", "Active", "Lost-Stolen", false},
                {"VMS Change Status from Lost-Stolen to Spend Down", "Lost-Stolen", "Spend Down", false},
                {"VMS Change Status from Spend Down to Active", "Spend Down", "Active", true},
                {"VMS Change Status from Active to Damaged", "Active", "Damaged", false},
                {"VMS Change Status from Damaged to Lost-Stolen", "Damaged", "Lost-Stolen", false},
                {"VMS Change Status from Lost-Stolen to Active", "Lost-Stolen", "Active", true},
                {"VMS Change Status from Active to On Hold", "Active", "On Hold", true},
                {"VMS Change Status from On Hold to Active", "On Hold", "Active", true},
                {"VMS Change Status from Monitored to On Hold", "Monitored", "On Hold", true},
                {"VMS Change Status from On Hold to Lost-Stolen", "On Hold", "Lost-Stolen", false},
                {"VMS Change Status from Lost-Stolen to Active", "Lost-Stolen", "Active", true},
                {"VMS Change Status from Hot Carded to Active", "Hot Carded", "Active", false},
                {"VMS Change Status from Hot Carded to Monitored", "Hot Carded", "Monitored", false},
                {"VMS Change Status from Monitored to Active", "Monitored", "Active", true},
                {"VMS Change Status from Active to Monitored", "Active", "Monitored", false},
                {"VMS Change Status from Monitored to Damaged", "Monitored", "Damaged", false},
                {"VMS Change Status from Damaged to Lost-Stolen", "Damaged", "Lost-Stolen", false},
                {"VMS Change Status from Lost-Stolen to Damaged", "Lost-Stolen", "Damaged", false},
                {"VMS Change Status from Lost-Stolen to Active", "Lost-Stolen", "Active", true},
                {"VMS Change Status from Active to Restricted", "Active", "Restricted", false},
                {"VMS Change Status from Restricted to Active", "Restricted", "Active", true},
                {"VMS Change Status from Spend Down to Active", "Spend Down", "Active", true},
                {"VMS Change Status from Active to Damaged", "Active", "Damaged", false},
                {"VMS Change Status from Damaged to Lost-Stolen", "Damaged", "Lost-Stolen", false},
                {"VMS Change Status from Lost-Stolen to Active", "Lost-Stolen", "Active", true},
                {"VMS Change Status from Active to On Hold", "Active", "On Hold", true},
                {"VMS Change Status from On Hold to Damaged", "On Hold", "Damaged", false},
                {"VMS Change Status from Damaged to Lost-Stolen", "Damaged", "Lost-Stolen", false},
                {"VMS Change Status from Lost-Stolen to Active", "Lost-Stolen", "Active", true},
                {"VMS Change Status from Active to On Hold", "Active", "On Hold", true},
                {"VMS Change Status from On Hold to Monitored", "On Hold", "Monitored", false},
                {"VMS Change Status from Monitored to Active", "Monitored", "Active", true},
                {"VMS Change Status from Active to On Hold", "Active", "On Hold", true},
                {"VMS Change Status from On Hold to Hot Carded", "On Hold", "Hot Carded", true},
                {"VMS Change Status from Hot Carded to Active", "Hot Carded", "Active", true},
                {"VMS Change Status from On Hold to Restricted", "On Hold", "Restricted", false},
                {"VMS Change Status from Restricted to Active", "Restricted", "Active", true},
                {"VMS Change Status from Active to On Hold", "Active", "On Hold", true},
                {"VMS Change Status from On Hold to Spend Down", "On Hold", "Spend Down", false},
                {"VMS Change Status from Spend Down to Active", "Spend Down", "Active", true},
                {"VMS Change Status from Active to Monitored", "Active", "Monitored", false},
                {"VMS Change Status from Monitored to Lost-Stolen", "Monitored", "Lost-Stolen", false},
                {"VMS Change Status from Lost-Stolen to Active", "Lost-Stolen", "Active", true},
                {"VMS Change Status from Active to Monitored", "Active", "Monitored", false},
                {"VMS Change Status from Monitored to Restricted", "Monitored", "Restricted", false},
                {"VMS Change Status from Restricted to Active", "Restricted", "Active", true},
                {"VMS Change Status from Active to Monitored", "Active", "Monitored", false},
                {"VMS Change Status from Monitored to Spend Down", "Monitored", "Spend Down", false},
                {"VMS Change Status from Spend Down to Active", "Spend Down", "Active", false},
                {"VMS Change Status from Active to Hot Carded", "Active", "Hot Carded", true},
                {"VMS Change Status from Hot Carded to Spend Down", "Hot Carded", "Spend Down", false},
                {"VMS Change Status from Spend Down to Active", "Spend Down", "Active", true},
                {"VMS Change Status from Active to Restricted", "Active", "Restricted", false},
                {"VMS Change Status from Restricted to Lost-Stolen", "Restricted", "Lost-Stolen", false},
                {"VMS Change Status from Lost-Stolen to Active", "Lost-Stolen", "Active", true},
                {"VMS Change Status from Active to Restricted", "Active", "Restricted", false},
                {"VMS Change Status from Restricted to Hot Carded", "Restricted", "Hot Carded", false},
                {"VMS Change Status from Hot Carded to Active", "Hot Carded", "Active", false},
                {"VMS Change Status from Active to Restricted", "Active", "Restricted", false},
                {"VMS Change Status from Restricted to Spend Down", "Restricted", "Spend Down", false},
                {"VMS Change Status from Spend Down to Active", "Spend Down", "Active", true},
        };
    }
    //    public String setVMSCardStatus(String desiredStatus,boolean effDateRequired) {
    //        Date currentDate = new Date();
    //        SimpleDateFormat date = new SimpleDateFormat("MM/dd/yyyy");
    //        String message = "";
    //        String today=date.format(currentDate);
    //        String afterStatus = "";
    //        webDriverUtil.waitForElementPresent("card.vmsChangeStatus");
    //        webDriverUtil.waitAndClick("card.vmsChangeStatus");
    //        webDriverUtil.waitForElementPresent("card.vmsChangeStatus.selectNewStatus");
    //        webDriverUtil.selectText("card.vmsChangeStatus.selectNewStatus", desiredStatus);
    //        try {
    //            if (effDateRequired) {
    //                webDriverUtil.waitForElementPresent("card.vmsChangeStatus.setEffectiveDate");
    //                searchUtils.setDate("card.vmsChangeStatus.setEffectiveDate", today);
    //            }
    //
    //            if (leadingCtrlKey) {
    //                webDriverUtil.sendKeysWithLeadingCntrlKey("card.vmsChangeStatus.addComment", "Setting Status to " + desiredStatus);
    //                leadingCtrlKey = false;
    //            }
    //            else
    //                webDriverUtil.sendKeys("card.vmsChangeStatus.addComment", "Setting Status to " + desiredStatus);
    //         webDriverUtil.waitWhileExists("alert.Message");
    //        }catch(Exception e){webDriverUtil.sendKeys("card.vmsChangeStatus.addComment", "Setting Status to " + desiredStatus);};
    //        webDriverUtil.click("card.vmsChangeStatus.submit");
    //        webDriverUtil.waitAndClick("card.vmsChangeStatus.submit");
    //        message = cardUtils.getAlertMessage(20);
    //        return message;
    //
    //    }

}
