# Kiến thức về React Native State Management

## State là gì?

- Bài viết tham khảo: https://tech.cybozu.vn/phan-biet-cac-loai-state-va-cach-quan-ly-state-trong-ung-dung-react-13211/
- Trong React, **State (trạng thái)** là một đối tượng JavaScript được sử dụng để lưu trữ dữ liệu nội bộ của một component.
- Khi dữ liệu trong state thay đổi, React sẽ tự động render (vẽ lại) component đó trên giao diện để cập nhật những thay đổi mới nhất cho người dùng.

## Các loại State trong React

- Dù tất cả đều phục vụ mục đích lưu trữ dữ liệu, dựa trên phạm vi ảnh hưởng và cách quản lý, state trong React thường được chia thành 4 loại chính:

1. **Local State (Trạng thái cục bộ)**

- Định nghĩa: Local state là trạng thái được khởi tạo, quản lý và sở hữu hoàn toàn bởi một component duy nhất (và có thể được truyền xuống các component con trực tiếp của nó thông qua props).
- Tính chất: Khép kín và có vòng đời gắn liền với component chứa nó. Khi component bị hủy (unmount), local state cũng biến mất.

2. **Global State (Trạng thái toàn cục)**

- Định nghĩa: Global state là trạng thái được duy trì ở một không gian lưu trữ chung (Store hoặc Context) nằm ngoài cây component thông thường, cho phép nhiều component ở bất kỳ vị trí nào trong ứng dụng đều có thể truy cập và thay đổi trực tiếp mà không cần truyền prop thủ công qua nhiều cấp (prop drilling). Chia sẻ dữ liệu cho nhiều tầng component mà không cần truyền props qua từng cấp (Prop Drilling).
- Tính chất: Có phạm vi ảnh hưởng toàn hệ thống. Vòng đời của nó thường kéo dài suốt thời gian ứng dụng chạy (hoặc cho đến khi người dùng F5 tải lại trang).
- Mục đích: Đồng bộ hóa dữ liệu giữa các luồng nghiệp vụ khác nhau hoặc các UI component độc lập.
- Ví dụ chuẩn: Thông tin xác thực người dùng (Auth token/Profile), cài đặt ngôn ngữ (i18n), giỏ hàng thương mại điện tử

3. **Server State (Trạng thái từ máy chủ)**

- Định nghĩa: Server state là một bản sao lưu tạm thời (cache) tại máy khách (client) của dữ liệu được lưu trữ vật lý trên máy chủ. Nó có đặc tính bất đồng bộ, nằm ngoài tầm kiểm soát trực tiếp của ứng dụng React và có thể bị lỗi thời (stale) bất cứ lúc nào nếu dữ liệu trên database thay đổi.

- Tính chất: Cần các cơ chế đồng bộ hóa (fetching, caching, mutating, và revalidating) để đảm bảo tính nhất quán giữa client và server.

- Mục đích: Quản lý vòng đời dữ liệu từ xa, xử lý các trạng thái trung gian của quá trình mạng (loading, error, success).

- Ví dụ chuẩn: Danh sách sản phẩm lấy từ API `https://api.example.com/products`, kết quả tìm kiếm từ database.

4. **URL State (Trạng thái URL)**

- Định nghĩa: URL state là trạng thái của ứng dụng được mã hóa và lưu trữ trực tiếp trên thanh địa chỉ của trình duyệt thông qua đường dẫn (path params) hoặc tham số truy vấn (query params).

- Tính chất: Tồn tại độc lập với bộ nhớ RAM của ứng dụng React. Nó được quản lý bởi lịch sử trình duyệt (Browser History API) và có khả năng khôi phục nguyên vẹn trạng thái hiển thị của ứng dụng khi người dùng tải lại trang, chia sẻ liên kết (deep linking) hoặc nhấn nút Back/Forward.

- Mục đích: Định vị tài nguyên cụ thể và lưu giữ cấu hình hiển thị của bộ lọc hoặc phân trang mà người dùng đang tương tác.

- Ví dụ chuẩn: `/products/123` (ID sản phẩm là 123) hoặc `/search?q=laptop&sort=price_asc` (từ khóa tìm kiếm và chế độ sắp xếp).

