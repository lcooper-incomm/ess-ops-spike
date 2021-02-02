package com.incomm.cca.qa.dataProvider.functional.acceptance.dashboard.actions.product;

import com.incomm.cca.qa.pageObject.actions.ActionToolbarPO;
import com.incomm.cca.qa.pageObject.enums.SearchParameter;
import com.incomm.cca.qa.pageObject.enums.SearchType;
import org.testng.annotations.DataProvider;

public class CardActionsDP {

    @DataProvider(name = "activateFastCard")
    public static Object[][] activateFastCard() {
        return new Object[][]{
                // Need more cards? Search on Terminal CVS02232001 Range: 06/01/2010-06/30/2010
                //                {"Activate Card: Billable", "CVS02232001","4427861455", true},
                //                {"Activate Card: Non-Billable", "CVS02232001","4427861455", false},
                {"Activate Card: Non-Billable", "CVS02232001", "6672527602", false},
                {"Activate Card: Non-Billable", "CVS02232001", "168219635", false}
        };
    }

    @DataProvider(name = "merchandiseRelease")
    public static Object[][] merchandiseRelease() {
        return new Object[][]{
                {"Merchant Release of GC Card In 'Bad Credit' Option: Approved", "4453926664", "Approved", "Letter Received"},
                {"Merchant Release of GC Card In 'Bad Credit' Option: Denied", "4453926664", "Denied", "Bad Merchant"}
        };
    }

    @DataProvider(name = "adjustCardBalance")
    public static Object[][] adjustCardBalance() {
        return new Object[][]{
                {"Adjust Balance by $100.00", "Active", "4561013557", "100", "Chargeback-CREDIT", true, true},
                {"Adjust Balance by $100.00", "Deactive", "3013221700", "100", "Chargeback-CREDIT", true, true},
                {"Adjust Balance by $100.00", "Expired", "4810506852", "100", "Chargeback-CREDIT", true, true},
                {"Adjust Balance by $500.00", "Active", "4561013557", "500", "Chargeback-CREDIT", true, true},
                {"Adjust Balance by $500.00", "Deactive", "3013221700", "500", "Chargeback-CREDIT", true, true},
                {"Adjust Balance by $500.00", "Expired", "4810506852", "500", "Chargeback-CREDIT", true, true}
        };
    }

    @DataProvider(name = "changeCardStatus")
    public static Object[][] changeCardStatus() {
        return new Object[][]{
                {"300157744", "Fraud Watch", "Active", true, true},
                {"300157744", "Active", "Lost", true, true},
                {"300157744", "Lost", "On Hold", true, true},
                {"300157744", "On Hold", "Stolen", true, true},
                {"300157744", "Stolen", "Fraud Watch", true, true}
        };
    }

    @DataProvider(name = "verifyCardActions")
    public static Object[][] verifyCardActions() {
        return new Object[][]{
                {"Financial Gift Card with status of INITIAL", SearchType.FINANCIAL_GIFT, SearchParameter.SERIAL_NUMBER, "3136411906", ActionToolbarPO.INITIAL_GC_ACTIONS},
                {"Financial Gift Card with status of ACTIVE", SearchType.FINANCIAL_GIFT, SearchParameter.SERIAL_NUMBER, "2159758245", ActionToolbarPO.ACTIVE_GC_ACTIONS},
                {"Financial Gift Card with status of DEACTIVE", SearchType.FINANCIAL_GIFT, SearchParameter.SERIAL_NUMBER, "6835320614", ActionToolbarPO.DEACTIVE_GC_ACTIONS},
                {"Financial Gift Card with status of ON HOLD", SearchType.FINANCIAL_GIFT, SearchParameter.SERIAL_NUMBER, "5349808502", ActionToolbarPO.ON_HOLD_GC_ACTIONS},
                {"Financial Gift Card with status of STOLEN", SearchType.FINANCIAL_GIFT, SearchParameter.SERIAL_NUMBER, "5210984235", ActionToolbarPO.STOLEN_GC_ACTIONS},
                {"Financial Gift Card with status of LOST", SearchType.FINANCIAL_GIFT, SearchParameter.SERIAL_NUMBER, "3694816287", ActionToolbarPO.LOST_GC_ACTIONS},
                {"Financial Gift Card with status of BAD CREDIT", SearchType.FINANCIAL_GIFT, SearchParameter.SERIAL_NUMBER, "5210984199", ActionToolbarPO.BAD_CREDIT_GC_ACTIONS},
                {"Financial Gift Card with status of BALANCE WRITE-OFF", SearchType.FINANCIAL_GIFT, SearchParameter.SERIAL_NUMBER, "2945150690", ActionToolbarPO.DEFAULT_GC_ACTIONS},
                {"Financial Gift Card with status of EXPIRED", SearchType.FINANCIAL_GIFT, SearchParameter.SERIAL_NUMBER, "1732626499", ActionToolbarPO.EXPIRED_GC_ACTIONS},
                {"Financial Gift Card with status of HOT CARD", SearchType.FINANCIAL_GIFT, SearchParameter.SERIAL_NUMBER, "5349808503", ActionToolbarPO.DEFAULT_GC_ACTIONS},
                {"Financial Gift Card with status of REPLACEMENT REQUESTED", SearchType.FINANCIAL_GIFT, SearchParameter.SERIAL_NUMBER, "6788494682", ActionToolbarPO.RR_GC_ACTIONS}
        };
    }
}
