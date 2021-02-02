package com.incomm.cca.qa.pageObject.wizards;

import org.openqa.selenium.By;

/**
 * Created by gscholes on 10/17/2019
 */
public class VerifyCustomerWizard {

    public static final By VERIFY_CUSTOMER_DIALOG = By.cssSelector("#verify-customer > cca-wizard-dialog");
    public static final By VERIFY_CUSTOMER_FORM_PAGE = By.tagName("cca-verify-customer-form-page");
    public static final By HEADER_TITLE = By.cssSelector("#verify-customer > cca-wizard-dialog div.header-container h2");
    public static final By VERIFIED_BUTTON = By.cssSelector("#next-button");
    public static final By VERIFIED_WAIT_SPINNER = By.cssSelector("#next-button spinner");
    public static final By NOT_VERIFIED_BUTTON = By.cssSelector("#close-button");
    public static final By NOT_VERIFIED_WAIT_SPINNER = By.cssSelector(("#close-button spinner"));
}
