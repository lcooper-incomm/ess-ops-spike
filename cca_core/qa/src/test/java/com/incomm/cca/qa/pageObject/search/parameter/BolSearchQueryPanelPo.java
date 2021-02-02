package com.incomm.cca.qa.pageObject.search.parameter;

import com.incomm.aqat.driver.AqatDriver;
import com.incomm.cca.qa.pageObject.enums.SearchParameter;

import java.util.Map;

public class BolSearchQueryPanelPo extends SearchQueryPanelPo implements SearchQueryPanel {

    public BolSearchQueryPanelPo(final AqatDriver driver) {
        super(driver);
    }

    // TODO: 3/26/2019 Correctly implement this method
    @Override
    public Map<SearchParameter, String> getCurrentValues() {
        return null;
    }

    @Override
    public SearchQueryPanel clickOnClearButton() {
        //TODO 3/28/2019 Implement this method
        return null;
    }

    @Override
    public SearchQueryPanel clickOnAdvancedToggle() {
        return null;
    }

}
