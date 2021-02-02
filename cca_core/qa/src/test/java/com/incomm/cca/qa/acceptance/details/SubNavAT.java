package com.incomm.cca.qa.acceptance.details;

import com.incomm.cca.qa.functional.BaseFT;
import com.incomm.cca.qa.pageObject.NavigationPO;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

/**
 * Created by Matt on 5/27/2014.
 */
public class SubNavAT extends BaseFT {

    @Test(groups = {"version-3.0.0", "acceptance", "details"}, enabled = false)
    public void subNavMultipleItems() throws InterruptedException {

        String locationName = "0075 - Holiday";
        String locationMerchant = "Holiday Station Stores";
        String product1 = "1000000743";
        String productDescription1 = "OneVanilla Visa Intl Var   ";
        String product2 = "670413042";
        String productDescription2 = "$50 Specialty Card (Online)   ";

        //        nav.signin();
        //        search.submit("Location", locationName);
        //        assertThat("Single result is auto selected", search.autoSelectWait(), is(equalTo(false)));
        //        session.closeSessionDrawer();
        //
        //        nav.navigateToSearch();
        //        webDriverUtil.formElementHandler("search-identifier-type", constants.QS_SEARCHGROUP_FASTCARD_PIN, null);
        //        webDriverUtil.formElementHandler("serialNumber", product1, null);
        //        webDriverUtil.formElementHandler("advanced-search-form-submit", "Select", null);
        //        search.autoSelectWait();
        //
        //        List<String> descriptions = details.getAllSubNavButtonDescriptions();
        //        assertThat("Two items are still selected", descriptions.size(), is(equalTo(2)));
        //        assertThat("Expected Location still selected", descriptions, hasItem(locationName + "  - " + locationMerchant));
        //        assertThat("Expected Product still selected", descriptions, hasItem(productDescription1));
        //
        //        nav.navigateToSearch();
        //        webDriverUtil.formElementHandler("search-identifier-type", constants.QS_SEARCHGROUP_FASTCARD_PIN, null);
        //        webDriverUtil.formElementHandler("serialNumber", product2, null);
        //        webDriverUtil.formElementHandler("advanced-search-form-submit", "Select", null);
        //        search.autoSelectWait();
        //
        //        List<String> descriptionsUpdated = details.getAllSubNavButtonDescriptions();
        //        assertThat("Three items are still selected", descriptionsUpdated.size(), is(equalTo(3)));
        //        assertThat("Expected Location still selected", descriptionsUpdated, hasItem(locationName + "  - " + locationMerchant));
        //        assertThat("Expected Product 1 still selected", descriptionsUpdated, hasItem(productDescription1));
        //        assertThat("Expected Product 2 still selected", descriptionsUpdated, hasItem(productDescription2));
        //
        //        assertThat("The last item searched for is found first in the sub-nav", webDriverUtil.getText("card.subNav.tabMerchantName.0").trim(), is(equalTo(productDescription2.trim())));
    }

