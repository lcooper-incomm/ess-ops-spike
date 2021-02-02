package com.incomm.cca.qa.functional.details;

import com.incomm.cca.qa.pageObject.details.DetailsPo;
import com.incomm.cca.qa.pageObject.details.NotesPo;
import com.incomm.cca.qa.pageObject.details.model.Note;
import com.incomm.cca.qa.pageObject.enums.SearchType;
import com.incomm.cca.qa.pageObject.search.CustomerVerificationPo;
import org.testng.Assert;
import org.testng.annotations.Test;

/**
 * Created by svukkadapu on 2/2/2017.
 */
public class NotesFT extends DetailsFT {

    private static final String SERIAL_NUMBER = "1182512727";

    @Test
    public void testFilter() {
        navigateToTransactionHistory(SearchType.FINANCIAL_GIFT, SERIAL_NUMBER);
        DetailsPo detailsPo = new DetailsPo(driver);
        detailsPo.selectNotes();
        NotesPo notesPo = new NotesPo(driver);
        notesPo.enterFilterText("filter");
        Assert.assertEquals(notesPo.getFilterText(), "filter");
        notesPo.clearFilterText();
        Assert.assertEquals(notesPo.getFilterText(), "");
    }

    @Test
    public void testGetGreenCardNote() {
        navigateToTransactionHistory(SearchType.FINANCIAL_GIFT, SERIAL_NUMBER);
        DetailsPo detailsPo = new DetailsPo(driver);
        detailsPo.selectNotes();
        NotesPo notesPo = new NotesPo(driver);
        Note note = notesPo.getGreenCardNotes();
        String expectedId = "SYSTEM";
        Assert.assertEquals(note.getId(), expectedId);
    }

    @Test
    public void testGetNotes() {
        navigateToTransactionHistory(SearchType.FINANCIAL_GIFT, SERIAL_NUMBER);
        CustomerVerificationPo customerVerification = new CustomerVerificationPo(driver);
        customerVerification.verifyCustomer();
        DetailsPo detailsPo = new DetailsPo(driver);
        detailsPo.selectNotes();
        NotesPo notesPo = new NotesPo(driver);
        Note note = notesPo.getNote(1);
    }
}
