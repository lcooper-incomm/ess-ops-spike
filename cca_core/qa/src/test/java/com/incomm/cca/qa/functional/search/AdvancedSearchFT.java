package com.incomm.cca.qa.functional.search;

import com.incomm.cca.qa.dataProvider.common.UserData;
import com.incomm.cca.qa.functional.BaseFT;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

/**
 * Functional Test used to test the Advanced Search functionality in CCA
 * <p>
 * User: Darren J. Carpenter (dcarpenter)
 * Date: 5/26/2015
 */
public class AdvancedSearchFT extends BaseFT {

    private boolean setAdvancedSearch(String location, String merchant, String terminal, String phone, String address, String city, String state, String postalCode) throws Exception {
        boolean retVal = false;
        //        try {
        //            webDriverUtil.sendKeys("advSearch.location", location);
        //            webDriverUtil.sendKeys("advSearch.merchant", merchant);
        //            webDriverUtil.sendKeys("advSearch.terminal", terminal);
        //            webDriverUtil.sendKeys("advSearch.phone", phone);
        //            webDriverUtil.sendKeys("advSearch.address", address);
        //            webDriverUtil.sendKeys("advSearch.city", city);
        //            webDriverUtil.sendKeys("advSearch.stateOrProvince", stateOrProvince);
        //            webDriverUtil.sendKeys("advSearch.postalCode", postalCode);
        //            webDriverUtil.click("advSearch.submit");
        //            search.autoSelectWait();
        //            if (phone.length() > 0) {
        //                search.autoSelectWait();
        //            }
        ////            if (webDriverUtil.isElementPresent("search.resultCount")) {
        //                retVal = true;
        //            }
        //        } catch (Exception ex) {
        //            ex.printStackTrace();
        //        }
        return retVal;
    }

    @Test(groups = {"version-3.8.0", "location", "advancedSearch"}, dataProvider = "clearAdvancedSearch", enabled = false)
    public void clearAdvancedSearch(String searchDescription, String location, String merchant, String terminal, String phone, String address, String city, String state, String postalCode, String role, String pwd, String expectedResult) throws Exception {
        //        nav.signin(role, pwd, true);
        //        webDriverUtil.click("navBar.Search");
        //        webDriverUtil.click("advSearch.showAdvancedSearch");
        //        boolean retVal = false;
        //        boolean shouldPass = false;
        //        if (expectedResult.equals("PASS")) {
        //            shouldPass = true;
        //        }
        //        webDriverUtil.sendKeys("advSearch.location", location);
        //        webDriverUtil.sendKeys("advSearch.merchant", merchant);
        //        webDriverUtil.sendKeys("advSearch.terminal", terminal);
        //        webDriverUtil.sendKeys("advSearch.phone", phone);
        //        webDriverUtil.sendKeys("advSearch.address", address);
        //        webDriverUtil.sendKeys("advSearch.city", city);
        //        webDriverUtil.sendKeys("advSearch.stateOrProvince", stateOrProvince);
        //        webDriverUtil.sendKeys("advSearch.postalCode", postalCode);
        //        webDriverUtil.click("advSearch.clear");
        //        webDriverUtil.click("advSearch.submit");
        //        search.autoSelectWait();
        //        if (webDriverUtil.isElementPresent("search.noLocationResult")){
        //            retVal = true;
        //        }
        //        assertThat(searchDescription, retVal, is(shouldPass));
    }

    @Test(groups = {"version-3.8.0", "location", "advancedSearch"}, dataProvider = "clearFilterTextField", enabled = false)
    public void clearFilterTextField(String searchDescription, String merchant, String filterText, String sessionNotes, String role, String pwd, String expectedResult) {
        //        boolean retVal = false;
        //        boolean shouldPass = false;
        //        if (expectedResult.equals("PASS")) {
        //            shouldPass = true;
        //        }
        ////        nav.signin(role, pwd, true);
        //        webDriverUtil.click("navBar.Search");
        //        webDriverUtil.click("advSearch.showAdvancedSearch");
        //        webDriverUtil.sendKeys("advSearch.merchant", merchant);
        //        webDriverUtil.click("advSearch.submit");
        ////        search.autoSelectWait();
        //        webDriverUtil.click("search.listButton");
        ////        search.autoSelectWait();
        //        webDriverUtil.sendKeys("search.filter", filterText);
        //        webDriverUtil.click("search.listFirstRowProdID");
        //        webDriverUtil.sendKeys("session.notes", sessionNotes);
        //        webDriverUtil.click("session.close");
        ////        search.submit("Name", merchant);
        //        webDriverUtil.click("search.listButton");
        //        search.autoSelectWait();
        //        String textFromFilter = webDriverUtil.getAttribute("search.filter", "value");
        //        if ("".equals(textFromFilter)){
        //            retVal = true;
        //        }
        //        assertThat(searchDescription, retVal, is(shouldPass));
    }

