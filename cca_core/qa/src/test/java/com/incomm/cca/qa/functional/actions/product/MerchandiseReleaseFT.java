package com.incomm.cca.qa.functional.actions.product;

import com.incomm.cca.qa.dataProvider.common.UserData;
import com.incomm.cca.qa.functional.BaseFT;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

/**
 * Functional Test used to test the Merchandise Release (GreenCard) functionality in CCA
 * <p>
 * User: Darren Carpenter (dcarpenter)
 * Date: 6/12/2015
 */
public class MerchandiseReleaseFT extends BaseFT {

    @Test(groups = {"version-3.9.0", "card", "MerchandiseRelease"}, dataProvider = "merchandiseRelease", enabled = false)
    public void merchandiseReleaseCard(String cardAction, String serialNum, String option, String reason, String role, String pwd, boolean expectBadCreditStatus, boolean buttonExists, boolean statusChangePossible) throws Exception {
        ////        cardUtils.getCard(role, pwd, serialNum, "");
        //        assertThat("Card Status is Bad Credit", cardUtils.getGreenCardStatus().contains("Bad Credit"), is(expectBadCreditStatus));
        ////        assertThat("Merchandise Release Activation Button Exists", webDriverUtil.isElementPresent("card.merchantReleaseAction"), is(buttonExists));
        //        webDriverUtil.click("card.merchantReleaseAction");
        //        webDriverUtil.selectText("card.merchantRelease.option", option);
        //        webDriverUtil.selectText("card.merchantRelease.reason", reason);
        //        webDriverUtil.sendKeys("card.transferCard2Card.comments", cardAction);
        ////        webDriverUtil.click("card.transferCard2Card.submit");
        //        assertThat("Merchant Release Action result. ", cardUtils.getResultsMessage(5).contains("Success"), is(statusChangePossible));
        //        if (statusChangePossible) {
        //            assertThat("Card Status Changed to 'Active'", cardUtils.getGreenCardStatus().contains("Active"), is(true));
        //        } else {
        //            assertThat("Card Status Remains 'Bad Credit'", cardUtils.getGreenCardStatus().contains("Bad Credit"), is(true));
        //        }

    }

    @DataProvider(name = "merchandiseRelease")
    private Object[][] merchandiseRelease() {
        return new Object[][]{
                // cardAction,  serialNum,  option,  reason,   role,  pwd,                                                                                expectBadCreditStatus, buttonExists, statusChangePossible
                {"Merchant Release of GC Card In 'Bad Credit' Option: Denied", "4453926664", "Denied", "Letter Not Legitimate", UserData.AGENT2.getUsername(), UserData.AGENT2.getPassword(), true, true, false},
                {"Merchant Release of GC Card In 'Bad Credit' Option: Approved", "4453926664", "Approved", "Letter Received", UserData.AGENT2.getUsername(), UserData.AGENT2.getPassword(), true, true, true},
                {"Merchant Release of GC Card In 'Bad Credit' Option: Denied", "4453926664", "Denied", "Bad Merchant", UserData.AGENT2.getUsername(), UserData.AGENT2.getPassword(), true, true, false},
                {"Merchant Release of GC Card In 'Bad Credit' Option: Denied", "4453926664", "Denied", "Merchant Letter Not Received", UserData.AGENT2.getUsername(), UserData.AGENT2.getPassword(), true, true, false},
                {"Merchant Release of GC Card In 'Bad Credit' Option: Denied", "4453926664", "Denied", "Returned Funds", UserData.AGENT2.getUsername(), UserData.AGENT2.getPassword(), true, true, false},
                {"Merchant Release of GC Card In 'Bad Credit' Option: Approved", "4453926664", "Approved", "Letter Received", UserData.AGENT2.getUsername(), UserData.AGENT2.getPassword(), false, false, true},
                {"Merchant Release of GC Card In 'Deactive' Option: Approved", "4453926664", "Approved", "Letter Received", UserData.AGENT2.getUsername(), UserData.AGENT2.getPassword(), false, false, true},
                {"Merchant Release of GC Card In 'Bad Credit' Without Permission", "4453926664", "Approved", "Letter Received", UserData.AGENT2.getUsername(), UserData.AGENT2.getPassword(), true, false, true},
        };
    }
}
