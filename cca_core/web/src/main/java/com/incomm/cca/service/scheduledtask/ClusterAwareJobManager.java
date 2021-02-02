package com.incomm.cca.service.scheduledtask;

import com.incomm.cca.hazelcast.JobLockManager;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

public abstract class ClusterAwareJobManager {

    // Production
    private static final String HOST_GREEN = "spccaweb";
    private static final String HOST_GREEN_01 = "spccaweb01v";
    private static final String HOST_GREEN_02 = "spccaweb02v";
    private static final String HOST_GREEN_03 = "spccaweb03v";
    private static final String HOST_BLUE_01 = "spbccaweb01v";
    private static final String HOST_BLUE_02 = "spbccaweb02v";
    private static final String HOST_BLUE_03 = "spbccaweb03v";

    @Value("${job.wait-time.spccaweb01v:0}")
    private Integer jobWaitTimeSpccaweb01v;
    @Value("${job.wait-time.spccaweb02v:0}")
    private Integer jobWaitTimeSpccaweb02v;
    @Value("${job.wait-time.spccaweb03v:0}")
    private Integer jobWaitTimeSpccaweb03v;
    @Value("${job.wait-time.spbccaweb01v:0}")
    private Integer jobWaitTimeSpbccaweb01v;
    @Value("${job.wait-time.spbccaweb02v:0}")
    private Integer jobWaitTimeSpbccaweb02v;
    @Value("${job.wait-time.spbccaweb03v:0}")
    private Integer jobWaitTimeSpbccaweb03v;

    // Staging
    private static final String HOST_STG = "ssccaweb";
    private static final String HOST_STG_01 = "ssccaweb01v";
    private static final String HOST_STG_02 = "ssccaweb02v";

    @Value("${job.wait-time.ssccaweb01v:0}")
    private Integer jobWaitTimeSsccaweb01v;
    @Value("${job.wait-time.ssccaweb02v:0}")
    private Integer jobWaitTimeSsccaweb02v;

    // UAT
    private static final String HOST_UAT = "succaweb";
    private static final String HOST_UAT_01 = "succaweb01v";
    private static final String HOST_UAT_02 = "succaweb02v";

    @Value("${job.wait-time.succaweb01v:0}")
    private Integer jobWaitTimeSuccaweb01v;
    @Value("${job.wait-time.succaweb02v:0}")
    private Integer jobWaitTimeSuccaweb02v;

    @Autowired
    protected JobLockManager jobLockManager;

    public abstract void checkJobLockStatus();

    protected void waitExtraTimeIfNecessary() {
        int waitTime = getExtraWaitTime();
        if (waitTime > 0) {
            try {
                Thread.sleep(waitTime);
            } catch (InterruptedException e) {
                //Do nothing
            }
        }
    }

    private Integer getExtraWaitTime() {
        String hostName = jobLockManager.getHostname();
        if (StringUtils.isNotBlank(hostName)) {
            if (hostName.toLowerCase()
                        .contains(HOST_GREEN_01)) {
                return jobWaitTimeSpccaweb01v;
            } else if (hostName.toLowerCase()
                               .contains(HOST_GREEN_02)) {
                return jobWaitTimeSpccaweb02v;
            } else if (hostName.toLowerCase()
                               .contains(HOST_GREEN_03)) {
                return jobWaitTimeSpccaweb03v;
            } else if (hostName.toLowerCase()
                               .contains(HOST_BLUE_01)) {
                return jobWaitTimeSpbccaweb01v;
            } else if (hostName.toLowerCase()
                               .contains(HOST_BLUE_02)) {
                return jobWaitTimeSpbccaweb02v;
            } else if (hostName.toLowerCase()
                               .contains(HOST_BLUE_03)) {
                return jobWaitTimeSpbccaweb03v;
            } else if (hostName.toLowerCase()
                               .contains(HOST_STG_01)) {
                return jobWaitTimeSsccaweb01v;
            } else if (hostName.toLowerCase()
                               .contains(HOST_STG_02)) {
                return jobWaitTimeSsccaweb02v;
            } else if (hostName.toLowerCase()
                               .contains(HOST_UAT_01)) {
                return jobWaitTimeSuccaweb01v;
            } else if (hostName.toLowerCase()
                               .contains(HOST_UAT_02)) {
                return jobWaitTimeSuccaweb02v;
            }
        }

        return 0;
    }

    public boolean isPrimaryHost() {
        if (jobLockManager.getHostname().startsWith(HOST_GREEN)
                || jobLockManager.getHostname().startsWith(HOST_STG)
                || jobLockManager.getHostname().startsWith(HOST_UAT)) {
            return jobLockManager.getHostname().startsWith(HOST_GREEN_01)
                    || jobLockManager.getHostname().startsWith(HOST_STG_01)
                    || jobLockManager.getHostname().startsWith(HOST_UAT_01);
        } else {
            return true;
        }
    }
}
