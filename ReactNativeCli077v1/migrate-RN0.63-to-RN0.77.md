# Báo Cáo Nâng Cấp Dependencies Project React Native

**Dự án:** `ReactNativeCli077v1`  
**Mục tiêu:** Nâng cấp từ **React Native 0.63.2** (React 17, Node 18) lên **React Native 0.77.0** (React 18.3.1, Node 20, Java 17, hỗ trợ Android 16 - SDK 36).

---

## I. Tổng Quan Chiến Lược Nâng Cấp

1. **Tối giản hóa sự thay đổi:** Giữ nguyên tối đa các thư viện Pure JS (Logic/Utility) không có phụ thuộc Native gắt gao.
2. **Loại bỏ các thư viện ngưng bảo trì (Deprecated):** Gỡ bỏ 5 thư viện cũ không còn tương thích với Android SDK 36, Java 17 và React 18 (`react-native-camera`, `react-native-highlight-words`, `react-native-image-viewer`, `react-native-media-meta`, `react-native-push-notification`).
3. **Chuẩn hóa Namespace & Version:** Cập nhật các package đã đổi tên tổ chức (`async-storage`, `masked-view`) và nâng cấp các thư viện Native Core bắt buộc để tương thích với Java 17 / Gradle 8+.

---

## II. Bảng So Sánh Chi Tiết Main Dependencies (`dependencies`)

