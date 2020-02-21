/**
 * 
 */
package com.liquidPrep.models;

import java.sql.Timestamp;

/**
 * @author GauravHonnegowdaRama
 *
 */
public class DeviceData {

	private String deviceId;
	private String userId;
	private String username;
	private String firstname;
	private String lastname;
	private double latitude;
	private double longitude;
	private double altitude;
	private String locationName;
	private Timestamp timestamp;
	private CropInformation cropInfo;
	private SensorInformation sensorData;
}
