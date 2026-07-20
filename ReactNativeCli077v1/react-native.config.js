const path = require('path');

module.exports = {
  dependencies: {
    'react-native-code-push': {
      platforms: {
        // Trỏ Autolink về đúng thư mục chứa Gradle thực sự của CodePush bằng đường dẫn tuyệt đối
        android: {
          sourceDir: path.resolve(__dirname, 'node_modules/react-native-code-push/android/app'),
        },
      },
    },
  },
};