| Thư viện                                        | Version cũ (0.63.2) | Version mới (0.77.0) | Mức độ thay đổi & Lý do                                                                                |
| :---------------------------------------------- | :------------------ | :------------------- | :----------------------------------------------------------------------------------------------------- |
| `@react-native-camera-roll/camera-roll`         | `5.6.0`             | `5.6.0`              | 🟢 **Giữ nguyên**                                                                                      |
| `@react-native-community/async-storage`         | `1.11.0`            | ❌ _Đổi tên package_ | ⚠️ **Chuyển tên** sang `@react-native-async-storage/async-storage` (`1.24.0`) để tương thích React 18. |
| `@react-native-community/datetimepicker`        | `3.5.2`             | `9.1.0`              | ⬆️ **Nâng major (+6.x)**: Bắt buộc để tương thích với Android Gradle/Java 17 mới.                      |
| `@react-native-community/masked-view`           | `0.1.10`            | ❌ _Đổi tên package_ | ⚠️ **Chuyển tên** sang `@react-native-masked-view/masked-view` (`0.3.2`).                              |
| `@react-native-community/netinfo`               | `6.0.2`             | `12.0.1`             | ⬆️ **Nâng major (+6.x)**: Cập nhật native module mới cho RN 0.77.                                      |
| `@react-native-community/push-notification-ios` | `^1.10.1`           | `1.10.1`             | 🟢 **Giữ nguyên** (chốt version cố định).                                                              |
| `@react-native-community/slider`                | `4.1.12`            | `4.5.5`              | ↗️ **Nâng minor (+0.4.x)**: Để hỗ trợ peer-dependencies React 18.                                      |
| `@react-native-firebase/analytics`              | `17.5.0`            | `25.1.0`             | ⬆️ **Nâng major (+8.x)**: Firebase BOM mới bắt buộc cho Android SDK 34+.                               |
| `@react-native-firebase/app`                    | `17.5.0`            | `25.1.0`             | ⬆️ **Nâng major (+8.x)**                                                                               |
| `@react-native-firebase/crashlytics`            | `17.5.0`            | `25.1.0`             | ⬆️ **Nâng major (+8.x)**                                                                               |
| `@react-native-firebase/messaging`              | `17.5.0`            | `25.1.0`             | ⬆️ **Nâng major (+8.x)**                                                                               |
| `@react-navigation/bottom-tabs`                 | `5.11.9`            | `6.6.1`              | ⬆️ **Nâng major (+1.x)**: Đi kèm nâng cấp React Navigation v6.                                         |
| `@react-navigation/material-top-tabs`           | `6.0.2`             | `6.6.14`             | ↗️ **Nâng minor (+0.6.x)**                                                                             |
| `@react-navigation/native`                      | `5.1.5`             | `6.1.18`             | ⬆️ **Nâng major (+1.x)**                                                                               |
| `@react-navigation/stack`                       | `5.14.4`            | `6.4.1`              | ⬆️ **Nâng major (+1.x)**                                                                               |
| `add`                                           | `^2.0.6`            | `2.0.6`              | 🟢 **Giữ nguyên**                                                                                      |
| `apisauce`                                      | `1.1.2`             | `1.1.2`              | 🟢 **Giữ nguyên**                                                                                      |
| `axios`                                         | `^0.24.0`           | `0.24.0`             | 🟢 **Giữ nguyên**                                                                                      |
| `crypto-js`                                     | `^4.1.1`            | `4.1.1`              | 🟢 **Giữ nguyên**                                                                                      |
| `formik`                                        | `2.2.9`             | `2.2.9`              | 🟢 **Giữ nguyên**                                                                                      |
| `i18n-js`                                       | `3.0.11`            | `3.0.11`             | 🟢 **Giữ nguyên**                                                                                      |
| `lodash`                                        | `4.17.21`           | `4.17.21`            | 🟢 **Giữ nguyên**                                                                                      |
| `lodash.throttle`                               | `4.1.1`             | `4.1.1`              | 🟢 **Giữ nguyên**                                                                                      |
| `mobx`                                          | `4.15.4`            | `6.15.0`             | ⬆️ **Nâng major (+2.x)**: Hỗ trợ JS runtime & React 18 tốt hơn.                                        |
| `mobx-react-lite`                               | `1.4.1`             | `4.1.1`              | ⬆️ **Nâng major (+3.x)**: Đồng bộ với MobX 6 & React 18.                                               |
| `mobx-state-tree`                               | `3.14.1`            | `7.0.2`              | ⬆️ **Nâng major (+4.x)**: Đồng bộ với MobX 6 & React 18.                                               |
| `moment`                                        | `2.29.1`            | `2.29.1`             | 🟢 **Giữ nguyên**                                                                                      |
| `ramda`                                         | `0.27.1`            | `0.27.1`             | 🟢 **Giữ nguyên**                                                                                      |
| `react`                                         | `17.0.2`            | `18.3.1`             | ⬆️ **Nâng major (+1.x)**: Bắt buộc đi cùng React Native 0.77.                                          |
| `react-native`                                  | `0.63.2`            | `0.77.0`             | ⬆️ **Mục tiêu nâng cấp (+0.13.8)**                                                                     |
| `react-native-animatable`                       | `1.3.3`             | `1.3.3`              | 🟢 **Giữ nguyên**                                                                                      |
| `react-native-barcode-mask`                     | `1.2.4`             | `1.2.4`              | 🟢 **Giữ nguyên**                                                                                      |
| `react-native-ble-manager`                      | `7.6.1`             | `12.5.1`             | ⬆️ **Nâng major (+5.x)**: Cập nhật Android Bluetooth API mới.                                          |
| `react-native-camera`                           | `3.43.6`            | ❌ _Đã gỡ bỏ_        | 🛑 **Loại bỏ**: Package bị archived/chết.                                                              |
| `react-native-capture-protection`               | `1.9.6`             | `1.9.6`              | 🟢 **Giữ nguyên**                                                                                      |
| `react-native-code-push`                        | `7.0.1`             | `8.2.1`              | ⬆️ **Nâng major (+1.x)**: Hỗ trợ Gradle 8+.                                                            |
| `react-native-date-picker`                      | `4.1.1`             | `4.1.1`              | 🟢 **Giữ nguyên**                                                                                      |
| `react-native-device-info`                      | `8.4.0`             | `15.0.2`             | ⬆️ **Nâng major (+7.x)**: Sửa lỗi biên dịch Android SDK 34+.                                           |
| `react-native-document-picker`                  | `^7.1.1`            | `9.3.1`              | ⬆️ **Nâng major (+2.x)**                                                                               |
| `react-native-dots-pagination`                  | `^0.2.0`            | `0.2.0`              | 🟢 **Giữ nguyên**                                                                                      |
| `react-native-draggable-flatlist`               | `3.1.1`             | `3.1.1`              | 🟢 **Giữ nguyên**                                                                                      |
| `react-native-drax`                             | `^0.9.3`            | `0.9.3`              | 🟢 **Giữ nguyên**                                                                                      |
| `react-native-dropdown-picker`                  | `^5.4.0`            | `5.4.0`              | 🟢 **Giữ nguyên**                                                                                      |
| `react-native-email`                            | `1.1.0`             | `1.1.0`              | 🟢 **Giữ nguyên**                                                                                      |
| `react-native-exit-app`                         | `^1.1.0`            | `1.1.0`              | 🟢 **Giữ nguyên**                                                                                      |
| `react-native-fast-image`                       | `8.5.11`            | `8.6.3`              | ↗️ **Nâng minor (+0.1.x)**: Hỗ trợ React 18 peer-dependency.                                           |
| `react-native-fbsdk-next`                       | `4.3.1`             | `13.4.3`             | ⬆️ **Nâng major (+9.x)**: Hỗ trợ Facebook SDK mới.                                                     |
| `react-native-fs`                               | `2.18.0`            | `2.18.0`             | 🟢 **Giữ nguyên**                                                                                      |
| `react-native-gesture-handler`                  | `2.5.0`             | `2.22.0`             | ↗️ **Nâng minor (+0.17.x)**: Tương thích với RN 0.77 / Reanimated 3.                                   |
| `react-native-highlight-words`                  | `^1.0.1`            | ❌ _Đã gỡ bỏ_        | 🛑 **Loại bỏ**: Package ngưng bảo trì, dính kẹt React 15.                                              |
| `react-native-iap`                              | `12.13.0`           | `13.0.4`             | ⬆️ **Nâng major (+1.x)**: Khắc phục lỗi `ObjectAlreadyConsumedException` trên RN 0.77.                 |
| `react-native-image-picker`                     | `5.0.0`             | `5.0.0`              | 🟢 **Giữ nguyên**                                                                                      |
| `react-native-image-viewer`                     | `^0.0.3`            | ❌ _Đã gỡ bỏ_        | 🛑 **Loại bỏ**: Package cũ dính React 15, trùng lặp với `image-zoom-viewer`.                           |
| `react-native-image-zoom-viewer`                | `^3.0.1`            | `3.0.1`              | 🟢 **Giữ nguyên**                                                                                      |
| `react-native-keyboard-aware-scroll-view`       | `0.9.4`             | `0.9.4`              | 🟢 **Giữ nguyên**                                                                                      |
| `react-native-keychain`                         | `6.1.1`             | `10.0.0`             | ⬆️ **Nâng major (+4.x)**: Hỗ trợ Android 12+/iOS 15+.                                                  |
| `react-native-linear-gradient`                  | `^2.5.6`            | `2.5.6`              | 🟢 **Giữ nguyên**                                                                                      |
| `react-native-localize`                         | `1.4.3`             | `3.7.0`              | ⬆️ **Nâng major (+2.x)**                                                                               |
| `react-native-mail`                             | `6.1.1`             | `6.1.1`              | 🟢 **Giữ nguyên**                                                                                      |
| `react-native-media-controls`                   | `2.3.0`             | `2.3.0`              | 🟢 **Giữ nguyên**                                                                                      |
| `react-native-media-meta`                       | `^0.0.11`           | ❌ _Đã gỡ bỏ_        | 🛑 **Loại bỏ**: Vỡ NDK/C++ build trên RN 0.77.                                                         |
| `react-native-modal`                            | `13.0.0`            | `13.0.0`             | 🟢 **Giữ nguyên**                                                                                      |
| `react-native-modal-datetime-picker`            | `11.0.0`            | `11.0.0`             | 🟢 **Giữ nguyên**                                                                                      |
| `react-native-modal-selector`                   | `2.1.0`             | `2.1.0`              | 🟢 **Giữ nguyên**                                                                                      |
| `react-native-music-control`                    | `1.4.1`             | `1.4.1`              | 🟢 **Giữ nguyên**                                                                                      |
| `react-native-navigation-bar-color`             | `2.0.1`             | `2.0.2`              | ↗️ **Nâng patch (+0.0.1)**                                                                             |
| `react-native-orientation-locker`               | `^1.4.0`            | `1.4.0`              | 🟢 **Giữ nguyên**                                                                                      |
| `react-native-pager-view`                       | `5.4.1`             | `6.5.3`              | ⬆️ **Nâng major (+1.x)**: Bắt buộc cho RN 0.73+.                                                       |
| `react-native-permissions`                      | `3.10.0`            | `3.10.0`             | 🟢 **Giữ nguyên**                                                                                      |
| `react-native-popover-view`                     | `4.1.0`             | `4.1.0`              | 🟢 **Giữ nguyên**                                                                                      |
| `react-native-push-notification`                | `^8.1.1`            | ❌ _Đã gỡ bỏ_        | 🛑 **Loại bỏ**: Không tương thích Android 13+ & Java 17.                                               |
| `react-native-qrcode-svg`                       | `6.1.1`             | `6.3.15`             | ↗️ **Nâng minor (+0.2.x)**: Để hỗ trợ `react-native-svg` v15.                                          |
| `react-native-reanimated`                       | `1.13.4`            | `3.16.7`             | ⬆️ **Nâng major (+2.x)**: Bắt buộc cho RN 0.77.                                                        |
| `react-native-safe-area-context`                | `0.7.3`             | `5.8.0`              | ⬆️ **Nâng major (+5.x)**: Bắt buộc cho RN 0.77 & React Navigation 6.                                   |
| `react-native-safe-area-view`                   | `1.1.1`             | `1.1.1`              | 🟢 **Giữ nguyên**                                                                                      |
| `react-native-screens`                          | `2.10.1`            | `4.5.0`              | ⬆️ **Nâng major (+2.x)**: Bắt buộc cho Kotlin/Android Fragment mới.                                    |
| `react-native-share`                            | `7.1.0`             | `7.1.0`              | 🟢 **Giữ nguyên**                                                                                      |
| `react-native-slider`                           | `0.11.0`            | `0.11.0`             | 🟢 **Giữ nguyên**                                                                                      |
| `react-native-snap-carousel`                    | _Git custom_        | _Git custom_         | 🟢 **Giữ nguyên link Git**                                                                             |
| `react-native-splash-screen`                    | `3.2.0`             | `3.2.0`              | 🟢 **Giữ nguyên**                                                                                      |
| `react-native-svg`                              | `12.1.1`            | `15.15.5`            | ⬆️ **Nâng major (+3.x)**: Sửa gãy C++ Bridge trên RN 0.77.                                             |
| `react-native-swipe-list-view`                  | `3.2.9`             | `3.2.9`              | 🟢 **Giữ nguyên**                                                                                      |
| `react-native-system-setting`                   | `^1.7.6`            | `1.7.6`              | 🟢 **Giữ nguyên**                                                                                      |
| `react-native-tab-view`                         | `3.1.1`             | `3.5.2`              | ↗️ **Nâng minor (+0.4.x)**: Khắc phục lỗi peer-dependency với RN mới.                                  |
| `react-native-toast-message`                    | `2.0.0`             | `2.0.0`              | 🟢 **Giữ nguyên**                                                                                      |
| `react-native-vector-icons`                     | `8.1.0`             | `10.3.0`             | ⬆️ **Nâng major (+2.x)**: Hỗ trợ Gradle & Glyph fonts mới.                                             |
| `react-native-video`                            | `5.1.1`             | `6.19.2`             | ⬆️ **Nâng major (+1.x)**: Thay thế ExoPlayer v1 cũ bị Google deprecated.                               |
| `react-native-video-controls`                   | _Git custom_        | _Git custom_         | 🟢 **Giữ nguyên link Git**                                                                             |
| `react-native-webview`                          | `^11.23.1`          | `11.23.1`            | 🟢 **Giữ nguyên**                                                                                      |
| `reactotron-mst`                                | `3.1.1`             | `3.1.12`             | ↗️ **Nâng patch (+0.0.11)**: Loại bỏ ràng buộc MobX 4 cũ.                                              |
| `reactotron-react-native`                       | `5.0.0`             | `5.1.18`             | ↗️ **Nâng minor (+0.1.x)**: Loại bỏ ràng buộc React 16 cũ.                                             |
| `realm`                                         | `10.8.0`            | `20.2.0`             | ⬆️ **Nâng major (+10.x)**: Tương thích với CMake & NDK của RN 0.77.                                    |
| `recyclerlistview`                              | `^4.1.0`            | `4.1.0`              | 🟢 **Giữ nguyên**                                                                                      |
| `rn-fetch-blob`                                 | _Git custom_        | _Git custom_         | 🟢 **Giữ nguyên link Git**                                                                             |
| `rn-qr-generator`                               | `1.2.1`             | `1.2.1`              | 🟢 **Giữ nguyên**                                                                                      |
| `rn-swipe-button`                               | `^1.3.6`            | `1.3.6`              | 🟢 **Giữ nguyên**                                                                                      |
| `validate.js`                                   | `0.13.1`            | `0.13.1`             | 🟢 **Giữ nguyên**                                                                                      |
| `yarn`                                          | `1.22.17`           | `1.22.17`            | 🟢 **Giữ nguyên**                                                                                      |
| `yup`                                           | `0.32.9`            | `0.32.9`             | 🟢 **Giữ nguyên**                                                                                      |

