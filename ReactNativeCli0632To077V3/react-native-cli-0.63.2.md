# Hướng dẫn Cấu hình React Native 0.63.2 với React 17.0.2 & Android API 36

Tài liệu này ghi lại chi tiết các bước thiết lập môi trường, chỉnh sửa code và chạy dự án React Native 0.63.2 sau khi khởi tạo bằng lệnh:

```bash
npx @react-native-community/cli@4.14.0 init ReactNativeCli0632 --version 0.63.2
```

---

## 1. Môi trường Yêu cầu (Node & Java)

Để chạy React Native 0.63.2 và Gradle 6.2 ổn định nhất:

- **Node.js**: Phiên bản **v14.x** (Ví dụ: `v14.21.3`).
  - _Lưu ý_: Các phiên bản Node mới hơn (v16+) có thể gặp lỗi phân tích cú pháp hoặc tương thích trong Metro bundler cũ.
- **Java**: **JDK 8** (OpenJDK 1.8.0).
  - _Lưu ý_: Gradle 6.2 không hỗ trợ các JDK mới hơn (như JDK 17 hay JDK 21). Khi chạy các lệnh Gradle/React Native, cần chỉ định biến môi trường `JAVA_HOME` trỏ tới đường dẫn JDK 8. Ví dụ trên Linux:
    ```bash
    export JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk-amd64
    ```

---

## 2. Các Thay đổi Code & Cấu hình

Sau khi init xong dự án, hãy thực hiện các bước cấu hình sau:

### Bước 2.1: Cập nhật `package.json`

Chỉnh sửa file `package.json` trỏ các dependencies về đúng phiên bản mong muốn:

```json
{
  "dependencies": {
    "react": "17.0.2",
    "react-native": "0.63.2"
  },
  "devDependencies": {
    "metro-react-native-babel-preset": "0.59.0",
    "react-test-renderer": "17.0.2"
  }
}
```

- Sau khi lưu, chạy lệnh cài đặt lại node_modules:
  ```bash
  npm install
  ```

### Bước 2.2: Tăng `minSdkVersion` lên 21

Mở file `android/build.gradle` và cập nhật cấu hình `minSdkVersion` ở block `ext`:

```gradle
buildscript {
    ext {
        ...
        minSdkVersion = 21
        ...
    }
}
```

### Bước 2.3: Chỉ định NDK Version tương thích

Mở file `android/app/build.gradle` và thêm `ndkVersion` vào ngay đầu block `android {` để Gradle sử dụng NDK tương thích (tránh xung đột nếu máy cài NDK mới hơn như NDK 27):

```gradle
android {
    ndkVersion "21.4.7075529"
    compileSdkVersion rootProject.ext.compileSdkVersion
    ...
}
```

### Bước 2.4: Vô hiệu hóa Flipper để tránh lỗi build Maven/JCenter

Vì Flipper `0.37.0` (mặc định của RN 0.63.2) không còn tồn tại trên các kho lưu trữ Maven công khai (do JCenter đã đóng cửa), chúng ta cần disable Flipper:

1.  Mở file `android/app/build.gradle` và comment các dòng `debugImplementation` liên quan đến Flipper trong block `dependencies { ... }`:

    ```gradle
    //  debugImplementation("com.facebook.flipper:flipper:${FLIPPER_VERSION}") {
    //    exclude group:'com.facebook.fbjni'
    //  }
    //
    //  debugImplementation("com.facebook.flipper:flipper-network-plugin:${FLIPPER_VERSION}") {
    //      exclude group:'com.facebook.flipper'
    //      exclude group:'com.squareup.okhttp3', module:'okhttp'
    //  }
    //
    //  debugImplementation("com.facebook.flipper:flipper-fresco-plugin:${FLIPPER_VERSION}") {
    //      exclude group:'com.facebook.flipper'
    //  }
    ```

2.  Mở file `android/app/src/debug/java/com/reactnativecli0632to077v3/ReactNativeFlipper.java` (đường dẫn package tùy thuộc tên project của bạn) và thay thế toàn bộ nội dung file thành một class stub trống để không gọi thư viện Flipper:

    ```java
    package com.reactnativecli0632to077v3;

    import android.content.Context;
    import com.facebook.react.ReactInstanceManager;

    public class ReactNativeFlipper {
      public static void initializeFlipper(Context context, ReactInstanceManager reactInstanceManager) {
        // Flipper đã bị vô hiệu hóa
      }
    }
    ```

---

## 3. Khởi chạy Ứng dụng

Do có sự cập nhật thư viện từ React 16 lên React 17 và chỉnh sửa `package.json`, Metro Bundler cần được chạy lại và xóa cache để nhận diện đầy đủ module `react`:

1.  **Khởi động Metro Bundler với cache reset**:
    Tắt terminal chạy Metro cũ, sau đó mở terminal mới chạy lệnh:

    ```bash
    npx react-native start --reset-cache
    ```

2.  **Build và chạy Android App (chỉ định JDK 8)**:
    Đảm bảo Android emulator đã chạy sẵn, sau đó chạy lệnh build:
    ```bash
    npx react-native run-android
    ```
