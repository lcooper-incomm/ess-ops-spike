package com.incomm.cca.service;

import com.incomm.cca.model.domain.User;
import com.incomm.cca.togglz.TogglzFeature;
import com.incomm.cscore.ariia.model.response.CoreUserView;
import com.incomm.cscore.client.rest.response.Response;
import com.incomm.cscore.client.rest.response.ResponseError;
import com.incomm.cscore.client.user.CsCoreAriiaClient;
import com.incomm.cscore.logging.CsCoreLogger;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class AriiaCoreUserService {

    @Autowired
    private CsCoreAriiaClient ariiaClient;

    public CoreUserView addOrUpdateOne(User user) {
        CoreUserView result = null;

        if (TogglzFeature.UPDATE_ARIIA_ON_LOGIN.isActive()) {
            CoreUserView request = this.convert(user);
            Response<CoreUserView> response = ariiaClient.addOne(request);

            if (!response.getIsSuccess()) {
                String errorMessage = "Unexpected Error Occurred";
                if (!response.getErrors()
                             .isEmpty()) {
                    errorMessage = String.format("Errors: %s", StringUtils.join(response.getErrors()
                                                                                        .stream()
                                                                                        .map(ResponseError::getMessage)
                                                                                        .collect(Collectors.toList()), " | "));
                }
                CsCoreLogger.error("Failed to update ARIIA with user profile")
                            .json("user", request)
                            .keyValue("reason", errorMessage)
                            .build();
            }

            result = response.getBody();
        }

        return result;
    }

    private CoreUserView convert(User user) {
        CoreUserView view = null;

        if (user != null) {
            view = new CoreUserView();
            view.setCompany(user.getCompany());
            view.setDepartment(user.getDepartment());
            view.setEmailAddress(user.getEmail());
            view.setFirstName(user.getFirstName());
            view.setLastName(user.getLastName());
            view.setMobilePhone(user.getMobile());
            view.setTitle(user.getTitle());
            view.setUsername(user.getUsername());
            view.setWorkPhone(user.getPhone());
        }

        return view;
    }
}
