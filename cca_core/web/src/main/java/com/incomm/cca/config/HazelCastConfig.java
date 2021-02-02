package com.incomm.cca.config;

import com.hazelcast.config.Config;
import com.hazelcast.config.ManagementCenterConfig;
import com.incomm.cca.hazelcast.HazelcastManager;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class HazelCastConfig {

    @Value("${hazelcast.port}")
    private Integer port;
    @Value("${hazelcast.group.ips}")
    private String groupIps;
    @Value("${hazelcast.group.name}")
    private String groupName;
    @Value("${hazelcast.group.password}")
    private String groupPassword;
    @Value("${hazelcast.mancenter.url}")
    private String mancenterUrl;
    @Value("${hazelcast.mancenter.updateInterval}")
    private int mancenterUpdateInterval;

    /**
     * There are two hazelcast instances at work (sort of). One, this one, configured by and for
     * CCA to actively use internally, and another, separately configured, for the hazelcast
     * session replication.
     * <p>
     * This block is called first during startup, and the session replication instance is configured
     * (in web.xml) to use this instance.
     * <p>
     * setHazelcastConfig() is called here as a way to set the hazelcast.config system property
     * before the session replication instance is stood up, so that it uses the correct environment's
     * configuration file instead of hazelcast's default configuration file.
     * <p>
     * Much time was spent on this to ensure that each environment's "active" instance and session
     * replication instances joined together properly, and were configured properly to avoid cross-
     * environment connections, multicasting, etc.
     */
    @Bean
    public Config hazelcastConfig() {
        //General config
        Config config = new Config();
        config.setInstanceName(HazelcastManager.INSTANCE_NAME);
        config.setManagementCenterConfig(getManagementCenterConfig());

        //Not sure what exactly these do, they were here before me, and don't seem to hurt anything
        config.setProperty("hazelcast.jmx", "true");
        config.setProperty("hazelcast.jmx.detailed", "true");

        //Network config
        config.getNetworkConfig()
              .setReuseAddress(true)
              .setPortAutoIncrement(false)
              .setPort(port)
              .setPortCount(1);

        //Disable cluster strategies we aren't using
        config.getNetworkConfig()
              .getJoin()
              .getAwsConfig()
              .setEnabled(false);
        config.getNetworkConfig()
              .getJoin()
              .getMulticastConfig()
              .setEnabled(false);

        //Set up TCP/IP cluster strategy
        config.getGroupConfig()
              .setName(groupName);
        config.getGroupConfig()
              .setPassword(groupPassword);
        config.getNetworkConfig()
              .getJoin()
              .getTcpIpConfig()
              .setEnabled(true);
        for (String groupIp : getGroupIps()) {
            config.getNetworkConfig()
                  .getJoin()
                  .getTcpIpConfig()
                  .addMember(groupIp.trim());
        }

        return config;
    }

    private String[] getGroupIps() {
        String[] groupIpArray = new String[0];
        if (StringUtils.isNotBlank(groupIps)) {
            groupIpArray = groupIps.split(",");
        }
        return groupIpArray;
    }

    private ManagementCenterConfig getManagementCenterConfig() {

        ManagementCenterConfig managementCenter = new ManagementCenterConfig();
        managementCenter.setEnabled(true);
        managementCenter.setUrl(mancenterUrl);
        managementCenter.setUpdateInterval(mancenterUpdateInterval);

        return managementCenter;

    }

}
