package com.incomm.cca.model.converter.complaint;

import com.incomm.cca.model.converter.IdentifierConverter;
import com.incomm.cca.model.converter.UserConverter;
import com.incomm.cca.model.domain.complaint.ComplaintCategory;
import com.incomm.cca.model.domain.complaint.ComplaintCause;
import com.incomm.cca.model.domain.complaint.ComplaintDepartment;
import com.incomm.cca.model.domain.complaint.ComplaintDiscriminationType;
import com.incomm.cca.model.domain.complaint.ComplaintSource;
import com.incomm.cca.model.domain.complaint.ComplaintType;
import com.incomm.cca.model.domain.session.ComplaintComponent;
import com.incomm.cca.model.view.session.ComplaintComponentView;
import com.incomm.cscore.client.rest.converter.TimestampConverter;
import com.incomm.cscore.logging.CsCoreLogger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZoneId;
import java.time.ZoneOffset;
import java.util.Date;

@Service
public class ComplaintComponentConverter {

    @Autowired
    private BankConverter bankConverter;
    @Autowired
    private IdentifierConverter identifierConverter;
    @Autowired
    private TimestampConverter timestampConverter;
    @Autowired
    private UserConverter userConverter;

    public ComplaintComponentView convert(ComplaintComponent request) {
        ComplaintComponentView view = null;

        if (request != null) {
            view = new ComplaintComponentView();
            view.setId(request.getId());
            view.setBank(this.bankConverter.convertBankSimple(request.getBank()));
            view.setAccountNumber(request.getAccountNumber());
            view.setCategory(this.bankConverter.convertOption(request.getCategory()));
            view.setCause(this.bankConverter.convertOption(request.getCause()));
            view.setCompensation(request.getCompensation());
            view.setComplaint(request.getComplaint());
            view.setCreatedBy(this.userConverter.convertSimple(request.getCreatedBy()));
            view.setCreatedDate(this.timestampConverter.convert(request.getCreatedDate()));
            view.setDepartment(this.bankConverter.convertOption(request.getDepartment()));
            view.setDiscriminationType(this.bankConverter.convertOption(request.getDiscriminationType()));
            view.setEnhancementsNeeded(request.getEnhancementsNeeded());
            view.setFirstName(request.getFirstName());
            view.setLastName(request.getLastName());
            view.setIdentifier(this.identifierConverter.convert(request.getIdentifier()));
            view.setIsRegulatory(request.getIsRegulatory());
            view.setIsVerbal(request.getIsVerbal());
            view.setIsWritten(request.getIsWritten());
            view.setModifiedBy(this.userConverter.convertSimple(request.getModifiedBy()));
            view.setModifiedDate(this.timestampConverter.convert(request.getModifiedDate()));
            view.setPostalCode(request.getPostalCode());
            view.setPriority(request.getPriority());
            view.setResolution(request.getResolution());
            view.setSource(this.bankConverter.convertOption(request.getSource()));
            view.setSummary(request.getSummary());
            view.setType(this.bankConverter.convertOption(request.getType()));
            view.setResolutionDate(timestampConverter.convert(request.getResolutionDate()));
        }

        return view;
    }

    public ComplaintComponent convertView(ComplaintComponentView request) throws InstantiationException, IllegalAccessException {
        ComplaintComponent model = null;

        if (request != null) {
            model = new ComplaintComponent();
            model.setId(request.getId());
            model.setAccountNumber(request.getAccountNumber());
            model.setBank(this.bankConverter.convertBankView(request.getBank()));
            model.setCategory((ComplaintCategory) this.bankConverter.convertOptionView(request.getCategory(), ComplaintCategory.class));
            model.setCause((ComplaintCause) this.bankConverter.convertOptionView(request.getCause(), ComplaintCause.class));
            model.setCompensation(request.getCompensation());
            model.setComplaint(request.getComplaint());
            model.setDepartment((ComplaintDepartment) this.bankConverter.convertOptionView(request.getDepartment(), ComplaintDepartment.class));
            model.setDiscriminationType((ComplaintDiscriminationType) this.bankConverter.convertOptionView(request.getDiscriminationType(), ComplaintDiscriminationType.class));
            model.setEnhancementsNeeded(request.getEnhancementsNeeded());
            model.setFirstName(request.getFirstName());
            model.setLastName(request.getLastName());
            model.setIdentifier(this.identifierConverter.convert(request.getIdentifier()));
            model.setIsRegulatory(request.getIsRegulatory());
            model.setIsVerbal(request.getIsVerbal());
            model.setIsWritten(request.getIsWritten());
            model.setPostalCode(request.getPostalCode());
            model.setPriority(request.getPriority());
            model.setResolution(request.getResolution());
            model.setSource((ComplaintSource) this.bankConverter.convertOptionView(request.getSource(), ComplaintSource.class));
            model.setSummary(request.getSummary());
            model.setType((ComplaintType) this.bankConverter.convertOptionView(request.getType(), ComplaintType.class));
            if (request.getResolutionDate() != null && request.getResolutionDate().getValue() != null) {
                model.setResolutionDate(
                    Date.from(request.getResolutionDate().getValue().toLocalDateTime().toInstant(ZoneOffset.UTC))
                );
            } else {
                model.setResolutionDate(null);
            }
        }

        return model;
    }
}
