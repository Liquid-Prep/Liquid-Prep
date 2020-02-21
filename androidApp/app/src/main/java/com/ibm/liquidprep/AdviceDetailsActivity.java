package com.ibm.liquidprep;

import android.content.Context;
import android.content.Intent;
import android.support.v7.app.ActionBar;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.Toolbar;
import android.view.LayoutInflater;
import android.view.View;
import android.view.Menu;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.ibm.liquidprep.audiohelp.MediaPlayerWrapper;
import com.ibm.liquidprep.models.FullWateringAdvice;

import org.joda.time.DateTime;
import org.joda.time.Days;

public class AdviceDetailsActivity extends AppCompatActivity {

    private FullWateringAdvice advice;
    private MediaPlayerWrapper instructionsPlayerWrapper;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_advice_details);

        //Get info from intent that started Activity
        Intent intent = getIntent();
        advice = (FullWateringAdvice) intent.getSerializableExtra("wateringAdvice");

        // setting up toolbar
        Toolbar myToolbar = (Toolbar) findViewById(R.id.my_toolbar3);
        setSupportActionBar(myToolbar);
        setTitle(getString(R.string.watering_advice_title));
        ActionBar ab = getSupportActionBar();
        // Enable the Up button
        ab.setDisplayHomeAsUpEnabled(true);

        TextView whenTextView = (TextView) findViewById(R.id.advice_when_textview);
        whenTextView.setText(whenIsDate(advice.getDateTime()));

        TextView dayTextView = (TextView) findViewById(R.id.advice_day_textview);
        String day = advice.getDateTime().dayOfWeek().getAsText();
        dayTextView.setText(day);

        ImageView forecastImage = (ImageView) findViewById(R.id.advice_weather_img);
        setForecastImage(forecastImage, advice);

        ImageView adviceImage = (ImageView) findViewById(R.id.advice_img);
        setWateringImage(adviceImage, advice);

        TextView water_description = (TextView) findViewById(R.id.adivce_description);
        water_description.setText(getDescription(advice));

        //Hard coding which audio clip should play. Only for demo purposes.
        //TODO remove if possible
        DateTime now = DateTime.now();
        int delay = Days.daysBetween(now.toLocalDate(), advice.getDateTime().toLocalDate()).getDays();
        int[] tracks;
        if(delay == 0) {
            tracks = new int[]{R.raw.details1today, R.raw.details2today, R.raw.details3today};
        } else if (delay == 1) {
            tracks = new int[]{R.raw.details1tomorrow, R.raw.details2tomorrow};
        } else {
            tracks = new int[]{R.raw.details2tomorrow};
        }

        instructionsPlayerWrapper = new MediaPlayerWrapper(tracks, this.getApplicationContext());
        instructionsPlayerWrapper.startPlayer();

    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu_main; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    private void setForecastImage(ImageView imageView, FullWateringAdvice advice) {
        switch (advice.getDayForecast()) {
            case CLEAR:
                imageView.setImageResource(R.drawable.forecast_list_clear);
                break;
            case RAINY:
                imageView.setImageResource(R.drawable.forecast_list_rainy);
                break;
            case CLOUDY:
                imageView.setImageResource(R.drawable.forecast_list_cloudy);
                break;
        }
    }

    private void setWateringImage(ImageView imageView, FullWateringAdvice advice) {
        switch (advice.getWateringLevel()) {
            case NONE:
                imageView.setImageResource(R.drawable.dry_rice);
                break;
            default:
                imageView.setImageResource(R.drawable.water_rice);
                break;
        }
    }

    private String getDescription(FullWateringAdvice advice) {
        String description = "";

        switch (advice.getWateringLevel()) {
            case NONE:
                description = getString(R.string.description_none);
                break;
            case LOW:
                description = getString(R.string.description_low);
                break;
            case MEDIUM:
                description = getString(R.string.description_medium);
                break;
            case HIGH:
                description = getString(R.string.description_high);
                break;
        }
        return description;
    }

    /**
     * returns "today", "tomorrow", "in two days" etc.
     * TODO: Don't use hard coded string. Use strings.xml
     */
    private String whenIsDate(DateTime givenDateTime) {

        String whenIsDate = "";

        DateTime now = DateTime.now();

        int delay = Days.daysBetween(now.toLocalDate(), givenDateTime.toLocalDate()).getDays();

        if(delay == 0) {
            whenIsDate = "Today";
        } else if (delay == 1) {
            whenIsDate = "Tomorrow";
        } else {
            whenIsDate = "In " + delay + " days";
        }

        return whenIsDate;
    }

}
