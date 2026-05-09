const Joi = require('joi');
const { EQUIPMENT_TYPES, EQUIPMENT_STATUSES } = require('./constants');

const loginSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(50).required().messages({
    'string.alphanum': 'Tên đăng nhập chỉ chứa chữ và số',
    'string.min': 'Tên đăng nhập tối thiểu 3 ký tự',
    'any.required': 'Vui lòng nhập tên đăng nhập',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Mật khẩu tối thiểu 6 ký tự',
    'any.required': 'Vui lòng nhập mật khẩu',
  }),
});

const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(50).required().messages({
    'string.alphanum': 'Tên đăng nhập chỉ chứa chữ và số',
    'string.min': 'Tên đăng nhập tối thiểu 3 ký tự',
    'string.max': 'Tên đăng nhập tối đa 50 ký tự',
    'any.required': 'Vui lòng nhập tên đăng nhập',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Email không hợp lệ',
    'any.required': 'Vui lòng nhập email',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Mật khẩu tối thiểu 6 ký tự',
    'any.required': 'Vui lòng nhập mật khẩu',
  }),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Mật khẩu xác nhận không khớp',
    'any.required': 'Vui lòng xác nhận mật khẩu',
  }),
});

const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Email không hợp lệ',
    'any.required': 'Vui lòng nhập email',
  }),
});

const resetPasswordSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Email không hợp lệ',
    'any.required': 'Vui lòng nhập email',
  }),
  otp: Joi.string().length(6).required().messages({
    'string.length': 'Mã OTP phải có 6 chữ số',
    'any.required': 'Vui lòng nhập mã OTP',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Mật khẩu tối thiểu 6 ký tự',
    'any.required': 'Vui lòng nhập mật khẩu',
  }),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Mật khẩu xác nhận không khớp',
    'any.required': 'Vui lòng xác nhận mật khẩu',
  }),
});

const verifyOtpSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Email không hợp lệ',
    'any.required': 'Vui lòng nhập email',
  }),
  otp: Joi.string().length(6).required().messages({
    'string.length': 'Mã OTP phải có 6 chữ số',
    'any.required': 'Vui lòng nhập mã OTP',
  }),
});

const equipmentSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    'any.required': 'Vui lòng nhập tên thiết bị',
    'string.min': 'Tên thiết bị tối thiểu 2 ký tự',
  }),
  type: Joi.string()
    .valid(...EQUIPMENT_TYPES)
    .required()
    .messages({
      'any.required': 'Vui lòng chọn loại thiết bị',
      'any.only': 'Loại thiết bị không hợp lệ',
    }),
  serialNumber: Joi.string().min(2).max(100).required().messages({
    'any.required': 'Vui lòng nhập số serial',
    'string.min': 'Số serial tối thiểu 2 ký tự',
  }),
  status: Joi.string()
    .valid(...EQUIPMENT_STATUSES)
    .required()
    .messages({
      'any.required': 'Vui lòng chọn trạng thái',
      'any.only': 'Trạng thái không hợp lệ',
    }),
  assignedTo: Joi.string().allow('').max(100).default(''),
  description: Joi.string().allow('').max(500).default(''),
  purchaseDate: Joi.date().allow(null, '').default(null),
  imageUrl: Joi.string().allow('').default(''),
});

module.exports = {
  loginSchema,
  registerSchema,
  equipmentSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyOtpSchema,
};
