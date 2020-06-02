package org.emeritosbanditos.backend;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@Entity
@Table(name ="products")
public class Product implements Serializable, Comparable<Product> {
    @Id
    @GeneratedValue
    private int id;
    private String name;
    private String category;
    private String state;
    private double netto;
    private double clientprice;
    private double sellprice;
    private double margin;

    public Product(int id,String name, String category, String state, double netto, double clientprice) {
        this.id=id;
        this.name = name;
        this.category = category;
        this.state = state;
        this.netto = netto;
        this.clientprice = clientprice;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", category='" + category + '\'' +
                ", state='" + state + '\'' +
                ", netto=" + netto +
                ", clientprice=" + clientprice +
                ", sellprice=" + sellprice +
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

    @Override
    public int compareTo(Product o) {
        return this.getId()-((Product)o).getId();
    }
}
