package com.siply.backend;

import com.siply.backend.repository.UserRepository;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.siply.backend.model.User;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserRepository userRepository;

    @Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Returns back a User JSON object
    @GetMapping("/get-user/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userRepository.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/add-user")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User savedUser = userRepository.save(user);
        return ResponseEntity.ok(savedUser);
    }

    @PutMapping("/update-user/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        Optional<User> userToFind = userRepository.findById(id);
        // Optional is necessary - It is a "safer" way to handle nulls, just in case
        // We are unable to find the user that we want
        if (userToFind.isPresent()) {
            User foundUser = userToFind.get();
            // Gets back the user 
            foundUser.setUserName(updatedUser.getName());
            foundUser.setUserAge(updatedUser.getAge());
            foundUser.setUserWeight(updatedUser.getWeight());
            foundUser.setUserGender(updatedUser.getGender());
            // Performs all of the updates with the setters
            return userRepository.save(foundUser);
            // Returns back the user that has now the updated information
        } else {
            throw new RuntimeException("User not found with the designated ID");
        }
    }

    // Performs update for the daily sugar intake
    @PutMapping("/update-name/{id}/{newName}")
    public ResponseEntity<String> updateName(@PathVariable Long id, @PathVariable String newName) {
        return userRepository.findById(id).map(user -> {
            user.setUserName(newName);
            userRepository.save(user);
            return ResponseEntity.ok("Name updated");
        }).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/update-weight/{id}/{newWgt}")
    public ResponseEntity<String> updateWeight(@PathVariable Long id, @PathVariable int newWgt) {
        return userRepository.findById(id).map(user -> {
            user.setUserWeight(newWgt);
            userRepository.save(user);
            return ResponseEntity.ok("Weight updated");
        }).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/update-gender/{id}/{newGen}")
    public ResponseEntity<String> updateGender(@PathVariable Long id, @PathVariable String newGen) {
        return userRepository.findById(id).map(user -> {
            user.setUserGender(newGen);
            userRepository.save(user);
            return ResponseEntity.ok("Gender updated");
        }).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/update-age/{id}/{newAge}")
    public ResponseEntity<String> updateAge(@PathVariable Long id, @PathVariable int newAge) {
        return userRepository.findById(id).map(user -> {
            user.setUserAge(newAge);;
            userRepository.save(user);
            return ResponseEntity.ok("Age updated");
        }).orElse(ResponseEntity.notFound().build());
    }
}
