package com.incomm.cca.qa.functional.actions.customer;

import com.incomm.cca.qa.functional.BaseFT;
import org.testng.annotations.Test;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Acceptance tests validating the OrderNewCard Screen functionality
 * <p>
 * User: Phil Boatwright
 * Date: 8/9/2016
 */
public class VMSOrderNewCardFT extends BaseFT {

    @Test(groups = {"version-4.13.0", "actions"}, enabled = false)
    public void verifyOrderNewCard() {
//
//		login.defaultSignIn();
//		// nav.goToOrderNewCard();  //ToDo: This should NOT be in "nav". I removed it. Probably should be in ServicesPo.java or something like that.
//		assertThat( toast.getToastText() ).as( "Verify Ordering a new card succeeds." )
//		                                  .isEqualTo( orderNewCard.MESSAGE_ORDER_NEW_CARD_SUCCESS );
    }

    private Map<String, String> getVMSOrderNewCardData() {
        Map<String, String> orderNewCard = new LinkedHashMap<String, String>();
        orderNewCard.put("partnerValue", "InComm");
        orderNewCard.put("productCodeValue", "MYVANILLA VISA");
        orderNewCard.put("productTypeValue", "MYVANILLA VISA UPGRADE");
        orderNewCard.put("firstNameValue", "Homer");
        orderNewCard.put("lastNameValue", "Simpson");
        orderNewCard.put("physicalAddress1Value", "123 Homer On the Range");
        orderNewCard.put("physicalAddress2Value", "Apt 3");
        orderNewCard.put("cityValue", "San Francisco");
        orderNewCard.put("stateValue", "California - CA");
        orderNewCard.put("postalCodeValue", "95401");
        orderNewCard.put("dateOfBirthValue", "01-25-1960");
        orderNewCard.put("mothersMaidenValue", "Taylor");
        orderNewCard.put("homePhoneValue", "7777777777");
        orderNewCard.put("cellPhoneValue", "7777777777");
        orderNewCard.put("emailAddressValue", "hsimpson@simpsons.com");
        orderNewCard.put("idTypeValue", "Social Security Number");
        orderNewCard.put("idNumberValue", "377-46-9173");
        return orderNewCard;
    }

}
