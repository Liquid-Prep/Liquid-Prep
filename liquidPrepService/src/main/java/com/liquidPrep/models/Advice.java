package com.liquidPrep.models;

public class Advice {
	
	private String state;
	private String waterNeed;
	private float minRequiredLevel;
	private float maxRequiredLevel;
	private float optimumRequiredLevel;
	private String levelMetric;
	
	public Advice(String state, String waterNeed, float minRequiredLevel, float maxRequiredLevel,
			float optimumRequiredLevel, String levelMetric) {
		super();
		this.state = state;
		this.waterNeed = waterNeed;
		this.minRequiredLevel = minRequiredLevel;
		this.maxRequiredLevel = maxRequiredLevel;
		this.optimumRequiredLevel = optimumRequiredLevel;
		this.levelMetric = levelMetric;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getWaterNeed() {
		return waterNeed;
	}
	public void setWaterNeed(String waterNeed) {
		this.waterNeed = waterNeed;
	}
	public float getMinRequiredLevel() {
		return minRequiredLevel;
	}
	public void setMinRequiredLevel(float minRequiredLevel) {
		this.minRequiredLevel = minRequiredLevel;
	}
	public float getMaxRequiredLevel() {
		return maxRequiredLevel;
	}
	public void setMaxRequiredLevel(float maxRequiredLevel) {
		this.maxRequiredLevel = maxRequiredLevel;
	}
	public float getOptimumRequiredLevel() {
		return optimumRequiredLevel;
	}
	public void setOptimumRequiredLevel(float optimumRequiredLevel) {
		this.optimumRequiredLevel = optimumRequiredLevel;
	}
	public String getLevelMetric() {
		return levelMetric;
	}
	public void setLevelMetric(String levelMetric) {
		this.levelMetric = levelMetric;
	}

}
