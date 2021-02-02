package com.incomm.cca.qa.acceptance;

import com.incomm.cca.qa.functional.BaseFT;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

/**
 * Created by mgalloway on 5/14/2014.
 */
public class HelpAT extends BaseFT {

    @Test(groups = {"version-3.0.0", "in-progress", "help"}, enabled = false)
    public void testNewCallDetailsHelpReferenceInfo() {

    }

    @Test(groups = {"version-3.0.0", "in-progress", "help"}, dataProvider = "queueLocations", enabled = false)
    public void testNewCallDetailsQueueDriveHelp(String location) {

    }

    @Test(groups = {"version-3.0.0", "in-progress", "help"}, dataProvider = "queueLocations", enabled = false)
    public void testNewCallDetailsDefaultQueueHelp(String location) {

    }

    @Test(groups = {"version-3.0.0", "in-progress", "help"}, enabled = false)
    public void detailsAutoWriteAppNotes() {

    }

    @Test(groups = {"version-3.0.0", "in-progress", "help"}, enabled = false)
    public void testNewCallDetailsAutoWriteAppNotesSaved() {

    }

    @DataProvider(name = "queueLocations")
    private Object[][] queueLocations() {
        return new Object[][]{
                {"JAX"},
                {"NOR"}
        };
    }

}