---

## III. Bảng So Sánh Development Dependencies (`devDependencies`)

| Thư viện                                        | Version cũ | Version mới   | Mức độ thay đổi & Lý do                                               |
| :---------------------------------------------- | :--------- | :------------ | :-------------------------------------------------------------------- |
| `@babel/core`                                   | `7.8.4`    | `^7.25.2`     | ⬆️ **Nâng minor (+0.17.x)**: Cần thiết cho Babel Transformer RN 0.77. |
| `@babel/plugin-proposal-decorators`             | `7.0.0`    | `^7.25.9`     | ⬆️ **Nâng minor (+0.25.x)**: Hỗ trợ Decorators trên MobX / TS mới.    |
| `@babel/plugin-proposal-optional-catch-binding` | `7.0.0`    | `^7.18.6`     | ⬆️ **Nâng minor (+0.18.x)**                                           |
| `@babel/preset-typescript`                      | `7.16.7`   | `^7.26.0`     | ⬆️ **Nâng minor (+0.10.x)**: Biên dịch TypeScript 5.0+.               |
| `@babel/runtime`                                | `7.8.4`    | `^7.25.0`     | ⬆️ **Nâng minor (+0.17.x)**                                           |
| `@storybook/addon-storyshots`                   | `5.3.19`   | ❌ _Đã gỡ bỏ_ | 🛑 **Loại bỏ**: Xung đột Babel/Webpack với Metro 0.77.                |
| `@storybook/react-native`                       | `5.3.19`   | ❌ _Đã gỡ bỏ_ | 🛑 **Loại bỏ**                                                        |
| `@storybook/react-native-server`                | `5.3.19`   | ❌ _Đã gỡ bỏ_ | 🛑 **Loại bỏ**                                                        |
| `@types/i18n-js`                                | `3.0.3`    | `3.0.3`       | 🟢 **Giữ nguyên**                                                     |
| `@types/jest`                                   | `25.2.3`   | `^29.5.13`    | ⬆️ **Nâng major (+4.x)**: Khớp với Jest 29.                           |
| `@types/lodash`                                 | `4.14.172` | `^4.14.190`   | ↗️ **Nâng patch (+0.0.18)**                                           |
| `@types/ramda`                                  | `0.26.44`  | `0.26.44`     | 🟢 **Giữ nguyên**                                                     |
| `@types/react`                                  | `^17.0.38` | `^18.2.6`     | ⬆️ **Nâng major (+1.x)**: Khớp với React 18.3.1.                      |
| `@types/react-native`                           | `0.63.2`   | ❌ _Đã gỡ bỏ_ | 🛑 **Loại bỏ**: Đã được tích hợp sẵn vào `react-native` từ RN 0.71+.  |
| `@types/react-test-renderer`                    | `16.9.2`   | `^18.0.0`     | ⬆️ **Nâng major (+2.x)**                                              |
| `@typescript-eslint/eslint-plugin`              | `2.27.0`   | ❌ _Đã gỡ bỏ_ | 🛑 **Thay thế**: Đã được gom gọn trong `@react-native/eslint-config`. |
| `@typescript-eslint/parser`                     | `2.27.0`   | ❌ _Đã gỡ bỏ_ | 🛑 **Thay thế**                                                       |
| `babel-jest`                                    | `25.1.0`   | `^29.6.3`     | ⬆️ **Nâng major (+4.x)**                                              |
| `babel-plugin-module-resolver`                  | `4.1.0`    | `^5.0.2`      | ⬆️ **Nâng major (+1.x)**                                              |
| `babel-plugin-transform-remove-console`         | `6.9.4`    | `^6.9.4`      | 🟢 **Giữ nguyên**                                                     |
| `eslint`                                        | `6.8.0`    | `^8.19.0`     | ⬆️ **Nâng major (+2.x)**: Để đọc được cú pháp TS 5.x.                 |
| `eslint-config-prettier`                        | `6.0.0`    | ❌ _Đã gỡ bỏ_ | 🛑 **Thay thế**: Đã có sẵn trong config ESLint mới.                   |
| `eslint-config-standard`                        | `14.1.0`   | ❌ _Đã gỡ bỏ_ | 🛑 **Loại bỏ**: Tránh xung đột rule với RN 0.77.                      |
| `eslint-plugin-*` (7 packages)                  | Various    | ❌ _Đã gỡ bỏ_ | 🛑 **Thay thế**: Đã nằm trong `@react-native/eslint-config`.          |
| `ignite-bowser`                                 | `5.4.1`    | ❌ _Đã gỡ bỏ_ | 🛑 **Loại bỏ**: Boilerplate CLI không cần thiết.                      |
| `jest`                                          | `25.5.4`   | `^29.6.3`     | ⬆️ **Nâng major (+4.x)**: Tương thích Node 20 & Java 17.              |
| `jetifier`                                      | `1.6.2`    | ❌ _Đã gỡ bỏ_ | 🛑 **Loại bỏ**: RN 0.77 đã mặc định dùng AndroidX.                    |
| `metro-react-native-babel-preset`               | `0.59.0`   | ❌ _Thay thế_ | ⚠️ **Đổi tên package** sang `@react-native/babel-preset` (`0.77.0`).  |
| `npm-run-all`                                   | `4.1.5`    | `4.1.5`       | 🟢 **Giữ nguyên**                                                     |
| `patch-package`                                 | `6.2.2`    | `^8.0.0`      | ⬆️ **Nâng major (+2.x)**: Tương thích Node 20.                        |
| `postinstall-prepare`                           | `1.0.1`    | ❌ _Đã gỡ bỏ_ | 🛑 **Loại bỏ**                                                        |
| `prettier`                                      | `2.0.4`    | `2.8.8`       | ↗️ **Nâng minor (+0.8.x)**                                            |
| `react-devtools-core`                           | `4.8.2`    | ❌ _Đã gỡ bỏ_ | 🛑 **Loại bỏ**: Đã có sẵn trong Reactotron / RN CLI.                  |
| `react-native-svg-transformer`                  | `0.14.3`   | `^1.5.0`      | ⬆️ **Nâng major (+1.x)**: Tương thích với Metro Config v0.77.         |
| `react-powerplug`                               | `1.0.0`    | `1.0.0`       | 🟢 **Giữ nguyên**                                                     |
| `react-test-renderer`                           | `16.13.1`  | `18.3.1`      | ⬆️ **Nâng major (+2.x)**: Khớp chính xác với version của `react`.     |
| `rimraf`                                        | `3.0.2`    | `3.0.2`       | 🟢 **Giữ nguyên**                                                     |
| `solidarity`                                    | `3.0.0`    | ❌ _Đã gỡ bỏ_ | 🛑 **Loại bỏ**                                                        |
| `typescript`                                    | `3.9.7`    | `5.0.4`       | ⬆️ **Nâng major (+1.x)**: RN 0.77 yêu cầu tối thiểu TypeScript 5.0+.  |

