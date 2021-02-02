package com.incomm.cca.controller;

import com.incomm.apls.model.thirdparty.aps.ApsCCAReq;
import com.incomm.cca.model.domain.BulkDeactivateRequest;
import com.incomm.cca.service.apls.AplsCardService;
import com.incomm.cscore.client.apls.model.action.aps.EnhancedApsResponse;
import com.incomm.cscore.client.job.model.response.job.JobResponse;
import com.incomm.cscore.client.rest.response.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest/aps")
public class ApsController extends RestResponseHandler {

    @Autowired
    private AplsCardService aplsCardService;

    @PostMapping("/apsAction/activate")
    public ResponseEntity activateCard(@RequestBody ApsCCAReq requestDto,
                                       @RequestParam(value = "merchantId", required = false) String merchantId ,
                                       @RequestParam(value = "platform", required = false) String platform){
        EnhancedApsResponse response = aplsCardService.activateFastCard(requestDto, merchantId,platform);
        return ok(response);
    }

    @PostMapping("/apsAction/deactivate")
    public ResponseEntity deActivateCard(@RequestBody ApsCCAReq requestDto,
                                         @RequestParam(value = "merchantId", required = false) String merchantId,
                                         @RequestParam(value = "platform", required = false) String platform){
        EnhancedApsResponse response = aplsCardService.deactivateFastCard(requestDto, merchantId,platform);
        return ok(response);
    }

    @PostMapping("/apsAction/bulkDeactivate")
    public ResponseEntity bulkDeActivateCard(@RequestBody BulkDeactivateRequest request, @RequestParam(value = "merchantId", required = false) String merchantId) {
        Response<JobResponse> response = aplsCardService.bulkDeactivateFastCard(request, merchantId);
        return ok(response);
    }
}
