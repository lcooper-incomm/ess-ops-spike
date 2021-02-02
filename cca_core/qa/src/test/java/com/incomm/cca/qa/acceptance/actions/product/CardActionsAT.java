package com.incomm.cca.qa.acceptance.actions.product;

import com.incomm.cca.qa.dataProvider.functional.acceptance.dashboard.actions.product.CardActionsDP;
import com.incomm.cca.qa.functional.BaseFT;
import com.incomm.cca.qa.pageObject.LoginPO;
import com.incomm.cca.qa.pageObject.NavigationPO;
import com.incomm.cca.qa.pageObject.actions.ActionToolbarPO;
import com.incomm.cca.qa.pageObject.enums.SearchParameter;
import com.incomm.cca.qa.pageObject.enums.SearchType;
import com.incomm.cca.qa.pageObject.search.CustomerVerificationPo;
import com.incomm.cca.qa.pageObject.search.SearchPo;
import org.assertj.core.api.SoftAssertions;
import org.testng.annotations.Test;

import java.util.ArrayList;
import java.util.List;

/**
 * User: pboatwright
 * Date: 2/5/17
 * Time: 8:47 AM
 */
public class CardActionsAT extends BaseFT {

    @Test(groups = {"version-6.0.0", "acceptance", "card", "actions"}, dataProviderClass = CardActionsDP.class, dataProvider = "verifyCardActions", enabled = true)
    public void verifyCardActions(String description, SearchType searchType, SearchParameter searchParameter, String searchValue, List expActions) {
        List<String> actualActions = new ArrayList<>();
        LoginPO login = new LoginPO(driver);
        login.defaultSignIn();
        NavigationPO nav = new NavigationPO(driver);
        nav.navigateToSearch();
        SearchPo search = new SearchPo(driver);
        search.selectSearchType(searchType);
        try {
            Thread.sleep(2000);
        } catch (Exception e) {

        }

        search.getParameters(searchType)
              .setValue(searchParameter, searchValue);

        if (searchType == SearchType.VMS_GPR) {
            search.clickSearchAndExpectVerifyCustomerDialog();
            CustomerVerificationPo customerVerification = new CustomerVerificationPo(driver);

            customerVerification.verifyCustomer();
        } else {
            search.clickSearchAndExpectNavigateToDetails();
        }
        ActionToolbarPO actionToolbar = new ActionToolbarPO(driver);
        actualActions = actionToolbar.getDisplayedActionNames();
        SoftAssertions softly = new SoftAssertions();
        softly.assertThat(actualActions)
              .as(description)
              .isEqualTo(expActions);
        softly.assertAll();
    }

    //TO DO: PreAuth Release

    @Test(groups = {"version-3.9.0", "acceptance", "card", "actions"}, dataProvider = "changeCardStatus", enabled = false)
    public void changeCardStatus(String serialNum, String startStatus, String targetStatus, boolean buttonExists, boolean statusChangePossible) throws Exception {
        ////        nav.signin();
        //        boolean successfulStatusChange = false;
        //        System.out.println("Change from " + startStatus + " to " + targetStatus);
        ////        cardUtils.verifyCardInCorrectStatus(serialNum, startStatus,true);
        //        assertThat("Change Action Button Should Exist", webDriverUtil.isElementPresent("card.changeStatusAction"), is(buttonExists));
        ////        successfulStatusChange = cardUtils.setCardStatus(targetStatus);
        //        if (!successfulStatusChange)
        ////            System.out.println(cardUtils.getLogData("200"));
        //        assertThat("Status Change from " + startStatus + " to " + targetStatus, successfulStatusChange, is(statusChangePossible));
    }

    @Test(groups = {"version-3.9.0", "acceptance", "card", "actions"}, dataProviderClass = CardActionsDP.class, dataProvider = "adjustCardBalance", enabled = false)
    public void adjustCardBalance(String description, String status, String serialNum, String adjustmentAmount, String adjustmentReason, boolean buttonExists, boolean statusChangePossible) throws Exception {
        ////       nav.signin();
        //       String results = "";
        ////       cardUtils.verifyCardInCorrectStatus(serialNum, status,true);
        //       results =  cardUtils.setCardBalanceAdjustment(adjustmentAmount, adjustmentReason,description);
        //       if (!results.contains("Success"))
        //           System.out.println(cardUtils.getLogData("200"));
        //       assertThat(description.concat(results),results.contains("Success"), is(statusChangePossible));
    }

    @Test(groups = {"version-3.9.0", "acceptance", "card", "actions"}, enabled = false)
    public void unmaskPAN() throws Exception {
        //       nav.signin();
        //       searchUtils.searchByFormElementHandler(constants.QS_SEARCHGROUP_FINANCIAL_GIFT,"greencardSerialNumber", "4944802418", null,false);
        //       assertThat("Unmask Pan: Valid", cardUtils.setUnmaskPAN("4555210921734071"), is(true));
    }

