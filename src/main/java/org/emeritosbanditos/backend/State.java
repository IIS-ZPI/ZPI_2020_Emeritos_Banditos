package org.emeritosbanditos.backend;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.HashMap;

@Entity
@Table(name ="states")
public class State {

    @Id
    private String name;
    private double tax;
    private double groceries;
    private double preparedfood;
    private double prescriptiondrug;
    private double nonprescriptiondrug;
    private double clothing;
    private double intangibles;
    private double clothing_exempt;

    public double getTax() {
        return tax;
    }

    public void setTax(double tax) {
        this.tax = tax;
    }

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

    public double getClothing_exempt() {
        return clothing_exempt;
    }

    public void setClothing_exempt(double clothing_exempt) {
        this.clothing_exempt = clothing_exempt;
    }

    @Override
    public String toString() {
        return "State{" +
                "name='" + name + '\'' +
                ", tax=" + tax +
                ", groceries=" + groceries +
                ", preparedfood=" + preparedfood +
                ", prescriptiondrug=" + prescriptiondrug +
                ", nonprescriptiondrug=" + nonprescriptiondrug +
                ", clothing=" + clothing +
                ", intangibles=" + intangibles +
                ", clothing_exempt=" + clothing_exempt +
                '}';
    }

    public HashMap<String,Double> getMap(){
        HashMap<String,Double> result=new HashMap<>();
        result.put("groceries",groceries);
        result.put("preparedfood", preparedfood);
        result.put("prescriptiondrug", preparedfood);
        result.put("nonprescriptiondrug", nonprescriptiondrug);
        result.put("clothing",clothing);
        result.put("intangibles",intangibles);
        return result;
    }

    public State() {
    }
}

