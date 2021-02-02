package com.incomm.cca.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@Configuration
@EnableScheduling
public class ScheduledTaskConfig {

    @Bean(destroyMethod = "shutdownNow")
    public ExecutorService taskScheduler() {
        return Executors.newScheduledThreadPool(5);
    }
}
