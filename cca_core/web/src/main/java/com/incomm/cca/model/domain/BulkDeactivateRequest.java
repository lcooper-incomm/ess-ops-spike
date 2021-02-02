package com.incomm.cca.model.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incomm.cscore.client.apls.constant.AplsPlatform;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class BulkDeactivateRequest {

    private static final String ERROR_MESSAGE_PREFIX = "Required Bulk Deactivate payload value is null or empty for ";
    private String comment;
    private Boolean override = false;
    private String merchant;
    private String location;
    private String terminal;
    private AplsPlatform platform;
    private String partner;
    private User user;
    private Map<String, List<Long>> dstMerchants;
    private List<String> identifiers = new ArrayList<>();
    @JsonIgnore
    protected Map<String, Object> context = new HashMap<>();

    @JsonIgnore
    public void validate() {
        //TODO expand this

        //If platform is provided, it must be one of APS, DSTA, DSTB
        if (this.platform != null) {
            switch (this.platform) {
                case APS:
                case DSTA:
                case DSTB:
                    return;
                default:
                    throw new IllegalArgumentException("platform must be one of 'APS', 'DSTA', 'DSTB'");
            }
        }
    }
}
