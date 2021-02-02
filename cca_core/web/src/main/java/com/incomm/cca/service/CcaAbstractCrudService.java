package com.incomm.cca.service;

import com.incomm.cca.exception.SecurityViolationException;
import com.incomm.cca.model.domain.AuditableEntity;
import com.incomm.cca.model.domain.User;
import com.incomm.cscore.logging.CsCoreLogger;
import com.incomm.cscore.mvcutils.model.CrudEntity;
import com.incomm.cscore.mvcutils.service.AbstractControlledUpdateCrudService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.io.Serializable;
import java.util.List;

/**
 * This service intended to wrap the CS-Core abstract service and provide general permission checks and exception
 * handling (logging) not provided by the CS-Core service. Simply another way to reduce boilerplate and increase
 * consistency across services.
 */
public abstract class CcaAbstractCrudService<T extends CrudEntity<I>, I extends Serializable> extends AbstractControlledUpdateCrudService<T, I> {

    @Autowired
    protected UserService userService;
    @Autowired
    protected SecurityService securityService;

    protected abstract void validateAddPermission() throws SecurityViolationException;

    protected abstract void validateDeletePermission() throws SecurityViolationException;

    protected abstract void validateFindPermission() throws SecurityViolationException;

    protected abstract void validateUpdatePermission() throws SecurityViolationException;

    @Override
    @Transactional
    public T addOne(T request) {
        try {
            validateAddPermission();

            if (request instanceof AuditableEntity) {
                User currentUser = userService.currentPersistentUser();
                ((AuditableEntity) request).setCreatedBy(currentUser);
                ((AuditableEntity) request).setModifiedBy(currentUser);
            }

            return super.addOne(request);
        } catch (IllegalArgumentException e) {
            CsCoreLogger.warn(String.format("Bad attempt to create %s", getModelName()))
                        .keyValue("cause", e.getMessage())
                        .json("request", request)
                        .build();
            throw e;
        } catch (SecurityViolationException e) {
            CsCoreLogger.warn(String.format("Unauthorized attempt to create %s", getModelName()))
                        .json("request", request)
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.warn(String.format("Failed to create %s", getModelName()))
                        .json("request", request)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    @Override
    @Transactional
    public void deleteOne(final I id) {
        try {
            validateDeletePermission();
            super.deleteOne(id);
        } catch (IllegalArgumentException e) {
            CsCoreLogger.warn(String.format("Bad attempt to delete %s", getModelName()))
                        .keyValue("id", id)
                        .keyValue("cause", e.getMessage())
                        .build();
            throw e;
        } catch (SecurityViolationException e) {
            CsCoreLogger.warn(String.format("Unauthorized attempt to delete %s", getModelName()))
                        .keyValue("id", id)
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.warn(String.format("Failed to delete %s", getModelName()))
                        .keyValue("id", id)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    @Override
    public List<T> findAll() {
        try {
            validateFindPermission();
            return super.findAll();
        } catch (SecurityViolationException e) {
            CsCoreLogger.warn(String.format("Unauthorized attempt to retrieve %s", getModelName()))
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.warn(String.format("Failed to retrieve %s", getModelName()))
                        .exception(e)
                        .build();
            throw e;
        }
    }

    @Override
    public T findOne(I id) {
        try {
            validateFindPermission();
            return super.findOne(id);
        } catch (SecurityViolationException e) {
            CsCoreLogger.warn(String.format("Unauthorized attempt to retrieve %s", getModelName()))
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.warn(String.format("Failed to retrieve %s", getModelName()))
                        .exception(e)
                        .build();
            throw e;
        }
    }

    @Override
    @Transactional
    public T updateOne(T request) {
        try {
            validateUpdatePermission();

            if (request instanceof AuditableEntity) {
                User currentUser = userService.currentPersistentUser();
                ((AuditableEntity) request).setModifiedBy(currentUser);
            }

            return super.updateOne(request);
        } catch (IllegalArgumentException e) {
            CsCoreLogger.warn(String.format("Bad attempt to update %s", getModelName()))
                        .keyValue("cause", e.getMessage())
                        .json("request", request)
                        .build();
            throw e;
        } catch (SecurityViolationException e) {
            CsCoreLogger.warn(String.format("Unauthorized attempt to update %s", getModelName()))
                        .json("request", request)
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.warn(String.format("Failed to update %s", getModelName()))
                        .json("request", request)
                        .exception(e)
                        .build();
            throw e;
        }
    }
}
