package com.incomm.cca.repository;

import com.incomm.cca.model.domain.WrapUpCode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WrapUpCodeRepository extends JpaRepository<WrapUpCode, Long> {

    List<WrapUpCode> findAllByCategoriesId(Long id);

    WrapUpCode findOneByI3Name(String name);
}
