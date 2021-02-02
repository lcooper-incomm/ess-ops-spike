package com.incomm.cca.hazelcast;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.incomm.cca.hazelcast.event.ServerEvent;
import com.incomm.cca.hazelcast.event.SimpleEvent;
import com.incomm.cca.security.CCAAuthentication;
import com.incomm.cca.security.LDAPUserDetails;
import com.incomm.cca.togglz.TogglzFeature;
import org.atmosphere.config.managed.Decoder;
import org.atmosphere.config.managed.Encoder;
import org.atmosphere.config.service.Disconnect;
import org.atmosphere.config.service.ManagedService;
import org.atmosphere.config.service.Message;
import org.atmosphere.config.service.Post;
import org.atmosphere.config.service.Ready;
import org.atmosphere.cpr.AtmosphereRequest;
import org.atmosphere.cpr.AtmosphereResource;
import org.atmosphere.cpr.AtmosphereResourceEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.IOException;

/**
 * This service is really only used by Hazelcast, and helps in negotiating the contracts between server and client.
 */
@Service
@ManagedService(path = HazelcastManager.DEFAULT_WEBSOCKET_PATH)
public class HazelcastConnectionService {

    private static final Logger LOGGER = LoggerFactory.getLogger(HazelcastConnectionService.class);

    @Ready
    public void onReady(AtmosphereResource atmosphereResource) {
        String username = null;
        AtmosphereRequest request = atmosphereResource.getRequest();

        if (request != null) {
            //Add subscriptions
            try {
                CCAAuthentication authentication = (CCAAuthentication) request.getUserPrincipal();
                LDAPUserDetails currentUser = (LDAPUserDetails) authentication.getDetails();
                username = currentUser.getUsername()
                                      .toLowerCase();

                if (TogglzFeature.HAZELCAST_ATMOSPHERE_CONNECTION_LOGGING.isActive()) {
                    LOGGER.info(String.format("Websocket connection established for user:%s topic:%s uuid:%s", username, atmosphereResource.getRequest()
                                                                                                                                           .getPathInfo(), atmosphereResource.uuid()));
                }
            } catch (Exception e) {
                LOGGER.error(String.format("Failed to read user roles and add subscriptions for request: %s", atmosphereResource), e);
            }

            atmosphereResource.getBroadcaster()
                              .broadcast(new SimpleEvent(username, "Established connection"));
        } else {
            LOGGER.error(String.format("Received null websocket connection request: %s", atmosphereResource));
        }
    }

    @Message(encoders = JacksonEncoderDecoder.class, decoders = JacksonEncoderDecoder.class)
    public ServerEvent message(ServerEvent event) {
        return event;
    }

    @Disconnect
    public void disconnect(AtmosphereResourceEvent event) {
        if (TogglzFeature.HAZELCAST_ATMOSPHERE_CONNECTION_LOGGING.isActive()) {
            LOGGER.info(String.format("Connection closed:%s", event));
        }
    }

    @Post
    public ServerEvent post(ServerEvent event) {
        return null;
    }

    public static class JacksonEncoderDecoder implements Encoder<ServerEvent, String>, Decoder<String, ServerEvent> {

        private ObjectMapper objectMapper = new ObjectMapper();

        @Override
        public String encode(ServerEvent s) {
            try {
                return objectMapper.writeValueAsString(s);
            } catch (JsonProcessingException e) {
                throw new RuntimeException("Error writing value to string: " + s, e);
            }
        }

        @Override
        public ServerEvent decode(String s) {
            try {
                return objectMapper.readValue(s, ServerEvent.class);
            } catch (IOException e) {
                throw new RuntimeException("Invalid server event: " + s, e);
            }
        }
    }
}
