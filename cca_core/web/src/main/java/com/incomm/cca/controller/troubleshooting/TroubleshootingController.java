package com.incomm.cca.controller.troubleshooting;

import com.incomm.cca.controller.RestResponseHandler;
import com.incomm.cca.model.domain.troubleshooting.TroubleshootingEntry;
import com.incomm.cca.model.enums.ManagedPermission;
import com.incomm.cca.service.SecurityService;
import com.incomm.cca.service.UserService;
import com.incomm.cca.service.troubleshooting.TroubleshootingService;
import com.incomm.cca.togglz.TogglzFeature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/rest/troubleshooting")
public class TroubleshootingController extends RestResponseHandler {

    @Autowired
    private TroubleshootingService troubleshootingService;
    @Autowired
    private UserService userService;
    @Autowired
    private SecurityService securityService;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity getConnectedUsers() {
        List<String> users = new ArrayList<>();

        if (TogglzFeature.LIVETROUBLESHOOTING.isActive()) {
            users = troubleshootingService.getConnectedUsers();
        }

        return ok(users);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity newLogEntry(@RequestBody List<TroubleshootingEntry> entries) {
        troubleshootingService.publishEntries(entries);
        return noContent();
    }

    @RequestMapping(method = RequestMethod.POST, value = "/{username}")
    public ResponseEntity connectToUser(@PathVariable("username") String username) {
        if (securityService.hasPermission(ManagedPermission.LIVE_TROUBLESHOOTING)) {
            troubleshootingService.connectToUser(username);
            return noContent();
        } else {
            return forbidden();
        }
    }

    @RequestMapping(method = RequestMethod.DELETE)
    public ResponseEntity closeAllSessionsForConnector() {
        if (securityService.hasPermission(ManagedPermission.LIVE_TROUBLESHOOTING)) {
            troubleshootingService.closeAllSessionsForConnector(userService.currentUser()
                                                                           .getUsername());
            return ok();
        } else {
            return forbidden();
        }
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/{username}")
    public ResponseEntity disconnectFromUser(@PathVariable("username") String username) {
        if (securityService.hasPermission(ManagedPermission.LIVE_TROUBLESHOOTING)) {
            troubleshootingService.disconnectFromUser(username);
            return ok();
        } else {
            return forbidden();
        }
    }
}
