/**
 * Seed script – tạo tài khoản admin + dữ liệu thiết bị mẫu.
 * Chạy: node src/bin/seed.js
 */
require('dotenv').config({ path: require('node:path').join(__dirname, '../../.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Equipment = require('../models/Equipment');
const { upload } = require('../helpers/imgbb');

const sampleEquipment = [
  {
    name: 'Dell Latitude 5540',
    type: 'Laptop',
    serialNumber: 'DL5540-2024-001',
    status: 'in-use',
    assignedTo: 'Nguyễn Văn An',
    description: 'Intel Core i7-1365U, RAM 16GB DDR5, SSD 512GB NVMe, 15.6" FHD',
    purchaseDate: new Date('2024-03-15'),
    sourceUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'HP EliteDesk 800 G9',
    type: 'Desktop',
    serialNumber: 'HPE800G9-2024-002',
    status: 'in-use',
    assignedTo: 'Trần Thị Bích',
    description: 'Intel Core i5-12500, RAM 8GB DDR4, SSD 256GB, tích hợp Intel UHD 770',
    purchaseDate: new Date('2024-01-10'),
    sourceUrl: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Dell UltraSharp U2722D',
    type: 'Monitor',
    serialNumber: 'DLU2722D-2024-003',
    status: 'in-use',
    assignedTo: 'Trần Thị Bích',
    description: '27" 4K IPS, USB-C 90W, kết nối DisplayPort / HDMI',
    purchaseDate: new Date('2024-01-10'),
    sourceUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Lenovo ThinkPad E15 Gen 4',
    type: 'Laptop',
    serialNumber: 'LNTE15G4-2023-004',
    status: 'available',
    assignedTo: '',
    description: 'AMD Ryzen 5 5625U, RAM 8GB, SSD 256GB, 15.6" FHD IPS',
    purchaseDate: new Date('2023-09-20'),
    sourceUrl: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'HP LaserJet Pro MFP M428fdw',
    type: 'Printer',
    serialNumber: 'HPM428-2023-005',
    status: 'maintenance',
    assignedTo: '',
    description: 'In/Scan/Copy/Fax, A4, 38 trang/phút, in hai mặt tự động, kết nối WiFi',
    purchaseDate: new Date('2023-05-01'),
    sourceUrl: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Cisco Catalyst 2960-X 24TS-L',
    type: 'Network',
    serialNumber: 'CSC2960X-2022-006',
    status: 'in-use',
    assignedTo: 'Phòng máy chủ',
    description: '24 cổng GbE, 4 cổng SFP uplink, Layer 2 managed switch',
    purchaseDate: new Date('2022-11-05'),
    sourceUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Dell PowerEdge R750',
    type: 'Server',
    serialNumber: 'DLR750-2022-007',
    status: 'in-use',
    assignedTo: 'Phòng máy chủ',
    description: 'Dual Intel Xeon Silver 4314, RAM 128GB ECC, HDD 4x1.2TB SAS RAID 10',
    purchaseDate: new Date('2022-06-15'),
    sourceUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Logitech MX Keys S',
    type: 'Keyboard',
    serialNumber: 'LGTMXKS-2024-008',
    status: 'available',
    assignedTo: '',
    description: 'Bàn phím không dây Bluetooth/USB, có đèn nền thích nghi, kết nối 3 thiết bị',
    purchaseDate: new Date('2024-06-01'),
    sourceUrl: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Logitech MX Master 3S',
    type: 'Mouse',
    serialNumber: 'LGTMXM3S-2024-009',
    status: 'available',
    assignedTo: '',
    description: 'Chuột không dây 8000 DPI, cuộn MagSpeed, kết nối Bluetooth/USB Logi Bolt',
    purchaseDate: new Date('2024-06-01'),
    sourceUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'ASUS ProArt PA278CV',
    type: 'Monitor',
    serialNumber: 'ASPA278CV-2023-010',
    status: 'retired',
    assignedTo: '',
    description: '27" WQHD IPS, USB-C 65W, màu sắc chuyên nghiệp Delta E < 2 – đã thanh lý do hỏng tấm nền',
    purchaseDate: new Date('2021-08-10'),
    sourceUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
  },
];

const sampleUsers = [
  { username: 'admin', password: 'admin123', role: 'admin' },
  { username: 'user1', password: 'user123', role: 'user' },
  { username: 'user2', password: 'user123', role: 'user' },
  { username: 'user3', password: 'user123', role: 'user' },
  { username: 'user4', password: 'user123', role: 'user' },
  { username: 'user5', password: 'user123', role: 'user' },
  { username: 'user6', password: 'user123', role: 'user' },
  { username: 'user7', password: 'user123', role: 'user' },
  { username: 'user8', password: 'user123', role: 'user' },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);

  // --- Users ---
  for (const u of sampleUsers) {
    const exists = await User.findOne({ username: u.username });
    if (!exists) {
      const hashed = await bcrypt.hash(u.password, 10);
      await User.create({ username: u.username, password: hashed, role: u.role });
      console.log(`✅ Đã tạo tài khoản [${u.role}]  →  ${u.username} / ${u.password}`);
    }
  }

  // --- Sample equipment ---
  let added = 0;
  console.log('📦 Đang nạp dữ liệu thiết bị (và upload ảnh lên ImgBB)...');
  
  for (const item of sampleEquipment) {
    const dup = await Equipment.findOne({ serialNumber: item.serialNumber });
    if (!dup) {
      try {
        // Tự động upload ảnh lên ImgBB trước khi lưu vào DB
        console.log(`- Đang xử lý: ${item.name}...`);
        const imageUrl = await upload(item.sourceUrl, `${item.type.toLowerCase()}.jpg`);
        
        // Dùng destructuring thay vì delete để tối ưu hiệu năng
        const { sourceUrl, ...equipmentData } = { ...item, imageUrl };
        
        await Equipment.create(equipmentData);
        added++;
        console.log(`  ✅ Thành công: ${imageUrl}`);
      } catch (err) {
        console.error(`  ❌ Lỗi upload ảnh cho ${item.name}:`, err.message);
        // Fallback: Vẫn tạo thiết bị nhưng dùng link gốc
        const { sourceUrl, ...equipmentData } = { ...item, imageUrl: item.sourceUrl };
        await Equipment.create(equipmentData);
        added++;
      }
    }
  }

  if (added > 0) {
    console.log(`\n🎉 Hoàn tất! Đã thêm ${added} thiết bị mới.`);
  } else {
    console.log('\nℹ️ Dữ liệu thiết bị mẫu đã tồn tại.');
  }

  await mongoose.disconnect();
  console.log('Đã đóng kết nối MongoDB');
}

seed().catch(console.error);
