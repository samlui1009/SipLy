package com.siply.backend;

import com.siply.backend.model.Beverage;
import com.siply.backend.model.BeverageLog;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/beverage")
public class BeverageController {
    private BeverageLog bevLog = new BeverageLog();
    
    @PostMapping("/add")
    // Maps to POST 
    public ResponseEntity<String> addBeverage(@RequestBody Beverage beverage) {
        bevLog.addBeverage(beverage);
        return new ResponseEntity<>("Successfully added: " + beverage.getName(), HttpStatus.CREATED);
    }
    // Basically, saying: We're adding a new resource through the HTTP method, POST

    @DeleteMapping("/remove/{name}")
    // Path Variables are used to extract parts of the URL path
    // Remove Name is the route that expects a beverage name to be part of the URL
    public ResponseEntity<String> removeBeverage(@PathVariable String name) {
        boolean removed = bevLog.removeBeverageByName(name);
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
        bevLog.refillBeverage(name, refillData.getVolume(), refillData.getCalories(), refillData.getSugar(), refillData.getCaffeineAmount());
        return ResponseEntity.ok("Successfully refilled: " + name);
    }


}
