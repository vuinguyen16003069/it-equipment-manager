/**
 * Seed script – tạo tài khoản admin + dữ liệu thiết bị mẫu.
 * Chạy: node src/bin/seed.js
 */
require('dotenv').config({ path: require('node:path').join(__dirname, '../../.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Equipment = require('../models/Equipment');

const sampleEquipment = [
  {
    name: 'Dell Latitude 5540',
    type: 'Laptop',
    serialNumber: 'DL5540-2024-001',
    status: 'in-use',
    assignedTo: 'Nguyễn Văn An',
    description: 'Intel Core i7-1365U, RAM 16GB DDR5, SSD 512GB NVMe, 15.6" FHD',
    purchaseDate: new Date('2024-03-15'),
  },
  {
    name: 'HP EliteDesk 800 G9',
    type: 'Desktop',
    serialNumber: 'HPE800G9-2024-002',
    status: 'in-use',
    assignedTo: 'Trần Thị Bích',
    description: 'Intel Core i5-12500, RAM 8GB DDR4, SSD 256GB, tích hợp Intel UHD 770',
    purchaseDate: new Date('2024-01-10'),
  },
  {
    name: 'Dell UltraSharp U2722D',
    type: 'Monitor',
    serialNumber: 'DLU2722D-2024-003',
    status: 'in-use',
    assignedTo: 'Trần Thị Bích',
    description: '27" 4K IPS, USB-C 90W, kết nối DisplayPort / HDMI',
    purchaseDate: new Date('2024-01-10'),
  },
  {
    name: 'Lenovo ThinkPad E15 Gen 4',
    type: 'Laptop',
    serialNumber: 'LNTE15G4-2023-004',
    status: 'available',
    assignedTo: '',
    description: 'AMD Ryzen 5 5625U, RAM 8GB, SSD 256GB, 15.6" FHD IPS',
    purchaseDate: new Date('2023-09-20'),
  },
  {
    name: 'HP LaserJet Pro MFP M428fdw',
    type: 'Printer',
    serialNumber: 'HPM428-2023-005',
    status: 'maintenance',
    assignedTo: '',
    description: 'In/Scan/Copy/Fax, A4, 38 trang/phút, in hai mặt tự động, kết nối WiFi',
    purchaseDate: new Date('2023-05-01'),
  },
  {
    name: 'Cisco Catalyst 2960-X 24TS-L',
    type: 'Network',
    serialNumber: 'CSC2960X-2022-006',
    status: 'in-use',
    assignedTo: 'Phòng máy chủ',
    description: '24 cổng GbE, 4 cổng SFP uplink, Layer 2 managed switch',
    purchaseDate: new Date('2022-11-05'),
  },
  {
    name: 'Dell PowerEdge R750',
    type: 'Server',
    serialNumber: 'DLR750-2022-007',
    status: 'in-use',
    assignedTo: 'Phòng máy chủ',
    description: 'Dual Intel Xeon Silver 4314, RAM 128GB ECC, HDD 4x1.2TB SAS RAID 10',
    purchaseDate: new Date('2022-06-15'),
  },
  {
    name: 'Logitech MX Keys S',
    type: 'Keyboard',
    serialNumber: 'LGTMXKS-2024-008',
    status: 'available',
    assignedTo: '',
    description: 'Bàn phím không dây Bluetooth/USB, có đèn nền thích nghi, kết nối 3 thiết bị',
    purchaseDate: new Date('2024-06-01'),
  },
  {
    name: 'Logitech MX Master 3S',
    type: 'Mouse',
    serialNumber: 'LGTMXM3S-2024-009',
    status: 'available',
    assignedTo: '',
    description: 'Chuột không dây 8000 DPI, cuộn MagSpeed, kết nối Bluetooth/USB Logi Bolt',
    purchaseDate: new Date('2024-06-01'),
  },
  {
    name: 'ASUS ProArt PA278CV',
    type: 'Monitor',
    serialNumber: 'ASPA278CV-2023-010',
    status: 'retired',
    assignedTo: '',
    description: '27" WQHD IPS, USB-C 65W, màu sắc chuyên nghiệp Delta E < 2 – đã thanh lý do hỏng tấm nền',
    purchaseDate: new Date('2021-08-10'),
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);

  // --- Admin user ---
  const exists = await User.findOne({ username: 'admin' });
  if (!exists) {
    const hashed = await bcrypt.hash('admin123', 10);
    await User.create({ username: 'admin', password: hashed, role: 'admin' });
    console.log('✅ Đã tạo tài khoản admin  →  admin / admin123');
  } else {
    console.log('ℹ️  Tài khoản admin đã tồn tại');
  }

  // --- Sample equipment ---
  let added = 0;
  for (const item of sampleEquipment) {
    const dup = await Equipment.findOne({ serialNumber: item.serialNumber });
    if (!dup) {
      await Equipment.create(item);
      added++;
    }
  }
  if (added > 0) {
    console.log(`Đã thêm ${added} thiết bị mẫu`);
  } else {
    console.log('Dữ liệu thiết bị mẫu đã tồn tại');
  }

  await mongoose.disconnect();
  console.log('Đã đóng kết nối MongoDB');
}

seed().catch(console.error);
