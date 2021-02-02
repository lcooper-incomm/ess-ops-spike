package com.incomm.cca.repository;

import com.incomm.cca.model.domain.ServeFileUpload;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ServeFileUploadRepository extends JpaRepository<ServeFileUpload, Long> {

    @Query("from ServeFileUpload v where v.hashCode = :hashCode and v.accountId = :accountId")
    List<ServeFileUpload> findByHashCode(@Param("accountId") Long accountId, @Param("hashCode") String hashCode);
}
