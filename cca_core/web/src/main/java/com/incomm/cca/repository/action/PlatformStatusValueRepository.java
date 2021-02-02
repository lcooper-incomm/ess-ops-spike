package com.incomm.cca.repository.action;

import com.incomm.cca.model.domain.PlatformStatusValue;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlatformStatusValueRepository extends JpaRepository<PlatformStatusValue, String> {

    List<PlatformStatusValue> findAllByPlatform(String platform);

    PlatformStatusValue findOneByNameAndPlatform(String name, String platform);

    PlatformStatusValue findOneByValueAndPlatform(String value, String platform);
}
