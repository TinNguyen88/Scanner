# 🚀 Deploy OCR Scanner Pro

Chọn 1 trong 3 cách deploy dưới đây. **Mất khoảng 5 phút mỗi cách.**

---

## **Cách 1: Vercel (Khuyến Nghị - Nhanh Nhất)**

✅ **Miễn phí**, **cực nhanh**, **auto-deploy từ GitHub**

### Bước 1: Push lên GitHub

```bash
git init
git add .
git commit -m "OCR Scanner Pro v2.0"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ocr-scanner.git
git push -u origin main
```

### Bước 2: Deploy lên Vercel

**Cách A: CLI (Nhanh nhất - 1 phút)**
```bash
npm install -g vercel
vercel
# Chọn "Yes" cho tất cả
```

**Cách B: Web UI (2 phút)**
1. Vào https://vercel.com
2. Đăng nhập GitHub
3. Chọn repo `ocr-scanner`
4. Click "Deploy" → **Done!** ✓

### Bước 3: Cấu hình Environment Variables

```bash
# Trong Vercel Dashboard:
# Settings → Environment Variables

EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=xxxx-xxxx-xxxx-xxxx
```

**Xong!** Website chạy trên `https://ocr-scanner-xxxxx.vercel.app`

---

## **Cách 2: Heroku (Miễn Phí - Đơn Giản)**

✅ **Miễn phí 5 dyno/tháng**, **setup đơn giản**

### Bước 1: Cài Heroku CLI

```bash
# Download từ https://devcenter.heroku.com/articles/heroku-cli
heroku --version
```

### Bước 2: Deploy

```bash
# Từ folder project
git init
git add .
git commit -m "OCR Scanner Pro v2.0"

# Tạo Heroku app
heroku create my-ocr-scanner
# Hoặc: heroku create (auto-generate name)

# Cấu hình environment
heroku config:set EMAIL_SERVICE=gmail
heroku config:set EMAIL_USER=your-email@gmail.com
heroku config:set EMAIL_PASSWORD=xxxx-xxxx-xxxx-xxxx

# Deploy
git push heroku main

# Xem logs
heroku logs --tail
```

**Xong!** Website chạy trên `https://my-ocr-scanner.herokuapp.com`

---

## **Cách 3: Railway (Mới - Siêu Dễ)**

✅ **$5/tháng credits miễn phí**, **giao diện đẹp**

### Bước 1: Connect GitHub

1. Vào https://railway.app
2. Đăng nhập GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Chọn repo `ocr-scanner`
5. Click "Deploy Now"

### Bước 2: Cấu hình Environment

Railway tự detect `package.json` → Auto setup.

```
# Railway Dashboard → Variables:

EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=xxxx-xxxx-xxxx-xxxx
```

**Xong!** Website chạy tự động. Xem URL ở Railway dashboard.

---

## **Cách 4: Netlify (Frontend Only - Nếu Không Cần Email Tự Động)**

✅ **Cực nhanh, cực đơn giản**

```bash
# Cài Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --dir=.

# Hoặc drag-and-drop folder vào Netlify UI
```

**Xong!** Chỉ frontend, không có backend email.

---

## 🔐 **Bảo Mật - Quan Trọng!**

### ❌ **KHÔNG** làm này:
```
- KHÔNG commit .env vào GitHub
- KHÔNG push email password trên commit
- KHÔNG share .env file công khai
```

### ✅ **Làm** này:
```bash
# Chỉ commit .env.example
git add .env.example
git add .gitignore

# Cấu hình environment variables trên platform (Vercel/Heroku/Railway)
# Không cần file .env khi deploy
```

---

## 🧪 **Test Trước Deploy**

```bash
# Test locally
npm install
npm run test

# Nếu email không gửi được, check:
# 1. EMAIL_SERVICE, EMAIL_USER, EMAIL_PASSWORD correct?
# 2. Gmail: Enable 2FA + App Password?
# 3. Port 587 (SMTP) không bị firewall chặn?
```

---

## 📊 **Performa & Chi Phí**

| Platform | Chi Phí | Performa | Setup |
|----------|---------|----------|-------|
| **Vercel** | Miễn phí | ⭐⭐⭐⭐⭐ (Nhanh nhất) | 1 phút |
| **Heroku** | Miễn phí | ⭐⭐⭐⭐ | 3 phút |
| **Railway** | $5/tháng free | ⭐⭐⭐⭐ | 2 phút |
| **Netlify** | Miễn phí (FE only) | ⭐⭐⭐⭐⭐ | 1 phút |

**Khuyến nghị**: 
- Nếu cần email: **Vercel**
- Nếu muốn đơn giản: **Heroku**
- Nếu thích giao diện: **Railway**
- Nếu chỉ cần frontend: **Netlify**

---

## 🔗 **Domain Riêng (Tuỳ Chọn)**

```bash
# Vercel
vercel domains add yourdomain.com

# Heroku
heroku domains:add yourdomain.com

# Railway
Settings → Custom Domain

# Netlify
Domain settings → Add custom domain
```

---

## 📝 **Checklist Pre-Deploy**

- [ ] GitHub account
- [ ] Push code lên GitHub
- [ ] .env được add vào .gitignore
- [ ] Chạy test locally: `npm run test`
- [ ] Test email gửi được
- [ ] Chọn platform deploy (Vercel/Heroku/Railway)
- [ ] Cấu hình environment variables trên platform
- [ ] Deploy ✓
- [ ] Test trên production URL
- [ ] Share link với team

---

## 🐛 **Troubleshooting Deploy**

### Error: "Cannot find module 'express'"
```bash
# Remote SSH vào dyno
heroku ps:exec
npm install
```

### Email không gửi trên production
```bash
# Check config
heroku config      # Heroku
vercel env list    # Vercel

# Kiểm tra logs
heroku logs --tail
```

### Cold start chậm
- Bình thường lần đầu
- Lần sau sẽ nhanh hơn
- Gọi endpoint `/api/health` định kỳ để keep-alive

---

## 🎉 **Xong!**

Bây giờ OCR Scanner chạy công khai! 🚀

Chia sẻ link với team:
```
https://your-domain.com
```

---

**Tác giả**: NGUYỄN TRUNG TÍN  
**Version**: 2.0
