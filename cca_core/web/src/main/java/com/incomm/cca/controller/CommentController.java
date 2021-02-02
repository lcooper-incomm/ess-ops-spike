package com.incomm.cca.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.incomm.apls.model.response.Note;
import com.incomm.cca.model.constant.IdentifierType;
import com.incomm.cca.model.converter.CcaCommentConverter;
import com.incomm.cca.model.domain.Comment;
import com.incomm.cca.model.domain.Identifier;
import com.incomm.cca.model.view.session.comment.CommentDetailView;
import com.incomm.cca.service.CommentService;
import com.incomm.cca.service.SecurityService;
import com.incomm.cca.service.apls.AplsNoteService;
import com.incomm.cscore.client.apls.model.note.EnhancedNote;
import com.incomm.cscore.logging.CsCoreLogger;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/rest/comment")
public class CommentController extends RestResponseHandler {

    @Autowired
    private CcaCommentConverter commentConverter;
    @Autowired
    private CommentService commentService;
    @Autowired
    private AplsNoteService aplsNoteService;
    @Autowired
    private SecurityService securityService;
    @Autowired
    private ObjectMapper objectMapper;

    @PostMapping("/greencard")
    public ResponseEntity create(@RequestBody Note request) {
        EnhancedNote response = aplsNoteService.updateGreencardNote(request);
        return ok(response);
    }

    @PutMapping
    public ResponseEntity update(@RequestBody Comment comment) {
        commentService.update(comment);
        return noContent();
    }

    @GetMapping("/{id}/detail")
    public ResponseEntity getCommentDetails(@PathVariable("id") Long id) {
        CommentDetailView commentDetailView = commentService.getCommentDetailsByCommentId(id);
        return ok(commentDetailView);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity updateOne(@PathVariable("id") Long id, @RequestBody Comment request) {
        Comment domainModel = commentService.updateOneComment(id, request);
        return ok(commentConverter.convert(domainModel));
    }

    @GetMapping()
    public ResponseEntity search(@RequestHeader("cca-query") String ccaQueryJson) {
        this.securityService.validateIsSystemAdministrator();

        Identifier request = this.parseQueryHeader(ccaQueryJson);
        List<Comment> comments = this.commentService.search(request);
        return ok(this.commentConverter.convertToSkeletonViews(comments));
    }

    private Identifier parseQueryHeader(String headerString) {
        try {
            Identifier identifier = this.objectMapper.readValue(headerString, Identifier.class);
            if (identifier.getIdentifierType()
                          .equalsIgnoreCase(IdentifierType.ORDER_NUMBER)) {
                String paddedOrderNumber = StringUtils.leftPad(identifier.getValue(), 9, "0");
                identifier.setValue(paddedOrderNumber);
            }
            return identifier;
        } catch (IOException e) {
            CsCoreLogger.error("Failed to parse cca-query header value")
                        .keyValue("value", headerString)
                        .exception(e)
                        .build();
            throw new IllegalArgumentException("Illegal cca-query header format");
        }
    }
}
