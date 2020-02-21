package com.ibm.liquidprep.models;

import com.ibm.liquidprep.enums.Forecast;
import com.ibm.liquidprep.enums.WateringLevel;

import org.joda.time.DateTime;

import java.io.Serializable;

public class FullWateringAdvice implements Serializable {

    private Forecast dayForecast;

    private Forecast nightForecast;

    private WateringLevel wateringLevel;

    private DateTime dateTime;

    private double wateringHeight;

    public FullWateringAdvice(Forecast dayForecast, Forecast nightForecast,
                              WateringLevel wateringLevel, DateTime dateTime, double wateringHeight) {
        this.dayForecast = dayForecast;
        this.nightForecast = nightForecast;
        this.wateringLevel = wateringLevel;
        this.dateTime = dateTime;
        this.wateringHeight = wateringHeight;

    }

    public FullWateringAdvice(Forecast dayForecast, Forecast nightForecast,
                              WateringLevel wateringLevel, String dateTimeString, double wateringHeight) {
        this.dayForecast = dayForecast;
        this.nightForecast = nightForecast;
        this.wateringLevel = wateringLevel;
        this.dateTime = new DateTime(dateTimeString);
        this.wateringHeight = wateringHeight;

    }

    public Forecast getDayForecast() {
        return dayForecast;
    }

    public void setDayForecast(Forecast dayForecast) {
        this.dayForecast = dayForecast;
    }

    public Forecast getNightForecast() {
        return nightForecast;
    }

    public void setNightForecast(Forecast nightForecast) {
        this.nightForecast = nightForecast;
    }

    public WateringLevel getWateringLevel() {
        return wateringLevel;
    }

    public void setWateringLevel(WateringLevel wateringLevel) {
        this.wateringLevel = wateringLevel;
    }

    public DateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(DateTime dateTime) {
        this.dateTime = dateTime;
    }

    public double getWateringHeight() {
        return wateringHeight;
    }

    public void setWateringHeight(double wateringHeight) {
        this.wateringHeight = wateringHeight;
    }
}
