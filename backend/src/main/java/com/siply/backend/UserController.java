package com.siply.backend;

import com.siply.backend.repository.UserRepository;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.siply.backend.model.User;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserRepository userRepository;

    @Autowired
    private UserService service;
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public UserController(UserRepository userRepository, UserService userService, BCryptPasswordEncoder pWordEncoder) {
        this.userRepository = userRepository;
        this.service = userService;
        this.passwordEncoder = pWordEncoder;
    }

    // Login functionalities are ALWAYS going to be a PutMapping, NOT GetMapping - why?
    // Because we need to submit credentials to the server
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User loginRequest) {
            Optional<User> userOptional = Optional.ofNullable(userRepository.findByEmailAddress(loginRequest.getUserEmail()));
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                if (passwordEncoder.matches(loginRequest.getUserPassWord(), user.getUserPassWord())) {
                    return ResponseEntity.ok("Login successful!");
                } else {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid password. Please try again.");
                }
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }
    }

    // Temporary API endpoint to update the password for testing purposes
    @PutMapping("/update-password/{id}")
    public ResponseEntity<String> updatePassword(@PathVariable long id, @RequestBody String newPassword) {
        return userRepository.findById(id).map(user -> {
            System.out.println("🚨 Received new password: " + newPassword);
            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);
            return ResponseEntity.ok("Password has been updated!");
        }).orElse(ResponseEntity.notFound().build());
    }

    // Returns back a User JSON object
    @GetMapping("/get-user/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userRepository.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // Followed tutorial for this one
    @PostMapping("/register-user")
    public User registerUser(@RequestBody User user) {
        return service.register(user);
        // User savedUser = userRepository.save(user);
        // return ResponseEntity.ok(savedUser);
    }

    // This method differs from the one below
    // This is used to set up the user profile information immediately AFTER registering 
    // with e-mail and password
    @PutMapping("/setup-user/{id}")
    public ResponseEntity<String> setupUser(@PathVariable Long id, @RequestBody User updatedUser) {
        return userRepository.findById(id).map(user -> {
            user.setUserName(updatedUser.getName());
            user.setUserGender(updatedUser.getGender());
            user.setUserAge(updatedUser.getAge());
            user.setUserWeight(updatedUser.getWeight());
            userRepository.save(user);
            return ResponseEntity.ok("New user, " + user.getName() + ", has been created!");
        }).orElse(ResponseEntity.notFound().build());
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
