package com.incomm.cca.repository;

import com.incomm.cca.model.domain.WrapUpCodeCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface WrapUpCodeCategoryRepository extends JpaRepository<WrapUpCodeCategory, Long> {

    WrapUpCodeCategory findOneByI3Name(String name);

    @Query("from WrapUpCodeCategory cat left join fetch cat.wrapUpCodes c where cat.id = :id")
    WrapUpCodeCategory findOneWithFetch(@Param("id") Long id);

    List<WrapUpCodeCategory> findAllByQueuesIdAndActiveIsTrue(Long id);
}
