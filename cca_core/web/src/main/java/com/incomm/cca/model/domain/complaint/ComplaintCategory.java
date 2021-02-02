package com.incomm.cca.model.domain.complaint;

import com.incomm.cscore.mvcutils.model.CrudEntity;
import org.apache.commons.lang3.StringUtils;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table
public class ComplaintCategory extends AbstractComplaintOption implements CrudEntity<Long> {

    private Boolean isInactive;

    public Boolean getIsInactive() {
        return isInactive;
    }

    public void setIsInactive(Boolean inactive) {
        isInactive = inactive;
    }

    @Override
    public void validate() throws IllegalArgumentException {
        if (this.bank == null) {
            throw new IllegalArgumentException("ComplaintCategory must be associated to a Bank");
        } else if (StringUtils.isBlank(this.name)) {
            throw new IllegalArgumentException("ComplaintCategory name must be provided");
        }
    }
}
