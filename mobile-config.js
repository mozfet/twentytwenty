// app info
App.info({
  id: 'com.ExpertBox.TwentyTwenty',
  name: 'ICS 20/20',
  description: 'Get insight and clarity regarding your credit card transactions.',
  author: 'The Expert Box B.V.',
  email: 'info@expertbox.com',
  version: '0.0.1',
  website: 'https://twentytwenty.eu.meteorapp.com'
});

// app icons
App.icons({

  // iOS 4.5.3
  'app_store': 'resources/icons/1024x1024.png',                     // 1024x1024
  'iphone_2x': 'resources/icons/120x120.png',                       // 120x120
  'iphone_3x': 'resources/icons/180x180.png',                       // 180x180
  'ipad_2x': 'resources/icons/152x152.png',                         // 152x152
  'ipad_pro': 'resources/icons/167x167.png',                        // 167x167
  'ios_settings_2x': 'resources/icons/58x58.png',                   // 58x58
  'ios_settings_3x': 'resources/icons/87x87.png',                   // 87x87
  'ios_spotlight_2x': 'resources/icons/80x80.png',                  // 80x80
  'ios_spotlight_3x': 'resources/icons/120x120.png',                // 120x120
  'ios_notification_2x': 'resources/icons/40x40.png',               // 40x40
  'ios_notification_3x': 'resources/icons/60x60.png',               // 60x60

  // iOS Legacy
  'ipad': 'resources/icons/76x76.png',                              // 76x76
  'ios_settings': 'resources/icons/29x29.png',                      // 29x29
  'ios_spotlight': 'resources/icons/40x40.png',                     // 40x40
  'ios_notification': 'resources/icons/20x20.png',                  // 20x20
  'iphone_legacy': 'resources/icons/57x57.png',                     // 57x57
  'iphone_legacy_2x': 'resources/icons/114x114.png',                // 114x114
  'ipad_spotlight_legacy': 'resources/icons/50x50.png',             // 50x50
  'ipad_spotlight_legacy_2x': 'resources/icons/100x100.png',        // 100x100
  'ipad_app_legacy': 'resources/icons/72x72.png',                   // 72x72
  'ipad_app_legacy_2x': 'resources/icons/144x144.png',              // 144x144

  // Android 6.3.0
  'android_mdpi': 'resources/icons/48x48.png',                      // 48x48
  'android_hdpi': 'resources/icons/72x72.png',                      // 72x72
  'android_xhdpi': 'resources/icons/96x96.png',                     // 96x96
  'android_xxhdpi': 'resources/icons/144x144.png',                  // 144x144
  'android_xxxhdpi': 'resources/icons/192x192.png'                  // 192x192
});

// app launch screens
App.launchScreens({

  // iOS 4.5.3
  'iphone5': 'resources/icons/640x1136.png',                        // 640x1136
  'iphone6': 'resources/icons/750x1334.png',                        // 750x1334
  'iphone6p_portrait': 'resources/icons/1242x2208.png',             // 1242x2208
  'iphone6p_landscape': 'resources/icons/2208x1242.png',            // 2208x1242
  'iphoneX_portrait': 'resources/icons/1125x2436.png',              // 1125x2436
  'iphoneX_landscape': 'resources/icons/2436x1125.png',             // 2436x1125
  'ipad_portrait_2x': 'resources/icons/1536x2048.png',              // 1536x2048
  'ipad_landscape_2x': 'resources/icons/2048x1536.png',             // 2048x1536

  // ??? Not yet supported in Xcode 9 or Cordova iOS 4.5.3
  // 'ipad_portrait_pro_10_5': 'resources/icons/1668x2224.png',
  // 'ipad_landscape_pro_10_5': 'resources/icons/2224x1668.png',
  // 'ipad_portrait_pro_12_9': 'resources/icons/2048x2732.png',
  // 'ipad_landscape_pro_12_9': 'resources/icons/2732x2048.png',

  // iOS Legacy
  'iphone': 'resources/icons/320x480.png',                          // 320x480
  'iphone_2x': 'resources/icons/640x960.png',                       // 640x960
  'ipad_portrait': 'resources/icons/768x1024.png',                  // 768x1024
  'ipad_landscape': 'resources/icons/1024x768.png',                 // 1024x768

  // Android 6.3.0
  'android_mdpi_portrait': 'resources/icons/320x480.png',           // 320x480
  'android_mdpi_landscape': 'resources/icons/480x320.png',          // 480x320
  'android_hdpi_portrait': 'resources/icons/480x800.png',           // 480x800
  'android_hdpi_landscape': 'resources/icons/800x480.png',          // 800x480
  'android_xhdpi_portrait': 'resources/icons/720x1280.png',         // 720x1280
  'android_xhdpi_landscape': 'resources/icons/1280x720.png',        // 1280x720
  'android_xxhdpi_portrait': 'resources/icons/960x1600.png',        // 960x1600
  'android_xxhdpi_landscape': 'resources/icons/1600x960.png',       // 1600x960
  'android_xxxhdpi_portrait': 'resources/icons/1280x1920.png',      // 1280x1920
  'android_xxxhdpi_landscape': 'resources/icons/1920x1280.png'      // 1920x1280
});

// Set PhoneGap/Cordova preferences
App.setPreference('BackgroundColor', '0xffffffff');
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('Orientation', 'default');
App.setPreference('Orientation', 'all', 'ios');

// Set Status Bar preferences
App.setPreference('StatusBarOverlaysWebView', false);

/*
// Pass preferences for a particular PhoneGap/Cordova plugin
App.configurePlugin('com.phonegap.plugins.facebookconnect', {
  APP_ID: '1234567890',
  API_KEY: 'supersecretapikey'
});

// Add custom tags for a particular PhoneGap/Cordova plugin
// to the end of generated config.xml.
// Universal Links is shown as an example here.
App.appendToConfig(`
  <universal-links>
    <host name="localhost:3000" />
  </universal-links>
`);
*/
