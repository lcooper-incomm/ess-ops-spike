package com.incomm.cca.service;

import com.incomm.cca.model.domain.PlatformStatusValue;
import com.incomm.cca.repository.action.PlatformStatusValueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlatformStatusValueService {

    @Autowired
    private PlatformStatusValueRepository platformStatusValueRepository;

    public List<PlatformStatusValue> findAll() {
        return platformStatusValueRepository.findAll();
    }

    public List<PlatformStatusValue> findAllByPlatform(String platform) {
        return platformStatusValueRepository.findAllByPlatform(platform);
    }

    public PlatformStatusValue findOneByNameAndPlatform(String name, String platform) {
        return platformStatusValueRepository.findOneByNameAndPlatform(name, platform);
    }

    public PlatformStatusValue findOneByValueAndPlatform(String value, String platform) {
        return platformStatusValueRepository.findOneByValueAndPlatform(value, platform);
    }
}
