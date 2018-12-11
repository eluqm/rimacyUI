package com.aiepad.models;

import com.google.gson.annotations.SerializedName;

public class ExampleMap {

    @SerializedName("0")
    Integer id;
    @SerializedName("1")
    String a;
    @SerializedName("2")
    String b;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getA() {
        return a;
    }

    public void setA(String a) {
        this.a = a;
    }

    public String getB() {
        return b;
    }

    public void setB(String b) {
        this.b = b;
    }
}
