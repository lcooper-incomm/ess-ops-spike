package com.incomm.cca.controller.external;

import com.incomm.cca.controller.RestResponseHandler;
import com.incomm.cca.model.converter.CcaCommentConverter;
import com.incomm.cca.model.domain.Comment;
import com.incomm.cca.model.view.session.comment.ExternalCommentRequestView;
import com.incomm.cca.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest/external/note")
public class ExternalNoteController extends RestResponseHandler {

    @Autowired
    private CcaCommentConverter commentConverter;
    @Autowired
    private CommentService commentService;

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity createNoteFromExternalSource(@RequestBody ExternalCommentRequestView requestDto) {
        Comment comment = commentService.newComment(requestDto);
        return ok(commentConverter.convert(comment));
    }
}
