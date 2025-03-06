package com.server;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Slf4j
@SpringBootApplication
public class ServerApplication {

    public static void main(String[] args) {
        try {
            String date = new SimpleDateFormat("yyyy-MM-dd").format(new Date());
            File file = new File("log");
            if (!file.exists()) {
                file.mkdir();
            }
            System.setOut(new PrintStream("log/server" + date + ".log"));
            
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        System.out.println(SpringApplication.run(ServerApplication.class, args));
        log.info("Server is running on port 8080");
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(@NonNull CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins("http://localhost:3000", "http://localhost:3001")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}