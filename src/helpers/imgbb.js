const axios = require('axios');
const FormData = require('form-data');
const path = require('node:path');

const BASE_URL = 'https://imgbb.com';
const API_KEY = process.env.IMGBB_API_KEY;
const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36';

const MIME_MAP = {
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
};

async function getAuthData() {
  const { headers, data } = await axios.get(`${BASE_URL}/`, {
    timeout: 10_000,
    headers: { 'User-Agent': USER_AGENT },
  });
  const cookie = (headers['set-cookie'] ?? []).map((c) => c.split(';')[0]).join('; ');
  const token = data.match(/auth_token\s*=\s*['"]([^'"]+)['"]/i)?.[1];
  if (!token) {
    throw new Error('Không thể trích xuất auth_token từ ImgBB.');
  }
  return { cookie, token };
}

async function fetchImageStream(imageUrl) {
  const { data: stream, headers } = await axios.get(imageUrl, {
    responseType: 'stream',
    timeout: 15_000,
    headers: { 'User-Agent': USER_AGENT },
  });
  const pathname = new URL(imageUrl).pathname;
  const fileName = pathname.includes('.') ? path.basename(pathname) : 'image.jpg';
  const contentLength = headers['content-length'] ? Number(headers['content-length']) : null;
  return { stream, fileName, contentLength };
}

async function uploadV2(source, fileName = 'image.jpg') {
  try {
    const formData = new FormData();
    formData.append('image', source, { filename: fileName });

    const res = await axios.post(`https://api.imgbb.com/1/upload?key=${API_KEY}`, formData, {
      headers: formData.getHeaders(),
      timeout: 30_000,
    });

    return res.data.data.url;
  } catch (error) {
    throw new Error(error.response?.data?.error?.message || error.message);
  }
}

async function uploadV1(source, fileName = 'image.jpg', isStream = false, contentLength = null) {
  const { cookie, token } = await getAuthData();
  const form = new FormData();

  form.append('source', source, {
    filename: fileName,
    contentType: MIME_MAP[path.extname(fileName).toLowerCase()] ?? 'image/jpeg',
    ...(isStream && contentLength != null && { knownLength: contentLength }),
  });
  form.append('type', 'file');
  form.append('action', 'upload');
  form.append('timestamp', Date.now().toString());
  form.append('auth_token', token);

  const { data } = await axios.post(`${BASE_URL}/json`, form, {
    timeout: 30_000,
    headers: {
      ...form.getHeaders(),
      Cookie: cookie,
      Origin: BASE_URL,
      Referer: `${BASE_URL}/`,
      'User-Agent': USER_AGENT,
      'X-Requested-With': 'XMLHttpRequest',
    },
  });

  if (data?.status_code === 200 && data.image?.url) {
    return data.image.url;
  }
  throw new Error(data?.error?.message || 'Server ImgBB từ chối upload.');
}

async function upload(source, fileName = 'image.jpg') {
  try {
    let finalSource = source;
    let finalFileName = fileName;
    let isStream = false;
    let contentLength = null;

    if (typeof source === 'string' && source.startsWith('http')) {
      if (API_KEY) {
        const res = await fetchImageStream(source);
        finalSource = res.stream;
        finalFileName = res.fileName;
      } else {
        const res = await fetchImageStream(source);
        finalSource = res.stream;
        finalFileName = res.fileName;
        isStream = true;
        contentLength = res.contentLength;
      }
    }

    if (API_KEY) {
      return await uploadV2(finalSource, finalFileName);
    }

    return await uploadV1(finalSource, finalFileName, isStream, contentLength);
  } catch (err) {
    throw new Error(`[ImgBB] ${err.message}`);
  }
}

module.exports = { upload };
