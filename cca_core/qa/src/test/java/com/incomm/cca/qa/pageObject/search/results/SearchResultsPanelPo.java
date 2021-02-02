package com.incomm.cca.qa.pageObject.search.results;

import com.incomm.aqat.driver.AqatDriver;
import com.incomm.cca.qa.pageObject.BasePo;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

import static com.incomm.aqat.util.AqatWait.waitForPageLoad;

/**
 * Created by gscholes on 3/28/2019
 */
public class SearchResultsPanelPo extends BasePo implements SearchReportPanel {

    @FindBy(css = "cca-card-panel#search-results div.card-header.primary.clickable")
    public WebElement headerBar;
    @FindBy(css = "cca-card-panel#search-results div.card-header.primary.clickable > h4")
    public WebElement headerTitle;
    @FindBy(css = "div.search-result-summary-container")
    public WebElement reportSummary;

    public SearchResultsPanelPo(final AqatDriver driver) {
        super(driver);
        waitForPageLoad(driver);
        PageFactory.initElements(driver, this);
    }

    @Override
    public WebElement getHeaderBar() {
        return headerBar;
    }

    @Override
    public WebElement getHeaderTitle() {
        return headerTitle;
    }

    @Override
    public WebElement getReportSummary() {
        return reportSummary;
    }
}
