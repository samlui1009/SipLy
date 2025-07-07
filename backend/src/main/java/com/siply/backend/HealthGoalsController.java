package com.siply.backend;

import com.siply.backend.model.Beverage;
import com.siply.backend.model.BeverageLog;
import com.siply.backend.model.HealthGoals;
import com.siply.backend.model.User;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/health-goals")
public class HealthGoalsController {
    
    private User testUser = new User("Sam", 31, 135, "Female");
    // Test user in-memory
    // We needed this because User, HealthGoals and BeverageLog contain the actual
    // State we're working with during testing => "In memory representations" of persistent data
    // Subcomponents of User will need a testUser 

    @GetMapping
    public ResponseEntity<HealthGoals> getHealthGoals() {
        return ResponseEntity.ok(testUser.getHealthGoals());
    }

    // Can be called to update ALL health goals
    @PutMapping
    public ResponseEntity<String> updateHealthGoals(@RequestBody HealthGoals updatedGoals) {
        HealthGoals goals = testUser.getHealthGoals();
        goals.setMaxCalories(updatedGoals.getMaxCalories());
        goals.setMaxSugar(updatedGoals.getMaxSugar());
        goals.setMaxCaffeine(updatedGoals.getMaxCaffeine());
        return ResponseEntity.ok("Health goals updated successfully!");
    }

    // Performs update for the daily sugar intake 
    @PutMapping("/update/sugar/{amount}")
    public ResponseEntity<String> updateSugarGoal(@PathVariable int amount) {
        testUser.getHealthGoals().setMaxSugar(amount);
        return ResponseEntity.ok("Daily sugar intake limit has been updated!");
    }

    @PutMapping("/update/calories/{amount}")
    public ResponseEntity<String> updateCalorieGoal(@PathVariable int amount) {
        testUser.getHealthGoals().setMaxCalories(amount);
        return ResponseEntity.ok("Daily calorie limit has been updated!");
    }

    @PutMapping("/update/caffeine/{amount}")
    public ResponseEntity<String> updateCaffeineGoal(@PathVariable int amount) {
        testUser.getHealthGoals().setMaxCaffeine(amount);
        return ResponseEntity.ok("Daily caffeine limit has been updated!");
    }
}

// RequestBody is used when we send a full JSON object in the body of a request
// Such as, creating or updating a resource that has multiple fields - like that of Beverage
// PathVariable is for single VALUES, like an ID or a name 
// Here, we use PathVariable because they are singular amounts
