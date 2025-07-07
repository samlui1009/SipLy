package com.siply.backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.siply.backend.model.User;
import com.siply.backend.repository.UserRepository;

@SpringBootApplication
public class SiplyApplication {

	public static void main(String[] args) {
		SpringApplication.run(SiplyApplication.class, args);
	}
    
    @Bean
    public CommandLineRunner runner(UserRepository userRepository) {
        return args -> {
            User sam = new User("Sam", 31, 135, "Female");
            userRepository.save(sam);
        }
    }

}
