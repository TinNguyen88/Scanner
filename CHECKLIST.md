# ✅ Pre-Deploy Checklist

Kiểm tra những điều này trước khi deploy lên production.

---

## 📋 **Backend & Code**

- [ ] Chạy `npm install` thành công
- [ ] Không có lỗi: `npm run test`
- [ ] Email test gửi được
- [ ] Chạy local: `npm start` → http://localhost:3000 OK
- [ ] Frontend load OK
- [ ] OCR nhận diện được chữ
- [ ] Email gửi được (nếu có backend)

---

## 🔐 **Security**

- [ ] `.env` được add vào `.gitignore`
- [ ] Không commit `.env` file
- [ ] Không có hardcode password trong code
- [ ] `.env.example` chỉ có template (không có value)
- [ ] Check git log: `git log --all -- .env` → trống
- [ ] GitHub repo: Private hoặc Public (tuỳ chọn)

---

## 📦 **File & Folder Structure**

Kiểm tra có đủ file không:

```
ocr-scanner/
├── index.html          ✓
├── server.js          ✓
├── package.json       ✓
├── .env.example       ✓
├── .gitignore         ✓
├── README.md          ✓
├── QUICKSTART.md      ✓
├── DEPLOY.md          ✓
├── Procfile           ✓ (Heroku)
├── vercel.json        ✓ (Vercel)
├── deploy.sh          ✓ (Script)
├── node_modules/      ✗ (Git ignored)
└── .env               ✗ (Git ignored - local only)
```

- [ ] Có 11 file chính
- [ ] Không có `node_modules/` trong git
- [ ] Không có `.env` file trong git

---

## 🌐 **GitHub Setup**

- [ ] GitHub account
- [ ] Tạo repo mới
- [ ] Thêm remote: `git remote add origin <url>`
- [ ] Push main branch: `git push -u origin main`
- [ ] Kiểm tra GitHub: code là public/private OK
- [ ] Không thấy `.env` file trên GitHub

---

## 🚀 **Deploy Platform Choice**

Chọn 1:

- [ ] **Vercel** - Khuyến nghị (nhanh + cheap)
- [ ] **Heroku** - Đơn giản (có Procfile)
- [ ] **Railway** - Mới + đẹp
- [ ] **Netlify** - Frontend only (không backend)

---

## 📧 **Email Configuration**

Nếu dùng backend email:

### Gmail (Khuyến Nghị)
- [ ] Đã tạo Gmail account
- [ ] Bật 2-Factor Authentication
- [ ] Tạo App Password (16 ký tự)
- [ ] Copy app password (không có dấu cách)
- [ ] Test local: `npm run test`

### Alternative Providers
- [ ] Outlook: Email + password
- [ ] SendGrid: API key
- [ ] Custom SMTP: Host, Port, User, Pass

---

## 🔧 **Vercel Deploy**

Nếu chọn Vercel:

- [ ] Cài Vercel CLI: `npm install -g vercel`
- [ ] Đăng nhập Vercel: `vercel login`
- [ ] Project linked: `vercel link`
- [ ] Cấu hình env vars trong dashboard
- [ ] Deploy: `vercel --prod`
- [ ] Test: `https://project.vercel.app`

---

## 🔧 **Heroku Deploy**

Nếu chọn Heroku:

- [ ] Cài Heroku CLI
- [ ] Đăng nhập: `heroku login`
- [ ] Tạo app: `heroku create <name>`
- [ ] Config vars: 
  ```bash
  heroku config:set EMAIL_SERVICE=gmail
  heroku config:set EMAIL_USER=...
  heroku config:set EMAIL_PASSWORD=...
  ```
- [ ] Deploy: `git push heroku main`
- [ ] Test: `https://<name>.herokuapp.com`

---

## 🔧 **Railway Deploy**

Nếu chọn Railway:

- [ ] Railway account (GitHub login)
- [ ] Connect repo
- [ ] Auto-detect Node.js
- [ ] Environment variables set
- [ ] Auto-deploy on push
- [ ] Test: URL từ Railway dashboard

---

## 🧪 **Production Testing**

Sau deploy:

- [ ] [ ] Frontend load OK
- [ ] [ ] Camera mở được
- [ ] [ ] Upload ảnh OK
- [ ] [ ] OCR chạy OK (confidence score hiện)
- [ ] [ ] Chỉnh sửa ảnh OK
- [ ] [ ] Copy kết quả OK
- [ ] [ ] Email gửi được (nếu có backend)
  - [ ] No error in logs
  - [ ] Email received in inbox
  - [ ] Email format đúng
- [ ] [ ] Mobile responsive OK
- [ ] [ ] Console không có error (`F12`)

---

## 📊 **Performance Check**

- [ ] First load < 5 giây
- [ ] OCR < 10 giây (lần đầu)
- [ ] Email send < 2 giây
- [ ] No timeout errors
- [ ] Heroku: dyno không napping

---

## 🔗 **Custom Domain (Tuỳ Chọn)**

Nếu có domain riêng:

- [ ] Domain registered
- [ ] DNS configured
- [ ] SSL certificate
- [ ] Test: https://yourdomain.com
- [ ] Redirect http → https

---

## 📝 **Documentation**

- [ ] README.md complete
- [ ] QUICKSTART.md có
- [ ] DEPLOY.md có
- [ ] .env.example có comment
- [ ] Server.js có comment
- [ ] Code clean (no console.log spam)

---

## 🎯 **Final Checklist**

- [ ] Tất cả test passed
- [ ] Không có sensitive data trong code
- [ ] Logs không show password
- [ ] Ready for production
- [ ] Team informed
- [ ] Backup plan (rollback nếu lỗi)

---

## ⚠️ **Common Mistakes (Tránh Cái Này)**

❌ **KHÔNG**:
- Commit `.env` file
- Hardcode email password
- Quên add environment variables
- Deploy chưa test local
- Quên bật 2FA cho Gmail
- Deploy với old Node version
- Không check logs khi deploy

✅ **LÀM**:
- Dùng `.env.example` template
- Cấu hình env vars trên platform
- Test local trước: `npm run test`
- Check logs: `heroku logs --tail`
- Update Node to LTS version
- Monitor error logs đầu tiên

---

## 🎉 **Xong!**

Nếu check hết ✓ → Ready to deploy! 🚀

---

**Tác giả**: NGUYỄN TRUNG TÍN  
**Version**: 2.0
