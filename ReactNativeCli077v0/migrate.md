# Hướng Dẫn Migrate Phiên Bản Thư Viện (React Native 0.63.2 -> 0.77.0)

Tài liệu này ghi chú lại cách nâng cấp phiên bản cho các thư viện nguyên bản từ dự án cũ (React Native 0.63.2) lên dự án mới (React Native 0.77.0) để đảm bảo chạy `npm install` thành công mà **không đổi sang các thư viện thay thế khác** (giữ nguyên tên package gốc).

---

## 1. Phương Pháp Giải Quyết Xung Đột Dependency

Vì React Native v0.77.0 chạy trên **React 18.3.1**, trong khi các phiên bản thư viện cũ (như `react-native-camera`, `@react-native-community/async-storage`) đã lâu không được cập nhật và chỉ khai báo peer dependencies với `react@^16` hoặc `react@^17`. 

Để `npm install` chạy thành công mà không báo lỗi `ERESOLVE unable to resolve dependency tree`, chúng ta cấu hình file `.npmrc` ở thư mục gốc:

```ini
legacy-peer-deps=true
```

Điều này cho phép `npm` bỏ qua các xung đột nghiêm ngặt về peer dependencies của các gói cũ và tiếp tục cài đặt bình thường.

---

## 2. Bảng So Sánh Chi Tiết Nâng Cấp Phiên Bản

Dưới đây là danh sách tất cả các thư viện của bạn được nâng cấp lên phiên bản tương thích với môi trường Node 18, Java 17, React 18:

