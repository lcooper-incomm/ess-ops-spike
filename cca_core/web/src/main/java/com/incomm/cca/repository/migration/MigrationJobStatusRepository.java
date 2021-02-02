package com.incomm.cca.repository.migration;

import com.incomm.cca.model.domain.migration.MigrationJobStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MigrationJobStatusRepository extends JpaRepository<MigrationJobStatus, Long> {

    MigrationJobStatus findOneByName(String name);
}
