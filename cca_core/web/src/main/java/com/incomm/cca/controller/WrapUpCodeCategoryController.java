package com.incomm.cca.controller;

import com.incomm.cca.model.converter.WrapUpCodeCategoryConverter;
import com.incomm.cca.model.converter.WrapUpCodeConverter;
import com.incomm.cca.model.domain.WrapUpCode;
import com.incomm.cca.model.domain.WrapUpCodeCategory;
import com.incomm.cca.model.view.session.queue.WrapUpCodeCategoryView;
import com.incomm.cca.service.WrapUpCodeCategoryService;
import com.incomm.cca.service.WrapUpCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/rest/category")
public class WrapUpCodeCategoryController extends RestResponseHandler {

    @Autowired
    private WrapUpCodeCategoryConverter categoryConverter;
    @Autowired
    private WrapUpCodeCategoryService categoryService;
    @Autowired
    private WrapUpCodeConverter codeConverter;
    @Autowired
    private WrapUpCodeService codeService;

    @PostMapping
    public ResponseEntity addOne(@RequestBody WrapUpCodeCategoryView request) {
        WrapUpCodeCategory category = categoryService.newCategory(request);
        return ok(categoryConverter.convert(category));
    }

    @GetMapping
    public ResponseEntity findAll() {
        List<WrapUpCodeCategory> categories = categoryService.getAllCategories();
        return ok(categoryConverter.convert(categories));
    }

    @GetMapping("/{id}/wrap-up-code")
    public ResponseEntity findAllWrapUpCodesForCategory(@PathVariable("id") Long id) {
        List<WrapUpCode> codes = codeService.findAllByCategoryId(id);
        return ok(codeConverter.convert(codes));
    }

    @GetMapping("/{id}")
    public ResponseEntity findOne(@PathVariable("id") Long id) {
        WrapUpCodeCategory category = categoryService.findOneWithFetch(id);
        return ok(categoryConverter.convert(category));
    }

    @PutMapping("/{id}")
    public ResponseEntity updateOne(
            @PathVariable("id") Long id,
            @RequestBody WrapUpCodeCategoryView request) {
        WrapUpCodeCategory category = categoryService.updateCategory(request);
        return ok(categoryConverter.convert(category));
    }

    @PostMapping("/{categoryId}/wrap-up-code/{wrapUpCodeId}")
    public ResponseEntity addWrapUpCode(@PathVariable("categoryId") Long categoryId, @PathVariable("wrapUpCodeId") Long wrapUpCodeId) {
        this.categoryService.addWrapUpCode(categoryId, wrapUpCodeId);
        return this.findOne(categoryId);
    }

    @DeleteMapping("/{categoryId}/wrap-up-code/{wrapUpCodeId}")
    public ResponseEntity removeWrapUpCode(@PathVariable("categoryId") Long categoryId, @PathVariable("wrapUpCodeId") Long wrapUpCodeId) {
        this.categoryService.removeWrapUpCode(categoryId, wrapUpCodeId);
        return this.findOne(categoryId);
    }
}