## Lưu ý tránh nhầm về state

- Trong React có 2 cách phân loại state

### Cách 1: Phân loại theo PHẠM VI TRUY CẬP (Có 4 loại)

- Tiêu chí: Dữ liệu này được dùng ở đâu trên giao diện và ai có quyền đọc/ghi nó?
- Cách phân loại này chia ứng dụng thành 4 vùng rõ rệt như chúng ta đã thảo luận ở trên:

1. `Local State`: Nằm gói gọn trong 1 component.
2. `Global State`: Nằm ở kho chung, component nào cũng với tới được.
3. `Server State`: Dữ liệu được bê từ máy chủ về.
4. `URL State`: Dữ liệu nằm trên thanh địa chỉ trình duyệt.

### Cách 2: Phân loại theo NGUỒN GỐC & QUYỀN SỞ HỮU (Có 2 loại chính)

- Tiêu chí: Dữ liệu này do ai sinh ra, ai sở hữu và lưu trữ gốc ở đâu?
- Dưới góc nhìn kiến trúc này (được phổ biến rộng rãi bởi tác giả của thư viện React Query), toàn bộ dữ liệu trong app chỉ được chia làm 2 nhóm lớn: `Client State` và `Server State`.

1. `Client State` (Trạng thái phía máy khách)

- Khái niệm: Là tất cả những dữ liệu được sinh ra và sở hữu hoàn toàn bởi chính ứng dụng React (Client) của bạn. Nó không liên quan gì đến database hay API bên ngoài. Nếu bạn tắt app hoặc F5, dữ liệu này sẽ mất (hoặc reset về mặc định).
- Mối quan hệ: Local State, Global State, URL State (ở Cách 1) thực chất đều thuộc về `Client State`.
- Ví dụ: Trạng thái đóng/mở sidebar, theme Sáng/Tối, danh sách filter người dùng bấm chọn, dữ liệu đang nhập dở trong form.

2. `Server State` (Trạng thái phía máy chủ)

- Khái niệm: Dữ liệu này không thuộc sở hữu của React. Nó được lưu giữ vật lý tại Database/Server. Ứng dụng React chỉ gọi API để "mượn" một bản sao của dữ liệu đó về hiển thị tạm thời trên màn hình mà thôi.
- Mối quan hệ: Nó chính là Server State ở Cách 1. Vì tính chất của nó là bất đồng bộ (cần thời gian tải, có thể bị cũ/stale, cần cache), nên nó cần một tư duy quản lý hoàn toàn khác với Client State.
- Ví dụ: Danh sách sản phẩm, thông tin trang cá nhân của user lấy từ database.

## Các cách quản lý state trong React Native

### 1. Công cụ & Thư viện quản lý CLIENT STATE

- Nhiệm vụ: Quản lý các trạng thái giao diện (UI/UX) do chính ứng dụng sinh ra dưới thiết bị của người dùng.

- Nhóm này được chia nhỏ tiếp theo phạm vi lưu trữ của dữ liệu:

#### 1. Quản lý ở cấp độ Cục bộ (Local Client State)

- Dành cho các trạng thái nằm gói gọn trong một hoặc một vài component gần nhau.

- Tích hợp sẵn: useState, useReducer, useRef.

- Quản lý Form (Biểu mẫu): React Hook Form (Khuyên dùng): Giúp nhập liệu mượt mà, không bị giật lag nhờ cơ chế giảm thiểu tối đa số lần re-render.

- Formik: Giải pháp truyền thống cho các form đơn giản.

#### 2. Quản lý ở cấp độ Toàn cục (Global Client State)

- Dành cho các trạng thái cần chia sẻ xuyên suốt toàn bộ ứng dụng (F5 sẽ mất dữ liệu trừ khi cấu hình thêm lưu trữ vào LocalStorage).

- Tích hợp sẵn: Context API (Phù hợp cho dự án nhỏ hoặc dữ liệu ít thay đổi như Theme, Ngôn ngữ).

