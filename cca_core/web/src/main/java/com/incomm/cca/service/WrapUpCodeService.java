package com.incomm.cca.service;

import com.incomm.cca.exception.NotFoundException;
import com.incomm.cca.exception.SecurityViolationException;
import com.incomm.cca.exception.UniqueConstraintViolationException;
import com.incomm.cca.model.constant.PropertySystemName;
import com.incomm.cca.model.converter.WrapUpCodeConverter;
import com.incomm.cca.model.domain.Property;
import com.incomm.cca.model.domain.WrapUpCode;
import com.incomm.cca.model.enums.ManagedPermission;
import com.incomm.cca.model.view.session.queue.WrapUpCodeView;
import com.incomm.cca.repository.WrapUpCodeRepository;
import com.incomm.cscore.logging.CsCoreLogger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Service
public class WrapUpCodeService {

    @Autowired
    private WrapUpCodeRepository codeRepository;
    @Autowired
    private PropertyService propertyService;
    @Autowired
    private SecurityService securityService;
    @Autowired
    private WrapUpCodeConverter wrapUpCodeConverter;

    public List<WrapUpCode> findAllByCategoryId(Long id) {
        return codeRepository.findAllByCategoriesId(id);
    }

    public WrapUpCode findOne(String name) {
        return codeRepository.findOneByI3Name(name);
    }

    public WrapUpCode findOne(Long id) {
        return codeRepository.findById(id)
                             .orElse(null);
    }

    public List<WrapUpCode> getAllCodes() {
        return codeRepository.findAll();
    }

    public WrapUpCode getAutoWrapWrapUpCode() {
        try {
            Property defaultWrapUpCodeIdProperty = propertyService.findOneBySystemName(PropertySystemName.DEFAULT_WRAP_UP_CODE_ID);
            if (defaultWrapUpCodeIdProperty == null) {
                throw new NotFoundException(String.format("Property systemName=%s not found!", PropertySystemName.DEFAULT_WRAP_UP_CODE_ID));
            }

            WrapUpCode wrapUpCode = findOne(Long.parseLong(defaultWrapUpCodeIdProperty.getValue()));
            if (wrapUpCode == null) {
                throw new NotFoundException("AutoWrap wrap up code not found!");
            }

            return wrapUpCode;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to retrieve default auto wrap wrap up code!")
                        .exception(e)
                        .build();

            return null;
        }
    }

    public WrapUpCode getCallDroppedWrapUpCode() {
        try {
            Property defaultWrapUpCodeIdProperty = propertyService.findOneBySystemName(PropertySystemName.DEFAULT_DROPPED_CALL_WRAP_UP_CODE_ID);
            if (defaultWrapUpCodeIdProperty == null) {
                throw new NotFoundException(String.format("Property systemName=%s not found!", PropertySystemName.DEFAULT_DROPPED_CALL_WRAP_UP_CODE_ID));
            }

            WrapUpCode wrapUpCode = findOne(Long.parseLong(defaultWrapUpCodeIdProperty.getValue()));
            if (wrapUpCode == null) {
                throw new NotFoundException("Dropped Call wrap up code not found!");
            }

            return wrapUpCode;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to retrieve default dropped call wrap up code!")
                        .exception(e)
                        .build();
            throw e;
        }
    }

    @Transactional
    public WrapUpCode newCode(WrapUpCodeView request) {
        if (!securityService.hasPermission(ManagedPermission.ADMIN_QUEUES)) {
            throw new SecurityViolationException();
        }

        WrapUpCode candidate = this.wrapUpCodeConverter.convert(request);

        //Make sure the code doesn't already exist
        WrapUpCode existingCode = codeRepository.findOneByI3Name(candidate.getI3Name());
        if (existingCode != null) {
            throw new UniqueConstraintViolationException();
        }

        WrapUpCode code = new WrapUpCode();
        code.setActive(candidate.getActive());
        code.setLocked(candidate.getLocked());
        code.setI3Name(candidate.getI3Name());
        code.setDisplayName(candidate.getDisplayName());

        code = codeRepository.saveAndFlush(code);

        return code;
    }

    @Transactional
    public WrapUpCode updateCode(WrapUpCodeView request) {
        if (!securityService.hasPermission(ManagedPermission.ADMIN_QUEUES)) {
            throw new SecurityViolationException();
        }

        WrapUpCode candidate = this.wrapUpCodeConverter.convert(request);

        //Make sure the code does exist
        WrapUpCode existingCode = this.findOne(candidate.getId());
        if (existingCode == null) {
            throw new NotFoundException(String.format("Code id '%s' could not be found", candidate.getId()));
        }

        //If the i3Name has changed, make sure a code doesn't already exist with that name before proceeding
        if (!Objects.equals(existingCode.getI3Name()
                                        .toLowerCase(), candidate.getI3Name()
                                                                 .toLowerCase())) {
            WrapUpCode newCode = codeRepository.findOneByI3Name(candidate.getI3Name());
            if (newCode != null) {
                throw new UniqueConstraintViolationException();
            }
        }

        existingCode.setI3Name(candidate.getI3Name());
        existingCode.setDisplayName(candidate.getDisplayName());
        existingCode.setActive(candidate.getActive());
        existingCode.setLocked(candidate.getLocked());

        return existingCode;
    }
}
