package com.incomm.cca.config;

import com.incomm.cca.model.enums.ManagedPermission;
import com.incomm.cca.service.SecurityService;
import com.incomm.cca.service.UserService;
import com.incomm.cca.togglz.TogglzFeature;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.togglz.core.manager.EnumBasedFeatureProvider;
import org.togglz.core.repository.StateRepository;
import org.togglz.core.repository.jdbc.JDBCStateRepository;
import org.togglz.core.spi.FeatureProvider;
import org.togglz.core.user.SimpleFeatureUser;
import org.togglz.core.user.UserProvider;

import javax.sql.DataSource;

@Configuration
public class TogglzConfig {

    @Bean
    public FeatureProvider featureProvider() {
        return new EnumBasedFeatureProvider(TogglzFeature.class);
    }

    @Bean
    public UserProvider userProvider(UserService userService, SecurityService securityService) {
        return () -> {
            String username = userService.currentUser()
                                         .getUsername();
            boolean isAdmin = securityService.hasPermission(ManagedPermission.ADMIN_TOGGLZ_PAGE);
            return new SimpleFeatureUser(username, isAdmin);
        };
    }

    @Bean
    public StateRepository stateRepository(DataSource dataSource) {
        return new JDBCStateRepository(dataSource);
    }
}
