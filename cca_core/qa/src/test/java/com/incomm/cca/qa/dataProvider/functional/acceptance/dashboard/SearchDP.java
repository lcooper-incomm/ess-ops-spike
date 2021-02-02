package com.incomm.cca.qa.dataProvider.functional.acceptance.dashboard;

import com.incomm.cca.qa.pageObject.enums.SearchType;
import com.incomm.cca.qa.pageObject.search.parameter.FastCardSearchQueryPanelPO;
import com.incomm.cca.qa.pageObject.search.parameter.FinancialGiftSearchQueryPanelPo;
import com.incomm.cca.qa.pageObject.search.parameter.VMSGPRSearchQueryPanelPo;
import org.testng.annotations.DataProvider;

public class SearchDP {

    @DataProvider(name = "searchTypeParameters")
    public static Object[][] searchTypeParameters() {
        return new Object[][]{
                {"Verify Fastcard Parameters", SearchType.FASTCARD, FastCardSearchQueryPanelPO.PARAMETERS},
                {"Verify Financial Gift Parameters", SearchType.FINANCIAL_GIFT, FinancialGiftSearchQueryPanelPo.PARAMETERS},
                {"Verify VMS VMS_GPR Parameters", SearchType.VMS_GPR, VMSGPRSearchQueryPanelPo.PARAMETERS},
                //			{ "Verify VRN Parameters", SearchType.VRN, VRNSearchParametersPO.PARAMETERS },
                //			{ "Verify Vanilla Direct Parameters", SearchType.VANILLA, VanillaSearchParametersPO.PARAMETERS },
                //			{ "Verify BOL Parameters", SearchType.BOL, BOLSearchParametersPO.PARAMETERS },
                //			{ "Verify DDP Parameters", SearchType.DDP, DDPSearchParametersPO.PARAMETERS },
                //			{ "Verify E-commerce Parameters", SearchType.ECOMM, ECommSearchParametersPO.PARAMETERS }
                //			{ "Verify VMS Gift Card Parameters", SearchType.VMS_GIFT, VMSGiftCardSearchParametersPO.PARAMETERS },
                //			{ "Verify Location Parameters", SearchType.LOCATION, LocationSearchParametersPO.PARAMETERS },
                //			{ "Verify JIRA Parameters", SearchType.JIRA, JIRASearchParametersPO.PARAMETERS },
                //			{ "Verify Session Parameters", SearchType.SESSION, SessionSearchParametersPO.PARAMETERS },
        };
    }

    @DataProvider(name = "requiredFields")
    public static Object[][] requiredFields() {
        return new Object[][]{
                {"Verify VMS_GPR Parameters", SearchType.VMS_GPR},
                {"Verify Location Parameters", SearchType.LOCATION},
                {"Verify Fastcard Parameters", SearchType.FASTCARD},
                {"Verify Financial Parameters", SearchType.FINANCIAL_GIFT},
                {"Verify VRN Parameters", SearchType.VRN},
                {"Verify DDP Parameters", SearchType.DDP}
        };
    }

    @DataProvider(name = "locationParameters")
    public static Object[][] locationParameters() {
        return new Object[][]{
                {"Verify Merchant Name", "Merchant Name", "Best Buy", "1000"},
                {"Verify Location Name", "Location Name", "OFFICE DEPOT #218", "8"},
                {"Verify Terminal ID", "Terminal ID", "CVS00000709", "1"},
                {"Verify Phone Number", "Phone Number", "9707286500", "1"},
                {"Verify Street Name", "Street Name", "5540 South Parker Road", "1"},
                {"Verify City", "City", "Denver", "649"},
                {"Verify State", "State", "Colorado (CO)", "1000"},
                {"Verify Street Name", "Postal Code", "80015", "43"}
        };
    }

    @DataProvider(name = "VMSGiftParameters")
    public static Object[][] VMSGiftParameters() {
        return new Object[][]{
                {"Verify Account Number", "Account Number", "3780000000000067", "1"},
                {"Verify Card Number", "Card Number", "377935000000010", "1"},
                {"Verify Serial Number", "Serial Number", "7679326581", "1"}
        };
    }

    @DataProvider(name = "VRNParameters")
    public static Object[][] VRNParameters() {
        return new Object[][]{
                {"Verify Control Number", "Control Number", "6394190000000017815", "0"},
                {"Verify PAN", "PAN", "5113171926091762", "0"}
        };
    }

    @DataProvider(name = "PromoParameters")
    public static Object[][] PromoParameters() {
        return new Object[][]{
                {"Verify Promo Code", "Promo Code", "VVPFHTK", "1"}
        };
    }

    @DataProvider(name = "PaypalParameters")
    public static Object[][] PaypalParameters() {
        return new Object[][]{
                {"Verify Account Number", "Account Number", "V2KNUJP66TS2L", "0"},
                {"Verify Email", "Email", "nbird@incomm.com", "0"}
        };
    }

