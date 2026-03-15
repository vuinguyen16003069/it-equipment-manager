# IT Equipment Manager

Ứng dụng web quản lý danh sách thiết bị IT nội bộ, xây dựng bằng **Node.js / Express.js** theo kiến trúc MVC + Services layer.

---

## Tính năng

- **Xác thực**: Đăng nhập / đăng xuất với JWT lưu trong HttpOnly cookie
- **Phân quyền**: Role `admin` (toàn quyền CRUD) và `viewer` (chỉ xem)
- **Quản lý thiết bị**: Thêm, sửa, xóa, tìm kiếm và lọc theo loại / trạng thái
- **Phân trang**: Server-side pagination (10 thiết bị / trang)
- **Flash messages**: Thông báo thành công sau mỗi thao tác CRUD
- **Bảo mật**: Helmet CSP, rate limiting đăng nhập (10 req / 15 phút), bcrypt, ReDoS prevention
- **Xử lý lỗi**: Middleware 404 + global error handler tập trung
- **Graceful shutdown**: Đóng kết nối MongoDB sạch khi nhận SIGTERM / SIGINT

---

## Tech Stack

| Thành phần | Công nghệ |
|---|---|
| Runtime | Node.js |
| Framework | Express.js v5 |
| Template Engine | EJS v4 |
| Database | MongoDB via Mongoose v9 |
| Authentication | JWT + bcrypt |
| Validation | Joi |
| CSS | Tailwind CSS v4 |
| Security | Helmet, express-rate-limit |
| Dev Tools | Nodemon, Morgan, Biome |

---

## Cấu trúc thư mục

```
src/
├── bin/
│   ├── www.js              # HTTP server entry point + graceful shutdown
│   └── seed.js             # Script tạo dữ liệu mẫu
├── controllers/            # Xử lý request / response
├── helpers/
│   ├── constants.js        # Nguồn duy nhất cho ENUM values
│   └── validation.js       # Joi schemas
├── middleware/
│   ├── authMiddleware.js   # JWT guard (requireAuth, requireAdmin)
│   └── errorHandler.js     # 404 + global error handler
├── models/                 # Mongoose schemas (User, Equipment)
├── routes/                 # Đăng ký routes
├── services/               # Business logic (tách khỏi controller)
├── views/                  # EJS templates
│   ├── layouts/            # Header, sidebar, footer components
│   ├── auth/               # Trang đăng nhập
│   ├── equipment/          # Danh sách, tạo mới, chỉnh sửa
│   └── error.ejs
├── public/                 # Static files (CSS, images)
├── input.css               # Tailwind CSS input
└── index.js                # App bootstrap
```

---

## Cài đặt & Chạy

### Yêu cầu

- Node.js >= 18
- MongoDB >= 6 (local hoặc Atlas)

### Các bước

```bash
# 1. Clone dự án
git clone <repo-url>
cd <project-folder>

# 2. Cài dependencies
npm install

# 3. Tạo file cấu hình môi trường
cp .env.example .env
# Chỉnh sửa .env: MONGO_URI, JWT_SECRET, PORT

# 4. Build Tailwind CSS
npm run tw:build

# 5. (Tuỳ chọn) Tạo dữ liệu mẫu
npm run seed

# 6. Khởi động server
npm start
```

Truy cập: `http://localhost:3000`

Tài khoản mặc định sau khi seed:
- **Username**: `admin`
- **Password**: `admin123`

---

## Scripts

| Lệnh | Mô tả |
|---|---|
| `npm start` | Khởi động server với nodemon |
| `npm run seed` | Tạo dữ liệu mẫu (10 thiết bị + 1 admin) |
| `npm run tw:build` | Build Tailwind CSS một lần |
| `npm run tw:watch` | Watch & rebuild Tailwind CSS |
| `npm run lint` | Kiểm tra code với Biome |
| `npm run lint:fix` | Tự động sửa lỗi lint |
| `npm run format` | Format code với Biome |

---

## Biến môi trường

| Biến | Mô tả | Ví dụ |
|---|---|---|
| `PORT` | Cổng lắng nghe | `3000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://127.0.0.1:27017/it_equipment` |
| `JWT_SECRET` | Khoá bí mật JWT (≥ 64 bytes) | *(chuỗi hex ngẫu nhiên)* |
| `NODE_ENV` | Môi trường chạy | `development` / `production` |

---

## Tác giả

**vuinguyen16003069** — *G3K*

---

## Giấy phép

Dự án được phân phối theo giấy phép **MIT**. Xem file [LICENSE](LICENSE) để biết thêm chi tiết.
