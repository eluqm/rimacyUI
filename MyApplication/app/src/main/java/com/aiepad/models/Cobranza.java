package com.aiepad.models;

import com.google.gson.annotations.SerializedName;

import java.util.ArrayList;
import java.util.List;

public class Cobranza{

@SerializedName("data")
ArrayList<CobranzaObject> data = new ArrayList<>();

String success;

String message;

    public ArrayList<CobranzaObject> getData() {
        return data;
    }

    public void setData(ArrayList<CobranzaObject> data) {
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