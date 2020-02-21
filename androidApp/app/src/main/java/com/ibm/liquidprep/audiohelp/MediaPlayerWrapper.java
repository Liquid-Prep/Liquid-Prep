package com.ibm.liquidprep.audiohelp;

import android.content.Context;
import android.media.MediaPlayer;

import java.io.IOException;

public class MediaPlayerWrapper implements MediaPlayer.OnCompletionListener {

    private MediaPlayer mediaPlayer;

    private int[] audioResources;
    private int currentResourceIndex;
    private Context context;

    public MediaPlayerWrapper(int[] audioResources, Context context) {

        currentResourceIndex = 0;
        this.audioResources = audioResources;
        this.context = context;

        mediaPlayer = MediaPlayer.create(context, this.audioResources[this.currentResourceIndex]);

        mediaPlayer.setOnCompletionListener(this);
    }

    public void startPlayer() {
        mediaPlayer.start();
    }

    /**
     * Just releases
     */
    public void stopAndReleasePlayer() {
        //mediaPlayer.stop();
        mediaPlayer.release();
    }

    public void changeTracksAndRestart(int[] audioResources) {

        mediaPlayer.release();
        currentResourceIndex = 0;
        this.audioResources = audioResources;
        mediaPlayer = MediaPlayer.create(context, this.audioResources[currentResourceIndex]);
        mediaPlayer.setOnCompletionListener(this);
        mediaPlayer.start();

    }

    public void playPause() {
        if(mediaPlayer.isPlaying()) {
            mediaPlayer.pause();
        } else {
            mediaPlayer.start();
        }
    }

    @Override
    public void onCompletion(MediaPlayer mp) {
        mp.release();
        currentResourceIndex = (currentResourceIndex + 1) % audioResources.length;
        mp = MediaPlayer.create(context, audioResources[currentResourceIndex]);
        mp.setOnCompletionListener(this);

        if(currentResourceIndex != 0) {
            mp.start();
        }
    }
}
