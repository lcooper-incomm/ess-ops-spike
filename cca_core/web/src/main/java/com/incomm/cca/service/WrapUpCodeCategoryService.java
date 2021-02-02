package com.incomm.cca.service;

import com.incomm.cca.exception.NotFoundException;
import com.incomm.cca.exception.SecurityViolationException;
import com.incomm.cca.exception.UniqueConstraintViolationException;
import com.incomm.cca.model.converter.WrapUpCodeCategoryConverter;
import com.incomm.cca.model.domain.WrapUpCode;
import com.incomm.cca.model.domain.WrapUpCodeCategory;
import com.incomm.cca.model.enums.ManagedPermission;
import com.incomm.cca.model.view.session.queue.WrapUpCodeCategoryView;
import com.incomm.cca.repository.WrapUpCodeCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class WrapUpCodeCategoryService {

    private static final String ADD_WRAP_UP_CODE = "INSERT INTO wrap_up_code_category_wrap_up_code (category_Id, code_Id) VALUES (:categoryId, :wrapUpCodeId)";
    private static final String REMOVE_WRAP_UP_CODE = "DELETE FROM wrap_up_code_category_wrap_up_code WHERE category_id = :categoryId AND code_id = :wrapUpCodeId";

    @Autowired
    private WrapUpCodeCategoryRepository categoryRepository;
    @Autowired
    private WrapUpCodeService codeService;
    @Autowired
    private QueueService queueService;
    @Autowired
    private WrapUpCodeCategoryConverter categoryConverter;
    @Autowired
    private SecurityService securityService;
    @Autowired
    private NamedParameterJdbcTemplate jdbcTemplate;

    public List<WrapUpCodeCategory> getAllCategories() {
        return categoryRepository.findAll();
    }

    public List<WrapUpCodeCategory> findAllByQueueId(Long queueId) {
        return categoryRepository.findAllByQueuesIdAndActiveIsTrue(queueId);
    }

    public WrapUpCodeCategory findOne(Long id) {
        return categoryRepository.findById(id)
                                 .orElse(null);
    }

    public WrapUpCodeCategory findOneWithFetch(Long id) {
        return categoryRepository.findOneWithFetch(id);
    }

    @Transactional
    public WrapUpCodeCategory newCategory(WrapUpCodeCategoryView request) {
        if (!securityService.hasPermission(ManagedPermission.ADMIN_QUEUES)) {
            throw new SecurityViolationException();
        }

        WrapUpCodeCategory candidate = this.categoryConverter.convert(request);

        WrapUpCodeCategory existingCategory = categoryRepository.findOneByI3Name(candidate.getI3Name());
        if (existingCategory != null) {
            throw new UniqueConstraintViolationException();
        }

        WrapUpCodeCategory category = new WrapUpCodeCategory();
        category.setActive(candidate.getActive());
        category.setI3Name(candidate.getI3Name());
        category.setDisplayName(candidate.getDisplayName());

        categoryRepository.saveAndFlush(category);

        for (WrapUpCode codeRequest : candidate.getWrapUpCodes()) {
            WrapUpCode code = codeService.findOne(codeRequest.getI3Name());
            if (code == null) {
                throw new NotFoundException(String.format("Code '%s' could not be found", codeRequest.getI3Name()));
            }
            code.getCategories()
                .add(category);
            category.getWrapUpCodes()
                    .add(code);
        }
        queueService.updateCache();

        category = categoryRepository.saveAndFlush(category);

        return category;
    }

    @Transactional
    public WrapUpCodeCategory updateCategory(WrapUpCodeCategoryView request) {
        if (!securityService.hasPermission(ManagedPermission.ADMIN_QUEUES)) {
            throw new SecurityViolationException();
        }

        WrapUpCodeCategory candidate = this.categoryConverter.convert(request);

        WrapUpCodeCategory existingCategory = this.findOne(candidate.getId());
        if (existingCategory == null) {
            throw new NotFoundException(String.format("Category id '%s' could not be found", candidate.getId()));
        }

        //If the i3Name has changed, make sure a category doesn't already exist with that name before proceeding
        if (!Objects.equals(existingCategory.getI3Name()
                                            .toLowerCase(), candidate.getI3Name()
                                                                     .toLowerCase())) {
            WrapUpCodeCategory newCategory = categoryRepository.findOneByI3Name(candidate.getI3Name());
            if (newCategory != null) {
                throw new UniqueConstraintViolationException();
            }
        }

        existingCategory.setI3Name(candidate.getI3Name());
        existingCategory.setDisplayName(candidate.getDisplayName());
        existingCategory.setActive(candidate.getActive());

        if (candidate.getWrapUpCodes() != null) {
            // Remove references to category from all existing codes
            for (WrapUpCode code : existingCategory.getWrapUpCodes()) {
                code.getCategories()
                    .remove(existingCategory);
            }

            List<WrapUpCode> codes = new ArrayList<>();
            for (WrapUpCode codeRequest : candidate.getWrapUpCodes()) {
                WrapUpCode code = codeService.findOne(codeRequest.getI3Name());
                if (code == null) {
                    throw new NotFoundException(String.format("Code '%s' could not be found", codeRequest.getI3Name()));
                }
                code.getCategories()
                    .add(existingCategory);
                codes.add(code);
            }
            existingCategory.setWrapUpCodes(codes);
        }

        queueService.updateCache();

        return existingCategory;
    }

    @Transactional
    public void addWrapUpCode(Long categoryId, Long wrapUpCodeId) {
        if (!securityService.hasPermission(ManagedPermission.ADMIN_QUEUES)) {
            throw new SecurityViolationException();
        }
        Map<String, Object> params = this.buildWrapUpCodeParams(categoryId, wrapUpCodeId);
        try {
            this.jdbcTemplate.update(ADD_WRAP_UP_CODE, params);
        } catch (DuplicateKeyException e) {
            //Do nothing on duplicate entry
        }
    }

    @Transactional
    public void removeWrapUpCode(Long categoryId, Long wrapUpCodeId) {
        if (!securityService.hasPermission(ManagedPermission.ADMIN_QUEUES)) {
            throw new SecurityViolationException();
        }
        Map<String, Object> params = this.buildWrapUpCodeParams(categoryId, wrapUpCodeId);
        this.jdbcTemplate.update(REMOVE_WRAP_UP_CODE, params);
    }

    private Map<String, Object> buildWrapUpCodeParams(Long categoryId, Long wrapUpCodeId) {
        Map<String, Object> params = new HashMap<>();
        params.put("categoryId", categoryId);
        params.put("wrapUpCodeId", wrapUpCodeId);
        return params;
    }
}
