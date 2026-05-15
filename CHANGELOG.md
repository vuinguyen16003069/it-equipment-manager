# Changelog

Tất cả các thay đổi đáng kể đối với dự án này sẽ được ghi lại trong tệp này.

## [2026-05-16]
### Added
- **Trang Chi tiết thiết bị (Full Page Detail)**: Triển khai trang xem chi tiết thiết bị chuyên nghiệp, thay thế cho hệ thống Quick View Modal. Trang được thiết kế với bố cục đồng nhất hoàn toàn với trang Chỉnh sửa, mang lại trải nghiệm người dùng liền mạch và tin cậy.
- **Quản lý Avatar người dùng**: 
    - Bổ sung trường `avatar` vào model User.
    - Tích hợp `multer` và dịch vụ `ImgBB` để hỗ trợ người dùng upload ảnh đại diện trực tiếp.
    - Cập nhật luồng xử lý JWT để đồng bộ ảnh đại diện ngay lập tức sau khi thay đổi.
    - Thiết kế UI Avatar dạng tròn chuyên nghiệp trên Header và trang Cá nhân.
- **Cải thiện UI/UX**:
    - Tối ưu hóa các nút bấm "Sửa", "Thoát" và nhãn trạng thái trên trang Chi tiết để đạt độ thẩm mỹ cao nhất.
    - Đồng bộ hóa các hiệu ứng tương tác (`hover`, `active scale`, `shadow`) trên toàn bộ các trang mới.

### Fixed
- **Xử lý sự kiện (Event Handling)**: Khắc phục lỗi xung đột khi click vào dòng thiết bị và các nút thao tác nhanh, đảm bảo các nút Sửa/Xóa hoạt động độc lập.
- **Lỗi hiển thị CSS**: Xử lý vấn đề bảng thông tin (Modal) bị đẩy xuống cuối trang bằng cách chuyển đổi sang trang chi tiết toàn diện.
- **Lỗi cú pháp (JS Syntax)**: Vá lỗi `Declaration or statement expected` trong script tại trang danh sách thiết bị, đảm bảo tính năng Export CSV và các logic frontend hoạt động ổn định.

---

## [2026-05-09]
### Added
- **Hệ thống quản lý thiết bị**: Triển khai đầy đủ các tính năng CRUD (Thêm, Sửa, Xóa, Xem) thiết bị IT.
- **Xác thực người dùng**: Hệ thống đăng nhập, đăng ký với JWT và phân quyền (Admin/User).
- **Tìm kiếm & Bộ lọc**: Hỗ trợ tìm kiếm thiết bị theo tên, loại và trạng thái.
- **Dịch vụ thông báo**: Tích hợp hệ thống thông báo nội bộ cho người dùng.
- **Xác thực OTP qua Email**: Triển khai hệ thống gửi mã OTP qua Gmail khi đăng ký tài khoản và khôi phục mật khẩu.
- **Bảo mật & Phân quyền dữ liệu**: Vá lỗi bảo mật nghiêm trọng (BOLA), ràng buộc quyền sở hữu thiết bị cho từng người dùng.
- **Seeding Data**: Script tự động tạo dữ liệu mẫu và tài khoản admin ban đầu.
- **Nâng cao trải nghiệm tương tác (UX)**: Bổ sung hiệu ứng bàn tay (`cursor-pointer`) và phản hồi hình ảnh (`active:scale`) cho toàn bộ nút bấm, liên kết, dòng trong bảng và các thành phần tương tác trên mọi trang.
- **Cải thiện Console**: Tích hợp `cfonts` để hiển thị Banner khởi động nghệ thuật và làm mới màu sắc thông báo trạng thái Server/Database.

### Fixed
- Cấu hình lại điểm đầu vào ứng dụng (`main entry point`) và tối ưu hóa các scripts `start`, `dev`, `build`.
- Cải thiện hệ thống Rate Limiting để bảo vệ các tuyến đường xác thực.
- **Quản lý thiết bị**: Vá lỗi bảo mật nghiêm trọng (BOLA), ràng buộc quyền sở hữu thiết bị cho từng người dùng.
- **README Resources**: Vá lỗi hiển thị hình ảnh động (Typing SVG) bằng cách mã hóa URL chuẩn xác.
- **Lint Optimization**: Tối ưu hóa mã nguồn, loại bỏ các lỗi cảnh báo về `template literals` không cần thiết.

---

## [2026-03-15]
### Added
- **Giao diện người dùng (UI/UX)**: Cải thiện toàn diện giao diện theo phong cách hiện đại, chuyên nghiệp.
- **Đăng ký người dùng**: Tính năng đăng ký tài khoản mới với hệ thống validation và giới hạn tần suất (Rate limiting).
- **Khởi tạo dự án**: Bản cam kết đầu tiên, thiết lập cấu trúc thư mục cơ bản.

### Fixed
- Các lỗi nhỏ về tài liệu và cấu hình hệ thống.
- Hotfix và tự động cập nhật phiên bản.

---

## [Thông tin thêm]
Dự án được xây dựng dựa trên:
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Frontend**: EJS, Tailwind CSS
- **Tools**: Biome (Linting/Formatting)
