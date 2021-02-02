package com.incomm.cca.service.complaint;

import com.incomm.cca.exception.SecurityViolationException;
import com.incomm.cca.model.domain.complaint.Bank;
import com.incomm.cca.repository.complaint.BankRepository;
import com.incomm.cca.service.CcaAbstractCrudService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BankService extends CcaAbstractCrudService<Bank, Long> {

    @Autowired
    private BankRepository bankRepository;

    @Override
    public Bank addOne(final Bank request) {
        throw new UnsupportedOperationException();
    }

    @Override
    public void deleteOne(final Long id) {
        throw new UnsupportedOperationException();
    }

    public Bank findOneBySystemValue(String systemValue) {
        return this.bankRepository.findOneBySystemValueIgnoreCase(systemValue);
    }

    @Override
    public Bank updateOne(final Bank request) {
        throw new UnsupportedOperationException();
    }

    @Override
    protected void validateAddPermission() throws SecurityViolationException {
        this.securityService.validateIsSystemAdministrator();
    }

    @Override
    protected void validateDeletePermission() throws SecurityViolationException {
        this.securityService.validateIsSystemAdministrator();
    }

    @Override
    protected void validateFindPermission() throws SecurityViolationException {

    }

    @Override
    protected void validateUpdatePermission() throws SecurityViolationException {
        this.securityService.validateIsSystemAdministrator();
    }

    @Override
    protected void controlledUpdateOne(final Bank source, final Bank target) {
    }

    @Override
    protected void validateUnique(final Bank bank) throws IllegalArgumentException {
        Bank existing = this.findOneBySystemValue(bank.getSystemValue());
        if (existing != null && !existing.getId()
                                         .equals(bank.getId())) {
            throw new IllegalArgumentException("Bank with this systemValue already exists");
        }
    }

    @Override
    protected String getModelName() {
        return Bank.class.getSimpleName();
    }
}
