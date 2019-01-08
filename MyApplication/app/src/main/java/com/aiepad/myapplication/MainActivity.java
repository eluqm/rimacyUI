package com.aiepad.myapplication;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

public class MainActivity extends AppCompatActivity {
    public static final String EXTRA_MESSAGE = "com.aiepad.myapplication.MESSAGE";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }
    /** Called when the user taps the Send button */
    public void sendMessage(View view) {
        Intent intent = new Intent(this, DisplayMessageActivity.class);
        EditText editText = (EditText) findViewById(R.id.editText);
        String message = editText.getText().toString();
        intent.putExtra(EXTRA_MESSAGE, message);



        startActivity(intent);

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
