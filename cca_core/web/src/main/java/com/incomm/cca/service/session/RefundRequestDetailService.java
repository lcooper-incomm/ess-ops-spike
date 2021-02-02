package com.incomm.cca.service.session;

import com.incomm.cca.model.domain.session.RefundRequestComponent;
import com.incomm.cca.model.view.session.RefundRequestComponentRequestView;
import com.incomm.cca.repository.session.RefundRequestDetailRepository;
import com.incomm.cca.service.encryption.EncryptionService;
import com.incomm.cscore.logging.CsCoreLogger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RefundRequestDetailService {

    @Autowired
    private RefundRequestDetailRepository refundRequestDetailRepository;
    @Autowired
    private EncryptionService encryptionService;

    @Transactional
    public void deleteOne(Long id) {
        refundRequestDetailRepository.deleteById(id);
    }

    @Transactional
	public RefundRequestComponent updateOne(Long id, RefundRequestComponentRequestView request) {
        try {
            encryptionService.openSymmetricKey();
			RefundRequestComponent existing = refundRequestDetailRepository.findById(id)
                                                                        .orElse(null);
            if (existing == null) {
                throw new IllegalArgumentException("Refund Request Detail not found");
            }

            existing.setAmount(request.getAmount());
            existing.setName(request.getName());
            existing.setLine1(request.getAddress()
                                     .getLine1());
            existing.setLine2(request.getAddress()
                                     .getLine2());
            existing.setCity(request.getAddress()
                                    .getCity());
            existing.setState(request.getAddress()
                                     .getState());
            existing.setPostalCode(request.getAddress()
                                          .getPostalCode());
            existing.setAni(request.getAni());
            existing.setRequestedDate(request.getRequestedDate());
            existing.setApprovedDate(request.getApprovedDate());

            return existing;
        } catch (IllegalArgumentException e) {
            CsCoreLogger.warn("Bad attempt to update refund request detail")
                        .keyValue("cause", e.getMessage())
                        .keyValue("id", id)
                        .json("request", request)
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to update refund request detail")
                        .keyValue("id", request.getId())
                        .json("request", request)
                        .exception(e)
                        .build();
            throw e;
        }
    }
}
