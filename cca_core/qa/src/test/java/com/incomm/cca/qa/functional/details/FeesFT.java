package com.incomm.cca.qa.functional.details;

import com.incomm.cca.qa.pageObject.details.FeesPo;
import com.incomm.cca.qa.pageObject.enums.SearchType;
import org.testng.Assert;
import org.testng.annotations.Test;

/**
 * Created by svukkadapu on 2/5/2017.
 */
public class FeesFT extends DetailsFT {

    @Test
    public void testCurrentFeePlanSummary() {
        navigateToFees(SearchType.VMS_GPR, "5262910010001636"); //TODO This will break, this isn't a serialNumber like navigateToFees expects!
        FeesPo fees = new FeesPo(driver);
        fees.sortByDescription();
        fees.sortByAmount();
        String actual = fees.getCurrentNamePlan();
        String expected = "MYVANILLA VISA FEE PLAN";
        Assert.assertEquals(actual, expected);
    }
}
