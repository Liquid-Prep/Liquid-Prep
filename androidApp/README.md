## LiquidPrep App

This is the LiquidPrep App. An intuitive android app that will let farmers tap into the power of the LiquidPrep Platform in an easy to understand way. All instructions are given by voice assistance, making the app easy to use for low literacy users.

Make sure to check out our main repo for more details on the whole project: https://github.ibm.com/yuanyua1/liquidPrep

Here are some technical details
- The app requires API level 15 and above (4.0.3 IceCreamSandwich). While this is an old API level, it means that the app should run on almost 100% of android devices.
- Communication between the app and the sensor is made by NFC. We chose NFC because it requires little work from user, especially compared to other options such as Bluetooth.
- The app uses the data from the sensor, combined with location information, and sends it to the LiquidPrep Platform. The platform then returns the watering schedule.

<p align="center">
  <img src="https://github.ibm.com/Walid-Bounouar/LiquidPrepApp/blob/master/appflow.gif" alt="liquidPrep-home" width ="40%" height="40%">
</p>

### Current state of the app
- Ready for demo purposes.
- Initial instructions with voice assistance are functional.
- Watering schedule is functional but backed by mocked data.
- Watering advice details page uses "hard coded" audio for voice assistance.
- For demo purposes, the app is English only for the moment.

### Next steps
- Fix known bugs.
- Implement communication with LiquidPrep Platform to get real data instead of using mocked data.
- Implement NFC communication.
- Add custom voice assistance for Watering advice details page instead of current "hard coded" audio files.
- Add captions as a security if device audio fails.
- Add localization.

### Known bugs
- Occasional problems when tapping the avatar to play/pause voice assistance. Problems probably caused by mismanagement of MediaPlayer state.
- App bar "back navigation" crashes the app for the "Watering advice details" page (the page that appears when tapping a day in the schedule).
