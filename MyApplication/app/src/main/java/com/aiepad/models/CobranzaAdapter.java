package com.aiepad.models;


import android.content.Context;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;


import com.aiepad.myapplication.R;

import java.util.ArrayList;
public class CobranzaAdapter extends ArrayAdapter<CobranzaModel> implements View.OnClickListener{

    private ArrayList<CobranzaModel> dataSet;
    Context mContext;

    // View lookup cache
    private static class ViewHolder {
        TextView txtName;
        TextView txtType;
        TextView txtVersion;
        ImageView info;
    }

    public CobranzaAdapter(ArrayList<CobranzaModel> data, Context context) {
        super(context, R.layout.row_item,R.id.name, data);
        System.out.print("el problema es aca");
        this.dataSet = data;
        this.mContext=context;

    }

    @Override
    public void onClick(View v) {

        int position=(Integer) v.getTag();
        Object object= getItem(position);
        CobranzaModel dataModel=(CobranzaModel) object;


    }

    private int lastPosition = -1;


}
