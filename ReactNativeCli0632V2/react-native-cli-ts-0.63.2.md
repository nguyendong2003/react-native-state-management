# Hướng dẫn Cấu hình TypeScript cho React Native 0.63.2 & React 17.0.2

Tài liệu này hướng dẫn cách nâng cấp dự án React Native 0.63.2 từ JavaScript (JS) sang TypeScript (TS) sau khi đã thiết lập các bước ở tài liệu `react-native-cli-0.63.2.md`.

---

## 1. Cài đặt các thư viện liên quan đến TypeScript

Chạy lệnh dưới đây để cài đặt TypeScript cùng với các tệp định nghĩa kiểu (types) tương thích với React 17 và React Native 0.63:

```bash
npm install --save-dev typescript @types/react@^17.0.0 @types/react-native@~0.63.0 @types/jest @types/react-test-renderer@^17.0.0
```

*   **Lưu ý**:
    *   `@types/react` bản `^17.0.0` để khớp với React `17.0.2`.
    *   `@types/react-native` bản `~0.63.0` để khớp với React Native `0.63.2`.

---

## 2. Tạo File Cấu hình `tsconfig.json`

Tạo file `tsconfig.json` tại thư mục gốc của dự án (ngang hàng với `package.json`) với nội dung sau:

```json
{
  "compilerOptions": {
    "allowJs": true,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "isolatedModules": true,
    "jsx": "react-native",
    "lib": ["es2015", "es2016", "es2017", "es2018", "esnext"],
    "moduleResolution": "node",
    "noEmit": true,
    "strict": true,
    "target": "esnext"
  },
  "exclude": [
    "node_modules",
    "babel.config.js",
    "metro.config.js",
    "jest.config.js"
  ]
}
```

---

## 3. Chuyển đổi file từ `.js` sang `.tsx` / `.ts`

1.  Đổi tên file giao diện chính `App.js` thành `App.tsx`.
2.  Nếu file `App.tsx` sử dụng định dạng Flow (như `// @flow strict-local` ở đầu file), hãy xóa dòng này đi vì TypeScript sẽ thay thế hoàn toàn Flow.
3.  Cập nhật cú pháp TypeScript trong `App.tsx` nếu cần (ví dụ: gán kiểu dữ liệu cho component, props, state).
4.  File `index.js` vẫn giữ nguyên định dạng `.js` để làm file entry chính. Dòng import `import App from './App';` trong `index.js` sẽ tự động nhận diện file `App.tsx` mà không cần thay đổi code.

---

## 4. Chạy lại Ứng dụng

Sau khi đổi tên file và cài đặt các thư viện mới, Metro Bundler cần được xóa cache để quét lại toàn bộ phần mở rộng mới (`.ts`, `.tsx`):

1.  **Restart Metro Bundler với cache reset**:
    ```bash
    npx react-native start --reset-cache
    ```

2.  **Chạy ứng dụng Android**:
    ```bash
    npx react-native run-android
    ```
