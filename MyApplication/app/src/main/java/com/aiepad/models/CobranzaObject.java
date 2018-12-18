package com.aiepad.models;

import com.google.gson.annotations.SerializedName;

import java.util.Date;

public class CobranzaObject {


    @SerializedName("Nombre")
    String _name;
    @SerializedName("frecuencia")
    String _freq;
    @SerializedName("Email")
    String _email;
    @SerializedName("fecha_init")
    Date _fechIni;
    @SerializedName("idtbl_cobranza")
    String _idCobranza;

    @SerializedName("RUTASZONA")
    String _rutas;

    public String get_name() {
        return _name;
    }

    public void set_name(String _name) {
        this._name = _name;
    }

    public String get_freq() {
        return _freq;
    }

    public void set_freq(String _freq) {
        this._freq = _freq;
    }

    public String get_email() {
        return _email;
    }

    public void set_email(String _email) {
        this._email = _email;
    }

    public Date get_fechIni() {
        return _fechIni;
    }

    public void set_fechIni(Date _fechIni) {
        this._fechIni = _fechIni;
    }

    public String get_idCobranza() {
        return _idCobranza;
    }

    public void set_idCobranza(String _idCobranza) {
        this._idCobranza = _idCobranza;
    }

    public String get_rutas() {
        return _rutas;
    }

    public void set_rutas(String _rutas) {
        this._rutas = _rutas;
    }

    @Override
    public String toString() {
        return "RUTASZONA: " + _rutas + " Name: " + _name +" ";
    }


}