---

## IV. Chi Tiết Lý Do Loại Bỏ 5 Thư Viện Main Dependencies

1. **`react-native-camera`**

   - **Bằng chứng từ npm:** Đã phát hành từ 5 năm trước (v4.2.1). Ngay trên README, tác giả đã đưa ra thông báo chính thức chuẩn bị deprecate và đề xuất chuyển sang `react-native-vision-camera` hoặc `expo-camera`.
   - **Lý do kỹ thuật:** Mã nguồn Native Android cũ sử dụng Camera1 API đã bị Google khai tử, hoàn toàn không biên dịch được trên Android Gradle Plugin 8+, Java 17 và Android 16 (SDK 36).
   - **Giải pháp thay thế:**
     - Quét QR/Chụp ảnh Native: Sử dụng **`react-native-vision-camera`** (thư viện tiêu chuẩn hiện nay).
     - Giao diện khung quét mã: Project đã có sẵn **`react-native-barcode-mask`**.
     - Chọn ảnh/video từ máy: Project đã có sẵn **`react-native-image-picker`**.

2. **`react-native-highlight-words`**

   - **Bằng chứng từ npm:** Bản v1.0.1 đã phát hành từ **9 năm trước** và dừng phát triển hoàn toàn.
   - **Lý do kỹ thuật:** Thư viện bị kẹt `peerDependencies` bắt buộc React 15 (`react@"^15.5.0"`), gây lỗi xung đột cây phụ thuộc (`ERESOLVE`) không thể cài đặt với React 18.3.1.
   - **Giải pháp thay thế:** Tự viết Custom Component bằng JS thuần (sử dụng component `<Text>` của React Native kết hợp `String.prototype.split()`) để tô màu từ khóa tìm kiếm mà không cần cài thêm thư viện ngoài.

