<div align="center">

<img src="https://img.shields.io/badge/version-1.0.0-3b82f6?style=for-the-badge&logoColor=white" />
<img src="https://img.shields.io/badge/license-MIT-22c55e?style=for-the-badge" />
<img src="https://img.shields.io/badge/Node.js-≥18.0.0-339933?style=for-the-badge&logo=node.js&logoColor=white" />
<img src="https://img.shields.io/badge/MongoDB-≥6.0-13aa52?style=for-the-badge&logo=mongodb&logoColor=white" />
<img src="https://img.shields.io/badge/Express.js-v5.2.1-000000?style=for-the-badge&logo=express&logoColor=white" />

<br/><br/>

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=32&pause=1000&color=3b82f6&center=true&vCenter=true&width=900&lines=%F0%9F%92%BB+IT+Equipment+Manager;Qu%E1%BA%A3n+l%C3%BD+Thi%E1%BF%BFt+B%E1%BB%8B+IT+Chuy%C3%AAn+Nghi%E1%BB%87p;MVC+%2B+Services+Layer+Architecture;B%E1%BA%A3o+M%E1%BA%ADt+%26+Hi%E1%BB%87u+Su%E1%BA%A5t+Cao" alt="Typing SVG" />

<br/>

<img src="https://wallpaperaccess.com/full/8351332.gif" alt="Banner" width="100%" style="border-radius:12px"/>

<br/><br/>

> **🚀 Hệ thống quản lý thiết bị IT nội bộ — Nhanh · An toàn · Dễ dùng**  
> Xây dựng bằng **Node.js / Express.js** theo kiến trúc **MVC + Services Layer**

<br/>

