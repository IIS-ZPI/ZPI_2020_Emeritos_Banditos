package com.example.demo;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.HashMap;

@Entity
@Table(name ="states")
public class State {

    @Id
    private String name;
    private double groceries;
    private double preparedfood;
    private double prescriptiondrug;
    private double nonprescriptiondrug;
    private double clothing;
    private double intangibles;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getGroceries() {
        return groceries;
    }

    public void setGroceries(double groceries) {
        this.groceries = groceries;
    }

    public double getPreparedfood() {
        return preparedfood;
    }

    public void setPreparedfood(double preparedFood) {
        this.preparedfood = preparedFood;
    }

    public double getPrescriptiondrug() {
        return prescriptiondrug;
    }

    public void setPrescriptiondrug(double prescriptionDrug) {
        this.prescriptiondrug = prescriptionDrug;
    }

    public double getNonprescriptiondrug() {
        return nonprescriptiondrug;
    }

    public void setNonprescriptiondrug(double nonPrescriptionDrug) {
        this.nonprescriptiondrug = nonPrescriptionDrug;
    }

    public double getClothing() {
        return clothing;
    }

    public void setClothing(double clothing) {
        this.clothing = clothing;
    }

    public double getIntangibles() {
        return intangibles;
    }

    public void setIntangibles(double intangibles) {
        this.intangibles = intangibles;
    }

    @Override
    public String toString() {
        return "State{" +
               "name='" + name + '\'' +
               ", groceries=" + groceries +
               ", preparedFood=" + preparedfood +
               ", prescriptionDrug=" + prescriptiondrug +
               ", nonPrescriptionDrug=" + nonprescriptiondrug +
               ", clothing=" + clothing +
               ", intangibles=" + intangibles +
               '}';
    }

    public HashMap<String,Double> getMap(){
        HashMap<String,Double> result=new HashMap<>();
        result.put("groceries",groceries);
        result.put("preparedFood", preparedfood);
        result.put("prescriptionDrug", preparedfood);
        result.put("nonPrescriptionDrug", nonprescriptiondrug);
        result.put("clothing",clothing);
        result.put("intangibles",intangibles);
        return result;
    }

    public State() {
    }
}
