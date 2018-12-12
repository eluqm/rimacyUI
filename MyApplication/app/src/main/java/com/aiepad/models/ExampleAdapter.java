package com.aiepad.models;

import android.content.Context;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import com.aiepad.myapplication.R;
import com.google.android.gms.maps.MapView;

import java.util.ArrayList;

public class ExampleAdapter extends ArrayAdapter<Example> implements View.OnClickListener{
    private ArrayList<Example> dataSet;
    Context mContext;
    MapView map;
    private int lastPosition = -1;
    // View lookup cache
    private static class ViewHolder {
        TextView txtName;
        TextView txtType;
        TextView txtVersion;
        ImageView info;
    }
    public ExampleAdapter(ArrayList<Example> data, Context context, MapView map) {
        super(context, R.layout.row_item, data);

        this.dataSet = data;
        this.mContext=context;
        this.map=map;

    }
    @Override
    public void onClick(View v) {

    }
}
