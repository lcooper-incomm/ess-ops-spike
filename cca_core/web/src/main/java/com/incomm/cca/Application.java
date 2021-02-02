package com.incomm.cca;

import com.incomm.cscore.canary.config.CanaryConfig;
import com.incomm.cscore.logging.LoggingConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;

@SpringBootApplication
@Import({LoggingConfig.class, CanaryConfig.class})
@ComponentScan(basePackages = {"com.incomm.cca", "com.incomm.cscore.client"})
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
