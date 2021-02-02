package com.incomm.cca.qa.pageObject.search.parameter;

import com.incomm.aqat.driver.AqatDriver;
import com.incomm.cca.qa.pageObject.enums.SearchType;

public class SearchQueryPanelFactory {

    public static SearchQueryPanel getSelectedSearchPanel(AqatDriver driver, SearchType searchType) {
        switch (searchType) {
            case FASTCARD:
                return new FastCardSearchQueryPanelPO(driver);
            case FINANCIAL_GIFT:
                return new FinancialGiftSearchQueryPanelPo(driver);
            case VMS_GPR:
                return new VMSGPRSearchQueryPanelPo(driver);
            //			case VRN:
            //				return vrnSearchParameters;
            //			case DDP:
            //				return ddpSearchParameters;
            //			case ECOMM:
            //				return eCommSearchParameters;
            //			case VANILLA:
            //				return vanillaSearchParameters;
            //			case VMS_GIFT:
            //				return vmsGiftCardSearchParameters;
            //			case JIRA:
            //				return jiraSearchParameters;
            //			case SESSION:
            //				return sessionSearchParameters;
            //			case LOCATION:
            //				return locationSearchParameters;
            default:
                throw new IllegalArgumentException(String.format("No parameters defined for SearchType '%s'", searchType));
        }
    }
}
