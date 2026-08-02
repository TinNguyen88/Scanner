#!/bin/bash

# OCR Scanner Pro - Deploy Script
# Hỗ trợ Vercel, Heroku, Railway
# Cách dùng: bash deploy.sh

echo "📦 OCR Scanner Pro - Deploy Script"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check Git
if ! command -v git &> /dev/null; then
    echo "❌ Git chưa cài đặt"
    exit 1
fi

# Check Node
if ! command -v node &> /dev/null; then
    echo "❌ Node.js chưa cài đặt"
    exit 1
fi

echo "✓ Git & Node.js OK"
echo ""

# Initialize Git
if [ ! -d .git ]; then
    echo "📝 Initializing Git repository..."
    git init
    git add .
    git commit -m "OCR Scanner Pro v2.0 - Initial commit"
    git branch -M main
    echo "✓ Git initialized"
    echo ""
fi

# Choose platform
echo "🚀 Chọn platform deploy:"
echo "1) Vercel (khuyến nghị)"
echo "2) Heroku"
echo "3) Railway"
echo "4) Skip (push to GitHub only)"
echo ""
read -p "Nhập số (1-4): " choice

case $choice in
    1)
        echo ""
        echo "📦 Vercel Setup"
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        
        # Check Vercel CLI
        if ! command -v vercel &> /dev/null; then
            echo "📥 Installing Vercel CLI..."
            npm install -g vercel
        fi
        
        echo ""
        echo "⚠️  Trước khi tiếp tục:"
        echo "1. Push code lên GitHub trước"
        echo "   git remote add origin https://github.com/YOUR_USERNAME/ocr-scanner.git"
        echo "   git push -u origin main"
        echo ""
        echo "2. Hoặc dùng Vercel CLI ngay:"
        echo "   vercel"
        echo ""
        read -p "Bạn đã push lên GitHub? (y/n): " pushed
        
        if [ "$pushed" = "y" ]; then
            vercel
        else
            echo "⏭️  Hãy push GitHub trước, sau đó chạy lại script"
        fi
        ;;
        
    2)
        echo ""
        echo "📦 Heroku Setup"
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        
        # Check Heroku CLI
        if ! command -v heroku &> /dev/null; then
            echo "📥 Installing Heroku CLI..."
            echo "Download từ: https://devcenter.heroku.com/articles/heroku-cli"
            exit 1
        fi
        
        read -p "Nhập tên app (hoặc Enter để auto-generate): " app_name
        
        if [ -z "$app_name" ]; then
            heroku create
        else
            heroku create "$app_name"
        fi
        
        echo ""
        echo "📧 Cấu hình Email (Heroku):"
        read -p "EMAIL_SERVICE (gmail/outlook): " email_service
        read -p "EMAIL_USER: " email_user
        read -p "EMAIL_PASSWORD (app password): " email_password
        
        heroku config:set EMAIL_SERVICE="$email_service"
        heroku config:set EMAIL_USER="$email_user"
        heroku config:set EMAIL_PASSWORD="$email_password"
        
        echo ""
        echo "🚀 Deploying to Heroku..."
        git push heroku main
        
        echo ""
        echo "✓ Deploy xong!"
        heroku open
        ;;
        
    3)
        echo ""
        echo "📦 Railway Setup"
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo ""
        echo "📝 Hướng dẫn:"
        echo "1. Vào https://railway.app"
        echo "2. Đăng nhập GitHub"
        echo "3. Click 'New Project' → 'Deploy from GitHub repo'"
        echo "4. Chọn repo ocr-scanner"
        echo "5. Cấu hình Environment Variables:"
        echo "   - EMAIL_SERVICE=gmail"
        echo "   - EMAIL_USER=your-email@gmail.com"
        echo "   - EMAIL_PASSWORD=xxxx-xxxx-xxxx-xxxx"
        echo ""
        read -p "Push lên GitHub trước (y/n): " push_gh
        
        if [ "$push_gh" = "y" ]; then
            read -p "Nhập GitHub repo URL: " repo_url
            git remote add origin "$repo_url"
            git push -u origin main
            echo "✓ Push xong! Bây giờ vào Railway.app để finish"
        fi
        ;;
        
    4)
        echo "⏭️  Bỏ qua deploy (chỉ prepare GitHub)"
        echo ""
        echo "Sau này, push lên GitHub:"
        echo "git remote add origin <github-url>"
        echo "git push -u origin main"
        exit 0
        ;;
        
    *)
        echo "❌ Lựa chọn không hợp lệ"
        exit 1
        ;;
esac

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Deploy hoàn tất!"
echo ""
echo "💡 Tiếp theo:"
echo "1. Check logs nếu có lỗi"
echo "2. Cấu hình email variables"
echo "3. Test email gửi được"
echo "4. Share link với team"
echo ""
