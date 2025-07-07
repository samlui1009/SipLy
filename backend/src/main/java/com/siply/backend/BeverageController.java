package com.siply.backend;

import com.siply.backend.model.Beverage;
import com.siply.backend.model.BeverageLog;

import java.util.ArrayList;
import java.util.List;

import org.apache.catalina.connector.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/beverage")
public class BeverageController {

    private BeverageLog testLog = new BeverageLog();
    // We do NOT need a single Beverage field to be tested, but we DO need a test log to simulate its return

    @GetMapping("/get/{name}")
    public ResponseEntity<String> getBeverage(@PathVariable String name) {
        Beverage beverage = testLog.getBeverageByName(name);
        if (beverage != null) {
            return ResponseEntity.ok(beverage.getName() + " has been found in the log!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(name + " has not been found!");
        }
    }

    // Updates the entire Beverage object
    @PutMapping
    public ResponseEntity<String> updateBeverage(@RequestBody Beverage updatedBev) {
        Beverage beverage = testLog.getBeverageByName(updatedBev.getName());
        if (beverage != null) {
            beverage.setName(updatedBev.getName());
            beverage.setCalories(updatedBev.getCalories());
            beverage.setVolume(updatedBev.getVolume());
            beverage.setSugar(updatedBev.getSugar());
            beverage.setCaffeine(updatedBev.getCaffeineAmount());
            return ResponseEntity.ok("Beverage has been successfully updated!");    
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Beverage has not been found!");
        }
    }

    @PutMapping("/update/{oldName}/{newName}")
    // Must include both path variables into the mapping 
    public ResponseEntity<String> updateBevName(@PathVariable String oldName, @PathVariable String newName) {
        Beverage testBev = testLog.getBeverageByName(oldName);
        if (testBev != null) {
            testBev.setName(newName);
            return ResponseEntity.ok("Beverage name has been successfully updated!");    
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Beverage not found");
        }
    }

    @PutMapping("/update-calories/{name}/{amount}")
    public ResponseEntity<String> updateBevCalories(@PathVariable String name, @PathVariable int newCalories) {
        Beverage testBev = testLog.getBeverageByName(name);
        if (testBev != null) {
            testBev.setCalories(newCalories);
            return ResponseEntity.ok("Beverage calories has been successfully updated!");    
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Beverage not found");
        }
    }

    @PutMapping("/update-volume/{name}/{amount}")
    public ResponseEntity<String> updateBevVolume(@PathVariable String name, @PathVariable int newVol) {
        Beverage testBev = testLog.getBeverageByName(name);
        if (testBev != null) {
            testBev.setVolume(newVol);
            return ResponseEntity.ok("Beverage volume has been successfully updated!");    
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Beverage not found");
        }
    }

    @PutMapping("/update-sugar/{name}/{amount}")
    public ResponseEntity<String> updateBevSugar(@PathVariable String name, @PathVariable int newSug) {
        Beverage testBev = testLog.getBeverageByName(name);
        if (testBev != null) {
            testBev.setSugar(newSug);
            return ResponseEntity.ok("Beverage sugar amount has been successfully updated!");    
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Beverage not found");
        }
    }

    @PutMapping("/update-caffeine/{name}/{amount}")
    public ResponseEntity<String> updateBevCaffeine(@PathVariable String name, @PathVariable int newCaffe) {
        Beverage testBev = testLog.getBeverageByName(name);
        if (testBev != null) {
            testBev.setCaffeine(newCaffe);
            return ResponseEntity.ok("Beverage caffeine amount has been successfully updated!");    
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Beverage not found");
        }
    }
}
