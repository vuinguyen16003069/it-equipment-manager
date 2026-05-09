# Changelog

Tất cả các thay đổi đáng kể đối với dự án này sẽ được ghi lại trong tệp này.

## [2026-05-09]
### Added
- **Hệ thống quản lý thiết bị**: Triển khai đầy đủ các tính năng CRUD (Thêm, Sửa, Xóa, Xem) thiết bị IT.
- **Xác thực người dùng**: Hệ thống đăng nhập, đăng ký với JWT và phân quyền (Admin/User).
- **Tìm kiếm & Bộ lọc**: Hỗ trợ tìm kiếm thiết bị theo tên, loại và trạng thái.
- **Dịch vụ thông báo**: Tích hợp hệ thống thông báo nội bộ cho người dùng.
- **Xác thực OTP qua Email**: Triển khai hệ thống gửi mã OTP qua Gmail khi đăng ký tài khoản và khôi phục mật khẩu.
- **Bảo mật & Phân quyền dữ liệu**: Vá lỗi bảo mật nghiêm trọng (BOLA), ràng buộc quyền sở hữu thiết bị cho từng người dùng.
- **Seeding Data**: Script tự động tạo dữ liệu mẫu và tài khoản admin ban đầu.

### Fixed
- Cấu hình lại điểm đầu vào ứng dụng (`main entry point`) và tối ưu hóa các scripts `start`, `dev`, `build`.
- Cải thiện hệ thống Rate Limiting để bảo vệ các tuyến đường xác thực.
- **Quản lý thiết bị**: Vá lỗi bảo mật nghiêm trọng (BOLA), ràng buộc quyền sở hữu thiết bị cho từng người dùng.

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
