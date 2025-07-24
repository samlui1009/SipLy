package com.siply.backend.model;

import jakarta.persistence.*;

import com.siply.backend.model.exceptions.InvalidInputException;
import com.siply.backend.model.exceptions.NegativeValueException;

@Entity
@Table(name = "app_user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String emailAddress;
    private String passWord;
    // Added 2 new fields for potential scaling of multiple users

    private int age;
    private int weight;
    private String gender;

    @OneToOne(cascade = CascadeType.ALL)
    private HealthGoals healthGoals;
    @OneToOne(cascade = CascadeType.ALL)
    private BeverageLog bevLog;

    public User() {
        // Generic constructor
    }

    public User(String name, int age, int weight, String gender, String email, String pWord) {
        this.name = name;
        this.age = age;
        this.weight = weight;
        this.gender = gender;
        this.emailAddress = email;
        this.passWord = pWord;
        this.healthGoals = new HealthGoals(0, 0, 0);
        this.bevLog = new BeverageLog();
    }
    
    // getter
    public String getName() {
        return name;
    }

    // getter
    public int getAge() {
        return age;
    }

    // getter
    public int getWeight() {
        return weight;
    }

    // getter
    public String getGender() {
        return gender;
    }

    // getter
    public HealthGoals getHealthGoals() {
        return healthGoals;
    }
    
    // getter
    public BeverageLog getBeverageLog() {
        return bevLog;
    }

    // getter
    public String getUserEmail() {
        return emailAddress;
    }

    // getter
    public String getUserPassWord() {
        return passWord;
    }

    // setter
    // MODIFIES: this
    // EFFECTS: Updates the user's name to a different name if it changes
    public void setUserName(String name) {
        if (name.length() < 0) {
            throw new InvalidInputException();
        }
        this.name = name;
    }

    // setter
    // MODIFIES: this
    // EFFECTS: Updates the user's weight to a different weight if it changes
    public void setUserWeight(int wgt) {
        if (wgt < 0) {
            throw new NegativeValueException("This");
        }
        this.weight = wgt;
    }

    // setter
    // MODIFIES: this
    // EFFECTS: Updates the user's gender to a different gender if it fluidly
    // changes
    public void setUserGender(String gen) {
        this.gender = gen;
    }

    // setter
    // MODIFIES: this
    // EFFECTS: Updates the user's age to a different age if it changes
    public void setUserAge(int age) {
        if (age < 0) {
            throw new NegativeValueException("This");
        }
        this.age = age;
    }

    // setter
    // MODIFIES: this
    // EFFECTS: Updates the users' password if it changes 
    public void setPassword(String pWord) {
        if (pWord.length() < 0) {
            throw new InvalidInputException();
        }
        this.passWord = pWord;
    }

    // setter
    // MODIFIES: this
    // EFFECTS: Updates the entire HealthGoals JSON object if it changes 
    public void setNewHealthGoals(HealthGoals newGoals) {
        this.healthGoals = newGoals;
    }
}