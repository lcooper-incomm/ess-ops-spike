package com.incomm.cca.repository;

import com.incomm.cca.model.domain.Property;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PropertyRepository extends JpaRepository<Property, Long> {

    Property findOneBySystemName(String propertySystemName);
}