    // FIXME: 3/18/2019 - Broken because of refactoring. NavigationPo contains DashboardPo
    @Test(groups = {"version-3.0.0", "acceptance", "details"}, enabled = false)
    public void subNavNavigationBetweenMultipleItems() {

        String locationName = "0075 - Holiday";
        String product1 = "7446617169";
        String product2 = "272651067";

        //        nav.signin();
        //
        //        // Location Item
        //        search.submit("Location", locationName);
        //        assertThat("Single result is auto selected", search.autoSelectWait(), is(equalTo(false)));
        //        assertThat("Item Details loads", details.itemDetailsWait(), is(equalTo("SUMMARY: success HISTORY: success")));
        //        session.closeSessionDrawer();
        //        assertThat("Last Search Result auto selected", detailsLocationSummary.getLocationName(), is(containsString(locationName)));
        //
        //        // Product 1 Item
        //        nav.navigateToSearch();
        //        webDriverUtil.formElementHandler("search-identifier-type", constants.QS_SEARCHGROUP_FASTCARD_PIN, null);
        //        webDriverUtil.formElementHandler("pin", product1, null);
        //        webDriverUtil.formElementHandler("advanced-search-form-submit", "Select", null);
        //        search.autoSelectWait();
        //        assertThat("Item Details loads", details.itemDetailsWait(), is(equalTo("SUMMARY: success HISTORY: success")));
        //        assertThat("Last Search Result auto selected", detailsProductSummary.getPin(), is(equalTo(product1)));
        //
        //        // Product 2 Item
        //        nav.navigateToSearch();
        //        webDriverUtil.formElementHandler("search-identifier-type", constants.QS_SEARCHGROUP_FASTCARD_PIN, null);
        //        webDriverUtil.click("search.clearButton");
        //        webDriverUtil.formElementHandler("serialNumber", product2, null);
        //        webDriverUtil.formElementHandler("advanced-search-form-submit", "Select", null);
        //        search.autoSelectWait();
        //        session.closeSessionDrawer();
        //        assertThat("Item Details loads", details.itemDetailsWait(), is(equalTo("SUMMARY: success HISTORY: success")));
        //        assertThat("Last Search Result auto selected", detailsProductSummary.getSerialNumber(), is(equalTo(product2)));

        NavigationPO nav = new NavigationPO(driver);
        nav.navigateToDashboard();
        //		nav.navigateToDetails();

        //        // Click back to location item
        //        webDriverUtil.click("card.subNav.tab.2");
        //        assertThat("Location Item Details displayed", detailsLocationSummary.getLocationName(), is(containsString(locationName)));
        //
        //        // Click back to Product 1 item
        //        webDriverUtil.click("card.subNav.tab.1");
        //        assertThat("Product 1 Item Details displayed", detailsProductSummary.getPin(), is(equalTo(product1)));
        //
        //        // Click back to Product 2 item
        //        webDriverUtil.click("card.subNav.tab.0");
        //        assertThat("Product 2 Item Details displayed", detailsProductSummary.getSerialNumber(), is(equalTo(product2)));
    }

    @Test(groups = {"version-3.0.0", "acceptance", "details"}, enabled = false)
    public void subNavMoreButton() {

        Map<Integer, Map<String, String>> items = new HashMap<>();
        items.put(0, new HashMap<String, String>() {{
            put("type", "Location");
            put("identifier", "30850");
            put("item", "0075 - Holiday");
        }});
        items.put(1, new HashMap<String, String>() {{
            put("type", "PIN");
            put("identifier", "3281606392");
            put("item", "117821408569869");
        }});
        items.put(2, new HashMap<String, String>() {{
            put("type", "Serial Number");
            put("identifier", "4753612373");
            put("item", "4753612373");
        }});
        items.put(3, new HashMap<String, String>() {{
            put("type", "VAN (16/19)");
            put("identifier", "4137395013465473");
            put("item", "5049988282269982");
        }});
        items.put(4, new HashMap<String, String>() {{
            put("type", "Terminal ID");
            put("identifier", "341160");
            put("item", "DeptPromos");
        }});
        items.put(5, new HashMap<String, String>() {{
            put("type", "Serial Number");
            put("identifier", "259873385");
            put("item", "259873385");
        }});
        items.put(6, new HashMap<String, String>() {{
            put("type", "Serial Number");
            put("identifier", "4641148991");
            put("item", "2159758245");
        }});
        items.put(7, new HashMap<String, String>() {{
            put("type", "Serial Number");
            put("identifier", "3428720218");
            put("item", "3428720218");
        }});

        Iterator searchTypes = items.keySet()
                                    .iterator();

        //        nav.signin();
        //        Boolean first = true;
        //        while(searchTypes.hasNext()) {
        //            Object current = searchTypes.next();
        //            search.submit(items.get(current).get("type"), items.get(current).get("item")); //These will be Quick Searches
        //            assertThat("Single result is auto selected", search.autoSelectWait(), is(equalTo(false)));
        //            if(first.equals(true)) {
        //                session.closeSessionDrawer();
        //            }
        //            nav.navigateToSearch();
        //            webDriverUtil.click("search.clearButton");
        //            nav.navigateToDashboard();
        //            first = false;
        //        }
        //        nav.navigateToDetails();
        //        assertThat("Sub Nav MORE button is displayed", details.isSubNavMoreButtonDisplayed(), is(true));
        //        assertThat("Sub Nav MORE button is expanded", details.isSubNavMoreButtonExpanded(), is(false));
    }

