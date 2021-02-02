package com.incomm.cca.controller;

import com.incomm.apls.model.requests.ActivateB2bCardRequest;
import com.incomm.apls.model.requests.ActivateGiftCardReplacementRequest;
import com.incomm.apls.model.requests.StatusChangeRequest;
import com.incomm.apls.model.response.ActivateB2bCardResponse;
import com.incomm.apls.model.response.ActivateGiftCardReplacementResponse;
import com.incomm.apls.model.response.GiftCardReplacementResponse;
import com.incomm.apls.model.response.StatusChangeResponse;
import com.incomm.apls.model.thirdparty.greencard.CardToCardResponse;
import com.incomm.apls.model.thirdparty.greencard.GreenCardPreauthReleaseRequest;
import com.incomm.cca.model.view.external.apls.product.CardTransferRequestView;
import com.incomm.cca.model.view.external.apls.product.EnhancedBalanceAdjustmentRequest;
import com.incomm.cca.model.view.external.apls.product.MerchandiseReleaseRequestView;
import com.incomm.cca.service.apls.AplsCardService;
import com.incomm.cca.service.apls.AplsTransactionService;
import com.incomm.cscore.client.apls.model.action.greencard.EnhancedBalanceAdjustmentResponseGreencard;
import com.incomm.cscore.client.apls.model.card.EnhancedProgramLimitsResponse;
import com.incomm.cscore.client.apls.model.card.GiftCardReplacementRequest;
import com.incomm.cscore.client.apls.model.transaction.EnhancedPreAuthReleaseResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest/action/greencard")
public class GreencardActionController extends RestResponseHandler {

    @Autowired
    private AplsCardService aplsCardService;
    @Autowired
    private AplsTransactionService aplsTransactionService;

    @RequestMapping(method = RequestMethod.POST, value = "/replacecard")
    public ResponseEntity replaceCard(@RequestBody GiftCardReplacementRequest requestDto, @RequestParam(value = "reorder", required = false, defaultValue = "false") Boolean reorder) {
        GiftCardReplacementResponse responseDto = aplsCardService.replaceCard(requestDto, reorder);
        return ok(responseDto);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/changestatus")
    public ResponseEntity changeStatus(@RequestBody StatusChangeRequest requestDto) {
        StatusChangeResponse responseDto = aplsCardService.changeStatus(requestDto);
        return ok(responseDto);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/preauthrelease")
    public ResponseEntity releasePreAuth(@RequestBody GreenCardPreauthReleaseRequest requestDto) {
        EnhancedPreAuthReleaseResponse responseDto = aplsTransactionService.releasePreAuth(requestDto);
        return ok(responseDto);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/activateB2BCard")
    public ResponseEntity activateB2BCard(@RequestBody ActivateB2bCardRequest requestDto) {
        ActivateB2bCardResponse responseDto = aplsCardService.activateB2BCard(requestDto);
        return ok(responseDto);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/activateGiftCardReplacement")
    public ResponseEntity activateGiftCardReplacement(@RequestBody ActivateGiftCardReplacementRequest requestDto) {
        ActivateGiftCardReplacementResponse responseDto = aplsCardService.activateGiftCardReplacement(requestDto);
        return ok(responseDto);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/balanceAdjustment")
    public ResponseEntity balanceAdjustment(@RequestBody EnhancedBalanceAdjustmentRequest requestDto) {
        EnhancedBalanceAdjustmentResponseGreencard responseDto = aplsCardService.adjustBalance(requestDto);
        return ok(responseDto);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/cardTransfer")
    public ResponseEntity cardTransfer(@RequestBody CardTransferRequestView requestDto) {
        CardToCardResponse responseDto = aplsCardService.transferCard(requestDto);
        return ok(responseDto);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/merchandiseRelease")
    public ResponseEntity merchandiseRelease(@RequestBody MerchandiseReleaseRequestView requestDto) {
        EnhancedProgramLimitsResponse dto = aplsCardService.releaseMerchandise(requestDto);
        return ok(dto);
    }
}
