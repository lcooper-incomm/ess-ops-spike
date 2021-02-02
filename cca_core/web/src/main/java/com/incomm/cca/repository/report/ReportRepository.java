package com.incomm.cca.repository.report;

import com.incomm.cca.model.domain.Report;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportRepository extends JpaRepository<Report, Long> {

    Report findOneByNameIgnoreCase(String name);
}
