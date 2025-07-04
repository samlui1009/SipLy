package com.siply.backend.model;

import com.siply.backend.model.exceptions.NegativeValueException;

public class Beverage {

    // Recall: Fields/attributes to be used
    private String name;
    private int volume;
    private int calories;
    private int sugar;
    private int caffeine;

    // No-parameter constructor, which is required by Spring for deserialization
    // 
    public Beverage() {
    }

    // EFFECTS: Constructs an individual beverage, including relevant information
    // including:
    // Drink name, volume consumed (in millimetres),
    // sugar amount (grams), caloric intake, caffeine amount (milligrams).
    public Beverage(String name, int volume, int calories, int sugar, int caffeine) {
        this.name = name;
        this.volume = volume;
        this.calories = calories;
        this.sugar = sugar;
        this.caffeine = caffeine;
    }

    // getter
    public String getName() {
        return name;
    }

    // getter
    public int getVolume() {
        return volume;
    }

    // getter
    public int getCalories() {
        return calories;
    }

    // getter
    public int getSugar() {
        return sugar;
    }

    // getter
    public int getCaffeineAmount() {
        return caffeine;
    }

    // setter
    // MODIFIES: this
    // EFFECTS: Sets the name of a beverage
    public void setName(String name) {
        this.name = name;
    }

    // setter
    // MODIFIES: this
    // EFFECTS: Sets the volume/amount of the beverage consumed
    public void setVolume(int vol) {
        if (vol < 0) {
            throw new NegativeValueException("Volume");
        }
        this.volume = vol;
    }

    // setter
    // MODIFIES: this
    // EFFECTS: Sets the calories for a beverage consumed
    public void setCalories(int cals) {
        if (cals < 0) {
            throw new NegativeValueException("Calories");
        }
        this.calories = cals;
    }

    // setter
    // MODIFIES: this
    // EFFECTS: Sets the sugar amount for a beverage consumed
    public void setSugar(int sug) {
        if (sug < 0) {
            throw new NegativeValueException("Sugar");
        }
        this.sugar = sug;
    }

    // setter
    // MODIFIES: this
    // EFFECTS: Sets the caffeine for a beverage consumed
    public void setCaffeine(int caffeine) {
        if (caffeine < 0) {
            throw new NegativeValueException("Caffeine");
        }
        this.caffeine = caffeine;
    }
}