    @Test(groups = {"version-3.9.0", "acceptance", "card"}, dataProviderClass = CardActionsDP.class, dataProvider = "merchandiseRelease", enabled = false)
    public void merchandiseReleaseCard(String cardAction, String serialNum, String option, String reason) throws Exception {
        //        String message="";
        //        nav.signin();
        //        searchUtils.searchByFormElementHandler(constants.QS_SEARCHGROUP_FINANCIAL_GIFT,"greencardSerialNumber", serialNum, null,false);
        //        cardUtils.verifyCardInCorrectStatus(serialNum, "Bad Credit",false);
        //        webDriverUtil.waitWhileExists("alert.Message");
        //        webDriverUtil.waitAndClick("card.MerchandiseReleaseAction");
        //        webDriverUtil.selectText("card.MerchandiseRelease.decision", option);
        //        webDriverUtil.selectText("card.MerchandiseRelease.reason", reason);
        //        webDriverUtil.sendKeys("card.MerchandiseRelease.comment", cardAction);
        //        webDriverUtil.waitAndClick("card.MerchandiseRelease.submit");
        //        message= cardUtils.getResultsMessage(5);
        //        if (!message.contains("Success"))
        //            System.out.println(cardUtils.getLogData("200"));
        //        assertThat("Merchant Release Action result. ",message,containsString("Success"));
        //        assertThat("Card Status Changed to 'Active'", cardUtils.getGreenCardStatus(),containsString("Active"));
        // Upon successful completion, a dialog returns displaying the Max Balance, Daily Balance, and Volume Limit
    }

    @Test(groups = {"version-3.9.0", "acceptance", "actions"}, dataProviderClass = CardActionsDP.class, dataProvider = "deactivateFastCard", enabled = false)
    public void deactivateFastCard(String description, String serialNum, boolean billable, String merchant, String location, String terminal) throws Exception {
        //        nav.signin();
        //        searchUtils.searchByFormElementHandler(constants.QS_SEARCHGROUP_FASTCARD_PIN,"serialNumber", serialNum, null,false);
        //        String message = "";
        //        webDriverUtil.waitAndClick("card.deactivateFastCardAction");
        //        webDriverUtil.waitForElementPresent("card.deactivateFastCard.reason");
        //        webDriverUtil.selectText("card.deactivateFastCard.reason","Consumer Fraud");
        //        if (billable)
        //            webDriverUtil.selectText("card.deactivateFastCard.type", "Billable");
        //         else
        //            webDriverUtil.selectText("card.deactivateFastCard.type", "Non-Billable");
        //        assertThat("Merchant info is displayed", webDriverUtil.getText("card.deactivateFastCard.billableMerchant"), is(merchant));
        //        assertThat("Merchant info is displayed", webDriverUtil.getText("card.deactivateFastCard.billableLocation"), is(location));
        //        assertThat("Merchant info is displayed", webDriverUtil.getText("card.deactivateFastCard.billableTerminal"), is(terminal));
        //        webDriverUtil.sendKeys("card.deactivateFastCard.comment", description);
        //        webDriverUtil.waitAndClick("card.deactivateFastCard.next");
        //        webDriverUtil.waitAndClick("card.confirmationOfactivation.submit");
        //        message = cardUtils.getAlertMessage(30);
        //        if (!message.contains("Success"))
        //            System.out.println(cardUtils.getLogData("200"));
        //        assertThat("Deactivate action succeeded", message, containsString("Success"));
        //    }
        //    @DataProvider(name = "deactivateFastCard")
        //    private Object[][] deactivateFastCard() {
        //        return new Object[][]{
        //                // Need more cards? Search on Terminal CVS02232001 Range: 06/01/2010-06/30/2010
        //                {"Deactivate Card: Billable", "1728380450", true, "CVS Pharmacy","02232","CVS0223203"},
        //        };
    }

    @Test(groups = {"version-3.9.0", "acceptance", "actions"}, dataProviderClass = CardActionsDP.class, dataProvider = "activateFastCard", enabled = false)
    public void activateFastCard(String description, String terminalid, String serialNum, boolean billable) throws Exception {
        //        nav.signin();
        //        searchUtils.searchByFormElementHandler(constants.QS_SEARCHGROUP_LOCATION,"terminalID", terminalid, null,false);
        //        String message = "";
        //        webDriverUtil.waitAndClick("card.activateFastCardAction");
        //        webDriverUtil.waitForElementPresent("card.activateFastCard.cardType");
        //        webDriverUtil.selectText("card.activateFastCard.cardType","Serial #");
        //        webDriverUtil.sendKeys("card.activateFastCard.cardNumber",serialNum);
        //        webDriverUtil.waitAndClick("card.activateFastCard.validate");
        //        webDriverUtil.waitWhileExists("alert.Message");
        //        if (webDriverUtil.isElementPresent("card.activateFastCard.validateSuccessful")) {
        //            if (billable) {
        //                webDriverUtil.selectText("card.activateFastCard.type", "Billable");
        //            }
        //            else {
        //                webDriverUtil.selectText("card.activateFastCard.type", "Non-Billable");
        //            }
        //            webDriverUtil.selectText("card.activateFastCard.reason","Activation Issue");
        //            webDriverUtil.sendKeys("card.activateFastCard.comment", description);
        //            webDriverUtil.waitAndClick("card.activateFastCard.next");
        //            webDriverUtil.waitAndClick("card.confirmationOfactivation.submit");
        //            message = cardUtils.getAlertMessage(30);
        //            if (!message.contains("Success"))
        //                System.out.println(cardUtils.getLogData("200"));
        //            assertThat("Fast Card Activation action succeeded", message, containsString("Success"));
        //        }
        //        else{
        //            throw new Exception("Card validation rejected. Serial Number: "+serialNum);
        //        }
    }

}






