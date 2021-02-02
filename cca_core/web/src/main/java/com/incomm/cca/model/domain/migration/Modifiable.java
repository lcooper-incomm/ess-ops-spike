package com.incomm.cca.model.domain.migration;

import com.incomm.cscore.mvcutils.model.Identifiable;

import java.util.Date;

public interface Modifiable extends Identifiable<Long> {

    public Date getModifiedDate();
}
