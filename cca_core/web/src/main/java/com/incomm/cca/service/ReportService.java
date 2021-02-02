package com.incomm.cca.service;

import com.incomm.cca.exception.SecurityViolationException;
import com.incomm.cca.model.domain.Report;
import com.incomm.cca.model.domain.User;
import com.incomm.cca.model.domain.auth.Permission;
import com.incomm.cca.model.domain.auth.PermissionCategory;
import com.incomm.cca.repository.report.ReportRepository;
import com.incomm.cca.service.auth.PermissionCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReportService extends CcaAbstractCrudService<Report, Long> {

    @Autowired
    private ReportRepository reportRepository;
    @Autowired
    private PermissionCategoryService permissionCategoryService;

    @Override
    public Report addOne(final Report request) {
        Permission permission = new Permission();
        permission.setSystemName(buildPermissionSystemName(request.getName()));
        permission.setDisplayName(buildPermissionDisplayName(request.getName()));
        permission.setDescription("Permission to view this Report");
        permission.setActive(true);

        PermissionCategory category = permissionCategoryService.findOneBySystemName("REPORTS");
        permission.setCategory(category);

        User currentUser = userService.currentPersistentUser();
        permission.setCreatedBy(currentUser);
        permission.setModifiedBy(currentUser);

        request.setPermission(permission);

        return super.addOne(request);
    }

    private String buildPermissionDisplayName(String reportName) {
        return String.format("Report - \"%s\"", reportName.trim());
    }

    private String buildPermissionSystemName(String reportName) {
        reportName = reportName.trim()
                               .replaceAll("[^a-zA-Z0-9]+", " ");
        reportName = reportName.trim()
                               .replaceAll("[\\s+]", " ");
        reportName = reportName.trim()
                               .replaceAll("[\\s+]", "_");
        return String.format("REPORT_%s", reportName.trim()
                                                    .toUpperCase());
    }

    @Override
    protected void controlledUpdateOne(final Report source, final Report target) {
        target.setName(source.getName());
        target.setSnippet(source.getSnippet());
        target.setLink(source.getLink());
        target.setStatus(source.getStatus());

        Permission targetPermission = target.getPermission();
        targetPermission.setSystemName(buildPermissionSystemName(source.getName()));
        targetPermission.setDisplayName(buildPermissionDisplayName(source.getName()));
    }

    @Override
    public List<Report> findAll() {
        return super.findAll()
                    .stream()
                    .filter(report -> securityService.hasPermission(report.getPermission()
                                                                          .getSystemName()))
                    .collect(Collectors.toList());
    }

    @Override
    protected String getModelName() {
        return Report.class.getSimpleName();
    }

    @Override
    protected void validateUnique(final Report report) throws IllegalArgumentException {
        Report existing = reportRepository.findOneByNameIgnoreCase(report.getName());
        if (existing != null && !existing.getId()
                                         .equals(report.getId())) {
            throw new IllegalArgumentException("Report already exists with this name");
        }
    }

    @Override
    protected void validateAddPermission() throws SecurityViolationException {
        securityService.validateIsSystemAdministrator();
    }

    @Override
    protected void validateDeletePermission() throws SecurityViolationException {
        securityService.validateIsSystemAdministrator();
    }

    @Override
    protected void validateFindPermission() throws SecurityViolationException {

    }

    @Override
    protected void validateUpdatePermission() throws SecurityViolationException {
        securityService.validateIsSystemAdministrator();
    }
}
