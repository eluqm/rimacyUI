package com.aiepad.utils;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONObject;

public class getMarkers{




        public String getNameDays(Integer val)
        {   String name="";
            //String names;
            if (val%3==0){
                name=name+"-Lun-";
            }if(val%5==0){
                name=name+"-Mar-";
            }if(val%7==0){
                name=name+"-Mier-";
            }if(val%11==0){
                    name=name+"-Jue-";
            }if(val%13==0){
                    name=name+"-Vier-";
            }if(val%17==0){
                name=name+"-Sab-";
            }

            return name;
            }



        }