    @DataProvider(name = "DDPParameters")
    public static Object[][] DDPParameters() {
        return new Object[][]{
                {"Verify Transaction ID", "Transaction ID", "1385319331", "0"},
                {"Verify PAN", "PAN", "0000005068328097", "0"},
                {"Verify PIN", "PIN", "6010768804", "0"},
                {"Verify Serial Number", "Serial Number", "3392298441", "0"}
        };
    }

    @DataProvider(name = "JiraParameters")
    public static Object[][] JiraParameters() {
        return new Object[][]{
                // No valid data
                //			{ "Verify Reference ID", "Reference ID", "1385319331", "0" },
                //			{ "Verify Customer Name", "Customer Name", "0000005068328097", "0" }
        };
    }

    @DataProvider(name = "VanillaParameters")
    public static Object[][] VanillaParameters() {
        return new Object[][]{
                {"Verify Account Number", "Account Number", "799366320550006371681612154995", "1"}
        };
    }

    @DataProvider(name = "EcommParameters")
    public static Object[][] EcommParameters() {
        return new Object[][]{
                {"Verify Order Number", "Order Number", "000000067", "1"},
                {"Verify Shipment Number", "Shipment Number", "000000011", "1"},
                {"Verify Serial Number", "Serial Number", "799366320550006371681612154995", "1"},
                {"Verify Name", "Name", "Brian Jennings", "58"},
                {"Verify Email", "Email", "bjennings@incomm.com", "62"},
                {"Verify Last Four", "Last Four", "Jennings 1111", "59"},
        };
    }

    @DataProvider(name = "EcommDetailParameters")
    public static Object[][] EcommDetailParameters() {
        return new Object[][]{
                {"Verify Order Number", "Order Number", "000000067", "201803230056"},
                {"Verify Shipment Number", "Shipment Number", "000000011", "201804130642"},
                {"Verify Serial Number", "Serial Number", "9000001574", "201804130642"},
                {"Verify Name", "Name", "Brian Jennings", "201803230056"},
                {"Verify Email", "Email", "bjennings@incomm.com", "201803230056"},
                {"Verify Last Four", "Last Four", "Jennings 1111", "201803230056"},
        };
    }

    @DataProvider(name = "FastCard_transactionID")
    public static Object[][] FastCard_transactionID() {
        return new Object[][]{
                {"Valid input, empty results", "682228660", "0 Results for Transaction ID: \"682228660\"\n"},
        };
    }

    @DataProvider(name = "FastCard_controlNumber")
    public static Object[][] FastCard_controlNumber() {
        return new Object[][]{
                {"Valid input, empty results", "6394190000000023292", "0 Results for Control Number: \"6394190000000023292\"\n"},
        };
    }

    @DataProvider(name = "FastCard_vendorSerialNumber")
    public static Object[][] FastCard_vendorSerialNumber() {
        return new Object[][]{
                {"Valid input, empty results", "999192938444", "0 Results for Serial Number: \"5135149453\"\n"},
        };
    }

    @DataProvider(name = "FastCard_proxyNumber")
    public static Object[][] FastCard_proxyNumber() {
        return new Object[][]{
                {"Valid input, empty results", "5135149453", "0 Results for Proxy Number: \"5135149453\"\n"},
        };
    }

    @DataProvider(name = "FastCard_pinNumber")
    public static Object[][] FastCard_pinNumber() {
        return new Object[][]{
                {"Valid input, Valid results", "9679082313", "45332 - Verizon V17"},
        };
    }

    @DataProvider(name = "FastCard_vanNumber")
    public static Object[][] FastCard_vanNumber() {
        return new Object[][]{
                {"Valid input, Valid results", "0000008912757530", "45332 - Verizon V17"},
        };
    }

    @DataProvider(name = "FastCard_serialNumber")
    public static Object[][] FastCard_serialNumber() {
        return new Object[][]{
                {"Valid input, Valid results", "8912757530", "45332 - Verizon V17"},
        };
    }

    @DataProvider(name = "FinancialGift_preAuthKey")
    public Object[][] FinancialGift_preAuthKey() {
        return new Object[][]{
                {"MCC000136", "Galielio Canada Shell Prepaid Mastercard"}
        };
    }

    @DataProvider(name = "FinancialGift_transactionId")
    public Object[][] FinancialGift_transactionId() {
        return new Object[][]{
                {"1221293881", "Vanilla Visa Intl"}
        };
    }

    @DataProvider(name = "FinancialGift_can")
    public Object[][] FinancialGift_can() {
        return new Object[][]{
                {"244251838", "MEIJER NEXTWORTH Electronics DSCV RAN"}
        };
    }

    @DataProvider(name = "FinancialGift_van")
    public Object[][] FinancialGift_van() {
        return new Object[][]{
                {"5049986599064773", "Anne Geddes Visa - New Flower"}
        };
    }

    @DataProvider(name = "FinancialGift_cardNumber")
    public Object[][] FinancialGift_cardNumber() {
        return new Object[][]{
                {"5214440155858029", "Variable MC Online Billpay Handle"}
        };
    }

    @DataProvider(name = "FinancialGift_serialNumber")
    public Object[][] FinancialGift_serialNumber() {
        return new Object[][]{
                {"1732626480", "Vanilla Visa Intl"}
        };
    }

}
