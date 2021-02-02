package com.incomm.cca.qa.pageObject.search.parameter;

import com.incomm.aqat.driver.AqatDriver;
import com.incomm.cca.qa.pageObject.BasePo;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.PageFactory;

import java.util.ArrayList;
import java.util.List;

import static com.incomm.aqat.util.AqatWait.waitForPageLoad;

/**
 * Created by gscholes on 3/29/2019
 */
public class PartnerSelectorPo extends BasePo {

    public static final By OPTIONS = By.cssSelector("span.mat-option-text");
    public static final By SELECTION_PANEL = By.cssSelector("div.mat-select-panel-wrap");

    public PartnerSelectorPo(final AqatDriver driver) {
        super(driver);
        waitForPageLoad(driver);
        PageFactory.initElements(driver, this);
    }

    private List<String> getPartnerList() {
        List<WebElement> optionList = driver.findElement(SELECTION_PANEL).findElements(OPTIONS);
        List<String> partnerList = new ArrayList<>();
        for (WebElement element : optionList) partnerList.add(element.getText());
        return partnerList;
    }

    public void selectPartner(String partner) {
        WebElement partnerLink = null;
        List<String> partnerList = getPartnerList();
        if (partnerList.contains(partner)) {
            int optionNumber = partnerList.indexOf(partner);
            partnerLink = driver.findElements(OPTIONS).get(optionNumber);
        }
        if (null != partnerLink) {
            partnerLink.click();
        }
    }

}