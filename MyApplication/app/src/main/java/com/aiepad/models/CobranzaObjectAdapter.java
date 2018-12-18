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

import java.text.SimpleDateFormat;
import java.util.ArrayList;

public class CobranzaObjectAdapter extends ArrayAdapter<CobranzaObject>  implements View.OnClickListener {

    private ArrayList<CobranzaObject> dataSet;
    Context mContext;
    MapView map;
    private int lastPosition = -1;
    // View lookup cache
    private static class ViewHolder {
        TextView txtName;
        TextView txtType;
        TextView txtVersion;
        TextView _fechinit;
        TextView _days;
        //ImageView info;
    }

    public CobranzaObjectAdapter(ArrayList<CobranzaObject> data, Context context, MapView map) {
        super(context, R.layout.row_item, data);
        //System.out.print("");
        this.dataSet = data;
        this.mContext=context;
        this.map=map;

    }
    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        // Get the data item for this position
        CobranzaObject dataModel = getItem(position);

        // Check if an existing view is being reused, otherwise inflate the view
        CobranzaObjectAdapter.ViewHolder viewHolder; // view lookup cache stored in tag
        //
        //
        final View result;

        if (convertView == null) {

            viewHolder = new CobranzaObjectAdapter.ViewHolder();
            LayoutInflater inflater = LayoutInflater.from(getContext());
            convertView = inflater.inflate(R.layout.row_item, parent, false);
            viewHolder.txtName = (TextView) convertView.findViewById(R.id.name);
            viewHolder.txtType = (TextView) convertView.findViewById(R.id.type);
            viewHolder.txtVersion = (TextView) convertView.findViewById(R.id.version_number);
            //viewHolder.info = (ImageView) convertView.findViewById(R.id.item_info);

            result=convertView;

            convertView.setTag(viewHolder);
        } else {
            viewHolder = (CobranzaObjectAdapter.ViewHolder) convertView.getTag();
            result=convertView;
        }

        viewHolder.txtName.setText(dataModel.get_name());
        viewHolder.txtType.setText(dataModel.get_idCobranza());
        SimpleDateFormat formatter = new SimpleDateFormat("dd.MM.yyyy");//formating according to my need
        String date = formatter.format(dataModel.get_fechIni());
        viewHolder.txtVersion.setText(date);
        //viewHolder.info.setOnClickListener(this);
        //viewHolder.info.setTag(position);
        return convertView;
    }
    @Override
    public void onClick(View v) {

    }
}
