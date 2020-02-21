## Liquid Prep
The Liquid Prep is a Spring Boot webservice project. Currently, it just returns a static json as watering advice http://9.21.108.205:8080/liquidPrep/api/waterAdvice

## TO-DO
1. Configure a relational database for storing the device data.
2. Create services to render weather information from weather APIs.
3. Create services to render crop information from IBM Watson AGRI platform.
4. An algorithmn to generate water advice based of device data, weather information and IBM Watson AGRI platform information. 

## Procedure to deploy on Tomcat server
- Start the tomcat server.
- In the browser enter "http://localhost:8080/".
- Click on Manger App.
- Upload the "liquidPrep.war" file from the WAR file to deploy section. (The war file can be found in the "/liquidPrep/target/" folder).
- On successful, enter "http://localhost:8080/liquidPrep/api/waterAdvice" in a new browser tab.
- You should see the static json water advice.