| Tên thư viện (Dependencies) | Phiên bản cũ (0.63.2) | Phiên bản mới (0.77.0) | Phân tích & Ghi chú |
| :--- | :--- | :--- | :--- |
| **react** | `17.0.2` | `18.3.1` | Theo template mặc định của React Native 0.77.0 |
| **react-native** | `0.63.2` | `0.77.0` | Target nâng cấp chính |
| `@react-native-camera-roll/camera-roll` | `5.6.0` | `7.10.2` | Nâng cấp lên bản mới nhất hỗ trợ scoped storage trên Android mới |
| `@react-native-community/async-storage` | `1.11.0` | `1.12.1` | Bản mới nhất và cuối cùng trước khi đổi tên thành `@react-native-async-storage/async-storage` |
| `@react-native-community/datetimepicker` | `3.5.2` | `9.1.0` | Nâng cấp tương thích Android Gradle mới |
| `@react-native-community/masked-view` | `0.1.10` | `0.1.11` | Phiên bản cuối cùng dưới tên `@react-native-community/masked-view` |
| `@react-native-community/netinfo` | `6.0.2` | `12.0.1` | Bản mới tương thích Gradle 8+ |
| `@react-native-community/push-notification-ios`| `^1.10.1`| `1.11.0` | Bản mới tương thích Xcode mới |
| `@react-native-community/slider` | `4.1.12` | `5.2.0` | Phiên bản mới hoạt động ổn định |
| `@react-native-firebase/app` | `17.5.0` | `25.1.0` | Firebase v25 hỗ trợ Gradle 8+ và Java 17 |
| `@react-native-firebase/analytics` | `17.5.0` | `25.1.0` | Đồng bộ Firebase Suite |
| `@react-native-firebase/crashlytics` | `17.5.0` | `25.1.0` | Đồng bộ Firebase Suite |
| `@react-native-firebase/messaging` | `17.5.0` | `25.1.0` | Đồng bộ Firebase Suite |
| `@react-navigation/native` | `5.1.5` | `6.1.18` | Nâng lên v6 tương thích React 18 |
| `@react-navigation/bottom-tabs` | `5.11.9` | `6.6.1` | Nâng lên v6 tương thích React Navigation v6 |
| `@react-navigation/material-top-tabs` | `6.0.2` | `6.6.13` | Nâng lên v6 |
| `@react-navigation/stack` | `5.14.4` | `6.4.1` | Nâng lên v6 |
| `add` | `^2.0.6` | `2.0.6` | Giữ nguyên phiên bản |
| `apisauce` | `1.1.2` | `3.2.2` | Nâng cấp tương thích Axios mới |
| `axios` | `^0.24.0` | `1.18.1` | Nâng cấp để sửa các lỗi bảo mật và tăng hiệu năng |
| `crypto-js` | `^4.1.1` | `4.2.0` | Thư viện thuần JS, nâng lên bản mới an toàn |
| `formik` | `2.2.9` | `2.4.6` | Tương thích React 18 |
| `i18n-js` | `3.0.11` | `3.9.2` | Giữ ở v3 để tránh breaking change API của v4 |
| `lodash` | `4.17.21` | `4.17.21` | Giữ nguyên bản thuần JS |
| `lodash.throttle` | `4.1.1` | `4.1.1` | Giữ nguyên bản thuần JS |
| `mobx` | `4.15.4` | `6.16.1` | Bản v6 hỗ trợ Hermes engine (ES6 Proxy) và React 18 |
| `mobx-react-lite` | `1.4.1` | `4.1.1` | Đi kèm với MobX v6 và React 18 |
| `mobx-state-tree` | `3.14.1` | `7.3.1` | Đi kèm với MobX v6 |
| `moment` | `2.29.1` | `2.30.1` | Bản thuần JS |
| `ramda` | `0.27.1` | `0.30.1` | Bản thuần JS |
| `react-native-animatable` | `1.3.3` | `1.4.0` | Bản mới nhất |
| `react-native-barcode-mask` | `1.2.4` | `1.2.4` | Bản thuần JS |
| `react-native-ble-manager` | `7.6.1` | `12.5.1` | Nâng lên hỗ trợ Android SDK mới (xin quyền Bluetooth runtime) |
| `react-native-camera` | `3.43.6` | `4.2.1` | Phiên bản cuối cùng của thư viện trước khi bị deprecated |
| `react-native-capture-protection` | `1.9.6` | `2.0.0` | Phiên bản mới nhất tương thích với các API Android mới |
| `react-native-code-push` | `7.0.1` | `9.0.1` | Phiên bản mới nhất tương thích RN 0.77 |
| `react-native-date-picker` | `4.1.1` | `5.0.13` | Nâng lên v5 hỗ trợ cấu hình Android Gradle mới |
| `react-native-device-info` | `8.4.0` | `15.0.2` | Nâng lên bản mới nhất hỗ trợ API Android mới |
| `react-native-document-picker` | `^7.1.1` | `9.3.1` | Bản mới |
| `react-native-dots-pagination` | `^0.2.0` | `0.2.0` | Bản thuần JS |
| `react-native-draggable-flatlist` | `3.1.1` | `4.0.1` | Nâng lên v4 hỗ trợ Reanimated v3 |
| `react-native-drax` | `^0.9.3` | `0.10.2` | Bản mới hoạt động ổn định |
| `react-native-dropdown-picker` | `^5.4.0` | `5.4.6` | Bản thuần JS |
| `react-native-email` | `1.1.0` | `2.1.0` | Nâng cấp |
| `react-native-exit-app` | `^1.1.0` | `2.0.0` | Tương thích RN mới |
| `react-native-fast-image` | `8.5.11` | `8.6.3` | Bản mới nhất dưới tên gốc |
| `react-native-fbsdk-next` | `4.3.1` | `13.4.3` | Bản mới hỗ trợ Facebook SDK mới |
| `react-native-fs` | `2.18.0` | `2.20.0` | Tương thích Gradle mới |
| `react-native-gesture-handler` | `2.5.0` | `2.22.0` | Tương thích RN 0.77 |
| `react-native-highlight-words` | `^1.0.1` | `1.0.1` | Bản thuần JS |
| `react-native-iap` | `12.13.0` | `15.5.2` | Bản mới cập nhật API Google Play Billing v6/v7 |
| `react-native-image-picker` | `5.0.0` | `8.2.1` | Bản mới nâng cấp bảo mật trên Android |
| `react-native-image-viewer` | `^0.0.3` | `0.0.3` | Bản thuần JS (Sửa từ lỗi copy nhầm 3.0.1 về 0.0.3) |
| `react-native-image-zoom-viewer`| `^3.0.1`| `3.0.1` | Bản thuần JS |
| `react-native-keyboard-aware-scroll-view`| `0.9.4`| `0.9.5` | Bản thuần JS |
| `react-native-keychain` | `6.1.1` | `10.0.0` | Bản mới cập nhật bảo mật sinh trắc học |
| `react-native-linear-gradient` | `^2.5.6` | `2.8.3` | Tương thích RN mới |
| `react-native-localize` | `1.4.3` | `3.7.0` | Bản mới |
| `react-native-mail` | `6.1.1` | `6.1.1` | Giữ nguyên bản ổn định |
| `react-native-media-controls` | `2.3.0` | `2.3.0` | Bản thuần JS |
| `react-native-media-meta` | `^0.0.11` | `0.0.11` | Giữ nguyên |
| `react-native-modal` | `13.0.0` | `13.0.1` | Tương thích React 18 |
| `react-native-modal-datetime-picker`| `11.0.0`| `15.0.0` | Tương thích DateTimePicker mới |
| `react-native-modal-selector` | `2.1.0` | `2.1.2` | Bản thuần JS |
| `react-native-music-control` | `1.4.1` | `1.4.1` | Giữ nguyên |
| `react-native-navigation-bar-color`| `2.0.1` | `2.0.2` | Tương thích RN mới |
| `react-native-orientation-locker` | `^1.4.0` | `1.7.0` | Hỗ trợ Android 14+ |
| `react-native-pager-view` | `5.4.1` | `8.0.4` | Tương thích RN 0.77 |
| `react-native-permissions` | `3.10.0` | `5.6.0` | Bản mới cập nhật cách xin quyền Android 14+ |
| `react-native-popover-view` | `4.1.0` | `5.0.2` | Bản mới |
| `react-native-push-notification` | `^8.1.1` | `8.1.1` | Thư viện gốc (đã ngừng bảo trì) |
| `react-native-qrcode-svg` | `6.1.1` | `6.3.21` | Tương thích SVG mới |
| `react-native-reanimated` | `1.13.4` | `3.16.7` | Nâng lên Reanimated v3 để chạy được trên RN 0.77 |
| `react-native-safe-area-context` | `0.7.3` | `5.8.0` | Bản mới bắt buộc cho RN 0.77 |
| `react-native-safe-area-view` | `1.1.1` | `1.1.1` | Thư viện gốc (đã ngừng bảo trì) |
| `react-native-screens` | `2.10.1` | `4.26.2` | Bản mới bắt buộc cho RN 0.77 |
| `react-native-share` | `7.1.0` | `12.3.1` | Bản mới |
| `react-native-slider` | `0.11.0` | `0.11.0` | Giữ nguyên (Sửa từ lỗi nhầm sang 4.4.0 của community slider) |
| `react-native-snap-carousel` | git url | git url | Giữ nguyên fork |
| `react-native-splash-screen` | `3.2.0` | `3.3.0` | Bản mới |
| `react-native-svg` | `12.1.1` | `15.15.5` | Bản mới hỗ trợ React 18 |
| `react-native-swipe-list-view` | `3.2.9` | `3.2.9` | Bản thuần JS |
| `react-native-system-setting` | `^1.7.6` | `1.7.6` | Bản gốc |
| `react-native-tab-view` | `3.1.1` | `3.5.2` | Tương thích RN mới |
| `react-native-toast-message` | `2.0.0` | `2.2.0` | Bản thuần JS |
| `react-native-vector-icons` | `8.1.0` | `10.3.0` | Bản mới sửa lỗi build resources trên Gradle mới |
| `react-native-video` | `5.1.1` | `6.19.2` | Nâng cấp hỗ trợ kiến trúc mới và ExoPlayer cải tiến |
| `react-native-video-controls` | git url | git url | Giữ nguyên fork |
| `react-native-webview` | `^11.23.1` | `14.0.1` | Tương thích Gradle mới |
| `reactotron-mst` | `3.1.1` | `3.1.12` | Nâng cấp tương thích |
| `reactotron-react-native` | `5.0.0` | `5.2.0` | Nâng cấp tương thích |
| `realm` | `10.8.0` | `20.2.0` | Nâng cấp bắt buộc để hỗ trợ Java 17 và Gradle mới |
| `recyclerlistview` | `^4.1.0` | `4.2.0` | Tương thích RN mới |
| `rn-fetch-blob` | git url | git url | Giữ nguyên fork |
| `rn-qr-generator` | `1.2.1` | `2.0.0` | Bản mới |
| `rn-swipe-button` | `^1.3.6` | `1.3.7` | Bản mới |
| `validate.js` | `0.13.1` | `0.13.1` | Giữ nguyên |
| `yarn` | `1.22.17` | `1.22.17` | Giữ nguyên |
| `yup` | `0.32.9` | `1.3.0` | Nâng cấp |

