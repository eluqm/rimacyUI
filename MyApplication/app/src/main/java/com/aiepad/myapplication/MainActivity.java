package com.aiepad.myapplication;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import com.aiepad.connection.GetDataWeb;
import com.aiepad.connection.GsonRequest;
import com.aiepad.models.Cobranza;
import com.aiepad.models.CobranzaObject;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.Volley;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {
    public static final String EXTRA_MESSAGE = "com.aiepad.myapplication.MESSAGE";
    ArrayList<CobranzaObject> dataModels2;
    RequestQueue queue;
    GetDataWeb getwebdata= new GetDataWeb();
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }
    /** Called when the user taps the Send button */
    public void sendMessage(final View view) {
        final Intent intent = new Intent(this, DisplayMessageActivity.class);
        EditText editText = (EditText) findViewById(R.id.editText);
        final String message = editText.getText().toString();

        GsonRequest<Cobranza> jsonObjCobranza = new GsonRequest<>(getwebdata.getHostname()+"getcobranzasbyempl_1/" + message,
                Cobranza.class, null, new Response.Listener<Cobranza>() {
            @Override
            public void onResponse(Cobranza response) {

                dataModels2=response.getData();
                if(!dataModels2.isEmpty()){
                    intent.putExtra(EXTRA_MESSAGE, message);
                    startActivity(intent);
                }else{
                    callbackButton(view);
                }

            }
        },new Response.ErrorListener(){
                @Override
                public void onErrorResponse(VolleyError error) {

                    System.out.print(error);
                }
            });

        queue = Volley.newRequestQueue(this);
        queue.add(jsonObjCobranza);

        /** Called when the user taps snackbutton */
        //Button button = (Button) findViewById(R.id.callbackButton);

        /*button.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                // Button was clicked/tapped
                System.out.println("entramos snack");
                View view=findViewById(R.id.rooLayout);
                String message = "Snackbar message example displayed";
                int duration = Snackbar.LENGTH_SHORT;

                showSnackbar(view, message, duration);
            }
        });*/
    }

    public void callbackButton(View view)
    {
        Snackbar.make(findViewById(R.id.rooLayout), R.string.alert_no_foung, Snackbar.LENGTH_LONG).show();
    }

        // Do something in response to button


}
