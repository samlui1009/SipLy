package com.siply.backend.model;

public class HealthGoals {
    private int maxCalories;
    private int maxSugar;
    private int maxCaffeine;


    public HealthGoals() {
        // Generic constructor
    }

    // EFFECTS: Constructs 3 personalized intake limits for the user regarding their
    // beverage-drinking goals (Maximum calories from beverages alone; maximum sugar intake; maximum
    // caffeine and intake)
    public HealthGoals(int maxCal, int maxSug, int maxCaffeine) {
        this.maxCalories = maxCal;
        this.maxSugar = maxSug;
        this.maxCaffeine = maxCaffeine;
    }

    // getter
    public int getMaxCalories() {
        return maxCalories;
    }

    // getter
    public int getMaxSugar() {
        return maxSugar;
    }

    // getter
    public int getMaxCaffeine() {
        return maxCaffeine;
    }

    // setter
    public void setMaxCalories(int newCal) {
        this.maxCalories = newCal;
    }

    // setter
    public void setMaxSugar(int newSug) {
        this.maxSugar = newSug;
    }

    // setter
    public void setMaxCaffeine(int newCaffe) {
        this.maxCaffeine = newCaffe;
    }

}
