package com.incomm.cca.controller.codex;

import com.incomm.cca.controller.RestResponseHandler;
import com.incomm.cca.service.codex.CodexSeedService;
import com.incomm.cca.service.codex.CodexService;
import com.incomm.cscore.codex.model.codex.CodexDetailView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest/codex")
public class CodexController extends RestResponseHandler {

    @Autowired
    private CodexService codexService;
    @Autowired
    private CodexSeedService seedService;

    @GetMapping("/{name}")
    public ResponseEntity findOne(@PathVariable("name") String name) {
        CodexDetailView codex = this.codexService.findOne(name);
        if (codex != null) {
            return ok(codex);
        } else {
            return noContent();
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity refresh() {
        this.codexService.refreshCache();
        return noContent();
    }
}
