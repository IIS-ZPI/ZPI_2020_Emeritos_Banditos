package com.emeritosbanditos;

public class ArithmeticsDivision implements IArthmeticsDiv {
    @Override
    public double Division(double a, double b) {
        if (b == 0) {
            throw new ArithmeticException("Zero division error");
        }
        return a / b;
    }
    // Lisek8 random comment 3
}
