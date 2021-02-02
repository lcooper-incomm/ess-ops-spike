package com.incomm.cca.qa.acceptance;

import com.incomm.cca.qa.functional.BaseFT;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

/**
 * Help Pane Acceptance Tests
 * User: mgalloway
 * Date: 7/25/13
 * Time: 9:19 AM
 */
public class NewCallHelpPaneAT extends BaseFT {

    @Test(groups = {"version-2.1.0", "in-progress", "new_call"}, enabled = false)
    public void testNewCallDetailsHelpPaneHide() {

    }

    @Test(groups = {"version-2.1.0", "in-progress", "new_call"}, enabled = false)
    public void testNewCallDetailsHelpPane() {

    }

    @Test(groups = {"version-2.1.0", "in-progress", "new_call"}, dataProvider = "helpSections", enabled = false)
    public void testNewCallDetailsHelpSections(String helpSection) {

    }

    @DataProvider(name = "helpSections")
    private Object[][] helpSections() {
        return new Object[][]{
                {"phone"},
                {"apps"},
                {"externalLinks"}
        };
    }

}
