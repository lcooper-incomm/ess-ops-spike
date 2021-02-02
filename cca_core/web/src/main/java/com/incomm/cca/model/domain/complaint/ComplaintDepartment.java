package com.incomm.cca.model.domain.complaint;

import com.incomm.cscore.mvcutils.model.CrudEntity;
import org.apache.commons.lang3.StringUtils;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table
public class ComplaintDepartment extends AbstractComplaintOption implements CrudEntity<Long> {

    @Override
    public void validate() throws IllegalArgumentException {
        if (this.bank == null) {
            throw new IllegalArgumentException("ComplaintDepartment must be associated to a Bank");
        } else if (StringUtils.isBlank(this.name)) {
            throw new IllegalArgumentException("ComplaintDepartment name must be provided");
        }
    }
}