    @Test(groups = {"version-3.0.0", "acceptance", "details"}, dataProvider = "checkSubNavMoreText", enabled = false)
    public void subNavNavigationBetweenSubNavMore(String searchDescription, int windowWidth, String buttonText) {

        Map<Integer, Map<String, String>> items = new HashMap<>();
        items.put(0, new HashMap<String, String>() {{
            put("type", "Location");
            put("identifier", "30850");
            put("item", "0075 - Holiday");
        }});
        items.put(1, new HashMap<String, String>() {{
            put("type", "PIN");
            put("identifier", "3281606392");
            put("item", "117821408569869");
        }});
        items.put(2, new HashMap<String, String>() {{
            put("type", "Serial Number");
            put("identifier", "4753612373");
            put("item", "4753612373");
        }});
        items.put(3, new HashMap<String, String>() {{
            put("type", "VAN (16/19)");
            put("identifier", "4137395013465473");
            put("item", "5049988282269982");
        }});
        items.put(4, new HashMap<String, String>() {{
            put("type", "Terminal ID");
            put("identifier", "341160");
            put("item", "DeptPromos");
        }});
        items.put(5, new HashMap<String, String>() {{
            put("type", "Serial Number");
            put("identifier", "259873385");
            put("item", "259873385");
        }});
        items.put(6, new HashMap<String, String>() {{
            put("type", "Serial Number");
            put("identifier", "4641148991");
            put("item", "2159758245");
        }});
        items.put(7, new HashMap<String, String>() {{
            put("type", "Serial Number");
            put("identifier", "3428720218");
            put("item", "3428720218");
        }});

        Iterator searchTypes = items.keySet()
                                    .iterator();

        //        nav.signin();
        //        Boolean first = true;
        //        while(searchTypes.hasNext()) {
        //            Object current = searchTypes.next();
        //            search.submit(items.get(current).get("type"), items.get(current).get("item")); //These will be Quick Searches
        //            assertThat("Single result is auto selected", search.autoSelectWait(), is(equalTo(false)));
        //            if(first.equals(true)) {
        //                session.closeSessionDrawer();
        //            }
        //            nav.navigateToSearch();
        //            webDriverUtil.waitAndClick("search.clearButton");
        //            nav.navigateToDashboard();
        //            first = false;
        //        }
        //        nav.navigateToDetails();
        //
        //        Dimension initialWindowSize = driver.manage().window().getSize();
        //        driver.manage().window().setSize(new Dimension(windowWidth, initialWindowSize.getHeight()));
        //        assertThat(searchDescription, details.getSubNavMoreButtonText(), containsString("(" + buttonText + ")"));
        //
        //        assertThat("Sub Nav MORE button is expanded", details.isSubNavMoreButtonExpanded(), is(false));
        //        assertThat("Sub Nav MORE button is active", details.isSubNavMoreButtonActive(), is(false));
        //        details.clickSubNavMore();
        //        assertThat("Sub Nav MORE button is expanded", details.isSubNavMoreButtonExpanded(), is(true));
        //        webDriverUtil.click("card.subNav.tab.7");
        //        assertThat("Sub Nav MORE button is active", details.isSubNavMoreButtonActive(), is(true));
        //
        //        try {
        //            webDriverUtil.isVisableClick("details.summary.tab");
        //        } catch (Exception e) {
        //            e.printStackTrace();
        //        }
        //
        //        assertThat("Expected item is now selected", webDriverUtil.getText("details.summary.location"), is(containsString("0075 - Holiday")));
        //        driver.manage().window().maximize();
    }

    @DataProvider(name = "checkSubNavMoreText")
    private Object[][] checkSubNavMoreText() {
        return new Object[][]{
                {"Sub Nav MORE button text SMALL Window", 1000, "4"},
                {"Sub Nav MORE button text LARGE Window", 1920, "2"}
        };
    }

}
