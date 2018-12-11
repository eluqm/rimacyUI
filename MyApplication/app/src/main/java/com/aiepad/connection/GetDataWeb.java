package com.aiepad.connection;


import android.app.DownloadManager;
import android.content.Context;
import android.widget.TextView;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

public class GetDataWeb {

    //final TextView mTextView = (TextView) findViewById(R.id.text);
// ...

    // Instantiate the RequestQueue.

    public RequestQueue getGETMETHOD(Context context, final TextView mTextView)
    {
        RequestQueue queue = Volley.newRequestQueue(context);
        String url ="http://174.138.48.60:8080/rimacy/v1/allzones/";

        // Request a string response from the provided URL.
        StringRequest stringRequest = new StringRequest(Request.Method.GET, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        // Display the first 500 characters of the response string.
                        mTextView.setText("Response is: "+ response.substring(0,500));
                        System.out.print("Response is: "+ response.substring(0,500));
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                mTextView.setText("That didn't work!");
            }
        });

// Add the request to the RequestQueue.

        queue.add(stringRequest);
      return queue;
    }



}
