# 🖥️ IT EQUIPMENT MANAGER

<div align="center">

<img src="https://img.shields.io/badge/version-1.0.0-blue.svg?style=for-the-badge&logo=appveyor" alt="Version">
<img src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=for-the-badge&logo=mit" alt="License">
<img src="https://img.shields.io/badge/Node.js-%3E%3D%2018.0.0-339933.svg?style=for-the-badge&logo=node.js" alt="Node.js">
<img src="https://img.shields.io/badge/MongoDB-%3E%3D%206-13aa52.svg?style=for-the-badge&logo=mongodb" alt="MongoDB">

<br>

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=28&pause=1000&color=3b82f6&center=true&vCenter=true&width=800&lines=IT+Equipment+Manager;Qu%E1%BA%A3n+l%C3%BD+Thi%E1%BA%BFt+B%E1%BB%8B+IT+Chuy%C3%AAn+Nghi%E1%BB%87p;MVC+%2B+Services+Layer;B%E1%BA%A3o+M%E1%BA%ADt+%26+Hi%E1%BB%87u+Su%E1%BA%A5t" alt="Typing SVG" />

<br>

<img src="https://wallpaperaccess.com/full/8351332.gif" alt="Welcome GIF" width="1000"/>

<br>

**🚀 Ứng dụng web quản lý thiết bị IT nội bộ – Nhanh, An toàn, Dễ dùng**

