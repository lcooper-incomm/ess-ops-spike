package com.incomm.cca.repository;

import com.incomm.cca.model.domain.VmsProductCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VmsProductCodeRepository extends JpaRepository<VmsProductCode, Long> {

    @Query("SELECT DISTINCT vpc FROM VmsProductCode vpc JOIN FETCH vpc.types vpt WHERE vpc.partner.name = :partner AND vpt.enabled = TRUE ORDER BY vpc.name ASC")
    List<VmsProductCode> findAllActiveForPartner(@Param("partner") String partner);

    @Query("SELECT DISTINCT vpc FROM VmsProductCode vpc JOIN FETCH vpc.types vpt WHERE vpc.partner.name = :partner ORDER BY vpc.name ASC")
    List<VmsProductCode> findAllForPartner(@Param("partner") String partner);
}
