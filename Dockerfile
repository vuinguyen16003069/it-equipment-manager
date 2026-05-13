# Sử dụng Node.js version 20 LTS phiên bản Alpine để giữ image nhẹ
FROM node:20-alpine

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Sao chép các tệp định nghĩa dependencies trước để tận dụng cache của Docker
COPY package*.json ./

# Cài đặt dependencies (bao gồm cả devDependencies để build Tailwind)
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Chạy lệnh build Tailwind CSS
RUN npm run tw:build

# Loại bỏ devDependencies sau khi đã build xong để giảm kích thước image
RUN npm prune --production

# Mở cổng 3000
EXPOSE 3000

# Khởi chạy ứng dụng
CMD ["npm", "start"]
