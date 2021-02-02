package com.incomm.cca.qa.functional.actions.product;

import com.incomm.cca.qa.functional.BaseFT;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

/**
 * User: mgalloway
 * Date: 8/28/13
 * Time: 8:47 AM
 */
public class OneTimeDataCardActionsFT extends BaseFT {

    @Test(groups = {"version-3.9.0", "oneTimeCardData", "actions"}, enabled = false)
    public void card2cardTransfer() throws Exception {
        //        String parentCard="";
        //        String childCard="";
        ////        C2C Transfer data is stored in test-data.properties, this data will expire.
        //        String[] values=cardUtils.getCardActionValues("C2C_Transfer").split("-");
        //        parentCard=values[0];
        //        childCard=values[1];
        //        nav.signin();
        //        searchUtils.searchByFormElementHandler(constants.QS_SEARCHGROUP_FINANCIAL_GIFT,"greencardSerialNumber", parentCard, null,false);
        //        assertThat("C2C Transfer Button Should Exist", webDriverUtil.isElementPresent("card.transferCard2CardAction"), is(true));
        //        webDriverUtil.waitAndClick("card.transferCard2CardAction");
        //        webDriverUtil.sendKeys("card.transferCard2Card.childSerialNum", childCard);
        //        webDriverUtil.sendKeys("card.transferCard2Card.comments", "Good Luck!");
        //        webDriverUtil.click("card.transferCard2Card.submit");
        //        boolean modalExists=webDriverUtil.waitForElementPresent("card.transferCard2Card.successModal");
        //        if (!modalExists)
        //            System.out.println(cardUtils.getLogData("200"));
        //        webDriverUtil.waitForElementPresent("card.status");
        //        assertThat("C2C Transfer performed successfully.", modalExists, is(true));
        //        webDriverUtil.waitAndClick("card.transferCard2Card.successNSLink");
        //        webDriverUtil.waitForElementPresent("card.status",5);
        //        assertThat("Transferred card now has a status of Active.", webDriverUtil.getText("card.status"), is("Active"));
    }

    @Test(groups = {"version-3.9.0", "oneTimeCardData", "actions"}, dataProvider = "activateB2BCard", enabled = false)
    public void activateB2BCard(String description, String status) throws Exception {
        //        String cardData="";
        //        String activationSuccess="";
        //        if (status.equals("Initial"))
        //            cardData="IN_Activate_Card";
        //        else
        //            cardData="RR_Activate_Card";
        //        String[] values=returnCardDataValues(cardData);
        //        String serialNum=values[0];
        //        String birthYear=values[1];
        //        nav.signin();
        //        searchUtils.searchByFormElementHandler(constants.QS_SEARCHGROUP_FINANCIAL_GIFT,"greencardSerialNumber", serialNum, null,false);
        //        activationSuccess=cardUtils.activateGiftCard(birthYear);
        //        if (!activationSuccess.contains("Success"))
        //            System.out.println(cardUtils.getLogData("200"));
        //        assertThat(description, activationSuccess, containsString("Success"));
        //        assertThat("Status of card changed to Active", cardUtils.getGreenCardStatus(), containsString("Active"));
    }

    @DataProvider(name = "activateB2BCard")
    private Object[][] activateB2BCard() {
        return new Object[][]{
                //all card data is invalid            {"Activate B2B Card in Initial Status", "Initial"},
                {"Activate B2B Card in Replacement Requested", "Replacement Requested"},
        };

    }

    @Test(groups = {"version-3.9.0", "oneTimeCardData", "actions"}, dataProvider = "replaceCard", enabled = false)
    public void replaceCard(String description, String startStatus) throws Exception {
        //       nav.signin();
        //       String[] values =returnCardDataValues("RR_Replace_Card");
        //       String serialNum=values[0];
        //       String birthYear=values[1];
        //       cardUtils.lookUpCard(constants.QS_SEARCHGROUP_FINANCIAL_GIFT,"Serial Number", serialNum,false);
        //       try {
        //           webDriverUtil.scrollDownWithKeys("card.incommStatus");
        //       } catch (Exception e) {
        //           e.printStackTrace();
        //       }
        //       boolean bExists= webDriverUtil.isElementPresent("card.replaceCardAction");
        //       String message= cardUtils.setReplaceCard();
        //       if (!message.contains("Success"))
        //           System.out.println(cardUtils.getLogData("300"));
        //       assertThat("Replace Card Action Exists", bExists, is(true));
        //       assertThat(description, message, containsString("Success"));
    }

    @DataProvider(name = "replaceCard")
    private Object[][] replaceCard() {
        return new Object[][]{
                {"Replace Card Action Verification", "Replacement Requested"},
                {"Replace Card Action Verification", "Active"},
                {"Replace Card Action Verification", "Expired"},
                //                {"Replacement Card", "Replacement Requested", "4944802418","John","Smith","777-777-7777","1989","10433 Happy Valley Dr","","88888","Pleasantville","California - CA", constants.APP_CC_FRAUD_SUPER_USERNAME, constants.APP_CC_FRAUD_SUPER_PASSWORD,true,true},
                //                {"Replacement Card", "Active", "4453926664","John","Smith","777-777-7777","1989","10433 Happy Valley Dr","","88888","Pleasantville","CA", constants.APP_CC_JAX_AGENT_USERNAME, constants.APP_CC_JAX_AGENT_PASSWORD, "FAIL"},
                //                {"Replacement Card", "Replacement Requested", "6125053535","John","Smith","777-777-7777","1989","10433 Happy Valley Dr","","88888","Pleasantville","CA", constants.APP_CC_RCH_AGENT_USERNAME, constants.APP_CC_RCH_AGENT_PASSWORD, false,false},
        };

    }

    @Test(groups = {"version-3.9.0", "oneTimeCardData", "actions"}, dataProvider = "releasePreAuth", enabled = false)
    public void releasePreauth(String description, String serialNum) throws Exception {
        //        nav.signin();
        //        cardUtils.lookUpCard(constants.QS_SEARCHGROUP_FINANCIAL_GIFT,"Serial Number", serialNum,false);
        //        String message=cardUtils.verifyPreAuthReleaseAction();
        //        if (!message.contains("Success"))
        //            System.out.println(cardUtils.getLogData("200"));
        //        assertThat("PreAuth Release was successful.", message, containsString("Success"));
    }

    @DataProvider(name = "releasePreAuth")
    private Object[][] releasePreAuth() {
        return new Object[][]{
                {"Preauth Txn: Valid", "4952963052"},
                //                {"Preauth Txn: Valid", "3136411906"},
                //                {"Preauth Txn: Invalid Status", "2159758245"},
                //                {"Preauth Txn: Invalid User", "4952963052"},
        };
    }
    //    private String[] returnCardDataValues(String cardData) throws Exception {
    ////         String value=cardUtils.getCardActionValues(cardData);
    ////        String[] values=value.split("-");
    ////        return values;
    //    }

}



