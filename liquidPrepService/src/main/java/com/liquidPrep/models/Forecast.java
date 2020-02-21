package com.liquidPrep.models;

import java.util.Date;
import java.util.List;

public class Forecast {
	
	private Date date;
	private List<Object> dayTime;
	private List<Object> nightTime;
	
	public Forecast(Date date, List<Object> dayTime, List<Object> nightTime) {
		super();
		this.date = date;
		this.dayTime = dayTime;
		this.nightTime = nightTime;
	}
	
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public List<Object> getDayTime() {
		return dayTime;
	}
	public void setDayTime(List<Object> dayTime) {
		this.dayTime = dayTime;
	}
	public List<Object> getNightTime() {
		return nightTime;
	}
	public void setNightTime(List<Object> nightTime) {
		this.nightTime = nightTime;
	}

}
