package com.siply.backend.model;

import java.util.ArrayList;
import java.util.Iterator;

public class BeverageLog {

    private ArrayList<Beverage> dailyBeverages;

    private boolean status;
    private int totalSugar;
    private int totalCalories;
    private int totalCaffeine;

    public BeverageLog() {
        this.dailyBeverages = new ArrayList<>();
        this.status = false;
        this.totalCaffeine = 0;
        this.totalCalories = 0;
        this.totalSugar = 0;
    }
    // Deserialization only cares about if constructors have parameters

    // REQUIRES: The beverage must not be found in the daily log already
    // MODIFIES: this
    // EFFECTS: Adds a beverage to the list of beverages consumed by the user,
    // adjusting the total volume that they drank
    // for the specified beverage. The list of beverages should not contain any
    // duplicates (Duplicate drinks should be handled by verifying the names equal,
    // and update accordingly with another method)
    public void addBeverage(Beverage b) {
        if (!this.dailyBeverages.contains(b)) {
            this.dailyBeverages.add(b);
            this.totalCalories += b.getCalories();
            this.totalSugar += b.getSugar();
            this.totalCaffeine += b.getCaffeineAmount();
        }
    }

    // REQUIRES: A beverage must be found in the user's list
    // MODIFIES: this
    // EFFECTS: Removes a beverage from the list of beverages consumed by the user
    // if there is a corresponding match with the
    // name
    public boolean removeBeverageByName(String name) {
        Iterator<Beverage> iterator = this.dailyBeverages.iterator();
        while (iterator.hasNext()) {
            Beverage currentBeverage = iterator.next();
            if (currentBeverage.getName().equals(name)) {
                iterator.remove();
                this.totalCalories -= currentBeverage.getCalories();
                this.totalSugar -= currentBeverage.getSugar();
                this.totalCaffeine -= currentBeverage.getCaffeineAmount();
                return true;
            }
        }
        return false;
    }

    // REQUIRES: Beverage must be found in the user's list 
    // EFFECTS: Returns back the beverage from list of beverages if there is a corresponding match
    // to the name, otherwise, return null
    public Beverage getBeverageByName(String name) {
        for (Beverage b : this.dailyBeverages) {
            if (b.getName() == name) {
                return b;
            }
        }
        return null;
    }

    // REQUIRES: A beverage must be found in the user's list
    // MODIFIES: this
    // EFFECTS: If a user drinks the beverage again, it updates the total
    // volume/calories/sugar/caffeine of the individual beverage.
    public void refillBeverage(String nm, int vol, int calories, int sugar, int caffeine) {
        for (Beverage beverage : this.dailyBeverages) {
            if (beverage.getName().equals(nm)) {
                beverage.setVolume(beverage.getVolume() + vol);
                beverage.setCalories(beverage.getCalories() + calories);
                beverage.setSugar(beverage.getSugar() + sugar);
                beverage.setCaffeine(beverage.getCaffeineAmount() + caffeine);
            }
        }
    }

    // REQUIRES: The daily status for the log is complete
    // MODIFIES: this
    // EFFECTS: Resets the daily log for each calendar date (Totals for caffeine,
    // calories, sugar, total number of beverages
    // get reset to 0; a new log for daily beverages is initialized for the next
    // day)
    public void resetLogForNextDay() {
        if (this.getDailyStatus() == true) {
            this.dailyBeverages = new ArrayList<>();
            this.status = false;
            this.totalCaffeine = 0;
            this.totalCalories = 0;
            this.totalSugar = 0;
        }
    }

    // getter
    public int getDailyTotalCalories() {
        return this.totalCalories;
    }

    // getter
    public int getDailyTotalSugarContent() {
        return this.totalSugar;
    }

    // getter
    public int getDailyTotalCaffeineAmount() {
        return this.totalCaffeine;
    }

    // MODIFIES: this
    // EFFECTS: Sets the status of the daily log to true if the user has finished
    // inputting beverages
    // for the day
    public void finishedDailyLog() {
        this.status = true;
    }

    // MODIFIES: this
    // EFFECTS: Sets the status of the daily log to false if the user has not
    // finished inputting beverages
    // for the day
    public void notFinishedDailyLog() {
        this.status = false;
    }

    // getter
    public boolean getDailyStatus() {
        return this.status;
    }
}
