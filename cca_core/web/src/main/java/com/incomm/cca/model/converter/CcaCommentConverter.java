package com.incomm.cca.model.converter;

import com.incomm.apls.model.support.CommentCallLog;
import com.incomm.cca.model.domain.Comment;
import com.incomm.cca.model.domain.session.Session;
import com.incomm.cca.model.view.auth.UserView;
import com.incomm.cca.model.view.comment.CommentSkeletonView;
import com.incomm.cca.model.view.external.apls.customer.ModifiedCommentsView;
import com.incomm.cca.model.view.session.comment.CommentDetailView;
import com.incomm.cca.model.view.session.comment.CommentView;
import com.incomm.cca.model.view.session.comment.CustomerCommentsView;
import com.incomm.cscore.client.maples.model.response.account.AccountNote;
import com.incomm.cscore.client.model.CsCoreTimestamp;
import com.incomm.cscore.client.rest.converter.TimestampConverter;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CcaCommentConverter {

    @Autowired
    private QueueConverter queueConverter;
    @Autowired
    private IdentifierConverter identifierConverter;
    @Autowired
    private TimestampConverter timestampConverter;
    @Autowired
    private UserConverter userConverter;
    @Autowired
    private WrapUpCodeConverter wrapUpCodeConverter;
    @Autowired
    private WrapUpCodeCategoryConverter wrapUpCodeCategoryConverter;

    public List<CommentView> convert(Collection<Comment> request) {
        List<CommentView> views = new ArrayList<>();

        if (request != null) {
            request.forEach(comment -> views.add(this.convert(comment)));
        }

        return views;
    }

    public List<CommentSkeletonView> convertToSkeletonViews(Collection<Comment> request) {
        List<CommentSkeletonView> views = new ArrayList<>();

        if (request != null) {
            request.forEach(comment -> {
                CommentSkeletonView view = this.convertToSkeletonView(comment);
                if (view != null) {
                    views.add(view);
                }
            });
        }

        return views;
    }

    public CommentSkeletonView convertToSkeletonView(Comment request) {
        CommentSkeletonView view = null;

        if (request != null) {
            view = new CommentSkeletonView();
            view.setId(request.getId());
			view.setContent(request.getContent());
            view.setUsername(request.getCreatedBy() != null ? request.getCreatedBy()
                                                                     .getUsername() : null);
            CsCoreTimestamp createdDateTimestamp = this.timestampConverter.convert(request.getCreatedDate());
            if (createdDateTimestamp != null) {
                view.setCreatedDate(createdDateTimestamp.getDisplayValue());
            }
        }

        return view;
    }

    public CommentView convert(Comment request) {
        CommentView view = null;

        if (request != null) {
            view = new CommentView();
            view.setId(request.getId());
			view.setContent(request.getContent());
            view.setCreatedBy(userConverter.convertSimple(request.getCreatedBy()));
            view.setCreatedDate(timestampConverter.convert(request.getCreatedDate()));
            view.setIsPrivate(request.getIsPrivate());
            view.setModifiedBy(userConverter.convertSimple(request.getModifiedBy()));
            view.setModifiedDate(timestampConverter.convert(request.getModifiedDate()));
            view.setSystem("CCA");
        }

        return view;
    }

    public CommentDetailView convert(Long commentId, Session session) {
        CommentDetailView view = new CommentDetailView();
        view.setSessionId(session.getId());
        view.setCreatedBy(userConverter.convertSimple(session.getCreatedBy()));
        view.setCreatedDate(timestampConverter.convert(session.getCreatedDate()));
        view.setClosedDate(timestampConverter.convert(session.getClosedDate()));
        view.setQueue(queueConverter.convertSimple(session.getQueue()));
        view.setWrapUpCodeCategory(wrapUpCodeCategoryConverter.convertSimple(session.getWrapUpCodeCategory()));
        view.setWrapUpCode(wrapUpCodeConverter.convert(session.getWrapUpCode()));

        if (session.getCallComponent() != null) {
            view.setCallerName(session.getCallComponent()
                                      .getCallerName());
            view.setCallbackNumber(session.getCallComponent()
                                          .getCallbackNumber());
            view.setDnis(session.getCallComponent()
                                .getDnis());
            view.setAni(session.getCallComponent()
                               .getAni());
        }

        //Find original comment's identifiers
        session.getComments()
               .stream()
               .filter(comment -> comment.getId()
                                         .equals(commentId))
               .findFirst()
               .ifPresent(original -> view.getIdentifiers()
                                          .addAll(identifierConverter.convert(original.getIdentifiers())));

        return view;
    }

    public CustomerCommentsView convertAccountNotes(List<AccountNote> request, String platform) {
        CustomerCommentsView view = null;

        if (request != null) {
            view = new CustomerCommentsView();
            view.setComments(request.parallelStream()
                                    .map(note -> this.convertAccountNote(note, platform))
                                    .collect(Collectors.toList()));
        }

        return view;
    }

    public CustomerCommentsView convertCustomerComments(ModifiedCommentsView request) {
        CustomerCommentsView view = null;

        if (request != null) {
            view = new CustomerCommentsView();
            view.setIsPartial(request.getIsPartial());
            view.setComments(this.convertAplsComments(request.getComments()));
        }

        return view;
    }

    private List<CommentView> convertAplsComments(Collection<com.incomm.apls.model.support.Comment> request) {
        List<CommentView> views = new ArrayList<>();

        if (request != null) {
            request.forEach(comment -> {
                if (comment.getCallLog() != null) {
                    comment.getCallLog()
                           .forEach(callLog -> views.add(this.convertAplsComment(comment, callLog)));
                }
            });
        }

        return views;
    }

    private CommentView convertAccountNote(AccountNote note, String platform) {
        CommentView view = null;

        if (note != null) {
            view = new CommentView();
            // TODO: for now, we only integrate with SERVE, where the ids are numbers, but we should fix this soon
            view.setId(Long.parseLong(note.getId()));
            view.setContent(note.getText());
            view.setCreatedDate(note.getCreatedDate());
            view.setModifiedDate(note.getCreatedDate());
            view.setSystem(platform);

            if (StringUtils.isNotBlank(note.getCreatedBy())) {
                UserView userView = new UserView();
                userView.setDisplayName(note.getCreatedBy());
                view.setCreatedBy(userView);
                view.setModifiedBy(userView);
            }
        }

        return view;
    }

    private CommentView convertAplsComment(com.incomm.apls.model.support.Comment request, CommentCallLog callLog) {
        CommentView view = null;

        if (request != null) {
            view = new CommentView();
            view.setId(Long.parseLong(request.getId()));
            view.setCardNumber(callLog.getPan());
            view.setContent(callLog.getComment());
            view.setCreatedDate(this.timestampConverter.convert(callLog.getDate()));
            view.setModifiedDate(this.timestampConverter.convert(callLog.getDate()));
            view.setSystem("VMS");

            if (StringUtils.isNotBlank(callLog.getUserId())) {
                UserView userView = new UserView();
                userView.setUsername(callLog.getUserId());
                view.setCreatedBy(userView);
                view.setModifiedBy(userView);
            }
        }

        return view;
    }
}
