package com.incomm.cca.repository.mapping;

import com.incomm.cca.model.domain.mapping.ActionReasonCodeMapping;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ActionReasonCodeMappingRepository extends JpaRepository<ActionReasonCodeMapping, Long> {

    List<ActionReasonCodeMapping> findAllByTypeAndPlatformIgnoreCase(String type, String platform);

    ActionReasonCodeMapping findOneByTypeAndPlatformAndCodeIgnoreCase(String type, String platform, String code);
}
