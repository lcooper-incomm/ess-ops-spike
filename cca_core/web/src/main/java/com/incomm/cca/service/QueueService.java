package com.incomm.cca.service;

import com.incomm.cca.exception.NotFoundException;
import com.incomm.cca.exception.SecurityViolationException;
import com.incomm.cca.exception.UnsupportedI3ConnectionException;
import com.incomm.cca.model.constant.SessionTypeType;
import com.incomm.cca.model.converter.QueueConverter;
import com.incomm.cca.model.domain.SessionQueue;
import com.incomm.cca.model.domain.SessionQueueSessionType;
import com.incomm.cca.model.domain.WrapUpCodeCategory;
import com.incomm.cca.model.domain.auth.Permission;
import com.incomm.cca.model.domain.auth.PermissionCategory;
import com.incomm.cca.model.enums.ManagedPermission;
import com.incomm.cca.model.view.session.queue.SessionQueueView;
import com.incomm.cca.repository.SessionQueueRepository;
import com.incomm.cca.service.auth.PermissionCategoryService;
import com.incomm.cca.service.auth.PermissionService;
import com.incomm.cca.service.cache.SessionQueueBySessionTypeCache;
import com.incomm.cca.service.session.SessionTypeService;
import com.incomm.cca.util.CaseFormatUtil;
import com.incomm.cscore.logging.CsCoreLogger;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class QueueService {

    private static final String ADD_CATEGORY = "INSERT INTO queue_wrap_up_code_category (queue_id, wrap_up_code_category_id) VALUES (:queueId, :wrapUpCategoryId)";
    private static final String REMOVE_CATEGORY = "DELETE FROM queue_wrap_up_code_category WHERE queue_id = :queueId AND wrap_up_code_category_id = :wrapUpCategoryId";
    private static final String GET_TYPE_OPTIONS = "SELECT DISTINCT selection_type FROM search_type";

    @Autowired
    private QueueConverter queueConverter;
    @Autowired
    private SessionQueueRepository sessionQueueRepository;
    @Autowired
    private WrapUpCodeCategoryService wrapUpCodeCategoryService;
    @Autowired
    private SecurityService securityService;
    @Autowired
    private PermissionService permissionService;
    @Autowired
    private PermissionCategoryService permissionCategoryService;
    @Autowired
    private SessionQueueBySessionTypeCache sessionQueueBySessionTypeCache;
    @Autowired
    private SessionTypeService sessionTypeService;
    @Autowired
    private NamedParameterJdbcTemplate jdbcTemplate;

    public List<String> findAllTypeOptions() {
        return this.jdbcTemplate.queryForList(GET_TYPE_OPTIONS, new HashMap<>(), String.class);
    }

    @Transactional
    public SessionQueue addSessionType(Long queueId, String sessionType) {
        if (!securityService.hasPermission(ManagedPermission.ADMIN_QUEUES)) {
            throw new SecurityViolationException();
        }
        SessionTypeType.valueOf(sessionType);

        SessionQueue queue = this.findOne(queueId);
        boolean alreadyHasMapping = queue.getSessionTypes()
                                         .stream()
                                         .anyMatch(mapping -> mapping.getSessionType()
                                                                     .equalsIgnoreCase(sessionType));
        if (!alreadyHasMapping) {
            SessionQueueSessionType mapping = new SessionQueueSessionType();
            mapping.setSessionQueue(queue);
            mapping.setSessionType(sessionType);

            queue.getSessionTypes()
                 .add(mapping);
        }

        return queue;
    }

    @Transactional
    public SessionQueue removeSessionType(Long queueId, String sessionType) {
        if (!securityService.hasPermission(ManagedPermission.ADMIN_QUEUES)) {
            throw new SecurityViolationException();
        }
        SessionTypeType.valueOf(sessionType);

        SessionQueue queue = this.findOne(queueId);
        SessionQueueSessionType mapping = queue.getSessionTypes()
                                               .stream()
                                               .filter(existing -> existing.getSessionType()
                                                                           .equalsIgnoreCase(sessionType))
                                               .findFirst()
                                               .orElse(null);

        if (mapping != null) {
            queue.getSessionTypes()
                 .remove(mapping);
        }

        return queue;
    }

    @Transactional
    public void addCategory(Long queueId, Long categoryId) {
        if (!securityService.hasPermission(ManagedPermission.ADMIN_QUEUES)) {
            throw new SecurityViolationException();
        }

        Map<String, Object> params = this.buildCategoryParams(queueId, categoryId);
        try {
            this.jdbcTemplate.update(ADD_CATEGORY, params);
        } catch (DuplicateKeyException e) {
            //Do nothing on duplicate key
        }
    }

    @Transactional
    public void removeCategory(Long queueId, Long categoryId) {
        if (!securityService.hasPermission(ManagedPermission.ADMIN_QUEUES)) {
            throw new SecurityViolationException();
        }

        Map<String, Object> params = this.buildCategoryParams(queueId, categoryId);
        this.jdbcTemplate.update(REMOVE_CATEGORY, params);
    }

    private Map<String, Object> buildCategoryParams(Long queueId, Long categoryId) {
        Map<String, Object> params = new HashMap<>();
        params.put("queueId", queueId);
        params.put("wrapUpCategoryId", categoryId);
        return params;
    }

    public List<SessionQueue> findAllCaseQueues() {
        List<String> sessionTypes = this.sessionTypeService.findAllCaseTypes()
                                                           .stream()
                                                           .map(com.incomm.cca.model.domain.session.SessionType::getName)
                                                           .collect(Collectors.toList());
        return this.sessionQueueRepository.findAllCaseQueues(sessionTypes);
    }

    public SessionQueue findOne(Long id) {
        return sessionQueueRepository.findById(id)
                                     .orElse(null);
    }

    public SessionQueue findOneWithFetch(Long id) {
        return sessionQueueRepository.findOneWithFetch(id);
    }

    public SessionQueue findOneBySystemName(String systemName) {
        return sessionQueueRepository.findOneBySystemName(systemName);
    }

    public List<SessionQueue> getAllQueues() {
        try {
            return sessionQueueRepository.findAll();
        } catch (Exception e) {
            CsCoreLogger.error("Failed to retrieve all queues")
                        .exception(e)
                        .build();
            throw e;
        }
    }

    @Transactional
    public SessionQueue createQueue(SessionQueueView request) {
        try {
            if (!securityService.hasPermission(ManagedPermission.ADMIN_QUEUES)) {
                throw new SecurityViolationException();
            }
            SessionQueue candidate = this.queueConverter.convert(request);
            validateQueue(candidate);

            candidate.setSystemName(CaseFormatUtil.upperUnderscore(candidate.getI3Name()));

            SessionQueue existing = sessionQueueRepository.findOneBySystemName(candidate.getSystemName());
            if (existing != null) {
                throw new IllegalArgumentException("Queue with this name already exists");
            }

            candidate.setAutoWrapTime(convertAutoWrapTime(candidate.getAutoWrapTime()));
            candidate.setPermission(createQueuePermission(candidate));

            List<WrapUpCodeCategory> categories = new ArrayList<>();
            for (WrapUpCodeCategory newCategory : candidate.getWrapUpCodeCategories()) {
                WrapUpCodeCategory existingCategory = wrapUpCodeCategoryService.findOne(newCategory.getId());
                if (existingCategory == null) {
                    throw new NotFoundException(String.format("Category '%s' could not be found", newCategory.getI3Name()));
                }
                categories.add(existingCategory);
            }
            candidate.setWrapUpCodeCategories(categories);

            updateCache();

            return sessionQueueRepository.saveAndFlush(candidate);
        } catch (IllegalArgumentException e) {
            CsCoreLogger.warn("Bad attempt to create queue")
                        .json("request", request)
                        .keyValue("cause", e.getMessage())
                        .build();
            throw e;
        } catch (SecurityViolationException e) {
            CsCoreLogger.warn("Unauthorized attempt to create queue")
                        .json("request", request)
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to create queue")
                        .json("request", request)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public SessionQueue findQueueForI3Connect(String queueName) {
        if (StringUtils.isBlank(queueName)) {
            throw new UnsupportedI3ConnectionException("'queue' must be provided");
        }

        SessionQueue queue = sessionQueueRepository.findActiveByI3Name(queueName);
        if (queue != null) {
            return queue;
        } else {
            throw new UnsupportedI3ConnectionException("Unsupported queue or queue not active");
        }
    }

    @Transactional
    public Permission createQueuePermission(SessionQueue queue) {
        try {
            Permission permission = new Permission();
            permission.setActive(true);
            permission.setDescription("Permission to use this Session Queue.");
            permission.setDisplayName(String.format("Queue - %s", queue.getDisplayName()));

            PermissionCategory permissionCategory = permissionCategoryService.findOneByDisplayName("QUEUES");
            if (permissionCategory == null) {
                permissionCategory = permissionCategoryService.findUncategorized();
            }
            permission.setCategory(permissionCategory);

            return permissionService.createPermission(permission);
        } catch (Exception e) {
            CsCoreLogger.error("Failed to create queue permission")
                        .keyValue("queueName", queue.getSystemName())
                        .exception(e)
                        .build();

            throw e;
        }
    }

    private void validateQueue(SessionQueue queue) {
        if (StringUtils.isBlank(queue.getI3Name())) {
            throw new IllegalArgumentException("i3Name must be provided");
        } else if (StringUtils.isBlank(queue.getDisplayName())) {
            throw new IllegalArgumentException("displayName must be provided");
        } else if (queue.getLocale() == null) {
            throw new IllegalArgumentException("locale must be provided");
        } else if (queue.getType() == null) {
            throw new IllegalArgumentException("type must be provided");
        }
    }

    @Transactional
    public SessionQueue update(SessionQueueView request) {
        try {
            if (!securityService.hasPermission(ManagedPermission.ADMIN_QUEUES)) {
                throw new SecurityViolationException();
            }
            SessionQueue candidate = this.queueConverter.convert(request);
            validateQueue(candidate);

            SessionQueue existing = findOne(request.getId());
            if (existing == null) {
                throw new NotFoundException("Queue not found");
            }

            // Ensure nothing exists with the systemName already
            SessionQueue existingSystemName = sessionQueueRepository.findOneBySystemName(request.getSystemName());
            if (existingSystemName != null && !existingSystemName.getId()
                                                                 .equals(existing.getId())) {
                throw new IllegalArgumentException("Queue already exists with this name");
            }

            existing.setI3Name(candidate.getI3Name());
            existing.setDisplayName(candidate.getDisplayName());
            existing.setActive(candidate.getActive());
            existing.setAutoclose(candidate.getAutoclose());
            existing.setDefaultNote(candidate.getDefaultNote());
            existing.setLocale(candidate.getLocale());
            existing.setType(candidate.getType());
            existing.setRobohelpId(candidate.getRobohelpId());

            if (request.getAutoWrapTime() != null && !request.getAutoWrapTime()
                                                             .equals(existing.getAutoWrapTime())) {
                existing.setAutoWrapTime(convertAutoWrapTime(request.getAutoWrapTime()));
            }

            // Sync session types from the request with the existing types.
            if (candidate.getSessionTypes() != null) {
                Iterator<SessionQueueSessionType> existingI;
                Iterator<SessionQueueSessionType> candidateI;

                // Iterate request types, if it doesnt exist, add it to existing.
                candidateI = candidate.getSessionTypes().iterator();
                while (candidateI.hasNext()) {
                    SessionQueueSessionType newSessionType = candidateI.next();
                    boolean exists = false;
                    existingI = existing.getSessionTypes().iterator();
                    while (existingI.hasNext()) {
                        if (newSessionType.getSessionType().equals(existingI.next().getSessionType())) {
                            exists = true;
                            break;
                        }
                    }
                    if (!exists) {
                        existing.getSessionTypes().add(newSessionType);
                    }
                }

                // Iterate existing types, if it doesnt exist in request, delete it.
                existingI = existing.getSessionTypes().iterator();
                while (existingI.hasNext()) {
                    SessionQueueSessionType oldSessionType = existingI.next();
                    boolean exists = false;
                    candidateI = candidate.getSessionTypes().iterator();
                    while (candidateI.hasNext()) {
                        if (candidateI.next().getSessionType().equals(oldSessionType.getSessionType())) {
                            exists = true;
                            break;
                        }
                    }
                    if (!exists) {
                        existingI.remove();
                    }
                }
            }

            // Sync categories from the request with the existing types.
            if (candidate.getWrapUpCodeCategories() != null) {
                Iterator<WrapUpCodeCategory> existingI;
                Iterator<WrapUpCodeCategory> candidateI;

                // Iterate request types, if it doesnt exist, add it to existing.
                candidateI = candidate.getWrapUpCodeCategories().iterator();
                while (candidateI.hasNext()) {
                    WrapUpCodeCategory newCategory = candidateI.next();
                    boolean exists = false;
                    existingI = existing.getWrapUpCodeCategories().iterator();
                    while (existingI.hasNext()) {
                        if (newCategory.getId().equals(existingI.next().getId())) {
                            exists = true;
                            break;
                        }
                    }
                    if (!exists) {
                        existing.getWrapUpCodeCategories().add(wrapUpCodeCategoryService.findOne(newCategory.getId()));
                    }
                }

                // Iterate existing types, if it doesnt exist in request, delete it.
                existingI = existing.getWrapUpCodeCategories().iterator();
                while (existingI.hasNext()) {
                    WrapUpCodeCategory oldCategory = existingI.next();
                    boolean exists = false;
                    candidateI = candidate.getWrapUpCodeCategories().iterator();
                    while (candidateI.hasNext()) {
                        if (candidateI.next().getId().equals(oldCategory.getId())) {
                            exists = true;
                            break;
                        }
                    }
                    if (!exists) {
                        existingI.remove();
                    }
                }
            }

            updateCache();

            return existing;
        } catch (IllegalArgumentException | NotFoundException e) {
            CsCoreLogger.warn("Bad attempt to update queue")
                        .json("request", request)
                        .keyValue("cause", e.getMessage())
                        .build();
            throw e;
        } catch (SecurityViolationException e) {
            CsCoreLogger.warn("Unauthorized attempt to update queue")
                        .json("request", request)
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to update queue")
                        .json("request", request)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    private Long convertAutoWrapTime(Long autoWrapTime) {
        if (autoWrapTime != null && autoWrapTime < 1000) {
            return autoWrapTime * 1000;
        }
        return autoWrapTime;
    }

    public List<SessionQueueView> findAllForSessionType(String sessionType) {

        try {
            List<SessionQueueView> cachedQueues = sessionQueueBySessionTypeCache.get(sessionType);
            if (cachedQueues != null) {
                return cachedQueues;
            } else {
                return updateCacheForSessionType(sessionType);
            }
        } catch (Exception e) {
            CsCoreLogger.error("Failed to retrieve queues")
                        .keyValue("sessionType", sessionType)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    /**
     * Prompt refreshing queue cache.  By default, don't check if sys admin for backwards compatibility.
     */
    public void updateCache() {
        updateCache(false);
    }

    /**
     * If update through the refresh endpoint, check if sys admin.
     *
     * @param checkIsSysAdmin
     */
    public void updateCache(Boolean checkIsSysAdmin) {
        if (checkIsSysAdmin) {
            securityService.validateIsSystemAdministrator();
        }

        for (String sessionType : new SessionTypeType().getValues()) {
            updateCacheForSessionType(sessionType);
        }
    }

    private List<SessionQueueView> updateCacheForSessionType(String sessionType) {
        try {
            List<SessionQueue> queues = sessionQueueRepository.findAllBySessionTypeAndActiveTrue(sessionType);
            List<SessionQueueView> viewModels = queueConverter.convert(queues);

            sessionQueueBySessionTypeCache.put(sessionType, viewModels);

            return viewModels;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to update queues cache for sessionType")
                        .keyValue("sessionType", sessionType)
                        .exception(e)
                        .build();
            throw e;
        }
    }
}
