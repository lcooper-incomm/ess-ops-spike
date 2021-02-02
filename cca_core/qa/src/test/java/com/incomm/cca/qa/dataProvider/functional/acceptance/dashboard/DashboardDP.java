package com.incomm.cca.qa.dataProvider.functional.acceptance.dashboard;

import com.incomm.cca.qa.pageObject.dashboard.QuickLookupPo;
import com.incomm.cca.qa.pageObject.dashboard.QuickSearchPo;
import org.testng.annotations.DataProvider;

public class DashboardDP {

    @DataProvider(name = "quickSearchData")
    public static Object[][] quickSearchData() {
        return new Object[][]{
                {QuickSearchPo.OptionGroup.DDP, QuickSearchPo.Option.PAN, "0000005068328097", 0},
                {QuickSearchPo.OptionGroup.DDP, QuickSearchPo.Option.PIN, "6010768804", 0},
                {QuickSearchPo.OptionGroup.DDP, QuickSearchPo.Option.SERIAL_NUMBER, "3392298441", 0},
                {QuickSearchPo.OptionGroup.DDP, QuickSearchPo.Option.TRANSACTION_ID, "1385319331", 0},

                {QuickSearchPo.OptionGroup.FASTCARD, QuickSearchPo.Option.CONTROL_NUMBER_MIN, "6394190000000023292", 0},
                {QuickSearchPo.OptionGroup.FASTCARD, QuickSearchPo.Option.PIN, "9679082313", 1},
                {QuickSearchPo.OptionGroup.FASTCARD, QuickSearchPo.Option.PROXY_ID, "5135149453", 0},
                {QuickSearchPo.OptionGroup.FASTCARD, QuickSearchPo.Option.SERIAL_NUMBER, "8912757530", 1},
                {QuickSearchPo.OptionGroup.FASTCARD, QuickSearchPo.Option.TRANSACTION_ID, "682228660", 0},
                {QuickSearchPo.OptionGroup.FASTCARD, QuickSearchPo.Option.VAN, "0000008912757530", 1},
                {QuickSearchPo.OptionGroup.FASTCARD, QuickSearchPo.Option.VENDOR_SERIAL_NUMBER, "999192938444", 0},

                {QuickSearchPo.OptionGroup.FINANCIAL_GIFT, QuickSearchPo.Option.CAN, "244251838", 1},
                {QuickSearchPo.OptionGroup.FINANCIAL_GIFT, QuickSearchPo.Option.CARD_NUMBER, "5214440155858029", 1},
                {QuickSearchPo.OptionGroup.FINANCIAL_GIFT, QuickSearchPo.Option.PREAUTH_KEY, "MCC000136", 1},
                {QuickSearchPo.OptionGroup.FINANCIAL_GIFT, QuickSearchPo.Option.SERIAL_NUMBER, "4810506679", 1},
                {QuickSearchPo.OptionGroup.FINANCIAL_GIFT, QuickSearchPo.Option.TRANSACTION_ID, "1221297091", 1},
                {QuickSearchPo.OptionGroup.FINANCIAL_GIFT, QuickSearchPo.Option.VAN, "5049986599064773", 1},

                //			{ QuickSearchPo.OptionGroup.JIRA, QuickSearchPo.Option.CUSTOMER_NAME, "Rose Mitchell", 1 },
                //			{ QuickSearchPo.OptionGroup.JIRA, QuickSearchPo.Option.REFERENCE_ID, "VSACUSTSERV-738298", 1 },

                {QuickSearchPo.OptionGroup.LOCATION, QuickSearchPo.Option.LOCATION, "OFFICE DEPOT #218", 8},
                {QuickSearchPo.OptionGroup.LOCATION, QuickSearchPo.Option.MERCHANT, "OFFICE DEPOT", 1000},
                {QuickSearchPo.OptionGroup.LOCATION, QuickSearchPo.Option.PHONE_NUMBER, "9707286500", 1},
                {QuickSearchPo.OptionGroup.LOCATION, QuickSearchPo.Option.TERMINAL_ID, "CVS00000709", 1},

                {QuickSearchPo.OptionGroup.PAYPAL, QuickSearchPo.Option.ACCOUNT_NUMBER, "V2KNUJP66TS2L", 0},
                {QuickSearchPo.OptionGroup.PAYPAL, QuickSearchPo.Option.EMAIL_ADDRESS, "nbird@incomm.com", 0},

                //			{ QuickSearchPo.OptionGroup.PROMOTIONS, QuickSearchPo.Option.ORDER_CONFIRMATION_ID, "38175", 1 },
                {QuickSearchPo.OptionGroup.PROMOTIONS, QuickSearchPo.Option.PROMO_CODE, "VVPFHTK", 1},

                {QuickSearchPo.OptionGroup.VANILLA_DIRECT, QuickSearchPo.Option.ACCOUNT_NUMBER, "799366320550006371681612154995", 1},

                {QuickSearchPo.OptionGroup.VMS_GIFT_CARD, QuickSearchPo.Option.ACCOUNT_NUMBER, "3780000000000067", 1},
                {QuickSearchPo.OptionGroup.VMS_GIFT_CARD, QuickSearchPo.Option.CARD_NUMBER, "377935000000010", 1},
                {QuickSearchPo.OptionGroup.VMS_GIFT_CARD, QuickSearchPo.Option.SERIAL_NUMBER, "7679326581", 1},

                {QuickSearchPo.OptionGroup.VMS_GPR, QuickSearchPo.Option.ACCOUNT_NUMBER, "1400000074972", 4},
                {QuickSearchPo.OptionGroup.VMS_GPR, QuickSearchPo.Option.CARD_NUMBER, "4420620303647449", 1},
                {QuickSearchPo.OptionGroup.VMS_GPR, QuickSearchPo.Option.CUSTOMER_NAME, "Emily Carter", 354},
                {QuickSearchPo.OptionGroup.VMS_GPR, QuickSearchPo.Option.SERIAL_NUMBER, "7562433801", 1},

                {QuickSearchPo.OptionGroup.VRN, QuickSearchPo.Option.CONTROL_NUMBER, "6394190000000017815", 0},
                {QuickSearchPo.OptionGroup.VRN, QuickSearchPo.Option.PAN, "5113171926091762", 0}

                // The SN for this url encoded cardNumber is: 4952963049 if urlEncoding problem fails check that the SN still can pull up the card.
                //			{ QuickSearchPo.OptionGroup.FINANCIAL_GIFT, QuickSearchPo.Option.CARD_NUMBER, "4056209344667482", 1 } //Unexpected error

        };
    }

