package com.aiepad.models;

import com.google.gson.annotations.SerializedName;

import java.util.List;

public class Example {

    @SerializedName("data")
    List<List<Coordenadas>> data=null;

    String success;
    String message;

    public List<List<Coordenadas>> getData() {
        return data;
    }

    public void setData(List<List<Coordenadas>> data) {
        this.data = data;
    }

    public String getSuccess() {
        return success;
    }

    public void setSuccess(String success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
