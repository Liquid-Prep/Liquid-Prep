package com.liquidPrep;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

/**
 * Main Application
 *
 */
@SpringBootApplication
public class App extends SpringBootServletInitializer {
    public static void main( String[] args )
    {
    	SpringApplication.run(App.class, args);
    }
}
