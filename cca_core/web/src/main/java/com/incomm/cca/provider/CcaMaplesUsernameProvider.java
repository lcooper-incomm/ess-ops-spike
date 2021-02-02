package com.incomm.cca.provider;

import com.incomm.cca.service.UserService;
import com.incomm.cscore.client.maples.CsCoreMaplesUsernameProvider;
import com.incomm.cscore.client.maples.constant.MaplesPlatform;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

@Primary
@Service
public class CcaMaplesUsernameProvider extends CsCoreMaplesUsernameProvider {

    @Autowired
    private UserService userService;

    @Override
    public String getMaplesUsername(MaplesPlatform platform) {
        if (platform == MaplesPlatform.SERVE) {
            return this.getServeUsername();
        } else {
            return super.getMaplesUsername(platform);
        }
    }

    private String getServeUsername() {
        return this.userService.currentUser()
                               .getUsername();
    }
}
