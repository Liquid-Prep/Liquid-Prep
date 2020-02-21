/**
 * 
 */
package com.liquidPrep.api;

import java.io.IOException;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.liquidPrep.models.DeviceData;
import com.liquidPrep.processor.WaterGuidenceProcessor;

/**
 * @author GauravHonnegowdaRama
 *
 */
@RestController
@RequestMapping(path = "/api")
public class WaterGuidenceAPI {
	
	@RequestMapping(method = RequestMethod.GET, value="/waterAdvice", produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody Object getWaterAdvice() {
		
		Resource resource = new ClassPathResource("/waterAdvice.json");
		
		ObjectMapper mapper = new ObjectMapper();
		
		try {
			return mapper.readValue(resource.getInputStream(), Object.class);
		} catch (JsonParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JsonMappingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		};
		return mapper;
	}
	
	@RequestMapping(method = RequestMethod.POST, value="/deviceInfo", produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody Object receiveDeviceInfo(@RequestBody DeviceData deviceData) {
		
		//TO-DO
		// The Device Data is sent to the Water Guidence Processor for analyzing and get the water advice.
		WaterGuidenceProcessor response = new WaterGuidenceProcessor();
		
		return response.waterGuidence(deviceData);
	}

}
