# 📸 OCR Scanner Pro v2.0

Ứng dụng quét và nhận diện chữ từ giấy tờ, CCCD, Hộ chiếu, Hóa đơn... với khả năng gửi email tự động.

**Tác giả**: NGUYỄN TRUNG TÍN

---

## 🎯 Tính Năng

✅ **Quét từ Camera** - Mở camera, chụp ảnh trực tiếp  
✅ **Upload Ảnh** - Upload từ file máy  
✅ **OCR Chính Xác** - Tesseract.js nhận diện Tiếng Việt + Tiếng Anh  
✅ **Độ Chính Xác** - Hiển thị confidence score, số ký tự  
✅ **Chỉnh Sửa Ảnh** - Điều chỉnh độ sáng, tương phản trước OCR  
✅ **Gửi Email** - Tự động hoặc manual qua email client  
✅ **Hoàn toàn Offline** - Không cần kết nối server, an toàn  
✅ **Responsive Design** - Chạy tốt trên desktop, mobile, tablet  

---

## 📦 Cấu Trúc File

```
ocr-scanner-pro/
├── index.html              # Frontend - Quét & OCR (mở trực tiếp trên browser)
├── server.js              # Backend - Gửi email (tùy chọn)
├── package.json           # NPM dependencies
├── .env.example           # Cấu hình email (copy → .env)
├── README.md              # Hướng dẫn này
└── deploy/                # Hướng dẫn deploy
    ├── vercel.md
    ├── heroku.md
    └── docker.md
```

---

## 🚀 Cách Sử Dụng

### **Cách 1: Chỉ Dùng Frontend (Nhanh nhất, Offline)**

1. **Mở file trực tiếp**:
   ```bash
   # Chỉ cần mở file index.html bằng browser
   # Windows: Double-click index.html
   # Mac/Linux: open index.html
   ```

2. **Hoặc mở trên local web server**:
   ```bash
   # Python 3
   python -m http.server 8000
   # Truy cập: http://localhost:8000/index.html
   
   # Node.js
   npx http-server
   # Truy cập: http://localhost:8080
   ```

3. **Sử dụng**:
   - Nhấn "📱 Mở Camera" → Chụp ảnh CCCD/Giấy tờ
   - Hoặc "📁 Upload Ảnh" → Chọn ảnh từ máy
   - Kết quả OCR hiển thị ngay
   - Copy → Gửi email bằng email client của bạn

**Ưu điểm**: 
- Không cần cài đặt gì
- Hoàn toàn offline, bảo mật
- Nhanh, nhẹ, đơn giản

---

### **Cách 2: Thêm Backend Để Gửi Email Tự Động**

#### **Bước 1: Chuẩn Bị Email**

