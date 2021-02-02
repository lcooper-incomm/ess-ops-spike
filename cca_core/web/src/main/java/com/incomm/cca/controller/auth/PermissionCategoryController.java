package com.incomm.cca.controller.auth;

import com.incomm.cca.controller.RestResponseHandler;
import com.incomm.cca.model.converter.PermissionCategoryConverter;
import com.incomm.cca.model.domain.auth.PermissionCategory;
import com.incomm.cca.service.auth.PermissionCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/rest/permission-category")
public class PermissionCategoryController extends RestResponseHandler {

    @Autowired
    private PermissionCategoryConverter permissionCategoryConverter;
    @Autowired
    private PermissionCategoryService permissionCategoryService;

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity addOne(@RequestBody PermissionCategory request) {
        PermissionCategory domainModel = permissionCategoryService.addOne(request);
        if (!request.getPermissions()
                    .isEmpty()) {
            domainModel.setPermissions(request.getPermissions());
            domainModel = permissionCategoryService.updateOne(domainModel);
        }
        return ok(permissionCategoryConverter.convert(domainModel));
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity deleteOne(@PathVariable("id") Long id) {
        permissionCategoryService.deleteOne(id);
        return noContent();
    }

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity findAll() {
        List<PermissionCategory> domainModels = permissionCategoryService.findAll();
        return ok(permissionCategoryConverter.convert(domainModels));
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity findOne(@PathVariable("id") Long id) {
        PermissionCategory domainModel = permissionCategoryService.findOne(id);
        return ok(permissionCategoryConverter.convert(domainModel));
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public ResponseEntity updateOne(@PathVariable("id") Long id, @RequestBody PermissionCategory request) {
        PermissionCategory domainModel = permissionCategoryService.updateOne(request);
        return ok(permissionCategoryConverter.convert(domainModel));
    }
}
