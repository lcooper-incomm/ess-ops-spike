package com.incomm.cca.controller;

import com.incomm.cca.model.converter.IdentifierConverter;
import com.incomm.cca.model.domain.Comment;
import com.incomm.cca.model.domain.Identifier;
import com.incomm.cca.service.CommentService;
import com.incomm.cca.service.IdentifierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@RequestMapping("/rest/identifier")
public class IdentifierController extends RestResponseHandler {

    @Autowired
    private CommentService commentService;
    @Autowired
    private IdentifierService identifierService;
    @Autowired
    private IdentifierConverter identifierConverter;

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public ResponseEntity updateOne(@PathVariable("id") Long id, @RequestBody Identifier request) {
        Identifier updated = identifierService.updateOne(id, request);
        return ok(updated);
    }

    @PostMapping("/comment")
    public ResponseEntity addOne(@RequestBody Identifier request) {
        if (request.getComments()
                   .isEmpty()) {
            throw new IllegalArgumentException("No Comment found in request");
        }

        Comment requestComment = request.getComments()
                                        .get(0);

        Identifier identifier = identifierService.findOrCreateByIdentifierTypeIdentifierAndPlatform(request.getIdentifierType(), request.getValue(), request.getPlatform());
        Comment comment = this.commentService.addOne(identifier, requestComment);

        identifier.setComments(new ArrayList<>());
        identifier.getComments()
                  .add(comment);

        return ok(this.identifierConverter.convert(identifier));
    }
}
