package com.siply.backend;

import com.siply.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import com.siply.backend.model.User;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
