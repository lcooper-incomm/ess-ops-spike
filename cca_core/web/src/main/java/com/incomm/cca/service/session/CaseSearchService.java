package com.incomm.cca.service.session;

import com.incomm.cca.model.constant.IdentifierType;
import com.incomm.cca.model.constant.SessionClassType;
import com.incomm.cca.model.constant.SessionStatus;
import com.incomm.cca.model.domain.SessionQueue;
import com.incomm.cca.model.domain.Team;
import com.incomm.cca.model.domain.User;
import com.incomm.cca.model.domain.session.Session;
import com.incomm.cca.model.domain.session.SessionType;
import com.incomm.cca.model.view.session.CaseSearchRequest;
import com.incomm.cca.repository.session.CaseRepository;
import com.incomm.cca.service.SecurityService;
import com.incomm.cca.service.SessionService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.Join;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

@Service
public class CaseSearchService {

    @Autowired
    private CaseRepository caseRepository;
    @Autowired
    private SecurityService securityService;
    @Autowired
    private SessionService sessionService;
    @Autowired
    private SessionTypeService sessionTypeService;

    public Page<Session> search(CaseSearchRequest request, Pageable pageable) {
        if (StringUtils.isNotBlank(request.getSid())) {
            return this.findOne(request.getSid(), pageable);
        } else if (StringUtils.isNotBlank(request.getSerialNumber())) {
            return this.sessionService.findAllByIdentifier(IdentifierType.SERIALNUMBER, request.getSerialNumber(), pageable);
        } else if (StringUtils.isNotBlank(request.getVan())) {
            return this.sessionService.findAllByIdentifier(IdentifierType.VAN, request.getSerialNumber(), pageable);
        } else {
            return this.searchWithRequest(request, pageable);
        }
    }

    private Page<Session> findOne(String sessionId, Pageable pageable) {
        Session session = caseRepository.getOne(Long.parseLong(sessionId));

        List<Session> resultList = new ArrayList<>();
        if (session != null && securityService.hasCaseSearchSessionTypePermission(session.getSessionType())) {
            resultList.add(session);
        }

        return new PageImpl<>(resultList, pageable, resultList.size());
    }

    private Specification<Session> buildSpecification(CaseSearchRequest request) {
        List<Specification<Session>> specifications = new ArrayList<>();

        if (StringUtils.isNotBlank(request.getSessionType())) {
            specifications.add(buildSessionTypeSpecification(request.getSessionType()));
        }
        if (StringUtils.isNotBlank(request.getStatus())) {
            if (request.getStatus()
                       .equals(SessionStatus.CLOSED)) {
                specifications.add(buildClosedStatusSpecification());
            } else {
                specifications.add(buildStatusSpecification(request.getStatus()));
            }
        } else {
            specifications.add(buildDefaultStatusSpecification());
        }
        if (request.getQueueId() != null) {
            specifications.add(buildQueueSpecification(request.getQueueId()));
        }
        if (request.getTeamId() != null) {
            specifications.add(buildTeamSpecification(request.getTeamId()));
        }
        if (request.getUserId() != null) {
            specifications.add(buildAssigneeSpecification(request.getUserId()));
        }

        final Specification<Session> master = Specification.where(buildSessionClassSpecification());

        return specifications.stream()
                             .reduce(Specification::and) // Combine all specs with "and"
                             .map(master::and) // "and" with master, if other specs exist
                             .orElse(master); // Otherwise return master
    }

    private Specification<Session> buildSessionClassSpecification() {
        return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.equal(root.get("sessionClass"), SessionClassType.CASE);
    }

    private Specification<Session> buildSessionTypeSpecification(String sessionType) {
        return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.equal(root.get("sessionType"), sessionType);
    }

    private Specification<Session> buildClosedStatusSpecification() {
        List<String> includedStatuses = new ArrayList<>();
        includedStatuses.add(SessionStatus.CLOSED);
        includedStatuses.add(SessionStatus.FORCED_CLOSED);
        includedStatuses.add(SessionStatus.CANCELLED);
        includedStatuses.add(SessionStatus.VMS_SESSION_FAILED);

        return (root, criteriaQuery, criteriaBuilder) -> root.get("status")
                                                             .in(includedStatuses.toArray());
    }

    private Specification<Session> buildDefaultStatusSpecification() {
        List<String> excludedStatuses = new ArrayList<>();
        excludedStatuses.add(SessionStatus.CLOSED);
        excludedStatuses.add(SessionStatus.FORCED_CLOSED);
        excludedStatuses.add(SessionStatus.CANCELLED);
        excludedStatuses.add(SessionStatus.VMS_SESSION_FAILED);

        return (root, criteriaQuery, criteriaBuilder) -> root.get("status")
                                                             .in(excludedStatuses.toArray())
                                                             .not();
    }

    private Specification<Session> buildStatusSpecification(String status) {
        return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.equal(root.get("status"), status);
    }

    private Specification<Session> buildQueueSpecification(Long queueId) {
        return (root, criteriaQuery, criteriaBuilder) -> {
            Join<Session, SessionQueue> join = root.join("queue");
            return criteriaBuilder.equal(join.get("id"), queueId);
        };
    }

    private Specification<Session> buildTeamSpecification(Long teamId) {
        return (root, criteriaQuery, criteriaBuilder) -> {
            Join<Session, Team> join = root.join("team");
            return criteriaBuilder.equal(join.get("id"), teamId);
        };
    }

    private Specification<Session> buildAssigneeSpecification(Long userId) {
        return (root, criteriaQuery, criteriaBuilder) -> {
            Join<Session, User> join = root.join("user");
            return criteriaBuilder.equal(join.get("id"), userId);
        };
    }

    private Stream<String> findAllowedSessionTypes() {
        // Add filters for session types this user is allowed to see
        return sessionTypeService.findAllCaseTypes()
                                 .stream()
                                 .map(SessionType::getName)
                                 .filter(securityService::hasCaseSearchSessionTypePermission);
    }

    private Page<Session> searchWithRequest(CaseSearchRequest request, Pageable pageable) {
        return this.findAllowedSessionTypes()
                   // Has session types: build specs and do search
                   .map(this::buildSessionTypeSpecification)
                   .reduce(Specification::or)
                   .map(sessionTypesSpecification -> {
                       // Build specification from request and concat session types specification
                       Specification<Session> specification = this.buildSpecification(request)
                                                                  .and(sessionTypesSpecification);
                       return caseRepository.findAll(specification, pageable);
                   })
                   // No session types: return empty page
                   .orElse(Page.empty());
    }
}
