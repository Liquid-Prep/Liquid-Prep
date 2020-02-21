package com.liquidPrep.models;

import java.sql.Timestamp;
import java.util.List;

public class WaterGuidence {

	private List<Forecast> forecast;
	private Timestamp timestamp;

	public WaterGuidence(List<Forecast> forecast, Timestamp timestamp) {
		super();
		this.forecast = forecast;
		this.timestamp = timestamp;
	}

	public List<Forecast> getForecast() {
		return forecast;
	}

	public void setForecast(List<Forecast> forecast) {
		this.forecast = forecast;
	}

	public Timestamp getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(Timestamp timestamp) {
		this.timestamp = timestamp;
	}

}
