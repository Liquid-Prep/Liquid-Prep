package com.ibm.liquidprep.listadapters;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import com.ibm.liquidprep.R;
import com.ibm.liquidprep.models.FullWateringAdvice;

import org.joda.time.DateTime;
import org.joda.time.DateTimeComparator;
import org.joda.time.Days;

import java.util.List;

public class ScheduleListAdapter extends ArrayAdapter {

    private final Context context;
    private final List<FullWateringAdvice> values;

    public ScheduleListAdapter(Context context, List<FullWateringAdvice> values) {
        super(context, R.layout.schedule_list_item, values);
        this.context = context;
        this.values = values;
    }

    @Override
    public View getView(final int position, View convertView, ViewGroup parent) {
        LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        View rowView = inflater.inflate(R.layout.schedule_list_item, parent, false);

        FullWateringAdvice advice = values.get(position);

        TextView dayTextView = (TextView) rowView.findViewById(R.id.day_textview);
        String day = advice.getDateTime().dayOfWeek().getAsText();
        dayTextView.setText(day);

        ImageView forecastImage = (ImageView) rowView.findViewById(R.id.forecast_list_image);
        setForecastImage(forecastImage, advice);

        ImageView adviceImage = (ImageView) rowView.findViewById(R.id.advice_list_image);
        setWateringImage(adviceImage, advice);

        TextView whenDateIsTextView = (TextView) rowView.findViewById(R.id.when_date_is_textview);
        whenDateIsTextView.setText(whenIsDate(advice.getDateTime()));


        return rowView;
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
                imageView.setImageResource(R.drawable.dont_water);
                break;
            case RAIN:
                imageView.setImageResource(R.drawable.advice_rain_list);
                break;
            default:
                imageView.setImageResource(R.drawable.advice_water_list);
                break;
        }
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