3. **`react-native-image-viewer`**

   - **Bằng chứng từ npm:** Phát hành từ **10 năm trước** (v0.0.3), lượt tải cực thấp (16 downloads/tuần). Tiêu đề README ghi rõ `(iOS only)` - hoàn toàn không hỗ trợ Android.
   - **Lý do kỹ thuật:** Không hỗ trợ Android, dính kẹt React 15 và không còn tương thích với RN 0.77.
   - **Giải pháp thay thế:** Trong `dependencies` của project **đã có sẵn `react-native-image-zoom-viewer`** (thư viện chuẩn hỗ trợ xem và zoom ảnh đa nền tảng iOS/Android).

4. **`react-native-media-meta`**

   - **Bằng chứng từ npm:** Phát hành từ **6 năm trước** (v0.0.11), hướng dẫn cài đặt vẫn còn dùng câu lệnh cổ đại `$ react-native link` (thời RN < 0.60 chưa có Autolinking).
   - **Lý do kỹ thuật:** Mã nguồn C++ Native NDK cũ không còn khớp với các file C++ Header trong Android NDK/CMake mới của RN 0.77, gây lỗi vỡ build Native 100%.
   - **Giải pháp thay thế:**
     - Lấy thông tin file/dung lượng: Sử dụng **`react-native-fs`** (v2.18.0) có sẵn trong project.
     - Lấy metadata video (duration, resolution): Sử dụng callback `onLoad` của **`react-native-video`** (v6.19.2) có sẵn trong project.

5. **`react-native-push-notification`**
   - **Bằng chứng từ npm:** Dừng cập nhật từ **5 năm trước** (v8.1.1).
   - **Lý do kỹ thuật:** Thư viện thiếu hoàn toàn logic quản lý Notification Channel mới và cơ chế xin quyền `POST_NOTIFICATIONS` bắt buộc từ Android 13 (API 33) đến Android 16 (API 36), dẫn đến việc ứng dụng bị crash lập tức khi nhận thông báo trên Android đời mới.
   - **Giải pháp thay thế:**
     - Push Notifications từ Server: Sử dụng **`@react-native-firebase/messaging`** (v25.1.0) đã nâng cấp sẵn trong project.
     - Local Notifications (thông báo nội bộ/hẹn giờ): Chuyển sang sử dụng **`@notifee/react-native`** (thư viện chuẩn hiện nay thay thế cho `react-native-push-notification`).
