package com.incomm.cca.service.cache.support;

import com.incomm.cscore.codex.model.codex.CodexDetailView;

public class CodexCacheItem {

    private CodexDetailView codex;
    private String hash;

    public CodexDetailView getCodex() {
        return codex;
    }

    public void setCodex(final CodexDetailView codex) {
        this.codex = codex;
    }

    public String getHash() {
        return hash;
    }

    public void setHash(final String hash) {
        this.hash = hash;
    }
}
