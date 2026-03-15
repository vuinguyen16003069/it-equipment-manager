const mongoose = require('mongoose');
const { EQUIPMENT_TYPES, EQUIPMENT_STATUSES } = require('../helpers/constants');

const equipmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    type: { type: String, required: true, enum: EQUIPMENT_TYPES },
    serialNumber: { type: String, required: true, unique: true, trim: true, uppercase: true },
    status: { type: String, enum: EQUIPMENT_STATUSES, default: 'available' },
    assignedTo: { type: String, trim: true, default: '' },
    description: { type: String, trim: true, default: '' },
    purchaseDate: { type: Date, default: null },
  },
  { timestamps: true },
);

// Indexes for common queries
equipmentSchema.index({ type: 1, status: 1 });
equipmentSchema.index({ name: 1 });

module.exports = mongoose.model('Equipment', equipmentSchema);
