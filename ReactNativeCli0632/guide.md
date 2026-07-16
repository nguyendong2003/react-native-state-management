# Hướng dẫn Khắc phục Lỗi Build và Run - React Native 0.63.2

Tài liệu này ghi lại toàn bộ các thay đổi được thực hiện trên dự án để sửa lỗi build Gradle, lỗi biên dịch NDK và lỗi crash app trên giả lập khi chạy dự án React Native cũ (`0.63.2`) trên máy tính có môi trường SDK/NDK mới.

---

## Các file đã thay đổi so với khi khởi tạo (Init Project)

### 1. File `android/build.gradle` (Top-level)
* **Mục đích:** Thêm kho lưu trữ `mavenCentral()` vì kho lưu trữ mặc định `jcenter()` đã dừng hoạt động, giúp tải được thư viện Flipper và các dependencies khác.
* **Thay đổi cụ thể:**
  ```diff
   buildscript {
       ...
       repositories {
           google()
  +        mavenCentral()
           jcenter()
       }
   }
   
   allprojects {
       repositories {
           ...
           google()
  +        mavenCentral()
           jcenter()
           maven { url 'https://www.jitpack.io' }
       }
   }
  ```

### 2. File `android/gradle.properties`
* **Mục đích:** Nâng cấp phiên bản Flipper lên `0.99.0` để tương thích với các thư viện Fresco trên Maven Central (bản cũ `0.37.0` chỉ có trên JCenter đã chết).
* **Thay đổi cụ thể:**
  ```diff
  -# Version of flipper SDK to use with React Native
  -FLIPPER_VERSION=0.37.0
  +FLIPPER_VERSION=0.99.0
  ```

### 3. File `android/app/build.gradle`
* **Mục đích:** 
  1. Cấu hình sử dụng phiên bản NDK cố định (`21.4.7075529`) tương thích với Android Gradle Plugin `3.5.3` của dự án để tránh lỗi biên dịch toolchain NDK.
  2. Ghim (pin) chính xác phiên bản `react-native` là `0.63.2` để ngăn Gradle tự động tải phiên bản React Native mới nhất từ Maven Central gây xung đột engine JSC/Hermes.
  3. Tắt (comment out) các dependencies của Flipper do chúng ta không dùng Flipper để gỡ lỗi và nó gây lỗi tải thư viện native `libfbjni.so`.
* **Thay đổi cụ thể:**
  ```diff
   android {
       compileSdkVersion rootProject.ext.compileSdkVersion
  +    ndkVersion "21.4.7075529"
       ...
   }
   
   dependencies {
       implementation fileTree(dir: "libs", include: ["*.jar"])
       //noinspection GradleDynamicVersion
  -    implementation "com.facebook.react:react-native:+"  // From node_modules
  +    implementation "com.facebook.react:react-native:0.63.2"  // From node_modules
   
       implementation "androidx.swiperefreshlayout:swiperefreshlayout:1.0.0"
   
  -    debugImplementation("com.facebook.flipper:flipper:${FLIPPER_VERSION}") {
  -      exclude group:'com.facebook.fbjni'
  -    }
  -
  -    debugImplementation("com.facebook.flipper:flipper-network-plugin:${FLIPPER_VERSION}") {
  -        exclude group:'com.facebook.flipper'
  -        exclude group:'com.squareup.okhttp3', module:'okhttp'
  -    }
  -
  -    debugImplementation("com.facebook.flipper:flipper-fresco-plugin:${FLIPPER_VERSION}") {
  -        exclude group:'com.facebook.flipper'
  -    }
  +    // debugImplementation("com.facebook.flipper:flipper:${FLIPPER_VERSION}") {
  +    //   exclude group:'com.facebook.fbjni'
  +    // }
  +    // debugImplementation("com.facebook.flipper:flipper-network-plugin:${FLIPPER_VERSION}") {
  +    //     exclude group:'com.facebook.flipper'
  +    //     exclude group:'com.squareup.okhttp3', module:'okhttp'
  +    // }
  +    // debugImplementation("com.facebook.flipper:flipper-fresco-plugin:${FLIPPER_VERSION}") {
  +    //     exclude group:'com.facebook.flipper'
  +    // }
   ```

### 4. File `android/app/src/main/java/com/reactnativecli0632/MainApplication.java`
* **Mục đích:** Tắt lệnh khởi tạo Flipper khi chạy ứng dụng chế độ Debug để tránh crash lúc khởi động.
* **Thay đổi cụ thể:**
  ```diff
     @Override
     public void onCreate() {
       super.onCreate();
       SoLoader.init(this, /* native exopackage */ false);
  -    initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
  +    // initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
     }
  ```

### 5. File `android/app/src/debug/java/com/reactnativecli0632/ReactNativeFlipper.java`
* **Mục đích:** Ghi đè file bằng code rỗng (stub) để loại bỏ toàn bộ import và logic Flipper. Điều này ngăn lỗi biên dịch Java (do không tìm thấy class Flipper) sau khi chúng ta đã tắt dependencies của Flipper trong Gradle.
* **Nội dung mới của file:**
  ```java
  package com.reactnativecli0632;
  
  import android.content.Context;
  import com.facebook.react.ReactInstanceManager;
  
  public class ReactNativeFlipper {
    public static void initializeFlipper(Context context, ReactInstanceManager reactInstanceManager) {
      // Flipper is disabled
    }
  }
  ```

---

## Lưu ý về Môi trường (Environment Setup)

Để chạy được dự án này cục bộ trên máy tính của bạn, cần đáp ứng môi trường cấu hình:

1. **Android NDK:** Phải cài đặt đúng phiên bản `21.4.7075529` thông qua `sdkmanager` (Lệnh chạy cài đặt thủ công bằng Java 17 nếu cần):
   ```bash
   yes | JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64 /home/dongnt1/Android/Sdk/cmdline-tools/latest/bin/sdkmanager "ndk;21.4.7075529"
   ```
2. **Java JDK dùng để build dự án:** Vẫn sử dụng **Java 8 (JDK 1.8)** như cấu hình mặc định của hệ thống của bạn để biên dịch app React Native 0.63.

---

## Các lệnh chạy dự án

Mỗi khi thay đổi cấu hình hoặc biên dịch lại, hãy chạy các lệnh sau:

* **Dọn dẹp cache cũ của Android:**
  ```bash
  cd android && ./gradlew clean && cd ..
  ```
* **Khởi chạy ứng dụng:**
  ```bash
  npx react-native run-android
  ```
