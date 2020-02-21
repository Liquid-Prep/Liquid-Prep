package com.ibm.liquidprep;

import android.content.Intent;
import android.media.MediaPlayer;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Toast;

import com.ibm.liquidprep.audiohelp.MediaPlayerWrapper;

public class MainActivity extends AppCompatActivity {

    private MediaPlayerWrapper instructionsPlayerWrapper;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        //Action bar setup
        Toolbar myToolbar = (Toolbar) findViewById(R.id.my_toolbar);
        setSupportActionBar(myToolbar);

        //setup audio
        int[] tracks = new int[]{R.raw.welcome1, R.raw.welcome2};
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

    public void nextStep(View view){
        instructionsPlayerWrapper.stopAndReleasePlayer();
        Intent intent = new Intent(this, InstructionActivityPlant.class);
        startActivity(intent);
    }

}
