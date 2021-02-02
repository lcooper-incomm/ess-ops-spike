package com.incomm.cca.data;

import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

public class DateBuilder {
	
	public static Date getTodaysDatePlusDays( int numDays ) {
		Calendar calendar = GregorianCalendar.getInstance();
		calendar.add( Calendar.DATE, numDays );
		return calendar.getTime();
	}
	
}
