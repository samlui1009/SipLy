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

    @GetMapping
    public ResponseEntity<HealthGoals> getHealthGoals() {
        return ResponseEntity.ok(testUser.getHealthGoals());
    }

    @PutMapping
    public ResponseEntity<String> updateHealthGoals(@RequestBody HealthGoals updatedGoals) {
        HealthGoals goals = testUser.getHealthGoals();
        goals.setMaxCalories(updatedGoals.getMaxCalories());
        goals.setMaxSugar(updatedGoals.getMaxSugar());
        goals.setMaxCaffeine(updatedGoals.getMaxCaffeine());
        return ResponseEntity.ok("Health goals updated successfully!");
    }

    




}
