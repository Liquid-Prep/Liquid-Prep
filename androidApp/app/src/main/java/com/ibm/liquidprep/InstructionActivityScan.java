package com.ibm.liquidprep;

import android.content.Intent;
import android.media.MediaPlayer;
import android.os.Handler;
import android.support.v7.app.ActionBar;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.TextView;

import com.ibm.liquidprep.audiohelp.MediaPlayerWrapper;
import com.ibm.liquidprep.enums.Forecast;
import com.ibm.liquidprep.enums.WateringLevel;
import com.ibm.liquidprep.models.FullWateringAdvice;

import org.joda.time.DateTime;

import java.io.Serializable;
import java.util.LinkedList;
import java.util.List;

public class InstructionActivityScan extends AppCompatActivity {

    private MediaPlayerWrapper instructionsPlayerWrapper;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_instruction_scan);

        //Action bar setup
        Toolbar myToolbar = (Toolbar) findViewById(R.id.my_toolbar);
        setSupportActionBar(myToolbar);
        ActionBar ab = getSupportActionBar();
        // Enable the Up button
        ab.setDisplayHomeAsUpEnabled(true);

        final LinearLayout instructionLayout = (LinearLayout) findViewById(R.id.instruction_scam_layout);
        final LinearLayout progressBarLayout = (LinearLayout) findViewById(R.id.progress_bar_layout);
        final TextView loadingTextView = (TextView) findViewById(R.id.loading_text);

        //setup audio
        int[] tracks = new int[]{R.raw.intructionscan};
        instructionsPlayerWrapper = new MediaPlayerWrapper(tracks, this.getApplicationContext());
        instructionsPlayerWrapper.startPlayer();

        //Rest of the code in this method is meant to simulate the actual scan and contact process
        //Real implementation would involve listening for NFC and making a request to server application
        final Handler handler = new Handler();
        handler.postDelayed(new Runnable() {
            @Override
            public void run() {
                loadingTextView.setText(R.string.loading);
                instructionLayout.setVisibility(LinearLayout.GONE);
                progressBarLayout.setVisibility(LinearLayout.VISIBLE);

                //setup audio next
                instructionsPlayerWrapper.changeTracksAndRestart(new int[] {R.raw.intructionconnect, R.raw.intructionloading});
            }
        }, 5000);

        //Mocking UI change for data fetch success

        final ProgressBar progressBar = (ProgressBar) findViewById(R.id.progressBar);
        final ImageView checkmark = (ImageView) findViewById(R.id.success_scan_image);
        handler.postDelayed(new Runnable() {
            @Override
            public void run() {
                //setup audio next
                instructionsPlayerWrapper.changeTracksAndRestart(new int[] {R.raw.ping});

                progressBar.setVisibility(LinearLayout.GONE);
                checkmark.setVisibility(LinearLayout.VISIBLE);
            }
        }, 14000);

        //Another small break before going to schedule
        handler.postDelayed(new Runnable() {
            @Override
            public void run() {
                List<FullWateringAdvice> schedule = getDummySchedule();
                Intent intent = new Intent(getApplicationContext(), WaterScheduleActivity.class);
                intent.putExtra("schedule", (Serializable) schedule);
                startActivity(intent);
            }
        }, 16000);

    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu_main; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case R.id.action_voice_help:
                instructionsPlayerWrapper.playPause();
                return true;

            default:
                // If we got here, the user's action was not recognized.
                // Invoke the superclass to handle it.
                return super.onOptionsItemSelected(item);

        }
    }

    private List<FullWateringAdvice> getDummySchedule() {

        DateTime now = DateTime.now();

        FullWateringAdvice today = new FullWateringAdvice(Forecast.CLEAR, Forecast.CLEAR, WateringLevel.LOW, now, 300);
        FullWateringAdvice next = new FullWateringAdvice(Forecast.CLEAR, Forecast.RAINY, WateringLevel.NONE, now.plusDays(1), 0);
        FullWateringAdvice next2 = new FullWateringAdvice(Forecast.RAINY, Forecast.CLEAR, WateringLevel.RAIN, now.plusDays(2), 500);

        List<FullWateringAdvice> schedule = new LinkedList<FullWateringAdvice>();
        schedule.add(today);
        schedule.add(next);
        schedule.add(next2);

        return schedule;
    }

}
