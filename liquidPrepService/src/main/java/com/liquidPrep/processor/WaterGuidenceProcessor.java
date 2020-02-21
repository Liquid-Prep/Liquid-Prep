package com.liquidPrep.processor;

import java.io.IOException;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.liquidPrep.models.DeviceData;

public class WaterGuidenceProcessor {
	
	public Object waterGuidence(DeviceData deviceData) {
		// Data has to be parsed and pushed to database.
		// Currently sending a static json response for the prototype.
		
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

}
