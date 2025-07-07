package com.siply.backend;

import com.siply.backend.model.Beverage;
import com.siply.backend.model.BeverageLog;
import com.siply.backend.model.User;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/beverage-log")
public class BeverageLogController {

    private User testUser = new User("Sam", 31, 135, "Female");
    // Using a hard-coded user in memory for testing
    // Move everything BELOW into BeverageLogController to ensure it abides by Single Responsibility Principle
    // private BeverageLog bevLog = new BeverageLog();
    
    @PostMapping("/add")
    // Maps to POST 
    public ResponseEntity<String> addBeverage(@RequestBody Beverage beverage) {
        BeverageLog testLog = testUser.getBeverageLog();
        testLog.addBeverage(beverage);
        return new ResponseEntity<>("Successfully added: " + beverage.getName(), HttpStatus.CREATED);
    }
    // Basically, saying: We're adding a new resource through the HTTP method, POST

    @DeleteMapping("/remove/{name}")
    // Path Variables are used to extract parts of the URL path
    // Remove Name is the route that expects a beverage name to be part of the URL
    public ResponseEntity<String> removeBeverage(@PathVariable String name) {
        BeverageLog testLog = testUser.getBeverageLog();
        boolean removed = testLog.removeBeverageByName(name);
        if (removed) {
            return ResponseEntity.ok("Removed: " + name);
            // Shorthand for 200 OK status
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Beverage not found: " + name);
        }
    }

    @PutMapping("/refill/{name}") 
    // "Put" - Updating values 
    public ResponseEntity<String> refillBeverage(@PathVariable String name, @RequestBody Beverage refillData) {
        BeverageLog testLog = testUser.getBeverageLog();
        testLog.refillBeverage(name, refillData.getVolume(), refillData.getCalories(), refillData.getSugar(), refillData.getCaffeineAmount());
        return ResponseEntity.ok("Successfully refilled: " + name);
    }

    @GetMapping("/all-totals") 
    public ResponseEntity<String> getAllBeverages() {
        BeverageLog testLog = testUser.getBeverageLog();
        String summary = "Calories: " + testLog.getDailyTotalCalories() + ", Sugar: " + testLog.getDailyTotalSugarContent() + ", Caffeine: " + testLog.getDailyTotalCaffeineAmount();
        return ResponseEntity.ok(summary);
    }

    @PutMapping("/reset-log")
    public ResponseEntity<String> resetDailyLog() {
        BeverageLog testLog = testUser.getBeverageLog();
        testLog.resetLogForNextDay();
        return ResponseEntity.ok("Daily log has been reset");
    }

    @PutMapping("/log-complete")
    public ResponseEntity<String> finalizeDailyLog() {
        BeverageLog testLog = testUser.getBeverageLog();
        testLog.finishedDailyLog();
        return ResponseEntity.ok("Daily log has been finalized");
    }
}
