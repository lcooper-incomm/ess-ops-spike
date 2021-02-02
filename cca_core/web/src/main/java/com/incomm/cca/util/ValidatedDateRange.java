package com.incomm.cca.util;

import com.incomm.cca.util.DateUtil.DateValidationException;
import org.apache.commons.lang3.StringUtils;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Used to do a bit more than it does now. Now, this simply takes in both date String params, parses, and validates them against each other. Provides a single point of validation for both dates together.
 */
public class ValidatedDateRange {

    private final Date startDate;
    private final Date endDate;

    public ValidatedDateRange(String startDate, String endDate) throws DateValidationException {
        this.startDate = DateUtil.parseDate(startDate);

        //Default endDate to today if startDate provided without endDate
        if (this.startDate != null && StringUtils.isBlank(endDate)) {
            //Default end date to today if startDate provided without endDate
            this.endDate = new Date();
        } else {
            this.endDate = DateUtil.parseDate(endDate);
        }

        DateUtil.validateDates(this.startDate, this.endDate);
    }

    public Date getStartDate() {
        return startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public String getStartDateString() {
        return new SimpleDateFormat(DateUtil.getDateFormat()).format(startDate);
    }

    public String getEndDateString() {
        return new SimpleDateFormat(DateUtil.getDateFormat()).format(endDate);
    }
}
