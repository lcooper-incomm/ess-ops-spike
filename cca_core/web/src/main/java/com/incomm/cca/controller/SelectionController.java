package com.incomm.cca.controller;

import com.incomm.cca.model.converter.CcaCommentConverter;
import com.incomm.cca.model.converter.SelectionConverter;
import com.incomm.cca.model.domain.Comment;
import com.incomm.cca.model.domain.session.Selection;
import com.incomm.cca.model.view.session.comment.CommentView;
import com.incomm.cca.model.view.session.selection.SelectionView;
import com.incomm.cca.service.CommentService;
import com.incomm.cca.service.SelectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest/selection")
public class SelectionController extends RestResponseHandler {

    @Autowired
    private CcaCommentConverter commentConverter;
    @Autowired
    private SelectionConverter selectionConverter;
    @Autowired
    private CommentService commentService;
    @Autowired
    private SelectionService selectionService;

    @RequestMapping(method = RequestMethod.GET, value = "/{id}/comment")
    public ResponseEntity getCommentsForSelection(
            @PathVariable("id") Long selectionId,
            @RequestParam(value = "page", defaultValue = "0") int page, @RequestParam(value = "limit", defaultValue = "50") int limit) {
        Pageable pageable = PageRequest.of(page, limit);
        Page<Comment> notes = commentService.getCommentsForSelection(selectionId, pageable);
        Page<CommentView> convertedNotes = notes.map(commentConverter::convert);
        return ok(convertedNotes);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity removeOne(@PathVariable("id") Long id) {
        selectionService.removeOne(id);
        return noContent();
    }

    @PutMapping("/{id}")
    public ResponseEntity updateOne(@PathVariable("id") Long id, @RequestBody SelectionView requestView) {
        Selection request = this.selectionConverter.convert(requestView);
        Selection selection = selectionService.updateOne(request);
        return ok(this.selectionConverter.convertSimple(selection));
    }
}