**Gmail** (Khuyến nghị):
1. Vào [myaccount.google.com/security](https://myaccount.google.com/security)
2. Bật "2-Step Verification" (Xác thực 2 bước)
3. Vào [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
4. Chọn "Mail" + "Windows Computer" (hoặc device của bạn)
5. Copy app password (16 ký tự)

**Gmail Cấu Hình Đơn Giản** (Nếu không có 2FA):
- Dùng email bình thường nhưng cần bật ["Less secure app access"](https://support.google.com/accounts/answer/6010255)

**Dùng SMTP khác**:
- Outlook: `smtp.office365.com:587`
- Yahoo: `smtp.mail.yahoo.com:587`
- SendGrid: API Key

#### **Bước 2: Cài Đặt Backend**

```bash
# 1. Cài Node.js (nếu chưa có)
# Download từ nodejs.org

# 2. Clone/Copy project
cd ocr-scanner-pro

# 3. Cài dependencies
npm install

# 4. Tạo .env từ .env.example
cp .env.example .env

# 5. Sửa .env với email của bạn
# Mở .env, thay:
# EMAIL_USER=your-email@gmail.com
# EMAIL_PASSWORD=your-app-password-16-digits

# 6. Test kết nối email
npm run test
# Hoặc: curl http://localhost:3000/api/verify-email

# 7. Chạy server
npm start
# Hoặc: npm run dev (với auto-reload)
```

#### **Bước 3: Sử Dụng**

```bash
# Server chạy trên http://localhost:3000
# Mở http://localhost:3000 trong browser
# Gửi email tự động → Click "📤 Gửi Email"
```

---

## ⚙️ Cấu Hình OCR

### **Ngôn Ngữ Được Hỗ Trợ**

- **Tiếng Việt** (vie) - Chủ yếu
- **Tiếng Anh** (eng) - Hỗ trợ

Để thêm ngôn ngữ khác, sửa trong `index.html`:

```javascript
// Thay dòng:
await ocrWorker.loadLanguage('vie,eng');

// Sang (ví dụ thêm Trung Quốc):
await ocrWorker.loadLanguage('vie,eng,chi_sim');
```

**Các code ngôn ngữ Tesseract**:
- `chi_sim` - Tiếng Trung Giản Thể
- `jpn` - Tiếng Nhật
- `tha` - Tiếng Thái
- [Xem tất cả](https://github.com/naptha/tesseract.js-data/tree/master/4.0.0)

### **Cải Thiện Độ Chính Xác**

1. **Chụp ảnh tốt**:
   - Sáng rõ, không bóng mờ
   - Góc 90° với tờ giấy
   - Độ phân giải cao (1920x1440 +)
   - Tránh góc xiên

2. **Chỉnh sửa ảnh**:
   - Nhấn "🎨 Chỉnh sửa"
   - Điều chỉnh độ sáng & tương phản
   - Thử OCR lại

3. **Confidence Score** < 60% → Chụp lại ảnh

---

## 📧 Email Configuration

### **Gmail (Khuyến Nghị)**

```env
EMAIL_SERVICE=gmail
EMAIL_USER=you@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx  # 16-digit app password
```

### **Outlook/Office 365**

```env
EMAIL_SERVICE=outlook
EMAIL_USER=you@outlook.com
EMAIL_PASSWORD=your-password
```

### **Custom SMTP**

```env
EMAIL_SERVICE=custom
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_SECURE=false  # true for 465
EMAIL_USER=your-email@example.com
EMAIL_PASSWORD=your-password
```

### **SendGrid API**

```env
EMAIL_SERVICE=sendgrid
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
```

---

## 🐛 Troubleshooting

### **OCR không nhận diện chữ Việt**

→ Kiểm tra trong browser console (`F12` → Console)
→ Đảm bảo internet kết nối (download language data)
→ Thử chụp lại ảnh rõ hơn

### **Email không gửi được**

1. **Check logs**:
   ```bash
   # Terminal sẽ hiển thị lỗi chi tiết
   npm start
   ```

2. **Test kết nối email**:
   ```bash
   curl http://localhost:3000/api/verify-email
   ```

3. **Gmail issues**:
   - Kiểm tra app password (16 ký tự, không dấu cách)
   - Bật 2FA trước
   - Thử "Less secure app access" nếu không có 2FA

4. **Firewall/Port**:
   - Nếu dùng corporate network, port SMTP có thể bị chặn
   - Thử port 587 (TLS) thay vì 465

### **Browser không hỗ trợ Camera**

- Chrome, Firefox, Edge: Hỗ trợ đầy đủ
- Safari: Hỗ trợ (cần permission)
- Internet Explorer: Không hỗ trợ (upgrade lên Edge)

### **Chậm lần đầu tiên**

- OCR download language data lần đầu (~50MB)
- Lần sau sẽ cache, nhanh hơn
- Mở DevTools → Application → Cache Storage để xóa cache nếu cần

---

## 🌐 Deploy

### **1. Deploy Chỉ Frontend (Tĩnh)**

```bash
# Netlify
npm install -g netlify-cli
netlify deploy --dir=.

# Vercel
npm install -g vercel
vercel

# GitHub Pages
# Copy index.html → gh-pages branch
```

### **2. Deploy Frontend + Backend**

#### **Heroku** (Miễn phí 5 dyno/month)
```bash
# Cài Heroku CLI
# Đăng ký tài khoản trên heroku.com

git init
git add .
git commit -m "OCR Scanner Pro"

heroku create my-ocr-scanner
heroku config:set EMAIL_SERVICE=gmail
heroku config:set EMAIL_USER=you@gmail.com
heroku config:set EMAIL_PASSWORD=xxxx

git push heroku main
```

#### **Railway/Render/Fly.io**
- Tương tự Heroku, đỡ một số bước

#### **Docker** (Production)
```bash
docker build -t ocr-scanner .
docker run -p 3000:3000 \
  -e EMAIL_SERVICE=gmail \
  -e EMAIL_USER=you@gmail.com \
  -e EMAIL_PASSWORD=xxxx \
  ocr-scanner
```

---

## 📊 Performance

- **First Load**: ~2-3 giây (download Tesseract WASM)
- **Chụp ảnh**: Ngay lập tức
- **OCR 1 ảnh**: 3-8 giây (tùy chất lượng)
- **Gửi email**: < 1 giây

---

## 🔒 Security & Privacy

✅ **Offline-First**: Ảnh chỉ xử lý trên máy của bạn
✅ **No Cloud Storage**: Không lưu ảnh lên server
✅ **No Tracking**: Không theo dõi người dùng
✅ **HTTPS Only**: Deploy trên HTTPS
✅ **Email Validation**: Kiểm tra email trước gửi
✅ **Rate Limiting**: Giới hạn gửi email (tùy chỉnh)

---

## 📝 Ghi Chú

- Tesseract.js: Open source, community-maintained
- Ảnh chất lượng cao → OCR chính xác cao
- CCCD/Hộ chiếu: Layout chuẩn, nhận diện ~90%
- Hóa đơn in: Dễ nhận diện (in đẹp, có định dạng)
- Chữ viết tay: Khó, đặc biệt nếu không rõ

---

## 📞 Hỗ Trợ

- 📖 Xem README này
- 🐛 Check browser console (`F12`)
- 💡 Thử chụp ảnh khác (sáng hơn, rõ hơn)
- 🔧 Test backend: `curl http://localhost:3000/api/health`

---

## 📄 License

MIT - Open Source

---

**Made with ❤️ by NGUYỄN TRUNG TÍN**

*Quét ảnh, nhận diện chữ, gửi email - Đơn giản, chính xác, an toàn*
