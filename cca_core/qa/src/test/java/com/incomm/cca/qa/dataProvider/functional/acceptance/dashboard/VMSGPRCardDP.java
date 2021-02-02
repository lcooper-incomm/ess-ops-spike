package com.incomm.cca.qa.dataProvider.functional.acceptance.dashboard;

import org.testng.annotations.DataProvider;

/**
 * Created by gscholes on 5/1/2019
 */
public class VMSGPRCardDP {

    @DataProvider(name = "VMSGPR_CustomerName")
    public static Object[][] VMSGPR_CustomerName() {
        return new Object[][]{
                {"InComm", "Jane", "Smith", "4"},
        };
    }

    @DataProvider(name = "VMSGPR_AccountNumber")
    public static Object[][] VMSGPR_AccountNumber() {
        return new Object[][]{
                {"InComm", "1400000074972", "4"},
        };
    }

    @DataProvider(name = "VMSGPR_CardNumber")
    public static Object[][] VMSGPR_CardNumber() {
        return new Object[][]{
                {"InComm", "4420620303647449", "1"},
        };
    }

    @DataProvider(name = "VMSGPR_SerialNumber")
    public static Object[][] VMSGPR_SerialNumber() {
        return new Object[][]{
                {"InComm", "7562433801", "1"},
        };
    }

    @DataProvider(name = "VMSGPR_SSN")
    public static Object[][] VMSGPR_SSN() {
        return new Object[][]{
                {"InComm", "Sparks", "7777", "59 Results for Last Name: \"Sparks\", SSN: 7777\n"},
        };
    }

    @DataProvider(name = "VMSGPR_DriversLicense")
    public static Object[][] VMSGPR_DriversLicense() {
        return new Object[][]{
                {"InComm", "456789012", "4"},
        };
    }

}
