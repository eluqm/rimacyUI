package com.aiepad.models;


import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;


import com.aiepad.myapplication.R;
import com.google.android.gms.maps.MapView;

import java.util.ArrayList;
public class CobranzaAdapter extends ArrayAdapter<CobranzaModel> implements View.OnClickListener{

    private ArrayList<CobranzaModel> dataSet;
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

    public CobranzaAdapter(ArrayList<CobranzaModel> data, Context context, MapView map) {
        super(context, R.layout.row_item, data);
        System.out.print("el problema es aca");
        this.dataSet = data;
        this.mContext=context;
        this.map=map;

    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        // Get the data item for this position
        CobranzaModel dataModel = getItem(position);

        // Check if an existing view is being reused, otherwise inflate the view
        ViewHolder viewHolder; // view lookup cache stored in tag
        //
        //
        final View result;

        if (convertView == null) {

            viewHolder = new ViewHolder();
            LayoutInflater inflater = LayoutInflater.from(getContext());
            convertView = inflater.inflate(R.layout.row_item, parent, false);
            viewHolder.txtName = (TextView) convertView.findViewById(R.id.name);
            viewHolder.txtType = (TextView) convertView.findViewById(R.id.name);
            viewHolder.txtVersion = (TextView) convertView.findViewById(R.id.fecha);
            viewHolder.info = (ImageView) convertView.findViewById(R.id.item_info);

            result=convertView;

            convertView.setTag(viewHolder);
        } else {
            viewHolder = (ViewHolder) convertView.getTag();
            result=convertView;
        }

        viewHolder.txtName.setText(dataModel.getName());
        viewHolder.txtType.setText(dataModel.getType());
        viewHolder.txtVersion.setText(dataModel.getVersion_number());
        viewHolder.info.setOnClickListener(this);
        viewHolder.info.setTag(position);
        return convertView;
        }

        @Override
        public void onClick(View v) {

            int position=(Integer) v.getTag();
            Object object= getItem(position);
            CobranzaModel dataModel=(CobranzaModel)object;
            System.out.print("entre "+ dataModel.getName());
            map.onResume();


        }






}
