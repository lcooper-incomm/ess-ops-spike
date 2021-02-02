package com.incomm.cca.model.domain.complaint;

import com.incomm.cscore.mvcutils.model.CrudEntity;
import org.apache.commons.lang3.StringUtils;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table
public class ComplaintType extends AbstractComplaintOption implements CrudEntity<Long> {

    @Override
    public void validate() throws IllegalArgumentException {
        if (this.bank == null) {
            throw new IllegalArgumentException("ComplaintType must be associated to a Bank");
        } else if (StringUtils.isBlank(this.name)) {
            throw new IllegalArgumentException("ComplaintType name must be provided");
        }
    }
}
