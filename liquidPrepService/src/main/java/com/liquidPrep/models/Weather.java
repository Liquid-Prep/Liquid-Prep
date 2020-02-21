package com.liquidPrep.models;

public class Weather {
	
	private float currentTemperature;
	private float minTemperature;
	private float maxTemperature;
	private String levelMetric;
	
	public Weather(float currentTemperature, float minTemperature, float maxTemperature, String levelMetric) {
		super();
		this.currentTemperature = currentTemperature;
		this.minTemperature = minTemperature;
		this.maxTemperature = maxTemperature;
		this.levelMetric = levelMetric;
	}
	
	public float getCurrentTemperature() {
		return currentTemperature;
	}
	public void setCurrentTemperature(float currentTemperature) {
		this.currentTemperature = currentTemperature;
	}
	public float getMinTemperature() {
		return minTemperature;
	}
	public void setMinTemperature(float minTemperature) {
		this.minTemperature = minTemperature;
	}
	public float getMaxTemperature() {
		return maxTemperature;
	}
	public void setMaxTemperature(float maxTemperature) {
		this.maxTemperature = maxTemperature;
	}
	public String getLevelMetric() {
		return levelMetric;
	}
	public void setLevelMetric(String levelMetric) {
		this.levelMetric = levelMetric;
	}

}
