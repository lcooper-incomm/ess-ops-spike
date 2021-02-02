package com.incomm.cca.service.session;

import com.incomm.cca.model.domain.session.ReceiptCard;
import com.incomm.cca.model.domain.session.ReceiptComponent;
import com.incomm.cca.model.view.session.ReceiptComponentRequestView;
import com.incomm.cca.repository.session.ReceiptCardRepository;
import com.incomm.cca.repository.session.ReceiptComponentRepository;
import com.incomm.cscore.logging.CsCoreLogger;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.ParseException;
import java.text.SimpleDateFormat;

@Service
public class ReceiptComponentService {

    @Autowired
	private ReceiptComponentRepository receiptComponentRepository;
    @Autowired
	private ReceiptCardRepository cardDetailRepository;

    @Transactional
	public ReceiptCard addOneCardDetail(Long receiptDetailId, ReceiptCard request) {
        try {
			ReceiptComponent existing = receiptComponentRepository.findById(receiptDetailId)
                                                            .orElse(null);
            if (existing == null) {
                throw new IllegalArgumentException("Receipt Detail not found");
            }

            existing.getCards()
                    .add(request);
			request.setReceiptComponent(existing);

            return cardDetailRepository.save(request);
        } catch (IllegalArgumentException e) {
            CsCoreLogger.warn("Bad attempt to add card detail to receipt detail")
                        .keyValue("cause", e.getMessage())
                        .keyValue("id", receiptDetailId)
                        .json("request", request)
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to add card detail to receipt detail")
                        .keyValue("id", receiptDetailId)
                        .json("request", request)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    @Transactional
    public void deleteOne(Long id) {
		cardDetailRepository.deleteByReceiptComponentId(id);
		receiptComponentRepository.deleteById(id);
    }

    @Transactional
    public void deleteOneCardDetail(Long id) {
        try {
            cardDetailRepository.deleteById(id);
        } catch (IllegalArgumentException e) {
            CsCoreLogger.warn("Bad attempt to delete receipt card detail")
                        .keyValue("cause", e.getMessage())
                        .keyValue("id", id)
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to delete receipt card detail")
                        .keyValue("id", id)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    @Transactional
	public ReceiptComponent updateOne(Long id, ReceiptComponentRequestView request) {
        try {
			ReceiptComponent existing = receiptComponentRepository.findById(id)
                                                            .orElse(null);
            if (existing == null) {
                throw new IllegalArgumentException("Receipt Detail not found");
            }

            existing.setReceiptId(request.getReceiptId());
            existing.setTransactionTime(request.getTransactionTime());
            existing.setTotalAmount(request.getTotalAmount());
            existing.setPaymentMethod(request.getPaymentMethod());
            existing.setTransactionAmount(request.getTransactionAmount());

            //TODO transaction_date should eventually get migrated to a VARCHAR type, instead of DATETIME2...
            if (StringUtils.isNotBlank(request.getTransactionDate())) {
                try {
                    existing.setTransactionDate(new SimpleDateFormat("MM/dd/yyyy").parse(request.getTransactionDate()));
                } catch (ParseException e) {
                    CsCoreLogger.error("Failed to parse transaction date")
                                .json("request", request)
                                .build();
                    existing.setTransactionDate(null);
                }
            } else {
                existing.setTransactionDate(null);
            }
            return existing;
        } catch (IllegalArgumentException e) {
            CsCoreLogger.warn("Bad attempt to update receipt detail")
                        .keyValue("cause", e.getMessage())
                        .keyValue("id", id)
                        .json("request", request)
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to update receipt detail")
                        .keyValue("id", request.getId())
                        .json("request", request)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    @Transactional
	public ReceiptCard updateOneCardDetail(Long id, ReceiptCard request) {
        try {
			ReceiptCard existing = cardDetailRepository.findById(id)
                                                             .orElse(null);
            if (existing == null) {
                throw new IllegalArgumentException("Receipt Card Detail not found");
            }

            existing.setSerialNumber(request.getSerialNumber());
            existing.setPackageVan(request.getPackageVan());
            existing.setVan(request.getVan());
            existing.setInitialLoadAmount(request.getInitialLoadAmount());
            existing.setProductType(request.getProductType());

            return existing;
        } catch (IllegalArgumentException e) {
            CsCoreLogger.warn("Bad attempt to update receipt detail")
                        .keyValue("cause", e.getMessage())
                        .keyValue("id", id)
                        .json("request", request)
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to update receipt detail")
                        .keyValue("id", request.getId())
                        .json("request", request)
                        .exception(e)
                        .build();
            throw e;
        }
    }
}
