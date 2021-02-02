package com.incomm.cca.qa.pageObject.search;

import com.incomm.aqat.driver.AqatDriver;
import com.incomm.cca.qa.pageObject.BasePo;
import com.incomm.cca.qa.pageObject.enums.SearchType;
import com.incomm.cca.qa.pageObject.search.parameter.SearchQueryPanel;
import com.incomm.cca.qa.pageObject.search.parameter.SearchQueryPanelFactory;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

import java.util.ArrayList;
import java.util.List;

import static com.incomm.aqat.util.AqatWait.waitForPageLoad;

public class SearchMenuPO extends BasePo {

    @FindBy(css = "div.mat-menu-panel.ng-trigger.ng-trigger-transformMenu.ng-tns-c19-82.super-menu.search-menu")
    private WebElement searchMenu;
    @FindBy(css = "div.mat-menu-content")
    private WebElement menuContent;
    @FindBy(css = "div.super-menu.search-menu div.ng-star-inserted a.super-menu-link")
    private List<WebElement> menuOptions;
    @FindBy(css = "div.super-menu.search-menu div.super-menu-column.search-type-category")
    private List<WebElement> menuColumnHeaders;

    public SearchMenuPO(final AqatDriver driver) {
        super(driver);
        waitForPageLoad(driver);
        PageFactory.initElements(driver, this);
    }

    public Boolean isDisplayed() {
        return searchMenu.isDisplayed();
    }

    public List<String> getMenuColumnHeadersLabels() {
        List<String> categoryNames = new ArrayList<>();
        for (WebElement element : menuColumnHeaders) {
            categoryNames.add(element.getText());
        }
        return categoryNames;
    }

    public List<String> getMenuOptionLabels() {
        List<String> searchTypeLabels = new ArrayList<>();
        for (WebElement element : menuOptions) {
            searchTypeLabels.add(element.getText());
        }
        return searchTypeLabels;
    }

    public SearchQueryPanel selectMenuOption(SearchType searchType) {
        WebElement menuLink = null;
        List<String> optionList = getMenuOptionLabels();
        if (optionList.contains(searchType.getLabel())) {
            int optionNumber = optionList.indexOf(searchType.getLabel());
            menuLink = menuOptions.get(optionNumber);
        }
        if (null != menuLink) {
            menuLink.click();
            return SearchQueryPanelFactory.getSelectedSearchPanel(driver, searchType);
        }
        return null;
    }
}
