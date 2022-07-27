# React Native - Movie App

## Reference Links

- Book - [Github](https://github.com/bjpublic/Reactnative/tree/master/ch8_MovieApp)
- https://www.imdb.com
- https://yts.mx
- https://yts.mx/api

## React-Navigation

- @react-navigation/native
- react-native-screens
- react-native-safe-area-context
- @react-navigation/stack
- react-native-reanimated
- react-native-gesture-handler
- @react-native-community/masked-view

---

## [Splash Screen](https://github.com/crazycodeboy/react-native-splash-screen#installation)

- react-native-splash-screen
- File extension: `png`
- Resolution: `3000 x 3000`

```js
// 1. Module installation
$ yarn add react-native-splash-screen

// 2. Plugin installation (<== error!)
$ react-native link react-native-splash-screen

// 3. Manual method (detour)
// ..\android\settings.gradle
include ':react-native-splash-screen'
project(':react-native-splash-screen').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-splash-screen/android')

// ..\android\app\build.gradle
dependencies {
  ...
  implementation project(':react-native-splash-screen')
}

// I skipped the below in MainApplication.java (<== skip!)
import org.devio.rn.splashscreen.SplashScreenReactPackage;
new SplashScreenReactPackage()

// 4. Plugin Configuration
import android.os.Bundle; // here
import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen; // here

public class MainActivity extends ReactActivity {
   @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);  // here
        super.onCreate(savedInstanceState);
    }
    // ...other code
}

// 5. Create a launch_screen.xml
// ..\android\app\src\main\res\layout\launch_screen.xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical" android:layout_width="match_parent"
    android:layout_height="match_parent">
    <ImageView
      android:layout_width="match_parent"
      android:layout_height="match_parent"
      android:src="@drawable/launch_screen" // <== error!
      android:scaleType="centerCrop" />
</RelativeLayout>

// 6. Create a launch_screen.png
drawable-ldpi
drawable-mdpi (750 x 750)
drawable-hdpi (1125 x 1125)
drawable-xhdpi (1500 x 1500)
drawable-xxhdpi (2250 x 2250)
drawable-xxxhdpi (3000 x 3000)

// 7. Add a color called 'primary_dark'
// ..\android\app\src\main\res\values\colors.xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="primary_dark">#000000</color>
</resources>

// 8. Debugging
// ..\android\app\src\main\res\layout\launch_screen.xml
<ImageView
   android:layout_width="match_parent"
   android:layout_height="match_parent"
(-)android:src="@drawable/launch_screen" // <== error!
(+)android:src="@drawable/splashscreen"
   android:scaleType="centerCrop" />

// 9. Create a splashscreen.xml
// ..\android\app\src\main\res\drawable\splashscreen.xml
<?xml version="1.0" encoding="utf-8"?>
<layer-list xmlns:android="http://schemas.android.com/apk/res/android">
  <item android:drawable="@color/primary_dark" /> // <== check!
  <item>
    <bitmap
      android:gravity="center"
      android:src="@drawable/app_splash" />
  </item>
</layer-list>
```

```js
// Remove splash screen

import { SplashScreen } from 'react-native-splash-screen';

useEffect(() => {
  SplashScreen.hide();
}, []);
```

---

## Debugging

1. [@bam.tech/react-native.make](https://github.com/bamlab/react-native-make#readme)

- version 3.0.3
- There are `set-icon` / `set-splash` commands
- Did not use due to occur error
- Try to implement a command the below for '`link`'

```js
$ yarn link @bam.tech/react-native-make // haven't tried yet.
$ react-native set-splash --path ./assets/images/app_splash.png --resize center --background "#ffffff"

// resize:
// 1. contain: 이미지 전체가 나오는 비율 (한쪽 비율에 맞추기에 하얀 영역이 나올 수 있음)
// 2. cover: 이미지가 화면에 꽉 차도록 확대 (비율에 안 맞으면 이미지의 일부가 잘림)
// 3. center: 중앙에 이미지 위치

// background: 이미지가 채워지지 않은 하얀 영역의 배경색 지정
```

2. Preview window before Activity

- Problem: white background just before starting splash screen

```xml
<!-- ..\android\app\src\main\res\values\styles.xml -->

<item name="android:windowDisablePreview">true</item>
<item name="android:windowBackground">@null</item>
<item name="android:windowIsTranslucent">true</item>​

<!-- e.g. <item name="android:windowBackground">@android:color/black</item> -->
```

```xml

```
