package com.ibm.liquidprep;

import android.content.Intent;
import android.graphics.drawable.AnimationDrawable;
import android.graphics.drawable.Drawable;
import android.graphics.drawable.TransitionDrawable;
import android.media.MediaPlayer;
import android.support.v7.app.ActionBar;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ImageView;
import android.widget.Toast;

import com.ibm.liquidprep.audiohelp.MediaPlayerWrapper;

public class InstructionActivityPlant extends AppCompatActivity {

    private MediaPlayerWrapper instructionsPlayerWrapper;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_instruction_plant);

        //Action bar setup
        Toolbar myToolbar = (Toolbar) findViewById(R.id.my_toolbar);
        setSupportActionBar(myToolbar);
        ActionBar ab = getSupportActionBar();
        // Enable the Up button
        ab.setDisplayHomeAsUpEnabled(true);

        //Set up animation
        ImageView intructionImage = (ImageView) findViewById(R.id.instructions_plant);
        intructionImage.setBackgroundResource(R.drawable.intruction_plant_loop);
        AnimationDrawable frameAnimation = (AnimationDrawable) intructionImage.getBackground();
        frameAnimation.start();

        //setup audio
        int[] tracks = new int[]{R.raw.intructionplant1, R.raw.intructionplant2,
                R.raw.intructionplant3, R.raw.intructionplant4};
        instructionsPlayerWrapper = new MediaPlayerWrapper(tracks, this.getApplicationContext());
        instructionsPlayerWrapper.startPlayer();
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

    public void nextStep(View view) {
        instructionsPlayerWrapper.stopAndReleasePlayer();
        Intent intent = new Intent(this, InstructionActivityTurnOn.class);
        startActivity(intent);
    }
}
