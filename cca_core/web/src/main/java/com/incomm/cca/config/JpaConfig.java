package com.incomm.cca.config;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableJpaRepositories("com.incomm.cca.repository")
@EntityScan(basePackages = "com.incomm.cca.model")
@EnableTransactionManagement
public class JpaConfig {

}
