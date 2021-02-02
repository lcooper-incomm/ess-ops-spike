package com.incomm.cca.hazelcast;

import com.hazelcast.core.HazelcastInstance;
import com.incomm.cca.model.constant.JobType;
import com.incomm.cca.model.domain.JobLock;
import com.incomm.cca.service.cache.JobLockCache;
import com.incomm.cca.togglz.TogglzFeature;
import com.incomm.cscore.logging.CsCoreLogger;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Date;
import java.util.UUID;

@Service
public class JobLockManager {

    private String registeredHostname;
    @Autowired
    private JobLockCache jobLockCache;
    @Autowired
    private HazelcastManager hazelcastManager;

    @PostConstruct
    public void init() {
        HazelcastInstance hazelcastInstance = this.hazelcastManager.getHazelcastInstance();
        CsCoreLogger.info("Hazelcast Instance")
                    .keyValue("name", hazelcastInstance.getName())
                    .keyValue("groupName", hazelcastInstance.getConfig().getGroupConfig().getName())
                    .keyValue("instanceName", hazelcastInstance.getConfig().getInstanceName())
                    .keyValue("port", hazelcastInstance.getConfig().getNetworkConfig().getPort())
                    .keyValue("clusterStateName", hazelcastInstance.getCluster().getClusterState().name())
                    .keyValue("localMemberAddressHost", hazelcastInstance.getCluster().getLocalMember().getAddress().getHost())
                    .keyValue("nMembers", hazelcastInstance.getCluster().getMembers().size())
                    .build();

        //Loop through our JobTypes and check our lock status, create lock if none found
        for (String jobType : new JobType().getValues()) {
            JobLock jobLock = jobLockCache.get(jobType);

            if (jobLock == null) {
                jobLockCache.put(jobType, defaultJobLock(jobType));

                CsCoreLogger.info("Create job lock for:")
                            .keyValue("jobType", jobType)
                            .keyValue("host", getHostname())
                            .build();
            } else {
                CsCoreLogger.info("Job lock already exists for:")
                            .keyValue("jobType", jobType)
                            .keyValue("host", jobLock.getHost())
                            .build();
            }
        }
    }

    /**
     * Check the lock status of a given job. Return true if this host has the lock
     * and the job should be executed, else false, indicating to skip running the job.
     */
    public boolean isJobLockedByHost(String jobType) {
        JobLock jobLock = jobLockCache.get(jobType);

        // If the job lock is null, then create it.  To prevent multiple job locks, the waitExtraTimeIfNecessary
        // method should be called by each job before this method is called.
        if (jobLock == null) {
            jobLock = defaultJobLock(jobType);
            jobLockCache.put(jobType, jobLock);

            if (TogglzFeature.JOBLOCKLOGGING.isActive()) {
                CsCoreLogger.info("Job lock is null.  Create job lock for:")
                            .keyValue("jobType", jobType)
                            .build();
            }
        }

        //If the lock is non-expiring, we have to own it already
        if (JobType.getJobTimeout(jobType) == -1) {
            return jobLock.getHost()
                          .equals(getHostname());
        }

        //If the lock is expired, take it over
        long jobTimeout = JobType.getJobTimeout(jobType);
        Date expirationDate = new Date(jobLock.getStartDate().getTime() + jobTimeout);
        Date now = new Date();
        if (now.getTime() > expirationDate.getTime()) {
            if (TogglzFeature.JOBLOCKLOGGING.isActive()) {
                CsCoreLogger.info("The job was expired and has been locked by this host")
                            .keyValue("job", jobType)
                            .keyValue("oldHost", jobLock.getHost())
                            .keyValue("newHost", getHostname())
                            .keyValue("date", now.getTime())
                            .keyValue("expirationDate", expirationDate.getTime())
                            .keyValue("jobTimeout", jobTimeout)
                            .build();
            }

            jobLock.setHost(getHostname());
            jobLock.setStartDate(new Date());
            jobLockCache.put(jobType, jobLock);

            return true;
        }

        //If the lock is not expired, and is owned by this host, update it
        else if (jobLock.getHost()
                        .equals(getHostname())) {
            jobLock.setStartDate(new Date());
            jobLockCache.put(jobType, jobLock);
            if (TogglzFeature.JOBLOCKLOGGING.isActive()) {
                CsCoreLogger.info("This host owns the lock for the job")
                            .keyValue("job", jobType)
                            .keyValue("host", jobLock.getHost())
                            .build();
            }
            return true;
        }

        //Else, it's locked by another host
        if (TogglzFeature.JOBLOCKLOGGING.isActive()) {
            CsCoreLogger.info("The job is locked by another host")
                        .keyValue("job", jobType)
                        .build();
        }
        return false;
    }

    public String getHostname() {
        if (StringUtils.isBlank(registeredHostname)) {
            try {
                registeredHostname = InetAddress.getLocalHost()
                                                .toString();
                CsCoreLogger.info("Found host name '" + registeredHostname + "' for JobLockManager")
                            .build();

                if (StringUtils.isBlank(registeredHostname)) {
                    CsCoreLogger.error("InetAddress returned null host name!")
                                .build();
                    throw new UnknownHostException();
                }
            } catch (UnknownHostException e) {
                CsCoreLogger.error("Failed to find host name when starting up JobLockManager, using UUID instead")
                            .build();

                //If the host name lookup fails, generate a UUID for this server session
                registeredHostname = UUID.randomUUID()
                                         .toString();
            }
        }

        return registeredHostname;
    }

    private JobLock defaultJobLock(String jobType) {
        JobLock jobLock = new JobLock();
        jobLock.setHost(getHostname());
        jobLock.setName(jobType);
        jobLock.setStartDate(new Date());
        return jobLock;
    }
}