    @DataProvider(name = "advancedSearch")
    private Object[][] advancedSearch() {
        return new Object[][]{
                {"Full String Search: Location", "OFFICE DEPOT #2187", "", "", "", "", "", "", "", UserData.MANAGER3.getUsername(), UserData.MANAGER3.getPassword(), "PASS"},
                {"Partial String Search: Location", "", "office depot", "", "", "", "", "", "", UserData.MANAGER3.getUsername(), UserData.MANAGER3.getPassword(), "PASS"},
                {"Full String Search: Merchant", "", "Walmart", "", "", "", "", "", "", UserData.MANAGER3.getUsername(), UserData.MANAGER3.getPassword(), "PASS"},
                {"Partial String Search: Merchant", "", "Wal", "", "", "", "", "", "", UserData.MANAGER3.getUsername(), UserData.MANAGER3.getPassword(), "PASS"},
                {"Full String Search: Terminal", "", "", "CVS00000709", "", "", "", "", "", UserData.MANAGER3.getUsername(), UserData.MANAGER3.getPassword(), "PASS"},
                {"Partial String Search: Terminal", "", "", "126", "", "", "", "", "", UserData.MANAGER3.getUsername(), UserData.MANAGER3.getPassword(), "FAIL"},
                {"Full String Search: Phone", "", "", "", "(970) 728-6500", "", "", "", "", UserData.MANAGER3.getUsername(), UserData.MANAGER3.getPassword(), "PASS"},
                {"Full String Search: Address", "", "", "", "", "7305 East 36th Avenue", "", "", "", UserData.MANAGER3.getUsername(), UserData.MANAGER3.getPassword(), "PASS"},
                {"Partial String Search: Address", "", "", "", "", "7305 East", "", "", "", UserData.MANAGER3.getUsername(), UserData.MANAGER3.getPassword(), "PASS"},
                {"Full String Search: City", "", "", "", "", "", "DENVER", "", "", UserData.MANAGER3.getUsername(), UserData.MANAGER3.getPassword(), "PASS"},
                {"Partial String Search: City", "", "", "", "", "", "xxxxxxxxxxxxxxxxxxxxxxxxx", "", "", UserData.MANAGER3.getUsername(), UserData.MANAGER3.getPassword(), "FAIL"},
                {"Full String Search: State", "", "", "", "", "", "", "CO", "", UserData.MANAGER3.getUsername(), UserData.MANAGER3.getPassword(), "PASS"},
                {"Partial String Search: State", "", "", "", "", "", "", "xxxxxxxxxxxxxxxxxxxxxxxxx", "", UserData.MANAGER3.getUsername(), UserData.MANAGER3.getPassword(), "FAIL"},
                {"Full String Search: Postal Code", "", "", "", "", "", "", "", "84062", UserData.MANAGER3.getUsername(), UserData.MANAGER3.getPassword(), "PASS"},
                {"Partial String Search: Postal Code", "", "", "", "", "", "", "", "840", UserData.MANAGER3.getUsername(), UserData.MANAGER3.getPassword(), "PASS"},
                {"Full Object Search", "OFFICE DEPOT #2187", "Office Depot", "", "", "7305 East 36th Avenue", "Denver", "", "80238", UserData.MANAGER3.getUsername(), UserData.MANAGER3.getPassword(), "PASS"}
        };

    }

    @DataProvider(name = "clearAdvancedSearch")
    private Object[][] clearAdvancedSearch() {
        return new Object[][]{
                {"Clear Advanced Search Fields", "OFFICE DEPOT #2187", "Office Depot", "CVS00000709", "(970) 728-6500", "7305 East 36th Avenue", "Denver", "CO", "80238", UserData.MANAGER3.getUsername(), UserData.MANAGER3.getPassword(), "PASS"}
        };
    }

    @DataProvider(name = "clearFilterTextField")
    private Object[][] clearFilterTextField() {
        return new Object[][]{
                {"Clear the Filter Text Field", "Office", "2449", "test", UserData.MANAGER3.getUsername(), UserData.MANAGER3.getPassword(), "PASS"}
        };
    }
}
