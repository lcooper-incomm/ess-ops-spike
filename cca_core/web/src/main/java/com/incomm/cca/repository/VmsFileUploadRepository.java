package com.incomm.cca.repository;

import com.incomm.cca.model.domain.VmsFileUpload;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VmsFileUploadRepository extends JpaRepository<VmsFileUpload, Long> {

    @Query("from VmsFileUpload v where v.hashCode = :hashCode and v.customerId = :customerId")
    List<VmsFileUpload> findByHashCode(@Param("customerId") Long customerId, @Param("hashCode") String hashCode);
}
