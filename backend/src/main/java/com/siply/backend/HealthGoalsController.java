package com.siply.backend;

import com.siply.backend.model.HealthGoals;
import com.siply.backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/health-goals")
public class HealthGoalsController {
    
    private final UserRepository userRepository; 

    // private User testUser = new User("Sam", 31, 135, "Female");
    // // Test user in-memory
    // We needed this because User, HealthGoals and BeverageLog contain the actual
    // State we're working with during testing => "In memory representations" of persistent data
    // Subcomponents of User will need a testUser 
    // If no longer using a local user in-memory, retrieve a user from the database 
    // BASED off the ID

    @Autowired
    public HealthGoalsController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/{id}")
    public ResponseEntity<HealthGoals> getHealthGoals(@PathVariable Long id) {
        return userRepository.findById(id).map(user -> ResponseEntity.ok(user.getHealthGoals())).orElse(ResponseEntity.notFound().build());
    }

    // Can be called to update ALL health goals
    @PutMapping("/update-health-goals/{id}")
    public ResponseEntity<String> updateHealthGoals(@PathVariable Long id, @RequestBody HealthGoals updatedGoals) {
        return userRepository.findById(id).map(user -> {
            HealthGoals goals = user.getHealthGoals();
            goals.setMaxCalories(updatedGoals.getMaxCalories());
            goals.setMaxSugar(updatedGoals.getMaxSugar());
            goals.setMaxCaffeine(updatedGoals.getMaxCaffeine());
            userRepository.save(user);
            return ResponseEntity.ok("Health goals updated successfully!");
        }).orElse(ResponseEntity.notFound().build());
    }

    // Performs update for the daily sugar intake 
    @PutMapping("/update-sugar/{id}/{amount}")
    public ResponseEntity<String> updateSugarGoal(@PathVariable Long id, @PathVariable int amount) {
        return userRepository.findById(id).map(user -> {
            user.getHealthGoals().setMaxSugar(amount);
            userRepository.save(user);
            return ResponseEntity.ok("Daily sugar intake limit updated!");
        }).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/update-calories/{id}/{amount}")
    public ResponseEntity<String> updateCalorieGoal(@PathVariable Long id, @PathVariable int amount) {
        return userRepository.findById(id).map(user -> {
            user.getHealthGoals().setMaxCalories(amount);
            userRepository.save(user);
            return ResponseEntity.ok("Daily calorie intake limit updated!");
        }).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/update-caffeine/{id}/{amount}")
    public ResponseEntity<String> updateCaffeineGoal(@PathVariable Long id, @PathVariable int amount) {
        return userRepository.findById(id).map(user -> {
            user.getHealthGoals().setMaxCaffeine(amount);
            userRepository.save(user);
            return ResponseEntity.ok("Daily caffeine intake limit updated!");
        }).orElse(ResponseEntity.notFound().build());
    }
}

// RequestBody is used when we send a full JSON object in the body of a request
// Such as, creating or updating a resource that has multiple fields - like that of Beverage
// PathVariable is for single VALUES, like an ID or a name 
// Here, we use PathVariable because they are singular amounts
