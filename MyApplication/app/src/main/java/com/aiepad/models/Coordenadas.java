package com.aiepad.models;

import com.google.gson.annotations.SerializedName;

public class Coordenadas {


    @SerializedName("0")
    String id;
    @SerializedName("1")
    Long a;
    @SerializedName("2")
    Long b;
    @SerializedName("3")
    Long c;
    @SerializedName("4")
    Long d;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Long getA() {
        return a;
    }

    public void setA(Long a) {
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

    public Long getD() {
        return d;
    }

    public void setD(Long d) {
        this.d = d;
    }
}
