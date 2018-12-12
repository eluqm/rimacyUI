package com.aiepad.models;


import com.google.android.gms.maps.model.LatLng;
import com.google.gson.annotations.SerializedName;

import java.util.Date;
import java.util.List;

public class CobranzaModel {

    String name; //empleado
    String id_name;
    String name_zona; // nombre zona
    String id_zona;
    Integer dias;
    Date fecha_init;
    List<LatLng> coordinates ;
    String type;
    String version_number;
    String feature;

    public CobranzaModel(String name, String type, String version_number, String feature ) {
        this.name=name;
        this.type=type;
        this.version_number=version_number;
        this.feature=feature;

    }

    public String getName() {
        return name;
    }

    public String getType() {
        return type;
    }

    public String getVersion_number() {
        return version_number;
    }

    public String getFeature() {
        return feature;
    }

}
