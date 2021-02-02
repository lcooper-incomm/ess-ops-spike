package com.incomm.cca.qa.pageObject.details;

import com.incomm.aqat.driver.AqatDriver;
import com.incomm.cca.qa.pageObject.details.model.Note;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;

import java.util.ArrayList;
import java.util.List;

public class NotesPo extends DetailsPo {

    public static final By NOTES_FILTER_INPUT_FIELD = By.xpath("//*[@id='notes-filter']/input");
    public static final By NOTE_HEADER_DATE = By.xpath("//*[@id='note-header-date']/div");
    public static final By NOTE_HEADER_ID = By.xpath("//*[@id='note-header-id']/div");
    public static final By NOTE_HEADER_CARD = By.xpath("//*[@id='note-header-card']/div");
    public static final By NOTE_HEADER_USER = By.xpath("//*[@id='note-header-user']/div");
    public static final By NOTE_HEADER_NOTE = By.xpath("//*[@id='note-header-note']/div");
    public static final By NOTE_HEADER_SYSTEM = By.xpath("//*[@id='note-header-system']/div");
    public static final By NOTES_WRAPPER = By.id("notes-wrapper");
    public static final By NOTES_TOTAL_COUNT = By.id("notes-total-count");
    // WEB ELEMENTS

    @FindBy(xpath = "(//*[@id='vms-note-0']//button)[1]")
    WebElement notesDetailsButton;
    @FindBy(xpath = "//*[@id='notes-filter']/input")
    WebElement filter;
    @FindBy(id = "greencard-note-id")
    WebElement greenCardNoteId;
    @FindBy(id = "greencard-note-date")
    WebElement greenCardNoteDate;
    @FindBy(id = "greencard-note-user")
    WebElement greenCardNoteUser;
    @FindBy(id = "greencard-note-note")
    WebElement greenCardNoteNote;
    @FindBy(xpath = "//*[@id='note-header-date']/div")
    WebElement noteHeaderDate;
    @FindBy(xpath = "//*[@id='note-header-id']/div")
    WebElement noteHeaderId;

    public NotesPo(AqatDriver driver) {
        super(driver);
    }

    public Boolean isNotesDisplayed() {
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(NOTES_WRAPPER));
        return driver.findElement(NOTES_WRAPPER).isDisplayed();
    }

    public int getNotesTotalCount() {
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(NOTES_TOTAL_COUNT));
        return Integer.parseInt(driver.findElement(NOTES_TOTAL_COUNT).getText());
    }

    public void clickNotesDetailsButton() {
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath("(//*[@id='vms-note-0']//button)[1]")));
        driver.scrollToAndClickElement(notesDetailsButton, 200);
    }

    public void enterFilterText(String filterText) {
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@id='notes-filter']/input")));
        filter.sendKeys(filterText);
    }

    public void clearFilterText() {
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(NOTES_FILTER_INPUT_FIELD));
        driver.findElement(NOTES_FILTER_INPUT_FIELD).clear();
    }

    public String getFilterText() {
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(NOTES_FILTER_INPUT_FIELD));
        return driver.findElement(NOTES_FILTER_INPUT_FIELD).getAttribute("value");
    }

    public Note getGreenCardNotes() {
        Note note = new Note();
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.id("greencard-note-id")));
        note.setId(greenCardNoteId.findElement(By.id("greencard-note-id"))
                                  .getText());
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.id("greencard-note-note")));
        note.setNote(greenCardNoteNote.findElement(By.id("greencard-note-note"))
                                      .getText());
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.id("greencard-note-date")));
        note.setDate(greenCardNoteDate.findElement(By.id("greencard-note-date"))
                                      .getText());
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.id("greencard-note-user")));
        note.setUser(greenCardNoteUser.findElement(By.id("greencard-note-user"))
                                      .getText());
        return note;
    }

    public Note getNote(int index) {
        Note note = new Note();
        String id5 = String.format("vms-note-id-%s", index);
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.id(id5)));
        note.setId(driver.findElement(By.id(id5))
                         .getText());
        String id4 = String.format("vms-note-user-%s", index);
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.id(id4)));
        note.setUser(driver.findElement(By.id(id4))
                           .getText());
        String id3 = String.format("vms-note-system-%s", index);
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.id(id3)));
        note.setSystem(driver.findElement(By.id(id3))
                             .getText());
        String id2 = String.format("vms-note-date-%s", index);
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.id(id2)));
        note.setDate(driver.findElement(By.id(id2))
                           .getText());
        String id1 = String.format("vms-note-note-%s", index);
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.id(id1)));
        note.setNote(driver.findElement(By.id(id1))
                           .getText());
        String id = String.format("vms-note-card-%s", index);
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(By.id(id)));
        note.setCard(driver.findElement(By.id(id))
                           .getText());
        return note;
    }

    public List<Note> getNotes() {
        List<Note> notes = new ArrayList<>();
        int totalCount = getNotesTotalCount();
        for (int i = 0; i < totalCount; i++) {
            notes.add(getNote(i));
        }
        return notes;
    }

    public void sortByDate() {
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(NOTE_HEADER_DATE));
        noteHeaderDate.click();
    }

    public void sortById() {
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(NOTE_HEADER_ID));
        noteHeaderId.click();
    }

    public void sortByCard() {
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(NOTE_HEADER_CARD));
        driver.findElement(NOTE_HEADER_CARD).click();
    }

    public void sortByUser() {
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(NOTE_HEADER_USER));
        driver.findElement(NOTE_HEADER_USER).click();
    }

    public void sortByNote() {
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(NOTE_HEADER_NOTE));
        driver.findElement(NOTE_HEADER_NOTE).click();
    }

    public void sortBySystem() {
        driver.getWebDriverWait()
              .until(ExpectedConditions.presenceOfElementLocated(NOTE_HEADER_SYSTEM));
        driver.findElement(NOTE_HEADER_SYSTEM).click();
    }
}
