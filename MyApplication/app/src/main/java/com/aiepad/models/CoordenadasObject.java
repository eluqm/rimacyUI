package com.aiepad.models;

import com.google.gson.annotations.SerializedName;

public class CoordenadasObject {
  /*         0	14455
                   1	216
                   2	-16.40485921324843
                   3	-71.5322514980526
                   4	null
                   5	"116"
                   6	null
                   7	21
                   8	"116"
*/
    @SerializedName("id")
    Integer id;
    @SerializedName("idruta")
    String ruta_id;
    @SerializedName("latitud")
    String latitud;
    @SerializedName("longitud")
    String longitud;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getRuta_id() {
        return ruta_id;
    }

    public void setRuta_id(String ruta_id) {
        this.ruta_id = ruta_id;
    }

    public String getLatitud() {
        return latitud;
    }

    public void setLatitud(String latitud) {
        this.latitud = latitud;
    }

    public String getLongitud() {
        return longitud;
    }

    public void setLongitud(String longitud) {
        this.longitud = longitud;
    }
}
