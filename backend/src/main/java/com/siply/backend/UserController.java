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
@RequestMapping("/api/user")
public class UserController {

    private User testUser = new User("Sam", 31, 135, "Female");
    // Test user in-memory

    // Returns back a User JSON object
    @GetMapping
    public ResponseEntity<User> getUser() {
        return ResponseEntity.ok(testUser);
    }

    // Performs update for the daily sugar intake
    @PutMapping("/update/name/{newName}")
    public ResponseEntity<String> updateName(@PathVariable String newName) {
        testUser.setUserName(newName);
        return ResponseEntity.ok("User name has been updated");
    }

    @PutMapping("/update/weight/{newWgt}")
    public ResponseEntity<String> updateWeight(@PathVariable int newWgt) {
        testUser.setUserWeight(newWgt);
        return ResponseEntity.ok("User weight has been updated!");
    }

    @PutMapping("/update/gender/{newGen}")
    public ResponseEntity<String> updateGender(@PathVariable String newGen) {
        testUser.setUserGender(newGen);
        return ResponseEntity.ok("User gender has been updated!");
    }

    @PutMapping("/update/age/{newAge}")
    public ResponseEntity<String> updateAge(@PathVariable int newAge) {
        testUser.setUserAge(newAge);
        return ResponseEntity.ok("User age has been updated!");
    }

}
