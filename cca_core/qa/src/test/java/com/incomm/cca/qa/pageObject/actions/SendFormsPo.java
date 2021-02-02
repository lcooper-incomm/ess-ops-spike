package com.incomm.cca.qa.pageObject.actions;

import com.incomm.aqat.component.formcontrol.material1.MdSelect;
import com.incomm.aqat.component.formcontrol.material1.MdTextInput;
import com.incomm.aqat.driver.AqatDriver;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;

/**
 * Created by Matt on 7/26/2016.
 */
public class SendFormsPo extends ActionDialogPO {

    // LOCATORS
    public final static String SEND_FORMS_WRAPPER_ID = "send-forms-wrapper";  // material
    public final static String SEND_FORMS_SELECT_FORM_TYPE_ID = "form-type";  // material
    public final static String SEND_FORMS_SELECT_DELIVERY_METHOD_ID = "delivery-method";  // material
    public final static String SEND_FORMS_FAX_ID = "fax-number";  // material
    // WEB ELEMENTS
    @FindBy(id = SEND_FORMS_WRAPPER_ID)
    WebElement sendFormsWrapper;
    @FindBy(id = SEND_FORMS_SELECT_FORM_TYPE_ID)
    WebElement sendFormsSelectFormType;
    @FindBy(id = SEND_FORMS_SELECT_DELIVERY_METHOD_ID)
    WebElement sendFormsSelectDeliveryMethod;
    @FindBy(id = SEND_FORMS_FAX_ID)
    WebElement sendFormsFax;

    // Form Field Component getters

    public SendFormsPo(AqatDriver driver) {
        super(driver);
        PageFactory.initElements(driver, this);
    }

    public MdSelect getSelectFormTypeField() {
        return new MdSelect(sendFormsSelectFormType, this.driver);
    }

    public MdSelect getSelectDeliveryMethodField() {
        return new MdSelect(sendFormsSelectDeliveryMethod, this.driver);
    }

    public MdTextInput getFaxField() {
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.id(SEND_FORMS_FAX_ID)));
        driver.getWebDriverWait()
              .until(ExpectedConditions.elementToBeClickable(By.id(SEND_FORMS_FAX_ID)));
        return new MdTextInput(sendFormsFax, this.driver);
    }

    public Boolean isSendFormsDisplayed() {

        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.id(SEND_FORMS_WRAPPER_ID)));
        return sendFormsWrapper.isDisplayed();

    }

}
