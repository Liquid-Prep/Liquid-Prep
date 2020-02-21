package com.liquidPrep.models;

import java.sql.Timestamp;

public class SensorInformation {

	private String sensorId;
	private int soilMoisture;
	private Timestamp timestamp;
	public String getSensorId() {
		return sensorId;
	}
	public void setSensorId(String sensorId) {
		this.sensorId = sensorId;
	}
	public int getSoilMoisture() {
		return soilMoisture;
	}
	public void setSoilMoisture(int soilMoisture) {
		this.soilMoisture = soilMoisture;
	}
	public Timestamp getTimestamp() {
		return timestamp;
	}
	public void setTimestamp(Timestamp timestamp) {
		this.timestamp = timestamp;
	}
}
