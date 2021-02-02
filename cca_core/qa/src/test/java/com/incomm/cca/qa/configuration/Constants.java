package com.incomm.cca.qa.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

/**
 * Constants pulled from the property file
 * User: mgalloway
 * Date: 3/6/13
 * Time: 9:48 AM
 */
@Component
public class Constants {

    @Value("${aqat.driver.type:REMOTE}")
    public String driverType;
    @Value("${aqat.wait.explicit:60000}")
    public Long defaultExplicitWait;
    @Value("${aqat.wait.explicit.timeunit:MILLISECONDS}")
    public String defaultExplicitWaitTimeUnit;
    @Value("${aqat.wait.implicit:60000}")
    public Long defaultImplicitWait;
    @Value("${aqat.wait.implicit.timeunit:MILLISECONDS}")
    public String defaultImplicitWaitTimeUnit;
    @Value("${app.env}")
    public String APP_ENV;
    @Value("${app.server}")
    public String SERVER;
    @Value("${app.host}")
    public String APP_HOST;
    @Value("${app.host.port}")
    public String APP_HOST_PORT;
    @Value("${app.version}")
    public String APP_VERSION;
    @Value("${build.number}")
    public String BUILD_NUMBER;
    @Value("${app.url}")
    public String APP_URL;
    @Value("${app.turnOnLogging}")
    public String TURN_ON_LOGGING;
    @Value("${db.url}")
    public String DB_URL;
    @Value("${db.class}")
    public String DB_CLASS;
    @Value("${db.username}")
    public String DB_USERNAME;
    @Value("${db.password}")
    public String DB_PASSWORD;
    /* API ENDPOINTS */
    // IVR
    public String ivrCallDetail;
    // I3
    public String i3ReceivedCall;
    public String i3CallDisconnected;

    @PostConstruct
    void postConstruct() {

        // IVR
        ivrCallDetail = APP_URL + "/rest/ivr/calldetail";

        // I3
        i3ReceivedCall = APP_URL + "/rest/i3/call";
        i3CallDisconnected = APP_URL + "/rest/i3/call/{callId}";
    }
}
