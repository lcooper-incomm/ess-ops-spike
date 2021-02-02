package com.incomm.cca.qa.acceptance.details;

import com.incomm.cca.qa.functional.BaseFT;
import com.incomm.cca.qa.pageObject.LoginPO;
import com.incomm.cca.qa.pageObject.NavigationPO;
import com.incomm.cca.qa.pageObject.actions.NoteDetailsPo;
import com.incomm.cca.qa.pageObject.details.DetailsPo;
import com.incomm.cca.qa.pageObject.details.NotesPo;
import com.incomm.cca.qa.pageObject.enums.SearchParameter;
import com.incomm.cca.qa.pageObject.enums.SearchType;
import com.incomm.cca.qa.pageObject.search.SearchPo;
import org.testng.annotations.Test;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Acceptance Test Class for the Notes section of the Details screen
 * <p>
 * User: Darren Carpenter (dcarpenter)
 * Date: 1/17/2017
 */
public class NotesAT extends BaseFT {

    // FIXME: 3/26/2019 This test should be using the newer active page objects
    @Test(groups = {"version-6.0.0", "acceptance", "notes"}, enabled = true)
    public void verifyNotes() {

        LoginPO login = new LoginPO(driver);
        login.defaultSignIn();
        NavigationPO nav = new NavigationPO(driver);
        nav.navigateToSearch();
        SearchPo search = new SearchPo(driver);
        search.selectSearchType(SearchType.FASTCARD);
        //todo this is commented out because it was blocking refactoring. The test objective is valid, but the method call is bad.
        //		search.getFastcardSearchParameters()
        //		      .getSerialNumber()
        //		      .setValue( "8912757530" );
        search.clickSearchAndExpectNavigateToDetails();

        // click on the Notes tab
        DetailsPo detailsPo = new DetailsPo(driver);
        detailsPo.clickRightDetailNavButton(detailsPo.rightDetailNavNotes);

        NotesPo notesPo = new NotesPo(driver);
        assertThat(notesPo.isNotesDisplayed()).isTrue();

    }

    // FIXME: 3/26/2019 This test should be using the newer active page objects
    @Test(groups = {"version-6.0.0", "acceptance", "notes"}, enabled = true)
    public void verifyNoteDetailsModal() throws Exception {

        LoginPO login = new LoginPO(driver);
        login.defaultSignIn();
        NavigationPO nav = new NavigationPO(driver);
        nav.navigateToSearch();
        SearchPo search = new SearchPo(driver);
        search.selectSearchType(SearchType.FASTCARD);
        search.getParameters(SearchType.FASTCARD)
              .setValue(SearchParameter.SERIAL_NUMBER, "8912757530");
        search.clickSearchAndExpectNavigateToDetails();

        // click on the Notes tab
        DetailsPo detailsPo = new DetailsPo(driver);
        detailsPo.clickRightDetailNavButton(detailsPo.rightDetailNavNotes);

        // click on the Notes "Details" button
        NotesPo notesPo = new NotesPo(driver);
        notesPo.clickNotesDetailsButton();

        NoteDetailsPo noteDetails = new NoteDetailsPo(driver);
        assertThat(noteDetails.dialogHeader.getText()).isEqualTo(NoteDetailsPo.MESSAGE_NOTE_DETAILS_LABEL_TEXT);

    }

}
