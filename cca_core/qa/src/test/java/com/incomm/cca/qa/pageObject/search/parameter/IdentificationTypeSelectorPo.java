package com.incomm.cca.qa.pageObject.search.parameter;

import com.incomm.aqat.driver.AqatDriver;
import com.incomm.cca.qa.pageObject.BasePo;
import com.incomm.cca.qa.pageObject.enums.IdentificationType;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

import java.util.ArrayList;
import java.util.List;

import static com.incomm.aqat.util.AqatWait.waitForPageLoad;

/**
 * Created by gscholes on 4/4/2019
 */
public class IdentificationTypeSelectorPo extends BasePo {

    @FindBy(css = "div.mat-menu-panel button")
    private List<WebElement> optionList;

    public IdentificationTypeSelectorPo(final AqatDriver driver) {
        super(driver);
        waitForPageLoad(driver);
        PageFactory.initElements(driver, this);
    }

    private List<String> getSelectionLink() {
        List<String> choices = new ArrayList<>();
        for (WebElement element : optionList) {
            choices.add(element.getText());
        }
        return choices;
    }

    public void selectIdType(IdentificationType identificationType) {
        WebElement selectionLink = null;
        List<String> idTypeList = getSelectionLink();
        if (idTypeList.contains(identificationType.getLabel())) {
            int optionNumber = idTypeList.indexOf(identificationType.getLabel());
            selectionLink = optionList.get(optionNumber);
        }
        if (null != selectionLink) {
            selectionLink.click();
        }
    }

}
