package org.emeritosbanditos.backend;

import java.io.Serializable;


public class Product implements Serializable {
    private String name;
    private String category;
    private String state;
    private double netto;
    private double clientprice;
    private double sellprice;
    private double margin;

    public Product(String name, String category, String state, double netto, double clientprice) {
        this.name = name;
        this.category = category;
        this.state = state;
        this.netto = netto;
        this.clientprice = clientprice;
    }

    @Override
    public String toString() {
        return "Product{" +
               ", name='" + name + '\'' +
               ", category='" + category + '\'' +
               ", state='" + state + '\'' +
               ", netto=" + netto +
               ", clientPrice=" + clientprice +
               ", sellPrice=" + sellprice +
               ", margin=" + margin +
               '}';
    }

    public Product() {
    }

    public Product(int id, String name) {
        this.name=name;
    }



    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getNetto() {
        return netto;
    }

    public void setNetto(double netto) {
        this.netto = netto;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public double getClientprice() {
        return clientprice;
    }

    public void setClientprice(double clientPrice) {
        this.clientprice = clientPrice;
    }

    public double getSellprice() {
        return sellprice;
    }

    public void setSellprice(double sellPrice) {
        this.sellprice = sellPrice;
    }

    public double getMargin() {
        return margin;
    }

    public void setMargin(double margin) {
        this.margin = margin;
    }
}
