package com.incomm.cca.service.session;

import com.incomm.cca.model.converter.SessionHistoryConverter;
import com.incomm.cca.model.view.session.SessionHistoryItemView;
import com.incomm.cca.repository.session.SessionStatusHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class SessionHistoryService {

    @Autowired
    private SessionStatusHistoryRepository sessionStatusHistoryRepository;
    @Autowired
    private SessionHistoryConverter statusHistoryConverter;

    public Page<SessionHistoryItemView> findBySessionId(Long sessionId, int page, int limit) {
        // Get all session status history items
        Pageable pageable = PageRequest.of(page, limit, Sort.by("createdDate")
                                                            .descending());
        return sessionStatusHistoryRepository.findBySessionId(sessionId, pageable)
                                             .map(statusHistoryConverter::convert);
    }
}