- `Zustand` (Thịnh hành nhất hiện nay): Cực nhẹ, viết code siêu ngắn, hiệu năng cao.

- `Redux Toolkit` (Chuẩn doanh nghiệp): Rất chặt chẽ, phù hợp cho dự án cực lớn cần quy chuẩn nghiêm ngặt.

- `Jotai / Recoil`: Quản lý state dạng "nguyên tử" (Atomic), tối ưu cho các màn hình có UI cực kỳ phức tạp và tương tác chéo liên tục.

- `MobX / Valtio`: Quản lý theo hướng lập trình phản ứng (Reactive/Proxy).

#### 3. Quản lý trên thanh địa chỉ (URL Client State)

- Dành cho các trạng thái cần "sống sót" qua phím F5 hoặc có thể copy link gửi cho người khác.
  - `React Router (react-router-dom)`: Cho ứng dụng React Web truyền thống.

  - `Next.js Router (next/navigation)`: Cho ứng dụng React chạy trên framework Next.js.

  - `React Navigation`: Cho ứng dụng di động React Native (kết hợp cấu hình Deep Linking).

### 2. Thư viện quản lý SERVER STATE

- Nhiệm vụ: Quản lý bản sao dữ liệu lấy từ API/Database về, tự động hóa việc lưu bộ nhớ đệm (cache) và đồng bộ dữ liệu ngầm.

- Trước đây, lập trình viên thường tải dữ liệu từ API về rồi "nhét" chung vào Redux hay Context. Cách làm đó hiện nay được coi là một "anti-pattern" (sai lầm thiết kế) vì nó khiến Client State bị phình to và quá tải.

- Giờ đây, chúng ta dùng các thư viện chuyên dụng cho Server State dưới đây để tự động xử lý các tác vụ phức tạp như: Loading, Error, Caching, Tự động tải lại dữ liệu khi mất/có mạng lại, Phân trang, Tránh trùng lặp request.

- `TanStack Query (React Query)` (Tiêu chuẩn số 1 hiện tại): Thư viện mạnh mẽ nhất, hoạt động cực kỳ mượt mà với REST API.
  - Nó quản lý trạng thái dữ liệu theo các mốc thời gian (Fresh, Stale, Inactive) để tự động quyết định khi nào cần gọi lại API ngầm nhằm cập nhật giao diện mà không làm phiền người dùng.

- `SWR` (Stale-While-Revalidate): Thư viện siêu nhẹ do chính Vercel (cha đẻ của Next.js) phát triển.
  - Hoạt động theo cơ chế: Trả ngay dữ liệu cũ đang lưu trong cache cho người dùng xem trước, đồng thời âm thầm gọi API để lấy dữ liệu mới nhất đè lên sau.

- `RTK Query (Redux Toolkit Query)`:
  - Bộ công cụ đi kèm sẵn trong Redux Toolkit. Nếu dự án của bạn đã chọn Redux để quản lý Client State, bạn nên dùng luôn RTK Query cho Server State để không phải cài thêm thư viện ngoài.

- `Apollo Client / Relay`:
  - Cặp công cụ tối cao nếu hệ thống của bạn sử dụng công nghệ GraphQL thay vì REST API thông thường.

## Bảng tổng hợp toàn diện các công cụ quản lý State trong React/React Native

| Nhóm lớn                                       | Phân loại nhỏ            | Công cụ/Thư viện tiêu biểu                         |
| :--------------------------------------------- | :----------------------- | :------------------------------------------------- |
| **CLIENT STATE**<br>(Dữ liệu do React quản lý) | **Local**<br>(Cục bộ)    | `useState`, `useReducer`, `React Hook Form`        |
|                                                | **Global**<br>(Toàn cục) | `Zustand`, `Context API`, `Redux Toolkit`, `Jotai` |
|                                                | **URL**<br>(Đường dẫn)   | `React Router`, `Next.js Router`                   |
| **SERVER STATE**<br>(Dữ liệu từ Server/DB)     | **REST API**             | `TanStack Query (React Query)`, `SWR`, `RTK Query` |
|                                                | **GraphQL API**          | `Apollo Client`, `Relay`                           |
