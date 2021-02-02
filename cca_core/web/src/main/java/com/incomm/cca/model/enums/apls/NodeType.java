package com.incomm.cca.model.enums.apls;

public enum NodeType {
    TERMINAL("terminal"),
    LOCATION("location"),
    HIERARCHY("hierarchy");
    private final String value;

    NodeType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
