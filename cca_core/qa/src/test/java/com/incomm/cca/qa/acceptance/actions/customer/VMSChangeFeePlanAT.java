package com.incomm.cca.qa.acceptance.actions.customer;

import com.incomm.cca.qa.functional.BaseFT;
import com.incomm.cca.qa.pageObject.LoginPO;
import com.incomm.cca.qa.pageObject.NavigationPO;
import com.incomm.cca.qa.pageObject.details.DetailsPo;
import com.incomm.cca.qa.pageObject.details.FeesPo;
import com.incomm.cca.qa.pageObject.enums.SearchParameter;
import com.incomm.cca.qa.pageObject.enums.SearchType;
import com.incomm.cca.qa.pageObject.search.CustomerVerificationPo;
import com.incomm.cca.qa.pageObject.search.SearchPo;
import org.testng.annotations.Test;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Acceptance Test Class for the VMS Change Fee Plan Action
 * <p>
 * User: Darren Carpenter (dcarpenter)
 * Date: 4/25/2016
 */
public class VMSChangeFeePlanAT extends BaseFT {

    @Test(groups = {"version-6.0.0", "acceptance", "details"}, enabled = false)
    public void vmsChangeFeePlan() throws Exception {

        String searchValue = "5262910010001636"; // VMS_GPR Card Number

        LoginPO login = new LoginPO(driver);
        login.defaultSignIn();
        NavigationPO nav = new NavigationPO(driver);
        nav.navigateToSearch();
        SearchPo search = new SearchPo(driver);
        search.selectSearchType(SearchType.VMS_GPR);
        search.getParameters(SearchType.VMS_GPR)
              .setValue(SearchParameter.PAN, searchValue);
        search.clickSearchAndExpectVerifyCustomerDialog();
        CustomerVerificationPo customerVerification = new CustomerVerificationPo(driver);

        customerVerification.verifyCustomer();
        DetailsPo detailsPo = new DetailsPo(driver);
        detailsPo.clickRightDetailNavButton(detailsPo.rightDetailNavFees);

        // Click the "Change Fee Plan" button
        FeesPo fees = new FeesPo(driver);
        fees.feesChangeFeePlanButton.click();

        // Select the new fee plan
        fees.feesSelectPlanButton.click();
        fees.feesChangeFeePlanComment.sendKeys("Change Fee Plan");

        //TODO This needs to use a ChangeFeePlanPO, which should extend ActionDialogPO
        //        actionDialog.btnNext.click();  // Submit Button
        //        actionDialog.btnNext.click();  // YES button

        // Test if Successful
        assertThat(fees.feesChangeFeePlanSuccess.getText()).isEqualTo(FeesPo.MESSAGE_CHANGE_FEE_PLAN_SUCCESS_TEXT);

    }

}
