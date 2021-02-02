package com.incomm.cca.model.enums;

public enum ExportFormat {
    PDF("pdf"),
    CSV("csv"),
    XLSX("xlsx");
    private String extension;

    ExportFormat(String extension) {
        this.extension = extension;
    }

    public String getExtension() {
        return extension;
    }
}
