package com.aiepad.myapplication;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import com.aiepad.connection.GsonRequest;
import com.aiepad.models.Cobranza;
import com.aiepad.models.CobranzaAdapter;
import com.aiepad.models.CobranzaModel;
import com.aiepad.models.CobranzaObject;
import com.aiepad.models.CobranzaObjectAdapter;
import com.aiepad.models.Coordenada;
import com.aiepad.models.Example;
import com.android.volley.AuthFailureError;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.Response.ErrorListener;
import com.android.volley.Response.Listener;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.Volley;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.MapView;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.model.Dash;
import com.google.android.gms.maps.model.Dot;
import com.google.android.gms.maps.model.Gap;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.PatternItem;
import com.google.android.gms.maps.model.Polygon;
import com.google.android.gms.maps.model.PolygonOptions;
import com.google.android.gms.maps.model.Polyline;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import com.aiepad.connection.GetDataWeb;
import com.google.gson.Gson;

import static java.lang.Integer.parseInt;

public class DisplayMessageActivity extends AppCompatActivity implements OnMapReadyCallback, GoogleMap.OnPolylineClickListener,
        GoogleMap.OnPolygonClickListener {
    //private MapController myMapController;
    private static final int COLOR_BLACK_ARGB = 0xff000000;
    private static final int COLOR_WHITE_ARGB = 0xffffffff;
    private static final int COLOR_GREEN_ARGB = 0xff388E3C;
    private static final int COLOR_PURPLE_ARGB = 0xff81C784;
    private static final int COLOR_ORANGE_ARGB = 0xffF57F17;
    private static final int COLOR_BLUE_ARGB = 0xffF9A825;

    private static final int POLYLINE_STROKE_WIDTH_PX = 12;
    private static final int POLYGON_STROKE_WIDTH_PX = 8;
    private static final int PATTERN_DASH_LENGTH_PX = 20;
    private static final int PATTERN_GAP_LENGTH_PX = 20;
    private static final PatternItem DOT = new Dot();
    private static final PatternItem DASH = new Dash(PATTERN_DASH_LENGTH_PX);
    private static final PatternItem GAP = new Gap(PATTERN_GAP_LENGTH_PX);

    // Create a stroke pattern of a gap followed by a dot.
    private static final List<PatternItem> PATTERN_POLYLINE_DOTTED = Arrays.asList(GAP, DOT);

    // Create a stroke pattern of a gap followed by a dash.
    private static final List<PatternItem> PATTERN_POLYGON_ALPHA = Arrays.asList(GAP, DASH);

    // Create a stroke pattern of a dot followed by a gap, a dash, and another gap.
    private static final List<PatternItem> PATTERN_POLYGON_BETA =
            Arrays.asList(DOT, GAP, DASH, GAP);

    ArrayList<CobranzaModel> dataModels;
    ArrayList<CobranzaObject> dataModels2;
    ListView listview;
    private static CobranzaAdapter adapter;
    private static CobranzaObjectAdapter adapter2;
    MapView mMapView;
    List<List<String>> coordenadas = new ArrayList<>();
    List<Polygon> polygons = new ArrayList<Polygon>();
    GetDataWeb getdata= new GetDataWeb();
    RequestQueue queue;
    private static final String MAPVIEW_BUNDLE_KEY = "MapViewBundleKey";


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_display_message);

        // Get the Intent that started this activity and extract the string
        Intent intent = getIntent();
        String message = intent.getStringExtra(MainActivity.EXTRA_MESSAGE);

        // Capture the layout's TextView and set the string as its text
        TextView textView = findViewById(R.id.textView);
        textView.setText(message);
        //getdata.getGETMETHOD(this,textView);
        //Integer idBeta= parseInt(message);

        GsonRequest<Cobranza> jsonObjCobranza = new GsonRequest<>("http://174.138.48.60:8080/rimacy/v1/getcobranzasbyempl/" + message,
                Cobranza.class, null, new Listener<Cobranza>() {
            @Override
            public void onResponse(Cobranza response) {
                System.out.print("edsonNueva data"+response.getData());

                dataModels2=response.getData();

            }
        }, new ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                System.out.println("edson===ERROR2");
                System.out.print(error);
            }
        });



        /*GsonRequest<Example> jsonObjReq = new GsonRequest<Example>("http://174.138.48.60:8080/rimacy/v1/getcoorbyture/68",
                Example.class, null, new Listener<Example>() {
            @Override
            public void onResponse(Example response) {
                System.out.print("edson==="+response.getData());
                System.out.print("edson==="+response.getMessage());
                System.out.print("edson==="+response.getSuccess());

            }
        }, new ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                System.out.println("edson===ERROR");
                System.out.print(error);
            }
        }


            );*/

        queue = Volley.newRequestQueue(this);
        queue.add(jsonObjCobranza);
       // queue.add(jsonObjReq);








        // List view
        listview=(ListView)findViewById(R.id.list_v);
        dataModels= new ArrayList<>();

        dataModels.add(new CobranzaModel("Apple Pie", "Android 1.0", "1","September 23, 2008"));
        dataModels.add(new CobranzaModel("Banana Bread", "Android 1.1", "2","February 9, 2009"));
        dataModels.add(new CobranzaModel("Cupcake", "Android 1.5", "3","April 27, 2009"));
        dataModels.add(new CobranzaModel("Donut","Android 1.6","4","September 15, 2009"));
        dataModels.add(new CobranzaModel("Eclair", "Android 2.0", "5","October 26, 2009"));
        dataModels.add(new CobranzaModel("Froyo", "Android 2.2", "8","May 20, 2010"));
        dataModels.add(new CobranzaModel("Gingerbread", "Android 2.3", "9","December 6, 2010"));
        dataModels.add(new CobranzaModel("Honeycomb","Android 3.0","11","February 22, 2011"));


       // SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager()
        //        .findFragmentById(R.id.map);
        //mapFragment.getMapAsync(this);
        Bundle mapViewBundle = null;
        if (savedInstanceState != null) {
            mapViewBundle = savedInstanceState.getBundle(MAPVIEW_BUNDLE_KEY);
        }
        mMapView= findViewById(R.id.mapView);
        mMapView.onCreate(mapViewBundle);
        mMapView.getMapAsync(this);



        //mapView.getMapAsync(this);

        //SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager()
        //       .findFragmentById(R.id.map);
        //mapFragment.getMapAsync(this);


       // mapView.getMapAsync(this);
        //mapView.onCreate(savedInstanceState);
        //mapView.onCreate(savedInstanceState);
       // myMapController = mapView.getController();
       // mOverlays = mapView.getOverlays();
       // mOverlayLocation = new MyLocationOverlay(this, mapView);




    }

    @Override
    public void onResume() {
        super.onResume();
        if (mMapView != null) {
            mMapView.onResume();
        }
    }

    @Override
    public void onPause() {
        if (mMapView != null) {
            mMapView.onPause();
        }
        super.onPause();
    }

    @Override
    public void onDestroy() {
        if (mMapView != null) {
            try {
                mMapView.onDestroy();
            } catch (NullPointerException e) {
               // Log.e(TAG, "Error while attempting MapView.onDestroy(), ignoring exception", e);
            }
        }
        super.onDestroy();
    }

    @Override
    public void onLowMemory() {
        super.onLowMemory();
        if (mMapView != null) {
            mMapView.onLowMemory();
        }
    }

    @Override
    public void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        Bundle mapViewBundle = outState.getBundle(MAPVIEW_BUNDLE_KEY);
        if (mapViewBundle == null) {
            mapViewBundle = new Bundle();
            outState.putBundle(MAPVIEW_BUNDLE_KEY, mapViewBundle);
        }
        mMapView.onSaveInstanceState(mapViewBundle);

    }

    @Override
    public void onMapReady(final GoogleMap googleMap) {

        System.out.print("ESTOY POR ACA ");
        fillPolygonsbyUser(googleMap);
        googleMap.moveCamera(CameraUpdateFactory.newLatLngZoom(new LatLng(-31.673, 128.892),15));
        // Set listeners for click events.

        googleMap.setOnPolylineClickListener(this);
        googleMap.setOnPolygonClickListener(this);
        //list view of Cobranza

        //adapter= new CobranzaAdapter(dataModels,DisplayMessageActivity.this,mMapView);

        adapter2= new CobranzaObjectAdapter(dataModels2,DisplayMessageActivity.this,mMapView);
        listview.setAdapter(adapter2);
        //listview.setAdapter(adapter);

        /* Polygon polygon2 = googleMap.addPolygon(new PolygonOptions()
                .clickable(true)
                .add(
                        new LatLng(-31.673, 128.892),
                        new LatLng(-31.952, 115.857),
                        new LatLng(-17.785, 122.258),
                        new LatLng(-12.4258, 130.7932)));
        polygon2.setTag("beta");
        stylePolygon(polygon2);


        Polygon polygon3 = googleMap.addPolygon(new PolygonOptions()
                .clickable(true)
                .add(
                        new LatLng(-16.39804214879857,-71.52398039928043),
                        new LatLng(-16.38963454630951,-71.52677869390607),
                        new LatLng(-16.39661656200106,-71.52613006535457)
                ));
        polygon3.setTag("beta");
        stylePolygon(polygon3);*/


        //stylePolygon(polygon3);

        // Position the map's camera near Alice Springs in the center of Australia,
        // and set the zoom factor so most of Australia shows on the screen.
        // googleMap.moveCamera(CameraUpdateFactory.newLatLngZoom(new LatLng(-23.684, 133.903), 4));-16.4032871,-71.5356009
        //-16.4032871,-71.5356009

        listview.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                final CobranzaObject dataModel= dataModels2.get(position);

                GsonRequest<Coordenada> jsonObjReq = new GsonRequest<Coordenada>("http://174.138.48.60:8080/rimacy/v1/getcoorbyrutename/"+dataModel.get_rutas(),
                        Coordenada.class, null, new Listener<Coordenada>() {
                    @Override
                    public void onResponse(Coordenada response) {
                        System.out.println("RUTAS"+dataModel.get_rutas());
                        coordenadas.clear();
                        coordenadas.addAll(response.getData());

                        //System.out.println("cobranza id; "+ dataMode.get_idCobranza());
                        //System.out.print("edson==="+response.getMessage());
                        //System.out.print("edson==="+response.getSuccess());

                    }
                }, new ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        System.out.println("edson===ERROR");
                        System.out.print(error);
                    }
                }


                );

                //queue = Volley.newRequestQueue(this);

                queue.add(jsonObjReq);
                System.out.print("entre item : "+ dataModel.get_name());
                System.out.println("COORDENADA DATA");
                for(List<String> str:coordenadas){
                    for (String st2:str){

                        System.out.println(st2);
                    }

                }
                //System.out.println(coordenadas);
               // System.out.println(coordenadas.get(1));
               // System.out.println(coordenadas.get(2));
                googleMap.clear();
               // fillPolygonsbyUser2(googleMap,coordenadas);
                deletePolygonsbyUser(0);
                //googleMap.moveCamera(CameraUpdateFactory.newLatLngZoom(new LatLng(-16.4032871,-71.5256009),15));

            }
        });

    }

    @Override
    public void onPolygonClick(Polygon polygon) {
        // Flip the values of the red, green, and blue components of the polygon's color.
        int color = polygon.getStrokeColor() ^ 0x00ffffff;
        polygon.setStrokeColor(color);
        color = polygon.getFillColor() ^ 0x00ffffff;
        polygon.setFillColor(color);

        Toast.makeText(this, "Area type " + polygon.getTag().toString(), Toast.LENGTH_SHORT).show();

    }

    @Override
    public void onPolylineClick(Polyline polyline) {
        // Flip from solid stroke to dotted stroke pattern.
        if ((polyline.getPattern() == null) || (!polyline.getPattern().contains(DOT))) {
            polyline.setPattern(PATTERN_POLYLINE_DOTTED);
        } else {
            // The default pattern is a solid stroke.
            polyline.setPattern(null);
        }

        Toast.makeText(this, "Route type " + polyline.getTag().toString(),
                Toast.LENGTH_SHORT).show();

    }

    private void stylePolygon(Polygon polygon) {
        String type = "";
        // Get the data object stored with the polygon.
        if (polygon.getTag() != null) {
            type = polygon.getTag().toString();
        }

        List<PatternItem> pattern = null;
        int strokeColor = COLOR_BLACK_ARGB;
        int fillColor = COLOR_WHITE_ARGB;

        switch (type) {
            // If no type is given, allow the API to use the default.
            case "alpha":
                // Apply a stroke pattern to render a dashed line, and define colors.
                pattern = PATTERN_POLYGON_ALPHA;
                strokeColor = COLOR_GREEN_ARGB;
                fillColor = COLOR_PURPLE_ARGB;
                break;
            case "beta":
                // Apply a stroke pattern to render a line of dots and dashes, and define colors.
                pattern = PATTERN_POLYGON_BETA;
                strokeColor = COLOR_ORANGE_ARGB;
                fillColor = COLOR_BLUE_ARGB;
                break;
        }

        polygon.setStrokePattern(pattern);
        polygon.setStrokeWidth(POLYGON_STROKE_WIDTH_PX);
        polygon.setStrokeColor(strokeColor);
        polygon.setFillColor(fillColor);
    }

    public List<Polygon> getPolygonsbyUser()
    {

        return polygons;
    }

    public void fillPolygonsbyUser(GoogleMap googleMap)
    {
        List<LatLng> coord= new ArrayList<>();
        coord.add(new LatLng(-31.673, 128.892));
        coord.add(
                new LatLng(-31.952, 115.857));
        coord.add(
                new LatLng(-17.785, 122.258));
        coord.add(
                new LatLng(-12.4258, 130.7932));
        polygons.add(googleMap.addPolygon(new PolygonOptions().clickable(true).addAll(coord
                )));
        polygons.get(polygons.size()-1).setTag("beta");
        stylePolygon(polygons.get(polygons.size()-1));




        polygons.add(googleMap.addPolygon(new PolygonOptions()
                .clickable(true)
                .add(
                        new LatLng(-16.39804214879857,-71.52398039928043),
                        new LatLng(-16.38963454630951,-71.52677869390607),
                        new LatLng(-16.39661656200106,-71.52613006535457)
                )));
        polygons.get(polygons.size()-1).setTag("alpha");
        stylePolygon(polygons.get(polygons.size()-1));

    }
    public void fillPolygonsbyUser2(GoogleMap googleMap,List<List<String>> coord)
    {

        //List<String> idscoor= new ArrayList<String>();
        //String[] idcoor=coord.get(0).split(",");
        //String[] lat=coord.get(1).split(",");
        //String[] lon=coord.get(2).split(",");
        System.out.println("LISTA DENTRO 1");
        List<List<String>> coords= new ArrayList<>();
        for(List<String> str:coord)
        {
            for(String str2:str)
            {
                System.out.println("LISTA DENTRO 2");
                System.out.println(str2);
                coords.add(Arrays.asList(str2.split(",")));
            }
        }

        //System.out.println("entre aca  COORDENADAS"+idcoor);
        //System.out.println(lat);
        //List<LatLng> latcoor = new ArrayList<>();
        Integer count=0;
        PolygonOptions opts=new PolygonOptions();
        for(String str: coords.get(1))
        {
            opts.add(new LatLng(Long.parseLong(coords.get(2).get(count)),Long.parseLong(coords.get(3).get(count))));
            count++;

        }
        polygons.add(googleMap.addPolygon(opts.clickable(true)

        ));
        //polygons.get(polygons.size()-1).setTag("alpha");
        stylePolygon(polygons.get(polygons.size()-1));



/*
        polygons.add(googleMap.addPolygon(new PolygonOptions()
                .clickable(true)
                .add(
                        new LatLng(-16.39804214879857,-71.52398039928043),
                        new LatLng(-16.38963454630951,-71.52677869390607),
                        new LatLng(-16.39661656200106,-71.52613006535457)
                )));
        polygons.get(polygons.size()-1).setTag("alpha");
        stylePolygon(polygons.get(polygons.size()-1));*/

        googleMap.moveCamera(CameraUpdateFactory.newLatLngZoom(new LatLng(-16.4032871,-71.5256009),15));

    }
    public void deletePolygonsbyUser(Integer index)
    {

        polygons.remove(index);


    }
}
