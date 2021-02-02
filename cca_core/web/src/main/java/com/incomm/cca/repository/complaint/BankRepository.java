package com.incomm.cca.repository.complaint;

import com.incomm.cca.model.domain.complaint.Bank;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BankRepository extends JpaRepository<Bank, Long> {

    @EntityGraph(attributePaths = {"createdBy", "deletedBy", "modifiedBy"})
    List<Bank> findAll();

    Bank findOneBySystemValueIgnoreCase(String systemValue);
}
