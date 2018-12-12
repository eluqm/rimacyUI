package com.aiepad.models;

import com.google.gson.annotations.SerializedName;

public class Coordenadas {


    @SerializedName("0")
    Number id;
    @SerializedName("1")
    Number a;
    @SerializedName("2")
    Long b;
    @SerializedName("3")
    Long c;
    @SerializedName("4")
    String d;

    public Number getId() {
        return id;
    }

    public void setId(Number id) {
        this.id = id;
    }

    public Number getA() {
        return a;
    }

    public void setA(Number a) {
        this.a = a;
    }

    public Long getB() {
        return b;
    }

    public void setB(Long b) {
        this.b = b;
    }

    public Long getC() {
        return c;
    }

    public void setC(Long c) {
        this.c = c;
    }

    public String getD() {
        return d;
    }

    public void setD(String d) {
        this.d = d;
    }
}
