package com.ibm.liquidprep;

import android.content.Intent;
import android.support.v7.app.ActionBar;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ListView;
import android.widget.Toast;

import com.ibm.liquidprep.audiohelp.MediaPlayerWrapper;
import com.ibm.liquidprep.enums.Forecast;
import com.ibm.liquidprep.enums.WateringLevel;
import com.ibm.liquidprep.listadapters.ScheduleListAdapter;
import com.ibm.liquidprep.models.FullWateringAdvice;

import org.joda.time.DateTime;

import java.io.Serializable;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;

public class WaterScheduleActivity extends AppCompatActivity {

    private List<String> days;
    private ListView scheduleListView;
    private ScheduleListAdapter adapter;
    private List<FullWateringAdvice> schedule;

    private MediaPlayerWrapper instructionsPlayerWrapper;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_water_schedule);

        //Get schedule from last activity
        Intent intent = getIntent();
        schedule = (List<FullWateringAdvice>) intent.getSerializableExtra("schedule");

        //Action bar setup
        Toolbar myToolbar = (Toolbar) findViewById(R.id.my_toolbar2);
        setSupportActionBar(myToolbar);
        setTitle("Advice");
        ActionBar ab = getSupportActionBar();
        // Enable the Up button
        ab.setDisplayHomeAsUpEnabled(true);

        //ListView setup
        scheduleListView = (ListView) findViewById(R.id.water_sched);

        adapter = new ScheduleListAdapter(getApplicationContext(), schedule);

        scheduleListView.setAdapter(adapter);

        scheduleListView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {

                final FullWateringAdvice clickedDay = (FullWateringAdvice) parent.getItemAtPosition(position);

                instructionsPlayerWrapper.stopAndReleasePlayer();

                Intent intent = new Intent(getApplicationContext(), AdviceDetailsActivity.class);
                intent.putExtra("wateringAdvice", (Serializable) clickedDay);
                startActivity(intent);

            }
        });

        //setup audio
        int[] tracks = new int[]{R.raw.watersched1, R.raw.watersched2};
        instructionsPlayerWrapper = new MediaPlayerWrapper(tracks, this.getApplicationContext());
        instructionsPlayerWrapper.startPlayer();
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu_main; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

}
