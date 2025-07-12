package com.siply.backend;

import com.siply.backend.model.Beverage;
import com.siply.backend.model.BeverageLog;
import com.siply.backend.model.User;
import com.siply.backend.repository.UserRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/beverage-log")
public class BeverageLogController {

    private final UserRepository userRepository; 

    // private User testUser = new User("Sam", 31, 135, "Female");
    // Using a hard-coded user in memory for testing
    // Move everything BELOW into BeverageLogController to ensure it abides by Single Responsibility Principle
    // private BeverageLog bevLog = new BeverageLog();
    // We don't need this anymore, since we have a UserRepository to retrieve from database!
    
    @Autowired
    public BeverageLogController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/get-all-beverages/{id}")
    public ResponseEntity<List<Beverage>> getAllBeverages(@PathVariable Long id) {
        return userRepository.findById(id).map(user -> {
            return ResponseEntity.ok(user.getBeverageLog().getAllBeverages());
        }).orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
        // Use Null if we're expected to return back a specific Object type - NOT a String
    }

    @PostMapping("/add-beverage/{userId}")
    // Maps to POST 
    public ResponseEntity<User> addBeverage(@PathVariable Long userId, @RequestBody Beverage beverage) {
        return userRepository.findById(userId).map(user -> {
            user.getBeverageLog().addBeverage(beverage);
            userRepository.save(user);
            return ResponseEntity.ok(user);
        }).orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }
    // Basically, saying: We're adding a new resource through the HTTP method, POST

    @DeleteMapping("/remove-beverage/{id}/{name}")
    // Path Variables are used to extract parts of the URL path
    // Remove Name is the route that expects a beverage name to be part of the URL
    public ResponseEntity<String> removeBeverage(@PathVariable Long id, @PathVariable String name) {
        return userRepository.findById(id).map(user -> {
            boolean removed = user.getBeverageLog().removeBeverageByName(name);
            if (removed) {
                userRepository.save(user);
                return ResponseEntity.ok("Removed: " + name);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Beverage not found: " + name);
            }
        }).orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found"));
    }

    @PutMapping("/refill-beverage/{id}/{name}") 
    // "Put" - Updating values {}
    public ResponseEntity<String> refillBeverage(@PathVariable Long id, @PathVariable String name, @RequestBody Beverage refillData) {
        return userRepository.findById(id).map(user -> {
            user.getBeverageLog().refillBeverage(name,
                refillData.getVolume(),
                refillData.getCalories(),
                refillData.getSugar(),
                refillData.getCaffeineAmount()
            );
            userRepository.save(user);
            return ResponseEntity.ok("Successfully refilled: " + name);
        }).orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found"));
    }

    @GetMapping("/all-totals/{id}") 
    public ResponseEntity<String> getAllTotals(@PathVariable Long id) {
        return userRepository.findById(id).map(user -> {
            BeverageLog log = user.getBeverageLog();
            String summary = "Calories: " + log.getDailyTotalCalories() +
                             ", Sugar: " + log.getDailyTotalSugarContent() +
                             ", Caffeine: " + log.getDailyTotalCaffeineAmount();
            return ResponseEntity.ok(summary);
        }).orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found"));
    }

    @PutMapping("/reset-log/{id}")
    public ResponseEntity<String> resetDailyLog(@PathVariable Long id) {
        return userRepository.findById(id).map(user -> {
            user.getBeverageLog().resetLogForNextDay();
            userRepository.save(user);
            return ResponseEntity.ok("Daily log has been reset");
        }).orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found"));
    }

    @PutMapping("/log-complete/{id}")
    public ResponseEntity<String> finalizeDailyLog(@PathVariable Long id) {
        return userRepository.findById(id).map(user -> {
            user.getBeverageLog().finishedDailyLog();
            userRepository.save(user);
            return ResponseEntity.ok("Daily log has been finalized");
        }).orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found"));
    }
}
