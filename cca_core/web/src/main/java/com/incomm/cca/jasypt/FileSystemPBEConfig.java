package com.incomm.cca.jasypt;

import org.jasypt.encryption.pbe.config.SimpleStringPBEConfig;
import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.core.io.ResourceLoader;
import org.springframework.core.io.support.PropertiesLoaderUtils;

import java.io.IOException;
import java.util.Properties;

/**
 * Looks for a system property call #FILE_PATH_SYSPROP, loads the file as a standard java properties file,
 * and configures the PBEConfig.
 *
 * @author: derickson
 */
public class FileSystemPBEConfig extends SimpleStringPBEConfig {

    private ResourceLoader resourceLoader = new DefaultResourceLoader();
    private static final String ENCRYPTION_PASSWORD_PROPERTY = "config.encryption.password";

    public FileSystemPBEConfig() {

        String configPropertiesFilePath = null;
        try {
            //Get our environment (Try as I might, I couldn't get Spring to inject any properties values for me, so this is the solution for the time being)
            String appEnv = System.getProperty("app.env");
            configPropertiesFilePath = "classpath:config_" + appEnv + ".properties";

            Properties configProperties = PropertiesLoaderUtils.loadProperties(resourceLoader.getResource(configPropertiesFilePath));
            extractProperties(configProperties);
        } catch (IOException e) {
            throw new IllegalStateException("Failed to load configuration properties file containing password used to decrypt the application configuration. File: " + configPropertiesFilePath, e);
        }
    }

    private void extractProperties(Properties props) {
        String password = props.getProperty(ENCRYPTION_PASSWORD_PROPERTY);
        this.setPassword(password);
    }
}
