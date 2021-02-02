package com.incomm.cca.model.converter.complaint;

import com.incomm.cca.model.converter.UserConverter;
import com.incomm.cca.model.domain.complaint.AbstractComplaintOption;
import com.incomm.cca.model.domain.complaint.Bank;
import com.incomm.cca.model.view.complaint.BankView;
import com.incomm.cca.model.view.complaint.ComplaintOptionView;
import com.incomm.cscore.client.rest.converter.TimestampConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class BankConverter {

    @Autowired
    private TimestampConverter timestampConverter;
    @Autowired
    private UserConverter userConverter;

    public List<BankView> convertBanks(Collection<Bank> request) {
        List<BankView> views = new ArrayList<>();

        if (request != null) {
            request.forEach(bank -> {
                BankView view = this.convertBank(bank);
                if (view != null) {
                    views.add(view);
                }
            });
        }

        return views;
    }

    public BankView convertBank(Bank request) {
        BankView view = null;

        if (request != null) {
            view = this.convertBankSimple(request);

            view.setComplaintCategories(this.convertOptions(request.getComplaintCategories()));
            view.setComplaintCauses(this.convertOptions(request.getComplaintCauses()));
            view.setComplaintDepartments(this.convertOptions(request.getComplaintDepartments()));
            view.setComplaintDiscriminationTypes(this.convertOptions(request.getComplaintDiscriminationTypes()));
            view.setComplaintSources(this.convertOptions(request.getComplaintSources()));
            view.setComplaintTypes(this.convertOptions(request.getComplaintTypes()));
        }

        return view;
    }

    public BankView convertBankSimple(Bank request) {
        BankView view = null;

        if (request != null) {
            view = new BankView();
            view.setId(request.getId());
            view.setCreatedBy(this.userConverter.convertSimple(request.getCreatedBy()));
            view.setCreatedDate(this.timestampConverter.convert(request.getCreatedDate()));
            view.setDeletedBy(this.userConverter.convertSimple(request.getDeletedBy()));
            view.setDeletedDate(this.timestampConverter.convert(request.getDeletedDate()));
            view.setDisplayValue(request.getDisplayValue());
            view.setModifiedBy(this.userConverter.convertSimple(request.getModifiedBy()));
            view.setModifiedDate(this.timestampConverter.convert(request.getModifiedDate()));
            view.setSystemValue(request.getSystemValue());
        }

        return view;
    }

    public Bank convertBankView(BankView request) {
        Bank model = null;

        if (request != null) {
            model = new Bank();
            model.setId(request.getId());
            model.setDisplayValue(request.getDisplayValue());
            model.setSystemValue(request.getSystemValue());
        }

        return model;
    }

    public ComplaintOptionView convertOption(AbstractComplaintOption request) {
        ComplaintOptionView view = null;

        if (request != null) {
            view = new ComplaintOptionView();
            view.setId(request.getId());
            view.setName(request.getName());
        }

        return view;
    }

    public AbstractComplaintOption convertOptionView(ComplaintOptionView request, Class targetClass) throws IllegalAccessException, InstantiationException {
        AbstractComplaintOption model = null;

        if (request != null) {
            model = (AbstractComplaintOption) targetClass.newInstance();
            model.setId(request.getId());
            model.setName(request.getName());
        }

        return model;
    }

    private List<ComplaintOptionView> convertOptions(Collection<? extends AbstractComplaintOption> request) {
        List<ComplaintOptionView> views = new ArrayList<>();

        if (request != null) {
            request.forEach(option -> {
                ComplaintOptionView view = this.convertOption(option);
                if (view != null) {
                    views.add(view);
                }
            });
        }

        return views;
    }
}