    @DataProvider(name = "quickSearchCustomerData")
    public static Object[][] quickSearchCustomerData() {
        return new Object[][]{

                {QuickSearchPo.OptionGroup.VMS_GIFT_CARD, QuickSearchPo.Option.ACCOUNT_NUMBER, "3780000000000067", 1},
                {QuickSearchPo.OptionGroup.VMS_GIFT_CARD, QuickSearchPo.Option.CARD_NUMBER, "377935000000010", 1},
                {QuickSearchPo.OptionGroup.VMS_GIFT_CARD, QuickSearchPo.Option.SERIAL_NUMBER, "7679326581", 1},

                {QuickSearchPo.OptionGroup.VMS_GPR, QuickSearchPo.Option.ACCOUNT_NUMBER, "1400000074972", 4},
                {QuickSearchPo.OptionGroup.VMS_GPR, QuickSearchPo.Option.CARD_NUMBER, "4420620303647449", 1},
                {QuickSearchPo.OptionGroup.VMS_GPR, QuickSearchPo.Option.CUSTOMER_NAME, "Emily Carter", 354},
                {QuickSearchPo.OptionGroup.VMS_GPR, QuickSearchPo.Option.SERIAL_NUMBER, "7562433801", 1}

        };
    }

    @DataProvider(name = "quickLookupData")
    public static Object[][] quickLookupStatusData() {
        return new Object[][]{
                {QuickLookupPo.OptionGroup.CARD_STATUS, QuickLookupPo.Option.BOOST, "54286440189178", QuickLookupPo.MESSAGE_QUICK_LOOKUP_COLD_TEXT},
                {QuickLookupPo.OptionGroup.CARD_STATUS, QuickLookupPo.Option.TRACFONE, "206571422195176", QuickLookupPo.MESSAGE_QUICK_LOOKUP_UNKNOWN_CARD},
                {QuickLookupPo.OptionGroup.CARD_STATUS, QuickLookupPo.Option.MICROSOFT, "6277003266878450", QuickLookupPo.MESSAGE_QUICK_LOOKUP_NO_RESULTS},
                {QuickLookupPo.OptionGroup.CARD_STATUS, QuickLookupPo.Option.NET10, "152671863145364", QuickLookupPo.MESSAGE_QUICK_LOOKUP_NO_RESULTS},
                {QuickLookupPo.OptionGroup.CARD_STATUS, QuickLookupPo.Option.TRACFONE, "302951596837276", QuickLookupPo.MESSAGE_QUICK_LOOKUP_NO_RESULTS},
                {QuickLookupPo.OptionGroup.CARD_STATUS, QuickLookupPo.Option.VIRGIN, "1682330112666012", QuickLookupPo.MESSAGE_QUICK_LOOKUP_VIRGIN_COLD_TEXT},
                {QuickLookupPo.OptionGroup.CARD_STATUS, QuickLookupPo.Option.MICROSOFT_PIN, "1234", QuickLookupPo.MESSAGE_QUICK_LOOKUP_UNAVAILABLE_TEXT},

                {QuickLookupPo.OptionGroup.CARD_NUMBER, QuickLookupPo.Option.GREENCARD_CAN, "244251838", QuickLookupPo.MESSAGE_QUICK_LOOKUP_ASSOCIATED_CARD},
                {QuickLookupPo.OptionGroup.CARD_NUMBER, QuickLookupPo.Option.GREENCARD_SERIAL, "4810506679", QuickLookupPo.MESSAGE_QUICK_LOOKUP_ASSOCIATED_CARD},
                {QuickLookupPo.OptionGroup.CARD_NUMBER, QuickLookupPo.Option.VMS_ACCOUNT, "1682330112666012", QuickLookupPo.MESSAGE_QUICK_LOOKUP_NO_RESULTS},
                {QuickLookupPo.OptionGroup.CARD_NUMBER, QuickLookupPo.Option.VMS_CARD_ID, "1682330112666012", QuickLookupPo.MESSAGE_QUICK_LOOKUP_NO_RESULTS},
                {QuickLookupPo.OptionGroup.CARD_NUMBER, QuickLookupPo.Option.VMS_SERIAL, "1682330112666012", QuickLookupPo.MESSAGE_QUICK_LOOKUP_NO_RESULTS}

        };
    }

}