---

## 3. Các Lưu Ý Về Biên Dịch (Compilation & Runtime)

> [!WARNING]
> Mặc dù `npm install` đã thành công nhờ vào `legacy-peer-deps=true`, bạn cần lưu ý rằng khi build native (`npx react-native run-android`):
> 
> 1. **Lỗi Biên Dịch Java/Gradle:** Các thư viện đã ngưng phát triển lâu năm như `react-native-camera@4.2.1` và `react-native-push-notification@8.1.1` vẫn sử dụng các cấu hình build Gradle cũ (chưa hỗ trợ namespace, compileSdkVersion thấp, Gradle plugin cũ). Khi build trên **Java 17** và **Gradle 8.x** của React Native 0.77, bạn sẽ gặp lỗi build native Android. Bạn sẽ cần cấu hình `patch-package` để sửa các dòng code lỗi trong file build.gradle hoặc source code Java của các thư viện này nếu muốn biên dịch thành công.
> 2. **Kiến Trúc Mới (New Architecture/Fabric):** React Native 0.77 khuyến khích bật New Architecture. Các thư viện cũ trên hoàn toàn không tương thích với Fabric. Hãy đảm bảo tắt New Architecture trong file `android/gradle.properties` (`newArchEnabled=false`) để chạy ở chế độ tương thích ngược (Bridged).
