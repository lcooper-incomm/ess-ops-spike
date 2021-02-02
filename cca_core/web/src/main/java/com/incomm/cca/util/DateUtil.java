package com.incomm.cca.util;

import org.apache.commons.lang3.StringUtils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.TimeZone;

/**
 * This util intended to assist with REST services requiring the start and end
 * date filters, providing a consistent format of date parameters.
 */
public final class DateUtil {

    private static final String FORMAT_DATE = "MM/dd/yyyy";
    private static final String FORMAT_TIMESTAMP = "MM/dd/yyyy HH:mm z";
    private static final String START_DATE_ILLEGAL_ARGUMENT = "'startDate' must be in the format 'MM/dd/yyyy'";
    private static final String END_DATE_ILLEGAL_ARGUMENT = "'endDate' must be in the format 'MM/dd/yyyy'";
    private static final String START_AFTER_TODAY_ILLEGAL_ARGUMENT = "'startDate' cannot be in the future";
    private static final String START_AFTER_END_ILLEGAL_ARGUMENT = "'startDate' cannot be greater than 'endDate'";
    private static final String END_WITHOUT_START_ILLEGAL_ARGUMENT = "if 'endDate' is provided, 'startDate' must also be provided";

    private DateUtil() {
    }

    public static void checkDateRange(String start, String end) {
        //Prepare to check dates
        SimpleDateFormat format = new SimpleDateFormat(FORMAT_DATE);
        Date today = new Date();
        Date startDate = null;
        Date endDate = null;

        //Check for start date
        if (StringUtils.isNotBlank(start)) {
            try {
                startDate = format.parse(start);
            } catch (ParseException e) {
                throw new IllegalArgumentException(START_DATE_ILLEGAL_ARGUMENT);
            }

            //Check start is before today
            if (startDate.after(today)) {
                throw new IllegalArgumentException(START_AFTER_TODAY_ILLEGAL_ARGUMENT);
            }
        }

        //Check for end date
        if (StringUtils.isNotBlank(end)) {
            try {
                endDate = format.parse(end);
            } catch (ParseException e) {
                throw new IllegalArgumentException(END_DATE_ILLEGAL_ARGUMENT);
            }

            //Check for start date
            if (startDate == null) {
                throw new IllegalArgumentException(END_WITHOUT_START_ILLEGAL_ARGUMENT);
            }

            //Check start is before end
            if (startDate.after(endDate)) {
                throw new IllegalArgumentException(START_AFTER_END_ILLEGAL_ARGUMENT);
            }
        }
    }

    /**
     * Provides a single place to define and retrieve a standard date format
     *
     * @return "MM/dd/yyyy"
     */
    public static String getDateFormat() {
        return FORMAT_DATE;
    }

    /**
     * Provides a single place to define the same date/time format used throughout the UI
     *
     * @return "MM/dd/yyyy HH:mm"
     */
    public static String getDateTimeFormat() {
        return FORMAT_TIMESTAMP;
    }

    /**
     * Attempts to parse the provided date value string into a Date object
     *
     * @param value to be parsed
     * @return the parsed Date object
     * @throws DateValidationException if provided date is improperly formatted
     */
    public static Date parseDate(String value) throws DateValidationException {
        Date date = null;
        if (StringUtils.isNotBlank(value)) {
            try {
                date = new SimpleDateFormat(getDateFormat()).parse(value);
            } catch (ParseException e) {
                throw new DateValidationException(String.format("'%s' is not in the proper '%s' date format", value, getDateFormat()));
            }
        }

        return date;
    }

    /**
     * Validates that:
     * a) Both dates can be null
     * b) Both dates must be provided if one is provided
     * c) Start date must be before end date
     *
     * @param startDate
     * @param endDate
     * @throws DateValidationException if dates are invalid
     */
    public static void validateDates(Date startDate, Date endDate) throws DateValidationException {
        if (startDate == null && endDate == null) {
            //Dates are valid if both are null
        } else if (startDate != null && endDate == null) {
            //Dates are valid if startDate provided without endDate
        } else if (startDate != null && endDate != null) {
            //Dates are valid if both dates are provided and startDate is before endDate
            if (startDate.after(endDate)) {
                throw new DateValidationException("'startDate' must be before 'endDate'");
            }
        } else {
            //Dates are invalid if one of the dates is not provided
            throw new DateValidationException("Both 'startDate' and 'endDate' must be provided if either date is provided");
        }
    }

    public static Date getMidnight() {
        Calendar date = new GregorianCalendar();
        date.set(Calendar.HOUR_OF_DAY, 0);
        date.set(Calendar.MINUTE, 0);
        date.set(Calendar.SECOND, 0);
        date.set(Calendar.MILLISECOND, 0);

        return date.getTime();
    }

    public static String formatDate(Long value) {
        if (value != null) {
            LocalDate localDate = LocalDateTime.ofInstant(Instant.ofEpochMilli(value), ZoneId.systemDefault())
                                               .toLocalDate();
            return formatDate(localDate);
        }
        return "";
    }

    public static String formatDate(Date date) {
        if (date != null) {
            LocalDate localDate = LocalDateTime.ofInstant(date.toInstant(), ZoneId.systemDefault())
                                               .toLocalDate();
            return formatDate(localDate);
        }
        return "";
    }

    public static String formatDate(LocalDate date) {
        if (date != null) {
            return DateTimeFormatter.ofPattern(FORMAT_DATE)
                                    .format(date);
        }
        return "";
    }

    //TODO Figure out why the two dates get different time zones!

    public static String formatTimestamp(Long value) {
        if (value != null) {
            LocalDateTime localDateTime = LocalDateTime.ofInstant(Instant.ofEpochMilli(value), ZoneId.systemDefault());
            return formatTimestamp(localDateTime);
        }
        return "";
    }

    public static String formatTimestamp(Date date) {
        if (date != null) {
            LocalDateTime localDateTime = LocalDateTime.ofInstant(date.toInstant(), ZoneId.systemDefault());
            return formatTimestamp(localDateTime);
        }
        return "";
    }

    public static String formatTimestamp(LocalDateTime date) {
        if (date != null) {
            ZonedDateTime zonedDateTime = ZonedDateTime.of(date, TimeZone.getDefault()
                                                                         .toZoneId());
            return formatTimestamp(zonedDateTime);
        }
        return "";
    }

    public static boolean isInRange(LocalDate date, LocalDate start, LocalDate end) {
        return !date.isBefore(start) && !date.isAfter(end);
    }

    public static boolean isInRange(ZonedDateTime dateTime, ZonedDateTime start, ZonedDateTime end) {
        return DateUtil.isInRange(dateTime.toLocalDate(), start.toLocalDate(), end.toLocalDate());
    }

    private static String formatTimestamp(ZonedDateTime date) {
        if (date != null) {

            return DateTimeFormatter.ofPattern(FORMAT_TIMESTAMP)
                                    .format(date);
        }
        return "";
    }

    public static class DateValidationException extends Exception {

        public DateValidationException(String message) {
            super(message);
        }
    }
}
