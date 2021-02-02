package com.incomm.cca.qa.acceptance.dashboard;

import com.incomm.cca.qa.functional.BaseFT;
import com.incomm.cca.qa.pageObject.LoginPO;
import com.incomm.cca.qa.pageObject.dashboard.C2CTransferRequestsPo;
import org.testng.annotations.Test;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Acceptance tests validating the C2C Transfer Requests Widget functionality
 * <p>
 * User: Darren Carpenter (dcarpenter)
 * Date: 8/29/2016
 */
public class C2cTransferRequestsAT extends BaseFT {

    @Test(groups = {"version-5.0.0", "acceptance", "c2cTransferRequests"}, enabled = true)
    public void verifyC2cTransferRequests() {

        LoginPO login = new LoginPO(driver);
        login.defaultSignIn();
        C2CTransferRequestsPo c2cTransferRequests = new C2CTransferRequestsPo(driver);
        assertThat(c2cTransferRequests.isC2cTransferRequestsWidgetDisplayed()).isTrue();

    }

    @Test(groups = {"version-5.0.0", "acceptance", "c2cTransferRequests"}, enabled = true)
    public void verifyC2cTransferRequestsTitle() {

        LoginPO login = new LoginPO(driver);
        login.defaultSignIn();
        C2CTransferRequestsPo c2cTransferRequests = new C2CTransferRequestsPo(driver);
        assertThat(c2cTransferRequests.getC2cTransferRequestsLabelText())
                .containsIgnoringCase(C2CTransferRequestsPo.MESSAGE_C2C_TRANSFER_REQUESTS_WIDGET_HEADER_TEXT);

    }

}