[📥 Cài đặt](#-cài-đặt) • [⚙️ Cấu hình](#-biến-môi-trường) • [📚 Tài liệu](#-cấu-trúc-thư-mục) • [💻 Tech Stack](#-tech-stack) • [🐛 Báo lỗi](https://github.com/vuinguyen16003069) • [👨‍💼 Liên hệ](#-tác-giả)

</div>

---

## 🎯 Giới thiệu

<div align="center">

**IT Equipment Manager** – Hệ thống quản lý thiết bị IT tập trung, dễ sử dụng và an toàn  
Xây dựng bằng **Node.js / Express.js** theo kiến trúc **MVC + Services Layer**

<br>

</div>

### ✨ Đặc điểm nổi bật

| 🚀 Hiệu suất       | 🔒 Bảo mật            | 👥 Quản lý           | 📊 Chức năng         |
|--------------------|-----------------------|----------------------|----------------------|
| Response nhanh     | JWT + bcrypt          | Phân quyền admin     | Full CRUD + Search   |
| Pagination server  | Rate limiting         | Quản lý user         | Filter & sort        |
| Error handling     | Helmet CSP            | Profile & settings   | Real-time notif      |

**IT Equipment Manager** lý tưởng cho:
- Quản lý tài sản CNTT của công ty
- Theo dõi thiết bị và trạng thái
- Phân quyền cho admin & user
- Tìm kiếm và thống kê nhanh chóng
- Bảo mật dữ liệu với mã hóa

---

## 💻 Tech Stack

| Thành phần | Công nghệ | Phiên bản |
|---|---|---|
| **Runtime** | Node.js | ≥ 18.0.0 |
| **Framework** | Express.js | v5.2.1 |
| **Template Engine** | EJS | v4.0.1 |
| **Database** | MongoDB + Mongoose | v9.3.0 |
| **Authentication** | JWT + bcrypt | v6.0.0 |
| **Validation** | Joi | v18.0.2 |
| **Styling** | Tailwind CSS | v4.2.1 |
| **Security** | Helmet + express-rate-limit | v8.3.1 |
| **Dev Tools** | Nodemon, Morgan, Biome | Latest |

---

## ✨ Tính năng chính

### 🔐 Xác thực & Phân quyền
| Tính năng | Mô tả |
|---|---|
| 🔑 **JWT Authentication** | Đăng nhập/đăng xuất với JWT lưu HttpOnly cookie |
| 👥 **Role-based Access** | Admin (toàn quyền) & User (chỉ xem) |
| 🛡️ **Password Hashing** | Bcrypt với salt rounds tự động |
| ⏱️ **Token Expiry** | JWT expire trong 8 giờ |
| 🔄 **Rate Limiting** | Chống brute force (10/15min) |

### 📦 Quản lý Thiết bị
| Tính năng | Mô tả |
|---|---|
| ➕ **Create** | Thêm thiết bị mới với validation Joi |
| ✏️ **Update** | Chỉnh sửa thông tin thiết bị |
| 🗑️ **Delete** | Xóa thiết bị (admin only) |
| 🔍 **Search** | Tìm kiếm theo tên, type, serial |
| 🏷️ **Filter** | Lọc theo loại (Type) & trạng thái (Status) |
| 📄 **Pagination** | Server-side (10 item/trang) |

### 👨‍💼 Quản lý User (Admin)
| Tính năng | Mô tả |
|---|---|
| 📋 **User Dashboard** | Danh sách tất cả user với search |
| 👤 **Edit Role** | Thay đổi role (admin ↔ user) |
| 🔐 **Reset Password** | Reset mật khẩu user |
| 🗑️ **Delete User** | Xóa user khỏi hệ thống |

### 👤 Hồ sơ & Cài đặt
| Tính năng | Mô tả |
|---|---|
| 👁️ **View Profile** | Xem thông tin cá nhân |
| 🔑 **Change Password** | Đổi mật khẩu với validation |
| ⚙️ **Settings** | Cấu hình tài khoản |
| 📞 **Notifications** | Thông báo real-time từ API |

### 🛡️ Bảo mật
| Tính năng | Mô tả |
|---|---|
| 🔐 **Helmet CSP** | Content Security Policy headers |
| ⏱️ **Rate Limiting** | 10 req/15min cho login, 5 req/1hr cho register |
| 🧹 **Input Validation** | Joi schemas cho tất cả endpoints |
| 🚫 **ReDoS Prevention** | Regex patterns được optimize |
| 🔄 **Graceful Shutdown** | Close MongoDB connection sạch |

---

## 📁 Cấu trúc thư mục

```
src/
├── bin/
│   ├── www.js                    # HTTP server entry point
│   └── seed.js                   # Tạo dữ liệu mẫu
├── controllers/
│   ├── authController.js         # Xử lý auth (login, register, profile)
│   ├── equipmentController.js    # Xử lý thiết bị (CRUD)
│   └── userController.js         # Xử lý user (admin)
├── helpers/
│   ├── constants.js              # Enum values (roles, status)
│   └── validation.js             # Joi schemas
├── middleware/
│   ├── authMiddleware.js         # JWT guard & role check
│   └── errorHandler.js           # 404 & global error handler
├── models/
│   ├── User.js                   # User schema
│   ├── Equipment.js              # Equipment schema
│   └── Notification.js           # Notification schema
├── routes/
│   ├── index.js                  # Router aggregator
│   ├── authRouter.js             # Auth routes
│   ├── equipmentRouter.js        # Equipment routes
│   ├── userRouter.js             # User management routes
│   └── apiRouter.js              # API endpoints
├── services/
│   ├── authService.js            # Auth business logic
│   ├── equipmentService.js       # Equipment business logic
│   └── userService.js            # User management logic
├── views/
│   ├── layouts/
│   │   ├── header.ejs            # Navigation & user dropdown
│   │   ├── sidebar.ejs           # Left sidebar menu
│   │   └── footer.ejs            # Footer & JS
│   ├── auth/
│   │   ├── login.ejs             # Login page
│   │   └── register.ejs          # Register page
│   ├── equipment/
│   │   ├── all.ejs               # Equipment list
│   │   ├── create.ejs            # Create form
│   │   └── edit.ejs              # Edit form
│   ├── users/
│   │   ├── index.ejs             # User list (admin)
│   │   └── edit.ejs              # User edit (admin)
│   ├── profile.ejs               # Profile page
│   ├── settings.ejs              # Settings page
│   └── error.ejs                 # Error page
├── public/
│   ├── stylesheets/
│   │   └── output.css            # Tailwind compiled CSS
│   ├── documents/                # Document files
│   └── images/                   # Image assets
├── input.css                     # Tailwind CSS source
├── index.js                      # App bootstrap
└── .env                          # Environment variables
```

---

## 📥 Cài đặt

### ⚡ Yêu cầu
- **Node.js** ≥ 18.0.0
- **MongoDB** ≥ 6.0 (local hoặc Atlas)
- **Git**

### 🚀 Các bước cài đặt

```bash
# 1️⃣ Clone dự án
git clone https://github.com/vuinguyen16003069/it-equipment-manager.git
cd it-equipment-manager

# 2️⃣ Cài đặt dependencies
npm install

# 3️⃣ Tạo file .env
cp .env.example .env

# 4️⃣ Cấu hình .env
# Chỉnh sửa các giá trị sau:
# - MONGO_URI=mongodb://127.0.0.1:27017/it_equipment
# - JWT_SECRET=your_secret_key_here
# - PORT=3000
# - NODE_ENV=development

# 5️⃣ Build Tailwind CSS
npm run tw:build

# 6️⃣ Nạp dữ liệu mẫu (tuỳ chọn)
npm run seed

# 7️⃣ Khởi động server
npm start
```

Truy cập `http://localhost:3000` 🎉

### 📝 Tài khoản mặc định (sau khi seed)
```
Username: admin
Password: admin123
```

⚠️ **Nhớ đổi mật khẩu sau lần đầu đăng nhập!**

---

## 🚀 Scripts

| Lệnh | Mô tả | Dùng khi nào |
|---|---|---|
| `npm start` | Khởi động server (Nodemon watch) | **Development** |
| `npm run seed` | Tạo dữ liệu mẫu | Lần đầu setup |
| `npm run tw:build` | Build Tailwind CSS 1 lần | Sau khi thay CSS classes |
| `npm run tw:watch` | Watch Tailwind CSS | **Development** CSS |
| `npm run lint` | Kiểm tra code với Biome | Before commit |
| `npm run lint:fix` | Tự động sửa lỗi lint | Auto-fix |
| `npm run format` | Format code với Biome | Code cleanup |

---

## ⚙️ Biến môi trường

Tạo file `.env` từ `.env.example` và cấu hình:

| Biến | Mô tả | Giá trị mẫu | Bắt buộc |
|---|---|---|---|
| `PORT` | Cổng lắng nghe | `3000` | ✅ |
| `NODE_ENV` | Môi trường | `development` / `production` | ✅ |
| `MONGO_URI` | MongoDB connection | `mongodb://127.0.0.1:27017/it_equipment` | ✅ |
| `JWT_SECRET` | JWT secret key (≥64 bytes) | *(hex string)* | ✅ |

**Ví dụ `.env`:**
```env
PORT=3000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/it_equipment
JWT_SECRET=your_super_secret_jwt_key_min_64_bytes_long_here
```

---

## 🔧 Deployment (Production)

### 🖥️ Triển khai trên VPS/Server

```bash
# 1. SSH vào server
ssh user@your_server_ip

# 2. Cài Node.js
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 3. Cài PM2
sudo npm install -g pm2

# 4. Clone dự án
git clone https://github.com/vuinguyen16003069/it-equipment-manager.git
cd it-equipment-manager

# 5. Cài dependencies
npm install --production

# 6. Khởi động với PM2
pm2 start src/bin/www.js --name "equipment-manager"
pm2 save && pm2 startup

# 7. Kiểm tra status
pm2 status
pm2 logs equipment-manager
```

### 🐳 Docker (tuỳ chọn)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json .
RUN npm install --production
COPY . .
CMD ["npm", "start"]
```

```bash
docker build -t equipment-manager .
docker run -p 3000:3000 --env-file .env equipment-manager
```

---

## 🎓 Sử dụng

### 🌐 Truy cập ứng dụng
1. Mở browser: `http://localhost:3000`
2. Đăng nhập với tài khoản admin
3. Bắt đầu quản lý thiết bị!

### 👨‍💼 Cho Admin
- 📋 Quản lý toàn bộ thiết bị
- 👥 Quản lý user (thay đổi role, reset password)
- ➕➖ Thêm/xóa thiết bị tùy ý

### 👤 Cho User
- 👀 Xem danh sách thiết bị
- 🔍 Tìm kiếm & lọc
- 👤 Xem profile cá nhân
- 🔑 Đổi mật khẩu

---

## 🐛 Khắc phục sự cố

### ❌ Lỗi "Cannot connect to MongoDB"
```bash
# Kiểm tra MongoDB running
mongod --version

# Kiểm tra MONGO_URI trong .env
# Format: mongodb://localhost:27017/database_name
```

### ❌ Lỗi "JWT Secret undefined"
```bash
# Đảm bảo .env có JWT_SECRET
# Minimum 64 bytes (64 ký tự hex)
echo "JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")" >> .env
```

### ❌ Port 3000 đã được dùng
```bash
# Thay đổi PORT trong .env
PORT=3001

# Hoặc kill process cũ
sudo lsof -i :3000
sudo kill -9 <PID>
```

### ❌ CSS không load
```bash
# Rebuild Tailwind CSS
npm run tw:build
```

---

## 📞 Liên hệ & Hỗ trợ

| Kênh | Thông tin |
|---|---|
| 👨‍💻 **Developer** | vuinguyen16003069 |
| 📧 **Email** | vuinguyen16003069@gmail.com |
| 🐙 **GitHub** | [github.com/vuinguyen16003069](https://github.com/vuinguyen16003069) |
| 🔗 **Repository** | [it-equipment-manager](https://github.com/vuinguyen16003069/it-equipment-manager) |

---

## 📄 Giấy phép

Dự án được phân phối theo giấy phép **MIT**. Xem file [LICENSE](LICENSE) để biết thêm chi tiết.

<div align="center">

---

**Made with ❤️ by vuinguyen16003069**

⭐ Nếu dự án hữu ích, hãy cho chúng tôi một ngôi sao trên GitHub nhé!

</div>
