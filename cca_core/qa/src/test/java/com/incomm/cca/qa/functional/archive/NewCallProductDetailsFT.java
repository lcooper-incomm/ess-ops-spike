//package com.incomm.cca.qa.functional;
//
//import org.testng.annotations.Test;
//
//import static org.hamcrest.MatcherAssert.assertThat;
//import static org.hamcrest.Matchers.*;
//
///**
// * User: mgalloway
// * Date: 3/26/13
// * Time: 9:47 AM
// */
//public class NewCallProductDetailsFT extends BaseFT {
//
//    final private String ASSIGNMENT_ID = "08a5abac-053e-4946-9baa-a20a00d4baf1";
//    // This comes from Enterprise Tester's Execution Set URI for the given automated test class
//
//    @Test(groups = {"version-2.0.0", "new_call", "details"},  enabled = false, description = "PIN lookup with vendor status")
//    public void testNewCallProductDetailsStatusInactive() {
//
//        String pin = "117821408569869";
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.search("PIN", pin);
//        newCallSearch.autoAddTransitionWait();
//        String statusTitle = newCallProductDetails.getSelectedCardStatusTitle();
//        String redeemableFor = newCallProductDetails.getSelectedCardRedeemableFor();
//        String vendorStatus = newCallProductDetails.getSelectedCardVendorStatus();
//        String platformStatus = newCallProductDetails.getSelectedCardIncommStatus();
//        String vendorStatusColor = newCallProductDetails.getSelectedCardVendorStatusColor();
//        String platformStatusColor = newCallProductDetails.getSelectedCardPlatformStatusColor();
//        assertThat("Selected Card [" + pin + "] Status", statusTitle, is(equalToIgnoringCase("07: Card In use")));
//        assertThat("Selected Card [" + pin + "] Redeemable For", redeemableFor, is(equalToIgnoringCase("TracFone Status")));
//        assertThat("Selected Card [" + pin + "] Vendor Status", vendorStatus, is(equalToIgnoringCase("Redeemed")));
//        assertThat("Selected Card [" + pin + "] Platform Status", platformStatus, is(equalToIgnoringCase("Inactive")));
//        assertThat("Selected Card [" + pin + "] Vendor Status Color", vendorStatusColor, containsString("153, 255, 102"));
//        assertThat("Selected Card [" + pin + "] Platform Status Color", platformStatusColor, containsString("204, 51, 51"));
//
//    }
//
//    @Test(groups = {"version-2.0.0", "new_call", "details"},  enabled = false, description = "PIN lookup with vendor status")
//    public void testNewCallProductDetailsStatusNoVendor() {
//
//        String pin = "63460653203267";
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.search("PIN", pin);
//        newCallSearch.autoAddTransitionWait();
//        String platformStatus = newCallProductDetails.getSelectedCardIncommStatus();
//        String platformStatusColor = newCallProductDetails.getSelectedCardPlatformStatusColor();
//        assertThat("Selected Card [" + pin + "] Vendor Status", newCallProductDetails.getSelectedCardVendorStatus(), is(equalTo("")));
//        assertThat("Selected Card [" + pin + "] Platform Status", platformStatus, is(equalToIgnoringCase("Consumed")));
//        assertThat("Selected Card [" + pin + "] Platform Status Color", platformStatusColor, containsString("153, 255, 102"));
//
//    }
//
//    @Test(groups = {"version-2.0.0", "new_call", "details"},  enabled = false, description = "van16 lookup with vendor status")
//    public void testNewCallProductDetailsStatusActive() {
//
//        String van16 = "0000001016839492";
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.search("Account # (VAN16)", van16);
//        newCallSearch.autoAddTransitionWait();
//        String statusTitle = newCallProductDetails.getSelectedCardStatusTitle();
//        String redeemableFor = newCallProductDetails.getSelectedCardRedeemableFor();
//        String vendorStatus = newCallProductDetails.getSelectedCardVendorStatus();
//        String platformStatus = newCallProductDetails.getSelectedCardIncommStatus();
//        String vendorStatusColor = newCallProductDetails.getSelectedCardVendorStatusColor();
//        String platformStatusColor = newCallProductDetails.getSelectedCardPlatformStatusColor();
//        assertThat("Selected Card [" + van16 + "] Status", statusTitle, is(equalToIgnoringCase("00: Transaction Successful")));
//        assertThat("Selected Card [" + van16 + "] Redeemable For", redeemableFor, is(equalToIgnoringCase("TracFone Status")));
//        assertThat("Selected Card [" + van16 + "] Vendor Status", vendorStatus, is(equalToIgnoringCase("Active")));
//        assertThat("Selected Card [" + van16 + "] Platform Status", platformStatus, is(equalToIgnoringCase("Active")));
//        assertThat("Selected Card [" + van16 + "] Vendor Status Color", vendorStatusColor, containsString("255, 255, 51"));
//        assertThat("Selected Card [" + van16 + "] Platform Status Color", platformStatusColor, containsString("255, 255, 51"));
//
//    }
//
//    @Test(groups = {"version-2.0.0", "new_call", "details"},  enabled = false, description = "Serial lookup with vendor status")
//    public void testNewCallProductDetailsStatusRedeemed() {
//
//        String serial = "1338004934";
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.search("Serial #", serial);
//        newCallSearch.autoAddTransitionWait();
//        String statusTitle = newCallProductDetails.getSelectedCardStatusTitle();
//        String redeemableFor = newCallProductDetails.getSelectedCardRedeemableFor();
//        String vendorStatus = newCallProductDetails.getSelectedCardVendorStatus();
//        String platformStatus = newCallProductDetails.getSelectedCardIncommStatus();
//        String vendorStatusColor = newCallProductDetails.getSelectedCardVendorStatusColor();
//        String platformStatusColor = newCallProductDetails.getSelectedCardPlatformStatusColor();
//        assertThat("Selected Card [" + serial + "] Status", statusTitle, is(equalToIgnoringCase("01: Unknown Card")));
//        assertThat("Selected Card [" + serial + "] Redeemable For", redeemableFor, is(equalToIgnoringCase("TracFone Status")));
//        assertThat("Selected Card [" + serial + "] Vendor Status", vendorStatus, is(equalToIgnoringCase("Other")));
//        assertThat("Selected Card [" + serial + "] Platform Status", platformStatus, is(equalToIgnoringCase("Redeemed")));
//        assertThat("Selected Card [" + serial + "] Vendor Status Color", vendorStatusColor, containsString("255, 153, 51"));
//        assertThat("Selected Card [" + serial + "] Platform Status Color", platformStatusColor, containsString("153, 255, 102"));
//
//    }
//
//    @Test(groups = {"version-2.0.0", "new_call", "details"},  enabled = false, description = "Pin lookup with vendor status")
//     public void testNewCallProductDetailsStatusConsumed() {
//
//        String pin = "192991338129615";
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.search("PIN", pin);
//        newCallSearch.autoAddTransitionWait();
//        String statusTitle = newCallProductDetails.getSelectedCardStatusTitle();
//        String redeemableFor = newCallProductDetails.getSelectedCardRedeemableFor();
//        String vendorStatus = newCallProductDetails.getSelectedCardVendorStatus();
//        String platformStatus = newCallProductDetails.getSelectedCardIncommStatus();
//        String vendorStatusColor = newCallProductDetails.getSelectedCardVendorStatusColor();
//        String platformStatusColor = newCallProductDetails.getSelectedCardPlatformStatusColor();
//        assertThat("Selected Card [" + pin + "] Status", statusTitle, is(equalToIgnoringCase("06: Card is deactive")));
//        assertThat("Selected Card [" + pin + "] Redeemable For", redeemableFor, is(equalToIgnoringCase("TracFone Status")));
//        assertThat("Selected Card [" + pin + "] Vendor Status", vendorStatus, is(equalToIgnoringCase("Inactive")));
//        assertThat("Selected Card [" + pin + "] Platform Status", platformStatus, is(equalToIgnoringCase("Consumed")));
//        assertThat("Selected Card [" + pin + "] Vendor Status Color", vendorStatusColor, containsString("204, 51, 51"));
//        assertThat("Selected Card [" + pin + "] Platform Status Color", platformStatusColor, containsString("153, 255, 102"));
//
//    }
//
//    @Test(groups = {"version-2.0.0", "new_call", "details"}, enabled = false, description = "Pin lookup with InComm status unknown")
//    public void testNewCallProductDetailsStatusUnknown() {
//
//        String pin = "63460653203267";
//        nav.signin();
//        nav.navigateToSearch();
//        newCallSearch.search("PIN", pin);
//        String platformStatus = newCallProductDetails.getSelectedCardIncommStatus();
//        String platformStatusColor = newCallProductDetails.getSelectedCardPlatformStatusColor();
//        assertThat("Selected Card [" + pin + "] Vendor Status", newCallProductDetails.isVendorStatusDisplayed(), is(false));
//        assertThat("Selected Card [" + pin + "] Platform Status", platformStatus, is(equalToIgnoringCase("Consumed")));
//        assertThat("Selected Card [" + pin + "] Platform Status Color", platformStatusColor, containsString("153, 255, 102"));
//
//    }
//
//}
