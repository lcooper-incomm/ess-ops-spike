package com.incomm.cca.hazelcast;

import com.hazelcast.config.Config;
import com.hazelcast.core.DistributedObjectEvent;
import com.hazelcast.core.DistributedObjectListener;
import com.hazelcast.core.Hazelcast;
import com.hazelcast.core.HazelcastInstance;
import com.hazelcast.core.ITopic;
import com.hazelcast.core.Message;
import com.hazelcast.core.MessageListener;
import com.incomm.cca.hazelcast.event.ServerEvent;
import com.incomm.cca.togglz.TogglzFeature;
import com.incomm.cscore.logging.CsCoreLogger;
import org.apache.commons.lang3.StringUtils;
import org.atmosphere.cpr.Broadcaster;
import org.atmosphere.cpr.BroadcasterFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.servlet.ServletContext;

@Service
public class HazelcastManager {

    public static final String DEFAULT_WEBSOCKET_PATH = "/websocket/{topic}";
    public static final String INSTANCE_NAME = "cca";
    @Autowired
    private ServletContext servletContext;
    @Autowired
    private Config hazelcastConfig;
    private HazelcastInstance hazelcastInstance;

    @PostConstruct
    public void init() {
        hazelcastInstance = getHazelcastInstance();
        //Add our event listener listening for new Hazelcast Topics to be created
        hazelcastInstance.addDistributedObjectListener(new TopicListener());
    }

    @PreDestroy
    private void shutdownInstance() {
        if (hazelcastInstance != null) {
            try {
                hazelcastInstance.shutdown();
            } catch (Exception e) {
                CsCoreLogger.error("Failed to shutdown Hazelcast instance")
                            .exception(e)
                            .build();
            }
        }
    }

    public HazelcastInstance getHazelcastInstance() {
        if (hazelcastInstance != null) {
            return hazelcastInstance;
        } else {
            hazelcastInstance = Hazelcast.getOrCreateHazelcastInstance(hazelcastConfig);
            return hazelcastInstance;
        }
    }

    /**
     * Publishes the given event to the Hazelcast Topic. Not Atmosphere, that happens via the event listener we appended
     * to the Topic when it was created.
     */
    public void broadcast(ServerEvent event) {
        HazelcastInstance hazelcastInstance = getHazelcastInstance();
        ITopic<ServerEvent> topic = hazelcastInstance.getTopic(event.getTopic());
        topic.publish(event);
    }

    private BroadcasterFactory getBroadcasterFactory() {
        return (BroadcasterFactory) servletContext.getAttribute("org.atmosphere.cpr.BroadcasterFactory");
    }

    private String buildFullTopicName(String topic) {
        return DEFAULT_WEBSOCKET_PATH.replace("{topic}", topic);
    }

    public class TopicListener implements DistributedObjectListener {

        private static final String TOPIC_SERVICE_NAME = "hz:impl:topicService";

        /**
         * If a Hazelcast Topic is created, add our bridging Forwarder event listener to it
         */
        @Override
        public void distributedObjectCreated(final DistributedObjectEvent event) {
            if (isTopicEvent(event)) {
                //Add our topic event listener (our connection between Hazelcast and Atmosphere) to the topic
                ITopic topic = (ITopic) event.getDistributedObject();
                topic.addMessageListener(new HazelcastToAtmosphereForwarder());

                if (TogglzFeature.HAZELCAST_ATMOSPHERE_CONNECTION_LOGGING.isActive()) {
                    CsCoreLogger.info("Registered event listener for new Hazelcast Topic")
                                .keyValue("topic", topic.getName())
                                .build();
                }
            }
        }

        /**
         * If a Hazelcast Topic is destroyed, destroy any broadcasters bound to it
         */
        @Override
        public void distributedObjectDestroyed(final DistributedObjectEvent event) {
            if (isTopicEvent(event)) {
                BroadcasterFactory broadcasterFactory = getBroadcasterFactory();
                if (broadcasterFactory != null) {
                    String name = event.getObjectName()
                                       .toString();
                    Broadcaster broadcaster = broadcasterFactory.lookup(name, false);
                    if (broadcaster != null) {
                        broadcasterFactory.remove(name);
                    }
                }
            }
        }

        /**
         * Identifies whether the given event is for a Topic, using the event's service name
         */
        private boolean isTopicEvent(DistributedObjectEvent event) {
            return StringUtils.isNotBlank(event.getServiceName())
                    && event.getServiceName()
                            .equalsIgnoreCase(TOPIC_SERVICE_NAME);
        }
    }

    /**
     * This listener is intended to bridge the gap between Hazelcast and Atmosphere, and allow us to ONLY publish
     * messages to Hazelcast Topics throughout the app, instead of worrying about the Atmosphere event as well.
     */
    public class HazelcastToAtmosphereForwarder implements MessageListener {

        @Override
        public void onMessage(final Message message) {
            //Get a handle on the BroadcasterFactory
            BroadcasterFactory broadcasterFactory = getBroadcasterFactory();
            if (broadcasterFactory != null) {
				
				/*
				The message content should be a ServerEvent, defined by the broadcast() method above. Note that it is
				apparently possible to receive null message objects (what little I could tell points to them being "ack"
				events).
				 */
                ServerEvent serverEvent = (ServerEvent) message.getMessageObject();
                if (serverEvent != null) {
                    //As long as we hold the Broadcaster for this topic, broadcast the event
                    String path = buildFullTopicName(serverEvent.getTopic());
                    Broadcaster broadcaster = broadcasterFactory.lookup(path);
                    if (broadcaster != null) {
                        broadcaster.broadcast(serverEvent);

                        if (TogglzFeature.HAZELCAST_ATMOSPHERE_CONNECTION_LOGGING.isActive()) {
                            CsCoreLogger.info("Forwarded message from Hazelcast Topic to Atmosphere Broadcaster")
                                        .keyValue("topic", serverEvent.getTopic())
                                        .keyValue("source", message.getPublishingMember()
                                                                   .localMember() ? "SELF" : message.getPublishingMember()
                                                                                                    .getAddress()
                                                                                                    .getHost())
                                        .build();
                        }
                    } else if (TogglzFeature.HAZELCAST_ATMOSPHERE_CONNECTION_LOGGING.isActive()) {
                        CsCoreLogger.info("Cannot forward message from Hazelcast Topic to Atmosphere Broadcaster because this host doesn't hold the Atmosphere connection")
                                    .keyValue("topic", serverEvent.getTopic())
                                    .keyValue("source", message.getPublishingMember()
                                                               .localMember() ? "SELF" : message.getPublishingMember()
                                                                                                .getAddress()
                                                                                                .getHost())
                                    .build();
                    }
                }
            }
        }
    }
}