[![Stars](https://img.shields.io/github/stars/vuinguyen16003069/it-equipment-manager?style=social)](https://github.com/vuinguyen16003069/it-equipment-manager)&nbsp;&nbsp;
**[📥 Cài đặt](#-cài-đặt)** &nbsp;•&nbsp;
**[⚙️ Cấu hình](#️-biến-môi-trường)** &nbsp;•&nbsp;
**[📁 Cấu trúc](#-cấu-trúc-thư-mục)** &nbsp;•&nbsp;
**[💻 Tech Stack](#-tech-stack)** &nbsp;•&nbsp;
**[🐛 Báo lỗi](https://github.com/vuinguyen16003069)** &nbsp;•&nbsp;
**[📞 Liên hệ](#-liên-hệ--hỗ-trợ)**

</div>

---

## 🎯 Giới thiệu

**IT Equipment Manager** là ứng dụng web quản lý tài sản CNTT tập trung, được thiết kế cho các doanh nghiệp cần theo dõi thiết bị, phân quyền nhân sự và kiểm soát dữ liệu một cách bảo mật.

<table>
<tr>
<td width="50%">

### 💡 Phù hợp cho
- 🏢 Quản lý tài sản CNTT của công ty
- 📋 Theo dõi thiết bị và trạng thái sử dụng
- 🔐 Phân quyền linh hoạt cho admin & user
- 🔍 Tìm kiếm và thống kê nhanh chóng
- 🛡️ Bảo mật dữ liệu với mã hóa

</td>
<td width="50%">

### ⚡ Điểm nổi bật
- 🚀 Response nhanh, Pagination server-side
- 🔒 JWT + bcrypt + Helmet CSP
- 👥 Quản lý user & phân quyền đầy đủ
- 🖼️ Upload ảnh qua ImgBB API (≤25MB)
- 🔔 Thông báo real-time từ API

</td>
</tr>
</table>

---

## 💻 Tech Stack

<div align="center">

| Thành phần | Công nghệ | Phiên bản |
|:---:|:---:|:---:|
| **Runtime** | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white) | ≥ 18.0.0 |
| **Framework** | ![Express](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white) | v5.2.1 |
| **Template Engine** | ![EJS](https://img.shields.io/badge/EJS-B4CA65?style=flat-square&logo=ejs&logoColor=black) | v4.0.1 |
| **Database** | ![MongoDB](https://img.shields.io/badge/MongoDB-13aa52?style=flat-square&logo=mongodb&logoColor=white) | v9.3.0 (Mongoose) |
| **Authentication** | ![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=json-web-tokens&logoColor=white) | + bcrypt v6.0.0 |
| **Validation** | ![Joi](https://img.shields.io/badge/Joi-0080FF?style=flat-square) | v18.0.2 |
| **Styling** | ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38bdf8?style=flat-square&logo=tailwind-css&logoColor=white) | v4.2.1 |
| **Security** | ![Helmet](https://img.shields.io/badge/Helmet-E34F26?style=flat-square) | v8.3.1 + rate-limit |
| **Media** | ![ImgBB](https://img.shields.io/badge/ImgBB_API-2d8cf0?style=flat-square) | Multer + ImgBB |
| **Container** | ![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white) | Compose v2+ |
| **Dev Tools** | Nodemon · Morgan · Biome | Latest |

</div>

---

## ✨ Tính năng chính

<details>
<summary><b>🔐 Xác thực & Phân quyền</b></summary>
<br/>

| Tính năng | Mô tả |
|---|---|
| 🔑 **JWT Authentication** | Đăng nhập / đăng xuất, JWT lưu HttpOnly cookie |
| 👥 **Role-based Access** | `admin` (toàn quyền) & `user` (chỉ xem) |
| 🛡️ **Password Hashing** | Bcrypt với salt rounds tự động |
| ⏱️ **Token Expiry** | JWT hết hạn sau 8 giờ |
| 🔄 **Rate Limiting** | Chống brute force: 10 req / 15 phút |

</details>

<details>
<summary><b>📦 Quản lý Thiết bị</b></summary>
<br/>

| Tính năng | Mô tả |
|---|---|
| ➕ **Create** | Thêm thiết bị mới với validation Joi |
| ✏️ **Update** | Chỉnh sửa thông tin thiết bị |
| 🗑️ **Delete** | Xóa thiết bị (admin only) |
| 🔍 **Search** | Tìm kiếm theo tên, type, serial number |
| 🏷️ **Filter & Sort** | Lọc theo loại (Type) & trạng thái (Status) |
| 🖼️ **Image Upload** | Upload ảnh lên ImgBB (API/Scraping), tối đa 25MB |
| 📄 **Pagination** | Server-side, 10 item / trang |

</details>

<details>
<summary><b>👨‍💼 Quản lý User (Admin)</b></summary>
<br/>

| Tính năng | Mô tả |
|---|---|
| 📋 **User Dashboard** | Danh sách toàn bộ user với search |
| 👤 **Edit Role** | Thay đổi role `admin ↔ user` |
| 🔐 **Reset Password** | Reset mật khẩu cho user bất kỳ |
| 🗑️ **Delete User** | Xóa user khỏi hệ thống |

</details>

<details>
<summary><b>👤 Hồ sơ & Cài đặt</b></summary>
<br/>

| Tính năng | Mô tả |
|---|---|
| 👁️ **View Profile** | Xem thông tin cá nhân |
| 🔑 **Change Password** | Đổi mật khẩu với validation đầy đủ |
| ⚙️ **Settings** | Cấu hình tài khoản |
| 🔔 **Notifications** | Thông báo real-time từ API |

</details>

<details>
<summary><b>🛡️ Bảo mật</b></summary>
<br/>

| Tính năng | Mô tả |
|---|---|
| 🔐 **Helmet CSP** | Content Security Policy headers |
| ⏱️ **Rate Limiting** | 10 req/15min (login) · 5 req/1hr (register) |
| 🧹 **Input Validation** | Joi schemas cho tất cả endpoints |
| 🚫 **ReDoS Prevention** | Regex patterns được tối ưu hóa |
| 🔄 **Graceful Shutdown** | Đóng kết nối MongoDB sạch khi tắt server |

</details>

---

## 📁 Cấu trúc thư mục

```
src/
├── 📂 bin/
│   ├── www.js                    # HTTP server entry point
│   └── seed.js                   # Tạo dữ liệu mẫu
│
├── 📂 controllers/
│   ├── authController.js         # Xử lý auth (login, register, profile)
│   ├── equipmentController.js    # Xử lý thiết bị (CRUD)
│   └── userController.js         # Xử lý user (admin)
│
├── 📂 helpers/
│   ├── constants.js              # Enum values (roles, status)
│   ├── validation.js             # Joi schemas
│   └── imgbb.js                  # Helper upload ảnh lên ImgBB
│
├── 📂 middleware/
│   ├── authMiddleware.js         # JWT guard & role check
│   └── errorHandler.js           # 404 & global error handler
│
├── 📂 models/
│   ├── User.js                   # User schema
│   ├── Equipment.js              # Equipment schema
│   └── Notification.js           # Notification schema
│
├── 📂 routes/
│   ├── index.js                  # Router aggregator
│   ├── authRouter.js             # Auth routes
│   ├── equipmentRouter.js        # Equipment routes
│   ├── userRouter.js             # User management routes
│   └── apiRouter.js              # API endpoints
│
├── 📂 services/
│   ├── authService.js            # Auth business logic
│   ├── equipmentService.js       # Equipment business logic
│   └── userService.js            # User management logic
│
├── 📂 views/
│   ├── layouts/
│   │   ├── header.ejs            # Navigation & user dropdown
│   │   ├── sidebar.ejs           # Left sidebar menu
│   │   └── footer.ejs            # Footer & JS
│   ├── auth/
│   │   ├── login.ejs             # Login page
│   │   └── register.ejs          # Register page
│   ├── equipment/
│   │   ├── index.ejs             # Equipment list
│   │   ├── create.ejs            # Create form
│   │   └── edit.ejs              # Edit form
│   ├── users/
│   │   ├── index.ejs             # User list (admin)
│   │   └── edit.ejs              # User edit (admin)
│   ├── profile.ejs               # Profile page
│   ├── settings.ejs              # Settings page
│   └── error.ejs                 # Error page
│
├── 📂 public/
│   ├── stylesheets/
│   │   └── output.css            # Tailwind compiled CSS
│   ├── documents/                # Document files
│   └── images/                   # Image assets
│
├── input.css                     # Tailwind CSS source
├── index.js                      # App bootstrap
├── .env                          # Environment variables
└── biome.json                    # Biome configuration
```

---

### 📦 Chạy bằng Docker (Khuyên dùng)

Nếu bạn đã cài đặt **Docker** và **Docker Compose**, bạn có thể khởi chạy toàn bộ hệ thống (App + Database) chỉ với một lệnh:

1. **Chuẩn bị file .env**: Đảm bảo các biến môi trường đã sẵn sàng (xem phần [Biến môi trường](#️-biến-môi-trường)).
2. **Khởi chạy container**:
   ```bash
   docker-compose up -d --build
   ```
3. **Truy cập**: Ứng dụng sẽ chạy tại [http://localhost:3000](http://localhost:3000).

---

### 🛠️ Cài đặt thủ công (Local)

| Công cụ | Phiên bản |
|---|---|
| **Node.js** | ≥ 18.0.0 |
| **MongoDB** | ≥ 6.0 (Local hoặc Atlas) |
| **Git** | Latest |

### 🚀 Cài đặt nhanh

```bash
# 1️⃣  Clone dự án
git clone https://github.com/vuinguyen16003069/it-equipment-manager.git
cd it-equipment-manager

# 2️⃣  Cài đặt dependencies
npm install

# 3️⃣  Khởi tạo file .env
cp .env.example .env
# → Mở .env và điền các giá trị cần thiết (xem bảng bên dưới)

# 4️⃣  Build Tailwind CSS
npm run tw:build

# 5️⃣  (Tuỳ chọn) Nạp dữ liệu mẫu
npm run seed

# 6️⃣  Khởi động server
npm start
```

> 🎉 Truy cập **`http://localhost:3000`** để bắt đầu!

### 📝 Tài khoản mặc định (sau khi seed)

```
Username : admin
Password : admin123
```

> ⚠️ **Hãy đổi mật khẩu ngay sau lần đăng nhập đầu tiên!**

---

## ☁️ Hướng dẫn lấy MongoDB Atlas (Cloud — Miễn phí)

Nếu không muốn cài MongoDB Local, bạn có thể dùng **MongoDB Atlas** hoàn toàn miễn phí:

```
1. Đăng ký tại  →  https://www.mongodb.com/cloud/atlas/register
2. Tạo Cluster   →  Chọn gói M0 (FREE) · Region: Singapore
3. Database Access  →  Tạo Username / Password · Quyền: Atlas Admin
4. Network Access   →  Add IP Address → Allow Access From Anywhere (0.0.0.0/0)
5. Lấy URI       →  Database → Connect → Drivers → Copy chuỗi kết nối
6. Dán vào .env  →  MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.xxx.mongodb.net/it_equipment
```

---

## ⚙️ Biến môi trường

Tạo file `.env` từ `.env.example` và điền các giá trị sau:

| Biến | Mô tả | Ví dụ | Bắt buộc |
|---|---|---|:---:|
| `PORT` | Cổng server lắng nghe | `3000` | ✅ |
| `NODE_ENV` | Môi trường chạy | `development` / `production` | ✅ |
| `MONGO_URI` | Chuỗi kết nối MongoDB | `mongodb://127.0.0.1:27017/it_equipment` | ✅ |
| `JWT_SECRET` | Khoá bí mật JWT (≥ 64 bytes) | *(hex string ngẫu nhiên)* | ✅ |
| `IMGBB_API_KEY` | API Key cho dịch vụ ImgBB | `ce5a95195ebc...` | ❌ *(có fallback)* |

**Ví dụ `.env` đầy đủ:**

```env
# ── Server ─────────────────────────────────────────
PORT=3000
NODE_ENV=development

# ── Database ───────────────────────────────────────
MONGO_URI=mongodb+srv://admin:password123@cluster0.xxxxx.mongodb.net/it_equipment?retryWrites=true&w=majority

# ── Authentication ─────────────────────────────────
# Tạo nhanh: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
JWT_SECRET=dfcf19cfc0545b5af38dc0efe0a259e541d75f789c9dfdd8f2d35feb81b153b7

# ── Media Upload ───────────────────────────────────
IMGBB_API_KEY=ce5a95195ebc1c1d27af4d32d749cf7e
```

---

## 🚀 Scripts

| Lệnh | Mô tả | Dùng khi nào |
|---|---|:---:|
| `npm start` | Khởi động server (Nodemon watch) | 🟢 Development |
| `npm run seed` | Tạo dữ liệu mẫu | 🔷 Setup lần đầu |
| `npm run tw:build` | Build Tailwind CSS một lần | 🔷 Sau khi thay CSS |
| `npm run tw:watch` | Watch & rebuild Tailwind CSS | 🟢 Development |
| `npm run lint` | Kiểm tra code với Biome | 🔶 Trước khi commit |
| `npm run lint:fix` | Tự động sửa lỗi lint | 🔶 Auto-fix |
| `npm run format` | Format code với Biome | 🔶 Code cleanup |

---

## 🌐 Sử dụng

### Cho Admin 👨‍💼
- Quản lý toàn bộ thiết bị (thêm / sửa / xóa)
- Quản lý user: thay đổi role, reset mật khẩu, xóa tài khoản
- Xem dashboard tổng quan và thông báo hệ thống

### Cho User 👤
- Xem danh sách thiết bị, tìm kiếm và lọc theo type / status
- Xem profile cá nhân và đổi mật khẩu

---

## 🖥️ Triển khai Production

<details>
<summary><b>🖥️ VPS / Server (PM2)</b></summary>
<br/>

```bash
# Cài Node.js & PM2
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g pm2

# Clone & cài đặt
git clone https://github.com/vuinguyen16003069/it-equipment-manager.git
cd it-equipment-manager
npm install --production

# Khởi động với PM2
pm2 start src/bin/www.js --name "equipment-manager"
pm2 save && pm2 startup

# Kiểm tra
pm2 status
pm2 logs equipment-manager
```

</details>

<details>
<summary><b>🐳 Docker</b></summary>
<br/>

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json .
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

```bash
docker build -t equipment-manager .
docker run -p 3000:3000 --env-file .env equipment-manager
```

</details>

---

## 🐛 Khắc phục sự cố

<details>
<summary><b>❌ Cannot connect to MongoDB</b></summary>
<br/>

- **Local:** Kiểm tra MongoDB service đã chạy chưa (`mongod --version`)
- **Atlas:** Xác nhận đã thêm IP `0.0.0.0/0` vào Network Access
- **Atlas:** Kiểm tra lại Username / Password trong URI (encode ký tự đặc biệt nếu có)

</details>

<details>
<summary><b>❌ JWT Secret undefined</b></summary>
<br/>

```bash
# Tạo và append JWT_SECRET vào .env
echo "JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")" >> .env
```

</details>

<details>
<summary><b>❌ Port 3000 đã được sử dụng</b></summary>
<br/>

```bash
# Đổi PORT trong .env
PORT=3001

# Hoặc kill process đang chiếm cổng
sudo lsof -i :3000
sudo kill -9 <PID>
```

</details>

<details>
<summary><b>❌ CSS không load</b></summary>
<br/>

```bash
npm run tw:build
```

</details>

---

## 📞 Liên hệ & Hỗ trợ

<div align="center">

| | |
|:---:|:---|
| 👨‍💻 | **Developer:** vuinguyen16003069 |
| 📧 | **Email:** vuinguyen16003069@gmail.com |
| 🐙 | **GitHub:** [github.com/vuinguyen16003069](https://github.com/vuinguyen16003069) |
| 🔗 | **Repository:** [it-equipment-manager](https://github.com/vuinguyen16003069/it-equipment-manager) |

</div>

---

## 📄 Giấy phép

Dự án được phân phối theo giấy phép **MIT**. Xem file [LICENSE](LICENSE) để biết thêm chi tiết.

---

<div align="center">

**Made with ❤️ by [vuinguyen16003069](https://github.com/vuinguyen16003069)**

⭐ Nếu dự án hữu ích, hãy để lại một **Star** trên GitHub nhé!

</div>