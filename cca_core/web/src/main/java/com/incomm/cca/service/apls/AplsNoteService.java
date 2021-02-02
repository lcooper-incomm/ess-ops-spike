package com.incomm.cca.service.apls;

import com.incomm.cca.service.UserService;
import com.incomm.cca.util.DateUtil;
import com.incomm.cscore.client.apls.CsCoreAplsNoteClient;
import com.incomm.cscore.client.apls.model.note.EnhancedNote;
import com.incomm.cscore.client.apls.model.note.EnhancedNotes;
import com.incomm.cscore.client.rest.response.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;

@Service
public class AplsNoteService {

    @Autowired
    private UserService userService;
    @Autowired
    private CsCoreAplsNoteClient noteClient;

    public EnhancedNote updateGreencardNote(com.incomm.apls.model.response.Note note) {
        //CCA-1078 Update limit of note lenth to 400 characters
        //CCA-1046 Limit note length to 200 characters for GreenCard notes
        int maxLength = 200;
        if (note.getContent()
                .length() < 200) {
            maxLength = note.getContent()
                            .length();
        }

        note.setContent(note.getContent()
                            .substring(0, maxLength));

        //For GreenCard notes, append the username and timestamp
        String usernameTimestamp = String.format(" [%s - %s]", userService.currentUser()
                                                                          .getUsername(), new SimpleDateFormat(DateUtil.getDateTimeFormat()).format(new Date()));
        note.setContent(String.format("%s%s", note.getContent(), usernameTimestamp));

        Response<EnhancedNotes> response = noteClient.setNote(note);
        return response.getBody()
                       .getNotes()
                       .get(0);
    }
}
