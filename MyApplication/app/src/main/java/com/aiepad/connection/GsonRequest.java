package com.aiepad.connection;

import android.os.AsyncTask;

import com.android.volley.toolbox.RequestFuture;
import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;

import com.android.volley.AuthFailureError;
import com.android.volley.NetworkResponse;
import com.android.volley.ParseError;
import com.android.volley.Request;

import com.android.volley.Response;
import com.android.volley.Response.ErrorListener;
import com.android.volley.Response.Listener;
import com.android.volley.toolbox.HttpHeaderParser;
import com.google.gson.reflect.TypeToken;

import org.json.JSONObject;

import java.io.UnsupportedEncodingException;
import java.lang.reflect.Type;
import java.util.List;
import java.util.Map;

public class GsonRequest<T> extends Request<T>{

    private final Gson gson = new Gson();
    private final Class<T> clazz;
    private final Map<String, String> headers;
    private final Response.Listener<T> listener;
    //private final RequestFuture<JSONObject> future = RequestFuture.newFuture();
    /**
     * Make a GET request and return a parsed object from JSON.
     *  @param url URL of the request to make
     * @param clazz Relevant class object, for Gson's reflection
     * @param headers Map of request headers
     */
    public GsonRequest(String url, Class<T> clazz, Map<String, String> headers,
                       Listener<T> listener, ErrorListener errorListener) {
        //RequestFuture<JSONObject> future = RequestFuture.newFuture();
        super(Method.GET, url, errorListener);
        this.clazz = clazz;
        this.headers = headers;
        this.listener = listener;
    }

    @Override
    public Map<String, String> getHeaders() throws AuthFailureError {
        return headers != null ? headers : super.getHeaders();
    }

    @Override
    protected void deliverResponse(T response) {
        System.out.print("clase= "+response.getClass());
        listener.onResponse(response);
    }

    @Override
    public Priority getPriority() {
        return Priority.IMMEDIATE;
    }

    @Override
    protected Response<T> parseNetworkResponse(NetworkResponse response) {
        try {

            String json = new String(
                    response.data, HttpHeaderParser.parseCharset(response.headers));
            System.out.print("tamaño= "+ json.length());
            System.out.print("si hay respuesta valida= "+ json);
            T result;


                result = gson.fromJson(json, clazz);


            return Response.success(result, HttpHeaderParser.parseCacheHeaders(response));
        } catch (UnsupportedEncodingException e) {

            return Response.error(new ParseError(e));
        } catch (JsonSyntaxException e) {
            System.out.println("jsonPROBLEM");
            return Response.error(new ParseError(e));
        }
    }
}