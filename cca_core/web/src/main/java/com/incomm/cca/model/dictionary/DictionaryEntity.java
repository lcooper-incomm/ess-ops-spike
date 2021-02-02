package com.incomm.cca.model.dictionary;

import com.incomm.cscore.mvcutils.model.CrudEntity;

public interface DictionaryEntity extends CrudEntity<Long> {

    Boolean getIsActive();
}
