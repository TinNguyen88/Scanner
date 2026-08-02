# 🚀 Quick Start - OCR Scanner Pro

Bắt đầu nhanh trong **2 phút**!

---

## ⚡ Cách 1: Chỉ Frontend (Offline, Tức Thì)

**Cách nhanh nhất - Không cần cài đặt gì!**

### Bước 1: Mở file
```bash
# Windows: Double-click index.html
# Mac/Linux: open index.html
# Hoặc: Kéo file vào browser
```

### Bước 2: Sử dụng ngay
- 📱 **Mở Camera** → Chụp CCCD/Giấy tờ
- 📁 **Upload Ảnh** → Chọn ảnh từ máy
- ✍️ **Xem kết quả** → Copy → Gửi email thủ công

**Xong!** ✓

---

## 📧 Cách 2: Thêm Backend Để Gửi Email Tự Động

**Mất khoảng 5-10 phút**

### Bước 1: Chuẩn bị Email Gmail

```
1. Vào https://myaccount.google.com/security
2. Bật "2-Step Verification"
3. Vào https://myaccount.google.com/apppasswords
4. Chọn "Mail" + "Windows Computer"
5. Copy 16 ký tự (app password)
```

### Bước 2: Cài Node.js

Tải từ https://nodejs.org (LTS version)

```bash
# Kiểm tra
node --version
npm --version
```

### Bước 3: Setup Backend

```bash
# 1. Mở Terminal/CMD ở folder project
cd ocr-scanner-pro

# 2. Cài dependencies
npm install

# 3. Tạo .env
cp .env.example .env

# 4. Mở .env, sửa:
# EMAIL_USER=your-email@gmail.com
# EMAIL_PASSWORD=xxxx xxxx xxxx xxxx

# 5. Test
npm run test
# Sẽ gửi test email

# 6. Chạy server
npm start
# Hoặc: npm run dev (auto reload)
```

### Bước 4: Sử dụng

Mở `http://localhost:3000` trong browser

✓ Gửi email tự động qua nút "📤 Gửi Email"

---

## 🎯 So Sánh 2 Cách

| | Frontend Only | + Backend |
|---|---|---|
| **Setup** | 0 phút | 5-10 phút |
| **Quét & OCR** | ✓ Ngay lập tức | ✓ Ngay lập tức |
| **Gửi Email** | Manual (copy-paste) | Tự động 1 click |
| **Cần Server** | Không | Có (localhost) |
| **Offline** | ✓ Hoàn toàn | Chỉ OCR |
| **An toàn** | ✓ Cao nhất | ✓ Cao |

**Khuyến nghị**: 
- Người dùng thường → Cách 1 (Frontend only)
- Doanh nghiệp / Công ty → Cách 2 (Full stack)

---

## 💡 Ví Dụ Sử Dụng

### Quét CCCD
```
1. Mở Camera → Chụp 2 mặt CCCD (từng mặt một)
2. OCR sẽ nhận diện tên, CMND, địa chỉ
3. Copy kết quả → Gửi qua email
```

### Quét Hóa Đơn
```
1. Upload ảnh hóa đơn
2. OCR nhận diện số tiền, ngày, mã hóa đơn
3. Chỉnh sửa nếu cần
4. Gửi email cho kế toán
```

### Quét Tài Liệu
```
1. Chụp từng trang tài liệu
2. Copy tất cả OCR kết quả
3. Dán vào file Word/Excel
4. Lưu lại
```

---

## 🔧 Troubleshooting

### Camera không hoạt động
- ✓ Chrome, Firefox, Edge → Hỗ trợ
- ✗ Internet Explorer → Không hỗ trợ (upgrade Edge)
- Check: Browser permission truy cập camera

### OCR chậm lần đầu
- **Bình thường** - Download language data (~50MB)
- Lần sau sẽ nhanh hơn
- Kết nối internet tốt → nhanh hơn

### Email không gửi được
```bash
# Test kết nối
curl http://localhost:3000/api/verify-email

# Xem lỗi chi tiết
npm start
# Check terminal output
```

### Độ chính xác OCR thấp
- 📷 Chụp ảnh sáng rõ, góc 90°
- 🎨 Dùng "Chỉnh sửa" để điều chỉnh độ sáng
- 🔄 Chụp lại ảnh khác

---

## 📱 Dùng Trên Điện Thoại

### iPhone/iPad (Safari)
```
1. Mở file index.html qua web server
2. Hoặc: python -m http.server 8000
3. Truy cập: http://your-ip:8000/index.html
```

### Android (Chrome)
```
1. Tương tự iPhone
2. Chrome hỗ trợ camera đầy đủ
```

**Lưu ý**: 
- Backend phải chạy trên server công khai (không localhost)
- Hoặc dùng ngrok để public localhost: `ngrok http 3000`

---

## 🌟 Pro Tips

1. **Lưu email** → Chỉnh sửa .env
   - Lần sau không cần nhập lại

2. **Tự động thêm chữ ký** → Sửa `server.js`
   ```javascript
   const signature = "\n\n---\nGửi bởi: NGUYỄN TRUNG TÍN";
   const emailBody = body + signature;
   ```

3. **Giới hạn gửi email** → Thêm rate limiting
   ```javascript
   const rateLimit = require('express-rate-limit');
   const limiter = rateLimit({ windowMs: 1*60*1000, max: 5 });
   app.post('/api/send-email', limiter, ...);
   ```

4. **Deploy lên cloud** → Xem README.md phần "Deploy"

---

## 📞 Cần Giúp?

1. **Xem README.md** - Hướng dẫn chi tiết
2. **Check Browser Console** - `F12` → Console (lỗi sẽ hiển thị)
3. **Test Email** - `npm run test`
4. **Check Logs** - Terminal sẽ in lỗi chi tiết

---

## ✨ Thế Đó!

Bạn đã setup OCR Scanner Pro thành công! 🎉

**Bước tiếp theo**:
- Thử quét ảnh
- Điều chỉnh cài đặt
- Deploy lên server (tuỳ chọn)

Happy scanning! 📸

---

**Tác giả**: NGUYỄN TRUNG TÍN  
**Version**: 2.0  
**License**: MIT
