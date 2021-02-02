package com.incomm.cca.qa.pageObject.services;

import com.incomm.aqat.component.formcontrol.material1.MdSelect;
import com.incomm.aqat.component.formcontrol.material1.MdTextArea;
import com.incomm.aqat.component.formcontrol.material1.MdTextInput;
import com.incomm.aqat.driver.AqatDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

/**
 * The Page Object for Bulk Product Export.
 * <p>
 * User: Darren Carpenter (dcarpenter)
 * Date: 12/7/2017
 */
public class BulkProductExportPO extends ServicesPanelPO {

    // MESSAGES
    public final static String MESSAGE_SUCCESS_TEXT = "The action completed successfully.";
    // LOCATORS
    public static final String INPUT_OPTION_ID = "input-option";  //Card Input
    public static final String CARD_ID_LIST_ID = "card-id-list";  //text area
    public static final String RANGE_START_ID = "range-start";  //start # for Card ID Range
    public static final String RANGE_END_ID = "range-end";  //end # for Card ID Range
    public static final String BTN_IMPORT_ID = "import";
    public static final String PLATFORM_ID = "platform";
    public static final String BTN_SUBMIT_ID = "action-modal-next";  //Submit and Yes buttons
    public static final String BTN_CANCEL_ID = "action-modal-cancel";
    public static final String BTN_NO_ID = "action-modal-back";  //The NO button
    public static final String BULK_PRODUCT_EXPORT_CONTAINER_ID = "bulk-product-export-container";
    public static final String SUCCESS_MESSAGE_ID = "success-message";
    public static final String FAILURE_MESSAGE_ID = "failure-message";
    // WEB ELEMENTS
    @FindBy(id = INPUT_OPTION_ID)
    public WebElement inputOption;
    @FindBy(id = CARD_ID_LIST_ID)
    public WebElement cardIdList;
    @FindBy(id = RANGE_START_ID)
    public WebElement rangeStart;
    @FindBy(id = RANGE_END_ID)
    public WebElement rangeEnd;
    @FindBy(id = BTN_IMPORT_ID)
    public WebElement btnImport;
    @FindBy(id = PLATFORM_ID)
    public WebElement platform;
    @FindBy(id = BTN_SUBMIT_ID)
    public WebElement btnSubmit;
    @FindBy(id = BTN_CANCEL_ID)
    public WebElement btnCancel;
    @FindBy(id = BTN_NO_ID)
    public WebElement btnNo;
    @FindBy(id = BULK_PRODUCT_EXPORT_CONTAINER_ID)
    public WebElement bulkProductExportContainer;
    @FindBy(id = SUCCESS_MESSAGE_ID)
    public WebElement successMessage;
    @FindBy(id = FAILURE_MESSAGE_ID)
    public WebElement failureMessage;

    public BulkProductExportPO(AqatDriver driver) {
        super(driver);
    }

    // Md Components

    public MdSelect getCardInput() {
        return new MdSelect(inputOption, this.driver);
    }

    public MdTextArea getCardIdList() {
        return new MdTextArea(cardIdList, this.driver);
    }

    public MdTextInput getRangeStart() {
        return new MdTextInput(rangeStart, this.driver);
    }

    public MdTextInput getRangeEnd() {
        return new MdTextInput(rangeEnd, this.driver);
    }

    public MdSelect getPlatform() {
        return new MdSelect(platform, this.driver);
    }

    // Methods

    public Boolean isBulkProductExportDisplayed() {

        return bulkProductExportContainer.isDisplayed();

    }

    public String getSuccessMessageText() {
        return successMessage.getText();
    }

}
