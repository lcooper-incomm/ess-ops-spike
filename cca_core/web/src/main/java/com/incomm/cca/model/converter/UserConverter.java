package com.incomm.cca.model.converter;

import com.incomm.cca.model.domain.User;
import com.incomm.cca.model.domain.auth.Permission;
import com.incomm.cca.model.view.auth.RoleView;
import com.incomm.cca.model.view.auth.UserView;
import com.incomm.cca.service.auth.PermissionService;
import com.incomm.cscore.client.apls.converter.PhoneNumberConverter;
import com.incomm.cscore.client.model.CsCorePhoneNumber;
import com.incomm.cscore.client.model.constant.CsCorePhoneNumberType;
import com.incomm.cscore.client.rest.converter.TimestampConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class UserConverter {

    @Autowired
    private GroupConverter groupConverter;
    @Autowired
    private PartnerConverter partnerConverter;
    @Autowired
    private PermissionConverter permissionConverter;
    @Autowired
    private PermissionService permissionService;
    @Autowired
    private PhoneNumberConverter phoneNumberConverter;
    @Autowired
    private RoleConverter roleConverter;
    @Autowired
    private TeamConverter teamConverter;
    @Autowired
    private TimestampConverter timestampConverter;

    public List<UserView> convert(Collection<User> request) {
        List<UserView> views = new ArrayList<>();

        if (request != null) {
            request.forEach(user -> views.add(this.convertSimple(user)));
        }

        return views;
    }

    public UserView convert(User request) {
        UserView view = null;

        if (request != null) {
            view = this.convertSimple(request);
            view.setPrefDefaultBolPartner(request.getPrefDefaultBolPartner());
            view.setPrefDefaultDataSource(request.getPrefDefaultDataSource());
            view.setPrefDefaultLandingPage(request.getPrefDefaultLandingPage());
            view.setPrefDefaultPartner(partnerConverter.convert(request.getPrefDefaultPartner()));
            view.setPrefDefaultCclPartner(partnerConverter.convert(request.getPrefDefaultCclPartner()));
            view.setPrefDefaultSearchTypeId(request.getPrefDefaultSearchTypeId());
            view.setPrefDefaultSessionType(request.getPrefDefaultSessionType());
            view.setPrefDockMode(request.getPrefDockMode());
            view.setPrefDontShowWhatsNew(request.getPrefDontShowWhatsNew());
            view.setPrefShowBillableOnly(request.getPrefShowBillableOnly());
            view.setPrefSummaryMode(request.getPrefSummaryMode());
        }

        return view;
    }

    public UserView convertCurrentUser(User request) {
        UserView view = null;

        if (request != null) {
            view = this.convert(request);

            List<Permission> permissions = new ArrayList<>();
            if (view.getIsSystemAdministrator()) {
                permissions.addAll(permissionService.findAllPermissions());
            } else {
                request.getMemberOfRoles()
                       .forEach(role -> permissions.addAll(role.getPermissions()));
            }

            List<RoleView> roles = new ArrayList<>();

            List<RoleView> memberRoles = roleConverter.convert(request.getMemberOfRoles());
            memberRoles.forEach(role -> role.setMembershipType(RoleView.MembershipType.MEMBER));
            roles.addAll(memberRoles);

            List<RoleView> adminRoles = roleConverter.convert(request.getAdminOfRoles());
            adminRoles.forEach(role -> role.setMembershipType(RoleView.MembershipType.ADMINISTRATOR));
            roles.addAll(adminRoles);

            view.getGroups()
                .addAll(groupConverter.convert(request.getGroups()));
            view.getPermissions()
                .addAll(permissionConverter.convert(permissions));
            view.getRoles()
                .addAll(roles);
            view.getTeams()
                .addAll(teamConverter.convert(request.getTeams()));
        }

        return view;
    }

    public UserView convertSimple(User request) {
        UserView view = null;

        if (request != null) {
            view = new UserView();
            view.setId(request.getId());
            view.setIsActive(request.getActive());
            view.setCompany(request.getCompany());
            view.setDepartment(request.getDepartment());
            view.setDisplayName(request.getDisplayName());
            view.setEmail(request.getEmail());
            view.setEmployeeId(request.getEmployeeId());
            view.setIsSystemAdministrator(request.getSystemAdministrator());
            view.setLastLoginDate(timestampConverter.convert(request.getLastLoginDate()));
            view.setFirstName(request.getFirstName());
            view.setLastName(request.getLastName());
            view.setTitle(request.getTitle());
            view.setUsername(request.getUsername());

            CsCorePhoneNumber mobilePhone = phoneNumberConverter.convert(request.getMobile());
            if (mobilePhone != null) {
                mobilePhone.setType(CsCorePhoneNumberType.MOBILE);
            }
            view.setMobile(mobilePhone);

            CsCorePhoneNumber workPhone = phoneNumberConverter.convert(request.getPhone());
            if (workPhone != null) {
                workPhone.setType(CsCorePhoneNumberType.WORK);
            }
            view.setPhone(workPhone);
        }

        return view;
    }
}
